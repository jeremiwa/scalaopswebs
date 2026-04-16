import React from 'react';
import { Link } from 'react-router-dom';

const cases = [
  {
    tag: "REAL ESTATE",
    problem: "Demora en responder y calificar leads.",
    implementation: "Agente IA + seguimiento automatizado.",
    result: "Más visitas agendadas y menos fuga comercial."
  },
  {
    tag: "EMPRESA B2B",
    problem: "Falta de visibilidad y seguimiento comercial.",
    implementation: "CRM con IA + automatizaciones + tableros.",
    result: "Más control del pipeline y mejor conversión."
  },
  {
    tag: "CLÍNICA / ESTÉTICA",
    problem: "WhatsApp saturado y recepción lenta.",
    implementation: "Bot IA + automatización de agenda y triage.",
    result: "Más turnos, menos carga operativa."
  }
];

export const FeaturedCases = () => {
  return (
    <section className="py-24 bg-[#0A0A0F] border-t border-white/5">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4 reveal">
          <div>
            <span className="block mb-4 text-[11px] font-bold tracking-[0.2em] uppercase text-scala-green">Casos de IA aplicada</span>
            <h2 className="text-3xl md:text-[44px] font-bold text-white tracking-tight leading-tight">Implementaciones reales en empresas.</h2>
            <p className="text-white/45 text-lg mt-3">Soluciones de IA diseñadas para resolver problemas concretos de negocio.</p>
          </div>
          <Link to="/web/casos" className="text-scala-green text-[12px] uppercase tracking-widest font-bold hover:text-white transition-colors flex items-center gap-2 flex-shrink-0">
            Ver todos los casos <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal-stagger">
          {cases.map((c, i) => (
            <div key={i} className="bg-[#06080E] border border-white/5 rounded-2xl p-7 flex flex-col group hover:border-white/10 transition-colors">
              <span className="inline-block w-fit px-3 py-1 rounded bg-white/[0.04] text-white/40 text-[10px] font-bold uppercase tracking-widest mb-6">
                {c.tag}
              </span>

              <div className="mb-5">
                <h4 className="text-[11px] uppercase text-white/25 tracking-widest font-bold mb-1.5">Problema</h4>
                <p className="text-white/70 text-[14px]">{c.problem}</p>
              </div>
              <div className="mb-5">
                <h4 className="text-[11px] uppercase text-white/25 tracking-widest font-bold mb-1.5">Implementación</h4>
                <p className="text-white/70 text-[14px]">{c.implementation}</p>
              </div>
              <div className="mt-auto pt-5 border-t border-white/5">
                <h4 className="text-[10px] uppercase text-scala-green/70 tracking-widest font-bold mb-1.5">Resultado</h4>
                <p className="text-white font-semibold text-[15px]">{c.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
