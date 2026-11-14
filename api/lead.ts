/**
 * POST /api/lead — recibe el formulario propio de la web (reemplaza a Jotform)
 * y lo reenvía a Sentinel, que crea el lead en el CRM y le escribe por WhatsApp.
 *
 * Por qué pasa por acá y no va directo del navegador a Sentinel: el endpoint de
 * Sentinel no tiene autenticación (la URL es el secreto) y hace que el bot le
 * escriba al teléfono que reciba. La URL vive en SENTINEL_FORM_INTAKE_URL, del
 * lado del servidor, y acá se valida, se frena el abuso básico y se arma el payload.
 *
 * Si el lead factura USD 3.000 o más, además se le avisa a Meta por Conversions API
 * (SubmitApplication, ver _lib/metaCapi.ts). A Sentinel le llegan todos, califiquen o no.
 *
 * Redirección a WhatsApp: se le pide a Sentinel (redirect_whatsapp) que no le escriba al
 * lead y devuelva un link de WhatsApp con un mensaje listo, para que escriba él primero.
 * Si lo devuelve, va al navegador como whatsapp_url y la página de gracias lo abre. Si no
 * (lead que ya tenía conversación, ninguna línea con sesión, Sentinel lento), Sentinel le
 * escribe como siempre y la web responde igual que antes. Contrato:
 * docs/formulario-redireccion-whatsapp.md del backend.
 */
import { enviarEventoCalificado } from './_lib/metaCapi.js';
import { calificaParaMeta } from './_lib/calificacion.js';

export const config = {
    maxDuration: 30,
};

// In-memory rate limiting
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Con la redirección, Sentinel contesta en uno o dos segundos con el link. Cuando
 * igual le escribe él (camino de siempre), responde recién después de generar y
 * mandar la apertura: varios segundos. El lead ya quedó creado mucho antes, así que
 * no hacemos esperar a la persona: si en este plazo no hubo error, se da por recibido
 * (sin link: Sentinel le escribe).
 */
const SENTINEL_WAIT_MS = 4000;

/** El link que devuelve Sentinel, sólo si es de WhatsApp. Cualquier otra cosa se ignora. */
function linkDeWhatsApp(v: unknown): string {
    return typeof v === 'string' && v.startsWith('https://wa.me/') && v.length <= 2000 ? v : '';
}

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

/** URL desde la que se envió, para Meta. Sólo se acepta la del sitio (o localhost en desarrollo). */
function urlDeOrigen(raw: string, pagina: string): string {
    try {
        const u = new URL(raw);
        if (/^(www\.)?scalaops\.com$/.test(u.hostname) || u.hostname === 'localhost') return u.toString().slice(0, 1000);
    } catch {
        /* sigue abajo */
    }
    return `https://scalaops.com${pagina.startsWith('/') ? pagina : '/'}`;
}

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Primero la configuración: así un deploy sin la variable se detecta con cualquier pedido, sin mandar un lead.
        const intakeUrl = process.env.SENTINEL_FORM_INTAKE_URL;
        if (!intakeUrl) {
            return res.status(500).json({ error: 'SENTINEL_FORM_INTAKE_URL is not configured.' });
        }

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
        const capital = text(body.capital, 80);
        const objetivo = text(body.objetivo, 80);
        const consultas = text(body.consultas, 80);
        const paisIso = text(body.pais_iso, 2).toUpperCase();
        const eventId = /^[A-Za-z0-9-]{8,64}$/.test(text(body.event_id, 64)) ? text(body.event_id, 64) : '';

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

        // Nombres de campo que Sentinel ya entiende. Lo que coincide con el checklist del
        // agente (empresa, rubro, invierte_en_ads) no se vuelve a preguntar en el chat.
        const payload: Record<string, string | boolean> = {
            // OJO: "source" no puede contener meta/facebook/instagram: Sentinel lo tomaría por un formulario de anuncio.
            source: 'web',
            // El lead escribe primero: Sentinel devuelve el link de WhatsApp en vez de escribirle (ver arriba).
            redirect_whatsapp: true,
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
        // Objetivo y capital son opcionales acá: una pestaña con la versión anterior de la página no los manda.
        if (objetivo) payload.facturacion_objetivo = objetivo;
        if (capital) payload.capital_para_invertir = capital;
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

        const forward: Promise<{ ok: boolean; status: number; detail: string; whatsapp: string }> = fetch(intakeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(async (r) => {
                if (!r.ok) return { ok: false, status: r.status, detail: (await r.text().catch(() => '')).slice(0, 300), whatsapp: '' };
                const data: any = await r.json().catch(() => null);
                return { ok: true, status: r.status, detail: '', whatsapp: linkDeWhatsApp(data?.whatsapp_redirect?.url) };
            })
            .catch((e: any) => ({ ok: false, status: 0, detail: e?.message || 'network error', whatsapp: '' }))
            .then((r) => {
                // El lead NO entró al CRM. Queda completo en el log para poder recuperarlo a mano.
                if (!r.ok) console.error('❌ lead_forward_failed', JSON.stringify({ status: r.status, detail: r.detail, lead: payload }));
                return r;
            });

        const result = await Promise.race([
            forward,
            new Promise<null>((resolve) => setTimeout(() => resolve(null), SENTINEL_WAIT_MS)),
        ]);

        if (result !== null && !result.ok) {
            return res.status(502).json({ error: 'No pudimos registrar tus datos. Probá de nuevo en unos segundos.' });
        }

        // Recién con el lead aceptado, y sólo si factura USD 3.000 o más, se le avisa a Meta.
        // Si la persona reintenta tras un error, el event_id es el mismo y Meta no lo cuenta dos veces.
        if (eventId && calificaParaMeta(facturacion)) {
            const meta = await enviarEventoCalificado({
                eventId,
                eventSourceUrl: urlDeOrigen(text(body.url, 1000), text(body.pagina, 120)),
                email,
                telefono: `${codigoPais}${telefono}`,
                pais: paisIso,
                ip,
                userAgent: String(req.headers['user-agent'] || '').slice(0, 500),
                cookies: String(req.headers.cookie || ''),
                facturacion,
            });
            if (meta.enviado) console.log(JSON.stringify({ event: 'meta_capi_ok', event_id: eventId, detalle: meta.detalle }));
            else if (!meta.configurado) console.warn(JSON.stringify({ event: 'meta_capi_skip', detalle: meta.detalle }));
            else console.error('❌ meta_capi_failed', JSON.stringify({ event_id: eventId, detalle: meta.detalle }));
        }

        // Con link, la página de gracias manda al lead a WhatsApp. Sin link (o si Sentinel tardó), igual que antes.
        return res.status(result === null ? 202 : 200).json(result?.whatsapp ? { ok: true, whatsapp_url: result.whatsapp } : { ok: true });
    } catch (error: any) {
        console.error('❌ Error in lead handler:', error);
        return res.status(500).json({ error: 'No pudimos registrar tus datos. Probá de nuevo en unos segundos.' });
    }
}
