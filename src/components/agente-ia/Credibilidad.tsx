import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Count-up hook
const useCountUp = (end: number, duration: number = 800, startOnInView: boolean = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startOnInView) return;
    
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutExpo
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easeOut));

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, startOnInView]);

  return count;
};

export const Credibilidad = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Numbers to animate
  const negociosCount = useCountUp(45, 800, isInView);
  const mensajesCount = useCountUp(120, 800, isInView); // We'll append ".000+" in render

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-[56px] overflow-hidden">
      
      {/* 01 Separador superior */}
      <div className="w-full px-[24px] absolute top-0 left-0 right-0">
        <motion.div 
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full h-[1px] bg-white/[0.08] max-w-[1100px] mx-auto"
        />
      </div>

      <div className="container-custom relative z-10 flex flex-col items-center px-[24px] max-w-[1100px] mx-auto">
        
        {/* 03 Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{
            color: 'rgba(0, 212, 170, 0.8)',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '16px',
            textAlign: 'center'
          }}
        >
          SCALA · COMMERCIAL OPERATIONS WITH AI
        </motion.div>

        {/* 04 Posicionamiento */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          style={{
            fontFamily: 'Saira, var(--font-primary), sans-serif',
            fontSize: 'clamp(22px, 5vw, 28px)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.3,
            textAlign: 'center',
            maxWidth: '90%',
            marginBottom: '40px'
          }}
        >
          El sistema operativo comercial para PYMEs B2B en LATAM.
        </motion.h2>

        {/* 06 Grid de métricas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-[32px] gap-x-[16px] w-full relative">
          
          {/* Métrica 01 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col items-center text-center relative"
          >
            {/* Glow respirando */}
            <motion.div 
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] bg-[#00D4AA] blur-[30px] rounded-full pointer-events-none"
            />
            <div style={{
              fontFamily: 'Saira, sans-serif',
              fontSize: 'clamp(36px, 8vw, 56px)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1,
              marginBottom: '4px',
              background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(0, 102, 255, 0.8) 200%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {negociosCount}+
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 500, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Negocios con Sentinel
            </div>
            {/* Divisor vertical desktop */}
            <div className="hidden lg:block absolute right-[-8px] top-[20%] h-[60%] w-[1px] bg-white/[0.08]" />
          </motion.div>

          {/* Métrica 02 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.82 }}
            className="flex flex-col items-center text-center relative"
          >
            <motion.div 
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] bg-[#00D4AA] blur-[30px] rounded-full pointer-events-none"
            />
            <div style={{
              fontFamily: 'Saira, sans-serif',
              fontSize: 'clamp(36px, 8vw, 56px)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1,
              marginBottom: '4px',
              background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(0, 102, 255, 0.8) 200%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {mensajesCount}.000+
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 500, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Mensajes mensuales
            </div>
            <div className="hidden lg:block absolute right-[-8px] top-[20%] h-[60%] w-[1px] bg-white/[0.08]" />
          </motion.div>

          {/* Métrica 03 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 0.94 }}
            className="flex flex-col items-center text-center relative"
          >
            <motion.div 
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] bg-[#00D4AA] blur-[30px] rounded-full pointer-events-none"
            />
            <div style={{
              fontFamily: 'Saira, sans-serif',
              fontSize: 'clamp(36px, 8vw, 56px)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1,
              marginBottom: '4px',
              background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(0, 102, 255, 0.8) 200%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              24/7
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 500, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Operación ininterrumpida
            </div>
            <div className="hidden lg:block absolute right-[-8px] top-[20%] h-[60%] w-[1px] bg-white/[0.08]" />
          </motion.div>

          {/* Métrica 04 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5, delay: 1.06 }}
            className="flex flex-col items-center text-center relative"
          >
            <motion.div 
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] bg-[#00D4AA] blur-[30px] rounded-full pointer-events-none"
            />
            <div style={{
              fontFamily: 'Saira, sans-serif',
              fontSize: 'clamp(36px, 8vw, 56px)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1,
              marginBottom: '4px',
              background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(0, 102, 255, 0.8) 200%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              &lt;8seg
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 500, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tiempo de respuesta
            </div>
          </motion.div>

        </div>

      </div>

      {/* 09 Separador inferior */}
      <div className="w-full px-[24px] absolute bottom-0 left-0 right-0 mt-[56px]">
        <motion.div 
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 1.7 }}
          className="w-full h-[1px] bg-white/[0.08] max-w-[1100px] mx-auto"
        />
      </div>

    </section>
  );
};
