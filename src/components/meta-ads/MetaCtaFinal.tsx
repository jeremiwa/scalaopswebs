import { Section, Reveal, MetaCTA, WhatsAppButton } from './ui';

export function MetaCtaFinal() {
  return (
    <Section tone="dark" className="overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(80% 60% at 50% 100%, rgba(24,93,232,0.16), transparent 60%), radial-gradient(60% 50% at 50% 0%, rgba(107,221,161,0.10), transparent 60%)' }}
      />
      <Reveal>
        <div className="relative mx-auto max-w-[780px] text-center">
          <h2 className="text-[28px] font-extrabold leading-[1.12] text-white sm:text-[40px]">
            Una empresa que crece no es la que consigue más consultas.{' '}
            <span className="text-[#6bdda1]">Es la que no pierde ninguna.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-relaxed text-white/70 sm:text-[17px]">
            Contanos qué vendés y te decimos cómo lo venderíamos con Meta Ads. Una llamada con tus
            números. No firmás nada.
          </p>
          <div className="mt-8 flex flex-col items-center gap-5">
            <MetaCTA location="final" />
            <WhatsAppButton where="final" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
