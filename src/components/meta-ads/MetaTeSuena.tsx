import { Section, Reveal, Eyebrow } from './ui';
import { WhatsAppUnread } from './mockups';

/** Degradado Scala para destacar un fragmento del titular. */
const grad = 'bg-gradient-to-r from-[#185de8] to-[#6bdda1] bg-clip-text text-transparent';

export function MetaTeSuena() {
  return (
    <Section tone="soft">
      <div className="mx-auto max-w-[760px]">
        {/* Apertura */}
        <Reveal>
          <Eyebrow>El problema no siempre es Meta</Eyebrow>
          <h2 className="mt-4 text-[32px] font-extrabold leading-[1.08] tracking-[-0.01em] text-white sm:text-[40px]">
            Podés generar consultas <span className={grad}>y perder las ventas igual.</span>
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-white/65 sm:text-[18px]">
            Meta hizo su trabajo. El cliente preguntó. El problema es lo que pasó después.
          </p>
        </Reveal>

        {/* Bloque de datos (editorial, no cards) */}
        <Reveal delay={0.06}>
          <div className="mt-8 flex flex-col gap-6 border-y border-white/10 py-6 sm:flex-row sm:items-center sm:gap-12">
            <div>
              <span className="block text-[52px] font-extrabold leading-none text-white sm:text-[60px]" style={{ fontFamily: 'var(--font-primary)' }}>
                34
              </span>
              <span className="mt-1.5 block text-[15px] text-white/55">consultas del fin de semana</span>
            </div>
            <div className="hidden w-px self-stretch bg-white/10 sm:block" />
            <div>
              <span className="block text-[52px] font-extrabold leading-none text-[#ef4444] sm:text-[60px]" style={{ fontFamily: 'var(--font-primary)' }}>
                12
              </span>
              <span className="mt-1.5 block text-[15px] text-white/55">sin responder</span>
            </div>
          </div>
        </Reveal>

        {/* Mockup protagonista */}
        <Reveal delay={0.08}>
          <div className="mt-9 w-full">
            <WhatsAppUnread />
            <p className="mt-4 text-center text-[15px] text-white/55">
              El que preguntó el sábado no esperó hasta el lunes.
            </p>
          </div>
        </Reveal>

        {/* Cierre puente */}
        <Reveal delay={0.1}>
          <div className="mt-10">
            <p className="text-[26px] font-extrabold leading-[1.12] text-white sm:text-[32px]" style={{ fontFamily: 'var(--font-primary)' }}>
              Más consultas no sirven <span className={grad}>si nadie llega a tiempo.</span>
            </p>
            <p className="mt-3 text-[15px] text-white/55 sm:text-[16px]">
              Por eso no trabajamos solamente tus anuncios.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
