import React from 'react';
import { Link } from 'react-router-dom';

const cases = [
  {
    rubro: "Real Estate",
    problem: "Pérdida de leads por respuesta lenta y desorden.",
    solution: "CRM implementado + Empleado IA respondiendo en <5min.",
    result: "Duplicación de tasa de visita a propiedades."
  },
  {
    rubro: "Agencia B2B",
    problem: "Cero visibilidad de por qué una venta se caía.",
    solution: "Auditoría + Tableros automatizados de pérdidas.",
    result: "Control total de pipeline y equipo comercial alineado."
  },
  {
    rubro: "Centro de Estética",
    problem: "Recepción colapsada y WhatsApp desatendido.",
    solution: "Bots híbridos + Proceso de triage automático.",
    result: "+40% en agendamientos directos sin intervención humana."
  }
];

export const FeaturedCases = () => {
  return (
    <section className="py-24 relative bg-[#030712]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
          <div>
            <span className="block mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-scala-green">Resultados Reales</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Obras completadas.</h2>
          </div>
          <Link to="/web/casos" className="text-scala-green text-[13px] uppercase tracking-widest font-semibold hover:text-white transition-colors flex items-center gap-2">
            Ver todos los casos
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-stagger">
          {cases.map((c, i) => (
            <div key={i} className="bg-[#0A0D14] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors group flex flex-col h-full">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-white/50 text-[11px] font-bold uppercase tracking-wider mb-6">
                  {c.rubro}
                </span>
                
                <h4 className="text-[13px] uppercase text-white/30 tracking-widest font-semibold mb-2">Problema</h4>
                <p className="text-white/80 text-[15px] mb-6">{c.problem}</p>
                
                <h4 className="text-[13px] uppercase text-white/30 tracking-widest font-semibold mb-2">Intervención</h4>
                <p className="text-white/80 text-[15px]">{c.solution}</p>
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                 <h4 className="text-[11px] uppercase text-scala-green tracking-widest font-semibold mb-2">Impacto Real</h4>
                 <p className="text-white font-bold text-lg">{c.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
