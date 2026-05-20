import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X } from 'lucide-react';

const yesItems = [
  'Recibís 10+ consultas comerciales por día',
  'Tu equipo tarda en responder o se satura',
  'Querés escalar ventas sin sumar estructura humana',
  'Necesitás seguimiento automático y consistente',
  'Vendés algo con un proceso comercial claro',
];

const noItems = [
  'Recibís menos de 5 consultas por semana',
  'Buscás un bot barato de menú "1-2-3"',
  'No tenés una oferta o precio definido',
  'Tu producto requiere demo presencial obligatoria',
  'No querés ordenar tu proceso comercial',
];

export const ForWho = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-[80px] lg:py-[120px] overflow-hidden">
      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[900px] mx-auto">

        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ color: 'rgba(0,212,170,0.8)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif', marginBottom: '16px', textAlign: 'center' }}>
          SINCERIDAD
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-4"
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
          Sentinel no es para<br />cualquier negocio.
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mb-12"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 3.5vw, 17px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, maxWidth: '480px' }}>
          Preferimos decirte ahora que no encajamos antes de hacerte perder tiempo.
        </motion.p>

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {/* Yes */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col p-6 rounded-2xl"
            style={{ background: '#0A0A0A', border: '1px solid rgba(0,212,170,0.15)', borderLeft: '3px solid #00D4AA' }}
          >
            <h3 className="mb-5" style={{ fontFamily: 'Saira, sans-serif', fontSize: '18px', fontWeight: 700, color: '#00D4AA' }}>Es para vos si...</h3>
            <div className="flex flex-col gap-4">
              {yesItems.map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                  className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(0,212,170,0.12)' }}>
                    <Check className="w-4 h-4 text-[#00D4AA]" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', fontWeight: 500, lineHeight: 1.4, fontFamily: 'Inter, sans-serif' }}>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* No */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col p-6 rounded-2xl"
            style={{ background: '#0A0A0A', border: '1px solid rgba(255,77,109,0.12)', borderLeft: '3px solid rgba(255,77,109,0.4)' }}
          >
            <h3 className="mb-5" style={{ fontFamily: 'Saira, sans-serif', fontSize: '18px', fontWeight: 700, color: '#FF4D6D' }}>No es para vos si...</h3>
            <div className="flex flex-col gap-4">
              {noItems.map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }}
                  className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(255,77,109,0.08)' }}>
                    <X className="w-4 h-4 text-[#FF4D6D]" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, lineHeight: 1.4, fontFamily: 'Inter, sans-serif' }}>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cierre */}
        <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 1.2 }}
          className="text-center mt-10"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, maxWidth: '520px' }}>
          Si entrás en el primer grupo, hablamos. Si entrás en el segundo, gracias por haber leído hasta acá.
        </motion.p>
      </div>
    </section>
  );
};
