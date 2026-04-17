import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const steps = [
  {
    badge: "01 · 7 días",
    title: "Auditoría profunda",
    desc: "Escuchamos tus llamadas, leemos tus chats y medimos dónde exactamente se te escapan ventas.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    )
  },
  {
    badge: "02 · 30 días",
    title: "Implementación completa",
    desc: "Rearmamos discurso de venta, proceso comercial, automatizaciones, tablero de métricas y entrenamos a tu equipo.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    )
  },
  {
    badge: "03 · Empleado IA",
    title: "Agente 24/7",
    desc: "Responde en segundos, califica leads y agenda reuniones. Integrado a tu proceso y con traspaso a humano con contexto.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line>
      </svg>
    )
  },
  {
    badge: "04 · Resultado",
    title: "SCALA",
    desc: "Más ventas. Más cierres. Mismo presupuesto.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline>
      </svg>
    )
  }
];

export const Methodology = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // We keep the container ref if needed for normal viewport triggers, 
  // but we remove the scroll-linked hiding logic so everything is visible at once.
  const lineWidth = "100%";
  const lineHeight = "100%";

  return (
    <section className="relative py-10 md:py-16 overflow-hidden bg-[#000000]" ref={containerRef}>
      
      {/* Fondo Textura (Grain) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          opacity: 0.03
        }} 
      />

      <motion.div 
        className="container-custom relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
          <span className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-4">
            CÓMO TRABAJAMOS
          </span>
          <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>
            Auditamos, implementamos<br />y entrenamos. En 30 días.
          </h2>
          <p className="text-[17px] md:text-[20px] text-[#999999] leading-relaxed font-normal" style={{ fontFamily: 'var(--font-secondary)' }}>
            Todo lo que tu equipo necesita para dejar de perder ventas, armado de principio a fin.
          </p>
        </div>

        {/* --- DESKTOP TIMELINE --- */}
        <div className="hidden lg:block relative max-w-6xl mx-auto mb-20">
          
          {/* Base Gray Line (Altura 3px guiando la vista completa) */}
          <div className="absolute top-[48px] left-[12%] right-[12%] h-[3px] bg-[#111] z-0 rounded-full" />
          
          {/* Animated Gradient Line (Pinta Azul a Verde) */}
          <motion.div 
            className="absolute top-[48px] left-[12%] h-[3px] z-10 rounded-full"
            style={{ 
              width: lineWidth,
              background: 'linear-gradient(90deg, #185de8 0%, #429fbb 50%, #6bdda1 100%)',
              boxShadow: '0 0 15px rgba(24, 93, 232, 0.4)'
            }}
          />

          <div className="flex justify-between relative z-20">
            {steps.map((step, i) => {
              const isFinal = i === 3;
              
              return (
                <div key={i} className="flex flex-col items-center text-center w-[25%]" style={{ padding: isFinal ? '0 10px' : '0 20px' }}>
                  
                  {/* Circle Icon Container */}
                  <div className="mb-8 flex justify-center items-center h-[96px]">
                    
                    {!isFinal ? (
                      /* Círculos NORMALES 1, 2, 3 (72px) */
                      <div className="relative w-[72px] h-[72px] rounded-full flex items-center justify-center bg-[#0A0A0A] transition-all duration-500 hover:-translate-y-1">
                        <div className="absolute inset-0 rounded-full" style={{ padding: '2px', background: 'linear-gradient(135deg, #185de8, #6bdda1)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMaskComposite: 'xor' }} />
                        <div className="absolute inset-0 rounded-full bg-[#6bdda1] blur-[20px] pointer-events-none opacity-20" />
                        <div className="text-[#6bdda1]">
                          {step.icon}
                        </div>
                      </div>
                    ) : (
                      /* Círculo RESULTADO 4 (96px MASIVO) */
                      <div className="relative w-[96px] h-[96px] rounded-full flex items-center justify-center transition-all duration-500 z-30 hover:-translate-y-1" 
                           style={{ background: 'linear-gradient(135deg, #185de8 0%, #6bdda1 100%)' }}>
                        
                        <div className="absolute -inset-[3px] rounded-full border-2 border-[#6bdda1] opacity-100" style={{ boxShadow: '0 0 30px rgba(107, 221, 161, 0.6)' }} />
                        <div className="absolute -inset-[15px] rounded-full border border-dashed border-[#6bdda1] opacity-20 pointer-events-none animate-spin-slow" />

                        <motion.div 
                          className="absolute inset-0 rounded-full border border-[#6bdda1]"
                          animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />

                        <div className="text-black drop-shadow-md">
                          {step.icon}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Texts */}
                  <div className="flex flex-col items-center">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase mb-4"
                          style={{ background: 'rgba(107,221,161,0.15)', color: '#6bdda1' }}>
                      {step.badge}
                    </span>
                    
                    <h3 className={`text-[24px] font-bold mb-3 tracking-tight ${isFinal ? 'bg-clip-text text-transparent' : 'text-white'}`} style={{ fontFamily: 'var(--font-primary)', backgroundImage: isFinal ? 'linear-gradient(90deg, #185de8, #6bdda1)' : 'none' }}>
                      {step.title}
                    </h3>
                    
                    <p className={`text-[15px] leading-[1.6] max-w-[240px] ${isFinal ? 'text-[#6bdda1] font-semibold' : 'text-[#999999]'}`} style={{ fontFamily: 'var(--font-secondary)' }}>
                      {step.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>


        {/* --- MOBILE TIMELINE --- */}
        <div className="block lg:hidden relative w-full max-w-[400px] mx-auto mb-16 pl-6">
          
          <div className="absolute top-[48px] bottom-[48px] left-[42px] w-[3px] bg-[#111] z-0 rounded-full" />
          
          <motion.div 
            className="absolute top-[48px] left-[42px] w-[3px] z-10 rounded-full origin-top"
            style={{ 
              height: lineHeight,
              background: 'linear-gradient(180deg, #185de8 0%, #429fbb 50%, #6bdda1 100%)',
              boxShadow: '0 0 15px rgba(24, 93, 232, 0.4)'
            }}
          />

          <div className="flex flex-col gap-16 relative z-20">
            {steps.map((step, i) => {
              const isFinal = i === 3;

              return (
                <div key={i} className="flex gap-6 relative group">
                  
                  {/* Circle Icon */}
                  <div className="shrink-0 pt-2 flex justify-center w-[60px]">
                    {!isFinal ? (
                      <div className={`relative w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#0A0A0A] transition-all duration-300 group-hover:-translate-y-1`}>
                        <div className="absolute inset-0 rounded-full" style={{ padding: '2px', background: 'linear-gradient(135deg, #185de8, #6bdda1)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMaskComposite: 'xor' }} />
                        <div className={`absolute inset-0 rounded-full bg-[#6bdda1] blur-[15px] pointer-events-none opacity-30`} />
                        <div className={`w-8 h-8 flex items-center justify-center text-[#6bdda1]`}>
                          {step.icon}
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-[72px] h-[72px] -ml-[6px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1" 
                           style={{ background: 'linear-gradient(135deg, #185de8 0%, #6bdda1 100%)' }}>
                        
                        <div className={`absolute -inset-[3px] rounded-full border-2 border-[#6bdda1] opacity-100`} style={{ boxShadow: '0 0 20px rgba(107, 221, 161, 0.6)' }} />
                        <div className="absolute -inset-[10px] rounded-full border border-dashed border-[#6bdda1] opacity-20 pointer-events-none animate-spin-slow" />
                        <motion.div 
                          className="absolute inset-0 rounded-full border border-[#6bdda1]"
                          animate={{ scale: [1, 1.4], opacity: [0.8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                        <div className="text-black drop-shadow-md w-8 h-8 flex items-center justify-center">
                          {step.icon}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Elements */}
                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] uppercase mb-3 text-[#6bdda1]"
                          style={{ background: 'rgba(107,221,161,0.15)' }}>
                      {step.badge}
                    </span>
                    <h3 className={`text-[20px] font-bold mb-2 tracking-tight ${isFinal ? 'bg-clip-text text-transparent' : 'text-white'}`} style={{ fontFamily: 'var(--font-primary)', backgroundImage: isFinal ? 'linear-gradient(90deg, #185de8, #6bdda1)' : 'none' }}>
                      {step.title}
                    </h3>
                    <p className={`text-[14px] leading-[1.6] ${isFinal ? 'text-[#6bdda1] font-semibold' : 'text-[#999999]'}`} style={{ fontFamily: 'var(--font-secondary)' }}>
                      {step.desc}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Sección Inferior "Ideal para" */}
        <div className="max-w-3xl mx-auto text-center mt-12 md:mt-24 relative pt-12">
          
          {/* Separador Fade */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(24,93,232,0.3) 50%, rgba(107,221,161,0.3) 100%, transparent 100%)' }} />
          
          <h4 className="text-[13px] font-bold text-[#848484] tracking-[0.3em] uppercase mb-8" style={{ fontFamily: 'var(--font-secondary)' }}>
            Ideal para:
          </h4>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {['Ventas por WhatsApp', 'Ventas por Instagram', 'Equipos comerciales'].map((chip, i) => (
              <div key={i} className="group relative rounded-full p-[1px] transition-transform duration-300 hover:-translate-y-1 overflow-hidden" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }}>
                <div className="relative w-full h-full bg-[#000000] rounded-full px-6 py-2.5 transition-colors duration-300 group-hover:bg-[#185de8]/10">
                  <span className="text-[14px] text-white font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>{chip}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </motion.div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </section>
  );
};
