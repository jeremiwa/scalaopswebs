import React from 'react';

const services = [
  {
    num: "01",
    title: "Auditoría comercial",
    desc: "Detectamos dónde se caen tus ventas y qué está frenando a tu equipo.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  },
  {
    num: "02",
    title: "Implementación de proceso",
    desc: "Rearmamos el proceso comercial dentro de tu operación real.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  {
    num: "03",
    title: "CRM y automatizaciones",
    desc: "Ordenamos seguimiento, etapas, handoff, recordatorios y visibilidad.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    )
  },
  {
    num: "04",
    title: "Entrenamiento comercial",
    desc: "Alineamos al equipo para que venda con más criterio y consistencia.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    num: "05",
    title: "Empleado IA",
    desc: "Respondé más rápido, calificá mejor y derivá con contexto.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    num: "06",
    title: "Métricas y visibilidad",
    desc: "Tomá decisiones con datos concretos, no con intuición.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
];

export const ServiceGrid = () => {
  return (
    <section className="py-32 relative">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left max-w-2xl reveal">
          <span className="block mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-scala-green">Qué hace Scala</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Sistematizamos tu operación comercial de punta a punta.</h2>
          <p className="text-white/50 text-lg leading-relaxed">Combinamos procesos estratégicos, arquitectura tecnológica e Inteligencia Artificial para construir un ecosistema de ventas inquebrantable.</p>
        </div>

        {/* Grid de 6 Bloques */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <div 
              key={i}
              className="group relative bg-[#0A0A0F] border border-white/5 rounded-3xl p-8 overflow-hidden hover:border-scala-green/30 transition-all duration-500 reveal-stagger"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}
            >
              {/* Glow sutil en hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-scala-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-scala-green group-hover:border-scala-green/20 group-hover:bg-scala-green/10 transition-all duration-300">
                     {svc.icon}
                   </div>
                   <span className="text-3xl font-black text-white/[0.02] group-hover:text-white/[0.04] transition-colors select-none tracking-tighter">
                     {svc.num}
                   </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#F5F5F7] transition-colors">{svc.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mt-auto">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
