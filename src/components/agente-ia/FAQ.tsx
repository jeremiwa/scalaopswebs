import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: '¿Sentinel reemplaza a mis vendedores?',
    a: 'No. Automatiza la primera atención, el filtro y el seguimiento para que tu equipo trabaje mejores oportunidades.'
  },
  {
    q: '¿Puede vender solo?',
    a: 'Puede responder, recomendar, enviar links, agendar o avanzar oportunidades según el proceso de tu negocio.'
  },
  {
    q: '¿Va a sonar robótico?',
    a: 'No. Se entrena con tu información, tono, reglas comerciales y respuestas reales.'
  },
  {
    q: '¿Funciona para mi rubro?',
    a: 'Funciona mejor si recibís consultas por WhatsApp o Instagram y necesitás responder, filtrar o seguir clientes.'
  },
  {
    q: '¿Cuánto tarda?',
    a: 'La primera versión puede quedar lista en pocos días, según la información disponible.'
  },
  {
    q: '¿Hay costos mensuales?',
    a: 'Si hay herramientas, mantenimiento o consumo externo, se informa antes de avanzar.'
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative" style={{ background: '#030504', padding: '72px 0' }}>
      <div className="container-custom relative z-10 flex flex-col px-[24px] md:px-0 max-w-[600px] mx-auto">
        
        <div className="text-center mb-8 reveal">
          <h2 style={{ 
            fontSize: 'clamp(28px, 7vw, 40px)', 
            fontWeight: 800, 
            color: '#F5F7FA', 
            letterSpacing: '-0.02em', 
            lineHeight: 1.1 
          }}>
            Preguntas frecuentes
          </h2>
        </div>

        <div className="flex flex-col gap-3 reveal-stagger">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className="reveal flex flex-col rounded-[16px] overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen ? '#080C0B' : '#050706',
                  border: isOpen ? '1px solid rgba(105, 235, 170, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full p-5 text-left focus:outline-none"
                >
                  <span style={{ fontSize: '16px', fontWeight: 600, color: isOpen ? '#68E6A3' : '#F5F7FA', pr: '16px' }}>
                    {faq.q}
                  </span>
                  <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full ml-3" style={{ background: isOpen ? 'rgba(105, 235, 170, 0.15)' : 'rgba(255, 255, 255, 0.05)' }}>
                    {isOpen ? <Minus className="w-3.5 h-3.5 text-[#68E6A3]" /> : <Plus className="w-3.5 h-3.5 text-[#9EA0B4]" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-0">
                        <p style={{ fontSize: '15px', color: '#9EA0B4', lineHeight: 1.45, margin: 0 }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
