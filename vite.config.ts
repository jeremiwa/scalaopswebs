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
/** Variables de servidor que usan esas funciones (en Vercel van en el proyecto). */
const DEV_SERVER_ENV = ['SENTINEL_FORM_INTAKE_URL', 'META_CAPI_ACCESS_TOKEN', 'META_CAPI_TEST_EVENT_CODE'];

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
            const mod = await server.ssrLoadModule(`/api/${name}.ts`);
            // Las variables se prestan sólo durante el pedido. Si quedaran en process.env, loadEnv las
            // seguiría viendo aunque se borren o cambien en .env.local (y un cambio de mock a producción,
            // o al revés, no se aplicaría hasta matar el proceso).
            const previos = DEV_SERVER_ENV.map((k) => [k, process.env[k]] as const);
            for (const k of DEV_SERVER_ENV) if (env[k]) process.env[k] = env[k];
            try {
              await mod.default(req, {
                setHeader: (key: string, value: string) => res.setHeader(key, value),
                status: (code: number) => ({json: (data: unknown) => send(code, data)}),
              });
            } finally {
              for (const [k, previo] of previos) {
                if (previo === undefined) delete process.env[k];
                else process.env[k] = previo;
              }
            }
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
      // Sólo se publica si la variable existe o no, nunca su valor. Ver src/components/lead-form/formularioPropio.ts.
      __FORMULARIO_PROPIO__: JSON.stringify(Boolean(env.SENTINEL_FORM_INTAKE_URL)),
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
