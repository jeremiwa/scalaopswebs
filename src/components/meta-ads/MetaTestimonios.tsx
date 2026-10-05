import { useRef, useState } from 'react';
import { Section, Reveal, Eyebrow } from './ui';

/**
 * Carrusel de testimonios de texto: APAGADO hasta tener testimonios reales.
 * Cambiar a true cuando se carguen testimonios reales.
 */
const MOSTRAR_TESTIMONIOS_TEXTO = false;

const TESTIMONIOS_TEXTO: { nombre: string; cargo: string; texto: string }[] = [
  {
    nombre: 'Martín S.',
    cargo: 'Director Comercial · Real Estate',
    texto:
      'La auditoría fue un antes y un después. Nos mostró fallas reales en cómo vendíamos: objeciones mal trabajadas, poco seguimiento y un equipo sin un proceso claro. Scala nos cambió el negocio.',
  },
  {
    nombre: 'Laura G.',
    cargo: 'CEO · Agencia B2B',
    texto:
      'Implementamos IA en toda la empresa, la velocidad y profesionalismo 10 puntos. No solo los recomiendo, es casi una obligación si tenés un negocio y no tenés IA.',
  },
  {
    nombre: 'Diego F.',
    cargo: 'Gerente · Concesionaria (Rosario)',
    texto:
      'Probamos agencias que nos traían likes. Acá el foco fue otro: qué decir, a quién y qué pasa con cada lead. El equipo dejó de perseguir mensajes y se dedica a cerrar.',
  },
];

/** Video testimonio de Jordi — 9:16, ancho 100% con máximo 480px, centrado (mismo Vimeo). */
function JordiVideo() {
  return (
    <div className="mx-auto w-full max-w-[480px]">
      <div
        className="relative w-full overflow-hidden rounded-[16px] border border-white/10 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
        style={{ aspectRatio: '9 / 16' }}
      >
        <iframe
          src="https://player.vimeo.com/video/1183439807?badge=0&autopause=0&player_id=0&app_id=58479"
          loading="lazy"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
          title="Testimonio Jordi Falcón — SCALA"
        />
      </div>
    </div>
  );
}

function CarruselTexto() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.clientWidth + 12 : el.clientWidth;
    setActive(Math.round(el.scrollLeft / step));
  };

  return (
    <div className="mt-8">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIOS_TEXTO.map((t) => (
          <figure
            key={t.nombre}
            className="w-[85%] shrink-0 snap-center rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <blockquote className="text-[15px] leading-[1.5] text-white/85">"{t.texto}"</blockquote>
            <figcaption className="mt-4">
              <span className="block text-[15px] font-semibold text-white">{t.nombre}</span>
              <span className="block text-[13px] text-white/55">{t.cargo}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {TESTIMONIOS_TEXTO.map((t, i) => (
          <span
            key={t.nombre}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${i === active ? 'bg-[#6bdda1]' : 'bg-white/25'}`}
          />
        ))}
      </div>
    </div>
  );
}

export function MetaTestimonios() {
  return (
    <Section id="testimonios" tone="dark">
      <Reveal>
        <Eyebrow>Resultados</Eyebrow>
        <h2 className="max-w-[760px] text-[28px] font-bold leading-[1.15] text-white lg:text-[40px]">
          Lo que dicen los que ya trabajan con nosotros.
        </h2>
      </Reveal>

      <div className="mt-6 lg:mt-10 lg:grid lg:grid-cols-[480px_1fr] lg:items-center lg:gap-14">
        <Reveal>
          <JordiVideo />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-4 lg:mt-0">
            <p className="text-[17px] font-semibold text-white">Jordi Falcón</p>
            <p className="mt-0.5 text-[14px] text-white/55">CEO, Finques Falcón (Barcelona)</p>
            <blockquote className="relative mt-3 pl-4 text-[16px] leading-[1.55] text-white/85">
              <span
                className="absolute left-0 top-0 h-full w-0.5 rounded"
                style={{ background: 'linear-gradient(to bottom,#185de8,#6bdda1)' }}
              />
              "Los recomiendo mucho, gran conocimiento técnico. Nos ayudaron a escalar la operativa sin
              sumar más gasto en personal."
            </blockquote>
          </div>
        </Reveal>
      </div>

      {MOSTRAR_TESTIMONIOS_TEXTO && <CarruselTexto />}
    </Section>
  );
}
