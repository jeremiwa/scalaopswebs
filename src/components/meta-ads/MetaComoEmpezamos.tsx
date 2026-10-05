import { Section, Reveal } from './ui';

/** TODO: cupos. Si lo completás (p.ej. 8), se muestra la línea "Trabajamos con N empresas por mes". */
const CUPOS: number | null = null;

const pasos = [
  ['Llamada', 'Vemos tu publicidad, tus consultas y cómo vendés hoy.'],
  ['Armamos', 'Mensaje, creativos, campañas y la IA atendiendo tu WhatsApp.'],
  ['Escalamos', 'Medimos qué anuncio trae clientes y metemos más en lo que funciona.'],
];

export function MetaComoEmpezamos() {
  return (
    <Section tone="soft">
      <Reveal>
        <h2 className="max-w-[760px] text-[28px] font-extrabold leading-[1.1] text-white sm:text-[40px]">
          Empezamos con un piloto de 90 días.
        </h2>
        <p className="mt-3 text-[16px] text-white/65 sm:text-[18px]">
          Mes a mes. Sin permanencia. Si no te convence, te vas con todo.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {pasos.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#6bdda1]/40 text-[14px] font-extrabold text-[#6bdda1]">
                {i + 1}
              </span>
              <p className="mt-4 text-[17px] font-bold text-white">{t}</p>
              <p className="mt-2 text-[15px] leading-snug text-white/65">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>

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
