import { useState } from 'react';
import { Eyebrow, MetaCTA, Reveal, trackMeta } from './ui';

/** ID del VSL (YouTube). Definitivo. */
const VSL_YOUTUBE_ID = 'VYfRjaPxMb4';

/** VSL con FACHADA: thumbnail + Play; el iframe de YouTube se carga recién al hacer click
 *  (no perjudica el LCP). 16:9, bordes SCALA, responsive, playsinline, sin autoplay con sonido. */
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

export function MetaHero() {
  return (
    <section className="relative overflow-hidden bg-black pt-16 pb-14 lg:pt-24 lg:pb-24">
      {/* Profundidad apenas perceptible: radial azul/verde con opacity muy baja. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(85% 55% at 50% 0%, rgba(24,93,232,0.12), transparent 62%), radial-gradient(60% 45% at 82% 10%, rgba(107,221,161,0.07), transparent 60%)' }}
      />
      <div className="relative mx-auto w-full max-w-[1200px] px-5 lg:px-8">
        <div className="flex flex-col gap-9 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          {/* Columna de copy */}
          <Reveal>
            <div className="max-w-[580px]">
              <Eyebrow>Agencia de Meta Ads</Eyebrow>
              <h1 className="mt-4 font-extrabold tracking-[-0.02em] text-white text-[2.625rem] leading-[1.03] sm:text-[3rem] lg:text-[clamp(3.6rem,4.2vw,4.5rem)]">
                Más clientes con{' '}
                <span className="whitespace-nowrap bg-gradient-to-r from-[#185de8] to-[#6bdda1] bg-clip-text text-transparent">
                  Meta Ads
                </span>
                .
              </h1>
              <p className="mt-5 text-[18px] leading-[1.5] text-white/75 sm:text-[19px]">
                Hacemos tu publicidad en Meta de punta a punta. Y una IA responde cada consulta en
                menos de un minuto. Sin sumar gente.
              </p>
              <div className="mt-7">
                <MetaCTA location="hero" />
              </div>
            </div>
          </Reveal>

          {/* Columna del video */}
          <Reveal delay={0.06}>
            <VSL />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
