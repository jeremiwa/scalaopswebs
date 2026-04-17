import React from 'react';
import { motion, useAnimation } from 'framer-motion';

export const HeroInstitutional = () => {
  const customEase = [0.21, 1.02, 0.73, 1];

  const titleWordsFirst = "Implementamos IA".split(" ");
  const titleWordsSecond = "en tu empresa.".split(" ");

  // Stagger Text Container
  const textContainerParent = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const textWord = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: customEase }
    }
  };

  // Massive Blurred Aurora Bars matching the exact screenshot
  const bars = [
    { width: '70%', height: 160, delay: 0 },
    { width: '85%', height: 160, delay: 0.2 },
    { width: '100%', height: 160, delay: 0.4 },
  ];

  return (
    <section className="relative w-full min-h-[95vh] flex items-center bg-[#000000] overflow-hidden pt-20">
      
      {/* 1. Fondo Textura (Grain) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          opacity: 0.03
        }} 
      />

      {/* 2. Orbs Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] pointer-events-none z-0 bg-[#185de8] blur-[120px] opacity-15 rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] pointer-events-none z-0 bg-[#6bdda1] blur-[120px] opacity-15 rounded-full" />

      <div className="container-custom relative z-10 w-full grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-8 items-center mt-[15vh] lg:mt-0">
        
        {/* Left Column: Text & CTAs */}
        <div className="flex flex-col items-start text-left pt-10 pb-20 lg:py-0">
          
          <h1 className="text-[48px] md:text-[68px] lg:text-[76px] font-bold tracking-tight leading-[1.05] text-white mb-8" style={{ fontFamily: 'var(--font-primary)' }}>
            
            <motion.div 
              variants={textContainerParent}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-[0.3em] mb-2"
            >
              {titleWordsFirst.map((word, i) => (
                <motion.span key={i} variants={textWord} className="inline-block whitespace-nowrap">
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <motion.div 
              variants={textContainerParent}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: 0.4 }}
              className="flex flex-wrap gap-[0.3em]"
            >
              {titleWordsSecond.map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={textWord} 
                  className="inline-block whitespace-nowrap text-white"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: customEase }}
            className="text-[17px] md:text-[20px] text-[#999999] max-w-[540px] mb-12 leading-[1.6]"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Auditamos tu operación comercial, implementamos IA y armamos el sistema para que vendas más con lo que ya tenés.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: customEase }}
          >
            {/* Primary CTA */}
            <motion.button
              className="relative text-[#000000] overflow-hidden flex items-center justify-center transition-shadow group"
              style={{
                background: 'linear-gradient(90deg, #185de8, #6bdda1)',
                padding: '20px 48px',
                borderRadius: '100px',
                fontFamily: 'var(--font-primary)',
                fontWeight: 800,
                fontSize: '16px',
                boxShadow: '0 0 40px rgba(107, 221, 161, 0.1)',
                transformOrigin: 'center center'
              }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 0 50px rgba(24, 93, 232, 0.4)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer interno */}
              <motion.div
                className="absolute inset-0 bg-white/30 skew-x-[-20deg]"
                style={{ left: '-30%', width: '30%' }}
                animate={{ left: ['-30%', '130%'] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3, ease: 'easeOut' }}
              />
              Agendar llamada
            </motion.button>

            {/* Secondary CTA */}
            <a href="#soluciones" className="group flex items-center text-white text-[15px] font-bold transition-colors">
              Ver soluciones
              <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              {/* Subrayado gradiente animado */}
              <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#185de8] to-[#6bdda1] transition-all duration-300 group-hover:w-full" />
            </a>
          </motion.div>
        </div>

        {/* Right Column Placeholder to keep layout spacing */}
        <div className="relative w-full h-full min-h-[500px] hidden lg:block"></div>
      </div>

      {/* Right Column: Barras Escalonadas Gigantes (Mockup Match) BLOWING OUT TO RIGHT EDGE */}
      <div className="absolute top-[80px] lg:top-1/2 right-0 lg:-translate-y-1/2 w-full lg:w-[45vw] h-[300px] lg:h-[80%] flex flex-col justify-center gap-3 lg:gap-[60px] select-none pointer-events-none z-10 overflow-hidden">
        {bars.map((bar, i) => (
          <div key={i} className="w-full flex justify-end relative h-[60px] lg:h-[160px]">
            
            <motion.div
              className="relative w-full h-full"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + bar.delay, duration: 1.5, ease: customEase }}
            >
              <div style={{ width: bar.width }} className="absolute right-0 h-full">
                {/* La aurora central de la barra con super blur */}
                <motion.div 
                  className="w-full h-full absolute right-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #185de8 60%, #6bdda1 100%)',
                    filter: 'blur(30px) sm:blur(50px)'
                  }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Núcleo de luz más brillante en el centro para dar el efecto de tubo de neón */}
                <motion.div 
                  className="w-full h-[30%] absolute right-0 top-1/2 -translate-y-1/2"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(24,93,232,0.8) 70%, rgba(107,221,161,1) 100%)',
                    filter: 'blur(15px)'
                  }}
                  animate={{ opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
            </motion.div>

          </div>
        ))}
      </div>

      <style>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          animation: gradient-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};
