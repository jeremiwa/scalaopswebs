/**
 * Preguntas de facturación del formulario y la regla de quién califica para avisarle a Meta.
 * Sin dependencias: lo usan el formulario (navegador) y api/lead.ts (servidor), así los dos
 * deciden igual si se manda el evento SubmitApplication. Vive en api/_lib porque las funciones
 * de Vercel sólo deben importar código de dentro de api/; el formulario lo importa desde acá.
 *
 * Calificar acá NO frena a nadie: todos envían el formulario y reciben el WhatsApp.
 * Sólo decide qué conversión se le reporta a Meta.
 */

export const FACTURACION_MENSUAL = ['Menos de USD 3.000', 'USD 3.000 a 5.000', 'USD 5.000 a 10.000', 'Más de USD 10.000'];

/** Con esta facturación aparece la pregunta de capital (para no perder a quien no factura pero tiene para invertir). */
export const FACTURACION_PIDE_CAPITAL = 'Menos de USD 3.000';

export const CAPITAL_DISPONIBLE = ['Menos de USD 1.000', 'USD 1.000 a 3.000', 'USD 3.000 a 10.000', 'Más de USD 10.000'];

/** Rangos más altos que los de facturación: con los mismos, casi todos marcarían el último y el dato no diría nada. */
export const FACTURACION_OBJETIVO = ['USD 3.000 a 5.000', 'USD 5.000 a 10.000', 'USD 10.000 a 30.000', 'Más de USD 30.000'];

/** Factura USD 3.000 o más. Un valor que no sea de la lista actual (por ejemplo, de una versión vieja de la página) no califica. */
export const calificaParaMeta = (facturacion: string): boolean =>
  FACTURACION_MENSUAL.includes(facturacion) && facturacion !== FACTURACION_PIDE_CAPITAL;

/** Pixel de las campañas de SCALA ("SCALA LEADS FORM VSL"). El evento calificado va sólo acá. */
export const PIXEL_CAMPANAS = '4697348820512055';

export const EVENTO_CALIFICADO = 'SubmitApplication';
