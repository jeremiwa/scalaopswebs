import { WindowChrome } from './ui/WindowChrome';

export const ComoFunciona = () => {
  const steps = [
    { day: "01-07", title: "Auditoría", desc: "Mapeamos tu proceso actual y detectamos fugas." },
    { day: "08-15", title: "Reingeniería", desc: "Diseñamos el nuevo pipeline y playbook de ventas." },
    { day: "16-25", title: "Automatización", desc: "Conectamos CRM, WhatsApp y (opcional) Agente IA." },
    { day: "26-30", title: "Despliegue", desc: "Entrenamiento al equipo y go-live del sistema." }
  ];

  return (
    <section className="section-padding bg-[#0B0F14] border-t border-white/5">
      <div className="container-custom">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Sprint de 30 días. <br className="hidden md:block" />
            <span className="text-white/50">Ordenamos el sistema comercial.</span>
          </h2>
          <p className="text-lg text-white/50">
            Sin teoría. Solo ejecución técnica e implementación.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Timeline */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {steps.map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Marker */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#0B0F14] bg-scala-card glass-border text-white font-bold text-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl z-10 relative">
                  {i + 1}
                </div>

                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-scala-bg glass-border rounded-2xl p-6 hover:border-scala-green/30 transition-colors">
                  <div className="text-xs font-bold text-scala-green mb-2 uppercase tracking-wider">Días {step.day}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual */}
          <div className="relative">
            <WindowChrome className="shadow-2xl">
              <div className="bg-[#030712] p-6 h-[400px] flex flex-col">
                <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-6">Workflow Builder</div>

                {/* Mock Workflow */}
                <div className="flex-1 relative">
                  {/* Nodes */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-48 bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <div className="text-xs text-white font-medium">Lead entra por Meta</div>
                  </div>

                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-8 bg-scala-green/50"></div>

                  <div className="absolute top-24 left-1/2 -translate-x-1/2 w-48 bg-scala-green/10 border border-scala-green/30 rounded-lg p-3 text-center">
                    <div className="text-xs text-scala-green font-medium">Asignar a Vendedor (Round Robin)</div>
                  </div>

                  <div className="absolute top-36 left-1/2 -translate-x-1/2 w-px h-8 bg-white/20"></div>

                  <div className="absolute top-44 left-1/4 w-32 bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <div className="text-[10px] text-white/60">Notificar Slack</div>
                  </div>

                  <div className="absolute top-44 right-1/4 w-32 bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                    <div className="text-[10px] text-white/60">Crear Deal en CRM</div>
                  </div>

                  {/* Connecting lines */}
                  <svg className="absolute top-36 left-0 w-full h-16 pointer-events-none" preserveAspectRatio="none">
                    <path d="M 50% 0 L 50% 10 L 25% 10 L 25% 32" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                    <path d="M 50% 0 L 50% 10 L 75% 10 L 75% 32" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </WindowChrome>
          </div>
        </div>
      </div>
    </section>
  );
};
