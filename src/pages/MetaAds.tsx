/**
 * Landing /meta-ads — SCALA como AGENCIA DE META ADS.
 * Página NUEVA, independiente de /por-que-scala (no comparte componentes editables).
 *
 * Estructura: Header · Hero · Qué hacemos · Testimonios · Cierre · Footer (+ barra fija mobile).
 * Los CTA abren el formulario propio en un modal (MetaLeadModalProvider), sin salir de la página.
 * TODO: mientras el carrusel de testimonios de texto esté apagado / sin reales, va noindex.
 */
import { SEO } from '../components/SEO';
import { Logo } from '../components/ui/Logo';
import { MetaHeader } from '../components/meta-ads/MetaHeader';
import { MetaHero } from '../components/meta-ads/MetaHero';
import { MetaQueHacemos } from '../components/meta-ads/MetaQueHacemos';
import { MetaTestimonios } from '../components/meta-ads/MetaTestimonios';
import { MetaCierre } from '../components/meta-ads/MetaCierre';
import { MetaStickyCTA } from '../components/meta-ads/MetaStickyCTA';
import { MetaLeadModalProvider } from '../components/meta-ads/MetaLeadModal';

export function MetaAds() {
  return (
    <div className="meta-ads min-h-screen bg-black text-white selection:bg-[#6bdda1] selection:text-[#030712]">
      <SEO
        title="SCALA | Agencia de Meta Ads para vender más"
        description="Hacemos tu publicidad en Meta: mensaje, guiones, videos y campañas. Y una IA responde cada consulta en menos de un minuto."
        canonical="https://scalaops.com/meta-ads"
        noindex
      />
      <MetaLeadModalProvider>
        <MetaHeader />
        <main>
          <MetaHero />
          <MetaQueHacemos />
          <MetaTestimonios />
          <MetaCierre />
        </main>
        {/* pb extra en mobile para que la barra fija nunca tape el footer */}
        <footer className="border-t border-white/10 bg-black pt-10 pb-28 text-center lg:pb-10">
          <div className="meta-shell">
            <div className="flex justify-center opacity-70">
              <Logo />
            </div>
            <p className="mt-3 text-[12px] text-white/40">© {new Date().getFullYear()} SCALA · Agencia de Meta Ads</p>
          </div>
        </footer>
        <MetaStickyCTA />
      </MetaLeadModalProvider>
    </div>
  );
}
