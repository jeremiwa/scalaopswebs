import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useEffect, useMemo } from 'react';
import { FORMULARIO_PROPIO } from '../components/lead-form/formularioPropio';

/** Lo que manda el formulario al navegar acá (ver LeadForm.tsx). */
interface EstadoGracias {
    /** Identificador del envío (el event_id del formulario). */
    envio?: string;
    /** Link de WhatsApp con el mensaje listo, si Sentinel lo armó. */
    whatsapp?: string;
}

/** Cuánto se espera en celular antes de abrir WhatsApp solo: que el pixel y GTM alcancen a salir. */
const ESPERA_APERTURA_MS = 1500;

const esCelular = (): boolean =>
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
    // iPadOS se presenta como Mac.
    (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));

/**
 * Marcas por envío en esta pestaña, para que una recarga, o volver de WhatsApp con "atrás",
 * no repita el Lead ni vuelva a abrir WhatsApp solo. Se marca recién cuando la acción pasó:
 * si el efecto se desarma antes (StrictMode en desarrollo monta dos veces), la acción sigue pendiente.
 */
function yaPaso(clave: string): boolean {
    try {
        return sessionStorage.getItem(clave) !== null;
    } catch {
        return false;
    }
}
function marcar(clave: string) {
    try {
        sessionStorage.setItem(clave, '1');
    } catch {
        /* sin storage: no hay forma de recordarlo */
    }
}

/** Para medir en GTM cuántos abren WhatsApp (contra el 68 % de formularios que hoy contestan). */
function avisarAperturaWhatsApp(modo: 'boton' | 'automatico') {
    const w = window as any;
    (w.dataLayer = w.dataLayer || []).push({ event: 'whatsapp_abierto', modo, pagina: window.location.pathname });
}

export const Gracias = () => {
    const estado = (useLocation().state ?? {}) as EstadoGracias;
    const whatsapp = typeof estado.whatsapp === 'string' && estado.whatsapp.startsWith('https://wa.me/') ? estado.whatsapp : '';
    const celular = useMemo(esCelular, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Conversión: al cargar la página post-formulario disparamos el Lead del pixel nuevo (una vez por envío).
        const w = window as any;
        const claveLead = `scala_lead_${estado.envio}`;
        if (w.fbq && (!estado.envio || !yaPaso(claveLead))) {
            w.fbq('trackSingle', '4697348820512055', 'Lead');
            if (estado.envio) marcar(claveLead);
        }
        // En celular se abre WhatsApp solo, después de los eventos. En computadora, sólo el botón.
        const claveWhatsApp = `scala_wa_${estado.envio || whatsapp}`;
        if (!whatsapp || !celular || yaPaso(claveWhatsApp)) return;
        const t = window.setTimeout(() => {
            marcar(claveWhatsApp);
            avisarAperturaWhatsApp('automatico');
            window.location.href = whatsapp;
        }, ESPERA_APERTURA_MS);
        return () => window.clearTimeout(t);
        // Por envío: si la página ya estaba montada y llega otro envío, corre de nuevo.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estado.envio, whatsapp, celular]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#000000] px-4 relative overflow-hidden">
            {/* Background glow similar to Hero */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle at center, rgba(107, 221, 161, 0.08) 0%, transparent 60%)',
                filter: 'blur(60px)',
                zIndex: 0, pointerEvents: 'none'
            }}></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-scala-green/20 to-transparent rounded-full flex items-center justify-center mb-6 border border-scala-green/20">
                    <svg className="w-8 h-8 text-scala-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-4xl md:text-5xl font-[800] text-white leading-tight mb-4 tracking-tight">
                    ¡Gracias por contactarnos!
                </h1>

                {whatsapp ? (
                    <>
                        <p className="text-lg md:text-xl text-[#A0A0B5] mb-8 max-w-lg mx-auto">
                            Último paso: mandanos por WhatsApp el mensaje que te dejamos listo y coordinamos la llamada por ahí.
                        </p>

                        <a
                            href={whatsapp}
                            target={celular ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            onClick={() => avisarAperturaWhatsApp('boton')}
                            className="btn-hover-scale inline-flex items-center justify-center gap-3 relative overflow-hidden text-center w-full sm:w-auto"
                            style={{
                                background: 'linear-gradient(90deg, #185de8, #6bdda1)',
                                padding: '20px 44px',
                                borderRadius: '100px',
                                fontFamily: 'var(--font-primary)',
                                fontWeight: 800,
                                fontSize: '18px',
                                color: '#000000',
                                textDecoration: 'none',
                                boxShadow: '0 0 40px rgba(107,221,161,0.15)',
                            }}
                        >
                            <svg className="w-6 h-6 relative z-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36A9.44 9.44 0 0 1 2.58 12c0-5.22 4.25-9.46 9.47-9.46a9.4 9.4 0 0 1 6.69 2.78 9.4 9.4 0 0 1 2.77 6.69c0 5.22-4.25 9.47-9.47 9.47zm8.06-17.53A11.33 11.33 0 0 0 12.04.63C5.76.63.65 5.74.65 12.02c0 2 .53 3.96 1.52 5.69L.55 23.6l6.04-1.58a11.35 11.35 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.19-5.9-3.33-8.05z" />
                            </svg>
                            <span className="relative z-10">Abrir WhatsApp y enviar</span>
                        </a>

                        <p className="text-base text-[#A0A0B5] mt-4 mb-10">
                            Tocá enviar y te respondemos ahí.
                        </p>

                        <Link to="/" className="text-sm text-[#A0A0B5] underline underline-offset-4 hover:text-white transition-colors">
                            Volver al inicio
                        </Link>
                    </>
                ) : (
                    <>
                        <p className="text-lg md:text-xl text-[#A0A0B5] mb-10 max-w-lg mx-auto">
                            {FORMULARIO_PROPIO
                                ? 'Recibimos tus datos. En unos minutos te escribimos por WhatsApp para coordinar la llamada: tené el teléfono a mano.'
                                : 'Hemos recibido tu solicitud. Nos estaremos comunicando a la brevedad para entender cómo podemos ayudarte a escalar tu negocio.'}
                        </p>

                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <Button variant="primary" className="px-8 py-3 text-lg btn-hover-lift">
                                Volver al inicio
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};
