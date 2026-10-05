import { Section, Reveal, MetaCTA } from './ui';

const grad = 'bg-gradient-to-r from-[#185de8] to-[#6bdda1] bg-clip-text text-transparent';

/** Sección 4 — Cierre. Fondo apenas más claro, todo centrado, CTA final. */
export function MetaCierre() {
  return (
    <Section id="cierre" tone="soft" className="overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 100%, rgba(24,93,232,0.14), transparent 60%), radial-gradient(60% 50% at 50% 0%, rgba(107,221,161,0.08), transparent 60%)',
        }}
      />
      <Reveal>
        <div className="relative mx-auto max-w-[640px] text-center">
          {/* Chip */}
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold text-white"
            style={{ border: '1px solid rgba(107,221,161,0.4)' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#6bdda1]" />
            Trabajamos con 10 empresas por mes
          </span>

          <h2 className="mt-5 text-[28px] font-bold leading-[1.15] text-white">
            Empezamos con un piloto de <span className={grad}>90 días.</span>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.55] text-white/80">
            Mes a mes. Sin permanencia. Si no te convence, te vas con todo.
          </p>
          <p className="mx-auto mt-4 max-w-[540px] text-[15px] leading-[1.55] text-white/55">
            Es para empresas que ya venden y pueden atender más clientes. Si buscás "presencia en
            redes", no somos nosotros.
          </p>

          <div className="mt-8 flex justify-center">
            <MetaCTA
              id="meta-cierre-cta"
              location="final"
              center
              microcopy="Una llamada con tus números. No firmás nada."
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
