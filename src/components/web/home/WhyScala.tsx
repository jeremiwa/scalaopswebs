import React from 'react';

const cards = [
  {
    title: "Agentes y bots IA",
    desc: "Para atención, ventas, soporte y seguimiento.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    )
  },
  {
    title: "Automatizaciones inteligentes",
    desc: "Para conectar tareas, personas, canales y sistemas.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
    )
  },
  {
    title: "CRM con inteligencia",
    desc: "Para ver, priorizar y gestionar mejor cada oportunidad.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
    )
  },
  {
    title: "Apps a medida",
    desc: "Para crear soluciones internas adaptadas a tu empresa.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
    )
  }
];

export const WhyScala = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-scala-green/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="block mb-4 text-[11px] font-bold tracking-[0.2em] uppercase text-scala-green">Por qué Scala</span>
          <h2 className="text-3xl md:text-[44px] font-bold text-white mb-5 tracking-tight leading-tight max-w-2xl mx-auto">No vendemos una herramienta.<br/>Implementamos la solución completa.</h2>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto reveal-stagger">
          {cards.map((card, i) => (
            <div key={i} className="bg-[#0A0D14] border border-white/5 rounded-2xl p-7 group hover:border-scala-green/20 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-scala-green/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-center text-white/70 group-hover:text-scala-green group-hover:border-scala-green/20 group-hover:bg-scala-green/10 transition-all duration-300 mb-5">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{card.title}</h3>
                <p className="text-white/45 text-[14px]">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <p className="text-center text-white/50 text-lg font-light mt-14 max-w-xl mx-auto reveal-stagger">
          Otros te venden software. <span className="text-white font-medium">Scala implementa IA dentro de tu negocio.</span>
        </p>
      </div>
    </section>
  );
};
