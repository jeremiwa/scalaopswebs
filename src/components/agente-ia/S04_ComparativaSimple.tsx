import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Minus, Check } from 'lucide-react';

export const S04_ComparativaSimple = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="w-full bg-[#000000] py-[80px] md:py-[120px] flex flex-col items-center">
      <div className="container-custom px-[20px] w-full max-w-[1000px] mx-auto">
        
        {/* Encabezado */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-[64px]"
        >
          <h2 className="text-[clamp(32px,6vw,48px)] font-[800] text-white leading-[1.05] tracking-tight mb-[24px]" style={{ fontFamily: 'Saira, sans-serif' }}>
            Antes de sumar otro sueldo, implementa Sentinel
          </h2>
          <p className="text-[clamp(16px,4vw,20px)] text-white/70 leading-[1.4] max-w-[700px] mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Tu empleado IA que cubre la atención al cliente, lo califica y hace el seguimiento sin sumar estructura fija.
          </p>
        </motion.div>

        {/* Comparativa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[48px]">
          
          {/* Card 1: Vendedor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col bg-[#080C0B] rounded-[24px] overflow-hidden border border-white/5 relative"
          >
            {/* Soft red glow top */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF4D6D]/30 to-transparent" />

            <div className="p-[32px] md:p-[48px] flex-1 flex flex-col">
              <div className="inline-flex items-center justify-center bg-white/5 border border-white/10 text-white/60 text-[12px] font-bold px-[12px] py-[6px] rounded-full mb-[32px] uppercase tracking-widest self-start" style={{ fontFamily: 'Inter, sans-serif' }}>
                Costo fijo mensual
              </div>
              <h3 className="text-[28px] font-bold text-white mb-[32px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                Contratar otro vendedor
              </h3>
              
              <ul className="flex flex-col gap-[20px] mb-[48px]">
                {["Sueldo todos los meses", "Horarios limitados", "Capacitación y rotación", "Seguimientos que dependen de una persona"].map((text, i) => (
                  <li key={i} className="flex items-start gap-[16px] text-[16px] text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <div className="mt-[2px] shrink-0 bg-white/5 rounded-full p-[4px]">
                      <Minus className="w-4 h-4 text-white/40" />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-[32px] border-t border-white/5">
                <span className="text-[14px] text-white/50 block mb-[8px] uppercase tracking-wider font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Costo anual estimado
                </span>
                <div className="text-[40px] font-[800] text-white leading-none mb-[12px]" style={{ fontFamily: 'Saira, sans-serif', letterSpacing: '-0.02em' }}>
                  USD 12000+
                </div>
                <p className="text-[13px] text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sin contar comisiones, cargas, capacitación ni rotación.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Sentinel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col bg-[#051A15] rounded-[24px] overflow-hidden border border-[#00D4AA]/20 relative shadow-[0_10px_60px_rgba(0,212,170,0.08)]"
          >
            {/* Cyan glow background */}
            <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[50%] bg-[#00D4AA]/10 blur-[100px] pointer-events-none rounded-full" />
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00D4AA]/80 to-transparent" />

            <div className="p-[32px] md:p-[48px] flex-1 flex flex-col relative z-10">
              <div className="inline-flex items-center justify-center bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[#00D4AA] text-[12px] font-bold px-[12px] py-[6px] rounded-full mb-[32px] uppercase tracking-widest self-start" style={{ fontFamily: 'Inter, sans-serif' }}>
                Empleado IA 24/7
              </div>
              <h3 className="text-[28px] font-bold text-[#00D4AA] mb-[32px]" style={{ fontFamily: 'Saira, sans-serif' }}>
                Sentinel
              </h3>
              
              <ul className="flex flex-col gap-[20px] mb-[48px]">
                {["Responde en segundos", "Atiende fuera de horario", "Filtra consultas reales", "Sigue oportunidades automáticamente"].map((text, i) => (
                  <li key={i} className="flex items-start gap-[16px] text-[16px] text-white/90" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <div className="mt-[2px] shrink-0 bg-[#00D4AA]/10 rounded-full p-[4px] border border-[#00D4AA]/20">
                      <Check className="w-4 h-4 text-[#00D4AA]" strokeWidth={3} />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-[32px] border-t border-[#00D4AA]/10">
                <span className="text-[14px] text-[#00D4AA]/70 block mb-[8px] uppercase tracking-wider font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Implementación
                </span>
                <div className="text-[40px] font-[800] text-white leading-none mb-[12px]" style={{ fontFamily: 'Saira, sans-serif', letterSpacing: '-0.02em' }}>
                  USD 997
                </div>
                <p className="text-[13px] text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Precio lanzamiento por implementación personalizada.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Remate inferior */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-[16px] md:text-[18px] text-white/60 max-w-[800px] mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            No se trata de reemplazar a tu equipo. <br className="md:hidden" />
            <strong className="text-white font-medium">Se trata de que ninguna oportunidad llegue fría, tarde o perdida.</strong>
          </p>
        </motion.div>

      </div>
    </section>
  );
};
