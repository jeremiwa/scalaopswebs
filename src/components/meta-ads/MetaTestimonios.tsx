import { Section, Reveal, MetaCTA } from './ui';
import { TESTIMONIOS } from './testimonios';
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

/** Video testimonio de Jordi (mismo Vimeo que /por-que-scala: 1183439807). */
function JordiVideo() {
  return (
    <div className="relative mx-auto w-full max-w-[860px] overflow-hidden rounded-[22px] border border-white/10 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
      <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
        <iframe
          src="https://player.vimeo.com/video/1183439807?badge=0&autopause=0&player_id=0&app_id=58479"
          loading="lazy"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          title="Testimonio Jordi Falcon — SCALA"
        />
      </div>
    </div>
  );
}

export function MetaTestimonios() {
  return (
    <Section tone="dark">
      <Reveal>
        <h2 className="max-w-[760px] text-[28px] font-extrabold leading-[1.1] text-white sm:text-[40px]">
          Lo que dicen los que ya trabajan con nosotros.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8">
          <JordiVideo />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {TESTIMONIOS.map((t, i) => (
          <Reveal key={t.nombre} delay={i * 0.08}>
            <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Quote className="h-5 w-5 text-[#6bdda1]" />
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-white/85">
                "{t.texto}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#185de8] to-[#6bdda1] text-[13px] font-extrabold text-[#04140d]">
                  {initials(t.nombre)}
                </span>
                <span className="leading-tight">
                  <span className="block text-[14px] font-semibold text-white">{t.nombre}</span>
                  <span className="block text-[12px] text-white/50">
                    {t.cargo}, {t.empresa} ({t.ciudad})
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-12">
        <MetaCTA location="testimonios" />
      </div>
    </Section>
  );
}
