import React from 'react';

export const WhyScala = () => {
  return (
    <section className="py-24 bg-[#0A0A0F] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-scala-green/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="text-center md:text-left mb-16 reveal">
          <span className="block mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-scala-green">Por qué Scala</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ni agencia de marketing,<br/>ni software vacío.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 reveal-stagger">
          
          {/* Lo que NO somos */}
          <div className="bg-[#030712] rounded-3xl p-8 md:p-12 border border-white/5 opacity-80 backdrop-blur-sm">
            <h3 className="text-xl font-semibold w-fit pb-1 mb-8 text-white/50 border-b border-white/10 uppercase tracking-widest text-[13px]">Lo que NO somos</h3>
            <ul className="flex flex-col gap-6">
              {[
                'Una agencia más que te trae leads pero no entiende de cierre.',
                'Un SaaS aislado que te cobran y no lo sabe usar nadie.',
                'Un bot genérico que espanta prospectos por ser robótico.',
                'Una consultoría que te deja un PDF con "mejores prácticas".'
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3h-3 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </div>
                  <span className="text-white/40 text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lo que SÍ somos */}
          <div className="bg-gradient-to-br from-[#0A0D14] to-[#050B05] rounded-3xl p-8 md:p-12 border border-scala-green/20 relative shadow-[0_4px_40px_rgba(34,197,94,0.05)]">
            <div className="absolute top-0 right-0 p-8 opacity-20 hidden sm:block">
              <svg className="w-24 h-24 text-scala-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line></svg>
            </div>
            
            <h3 className="text-xl font-semibold w-fit pb-1 mb-8 text-scala-green border-b border-scala-green/20 uppercase tracking-widest text-[13px]">Lo que SÍ somos</h3>
            <ul className="flex flex-col gap-6 relative z-10">
              {[
                'Implementadores reales operando dentro de tu negocio.',
                'Proceso comercial bajado a tierra y documentado.',
                'Automatización con criterio humano y entendimiento del cliente.',
                'Inteligencia Artificial directamente enlazada a tu operación de ventas.',
                'Visión directiva combinada con ejecución técnica impecable.'
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-5 h-5 rounded-full bg-scala-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3h-3 text-scala-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-white/80 font-medium text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};
