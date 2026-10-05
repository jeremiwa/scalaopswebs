import { Section, Reveal, Eyebrow } from './ui';

const grad = 'bg-gradient-to-r from-[#185de8] to-[#6bdda1] bg-clip-text text-transparent';

/** Paradas interpoladas del degradé azul→verde (una por círculo) para que el riel sea continuo. */
const STOPS = ['#185de8', '#2672dc', '#3488d0', '#429dc4', '#4fb2b9', '#5dc8ad', '#6bdda1'];

type Variant = 'blue' | 'green' | 'final';

const STEPS: { n: number; t: string; d: string; variant: Variant }[] = [
  { n: 1, t: 'Estrategia', d: 'Definimos qué decir y a quién.', variant: 'blue' },
  { n: 2, t: 'Guiones', d: 'Te escribimos qué grabar, palabra por palabra.', variant: 'blue' },
  { n: 3, t: 'Creativos', d: 'Videos y anuncios listos para publicar.', variant: 'blue' },
  { n: 4, t: 'Campañas', d: 'Las armamos y las manejamos nosotros.', variant: 'blue' },
  { n: 5, t: 'Medimos y ajustamos', d: 'Escalamos lo que vende, cortamos lo que no.', variant: 'blue' },
  { n: 6, t: 'La IA responde', d: 'Cada consulta, en menos de un minuto. También a las 3 de la mañana.', variant: 'green' },
  { n: 7, t: 'Más ventas', d: 'Tu equipo deja de perseguir mensajes y se dedica a cerrar.', variant: 'final' },
];

function Circle({ n, variant }: { n: number; variant: Variant }) {
  if (variant === 'final') {
    return (
      <div
        className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[14px] font-bold text-[#04140d]"
        style={{ background: 'linear-gradient(135deg,#185de8,#6bdda1)', boxShadow: '0 0 24px rgba(107,221,161,0.35)' }}
      >
        {n}
      </div>
    );
  }
  const color = variant === 'green' ? '#6bdda1' : '#185de8';
  return (
    <div
      className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-black text-[14px] font-bold"
      style={{ borderColor: color, color }}
    >
      {n}
    </div>
  );
}

/** Línea de tiempo vertical: círculo + texto. El conector (flex-1) une el centro de cada
 *  círculo con el siguiente, sin importar la altura del texto → el riel siempre queda continuo. */
function Timeline() {
  return (
    <div className="relative">
      {STEPS.map((s, i) => {
        const isLast = i === STEPS.length - 1;
        return (
          <Reveal key={s.n} delay={i * 0.06}>
            <div className="flex gap-4">
              {/* Columna marcador: círculo + conector con el degradé del tramo */}
              <div className="flex w-9 flex-col items-center">
                <Circle n={s.n} variant={s.variant} />
                {!isLast && (
                  <div
                    className="w-0.5 flex-1"
                    style={{ minHeight: 28, background: `linear-gradient(to bottom, ${STOPS[i]}, ${STOPS[i + 1]})` }}
                  />
                )}
              </div>

              {/* Columna texto */}
              <div className={`min-w-0 flex-1 ${isLast ? 'pb-0' : 'pb-7'}`}>
                {s.n === 1 && (
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#185de8]">
                    Publicidad en Meta
                  </p>
                )}
                {s.n === 6 && (
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6bdda1]">
                    Inteligencia artificial
                  </p>
                )}
                <p className="text-[17px] font-semibold leading-[1.3] text-white">{s.t}</p>
                <p className="mt-0.5 text-[15px] leading-[1.45] text-white/60">{s.d}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Tarjeta destacada "300" con borde en degradé azul→verde. */
function Card300() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background:
          'linear-gradient(#0b0b12,#0b0b12) padding-box, linear-gradient(135deg,#185de8,#6bdda1) border-box',
        border: '1px solid transparent',
      }}
    >
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6bdda1]">Desde el día 1</p>
      <p className="mt-2 text-[56px] font-extrabold leading-none" style={{ fontFamily: 'var(--font-primary)' }}>
        <span className={grad}>300</span>
      </p>
      <p className="mt-1 mb-3 text-[18px] font-bold leading-tight text-white">clientes potenciales</p>
      <p className="text-[16px] leading-[1.45] text-white">
        Mientras arrancan las campañas, salimos a buscar 300 clientes potenciales por vos.
      </p>
    </div>
  );
}

export function MetaQueHacemos() {
  return (
    <Section id="que-hacemos" tone="dark">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-16">
        {/* Texto + (en desktop) tarjeta 300 */}
        <div className="text-center lg:text-left">
          <Reveal>
            <Eyebrow>Qué hacemos</Eyebrow>
            <h2 className="text-[28px] font-bold leading-[1.15] text-white lg:text-[40px]">
              Nosotros hacemos la publicidad.
              <br />
              La IA responde.
              <br />
              <span className={grad}>Vos vendés.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-[1.55] text-white/65 lg:mx-0">
              Armamos tus campañas de punta a punta. Y cuando entra la consulta, una IA la responde en
              menos de un minuto.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 hidden lg:block">
            <Card300 />
          </Reveal>
        </div>

        {/* Recorrido */}
        <div className="mt-10 lg:mt-0">
          <Timeline />
        </div>
      </div>

      {/* Tarjeta 300 en mobile: debajo del recorrido */}
      <Reveal delay={0.1} className="mt-10 lg:hidden">
        <Card300 />
      </Reveal>
    </Section>
  );
}
