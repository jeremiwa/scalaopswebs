import { useState } from 'react';
import { MetaCTA, Reveal, trackMeta } from './ui';

/** ID del VSL (YouTube). Definitivo. */
const VSL_YOUTUBE_ID = 'VYfRjaPxMb4';

/** VSL con FACHADA: thumbnail + Play; el iframe de YouTube se carga recién al hacer click
 *  (no perjudica el LCP). 16:9, bordes SCALA, playsinline, sin autoplay con sonido. */
function VSL() {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#050505] shadow-[0_18px_44px_rgba(0,0,0,0.45)]">
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
            <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg transition-transform group-hover:scale-105">
              <svg width="24" height="26" viewBox="0 0 22 24" fill="#04140d" aria-hidden>
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
 * BLOQUE 1 / Hero — compacto, mobile-first, stacked.
 * Orden: H1 → bajada → VIDEO → CTA → microcopy (el microcopy viene dentro de MetaCTA).
 * Sin eyebrow y sin CTA antes del video.
 */
export function MetaHero() {
  return (
    <section className="relative overflow-hidden bg-black pt-5 pb-6 sm:pt-8 sm:pb-8">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(85% 50% at 50% 0%, rgba(24,93,232,0.12), transparent 62%), radial-gradient(55% 40% at 82% 8%, rgba(107,221,161,0.06), transparent 60%)' }}
      />
      <div className="relative mx-auto w-full max-w-[860px] px-5">
        <Reveal>
          <h1 className="font-extrabold tracking-[-0.02em] text-white text-[2.75rem] leading-[1.02] sm:text-[3.25rem] lg:text-[3.75rem]">
            Más clientes con{' '}
            <span className="whitespace-nowrap bg-gradient-to-r from-[#185de8] to-[#6bdda1] bg-clip-text text-transparent">
              Meta Ads
            </span>
            .
          </h1>
          <p className="mt-3 max-w-[560px] text-[17px] leading-[1.5] text-white/75 sm:text-[18px]">
            Hacemos tu publicidad en Meta de punta a punta. Y una IA responde cada consulta en menos
            de un minuto. Sin sumar gente.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-6">
            <VSL />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-5">
            <MetaCTA location="hero" tall />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
