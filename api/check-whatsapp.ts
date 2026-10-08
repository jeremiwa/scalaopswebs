/**
 * POST /api/check-whatsapp — ¿el número que la persona escribió existe en WhatsApp?
 * Le pregunta a Sentinel (que consulta por una línea de SCALA) y devuelve
 * { wa_check: 'has_wa' | 'no_wa' | 'unknown' }.
 *
 * 'unknown' es la respuesta para todo lo que no sea una confirmación: Sentinel caído,
 * demora, tope de consultas, falta de configuración. El formulario deja pasar el
 * 'unknown' y sólo frena con 'no_wa': es peor perder un lead bueno que dejar pasar
 * un número dudoso. Por eso este endpoint nunca devuelve error al formulario.
 */

export const config = {
    maxDuration: 15,
};

// In-memory rate limiting
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
// Consultar números es lo que WhatsApp castiga: pocas por visitante.
const MAX_REQUESTS_PER_WINDOW = 6;
const SENTINEL_TIMEOUT_MS = 5000;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    record.count += 1;
    return false;
}

const digits = (v: unknown): string => (typeof v === 'string' ? v.slice(0, 40).replace(/\D/g, '') : '');

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const unknown = () => res.status(200).json({ ok: true, wa_check: 'unknown' });

    try {
        const forwarded = req.headers['x-forwarded-for'];
        const ip = String(Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
        if (isRateLimited(ip)) return unknown();

        const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) ?? {};
        const codigoPais = digits(body.codigo_pais).slice(0, 4);
        const telefono = digits(body.telefono);
        const largoTotal = codigoPais.length + telefono.length;
        if (!codigoPais || telefono.length < 6 || largoTotal < 8 || largoTotal > 15) {
            return res.status(400).json({ error: 'Número inválido.' });
        }

        const intakeUrl = process.env.SENTINEL_FORM_INTAKE_URL;
        if (!intakeUrl) return unknown();

        const r = await fetch(`${intakeUrl.replace(/\/+$/, '')}/check-phone`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: `+${codigoPais}${telefono}`, country_code: codigoPais }),
            signal: AbortSignal.timeout(SENTINEL_TIMEOUT_MS),
        });
        if (!r.ok) return unknown();

        const data: any = await r.json().catch(() => null);
        const waCheck = data?.wa_check === 'has_wa' || data?.wa_check === 'no_wa' ? data.wa_check : 'unknown';
        return res.status(200).json({ ok: true, wa_check: waCheck });
    } catch (error: any) {
        console.error('❌ Error in check-whatsapp handler:', error?.message || error);
        return unknown();
    }
}
