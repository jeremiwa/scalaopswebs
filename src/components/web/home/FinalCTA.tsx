import React from 'react';

export const FinalCTA = () => {
  return (
    <section className="py-28 relative bg-[#030712] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-scala-green/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="bg-[#0A0D14] border border-white/8 rounded-[32px] p-10 md:p-20 text-center relative overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.5)] reveal">
          <div className="absolute inset-0 bg-gradient-to-t from-scala-green/[0.025] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-scala-green/8 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">
              Tu empresa puede hacer mucho más con IA.
            </h2>
            <p className="text-lg text-white/45 mb-10 font-light">
              Nosotros te ayudamos a detectarlo, diseñarlo e implementarlo.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a href="https://calendar.app.google/your-link-here" target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto justify-center" style={{ padding: '16px 36px', fontSize: '14px' }}>
                Agendar llamada
              </a>
              <a href="https://wa.me/xxx" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full sm:w-auto justify-center" style={{ padding: '16px 36px', fontSize: '14px' }}>
                Hablar por WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] text-white/30 font-medium uppercase tracking-wider">
              {['Diagnóstico inicial', 'Sin compromiso', 'Implementación real'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-scala-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
