import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

/**
 * Sólo en `vite dev`: las funciones de /api corren en Vercel y acá no existen,
 * así que sin esto el formulario propio no se puede probar en local.
 * Monta las del formulario con la misma firma (req.body ya parseado, res.status().json()).
 * DEV_GEO_COUNTRY en .env.local simula el país que Vercel detecta por IP.
 */
const DEV_API = ['lead', 'check-whatsapp', 'geo'];

function devFormApi(env: Record<string, string>): Plugin {
  return {
    name: 'dev-form-api',
    apply: 'serve',
    configureServer(server) {
      for (const name of DEV_API) {
        server.middlewares.use(`/api/${name}`, async (req, res) => {
          const send = (status: number, data: unknown) => {
            res.statusCode = status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          };
          try {
            const chunks: Buffer[] = [];
            for await (const chunk of req) chunks.push(chunk as Buffer);
            const raw = Buffer.concat(chunks).toString('utf8');
            (req as any).body = raw ? JSON.parse(raw) : {};
            if (env.DEV_GEO_COUNTRY) req.headers['x-vercel-ip-country'] = env.DEV_GEO_COUNTRY;
            process.env.SENTINEL_FORM_INTAKE_URL ??= env.SENTINEL_FORM_INTAKE_URL;
            const mod = await server.ssrLoadModule(`/api/${name}.ts`);
            await mod.default(req, {
              setHeader: (key: string, value: string) => res.setHeader(key, value),
              status: (code: number) => ({json: (data: unknown) => send(code, data)}),
            });
          } catch (error: any) {
            send(500, {error: error?.message || 'dev api error'});
          }
        });
      }
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss(), devFormApi(env)],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
