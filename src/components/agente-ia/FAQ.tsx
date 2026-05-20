import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: '¿Sentinel reemplaza a mis vendedores?', a: 'No. Sentinel se ocupa del primer contacto, el filtro y el seguimiento. Tus vendedores humanos cierran las oportunidades reales que Sentinel califica. Pasás de 5 vendedores tapados a 2 vendedores cerrando.' },
  { q: '¿Puede vender solo, sin intervención humana?', a: 'Sí, para procesos transaccionales claros (productos, turnos, reservas con seña, inscripciones). Para ventas consultivas complejas, Sentinel califica y agenda con tu equipo.' },
  { q: '¿Va a sonar robótico o como ChatGPT genérico?', a: 'No. Cada Sentinel se entrena con tu tono, tu vocabulario y tus expresiones. En el proceso de implementación incluimos el ajuste de tono específico para que suene a tu marca, no a un bot.' },
  { q: '¿Funciona para mi rubro?', a: 'Funciona en e-commerce, inmobiliaria, automotriz, cursos, servicios profesionales, medicina estética y similares. En el diagnóstico inicial confirmamos si es viable para tu caso específico antes de avanzar.' },
  { q: '¿Cuánto tarda la implementación?', a: '7 días hábiles desde que tenemos toda tu información. El proceso completo está detallado en la sección "El Proceso" de arriba.' },
  { q: '¿Hay costos mensuales además de los USD 997?', a: 'No, es un pago único. Dependiendo de las necesidades del cliente podemos agregar mantenimiento mensual aunque no es obligatorio (monitoreo, actualizaciones, soporte). También hay costos externos de herramientas (WhatsApp Business API, modelo de IA) que se informan transparente antes de avanzar.' },
  { q: '¿Qué pasa con mis datos y los de mis clientes?', a: 'Quedan en infraestructura que controlás vos. No usamos tus conversaciones para entrenar modelos públicos. Todo el flujo de datos es transparente y documentado.' },
  { q: '¿Y si mi competencia ya tiene algo así?', a: 'Probablemente no. Hoy menos del 5% de las PYMEs en LATAM tienen agentes de IA reales operando. Si tu competencia ya lo tiene, llegás tarde y necesitás moverte rápido. Si no, sos vos quien marca la diferencia.' },
  { q: '¿Puedo ver las conversaciones que tiene Sentinel?', a: 'Sí, todas. Acceso completo desde WhatsApp/Instagram como con cualquier vendedor humano. Además, dashboard de métricas mensuales.' },
  { q: '¿Y si necesito cancelar?', a: '30 días de garantía total: si no funciona, te devolvemos el 100% de la implementación. Después de los 30 días, el mantenimiento mensual lo cancelás cuando quieras, sin penalidad.' },
];

export const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-[80px] lg:py-[120px] overflow-hidden">
      <div className="container-custom relative z-10 flex flex-col px-[20px] max-w-[700px] mx-auto">

        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ color: 'rgba(0,212,170,0.8)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif', marginBottom: '16px', textAlign: 'center' }}>
          DUDAS FRECUENTES
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-10"
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
          Lo que todos preguntan<br />antes de avanzar.
        </motion.h2>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen ? '#0A0A0A' : '#050505',
                  border: isOpen ? '1px solid rgba(0,212,170,0.2)' : '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full p-5 text-left focus:outline-none focus:ring-1 focus:ring-[#00D4AA] rounded-2xl"
                  style={{ minHeight: '56px' }}
                >
                  <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '15px', fontWeight: 600, color: isOpen ? '#00D4AA' : '#FFFFFF', paddingRight: '12px', lineHeight: 1.3 }}>
                    {faq.q}
                  </span>
                  <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full ml-2"
                    style={{ background: isOpen ? 'rgba(0,212,170,0.12)' : 'rgba(255,255,255,0.05)', transition: 'all 0.3s' }}>
                    {isOpen
                      ? <Minus className="w-4 h-4 text-[#00D4AA]" />
                      : <Plus className="w-4 h-4 text-white/50" />
                    }
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="px-5 pb-5 pt-0">
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, margin: 0 }}>
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
