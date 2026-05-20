import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

export const OfertaSimple = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="pricing" ref={ref} className="w-full bg-[#000000] py-[64px] md:py-[100px] flex flex-col items-center relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00D4AA]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom px-[20px] w-full max-w-[600px] mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-[40px]"
        >
          <h2 className="text-[clamp(28px,6vw,44px)] font-[800] text-white leading-[1.1] tracking-tight mb-[16px]" style={{ fontFamily: 'Saira, sans-serif' }}>
            Implementá Sentinel por precio lanzamiento.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full bg-[#050807] border border-[#00D4AA]/20 rounded-[24px] p-[32px] md:p-[48px] shadow-[0_0_40px_rgba(0,212,170,0.05)] relative overflow-hidden"
        >
          {/* Header Card */}
          <div className="flex flex-col items-center text-center border-b border-white/5 pb-[32px] mb-[32px]">
            <div className="bg-[#00D4AA]/10 text-[#00D4AA] text-[12px] font-bold px-[12px] py-[6px] rounded-full mb-[24px] uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>
              Precio Lanzamiento
            </div>
            <div className="text-[64px] font-[800] text-white leading-[1] mb-[8px]" style={{ fontFamily: 'Saira, sans-serif', letterSpacing: '-0.03em' }}>
              USD 997
            </div>
            <p className="text-[16px] text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
              Implementación personalizada para tu negocio.
            </p>
            <p className="text-[13px] text-white/40 mt-[12px] max-w-[400px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Menos que sumar estructura comercial. Más rápido que contratar y capacitar desde cero.
            </p>
          </div>

          {/* Includes */}
          <div className="mb-[32px]">
            <h4 className="text-[14px] font-bold text-white mb-[16px]" style={{ fontFamily: 'Inter, sans-serif' }}>¿Qué incluye?</h4>
            <ul className="flex flex-col gap-[12px]">
              {[
                "Diagnóstico inicial",
                "Configuración del Empleado IA",
                "Entrenamiento con tu información",
                "Flujo de venta y seguimiento",
                "Pruebas y puesta en marcha"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-[12px] text-[15px] text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <CheckCircle2 className="w-5 h-5 text-[#00D4AA] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Bonos */}
          <div className="bg-[#111816] border border-white/5 rounded-[12px] p-[20px] mb-[32px]">
            <div className="flex items-center gap-[8px] mb-[12px]">
              <Gift className="w-4 h-4 text-[#FF4D6D]" />
              <h4 className="text-[14px] font-bold text-[#FF4D6D] uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>Bonos incluidos</h4>
            </div>
            <ul className="flex flex-col gap-[8px]">
              <li className="flex items-start gap-[8px] text-[14px] text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-[#FF4D6D] mt-[2px]">•</span> Mapa de oportunidades perdidas
              </li>
              <li className="flex items-start gap-[8px] text-[14px] text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-[#FF4D6D] mt-[2px]">•</span> Ajuste de tono para que no suene robótico
              </li>
            </ul>
          </div>

          {/* CTA */}
          <Link
            to={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center h-[56px] rounded-[999px] mb-[16px] hover:scale-[0.98] transition-transform"
            style={{
              background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: '17px',
              color: '#020403',
              boxShadow: '0 4px 16px rgba(0, 212, 170, 0.15)',
              textDecoration: 'none'
            }}
          >
            Reservar implementación
          </Link>
          <p className="text-[12px] text-white/40 text-center mb-[24px]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Costos externos o mantenimiento, si aplican, se informan antes de avanzar.
          </p>

          {/* Guarantee */}
          <div className="flex items-center justify-center gap-[8px] pt-[24px] border-t border-white/5">
            <ShieldCheck className="w-5 h-5 text-white/50" />
            <span className="text-[13px] font-medium text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
              Garantía de implementación 30 días
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
