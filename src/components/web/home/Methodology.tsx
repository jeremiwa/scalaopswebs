import React from 'react';

const steps = [
  {
    num: "01",
    title: "Auditamos",
    desc: "Detectamos oportunidades concretas de IA en ventas, atención, operación y procesos."
  },
  {
    num: "02",
    title: "Implementamos",
    desc: "Diseñamos agentes, automatizaciones, CRM inteligente y herramientas internas."
  },
  {
    num: "03",
    title: "Optimizamos",
    desc: "Medimos resultados, ajustamos la solución y escalamos lo que funciona."
  }
];

export const Methodology = () => {
  return (
    <section className="py-24 bg-[#030712] relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="block mb-4 text-[11px] font-bold tracking-[0.2em] uppercase text-scala-green">Cómo trabajamos</span>
          <h2 className="text-3xl md:text-[44px] font-bold text-white mb-5 tracking-tight leading-tight">Auditamos. Implementamos. Optimizamos.</h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">No vendemos teoría sobre IA. La aterrizamos dentro de tu empresa.</p>
        </div>

        {/* 3 Steps — horizontal on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto reveal-stagger">
          {steps.map((step, i) => (
            <div key={i} className="relative bg-[#0A0D14] border border-white/5 rounded-2xl p-8 text-center group hover:border-scala-green/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-scala-green/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
              <div className="relative z-10">
                <span className="text-5xl font-black text-white/[0.04] block mb-4 select-none">{step.num}</span>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                <p className="text-white/45 text-[14px] leading-relaxed">{step.desc}</p>
              </div>

              {/* Connector arrow (desktop only, not on last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-white/10">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
