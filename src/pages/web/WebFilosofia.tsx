import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../../components/SEO';

const values = [
  {
    title: "Vender bien también es una ventaja competitiva",
    desc: "No alcanza con ser excelente en lo que hacés. Si no sabés venderlo, comunicarlo y estructurarlo, otro con menos valor puede avanzar más rápido."
  },
  {
    title: "La inteligencia artificial tiene que generar impacto real",
    desc: "Creemos en aplicar la IA más moderna cuando mejora resultados concretos: velocidad de respuesta, seguimiento, organización, análisis y conversión."
  },
  {
    title: "La excelencia necesita sistema",
    desc: "Un buen negocio no puede depender solo del talento individual. Necesita procesos, estructura y tecnología que sostengan el crecimiento."
  },
  {
    title: "Pensamos en resultados, no en herramientas",
    desc: "No implementamos tecnología para mostrar innovación. La usamos para resolver problemas reales de ventas y crecimiento."
  },
  {
    title: "La claridad impulsa el crecimiento",
    desc: "Cuando una empresa entiende dónde pierde oportunidades, puede tomar mejores decisiones y construir una ventaja real."
  },
  {
    title: "El crecimiento se diseña",
    desc: "No creemos en improvisar. Creemos en construir sistemas comerciales que permitan crecer con más orden, más eficiencia y más control."
  }
];

export const WebFilosofia = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 1.02, 0.73, 1] } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  return (
    <div className="w-full bg-[#000000] text-white overflow-hidden relative pb-32">
      <SEO 
        title="Nuestra Filosofía | ScalaOps" 
        description="Por qué no somos una agencia de marketing más. Entendemos las ventas B2B como un sistema y operamos bajo ingeniería de procesos."
        canonical="https://scalaops.com/filosofia"
      />
      
      {/* 1. HERO / TÍTULO PRINCIPAL */}
      <section className="relative pt-[180px] pb-16 md:pb-24 overflow-hidden border-b border-white/[0.04]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none z-0 bg-[#185de8] blur-[150px] opacity-[0.15] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none z-0 bg-[#6bdda1] blur-[150px] opacity-[0.08] rounded-full -translate-x-1/2 translate-y-1/2" />
        
        {/* Glow grid sutil */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 60%)' 
          }}
        />

        <div className="container-custom relative z-10 text-center flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 bg-[#185de8]/10 text-[#185de8] text-[11px] font-bold tracking-[0.2em] uppercase rounded-full mb-8 border border-[#185de8]/20"
          >
            NUESTRA FORMA DE CONSTRUIR
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-[48px] md:text-[64px] lg:text-[76px] font-bold leading-[1.05] tracking-tight mb-8" style={{ fontFamily: 'var(--font-primary)' }}
          >
            Misión, visión<br className="hidden md:block" /> y valores
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
            className="w-[1px] h-16 bg-gradient-to-b from-[#6bdda1] to-transparent mt-8"
          />
        </div>
      </section>

      {/* 2. BLOQUE MISIÓN */}
      <section className="relative py-24 md:py-32 bg-[#020202]">
        <div className="container-custom relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start"
          >
            {/* Header de sección */}
            <motion.div variants={fadeUp} className="flex flex-col border-l border-[#6bdda1]/30 pl-6 h-full justify-center min-h-[120px]">
              <span className="text-[12px] font-bold text-[#6bdda1] uppercase tracking-[0.3em] mb-2">01.</span>
              <h2 className="text-[32px] md:text-[48px] font-black tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
                Misión
              </h2>
            </motion.div>

            {/* Content masivo */}
            <motion.div variants={fadeUp} className="relative">
              <span className="absolute -top-12 -left-8 text-[120px] font-black text-white/[0.03] select-none pointer-events-none leading-none" style={{ fontFamily: 'var(--font-primary)' }}>
                "
              </span>
              <p className="text-[24px] md:text-[32px] text-white/90 leading-[1.5] font-medium tracking-tight relative z-10" style={{ fontFamily: 'var(--font-secondary)' }}>
                Ayudar a las empresas a crecer mejor, combinando estrategia comercial, procesos, automatización e inteligencia artificial de última generación para vender más y perder menos oportunidades.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. BLOQUE VISIÓN */}
      <section className="relative py-24 md:py-32 border-t border-white/[0.04]">
        {/* Detail expansor */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40%] h-full opacity-10 pointer-events-none" 
             style={{ background: 'radial-gradient(circle at right, #185de8 0%, transparent 60%)', mixBlendMode: 'screen' }} />

        <div className="container-custom relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-24 items-start"
          >
            {/* Content masivo (Izquierda en desktop para contrarrestar Mision) */}
            <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
              <span className="absolute -top-12 -left-8 text-[120px] font-black text-white/[0.03] select-none pointer-events-none leading-none" style={{ fontFamily: 'var(--font-primary)' }}>
                "
              </span>
              <p className="text-[24px] md:text-[32px] text-[#a1a1a1] leading-[1.5] font-medium tracking-tight relative z-10" style={{ fontFamily: 'var(--font-secondary)' }}>
                Ser la firma referente en Latinoamérica para empresas que quieren modernizar su sistema comercial, potenciar sus ventas y crecer con una infraestructura más inteligente, eficiente y escalable.
              </p>
            </motion.div>

            {/* Header de sección */}
            <motion.div variants={fadeUp} className="flex flex-col border-l border-[#185de8]/30 pl-6 h-full justify-center min-h-[120px] order-1 lg:order-2">
              <span className="text-[12px] font-bold text-[#185de8] uppercase tracking-[0.3em] mb-2">02.</span>
              <h2 className="text-[32px] md:text-[48px] font-black tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
                Visión
              </h2>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 4. BLOQUE VALORES (Grid 6x) */}
      <section className="relative py-24 md:py-32 bg-[#000] border-t border-b border-white/[0.04] overflow-hidden">
        {/* Glow ambient background para el grid */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6bdda1]/5 blur-[200px] rounded-full pointer-events-none z-0" />

        <div className="container-custom relative z-10">
          
          <div className="text-center mb-20 flex flex-col items-center">
             <span className="text-[12px] font-bold text-[#6bdda1] uppercase tracking-[0.3em] mb-4">03.</span>
             <h2 className="text-[36px] md:text-[48px] font-black tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-primary)' }}>
               Valores
             </h2>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10"
          >
            {values.map((v, i) => (
              <motion.div 
                key={i} variants={fadeUp}
                className="group relative flex flex-col h-full bg-[#080808] border border-white/[0.06] rounded-[20px] p-8 transition-all duration-300 hover:border-[#6bdda1]/30 hover:bg-[#0c0c0c]"
              >
                {/* Micro-glow on hover */}
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[#6bdda1]/0 to-[#6bdda1]/0 group-hover:from-[#6bdda1]/5 group-hover:to-transparent transition-all duration-500 z-0" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 opacity-30 text-[40px] font-black leading-none text-transparent" style={{ WebkitTextStroke: '1px #ffffff', fontFamily: 'var(--font-primary)' }}>
                    0{i + 1}
                  </div>
                  <h3 className="text-[18px] md:text-[20px] font-bold text-white leading-[1.4] mb-4" style={{ fontFamily: 'var(--font-primary)' }}>
                    {v.title}
                  </h3>
                  <div className="w-8 h-[2px] bg-[#6bdda1]/50 mb-6" />
                  <p className="text-[14px] md:text-[15px] text-[#888] leading-[1.6] font-medium mt-auto" style={{ fontFamily: 'var(--font-secondary)' }}>
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        
        </div>
      </section>

      {/* 5. CIERRE VISUAL / FRASE FINAL OPCIONAL */}
      <section className="relative py-32 md:py-48 flex items-center justify-center min-h-[60vh]">
        <div className="container-custom relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-[40px] md:text-[64px] lg:text-[80px] font-black tracking-tight text-white leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>
              Crecer mejor <span className="text-white/30">no es hacer más.</span>
              <br/>
              Es construir mejor.
            </h2>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
