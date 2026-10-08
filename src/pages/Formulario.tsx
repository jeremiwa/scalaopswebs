import { Suspense, lazy, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

// Se carga aparte: trae la librería de validación de teléfonos, que no hace falta en el resto del sitio.
const LeadForm = lazy(() => import('../components/lead-form/LeadForm').then((m) => ({ default: m.LeadForm })));

/** Página /formulario: formulario propio (antes era un iframe de Jotform). Acá apuntan los CTA de todo el sitio. */
export const Formulario = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-scala-bg selection:bg-scala-green selection:text-[#030712] relative overflow-x-hidden flex flex-col">
            <SEO
              title="Contacto | Agendar llamada con ScalaOps"
              description="Completá el formulario para que un especialista de Scala te contacte y analice cómo optimizar tu operación comercial."
              canonical="https://scalaops.com/formulario"
              noindex={true}
            />
            <main className="flex-grow flex items-center justify-center pt-16 pb-16 px-4">
                <div className="w-full max-w-[600px] mx-auto bg-[#050505] rounded-3xl border border-white/5 p-6 md:p-8 shadow-2xl">
                    <h1 className="text-[26px] md:text-[30px] font-bold leading-tight text-white">Agendar llamada</h1>
                    <p className="mt-2 mb-7 text-[15px] leading-[1.5] text-white/60">
                        Completá tus datos y te escribimos por WhatsApp para coordinarla.
                    </p>
                    <Suspense fallback={<div className="h-[440px]" aria-busy="true" />}>
                        <LeadForm />
                    </Suspense>
                </div>
            </main>

            <Footer />
        </div>
    );
};
