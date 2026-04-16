import React from 'react';

const services = [
  {
    num: "01",
    title: "Auditoría IA",
    desc: "Detectamos en qué áreas de tu empresa conviene aplicar IA primero.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
    accent: 'scala-green'
  },
  {
    num: "02",
    title: "Agentes IA",
    desc: "Creamos agentes para vender, asistir, responder y ejecutar tareas.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    accent: 'scala-green'
  },
  {
    num: "03",
    title: "Automatizaciones",
    desc: "Conectamos procesos, canales y sistemas para que trabajen solos.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: 'scala-green'
  },
  {
    num: "04",
    title: "CRM con IA",
    desc: "Seguimiento, scoring, priorización y visibilidad comercial inteligente.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    accent: 'scala-green'
  },
  {
    num: "05",
    title: "Apps internas",
    desc: "Diseñamos herramientas con IA adaptadas a tu negocio.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    accent: 'scala-green'
  },
  {
    num: "06",
    title: "Integraciones",
    desc: "Unimos IA con WhatsApp, formularios, agenda, CRM y sistemas internos.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    accent: 'scala-green'
  }
];

export const ServiceGrid = () => {
  return (
    <section className="py-24 relative">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto reveal">
          <span className="block mb-4 text-[11px] font-bold tracking-[0.2em] uppercase text-scala-green">Lo que implementamos</span>
          <h2 className="text-3xl md:text-[44px] font-bold text-white mb-5 tracking-tight leading-tight">Soluciones de IA para empresas y negocios.</h2>
          <p className="text-white/45 text-lg">Detectamos dónde aplicar IA y la implementamos dentro de tu operación.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <div
              key={i}
              className="group relative bg-[#0A0D14] border border-white/5 rounded-2xl p-7 overflow-hidden hover:border-scala-green/20 transition-all duration-500 reveal-stagger"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-scala-green/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/8 flex items-center justify-center text-white/70 group-hover:text-scala-green group-hover:border-scala-green/20 group-hover:bg-scala-green/10 transition-all duration-300">
                    {svc.icon}
                  </div>
                  <span className="text-2xl font-black text-white/[0.03] tracking-tighter select-none">{svc.num}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{svc.title}</h3>
                <p className="text-white/45 text-[14px] leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
