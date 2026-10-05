import { useRef, useState } from 'react';
import { Section, Reveal, MetaCTA } from './ui';
import { TESTIMONIOS, type Testimonio } from './testimonios';
import { Quote } from 'lucide-react';

function initials(name: string): string {
  return name
    .replace(/[^\p{L}\s.]/gu, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

/** Video testimonio de Jordi — formato 9:16 (mismo Vimeo que /por-que-scala: 1183439807). */
function JordiVideo() {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <div className="relative w-full max-w-[300px] overflow-hidden rounded-[18px] border border-white/10 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.45)] lg:max-w-[340px]">
        <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
          <iframe
            src="https://player.vimeo.com/video/1183439807?badge=0&autopause=0&player_id=0&app_id=58479"
            loading="lazy"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            title="Testimonio Jordi Falcón — SCALA"
          />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <img src="/images/jordi.jpg" alt="Jordi Falcón" className="h-10 w-10 rounded-full object-cover" />
        <div className="leading-tight">
          <p className="text-[14px] font-semibold text-white">Jordi Falcón</p>
          <p className="text-[12px] text-white/50">CEO, Finques Falcón (Barcelona)</p>
        </div>
      </div>
    </div>
  );
}

function TestimonioCard({ t }: { t: Testimonio }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <Quote className="h-5 w-5 text-[#6bdda1]" />
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-white/85">"{t.texto}"</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {t.foto ? (
          <img src={t.foto} alt={t.nombre} className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#185de8] to-[#6bdda1] text-[13px] font-extrabold text-[#04140d]">
            {initials(t.nombre)}
          </span>
        )}
        <span className="leading-tight">
          <span className="block text-[14px] font-semibold text-white">{t.nombre}</span>
          <span className="block text-[12px] text-white/50">
            {t.rol}
            {t.ciudad ? ` (${t.ciudad})` : ''}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function MetaTestimonios() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) setActive(i);
  };

  return (
    <Section tone="dark">
      <Reveal>
        <h2 className="max-w-[760px] text-[28px] font-extrabold leading-[1.1] text-white sm:text-[38px]">
          Lo que dicen los que ya trabajan con nosotros.
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-[340px_1fr] lg:items-start">
        <Reveal>
          <JordiVideo />
        </Reveal>

        {/* Desktop: apilados a la derecha */}
        <Reveal delay={0.08}>
          <div className="hidden gap-4 lg:grid">
            {TESTIMONIOS.map((t) => (
              <TestimonioCard key={t.nombre} t={t} />
            ))}
          </div>

          {/* Mobile: carrusel horizontal con puntitos */}
          <div className="lg:hidden">
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {TESTIMONIOS.map((t) => (
                <div key={t.nombre} className="w-full shrink-0 snap-center">
                  <TestimonioCard t={t} />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {TESTIMONIOS.map((t, i) => (
                <span
                  key={t.nombre}
                  className={`h-2 rounded-full transition-all ${i === active ? 'w-5 bg-[#6bdda1]' : 'w-2 bg-white/25'}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-8">
        <MetaCTA location="testimonios" />
      </div>
    </Section>
  );
}
