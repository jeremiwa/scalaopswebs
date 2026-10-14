import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { MetaCTA, MetaLogo, Reveal, trackMeta } from './ui';

/** ID del VSL (Vimeo). Definitivo. */
const VSL_VIMEO_ID = '1235929852';

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

/** VSL de Vimeo embebido (16:9, bordes SCALA). Muestra el póster propio de Vimeo y reproduce al
 *  click del usuario (sin autoplay). Conserva el evento de funnel `vsl_play` vía la Player API
 *  (player.js), igual que el tracking anterior. Mismo patrón de embed que el testimonio de Jordi. */
function VSL() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let player: any;

    const wire = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Vimeo = (window as any).Vimeo;
      if (!Vimeo || !ref.current || cancelled) return;
      player = new Vimeo.Player(ref.current);
      let fired = false;
      player.on('play', () => {
        if (fired) return; // una sola vez por carga, como la fachada anterior
        fired = true;
        trackMeta('vsl_play', { where: 'hero' });
      });
    };

    const SRC = 'https://player.vimeo.com/api/player.js';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).Vimeo) {
      wire();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
      if (existing) {
        existing.addEventListener('load', wire);
      } else {
        const s = document.createElement('script');
        s.src = SRC;
        s.async = true;
        s.addEventListener('load', wire);
        document.body.appendChild(s);
      }
    }

    return () => {
      cancelled = true;
      if (player && typeof player.off === 'function') player.off('play');
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-[16px] border border-white/10 bg-[#050505] shadow-[0_18px_44px_rgba(0,0,0,0.45)]">
      <div className="relative" style={{ aspectRatio: '16 / 9' }}>
        <iframe
          ref={ref}
          src={`https://player.vimeo.com/video/${VSL_VIMEO_ID}?badge=0&autopause=0&player_id=0&app_id=58479`}
          loading="lazy"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
          title="SCALA META ADS"
        />
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
    <section
      id="meta-hero"
      className="relative overflow-hidden bg-black pt-[var(--hero-top)] pb-[var(--section-y)]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(85% 50% at 50% 0%, rgba(24,93,232,0.12), transparent 62%), radial-gradient(55% 40% at 82% 8%, rgba(107,221,161,0.06), transparent 60%)',
        }}
      />
      <div className="relative meta-shell">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-14">
          {/* Columna texto */}
          <div className="text-center lg:text-left">
            <Reveal>
              <h1 className="font-bold tracking-[-0.02em] text-white text-[40px] leading-[1.05] lg:text-[56px]">
                Más clientes con{' '}
                <span className={`whitespace-nowrap ${grad}`}>Meta Ads</span>.
              </h1>
              <p className="mx-auto mt-5 max-w-[540px] text-[16px] leading-[1.5] text-white/75 lg:mx-0 lg:text-[18px]">
                Hacemos tu publicidad en Meta de punta a punta. Y una IA responde cada consulta en
                menos de un minuto. Sin sumar gente.
              </p>
            </Reveal>

            {/* Video en el flujo mobile (en desktop va en la columna derecha). */}
            <Reveal delay={0.05} className="mt-8 lg:hidden">
              <VSL />
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <MetaCTA
                id="meta-hero-cta"
                location="hero"
                microcopy="Agendá una llamada. Revisamos tu publicidad y te decimos qué cambiaríamos."
              />
            </Reveal>

            {/* Fórmula Meta + IA = Más ventas, ahora debajo del CTA. */}
            <Reveal delay={0.1} className="mt-9">
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
