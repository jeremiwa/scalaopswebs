import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  { day: 'DÍA 1', title: 'Diagnóstico', desc: 'Llamada de 45min. Mapeamos tu proceso comercial actual, identificamos las fugas y definimos el alcance de Sentinel.' },
  { day: 'DÍAS 2-3', title: 'Entrenamiento', desc: 'Cargamos tu información: catálogo, precios, FAQs, políticas, tono de marca. Sentinel aprende tu negocio.' },
  { day: 'DÍAS 4-5', title: 'Pruebas', desc: 'Probamos Sentinel con escenarios reales. Ajustamos respuestas, refinamos tono, validamos cierres.' },
  { day: 'DÍAS 6-7', title: 'Activación', desc: 'Sentinel sale en vivo en tu WhatsApp/IG. Monitoreamos las primeras conversaciones reales con vos.' },
];

export const Proceso = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-[80px] lg:py-[120px] overflow-hidden">
      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[900px] mx-auto">

        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ color: 'rgba(0,212,170,0.8)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif', marginBottom: '16px', textAlign: 'center' }}>
          EL PROCESO
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-4"
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
          De cero a Sentinel<br />operativo en <span style={{ color: '#00D4AA' }}>7 días</span>.
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mb-12"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 3.5vw, 17px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
          Cuatro pasos. Sin sorpresas. Sin esperas eternas.
        </motion.p>

        {/* Timeline — Desktop horizontal */}
        <div className="hidden lg:flex items-start gap-0 w-full relative mb-12">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="absolute top-[30px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-[#0066FF] to-[#00D4AA] origin-left z-0"
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
              className="flex-1 flex flex-col items-center relative z-10 px-4"
            >
              <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center mb-4"
                style={{ background: '#0A0A0A', border: '2px solid #00D4AA', boxShadow: '0 0 15px rgba(0,212,170,0.15)' }}>
                <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '22px', fontWeight: 800, color: '#00D4AA' }}>{i + 1}</span>
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, color: '#00D4AA', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{step.day}</span>
              <h3 style={{ fontFamily: 'Saira, sans-serif', fontSize: '18px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px', textAlign: 'center' }}>{step.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.45, textAlign: 'center', maxWidth: '220px' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline — Mobile vertical */}
        <div className="lg:hidden flex flex-col w-full relative mb-10">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            className="absolute left-[23px] top-[30px] bottom-[30px] w-[2px] bg-gradient-to-b from-[#0066FF] to-[#00D4AA] origin-top z-0"
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
              className="flex items-start gap-5 relative z-10 mb-8 last:mb-0"
            >
              <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center shrink-0"
                style={{ background: '#0A0A0A', border: '2px solid #00D4AA', boxShadow: '0 0 12px rgba(0,212,170,0.1)' }}>
                <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '18px', fontWeight: 800, color: '#00D4AA' }}>{i + 1}</span>
              </div>
              <div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 700, color: '#00D4AA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{step.day}</span>
                <h3 style={{ fontFamily: 'Saira, sans-serif', fontSize: '17px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px', marginTop: '2px' }}>{step.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.45 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cierre */}
        <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 1.4 }}
          className="text-center"
          style={{ fontFamily: 'Saira, sans-serif', fontSize: 'clamp(17px, 4vw, 22px)', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
          Al día 8, Sentinel ya está vendiendo. Vos solo mirás los resultados.
        </motion.p>
      </div>
    </section>
  );
};
