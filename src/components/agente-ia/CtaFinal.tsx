import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

export const CtaFinal = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="sentinel-cta-final" ref={sectionRef} className="relative w-full py-[96px] lg:py-[140px] overflow-hidden" style={{ background: '#000000' }}>
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 bg-[#0066FF] blur-[150px] opacity-[0.06] rounded-full" />
      <div className="absolute bottom-[-15%] right-[10%] w-[400px] h-[400px] pointer-events-none z-0 bg-[#00D4AA] blur-[120px] opacity-[0.04] rounded-full" />

      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[700px] mx-auto text-center">

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(32px, 8vw, 64px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', color: '#FFFFFF', marginBottom: '24px' }}
        >
          Mientras leés esto,<br />te están escribiendo<br />y <span style={{ color: '#FF4D6D' }}>nadie responde</span>.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-10"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 4vw, 18px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, maxWidth: '500px' }}
        >
          Sentinel puede estar operando en tu negocio en 7 días. Quedan <span style={{ color: '#00D4AA', fontWeight: 700 }}>3 cupos</span> a precio lanzamiento.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="w-full max-w-[420px] relative mb-4"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[150%] bg-[#00D4AA] blur-[40px] rounded-full z-0 pointer-events-none opacity-15 cta-final-glow" />
          <Link to={CTA_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '60px', borderRadius: '999px', background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '16px', color: '#020403', textDecoration: 'none', boxShadow: '0 4px 32px rgba(0,212,170,0.2)', position: 'relative', zIndex: 10 }}>
            Reservar mi implementación →
          </Link>
        </motion.div>

        {/* Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="cupos-final-text"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}
        >
          Precio lanzamiento USD 997 · 30 días de garantía · Quedan 3 cupos
        </motion.p>

        {/* Cierre emocional */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 1.0 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, maxWidth: '440px', fontStyle: 'italic' }}
        >
          Cada día sin Sentinel es plata que se va a tu competencia. Calculá cuánto, después decidí.
        </motion.p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ctaFinalGlow { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.25; } }
        .cta-final-glow { animation: ctaFinalGlow 4s ease-in-out infinite; }
        @keyframes cuposFinalPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .cupos-final-text { animation: cuposFinalPulse 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .cta-final-glow { animation: none; } .cupos-final-text { animation: none; } }
      `}} />
    </section>
  );
};
