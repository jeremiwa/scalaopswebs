/**
 * Datos del formulario propio (reemplaza a Jotform): opciones de cada pregunta,
 * países con su prefijo y la validación del número de WhatsApp (libphonenumber).
 * Las preguntas y opciones son las mismas que tenía el Jotform "Agendar llamada".
 */
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js/min';

export const RUBROS = [
  'Inmobiliaria',
  'Concesionaria / Automotor',
  'Salud y estética',
  'Educación / Cursos online',
  'E-commerce',
  'Servicios profesionales',
  'Otro',
];

export const INVERSION_MENSUAL = [
  'No invierto',
  'Menos de 3.000 USD',
  '3.000 a 5.000 USD',
  '5.000 a 10.000 USD',
  '10.000 a 30.000 USD',
  'Más de 30.000 USD',
];

export const FACTURACION_MENSUAL = [
  'Menos de USD 5.000',
  'USD 5.000 – 20.000',
  'USD 20.000 – 50.000',
  'USD 50.000 – 100.000',
  'USD 100.000+',
];

export const CONSULTAS_POR_MES = [
  'Menos de 50',
  'Entre 50 y 200',
  'Entre 200 y 500',
  'Entre 500 y 1.000',
  'Más de 1.000',
];

export interface Pais {
  /** Código ISO de dos letras (AR, MX…). */
  code: string;
  name: string;
  /** Prefijo internacional sin "+". */
  dial: string;
}

const nombres = (() => {
  try {
    return new Intl.DisplayNames(['es'], { type: 'region' });
  } catch {
    return null;
  }
})();

/** Todos los países, por nombre en español. */
export const PAISES: Pais[] = getCountries()
  .map((code) => ({ code, name: nombres?.of(code) ?? code, dial: getCountryCallingCode(code) }))
  .sort((a, b) => a.name.localeCompare(b.name, 'es'));

const porCodigo = new Map(PAISES.map((p) => [p.code, p]));

/** Arriba de la lista, para no hacer buscar a la mayoría. */
export const PAISES_FRECUENTES: Pais[] = ['AR', 'MX', 'CO', 'CL', 'PE', 'UY', 'PY', 'BO', 'EC', 'VE', 'ES', 'US']
  .map((c) => porCodigo.get(c))
  .filter((p): p is Pais => !!p);

export const paisPorCodigo = (code: string): Pais => porCodigo.get(code) ?? porCodigo.get('AR') ?? PAISES[0];

/** País que informa el servidor según la IP (ver api/geo.ts), si es uno de la lista. */
export const paisValido = (code: unknown): code is string => typeof code === 'string' && porCodigo.has(code);

/** Ejemplo de cómo escribir el número, para los países más comunes. */
export const EJEMPLO_DE_NUMERO: Record<string, string> = {
  AR: '11 2345 6789',
  MX: '55 1234 5678',
  CO: '300 123 4567',
  CL: '9 1234 5678',
  PE: '912 345 678',
  UY: '91 234 567',
  ES: '612 34 56 78',
};

/** Zona horaria del navegador → país sugerido. Es el valor inicial hasta que llega el país por IP. */
const PAIS_POR_ZONA: [prefijo: string, code: string][] = [
  ['America/Argentina', 'AR'],
  ['America/Buenos_Aires', 'AR'],
  ['America/Mexico_City', 'MX'],
  ['America/Monterrey', 'MX'],
  ['America/Bogota', 'CO'],
  ['America/Santiago', 'CL'],
  ['America/Lima', 'PE'],
  ['America/Montevideo', 'UY'],
  ['America/Asuncion', 'PY'],
  ['America/La_Paz', 'BO'],
  ['America/Guayaquil', 'EC'],
  ['America/Caracas', 'VE'],
  ['America/Sao_Paulo', 'BR'],
  ['Europe/Madrid', 'ES'],
];

export function paisSugerido(): string {
  try {
    const zona = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return PAIS_POR_ZONA.find(([prefijo]) => zona.startsWith(prefijo))?.[1] ?? 'AR';
  } catch {
    return 'AR';
  }
}

export type TelefonoAnalizado =
  | {
      ok: true;
      /** País al que pertenece el número: puede no ser el elegido si lo escribieron con "+". */
      pais: string;
      codigoPais: string;
      /** Número nacional en dígitos, sin prefijo. Con el prefijo adelante es lo que recibe Sentinel. */
      nacional: string;
    }
  | { ok: false; error: string };

/**
 * Valida el número contra las reglas reales de numeración del país y lo deja listo para enviar.
 * Acepta las formas en que la gente lo escribe: con espacios o guiones, con el 0 y el 15
 * argentinos ("0221 15 670-3737"), o completo con "+" aunque el país elegido sea otro.
 * Que exista en WhatsApp se comprueba después, contra Sentinel (ver api/check-whatsapp.ts).
 */
export function analizarTelefono(raw: string, codigoPais: string): TelefonoAnalizado {
  const texto = raw.trim();
  if (!texto.replace(/\D/g, '')) return { ok: false, error: 'Escribí tu número de WhatsApp.' };

  let numero = parsePhoneNumberFromString(texto, codigoPais as CountryCode);
  // México: todavía se escribe "+52 1 55…" (el 1 de móvil dejó de usarse en 2019). Se lee sin el 1.
  if (numero && !numero.isValid() && numero.countryCallingCode === '52' && /^1\d{10}$/.test(numero.nationalNumber)) {
    numero = parsePhoneNumberFromString(`+52${numero.nationalNumber.slice(1)}`);
  }

  if (!numero || !numero.isValid()) {
    const pais = paisPorCodigo(codigoPais);
    return {
      ok: false,
      error: texto.startsWith('+')
        ? 'Revisá el número: no coincide con ningún país.'
        : `Revisá el número: no es un número válido de ${pais.name}.`,
    };
  }

  return {
    ok: true,
    pais: numero.country && porCodigo.has(numero.country) ? numero.country : codigoPais,
    codigoPais: numero.countryCallingCode,
    nacional: numero.nationalNumber,
  };
}
