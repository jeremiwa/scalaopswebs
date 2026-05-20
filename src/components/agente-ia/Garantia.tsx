import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Check } from 'lucide-react';

const includes = [
  'Implementación completa según lo acordado',
  'Sentinel entrenado con tu información',
  'Activo y funcionando en WhatsApp/IG',
  'Soporte directo durante los 30 días',
];

export const Garantia = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative w-full py-[80px] lg:py-[120px] overflow-hidden" style={{ background: 'linear-gradient(180deg, #000000 0%, rgba(255,255,255,0.015) 50%, #000000 100%)' }}>
      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[700px] mx-auto text-center">

        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ color: 'rgba(0,212,170,0.8)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif', marginBottom: '16px' }}>
          SIN RIESGO
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(30px, 7vw, 52px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
          30 días de garantía.<br />Sin letra chica.
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-10"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 3.5vw, 17px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, maxWidth: '520px' }}>
          Si en 30 días desde la activación de Sentinel no estás viendo el impacto que prometemos, te devolvemos el 100% de la implementación. Sin formularios eternos. Sin preguntas raras.
        </motion.p>

        {/* Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mb-10 guarantee-seal"
        >
          <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full flex flex-col items-center justify-center relative"
            style={{ background: '#0A0A0A', border: '2px solid #00D4AA', boxShadow: '0 0 30px rgba(0,212,170,0.15)' }}>
            <Shield className="w-10 h-10 md:w-12 md:h-12 text-[#00D4AA] mb-2" strokeWidth={1.5} />
            <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '14px', fontWeight: 800, color: '#00D4AA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>GARANTÍA</span>
            <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '32px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>30</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DÍAS</span>
          </div>
        </motion.div>

        {/* Includes */}
        <div className="flex flex-col gap-3 mb-10 w-full max-w-[400px]">
          {includes.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
              className="flex items-center gap-3">
              <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.12)' }}>
                <Check className="w-3.5 h-3.5 text-[#00D4AA]" strokeWidth={3} />
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 500, color: 'rgba(255,255,255,0.8)', textAlign: 'left' }}>{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Reverse case */}
        <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 1.1 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, maxWidth: '480px' }}>
          Si después de 30 días querés seguir, no hacemos nada: Sentinel sigue trabajando. Vos seguís cobrando.
        </motion.p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sealGlow { 0%, 100% { box-shadow: 0 0 25px rgba(0,212,170,0.15); } 50% { box-shadow: 0 0 50px rgba(0,212,170,0.3); } }
        .guarantee-seal > div { animation: sealGlow 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .guarantee-seal > div { animation: none; } }
      `}} />
    </section>
  );
};
