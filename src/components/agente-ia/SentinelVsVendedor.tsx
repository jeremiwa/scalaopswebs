import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserMinus, Check, Zap } from 'lucide-react';

export const SentinelVsVendedor = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="w-full bg-[#000000] py-[64px] md:py-[100px] flex flex-col items-center">
      <div className="container-custom px-[20px] w-full max-w-[800px] mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-[40px]"
        >
          <h2 className="text-[clamp(28px,6vw,44px)] font-[800] text-white leading-[1.1] tracking-tight mb-[16px]" style={{ fontFamily: 'Saira, sans-serif' }}>
            Antes de sumar otro sueldo, automatizá el primer contacto.
          </h2>
          <p className="text-[clamp(15px,3.5vw,18px)] text-white/70 leading-[1.4]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Sentinel cubre atención, filtro y seguimiento sin sumar estructura fija.
          </p>
        </motion.div>

        {/* Card Única */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full rounded-[24px] overflow-hidden bg-[#080C0B] border border-white/10"
        >
          <div className="flex flex-col md:flex-row">
            
            {/* Vendedor Humano */}
            <div className="flex-1 p-[32px] md:p-[40px] border-b md:border-b-0 md:border-r border-white/5">
              <div className="flex items-center gap-[12px] mb-[24px]">
                <div className="w-[40px] h-[40px] rounded-full bg-white/5 flex items-center justify-center">
                  <UserMinus className="w-5 h-5 text-white/50" />
                </div>
                <h3 className="text-[18px] font-bold text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Contratar otro vendedor
                </h3>
              </div>
              <ul className="flex flex-col gap-[16px]">
                {["Sueldo mensual", "Horarios limitados", "Capacitación", "Rotación", "Seguimientos olvidados"].map((b, i) => (
                  <li key={i} className="flex items-start gap-[12px] text-[16px] text-white/60">
                    <span className="text-white/30 shrink-0 mt-[2px]">—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sentinel */}
            <div className="flex-1 p-[32px] md:p-[40px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/5 to-transparent pointer-events-none" />
              <div className="flex items-center gap-[12px] mb-[24px] relative z-10">
                <div className="w-[40px] h-[40px] rounded-full bg-[#00D4AA]/10 flex items-center justify-center border border-[#00D4AA]/20">
                  <Zap className="w-5 h-5 text-[#00D4AA]" />
                </div>
                <h3 className="text-[18px] font-bold text-[#00D4AA]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Sentinel
                </h3>
              </div>
              <ul className="flex flex-col gap-[16px] relative z-10">
                {["Trabaja 24/7", "Responde en segundos", "Atiende múltiples chats", "Sigue automáticamente", "Setup desde USD 997"].map((b, i) => (
                  <li key={i} className="flex items-start gap-[12px] text-[16px] text-white">
                    <Check className="w-5 h-5 text-[#00D4AA] shrink-0 mt-[2px]" strokeWidth={2.5} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

          </div>
          
          {/* Footer phrase */}
          <div className="w-full bg-white/5 py-[20px] px-[24px] text-center border-t border-white/5">
            <p className="text-[15px] text-white/80 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Humanos para cerrar. Sentinel para que ninguna oportunidad quede tirada.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
