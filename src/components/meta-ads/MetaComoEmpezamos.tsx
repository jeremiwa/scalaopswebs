import { Section, Reveal } from './ui';

/** Cupos mensuales. */
const CUPOS: number | null = 10;

const pasos = [
  ['Llamada', 'Vemos tu publicidad, tus consultas y cómo vendés hoy.'],
  ['Armamos', 'Mensaje, creativos, campañas y la IA atendiendo tu WhatsApp.'],
  ['Escalamos', 'Medimos qué anuncio trae clientes y metemos más en lo que funciona.'],
];

export function MetaComoEmpezamos() {
  return (
    <Section tone="soft">
      <Reveal>
        <h2 className="max-w-[760px] text-[28px] font-extrabold leading-[1.1] text-white sm:text-[38px]">
          Empezamos con un piloto de 90 días.
        </h2>
        <p className="mt-3 text-[16px] text-white/65 sm:text-[18px]">
          Mes a mes. Sin permanencia. Si no te convence, te vas con todo.
        </p>
      </Reveal>

      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {pasos.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.06}>
            <li className="flex items-start gap-4 py-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#6bdda1]/40 text-[13px] font-extrabold text-[#6bdda1]">
                {i + 1}
              </span>
              <p className="text-[16px] text-white/85">
                <span className="font-bold text-white">{t}:</span> {d}
              </p>
            </li>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-6">
          <p className="text-[16px] leading-relaxed text-white/80">
            Es para empresas que ya venden y pueden atender más clientes. Si buscás "presencia en
            redes", no somos nosotros.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-white/55">
            Nada de esto vende por vos: nosotros ponemos el sistema, la empresa la seguís manejando vos.
          </p>
          {CUPOS != null && (
            <p className="mt-4 text-[15px] font-semibold text-[#6bdda1]">
              Trabajamos con {CUPOS} empresas por mes.
            </p>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
