import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const unifiedCases = [
  {
    name: "Martín S.",
    role: "Director Comercial · Real Estate",
    avatar: "https://i.pravatar.cc/150?u=martin",
    quote: "La auditoría nos mostró fallas reales: objeciones mal trabajadas y un equipo sin proceso claro. Scala nos cambió el negocio.",
    antes: "Respuesta lenta y sin seguimiento a leads premium.",
    despues: "Agentes IA perfiladores integrados al CRM que asignan automáticamente.",
    metricValue: "+35%",
    metricText: "Recuperación",
    badge: "Implementado en 27 días",
    video: false
  },
  {
    name: "Jordi Falcon",
    role: "CEO · Servicios Inmobiliarios",
    avatar: "https://i.pravatar.cc/150?u=jordi",
    quote: "Los recomiendo mucho, gran conocimiento técnico. Nos ayudaron a escalar la operativa operativa sin sumar más gasto en personal.",
    antes: "Desorden en el onboarding y reportes manuales que frenaban ventas.",
    despues: "Sistemas de automatización y dashboard operativo integral.",
    metricValue: "40hs",
    metricText: "Ahorradas al mes",
    badge: "Ver Testimonio Completo",
    video: true
  },
  {
    name: "Laura G.",
    role: "CEO · Agencia B2B",
    avatar: "https://i.pravatar.cc/150?u=laura",
    quote: "La velocidad y profesionalismo 10 puntos. No solo los recomiendo, es casi una obligación si tenés un negocio y no tenés IA.",
    antes: "Tráfico alto pero ventas tardaba días en filtrar interesados reales.",
    despues: "Bot transaccional que pre-califica, agenda llamadas y nutre prospectos.",
    metricValue: "24/7",
    metricText: "Disponibilidad",
    badge: "Implementado en 30 días",
    video: false
  }
];

// CountUp hook animado
const CountUpNumber = ({ from, to, duration, prefix = "", suffix = "", decimal = false }) => {
  const [inView, setInView] = useState(false);
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => {
    return prefix + (decimal ? latest.toFixed(0) : Math.round(latest)) + suffix;
  });

  return (
    <motion.span
      whileInView={() => {
        if (!inView) {
          setInView(true);
          animate(count, to, { duration, ease: "easeOut" });
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="tabular-nums"
    >
      {rounded}
    </motion.span>
  );
};

export const FeaturedCases = () => {
  
  const blockVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.8, ease: [0.21, 1.02, 0.73, 1] } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  return (
    <section className="py-16 bg-[#000000] border-y border-white/[0.02] overflow-hidden" id="casos">
      
      {/* Elemento de background (Separadores ADN) */}
      <div className="absolute left-[5%] top-[10%] w-[100px] opacity-10 flex flex-col gap-2 pointer-events-none">
         <div className="w-full h-1" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />
         <div className="w-[60%] h-1" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />
      </div>

      <motion.div 
        className="container-custom"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        
        {/* Header */}
        <motion.div variants={blockVariants} className="mb-20 text-center relative">
          <span className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-4">
            RESULTADOS REALES
          </span>
          <h2 className="relative text-[36px] md:text-[52px] font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-primary)' }}>
            Menos fugas. Más ingresos.
          </h2>
        </motion.div>

        {/* Bloque A: Métricas Protagonistas Globales */}
        <motion.div variants={blockVariants} className="relative z-10 w-full mb-24">
          
          <div className="relative rounded-[24px] p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between"
               style={{
                 background: 'radial-gradient(circle at center, #0F1419 0%, #000000 100%)',
                 border: '1px solid transparent',
               }}>
            
            <div className="absolute inset-0 rounded-[24px] pointer-events-none z-0" style={{ padding: '1px', background: 'linear-gradient(90deg, rgba(24,93,232,0.3), rgba(107,221,161,0.3))', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMaskComposite: 'xor' }} />
            
            <svg className="absolute inset-0 w-full h-[60%] bottom-0 opacity-5 text-[#6bdda1] pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
               <path d="M0,100 L20,80 L40,90 L60,40 L80,50 L100,10" />
               <path d="M0,100 L20,80 L40,90 L60,40 L80,50 L100,10 L100,100 Z" fill="currentColor" opacity="0.2" stroke="none" />
            </svg>

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative w-full z-10">
              <h3 className="text-[64px] md:text-[96px] font-black leading-none mb-2" 
                  style={{ fontFamily: 'var(--font-primary)', backgroundImage: 'linear-gradient(90deg, #185de8, #6bdda1)', WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}>
                <CountUpNumber from={0} to={35} duration={1.5} prefix="+" suffix="%" />
              </h3>
              <p className="text-[13px] text-[#999999] tracking-[0.2em] uppercase font-medium mt-2" style={{ fontFamily: 'var(--font-secondary)' }}>
                Recuperación de oportunidades
              </p>
            </div>

            <div className="hidden md:block w-px h-[100px] z-10" style={{ backgroundImage: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }} />

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative w-full z-10">
              <h3 className="text-[64px] md:text-[96px] font-black leading-none mb-2" 
                  style={{ fontFamily: 'var(--font-primary)', backgroundImage: 'linear-gradient(90deg, #185de8, #6bdda1)', WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}>
                <CountUpNumber from={0} to={40} duration={1.5} suffix="hs" />
              </h3>
              <p className="text-[13px] text-[#999999] tracking-[0.2em] uppercase font-medium mt-2 text-center" style={{ fontFamily: 'var(--font-secondary)' }}>
                Ahorradas por mes en operativa
              </p>
            </div>

            <div className="hidden md:block w-px h-[100px] z-10" style={{ backgroundImage: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }} />

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative w-full z-10">
              <h3 className="text-[64px] md:text-[96px] font-black leading-none mb-2" 
                  style={{ fontFamily: 'var(--font-primary)', backgroundImage: 'linear-gradient(90deg, #185de8, #6bdda1)', WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}>
                24/7
              </h3>
              <p className="text-[13px] text-[#999999] tracking-[0.2em] uppercase font-medium mt-2 text-center" style={{ fontFamily: 'var(--font-secondary)' }}>
                Calificación en piloto automático
              </p>
            </div>

          </div>

        </motion.div>

        {/* Bloque B (FUSIONADO): Testimonios + Casos juntos */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {unifiedCases.map((c, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              className="group flex flex-col bg-[#0A0A0A] rounded-[24px] relative transition-all duration-400 hover:-translate-y-2"
              style={{ border: '1px solid #1A1A1A' }}
              whileHover={{ 
                borderColor: 'rgba(107, 221, 161, 0.4)',
                boxShadow: '0 10px 40px rgba(107, 221, 161, 0.05)'
              }}
            >
              
              <div className="absolute top-0 right-4 text-[140px] leading-none opacity-[0.03] select-none pointer-events-none" style={{ fontFamily: 'var(--font-primary)' }}>
                "
              </div>

              <div className="p-8 flex flex-col h-full relative z-10">
                
                {/* 1. Header (Avatar + Nombre + Industria) */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-[50px] h-[50px] rounded-full p-[2px] shrink-0" style={{ background: 'linear-gradient(135deg, #185de8, #6bdda1)' }}>
                    <img src={c.avatar} alt={c.name} className="w-full h-full rounded-full border-[2px] border-black object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-[17px] tracking-tight" style={{ fontFamily: 'var(--font-primary)' }}>{c.name}</h4>
                    <span className="text-[#999999] text-[13px] font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>{c.role}</span>
                  </div>
                </div>

                {/* 2. Testimonio directo */}
                <p className="text-[15px] text-white/90 leading-[1.6] italic mb-8" style={{ fontFamily: 'var(--font-secondary)' }}>
                 "{c.quote}"
                </p>

                {/* 3. Divider Gradiente */}
                <div className="w-full h-px mb-8" style={{ background: 'linear-gradient(90deg, rgba(24,93,232,0.3) 0%, rgba(107,221,161,0.3) 100%)' }} />

                {/* 4. Solución vs Problema (Humano) */}
                <div className="space-y-5 mb-8">
                  <div>
                    <span className="inline-block text-[11px] font-extrabold text-[#FF8A65] mb-1.5 uppercase tracking-widest">
                      Antes
                    </span>
                    <p className="text-[14px] text-white/50 leading-relaxed font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>{c.antes}</p>
                  </div>
                  <div>
                    <span className="inline-block text-[11px] font-extrabold text-[#6bdda1] mb-1.5 uppercase tracking-widest">
                      Solución
                    </span>
                    <p className="text-[14px] text-white/80 leading-relaxed font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>{c.despues}</p>
                  </div>
                </div>

                {/* 5. Cierre: Métrica mini + Badge */}
                <div className="mt-auto pt-6 border-t border-white/[0.04] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[20px] font-black leading-none mb-1" style={{ fontFamily: 'var(--font-primary)', backgroundImage: 'linear-gradient(90deg, #185de8, #6bdda1)', WebkitBackgroundClip: 'text', color: 'transparent', backgroundClip: 'text' }}>
                      {c.metricValue}
                    </span>
                    <span className="text-[11px] text-[#666] tracking-wide uppercase font-bold">{c.metricText}</span>
                  </div>

                  {c.video ? (
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#111] hover:bg-[#6bdda1] text-[#6bdda1] hover:text-black transition-all text-[12px] font-bold tracking-wide group/btn">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      Ver video
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[#6bdda1] text-[11px] font-bold tracking-wide border border-[#6bdda1]" style={{ backgroundColor: 'rgba(107, 221, 161, 0.1)', fontFamily: 'var(--font-primary)' }}>
                      <svg className="w-3 h-3 mt-[-1px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {c.badge}
                    </span>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
};
