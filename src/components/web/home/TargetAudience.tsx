import React from 'react';

const pains = [
  "Leads perdidos por respuesta lenta",
  "Falta de seguimiento estructurado",
  "Cuellos de botella operativos",
  "Equipos comerciales desorganizados"
];

const fits = [
  "Negocios High-Ticket",
  "Agencias y B2B",
  "Clínicas y Salud",
  "Real Estate"
];

export const TargetAudience = () => {
  return (
    <section className="py-20 bg-[#0A0A0A] border-y border-white/[0.04]">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16 reveal">
          <h2 className="text-[32px] md:text-[40px] font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-primary)' }}>
            ¿Por qué tu operación necesita IA y procesos claros?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto reveal-stagger">
          {/* Col 1: El Dolor */}
          <div className="p-8 rounded-[20px] bg-[#000] border border-white/[0.04]">
            <h3 className="text-[14px] font-bold text-white/50 mb-6 uppercase tracking-wider" style={{ fontFamily: 'var(--font-primary)' }}>Fugas Comunes</h3>
            <div className="flex flex-col gap-4">
              {pains.map((pain, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  <span className="text-[15px] text-white/70" style={{ fontFamily: 'var(--font-secondary)' }}>{pain}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Para Quién Es */}
          <div className="p-8 rounded-[20px] relative overflow-hidden" 
               style={{ 
                 background: 'linear-gradient(145deg, rgba(0,85,255,0.05), rgba(0,255,136,0.02))',
                 border: '1px solid rgba(0,255,136,0.1)'
               }}>
            <h3 className="text-[14px] font-bold text-white/80 mb-6 uppercase tracking-wider" style={{ fontFamily: 'var(--font-primary)' }}>Para Quién Es</h3>
            <div className="flex flex-col gap-4 relative z-10">
              {fits.map((fit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'var(--color-scala-teal)' }}>
                    <svg className="w-3 h-3 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-[15px] text-white font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>{fit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
