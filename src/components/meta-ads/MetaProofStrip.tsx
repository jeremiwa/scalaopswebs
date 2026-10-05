import { Reveal, WhatsAppButton } from './ui';

/**
 * Franja movida FUERA del hero (antes estaba dentro). Mantiene el diseño/comportamiento tal cual
 * (no se rediseña acá): el dato $24M→$58M y el botón secundario de WhatsApp. Separada así el
 * BLOQUE 1 / hero termina en el VSL. Ubicación/diseño definitivos a decidir por el usuario.
 */
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

export function MetaProofStrip() {
  return (
    <section className="bg-black px-5 pb-10 sm:px-6">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-6">
        <Reveal>
          <ProofBox />
        </Reveal>
        <Reveal delay={0.06}>
          <WhatsAppButton where="hero" />
        </Reveal>
      </div>
    </section>
  );
}
