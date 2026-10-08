/**
 * Formulario propio "Agendar llamada" (reemplaza al iframe de Jotform).
 * Mismas preguntas que el Jotform, en dos pasos: datos de contacto y datos del negocio.
 * Envía a /api/lead, que lo reenvía a Sentinel (CRM + WhatsApp de apertura).
 * El país se preselecciona por la IP del visitante (/api/geo) y el número se comprueba
 * contra WhatsApp antes de pasar al paso 2 (/api/check-whatsapp).
 * Se usa en /formulario y en el modal de /meta-ads.
 */
import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CONSULTAS_POR_MES,
  EJEMPLO_DE_NUMERO,
  FACTURACION_MENSUAL,
  INVERSION_MENSUAL,
  PAISES,
  PAISES_FRECUENTES,
  RUBROS,
  analizarTelefono,
  paisPorCodigo,
  paisSugerido,
  paisValido,
} from './leadFormData';

type Campo =
  | 'nombre'
  | 'empresa'
  | 'email'
  | 'pais'
  | 'telefono'
  | 'rubro'
  | 'publicidad'
  | 'inversion'
  | 'facturacion'
  | 'consultas'
  | 'website';

type Valores = Record<Campo, string>;
type Errores = Partial<Record<Campo, string>>;

const PASO_1: Campo[] = ['nombre', 'empresa', 'email', 'telefono'];
const PASO_2: Campo[] = ['publicidad', 'inversion', 'facturacion', 'consultas'];

const CTA_GRADIENT = 'linear-gradient(90deg,#185de8,#6bdda1)';
const ERROR_GENERICO = 'No pudimos enviar tus datos. Probá de nuevo en unos segundos.';

const labelCls = 'mb-1.5 block text-[14px] font-medium leading-[1.35] text-white/85';
const controlCls =
  'block h-[52px] w-full rounded-xl border bg-white/[0.04] px-4 text-[16px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#6bdda1] focus:ring-2 focus:ring-[#6bdda1]/25';
const borde = (conError?: string) => (conError ? 'border-[#ff7a7a]' : 'border-white/15');

function validar(v: Valores, campos: Campo[]): Errores {
  const e: Errores = {};
  for (const c of campos) {
    if (c === 'nombre' && v.nombre.trim().length < 3) e.nombre = 'Escribí tu nombre y apellido.';
    if (c === 'empresa' && v.empresa.trim().length < 2) e.empresa = 'Escribí el nombre de tu empresa o negocio.';
    if (c === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Revisá el email.';
    if (c === 'telefono') {
      const tel = analizarTelefono(v.telefono, v.pais);
      if (tel.ok === false) e.telefono = tel.error;
    }
    if ((c === 'publicidad' || c === 'inversion' || c === 'facturacion' || c === 'consultas') && !v[c]) {
      e[c] = 'Elegí una opción.';
    }
  }
  return e;
}

/** Parámetros de campaña de la URL, para saber de qué anuncio vino el lead. */
function utmDeLaUrl(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const val = params.get(k);
    if (val) out[k] = val;
  }
  return out;
}

/**
 * ¿El número existe en WhatsApp? Sólo devuelve 'no_wa' cuando Sentinel lo confirma.
 * Si no se pudo consultar (línea caída, demora, sin conexión) devuelve 'unknown' y el
 * formulario sigue: es peor perder un lead bueno que dejar pasar un número dudoso.
 */
async function consultarWhatsApp(codigoPais: string, nacional: string): Promise<'has_wa' | 'no_wa' | 'unknown'> {
  const corte = new AbortController();
  const reloj = window.setTimeout(() => corte.abort(), 7000);
  try {
    const res = await fetch('/api/check-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo_pais: codigoPais, telefono: nacional }),
      signal: corte.signal,
    });
    const data = await res.json().catch(() => null);
    return data?.wa_check === 'has_wa' || data?.wa_check === 'no_wa' ? data.wa_check : 'unknown';
  } catch {
    return 'unknown';
  } finally {
    window.clearTimeout(reloj);
  }
}

function Chevron() {
  return (
    <svg
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

export function LeadForm() {
  const uid = useId();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [paso, setPaso] = useState<1 | 2>(1);
  const [v, setV] = useState<Valores>(() => ({
    nombre: '',
    empresa: '',
    email: '',
    pais: paisSugerido(),
    telefono: '',
    rubro: '',
    publicidad: '',
    inversion: '',
    facturacion: '',
    consultas: '',
    website: '',
  }));
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);
  const [verificando, setVerificando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');
  /** La persona ya eligió país o empezó a escribir el número: el país por IP no se lo pisa. */
  const paisTocado = useRef(false);
  /** Último número que WhatsApp confirmó, para no volver a consultarlo al ir y volver de paso. */
  const numeroConfirmado = useRef('');

  const pais = paisPorCodigo(v.pais);
  const id = (campo: Campo) => `${uid}-${campo}`;

  // País (y con él el prefijo) según la IP del visitante. Arranca con el de la zona horaria y se corrige si hace falta.
  useEffect(() => {
    let vigente = true;
    fetch('/api/geo')
      .then((res) => res.json())
      .then((data) => {
        if (vigente && !paisTocado.current && paisValido(data?.country)) {
          setV((prev) => ({ ...prev, pais: data.country }));
        }
      })
      .catch(() => {});
    return () => {
      vigente = false;
    };
  }, []);

  const set = (campo: Campo, valor: string) => {
    setV((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }));
  };

  /** Valida los campos del paso; si hay errores los muestra y lleva el foco al primero. */
  const pasoValido = (campos: Campo[]): boolean => {
    const e = validar(v, campos);
    setErrores(e);
    const primero = campos.find((c) => e[c]);
    if (primero) document.getElementById(id(primero))?.focus();
    return !primero;
  };

  const irAlPaso = (n: 1 | 2) => {
    setPaso(n);
    setErrorEnvio('');
    // El foco va al formulario (no a un campo) para no abrir el teclado del celular al cambiar de paso.
    requestAnimationFrame(() => {
      formRef.current?.focus({ preventScroll: true });
      formRef.current?.scrollIntoView({ block: 'start' });
    });
  };

  /** Botón del paso: en el 1 valida, comprueba el WhatsApp y pasa al 2; en el 2 valida y envía. */
  const avanzar = async () => {
    if (enviando || verificando) return;
    if (paso === 1) {
      if (!pasoValido(PASO_1)) return;
      const tel = analizarTelefono(v.telefono, v.pais);
      if (!tel.ok) return;
      // Lo escribieron completo, con "+" y otro prefijo: el país y el campo se acomodan a ese número.
      if (tel.pais !== v.pais || v.telefono.trim().startsWith('+')) {
        paisTocado.current = true;
        setV((prev) => ({ ...prev, pais: tel.pais, telefono: tel.nacional }));
      }
      const completo = `${tel.codigoPais}${tel.nacional}`;
      if (numeroConfirmado.current !== completo) {
        setVerificando(true);
        const resultado = await consultarWhatsApp(tel.codigoPais, tel.nacional);
        setVerificando(false);
        if (resultado === 'no_wa') {
          setErrores({ telefono: 'Ese número no tiene WhatsApp. Revisalo o probá con otro.' });
          document.getElementById(id('telefono'))?.focus();
          return;
        }
        if (resultado === 'has_wa') numeroConfirmado.current = completo;
      }
      irAlPaso(2);
      return;
    }
    if (!pasoValido(PASO_2)) return;
    const tel = analizarTelefono(v.telefono, v.pais);
    if (!tel.ok) {
      irAlPaso(1);
      return;
    }

    setEnviando(true);
    setErrorEnvio('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: v.nombre.trim(),
          empresa: v.empresa.trim(),
          email: v.email.trim(),
          pais: paisPorCodigo(tel.pais).name,
          codigo_pais: tel.codigoPais,
          telefono: tel.nacional,
          rubro: v.rubro,
          publicidad_activa: v.publicidad,
          inversion: v.inversion,
          facturacion: v.facturacion,
          consultas: v.consultas,
          pagina: window.location.pathname,
          utm: utmDeLaUrl(),
          website: v.website,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setErrorEnvio(data?.error || ERROR_GENERICO);
        setEnviando(false);
        return;
      }
    } catch {
      setErrorEnvio(ERROR_GENERICO);
      setEnviando(false);
      return;
    }

    // Mismos eventos que disparaba el Jotform al completarse (GTM + pixel); el otro pixel dispara en la página de gracias.
    const w = window as any;
    if (w.dataLayer) w.dataLayer.push({ event: 'form_submitted', form_name: 'aplicacion_scala', pagina: window.location.pathname });
    if (w.fbq) w.fbq('trackSingle', '2374948116336820', 'Lead');
    navigate('/gracias-por-contactarnos');
  };

  /**
   * El formulario NO emite submit nativo a propósito: GTM/GA4 escuchan esos eventos y contarían
   * como envío cada "Continuar" o intento con errores. La conversión se avisa sólo al enviar de verdad.
   * Por eso Enter se maneja acá: salta al siguiente campo de texto y, en el último, avanza.
   */
  const onKeyDown = (ev: React.KeyboardEvent) => {
    const el = ev.target as HTMLElement;
    if (ev.key !== 'Enter' || el.tagName !== 'INPUT' || (el as HTMLInputElement).type === 'radio') return;
    ev.preventDefault();
    const campos: HTMLInputElement[] = Array.from(formRef.current?.querySelectorAll('input:not([tabindex="-1"]):not([type="radio"])') ?? []);
    const siguiente = campos[campos.indexOf(el as HTMLInputElement) + 1];
    if (siguiente) siguiente.focus();
    else avanzar();
  };

  const mensajeDeError = (campo: Campo) =>
    errores[campo] ? (
      <p id={`${id(campo)}-error`} className="mt-1.5 text-[13px] leading-[1.35] text-[#ff9b9b]">
        {errores[campo]}
      </p>
    ) : null;

  const ariaDeError = (campo: Campo) => ({
    'aria-invalid': errores[campo] ? true : undefined,
    'aria-describedby': errores[campo] ? `${id(campo)}-error` : undefined,
  });

  /** El país lo elige la persona: desde ahí el país por IP ya no lo cambia. */
  const elegirPais = (code: string) => {
    paisTocado.current = true;
    set('pais', code);
    if (errores.telefono) setErrores((prev) => ({ ...prev, telefono: undefined }));
  };

  /** Mismas opciones para el selector de país y el de prefijo: los frecuentes arriba, después todos. */
  const opcionesDePais = (conPrefijo: boolean) =>
    [
      { titulo: 'Más frecuentes', lista: PAISES_FRECUENTES },
      { titulo: 'Todos los países', lista: PAISES },
    ].map((grupo) => (
      <optgroup key={grupo.titulo} label={grupo.titulo} className="bg-[#0b0b12] text-white">
        {grupo.lista.map((p) => (
          <option key={p.code} value={p.code} className="bg-[#0b0b12] text-white">
            {conPrefijo ? `${p.name} (+${p.dial})` : p.name}
          </option>
        ))}
      </optgroup>
    ));

  const select = (campo: Campo, label: string, opciones: string[], opcional = false) => (
    <div>
      <label htmlFor={id(campo)} className={labelCls}>
        {label}
        {opcional && <span className="font-normal text-white/45"> (opcional)</span>}
      </label>
      <div className="relative">
        <select
          id={id(campo)}
          value={v[campo]}
          onChange={(e) => set(campo, e.target.value)}
          className={`${controlCls} ${borde(errores[campo])} cursor-pointer appearance-none pr-11 ${v[campo] ? '' : 'text-white/40'}`}
          {...ariaDeError(campo)}
        >
          <option value="" disabled={!opcional} className="bg-[#0b0b12] text-white">
            Elegí una opción
          </option>
          {opciones.map((op) => (
            <option key={op} value={op} className="bg-[#0b0b12] text-white">
              {op}
            </option>
          ))}
        </select>
        <Chevron />
      </div>
      {mensajeDeError(campo)}
    </div>
  );

  return (
    <form ref={formRef} onSubmit={(ev) => ev.preventDefault()} onKeyDown={onKeyDown} noValidate tabIndex={-1} className="scroll-mt-32 outline-none [color-scheme:dark]">
      {/* Progreso */}
      <div className="mb-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6bdda1]">
          Paso {paso} de 2 · {paso === 1 ? 'Tus datos' : 'Tu negocio'}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-1.5" aria-hidden>
          <span className="h-1 rounded-full" style={{ background: CTA_GRADIENT }} />
          <span className="h-1 rounded-full" style={{ background: paso === 2 ? CTA_GRADIENT : 'rgba(255,255,255,0.12)' }} />
        </div>
      </div>

      {/* Honeypot: invisible para personas; si viene completo, el servidor descarta el envío. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Sitio web
          <input type="text" tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set('website', e.target.value)} />
        </label>
      </div>

      {paso === 1 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={id('nombre')} className={labelCls}>
              Nombre y apellido
            </label>
            <input
              id={id('nombre')}
              type="text"
              autoComplete="name"
              autoCapitalize="words"
              enterKeyHint="next"
              value={v.nombre}
              onChange={(e) => set('nombre', e.target.value)}
              className={`${controlCls} ${borde(errores.nombre)}`}
              {...ariaDeError('nombre')}
            />
            {mensajeDeError('nombre')}
          </div>

          <div>
            <label htmlFor={id('empresa')} className={labelCls}>
              Empresa / Nombre del negocio
            </label>
            <input
              id={id('empresa')}
              type="text"
              autoComplete="organization"
              enterKeyHint="next"
              value={v.empresa}
              onChange={(e) => set('empresa', e.target.value)}
              className={`${controlCls} ${borde(errores.empresa)}`}
              {...ariaDeError('empresa')}
            />
            {mensajeDeError('empresa')}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor={id('email')} className={labelCls}>
              Email
            </label>
            <input
              id={id('email')}
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              enterKeyHint="next"
              placeholder="nombre@empresa.com"
              value={v.email}
              onChange={(e) => set('email', e.target.value)}
              className={`${controlCls} ${borde(errores.email)}`}
              {...ariaDeError('email')}
            />
            {mensajeDeError('email')}
          </div>

          <div>
            <label htmlFor={id('pais')} className={labelCls}>
              País
            </label>
            <div className="relative">
              <select
                id={id('pais')}
                autoComplete="country-name"
                value={v.pais}
                onChange={(e) => elegirPais(e.target.value)}
                className={`${controlCls} ${borde()} cursor-pointer appearance-none pr-11`}
              >
                {opcionesDePais(false)}
              </select>
              <Chevron />
            </div>
          </div>

          <div>
            <label htmlFor={id('telefono')} className={labelCls}>
              WhatsApp
            </label>
            <div
              className={`flex h-[52px] w-full rounded-xl border bg-white/[0.04] transition-colors focus-within:border-[#6bdda1] focus-within:ring-2 focus-within:ring-[#6bdda1]/25 ${borde(errores.telefono)}`}
            >
              {/* Prefijo: sale del país y también se puede cambiar desde acá (un select invisible encima del texto). */}
              <span className="relative flex shrink-0 items-center gap-1 rounded-l-xl border-r border-white/10 pl-3.5 pr-2.5 text-[16px] text-white/70 focus-within:text-white">
                +{pais.dial}
                <svg className="h-3 w-3 text-white/40" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m4 6 4 4 4-4" />
                </svg>
                <select
                  aria-label="Prefijo del país"
                  value={v.pais}
                  onChange={(e) => elegirPais(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                >
                  {opcionesDePais(true)}
                </select>
              </span>
              <input
                id={id('telefono')}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                enterKeyHint="go"
                placeholder={EJEMPLO_DE_NUMERO[pais.code]}
                value={v.telefono}
                onChange={(e) => {
                  paisTocado.current = true;
                  set('telefono', e.target.value);
                }}
                className="h-full min-w-0 flex-1 rounded-r-xl bg-transparent px-3.5 text-[16px] text-white outline-none placeholder:text-white/30"
                {...ariaDeError('telefono')}
              />
            </div>
            {mensajeDeError('telefono') ?? (
              <p className="mt-1.5 text-[13px] leading-[1.35] text-white/45">Te escribimos a este número para coordinar la llamada.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {select('rubro', 'Rubro del negocio', RUBROS, true)}

          <fieldset>
            <legend className={labelCls}>¿Tenés publicidad activa en Meta Ads?</legend>
            <div className="grid grid-cols-2 gap-3" role="radiogroup" {...ariaDeError('publicidad')}>
              {['Sí', 'No'].map((op, i) => (
                <label key={op} className="relative block cursor-pointer">
                  <input
                    id={i === 0 ? id('publicidad') : undefined}
                    type="radio"
                    name={id('publicidad')}
                    value={op}
                    checked={v.publicidad === op}
                    onChange={() => set('publicidad', op)}
                    className="peer sr-only"
                  />
                  <span
                    className={`flex h-[52px] items-center justify-center rounded-xl border bg-white/[0.04] text-[16px] font-medium text-white/75 transition-colors peer-checked:border-[#6bdda1] peer-checked:bg-[#6bdda1]/10 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#6bdda1]/40 ${borde(errores.publicidad)}`}
                  >
                    {op}
                  </span>
                </label>
              ))}
            </div>
            {mensajeDeError('publicidad')}
          </fieldset>

          {select('inversion', '¿Cuánto invertís al mes en publicidad?', INVERSION_MENSUAL)}
          {select('facturacion', 'Facturación mensual aproximada', FACTURACION_MENSUAL)}
          {select('consultas', '¿Cuántas consultas recibís por mes, aproximadamente?', CONSULTAS_POR_MES)}
        </div>
      )}

      {errorEnvio && (
        <p role="alert" className="mt-5 rounded-xl border border-[#ff7a7a]/40 bg-[#ff7a7a]/10 px-4 py-3 text-[14px] leading-[1.4] text-[#ffc9c9]">
          {errorEnvio}
        </p>
      )}

      <div className="mt-6">
        <button
          type="button"
          onClick={avanzar}
          disabled={enviando || verificando}
          className="flex w-full cursor-pointer items-center justify-center border-0 transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
          style={{
            background: CTA_GRADIENT,
            minHeight: 56,
            borderRadius: 999,
            fontFamily: 'var(--font-primary)',
            fontWeight: 800,
            fontSize: 17,
            color: '#04140d',
          }}
        >
          {paso === 1 ? (verificando ? 'Verificando tu WhatsApp…' : 'Continuar') : enviando ? 'Enviando…' : 'Enviar'}
        </button>

        {paso === 2 && (
          <>
            <button
              type="button"
              onClick={() => irAlPaso(1)}
              disabled={enviando}
              className="mx-auto mt-3 block cursor-pointer border-0 bg-transparent px-3 py-2 text-[14px] font-medium text-white/60 hover:text-white disabled:opacity-50"
            >
              Volver
            </button>
            <p className="mt-3 text-center text-[12px] leading-[1.6] text-white/35">
              Al enviar este formulario aceptás nuestra{' '}
              <Link to="/legales/privacidad" target="_blank" rel="noopener noreferrer" className="text-white/55 underline underline-offset-2 hover:text-white">
                Política de Privacidad
              </Link>{' '}
              y nuestros{' '}
              <Link to="/legales/terminos" target="_blank" rel="noopener noreferrer" className="text-white/55 underline underline-offset-2 hover:text-white">
                Términos y Condiciones
              </Link>
              .
            </p>
          </>
        )}
      </div>
    </form>
  );
}
