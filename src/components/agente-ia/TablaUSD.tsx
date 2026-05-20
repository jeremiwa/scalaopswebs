import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

const rows = [
  { concept: 'Sueldo neto mensual', human: 'USD 800–1.200', sentinel: 'Implementación única: USD 997' },
  { concept: 'Cargas sociales', human: '+50% del bruto', sentinel: 'Sin cargas: USD 0' },
  { concept: 'Aguinaldo', human: '+1 sueldo / año', sentinel: 'Sin aguinaldo' },
  { concept: 'Vacaciones pagas', human: '14 días / año', sentinel: 'Opera 365 días' },
  { concept: 'ART + obra social', human: '~USD 80/mes', sentinel: 'Sin obligaciones' },
  { concept: 'Indemnización', human: '~1 mes por año', sentinel: 'Sin indemnización' },
  { concept: 'Capacitación', human: '1-3 meses por rotación', sentinel: 'Una vez, queda tuyo' },
  { concept: 'Productividad', human: '8hs / 1 chat / 22 días', sentinel: '24/7 · 50+ chats · 365 días' },
  { concept: 'Riesgo rotación', human: 'Alto (se va con tus contactos)', sentinel: 'Cero (la base queda tuya)' },
];

const useCountUp = (end: number, duration: number, trigger: boolean) => {
  const [val, setVal] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(Math.floor(end * ease));
      if (p < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [end, duration, trigger]);

  return val;
};

export const TablaUSD = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const humanTotal = useCountUp(25000, 1200, isInView);
  const sentinelTotal = useCountUp(1585, 1200, isInView);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-[80px] lg:py-[120px] overflow-hidden">
      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[1100px] mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{ color: 'rgba(0,212,170,0.8)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif', marginBottom: '16px', textAlign: 'center' }}
        >
          LA CUENTA QUE NADIE QUIERE HACER
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-4"
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(30px, 7vw, 56px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}
        >
          Lo que cuesta un vendedor<br />vs lo que cuesta <span style={{ color: '#00D4AA' }}>Sentinel</span>.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mb-12"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 3.5vw, 18px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: '560px' }}
        >
          Cifras en USD, redondeadas al alza para ser justos con el escenario humano. El primer año habla por sí solo.
        </motion.p>

        {/* TABLE — Desktop */}
        <div className="hidden md:block w-full max-w-[800px] mb-10">
          <div className="grid grid-cols-3 gap-0 mb-2">
            <div />
            <div className="text-center py-3 px-4 rounded-t-xl" style={{ background: 'rgba(255,77,109,0.06)', borderLeft: '2px solid #FF4D6D' }}>
              <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '14px', fontWeight: 700, color: '#FF4D6D', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Vendedor Humano</span>
            </div>
            <div className="text-center py-3 px-4 rounded-t-xl" style={{ background: 'rgba(0,212,170,0.06)', borderLeft: '2px solid #00D4AA' }}>
              <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '14px', fontWeight: 700, color: '#00D4AA', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sentinel</span>
            </div>
          </div>
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
              className="grid grid-cols-3 gap-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="py-4 px-4 flex items-center">
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>{row.concept}</span>
              </div>
              <div className="py-4 px-4 flex items-center" style={{ borderLeft: '2px solid rgba(255,77,109,0.15)' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.6)' }}>{row.human}</span>
              </div>
              <div className="py-4 px-4 flex items-center" style={{ borderLeft: '2px solid rgba(0,212,170,0.15)' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{row.sentinel}</span>
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="grid grid-cols-3 gap-0 mt-2"
          >
            <div className="py-6 px-4 flex items-center">
              <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '16px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Año 1</span>
            </div>
            <div className="py-6 px-4 flex items-center justify-center rounded-bl-xl" style={{ background: 'rgba(255,77,109,0.08)', borderLeft: '2px solid #FF4D6D' }}>
              <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '36px', fontWeight: 800, color: '#FF4D6D' }}>USD {humanTotal.toLocaleString('en-US')}</span>
            </div>
            <div className="py-6 px-4 flex items-center justify-center rounded-br-xl" style={{ background: 'rgba(0,212,170,0.08)', borderLeft: '2px solid #00D4AA' }}>
              <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '36px', fontWeight: 800, color: '#00D4AA' }}>USD {sentinelTotal.toLocaleString('en-US')}</span>
            </div>
          </motion.div>
        </div>

        {/* TABLE — Mobile (cards) */}
        <div className="md:hidden w-full flex flex-col gap-3 mb-10">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{row.concept}</span>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-3" style={{ borderRight: '1px solid rgba(255,255,255,0.06)', borderLeft: '2px solid rgba(255,77,109,0.3)' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#FF4D6D', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Humano</div>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{row.human}</span>
                </div>
                <div className="px-4 py-3" style={{ borderLeft: '2px solid rgba(0,212,170,0.3)' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#00D4AA', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Sentinel</div>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{row.sentinel}</span>
                </div>
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <div className="px-4 py-3 text-center" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '14px', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Año 1</span>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-5 flex flex-col items-center" style={{ borderRight: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,77,109,0.06)' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#FF4D6D', textTransform: 'uppercase', marginBottom: '4px' }}>Humano</div>
                <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '28px', fontWeight: 800, color: '#FF4D6D' }}>USD {humanTotal.toLocaleString('en-US')}</span>
              </div>
              <div className="px-4 py-5 flex flex-col items-center" style={{ background: 'rgba(0,212,170,0.06)' }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#00D4AA', textTransform: 'uppercase', marginBottom: '4px' }}>Sentinel</div>
                <span style={{ fontFamily: 'Saira, sans-serif', fontSize: '28px', fontWeight: 800, color: '#00D4AA' }}>USD {sentinelTotal.toLocaleString('en-US')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Savings Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="w-full max-w-[700px] relative rounded-2xl savings-box-glow"
          style={{ background: '#0A0A0A' }}
        >
          <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ padding: '1px', background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
          <div className="py-8 px-6 w-full text-center">
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Año 1: ahorrás entre</p>
            <h3 style={{ fontFamily: 'Saira, sans-serif', fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: 800, color: '#00D4AA', marginBottom: '8px' }}>USD 16.000 y USD 23.000</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.6)' }}>
              Y Sentinel sigue trabajando el año 2 con solo <span style={{ color: '#00D4AA', fontWeight: 700 }}>USD 588</span> de mantenimiento.
            </p>
          </div>
        </motion.div>

        <p className="text-center mt-6 mb-6" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)', maxWidth: '500px' }}>
          Estimaciones orientativas en base a costos promedio de PYMEs B2B en LATAM. Tu caso puede variar.
        </p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 1.8 }}>
          <Link to={CTA_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '56px', padding: '0 32px', borderRadius: '999px', background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '16px', color: '#020403', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,212,170,0.15)' }}>
            Reservar diagnóstico →
          </Link>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes savingsGlow { 0%, 100% { box-shadow: 0 0 20px rgba(0,212,170,0.15); } 50% { box-shadow: 0 0 40px rgba(0,212,170,0.3); } }
        .savings-box-glow { animation: savingsGlow 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .savings-box-glow { animation: none; } }
      `}} />
    </section>
  );
};
