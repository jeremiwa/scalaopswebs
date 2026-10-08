/**
 * POST /api/lead — recibe el formulario propio de la web (reemplaza a Jotform)
 * y lo reenvía a Sentinel, que crea el lead en el CRM y le escribe por WhatsApp.
 *
 * Por qué pasa por acá y no va directo del navegador a Sentinel: el endpoint de
 * Sentinel no tiene autenticación (la URL es el secreto) y hace que el bot le
 * escriba al teléfono que reciba. La URL vive en SENTINEL_FORM_INTAKE_URL, del
 * lado del servidor, y acá se valida, se frena el abuso básico y se arma el payload.
 */

export const config = {
    maxDuration: 30,
};

// In-memory rate limiting
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Sentinel responde recién después de generar y mandar el WhatsApp de apertura
 * (varios segundos). El lead ya quedó creado mucho antes, así que no hacemos
 * esperar a la persona: si en este plazo no hubo error, se da por recibido.
 */
const SENTINEL_WAIT_MS = 4000;

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

const text = (v: unknown, max = 200): string => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const digits = (v: unknown): string => text(v, 40).replace(/\D/g, '');

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const forwarded = req.headers['x-forwarded-for'];
        const ip = String(Array.isArray(forwarded) ? forwarded[0] : forwarded || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
        if (isRateLimited(ip)) {
            return res.status(429).json({ error: 'Demasiados envíos. Probá de nuevo en un minuto.' });
        }

        const body = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body) ?? {};

        // Honeypot: campo invisible para personas. Si viene completo es un bot: se responde OK y no se reenvía.
        if (text(body.website)) {
            return res.status(200).json({ ok: true });
        }

        const nombre = text(body.nombre, 120);
        const empresa = text(body.empresa, 120);
        const email = text(body.email, 160).toLowerCase();
        const pais = text(body.pais, 60);
        const codigoPais = digits(body.codigo_pais).slice(0, 4);
        const telefono = digits(body.telefono);
        const rubro = text(body.rubro, 80);
        const publicidadActiva = text(body.publicidad_activa, 10);
        const inversion = text(body.inversion, 80);
        const facturacion = text(body.facturacion, 80);
        const consultas = text(body.consultas, 80);

        const largoTotal = codigoPais.length + telefono.length;
        if (
            nombre.length < 3 ||
            empresa.length < 2 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ||
            !pais ||
            telefono.length < 6 ||
            largoTotal < 8 ||
            largoTotal > 15 ||
            !publicidadActiva ||
            !inversion ||
            !facturacion ||
            !consultas
        ) {
            return res.status(400).json({ error: 'Faltan datos o hay alguno inválido.' });
        }

        const intakeUrl = process.env.SENTINEL_FORM_INTAKE_URL;
        if (!intakeUrl) {
            return res.status(500).json({ error: 'SENTINEL_FORM_INTAKE_URL is not configured.' });
        }

        // Nombres de campo que Sentinel ya entiende. Lo que coincide con el checklist del
        // agente (empresa, rubro, invierte_en_ads) no se vuelve a preguntar en el chat.
        const payload: Record<string, string> = {
            // OJO: "source" no puede contener meta/facebook/instagram: Sentinel lo tomaría por un formulario de anuncio.
            source: 'web',
            name: nombre,
            phone: `+${codigoPais}${telefono}`,
            email,
            empresa,
            pais,
            publicidad_activa_en_meta: publicidadActiva,
            invierte_en_ads: inversion,
            facturacion_mensual: facturacion,
            consultas_por_mes: consultas,
        };
        if (codigoPais) payload.country_code = codigoPais;
        // "Otro" no es un rubro: si no lo mandamos, el agente lo pregunta.
        if (rubro && rubro.toLowerCase() !== 'otro') payload.rubro = rubro;
        // Atribución: con prefijo raw_ queda guardada en el contacto pero el agente no la ve como respuesta.
        const pagina = text(body.pagina, 120);
        if (pagina) payload.raw_pagina = pagina;
        const utm = body.utm && typeof body.utm === 'object' ? (body.utm as Record<string, unknown>) : {};
        for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
            const v = text(utm[k], 150);
            if (v) payload[`raw_${k}`] = v;
        }

        const forward: Promise<{ ok: boolean; status: number; detail: string }> = fetch(intakeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(async (r) => ({ ok: r.ok, status: r.status, detail: r.ok ? '' : (await r.text().catch(() => '')).slice(0, 300) }))
            .catch((e: any) => ({ ok: false, status: 0, detail: e?.message || 'network error' }))
            .then((r) => {
                // El lead NO entró al CRM. Queda completo en el log para poder recuperarlo a mano.
                if (!r.ok) console.error('❌ lead_forward_failed', JSON.stringify({ status: r.status, detail: r.detail, lead: payload }));
                return r;
            });

        const result = await Promise.race([
            forward,
            new Promise<null>((resolve) => setTimeout(() => resolve(null), SENTINEL_WAIT_MS)),
        ]);

        if (result === null) {
            return res.status(202).json({ ok: true });
        }

        if (!result.ok) {
            return res.status(502).json({ error: 'No pudimos registrar tus datos. Probá de nuevo en unos segundos.' });
        }

        return res.status(200).json({ ok: true });
    } catch (error: any) {
        console.error('❌ Error in lead handler:', error);
        return res.status(500).json({ error: 'No pudimos registrar tus datos. Probá de nuevo en unos segundos.' });
    }
}
