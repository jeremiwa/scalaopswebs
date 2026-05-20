import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const PruebaSocialCorta = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="w-full bg-[#000000] py-[64px] md:py-[100px] flex flex-col items-center">
      <div className="container-custom px-0 md:px-[20px] w-full max-w-[1000px] mx-auto overflow-hidden">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-[40px] px-[20px]"
        >
          <h2 className="text-[clamp(28px,6vw,44px)] font-[800] text-white leading-[1.1] tracking-tight mb-[16px]" style={{ fontFamily: 'Saira, sans-serif' }}>
            Resultados reales, menos seguimiento manual.
          </h2>
          <p className="text-[clamp(15px,3.5vw,18px)] text-white/70 leading-[1.4]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Negocios que ordenaron la primera atención con IA.
          </p>
        </motion.div>

        {/* Carrusel Mobile / Grid Desktop */}
        <div className="flex md:grid md:grid-cols-2 gap-[16px] px-[20px] pb-[20px] overflow-x-auto md:overflow-visible snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          
          {[
            {
              badge: "De 5 vendedores a 3",
              text: "Sentinel absorbió la primera atención y los seguimientos. El equipo empezó a trabajar solo oportunidades reales.",
              name: "Martín R.",
              role: "Director Comercial",
              company: "Empresa B2B"
            },
            {
              badge: "Más turnos agendados",
              text: "Sentinel respondió fuera de horario y avanzó consultas automáticamente con menos intervención humana.",
              name: "Sofía V.",
              role: "CEO",
              company: "Centro de Estética"
            }
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="flex-shrink-0 w-[85%] sm:w-[400px] md:w-full snap-center bg-[#080C0B] p-[32px] rounded-[24px] border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="inline-block bg-[#00D4AA]/10 text-[#00D4AA] text-[13px] font-bold px-[12px] py-[6px] rounded-full mb-[24px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {t.badge}
                </div>
                <p className="text-[17px] text-white/90 leading-[1.5] mb-[32px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  "{t.text}"
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{t.name}</span>
                <span className="text-[13px] text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>{t.role} · {t.company}</span>
              </div>
            </motion.div>
          ))}
          
        </div>

      </div>
    </section>
  );
};
