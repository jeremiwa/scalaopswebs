import React from 'react';

export const FinalCTA = () => {
  return (
    <section className="py-32 relative bg-[#0A0A0F] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-full bg-scala-green/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="bg-[#030712] border border-white/10 rounded-[40px] p-12 md:p-24 text-center shadow-[0_20px_80px_rgba(0,0,0,0.6)] relative overflow-hidden reveal">
          
          <div className="absolute inset-0 bg-gradient-to-t from-scala-green/[0.03] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-scala-green/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
             <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-tight">
               Si querés ordenar tu sistema comercial, conversemos.
             </h2>
             <p className="text-lg md:text-xl text-white/50 mb-12 font-light">
               Podemos ayudarte a detectar fugas, implementar procesos, automatizaciones e IA para que tu operación comercial funcione de manera sistémica.
             </p>

             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
               <a href="https://calendar.app.google/your-link-here" target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto justify-center" style={{ padding: '18px 40px', fontSize: '15px' }}>
                 Agendar auditoría
               </a>
               <a href="https://wa.me/xxx" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full sm:w-auto justify-center" style={{ padding: '18px 40px', fontSize: '15px' }}>
                 Hablar por WhatsApp
               </a>
             </div>

             <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/30 font-medium uppercase tracking-wider">
               <span className="flex items-center gap-2">
                 <svg className="w-4 h-4 text-scala-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 Llamada sin costo
               </span>
               <span className="flex items-center gap-2">
                 <svg className="w-4 h-4 text-scala-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 Diagnóstico inicial
               </span>
               <span className="flex items-center gap-2">
                 <svg className="w-4 h-4 text-scala-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                 Sin compromiso
               </span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
