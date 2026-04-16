import React from 'react';
import { Link } from 'react-router-dom';

export const HeroInstitutional = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-scala-green/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-scala-green/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 w-full flex flex-col items-center text-center">
        {/* Título Principal */}
        <h1 className="text-4xl md:text-6xl lg:text-[72px] font-bold text-white tracking-tight leading-[1.1] max-w-[1000px] mx-auto mb-6 drop-shadow-xl reveal">
          Ordenamos, automatizamos y optimizamos tu sistema comercial para que vendas más sin depender del caos.
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-white/60 max-w-[800px] mx-auto mb-12 leading-relaxed font-light reveal-stagger">
          Auditamos tu operación, implementamos procesos, CRM, automatizaciones y agentes IA para que tu equipo responda mejor, haga seguimiento y cierre más.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-20 reveal-stagger">
          <a
            href="https://calendar.app.google/your-link-here"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '16px 32px', fontSize: '15px' }}
          >
            Agendar llamada
          </a>
          <Link
            to="/web/como-trabajamos"
            className="btn-secondary"
            style={{ padding: '16px 32px', fontSize: '15px' }}
          >
            Ver cómo trabajamos
          </Link>
        </div>

        {/* Visual Premium Mockup */}
        <div className="relative w-full max-w-[1100px] mx-auto reveal-stagger">
          <div className="relative aspect-[16/9] w-full rounded-2xl md:rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] bg-[#0A0A0F]">
            {/* Header del Mockup */}
            <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-2 backdrop-blur-md z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            </div>
            
            {/* Image Placeholder - A la espera de IA / Asset real */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d14] pt-10">
               <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-scala-green/10 flex items-center justify-center mx-auto mb-4 border border-scala-green/20">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  </div>
                  <p className="text-white/40 text-sm tracking-widest uppercase font-semibold">Scala Infrastructure Simulation</p>
                  <p className="text-white/20 text-xs mt-2">Asset visual pendiente (CRM + IA Dashboard)</p>
               </div>
            </div>

            {/* Overlay sutil para efecto glassmorphism oscuro encima de todo */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#030712] to-transparent z-10 pointer-events-none" />
          </div>

          {/* Línea de micro-confianza debajo del visual */}
          <div className="mt-12 opacity-80">
            <p className="text-sm font-medium text-white/40 uppercase tracking-widest text-center mb-6">
              Infraestructura comercial diseñada para
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {['Equipos B2B', 'Agencias y Consultoras', 'Educación', 'Real Estate', 'Clínicas', 'High-Ticket'].map((rubro) => (
                <div key={rubro} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-scala-green/50" />
                  <span className="text-white/60 text-[13px] font-medium tracking-wide">{rubro}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
