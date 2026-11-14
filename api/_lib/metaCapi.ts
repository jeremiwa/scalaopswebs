/**
 * Conversions API de Meta: manda desde el servidor el evento de lead calificado
 * (SubmitApplication) al pixel de las campañas. Lo usa api/lead.ts.
 *
 * - El token va en META_CAPI_ACCESS_TOKEN, sólo del lado del servidor. Si no está, no se manda
 *   nada y el formulario sigue funcionando igual.
 * - META_CAPI_TEST_EVENT_CODE (opcional) marca los eventos como de prueba: aparecen en
 *   "Probar eventos" del Administrador de eventos y no cuentan para las campañas.
 * - El navegador dispara el mismo evento con el mismo event_id: Meta se queda con uno solo.
 * - Email, teléfono y país viajan en SHA-256, como pide Meta.
 */
import { createHash } from 'node:crypto';
import { EVENTO_CALIFICADO, PIXEL_CAMPANAS } from './calificacion.js';

/** v27.0 era la más nueva al escribir esto (11/2026). Meta mantiene cada versión unos dos años. */
const GRAPH_VERSION = 'v27.0';
const TIMEOUT_MS = 3500;

const sha256 = (s: string): string => createHash('sha256').update(s).digest('hex');

export interface DatosDelEnvio {
    eventId: string;
    eventSourceUrl: string;
    email: string;
    /** Dígitos con código de país, sin "+". */
    telefono: string;
    /** Código ISO de dos letras (AR, MX…), o vacío. */
    pais: string;
    ip: string;
    userAgent: string;
    /** Cabecera Cookie tal cual: de ahí salen _fbp y _fbc. */
    cookies: string;
    facturacion: string;
}

export function leerCookie(cabecera: string, nombre: string): string {
    for (const parte of (cabecera || '').split(';')) {
        const [k, ...v] = parte.trim().split('=');
        if (k === nombre) return decodeURIComponent(v.join('='));
    }
    return '';
}

/** Si el pixel todavía no guardó _fbc pero la URL trae fbclid, se arma con el formato que pide Meta. */
export function fbcDesdeUrl(url: string, ahoraMs: number): string {
    try {
        const fbclid = new URL(url).searchParams.get('fbclid');
        return fbclid ? `fb.1.${ahoraMs}.${fbclid}` : '';
    } catch {
        return '';
    }
}

/**
 * Teléfono como lo tiene registrado la gente en Meta: los móviles argentinos van con el 9
 * después del 54 (forma internacional). El resto, tal cual.
 */
export function telefonoParaMeta(digitos: string): string {
    const d = digitos.replace(/\D/g, '');
    return /^54\d{10}$/.test(d) ? `549${d.slice(2)}` : d;
}

/** El evento listo para la API. Separado del envío para poder verificarlo sin mandar nada. */
export function armarEvento(d: DatosDelEnvio, ahora = new Date()) {
    const userData: Record<string, unknown> = {
        client_ip_address: d.ip || undefined,
        client_user_agent: d.userAgent || undefined,
        fbp: leerCookie(d.cookies, '_fbp') || undefined,
        fbc: leerCookie(d.cookies, '_fbc') || fbcDesdeUrl(d.eventSourceUrl, ahora.getTime()) || undefined,
    };
    if (d.email) userData.em = [sha256(d.email.trim().toLowerCase())];
    if (d.telefono) userData.ph = [sha256(telefonoParaMeta(d.telefono))];
    if (d.pais) userData.country = [sha256(d.pais.trim().toLowerCase())];
    for (const k of Object.keys(userData)) if (userData[k] === undefined) delete userData[k];

    return {
        event_name: EVENTO_CALIFICADO,
        event_time: Math.floor(ahora.getTime() / 1000),
        event_id: d.eventId,
        action_source: 'website',
        event_source_url: d.eventSourceUrl,
        user_data: userData,
        custom_data: { facturacion_mensual: d.facturacion },
    };
}

/** Manda el evento. Nunca tira: devuelve si salió y el detalle, para el log. */
export async function enviarEventoCalificado(d: DatosDelEnvio): Promise<{ enviado: boolean; configurado: boolean; detalle: string }> {
    const token = process.env.META_CAPI_ACCESS_TOKEN;
    if (!token) return { enviado: false, configurado: false, detalle: 'META_CAPI_ACCESS_TOKEN no configurado' };

    const cuerpo: Record<string, unknown> = { data: [armarEvento(d)], access_token: token };
    if (process.env.META_CAPI_TEST_EVENT_CODE) cuerpo.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;

    try {
        const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_CAMPANAS}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cuerpo),
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        const data: any = await res.json().catch(() => null);
        if (!res.ok) return { enviado: false, configurado: true, detalle: `HTTP ${res.status}: ${data?.error?.message ?? 'sin detalle'}` };
        return {
            enviado: true,
            configurado: true,
            detalle: `events_received=${data?.events_received ?? '?'} fbtrace_id=${data?.fbtrace_id ?? '?'}${cuerpo.test_event_code ? ' (prueba)' : ''}`,
        };
    } catch (error: any) {
        return { enviado: false, configurado: true, detalle: error?.message || 'error de red' };
    }
}
