import React from 'react';
import { Link } from 'react-router-dom';

export const HeroInstitutional = () => {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden">
      {/* Background glow - MUY SUTIL para mantener la sobriedad */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-scala-green/[0.02] blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container-custom relative z-10 w-full flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.06] text-white/60 text-[10px] font-semibold tracking-[0.2em] uppercase mb-8 reveal" style={{ background: 'rgba(255,255,255,0.015)' }}>
          Soluciones de IA para empresas
        </span>

        {/* Headline */}
        <h1 className="text-[44px] md:text-[64px] lg:text-[76px] font-extrabold text-white tracking-[-0.03em] leading-[1.05] max-w-[900px] mx-auto mb-6 reveal">
          Implementamos IA en tu empresa.
        </h1>

        {/* Subheadline */}
        <p className="text-[17px] md:text-[20px] text-white/50 max-w-[640px] mx-auto mb-10 leading-[1.6] font-light reveal-stagger">
          Auditamos tu negocio y diseñamos agentes, bots, automatizaciones, CRM inteligente y apps internas para vender más, operar mejor y escalar.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-10 reveal-stagger">
          {/* Primary Button */}
          <a
            href="https://calendar.app.google/your-link-here"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center rounded-xl text-[14px] font-semibold tracking-wide text-white transition-all duration-300"
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, rgba(34,197,94,0.9) 0%, rgba(22,163,74,0.9) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 0 24px rgba(34,197,94,0.15)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(34,197,94,0.25)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 24px rgba(34,197,94,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Agendar llamada
          </a>
          {/* Secondary Ghost Button */}
          <Link
            to="/web/soluciones"
            className="inline-flex items-center justify-center rounded-xl text-[14px] font-semibold tracking-wide text-white/60 transition-all duration-300 hover:text-white hover:border-white/20"
            style={{
              padding: '16px 40px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.01)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.01)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            Ver soluciones
          </Link>
        </div>

        {/* Chips discretos */}
        <div className="flex flex-wrap justify-center gap-3 mb-20 reveal-stagger">
          {['Agentes IA', 'Automatizaciones', 'CRM con IA', 'Apps a medida', 'Integraciones'].map((chip) => (
            <span key={chip} className="px-3 py-1.5 rounded-md text-[11px] font-medium tracking-wide text-white/30 border border-white/[0.04] bg-white/[0.01] transition-colors hover:text-white/40">
              {chip}
            </span>
          ))}
        </div>

        {/* ═══ MINIMALIST VISUAL PANEL ═══ */}
        <div className="relative w-full max-w-[1000px] mx-auto reveal-stagger">
          
          <div className="relative rounded-2xl md:rounded-[32px] p-8 md:p-14 text-left overflow-hidden" 
               style={{ 
                 background: 'linear-gradient(180deg, rgba(10,12,18,0.7) 0%, rgba(3,5,8,0.9) 100%)', 
                 border: '1px solid rgba(255,255,255,0.05)', 
                 boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02)' 
               }}>
            
            {/* Very subtle glow inside the panel */}
            <div className="absolute inset-0 bg-gradient-to-br from-scala-green/[0.01] via-transparent to-transparent pointer-events-none" />
            
            {/* Top Left Label */}
            <div className="mb-14 relative z-10 flex">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.16em] bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.05]">
                Cómo implementamos IA en una empresa
              </span>
            </div>

            {/* 4 Nodos Horizontales */}
            <div className="relative z-10">
              {/* Connecting line (desktop only) */}
              <div className="hidden md:block absolute top-[24px] left-[12%] right-[12%] h-px bg-white/[0.06] pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4 relative">
                {[
                  { title: 'Auditoría', desc: 'Detectamos oportunidades' },
                  { title: 'Diseño', desc: 'Definimos la solución' },
                  { title: 'Implementación', desc: 'Integramos herramientas' },
                  { title: 'Optimización', desc: 'Mejoramos resultados' }
                ].map((node, i) => (
                  <div key={i} className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-5 md:gap-5 relative">
                    
                    {/* Node Circle */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative bg-[#06080C] border border-white/10 z-10 transition-colors hover:border-scala-green/30"
                         style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.4), inset 0 0 12px rgba(255,255,255,0.02)' }}>
                      {/* Inner dot */}
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    </div>

                    {/* Node Content */}
                    <div className="flex flex-col items-start md:items-center">
                      <h3 className="text-[15px] font-semibold text-white tracking-tight mb-1.5">{node.title}</h3>
                      <p className="text-[13px] text-white/40 font-light w-full max-w-[140px] leading-snug">{node.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <p className="text-[13px] text-white/30 mt-8 font-light tracking-[0.05em] text-center">
            IA aplicada con criterio de negocio.
          </p>

        </div>

      </div>
    </section>
  );
};
