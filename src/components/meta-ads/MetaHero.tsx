import { useState } from 'react';
import { Eyebrow, MetaCTA, WhatsAppButton, Reveal, trackMeta } from './ui';

/** ID del VSL (YouTube). TODO: reemplazar por el VSL nuevo cuando esté. */
const VSL_YOUTUBE_ID = 'VYfRjaPxMb4';

/** VSL con FACHADA: muestra el thumbnail + botón Play y carga el iframe de YouTube recién al
 *  hacer click (no perjudica el LCP). 16:9, bordes SCALA, responsive. */
function VSL() {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative w-full overflow-hidden rounded-[18px] border border-white/10 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
        {play ? (
          <iframe
            src={`https://www.youtube.com/embed/${VSL_YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
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
            className="group absolute inset-0 h-full w-full cursor-pointer border-0 p-0"
          >
            <img
              src={`https://i.ytimg.com/vi/${VSL_YOUTUBE_ID}/maxresdefault.jpg`}
              onError={(e) => {
                e.currentTarget.src = `https://i.ytimg.com/vi/${VSL_YOUTUBE_ID}/hqdefault.jpg`;
              }}
              loading="lazy"
              alt="VSL SCALA — Meta Ads"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
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

function ProofBox() {
  return (
    <div className="inline-block rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
      <p
        className="text-[26px] sm:text-[30px] font-extrabold leading-none text-white"
        style={{ fontFamily: 'var(--font-primary)' }}
      >
        $24M <span className="text-[#6bdda1]">→</span> $58M
      </p>
      <p className="mt-2 text-[13px] text-white/55">de facturación mensual, en 3 meses (en pesos)</p>
      {/* TODO: confirmar autorización del caso $24M → $58M antes de indexar/pautar */}
    </div>
  );
}

export function MetaHero() {
  return (
    <section className="relative overflow-hidden bg-black px-5 pt-6 pb-10 sm:px-6 sm:pt-10 sm:pb-14">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(90% 55% at 50% 0%, rgba(24,93,232,0.16), transparent 60%), radial-gradient(70% 50% at 85% 15%, rgba(107,221,161,0.10), transparent 60%)' }}
      />
      {/* Mobile: flex-col en orden exacto (sin grid). En lg: grid 2 col con placement por filas. */}
      <div className="relative mx-auto flex w-full max-w-[1120px] flex-col gap-6 text-left lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <div>
            <Eyebrow>Agencia de Meta Ads</Eyebrow>
            <h1 className="mt-3 text-[32px] leading-[1.06] font-extrabold tracking-tight text-white sm:text-[42px] lg:text-[52px]">
              Más clientes con{' '}
              <span className="whitespace-nowrap bg-gradient-to-r from-[#185de8] to-[#6bdda1] bg-clip-text text-transparent">
                Meta Ads
              </span>
              .
            </h1>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-white/70 sm:text-[17px]">
              Hacemos tu publicidad en Meta de punta a punta. Y una IA responde cada consulta en
              menos de un minuto. Sin sumar gente.
            </p>
            <div className="mt-6">
              <MetaCTA location="hero" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-start-2 lg:row-span-2">
          <VSL />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-start-1 lg:row-start-2">
          <div className="flex flex-col items-start gap-6">
            <ProofBox />
            <WhatsAppButton where="hero" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
