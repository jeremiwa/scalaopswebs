import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

// Custom CountUp Component
const CountUp = ({ to, duration = 1, prefix = "", suffix = "", isInView = false, delay = 0 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const val = Math.round(latest);
    if (val >= 1000) {
      return prefix + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + suffix;
    }
    return prefix + val + suffix;
  });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      const controls = animate(count, to, {
        duration,
        ease: "easeOut",
        delay
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration, started, count, delay]);

  // Fallback if reduced motion is preferred
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) {
    const formattedVal = to >= 1000 ? to.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : to;
    return <span>{prefix}{formattedVal}{suffix}</span>;
  }

  return <motion.span>{rounded}</motion.span>;
};

export const S02_BentoDolores = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const isReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // Strikethrough state for block 01
  const [strikeFinished, setStrikeFinished] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setStrikeFinished(true);
      }, 2100); // Wait for countup (1s) + delay (1.1s)
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="w-full bg-[#000000] py-[48px] md:py-[80px] flex flex-col items-center relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00D4AA]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom px-[20px] w-full max-w-[1100px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* EYEBROW */}
        <motion.span 
          initial={isReduced ? {} : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 0.8, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="block text-[#00D4AA] text-[11px] font-bold uppercase tracking-[0.2em] mb-[16px] text-center"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          LO QUE SENTINEL TE SACA DE ENCIMA
        </motion.span>

        {/* HEADLINE */}
        <motion.h2 
          initial={isReduced ? {} : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[clamp(32px,6vw,64px)] font-[800] text-white leading-[1.05] tracking-tight mb-[20px] text-center"
          style={{ fontFamily: 'Saira, sans-serif' }}
        >
          Seis dolores.<br />
          <span style={{
            background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Una sola solución.</span>
        </motion.h2>

        {/* SUBHEADLINE */}
        <motion.p 
          initial={isReduced ? {} : { opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 0.7, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-[clamp(15px,3.5vw,18px)] text-white leading-[1.4] max-w-[90%] md:max-w-[600px] text-center mb-[48px] md:mb-[64px]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Mirá lo que cambia el día que activás Sentinel.
        </motion.p>

        {/* BENTO GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[12px] md:gap-[20px] mb-[48px]">
          
          {/* ▸ BLOQUE 01 — COSTOS (col-span 8, row-span 2) */}
          <motion.div
            initial={isReduced ? {} : { opacity: 0, y: 20, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: isReduced ? 0 : 0.8 }}
            whileHover={isReduced ? {} : { 
              y: -4, 
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: '0 10px 30px rgba(0,212,170,0.05)'
            }}
            className="group relative flex flex-col bg-[#0A0A0A] border border-white/10 rounded-[20px] p-[24px] md:p-[32px] overflow-hidden lg:col-span-8 lg:row-span-2 min-h-[300px] md:min-h-[380px] justify-between"
          >
            {/* Top accent border */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF4D6D] to-[#00D4AA]" />
            {/* Ambient breathing glow */}
            <div className="absolute inset-0 bg-[#00D4AA]/[0.02] mix-blend-screen pointer-events-none transition-opacity duration-1000 animate-pulse" />
            
            {/* Gradient shift background */}
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,rgba(255,77,109,0.06)_0%,rgba(0,212,170,0.06)_100%)] pointer-events-none" 
                 style={{ 
                   backgroundSize: '200% 200%', 
                   animation: isReduced ? 'none' : 'gradient-shift 8s ease infinite' 
                 }} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#00D4AA]/70 text-[11px] font-bold uppercase tracking-wider block mb-[16px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  COSTOS
                </span>
                
                {/* Strikethrough cost container */}
                <div className="relative inline-block mb-[8px]">
                  <h3 className="text-[36px] md:text-[56px] font-[800] text-[#FF4D6D] leading-none" style={{ fontFamily: 'Saira, sans-serif' }}>
                    <CountUp to={18000} prefix="USD " suffix="+/año" isInView={isInView} delay={1.1} />
                  </h3>
                  
                  {/* Animated Strikethrough line */}
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : {}}
                    transition={{ duration: 0.6, delay: 2.1, ease: "easeInOut" }}
                    className="absolute top-[48%] left-0 h-[3px] md:h-[5px] bg-[#00D4AA]"
                    style={{ opacity: strikeFinished ? 0.4 : 1 }}
                  />
                </div>

                <p className="text-[13px] md:text-[14px] text-white/65 font-normal mb-[20px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  en sueldo, cargas, aguinaldo, ART
                </p>
              </div>

              {/* Animated Separator */}
              <div className="my-[20px] relative w-[40%] h-[1px]">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 2.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#00D4AA] origin-left"
                />
              </div>

              <div>
                <h4 className="text-[20px] md:text-[28px] font-semibold text-[#00D4AA] mb-[6px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                  <span className="text-white/90 font-medium">Sentinel:</span> USD 997
                </h4>
                <p className="text-[12px] md:text-[13px] text-white/50 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sin cargas. Sin aguinaldo. Sin ART.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ▸ BLOQUE 02 — VELOCIDAD (col-span 4, row-span 1) */}
          <motion.div
            initial={isReduced ? {} : { opacity: 0, y: 20, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: isReduced ? 0 : 0.9 }}
            whileHover={isReduced ? {} : { 
              y: -4, 
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: '0 10px 30px rgba(0,212,170,0.05)'
            }}
            className="group relative flex flex-col bg-[#0A0A0A] border border-white/10 rounded-[20px] p-[24px] md:p-[32px] overflow-hidden lg:col-span-4 lg:row-span-1 justify-between min-h-[220px]"
          >
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,rgba(255,77,109,0.06)_0%,rgba(0,212,170,0.06)_100%)] pointer-events-none" 
                 style={{ 
                   backgroundSize: '200% 200%', 
                   animation: isReduced ? 'none' : 'gradient-shift 8s ease infinite' 
                 }} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#00D4AA]/70 text-[11px] font-bold uppercase tracking-wider block mb-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  VELOCIDAD
                </span>
                <h3 className="text-[32px] md:text-[44px] font-[800] text-[#FF4D6D] leading-none mb-[6px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                  <CountUp to={40} suffix=" min" isInView={isInView} delay={1.2} />
                </h3>
                <p className="text-[13px] md:text-[14px] text-white/65" style={{ fontFamily: 'Inter, sans-serif' }}>
                  tarda tu equipo en responder
                </p>
              </div>

              <div className="my-[16px] relative w-[40%] h-[1px]">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.8 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#00D4AA] origin-left"
                />
              </div>

              <div>
                <h4 className="text-[18px] md:text-[20px] font-semibold text-[#00D4AA] mb-[4px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                  <span className="text-white/90 font-medium">Sentinel:</span> &lt;8 segundos
                </h4>
                <p className="text-[12px] md:text-[13px] text-white/50 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Mientras la competencia duerme.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ▸ BLOQUE 03 — HORARIO (col-span 4, row-span 1) */}
          <motion.div
            initial={isReduced ? {} : { opacity: 0, y: 20, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: isReduced ? 0 : 1.0 }}
            whileHover={isReduced ? {} : { 
              y: -4, 
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: '0 10px 30px rgba(0,212,170,0.05)'
            }}
            className="group relative flex flex-col bg-[#0A0A0A] border border-white/10 rounded-[20px] p-[24px] md:p-[32px] overflow-hidden lg:col-span-4 lg:row-span-1 justify-between min-h-[220px]"
          >
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,rgba(255,77,109,0.06)_0%,rgba(0,212,170,0.06)_100%)] pointer-events-none" 
                 style={{ 
                   backgroundSize: '200% 200%', 
                   animation: isReduced ? 'none' : 'gradient-shift 8s ease infinite' 
                 }} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#00D4AA]/70 text-[11px] font-bold uppercase tracking-wider block mb-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  HORARIO
                </span>
                <h3 className="text-[32px] md:text-[44px] font-[800] text-[#FF4D6D] leading-none mb-[6px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                  <CountUp to={40} suffix="% de leads" isInView={isInView} delay={1.3} />
                </h3>
                <p className="text-[13px] md:text-[14px] text-white/65" style={{ fontFamily: 'Inter, sans-serif' }}>
                  entran fuera del horario laboral
                </p>
              </div>

              <div className="my-[16px] relative w-[40%] h-[1px]">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.9 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#00D4AA] origin-left"
                />
              </div>

              <div>
                <h4 className="text-[18px] md:text-[20px] font-semibold text-[#00D4AA] mb-[4px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                  <span className="text-white/90 font-medium">Sentinel:</span> 24/7/365
                </h4>
                <p className="text-[12px] md:text-[13px] text-white/50 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sábado 23hs, lunes feriado, Navidad.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ▸ BLOQUE 04 — CAPACIDAD (col-span 4, row-span 1) */}
          <motion.div
            initial={isReduced ? {} : { opacity: 0, y: 20, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: isReduced ? 0 : 1.1 }}
            whileHover={isReduced ? {} : { 
              y: -4, 
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: '0 10px 30px rgba(0,212,170,0.05)'
            }}
            className="group relative flex flex-col bg-[#0A0A0A] border border-white/10 rounded-[20px] p-[24px] md:p-[32px] overflow-hidden lg:col-span-4 lg:row-span-1 justify-between min-h-[220px]"
          >
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,rgba(255,77,109,0.06)_0%,rgba(0,212,170,0.06)_100%)] pointer-events-none" 
                 style={{ 
                   backgroundSize: '200% 200%', 
                   animation: isReduced ? 'none' : 'gradient-shift 8s ease infinite' 
                 }} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#00D4AA]/70 text-[11px] font-bold uppercase tracking-wider block mb-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  CAPACIDAD
                </span>
                <h3 className="text-[32px] md:text-[44px] font-[800] text-[#FF4D6D] leading-none mb-[6px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                  1 chat por vez
                </h3>
                <p className="text-[13px] md:text-[14px] text-white/65" style={{ fontFamily: 'Inter, sans-serif' }}>
                  es lo que atiende un humano
                </p>
              </div>

              <div className="my-[16px] relative w-[40%] h-[1px]">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#00D4AA] origin-left"
                />
              </div>

              <div>
                <h4 className="text-[18px] md:text-[20px] font-semibold text-[#00D4AA] mb-[4px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                  <span className="text-white/90 font-medium">Sentinel:</span> 50+ simultáneos
                </h4>
                <p className="text-[12px] md:text-[13px] text-white/50 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sin tiempos de espera. Nunca.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ▸ BLOQUE 05 — ROTACIÓN (col-span 4, row-span 1) */}
          <motion.div
            initial={isReduced ? {} : { opacity: 0, y: 20, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: isReduced ? 0 : 1.2 }}
            whileHover={isReduced ? {} : { 
              y: -4, 
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: '0 10px 30px rgba(0,212,170,0.05)'
            }}
            className="group relative flex flex-col bg-[#0A0A0A] border border-white/10 rounded-[20px] p-[24px] md:p-[32px] overflow-hidden lg:col-span-4 lg:row-span-1 justify-between min-h-[220px]"
          >
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,rgba(255,77,109,0.06)_0%,rgba(0,212,170,0.06)_100%)] pointer-events-none" 
                 style={{ 
                   backgroundSize: '200% 200%', 
                   animation: isReduced ? 'none' : 'gradient-shift 8s ease infinite' 
                 }} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#00D4AA]/70 text-[11px] font-bold uppercase tracking-wider block mb-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  ROTACIÓN
                </span>
                <h3 className="text-[32px] md:text-[44px] font-[800] text-[#FF4D6D] leading-none mb-[6px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                  <CountUp to={3} suffix=" meses" isInView={isInView} delay={1.4} />
                </h3>
                <p className="text-[13px] md:text-[14px] text-white/65" style={{ fontFamily: 'Inter, sans-serif' }}>
                  para capacitar a cada vendedor nuevo
                </p>
              </div>

              <div className="my-[16px] relative w-[40%] h-[1px]">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 2.0 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#00D4AA] origin-left"
                />
              </div>

              <div>
                <h4 className="text-[18px] md:text-[20px] font-semibold text-[#00D4AA] mb-[4px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                  <span className="text-white/90 font-medium">Sentinel:</span> entrenado una vez
                </h4>
                <p className="text-[12px] md:text-[13px] text-white/50 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Cero re-capacitación. Cero curva de aprendizaje.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ▸ BLOQUE 06 — SATURACIÓN (col-span 8, row-span 1) */}
          <motion.div
            initial={isReduced ? {} : { opacity: 0, y: 20, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: isReduced ? 0 : 1.3 }}
            whileHover={isReduced ? {} : { 
              y: -4, 
              borderColor: 'rgba(255,255,255,0.15)',
              boxShadow: '0 10px 30px rgba(0,212,170,0.05)'
            }}
            className="group relative flex flex-col bg-[#0A0A0A] border border-white/10 rounded-[20px] p-[24px] md:p-[32px] overflow-hidden lg:col-span-8 lg:row-span-1 justify-between min-h-[220px]"
          >
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(135deg,rgba(255,77,109,0.06)_0%,rgba(0,212,170,0.06)_100%)] pointer-events-none" 
                 style={{ 
                   backgroundSize: '200% 200%', 
                   animation: isReduced ? 'none' : 'gradient-shift 8s ease infinite' 
                 }} />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="text-[#00D4AA]/70 text-[11px] font-bold uppercase tracking-wider block mb-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Tareas repetitivas
                </span>
                <h3 className="text-[32px] md:text-[44px] font-[800] text-[#FF4D6D] leading-none mb-[6px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                  <CountUp to={60} suffix="% del día" isInView={isInView} delay={1.5} />
                </h3>
                <p className="text-[13px] md:text-[14px] text-white/65" style={{ fontFamily: 'Inter, sans-serif' }}>
                  tu mejor vendedor responde lo mismo
                </p>
              </div>

              <div className="my-[16px] relative w-[40%] h-[1px]">
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 2.1 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#00D4AA] origin-left"
                />
              </div>

              <div>
                <h4 className="text-[18px] md:text-[20px] font-semibold text-[#00D4AA] mb-[4px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                  <span className="text-white/90 font-medium">Sentinel:</span> filtra y deriva
                </h4>
                <p className="text-[12px] md:text-[13px] text-white/50 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Tu equipo solo cierra oportunidades reales.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* CIERRE */}
        <motion.div
          initial={isReduced ? {} : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="text-center mt-[32px] flex flex-col items-center gap-[24px]"
        >
          <p className="text-[18px] md:text-[22px] font-semibold text-white leading-tight" style={{ fontFamily: 'Saira, sans-serif' }}>
            Seis problemas que cuestan caro. Uno solo que <span className="text-[#00D4AA]">los resuelve.</span>
          </p>
          
          <a
            href="https://scalaops.com/formulario"
            className="inline-flex items-center justify-center bg-[#00D4AA] text-[#020403] font-extrabold text-[15px] px-[32px] py-[16px] rounded-full transition-transform hover:scale-105"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              boxShadow: '0 4px 20px rgba(0,212,170,0.2)'
            }}
          >
            Implementar Sentinel →
          </a>
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </section>
  );
};
