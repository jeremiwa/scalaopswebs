import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { X, Check } from 'lucide-react';

const botItems = [
  '"Hola, presioná 1 para precios, 2 para horarios..."',
  'Responde lo mismo a todos los clientes',
  'Si la pregunta no está en el menú, se traba',
  'No detecta intención de compra',
  'No hace seguimiento si el cliente no vuelve',
  'Suena robótico desde el primer mensaje',
];

const sentinelItems = [
  'Conversa como un vendedor humano entrenado',
  'Adapta respuesta a cada cliente y contexto',
  'Detecta intención de compra y prioriza el cierre',
  'Persigue oportunidades en automático 1, 3 y 7 días',
  'Suena natural, con tu tono de marca',
  'Integra acciones reales (pago, agenda, envío)',
];

export const BotVsSentinel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-[80px] lg:py-[120px] overflow-hidden">
      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[1100px] mx-auto">

        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ color: 'rgba(0,212,170,0.8)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif', marginBottom: '16px', textAlign: 'center' }}>
          POR QUÉ ESTO ES DISTINTO
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-4"
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(30px, 7vw, 56px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
          Un bot responde.<br /><span style={{ color: '#00D4AA' }}>Sentinel vende.</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mb-12"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 3.5vw, 18px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: '560px' }}>
          Ya intentaste con bots de menú y diluviaste leads. Sentinel funciona con un modelo de IA real, entrenado con tu negocio.
        </motion.p>

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[800px]">
          {/* Bot Común */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col p-6 rounded-2xl"
            style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.08)', borderLeft: '3px solid rgba(255,77,109,0.4)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,77,109,0.08)', border: '1px solid rgba(255,77,109,0.2)' }}>
                <X className="w-5 h-5 text-[#FF4D6D]" />
              </div>
              <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '15px', fontWeight: 700, color: '#FF4D6D', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Bot común</span>
            </div>
            <div className="flex flex-col gap-3">
              {botItems.map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                  className="flex items-start gap-3">
                  <div className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full mt-0.5" style={{ background: 'rgba(255,77,109,0.1)' }}>
                    <X className="w-3 h-3 text-[#FF4D6D]" />
                  </div>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', fontWeight: 500, lineHeight: 1.4 }}>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sentinel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col p-6 rounded-2xl relative overflow-hidden"
            style={{ background: '#0A0A0A', border: '1px solid rgba(0,212,170,0.2)', borderLeft: '3px solid rgba(0,212,170,0.5)' }}
          >
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#00D4AA] opacity-[0.04] blur-[60px] pointer-events-none rounded-full" />
            <div className="flex items-center gap-3 mb-5 relative z-10">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.25)' }}>
                <Check className="w-5 h-5 text-[#00D4AA]" />
              </div>
              <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '15px', fontWeight: 700, color: '#00D4AA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sentinel</span>
            </div>
            <div className="flex flex-col gap-3 relative z-10">
              {sentinelItems.map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
                  className="flex items-start gap-3">
                  <div className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full mt-0.5" style={{ background: 'rgba(0,212,170,0.12)' }}>
                    <Check className="w-3.5 h-3.5 text-[#00D4AA]" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', fontWeight: 500, lineHeight: 1.4 }}>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
