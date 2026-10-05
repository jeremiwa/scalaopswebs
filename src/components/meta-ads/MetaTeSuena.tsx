import { Section, Reveal } from './ui';
import { WhatsAppUnread } from './mockups';

const cards = [
  'Una agencia que te trajo likes.',
  'Un chico que "hace redes".',
  'Anuncios que armaste vos, a la noche.',
];

export function MetaTeSuena() {
  return (
    <Section tone="soft">
      <Reveal>
        <h2 className="max-w-[720px] text-[28px] font-extrabold leading-[1.1] text-white sm:text-[38px]">
          Ya probaste. Y pasó lo de siempre.
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[16px] font-medium text-white/85">{c}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 text-[26px] font-extrabold text-white sm:text-[34px]">
          Mucha plata. <span className="text-[#6bdda1]">Poco cliente.</span>
        </p>
      </Reveal>

      <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white/45">
              El problema que casi nadie te cuenta
            </p>
            <p className="mt-4 text-[18px] leading-relaxed text-white/85 sm:text-[20px]">
              Es lunes, 9 de la mañana. <strong className="text-white">34 consultas</strong> del fin de
              semana. <strong className="text-white">12 sin responder.</strong>
            </p>
            <p className="mt-3 text-[16px] leading-relaxed text-white/60">
              El que preguntó el sábado a la noche ya compró. En otro lado.
            </p>
            <p className="mt-3 text-[16px] leading-relaxed text-white/60">
              Y lo peor: no sabés cuántas fueron.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex justify-center lg:justify-end">
            <WhatsAppUnread />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
