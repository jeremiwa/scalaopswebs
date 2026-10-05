import { Section, Reveal, Eyebrow } from './ui';
import { WhatsAppUnread } from './mockups';

/** Degradado Scala para destacar un fragmento del titular. */
const grad = 'bg-gradient-to-r from-[#185de8] to-[#6bdda1] bg-clip-text text-transparent';

export function MetaTeSuena() {
  return (
    // Top chico para que la transición desde el bloque Meta+IA sea continua (no un hueco grande).
    <Section tone="soft" padY="pt-6 pb-10 sm:pt-9 sm:pb-16">
      <div className="mx-auto max-w-[760px]">
        {/* Apertura */}
        <Reveal>
          <Eyebrow>El problema no siempre es Meta</Eyebrow>
          <h2 className="mt-4 text-[31px] font-extrabold leading-[1.08] tracking-[-0.01em] text-white sm:text-[40px]">
            Podés generar consultas <span className={grad}>y perder las ventas igual.</span>
          </h2>
          <p className="mt-4 max-w-[560px] text-[16px] leading-relaxed text-white/65 sm:text-[18px]">
            Meta hizo su trabajo. El cliente preguntó. El problema es lo que pasó después.
          </p>
        </Reveal>

        {/* Métricas — SIEMPRE horizontales (34 | 12), misma altura visual. */}
        <Reveal delay={0.06}>
          <div className="mt-8 flex items-stretch gap-4 border-y border-white/10 py-6 sm:gap-10">
            <div className="flex-1">
              <span className="block text-[44px] font-extrabold leading-none text-white sm:text-[60px]" style={{ fontFamily: 'var(--font-primary)' }}>
                34
              </span>
              <span className="mt-1.5 block text-[13px] leading-snug text-white/55 sm:text-[15px]">
                consultas del fin de semana
              </span>
            </div>
            <div className="w-px self-stretch bg-white/12" />
            <div className="flex-1">
              <span className="block text-[44px] font-extrabold leading-none text-[#ef4444] sm:text-[60px]" style={{ fontFamily: 'var(--font-primary)' }}>
                12
              </span>
              <span className="mt-1.5 block text-[13px] leading-snug text-white/55 sm:text-[15px]">
                sin responder
              </span>
            </div>
          </div>
        </Reveal>

        {/* Mockup protagonista, contenido con aire lateral. */}
        <Reveal delay={0.08}>
          <div className="mt-8 px-2 sm:px-0">
            <WhatsAppUnread />
            <p className="mx-auto mt-4 max-w-[420px] text-center text-[15px] leading-relaxed text-white/55">
              El que preguntó el sábado no esperó hasta el lunes.
            </p>
          </div>
        </Reveal>

        {/* Cierre puente, cerca del mockup. */}
        <Reveal delay={0.1}>
          <div className="mt-8">
            <p className="text-[25px] font-extrabold leading-[1.12] text-white sm:text-[32px]" style={{ fontFamily: 'var(--font-primary)' }}>
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
