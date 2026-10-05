import { Section, Reveal } from './ui';
import { ReportCard } from './mockups';

const steps = [
  ['00:00', 'Entra una consulta desde un anuncio'],
  ['00:47', 'Responde la IA'],
  ['01:12', 'Hace preguntas'],
  ['01:38', 'Cliente calificado'],
  ['01:54', 'Reunión agendada'],
];

export function MetaDemo() {
  return (
    <Section tone="soft">
      <Reveal>
        <h2 className="max-w-[720px] text-[28px] font-extrabold leading-[1.1] text-white sm:text-[40px]">
          No te pedimos que nos creas.
        </h2>
      </Reveal>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
        {/* Línea de tiempo (vertical) */}
        <div className="relative pl-3">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#185de8] to-[#6bdda1]" />
          <div className="space-y-5">
            {steps.map(([t, label], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="relative flex items-center gap-4">
                  <span className="relative z-10 block h-3.5 w-3.5 shrink-0 rounded-full bg-[#6bdda1] shadow-[0_0_0_4px_rgba(107,221,161,0.15)]" />
                  <div className="flex items-baseline gap-3">
                    <span className="tabular-nums text-[14px] font-bold text-[#6bdda1]">{t}</span>
                    <span className="text-[16px] text-white/85 sm:text-[17px]">{label}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-7 pl-8 text-[18px] font-bold text-white">
              Sin que nadie de la empresa tocara el teléfono.
            </p>
          </Reveal>
        </div>

        {/* Reporte del lunes (ejemplo) */}
        <Reveal delay={0.15}>
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <ReportCard example />
            <p className="text-center text-[16px] text-white/70 lg:text-left">
              <span className="font-semibold text-white">Y no miraste un solo WhatsApp.</span>
            </p>
            {/* TODO: reemplazar por grabación/capturas reales de un cliente (con permiso) */}
            <p className="text-[12px] text-white/40">Ejemplo ilustrativo, no es la captura de un cliente.</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
