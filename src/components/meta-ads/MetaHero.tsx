import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { MetaCTA, MetaLogo, Reveal, trackMeta } from './ui';

/** ID del VSL (YouTube). Definitivo. */
const VSL_YOUTUBE_ID = 'VYfRjaPxMb4';

const grad = 'bg-gradient-to-r from-[#185de8] to-[#6bdda1] bg-clip-text text-transparent';

/** Fórmula del hero en UNA línea: [Meta] + ✨ IA = MÁS VENTAS. */
function Formula() {
  return (
    <div
      className="flex items-center justify-center gap-2 whitespace-nowrap text-[16px] font-extrabold uppercase leading-none sm:text-[18px] lg:justify-start"
      style={{ fontFamily: 'var(--font-primary)' }}
    >
      <MetaLogo className="h-5 w-auto" />
      <span className="text-white/40">+</span>
      <Sparkles className="h-5 w-5 text-[#6bdda1]" aria-hidden />
      <span className="text-[#6bdda1]">IA</span>
      <span className="text-white/40">=</span>
      <span className={grad}>Más ventas</span>
    </div>
  );
}

/** VSL con FACHADA: thumbnail + Play; el iframe de YouTube se carga recién al hacer click.
 *  16:9, bordes SCALA, playsinline, sin autoplay con sonido. */
function VSL() {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative w-full overflow-hidden rounded-[16px] border border-white/10 bg-[#050505] shadow-[0_18px_44px_rgba(0,0,0,0.45)]">
      <div className="relative" style={{ aspectRatio: '16 / 9' }}>
        {play ? (
          <iframe
            src={`https://www.youtube.com/embed/${VSL_YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            title="VSL SCALA — Meta Ads"
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              trackMeta('vsl_play', { where: 'hero' });
              setPlay(true);
            }}
            aria-label="Reproducir video"
            className="group absolute inset-0 h-full w-full cursor-pointer border-0 p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6bdda1]"
          >
            <img
              src={`https://i.ytimg.com/vi/${VSL_YOUTUBE_ID}/maxresdefault.jpg`}
              onError={(e) => {
                e.currentTarget.src = `https://i.ytimg.com/vi/${VSL_YOUTUBE_ID}/hqdefault.jpg`;
              }}
              loading="lazy"
              alt="Ver el video de SCALA"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-105">
              <svg width="22" height="24" viewBox="0 0 22 24" fill="#04140d" aria-hidden>
                <path d="M21 12 0 24V0z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * HERO — mobile-first. Orden mobile: fórmula → H1 → bajada → video → CTA → microcopy.
 * Desktop (lg): dos columnas (texto izquierda, video derecha).
 */
export function MetaHero() {
  return (
    <section id="meta-hero" className="relative overflow-hidden bg-black px-6 pt-6 pb-10 sm:px-8 lg:pt-16 lg:pb-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(85% 50% at 50% 0%, rgba(24,93,232,0.12), transparent 62%), radial-gradient(55% 40% at 82% 8%, rgba(107,221,161,0.06), transparent 60%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-[1120px]">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-14">
          {/* Columna texto */}
          <div>
            <Reveal>
              <h1 className="font-bold tracking-[-0.02em] text-white text-[40px] leading-[1.05] lg:text-[56px]">
                Más clientes con{' '}
                <span className={`whitespace-nowrap ${grad}`}>Meta Ads</span>.
              </h1>
              <p className="mt-3 max-w-[540px] text-[16px] leading-[1.5] text-white/75 lg:text-[18px]">
                Hacemos tu publicidad en Meta de punta a punta. Y una IA responde cada consulta en
                menos de un minuto. Sin sumar gente.
              </p>
            </Reveal>

            {/* Video en el flujo mobile (en desktop va en la columna derecha). */}
            <Reveal delay={0.05} className="mt-5 lg:hidden">
              <VSL />
            </Reveal>

            <Reveal delay={0.08} className="mt-4">
              <MetaCTA
                id="meta-hero-cta"
                location="hero"
                microcopy="Agendá una llamada. Revisamos tu publicidad y te decimos qué cambiaríamos."
              />
            </Reveal>

            {/* Fórmula Meta + IA = Más ventas, ahora debajo del CTA. */}
            <Reveal delay={0.1} className="mt-7">
              <Formula />
            </Reveal>
          </div>

          {/* Columna video (solo desktop) */}
          <div className="hidden lg:block">
            <VSL />
          </div>
        </div>
      </div>
    </section>
  );
}
