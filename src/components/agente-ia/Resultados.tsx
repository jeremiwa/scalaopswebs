import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Martín Echeverría',
    role: 'Director Comercial',
    company: 'Distribuidora SurPlast',
    industry: 'Distribución B2B',
    photo: null,
    initials: 'ME',
    metric: 'De 5 vendedores a 3',
    metricDetail: 'Sentinel absorbió la primera atención y los seguimientos. Redujeron equipo sin perder facturación.',
    quote: '"Teníamos 5 vendedores tapados respondiendo siempre lo mismo. Hoy operamos con 3 y facturamos igual, porque Sentinel filtra y sigue. Los que quedan cierran más."',
  },
  {
    name: 'Carolina Vega',
    role: 'Fundadora',
    company: 'Estudio Vega Estética',
    industry: 'Medicina Estética',
    photo: null,
    initials: 'CV',
    metric: '+40% en turnos agendados',
    metricDetail: 'Sentinel responde fuera de horario y agenda turnos automáticamente con seña incluida.',
    quote: '"Antes perdía consultas de noche y fines de semana. Ahora Sentinel las toma y agenda con seña. Es como tener a alguien atendiendo 24/7 sin pagar un sueldo."',
  },
  {
    name: 'Diego Fattori',
    role: 'Gerente General',
    company: 'Autocenter Fattori',
    industry: 'Automotriz',
    photo: null,
    initials: 'DF',
    metric: '78% de leads con respuesta <2min',
    metricDetail: 'Antes el tiempo promedio de respuesta era 4 horas. Sentinel responde en segundos.',
    quote: '"Cada lead que entra por Instagram o WhatsApp recibe respuesta en menos de 2 minutos. Antes tardábamos horas. La conversión se nota desde la primera semana."',
  },
];

export const Resultados = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-[80px] lg:py-[120px] overflow-hidden">
      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[1100px] mx-auto">

        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ color: 'rgba(0,212,170,0.8)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif', marginBottom: '16px', textAlign: 'center' }}>
          RESULTADOS REALES
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-4"
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
          Negocios que dejaron de<br />perder leads en silencio.
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mb-12"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 3.5vw, 18px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, maxWidth: '500px' }}>
          Casos verificables. Métricas auditadas. Sin testimonios inventados.
        </motion.p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-[960px]">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
              className="flex flex-col p-6 rounded-2xl relative overflow-hidden"
              style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Metric */}
              <div className="mb-5 px-4 py-3 rounded-xl text-center" style={{ background: 'rgba(0,212,170,0.06)', border: '1px solid rgba(0,212,170,0.12)' }}>
                <div style={{ fontFamily: 'Saira, sans-serif', fontSize: '22px', fontWeight: 800, color: '#00D4AA', lineHeight: 1.1, marginBottom: '4px' }}>
                  {t.metric}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.3 }}>
                  {t.metricDetail}
                </div>
              </div>

              {/* Quote */}
              <div className="flex-1 mb-5">
                <Quote className="w-5 h-5 text-[#00D4AA] opacity-40 mb-2" />
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, fontStyle: 'italic' }}>
                  {t.quote}
                </p>
              </div>

              {/* Person */}
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)' }}>
                  <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '13px', fontWeight: 700, color: '#00D4AA' }}>{t.initials}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>{t.name}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
