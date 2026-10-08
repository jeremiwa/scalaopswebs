/**
 * GET /api/geo — país del visitante según su IP, para preseleccionar país y prefijo
 * en el formulario. Vercel ya lo resuelve en cada request (cabecera x-vercel-ip-country):
 * no hace falta un servicio externo ni se guarda nada.
 * Devuelve { country: "AR" } o { country: null } si no se pudo saber (por ejemplo en local).
 */
export default function handler(req: any, res: any) {
    const raw = req.headers['x-vercel-ip-country'];
    const country = typeof raw === 'string' && /^[A-Z]{2}$/.test(raw) ? raw : null;

    // Depende de quién consulta: no se cachea.
    res.setHeader('Cache-Control', 'private, no-store');
    return res.status(200).json({ country });
}
