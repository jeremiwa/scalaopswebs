import React from 'react';

const services = [
  {
    title: "Auditoría IA",
    desc: "Detectamos dónde aplicar IA primero.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: "Agentes IA",
    desc: "Venden, responden y ejecutan tareas.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Automatizaciones",
    desc: "Conectan procesos y canales.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: "CRM con IA",
    desc: "Prioriza, ordena y da visibilidad.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    )
  },
  {
    title: "Apps internas",
    desc: "Herramientas hechas para tu negocio.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
      </svg>
    )
  },
  {
    title: "Integraciones",
    desc: "Unimos IA con tus sistemas.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    )
  }
];

export const ServiceGrid = () => {
  return (
    <section className="py-24 relative">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16 text-center max-w-xl mx-auto reveal">
          <span className="block mb-4 text-[10px] font-bold tracking-[0.22em] uppercase text-[#22C55E]">Lo que implementamos</span>
          <h2 className="text-[32px] md:text-[44px] font-extrabold text-white mb-4 tracking-[-0.02em] leading-[1.1]">Soluciones de IA para empresas y negocios.</h2>
          <p className="text-white/40 text-[16px]">Detectamos dónde aplicar IA y la implementamos dentro de tu operación.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden transition-all duration-500 reveal-stagger"
              style={{
                padding: '36px 32px',
                background: 'linear-gradient(145deg, rgba(10,13,20,0.9), rgba(6,8,14,0.95))',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(255,255,255,0.02)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.15)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.3), 0 0 30px rgba(34,197,94,0.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(255,255,255,0.02)'; }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#22C55E]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 text-white/60 group-hover:text-[#22C55E] transition-all duration-300" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = 'rgba(34,197,94,0.1)'; el.style.borderColor = 'rgba(34,197,94,0.15)'; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                >
                  {svc.icon}
                </div>
                <h3 className="text-[17px] font-bold text-white mb-2 tracking-tight">{svc.title}</h3>
                <p className="text-white/40 text-[13px] leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
