/**
 * Landing /meta-ads — SCALA como AGENCIA DE META ADS.
 * Página NUEVA, independiente de /por-que-scala (no comparte componentes editables).
 *
 * TODO: reemplazar testimonios de ejemplo antes de indexar o pautar.
 * Mientras haya testimonios placeholder, la página va con noindex,nofollow.
 */
import { SEO } from '../components/SEO';
import { MetaHeader } from '../components/meta-ads/MetaHeader';
import { MetaHero } from '../components/meta-ads/MetaHero';
import { MetaTeSuena } from '../components/meta-ads/MetaTeSuena';
import { MetaDosCosas } from '../components/meta-ads/MetaDosCosas';
import { MetaDemo } from '../components/meta-ads/MetaDemo';
import { MetaTestimonios } from '../components/meta-ads/MetaTestimonios';
import { MetaComoEmpezamos } from '../components/meta-ads/MetaComoEmpezamos';
import { MetaCtaFinal } from '../components/meta-ads/MetaCtaFinal';
import { MetaStickyCTA } from '../components/meta-ads/MetaStickyCTA';

export function MetaAds() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#6bdda1] selection:text-[#030712] overflow-x-hidden">
      <SEO
        title="SCALA | Agencia de Meta Ads para vender más"
        description="Hacemos tu publicidad en Meta: mensaje, guiones, videos y campañas. Y una IA responde y agenda cada consulta en menos de un minuto."
        canonical="https://scalaops.com/meta-ads"
        noindex
      />
      <MetaHeader />
      <main>
        <MetaHero />
        <MetaTeSuena />
        <MetaDosCosas />
        <MetaDemo />
        <MetaTestimonios />
        <MetaComoEmpezamos />
        <MetaCtaFinal />
      </main>
      <footer className="border-t border-white/10 bg-black px-5 py-10 text-center">
        <img src="/images/scala-logo-white.png" alt="SCALA" className="mx-auto h-5 w-auto opacity-70" />
        <p className="mt-3 text-[12px] text-white/40">© {new Date().getFullYear()} SCALA · Agencia de Meta Ads</p>
      </footer>
      <MetaStickyCTA />
    </div>
  );
}
