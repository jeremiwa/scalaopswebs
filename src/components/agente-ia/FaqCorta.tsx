import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "¿Sentinel reemplaza vendedores?",
    a: "No. Automatiza primera atención, filtro y seguimiento para que tu equipo trabaje mejores oportunidades."
  },
  {
    q: "¿Puede vender solo?",
    a: "Puede responder, recomendar, enviar links, agendar o avanzar oportunidades según tu proceso comercial."
  },
  {
    q: "¿Va a sonar robótico?",
    a: "No. Se entrena con tu información, tono, reglas comerciales y respuestas reales."
  },
  {
    q: "¿Hay costos mensuales?",
    a: "Si hay herramientas, mantenimiento o consumo externo, se informa antes de avanzar."
  }
];

export const FaqCorta = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="w-full bg-[#000000] py-[48px] md:py-[80px] flex flex-col items-center">
      <div className="container-custom px-[20px] w-full max-w-[600px] mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-[40px]"
        >
          <h2 className="text-[clamp(28px,6vw,36px)] font-[800] text-white leading-[1.1] tracking-tight" style={{ fontFamily: 'Saira, sans-serif' }}>
            Preguntas frecuentes
          </h2>
        </motion.div>

        <div className="flex flex-col gap-[12px]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="w-full border border-white/10 rounded-[12px] bg-[#050807] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-[20px] text-left"
                >
                  <span className="text-[16px] font-bold text-white/90" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#00D4AA] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-[20px] pb-[20px] pt-0">
                        <p className="text-[14px] text-white/60 leading-[1.5]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
