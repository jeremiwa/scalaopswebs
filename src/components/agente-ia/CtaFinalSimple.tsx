import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

export const CtaFinalSimple = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="cta-final" ref={ref} className="w-full bg-[#000000] py-[100px] md:py-[140px] flex flex-col items-center relative overflow-hidden">
      
      {/* Background glow sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#00D4AA]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom px-[20px] w-full max-w-[600px] mx-auto relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[clamp(32px,7vw,56px)] font-[800] text-white leading-[1.05] tracking-tight mb-[24px]" style={{ fontFamily: 'Saira, sans-serif' }}>
            Dejá de perder ventas por mensajes que nadie siguió.
          </h2>
          <p className="text-[clamp(16px,4vw,20px)] text-white/70 leading-[1.4] mb-[48px]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Sentinel atiende, filtra y avanza oportunidades 24/7.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex flex-col items-center relative md:max-w-[420px]"
        >
          {/* Subtle Glow en botón */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[120%] bg-[#00D4AA] blur-[40px] rounded-full z-0 pointer-events-none opacity-20" />
          
          <Link
            to={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 w-full flex items-center justify-center h-[60px] rounded-[999px] mb-[16px] hover:scale-[0.98] transition-transform"
            style={{
              background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: '18px',
              color: '#020403',
              boxShadow: '0 4px 16px rgba(0, 212, 170, 0.15)',
              textDecoration: 'none'
            }}
          >
            Implementar Sentinel
          </Link>
          <p className="text-[13px] text-white/40 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            Precio lanzamiento · Personalizado para tu negocio · Listo en 7 días
          </p>
        </motion.div>

      </div>
    </section>
  );
};
