/**
 * ¿Este deploy tiene activo el formulario propio?
 *
 * Es true sólo si al compilar estaba cargada SENTINEL_FORM_INTAKE_URL (ver vite.config.ts),
 * que es el destino de los leads. Si no está, el sitio sigue usando Jotform como antes:
 * así un deploy sin esa variable nunca deja a los visitantes con un formulario que da error.
 * Cuando la variable quede confirmada en producción, este archivo y FormularioJotform.tsx se pueden borrar.
 */
declare const __FORMULARIO_PROPIO__: boolean;

export const FORMULARIO_PROPIO: boolean = typeof __FORMULARIO_PROPIO__ !== 'undefined' && __FORMULARIO_PROPIO__;
