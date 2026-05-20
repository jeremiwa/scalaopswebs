import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

const includes = [
  'Diagnóstico comercial inicial',
  'Configuración técnica completa',
  'Entrenamiento con tu información',
  'Diseño del flujo de venta y seguimiento',
  'Pruebas y puesta en marcha en WhatsApp/IG',
  '30 días de garantía total',
];

const bonos = [
  'Mapa de oportunidades perdidas actuales',
  'Guion comercial base optimizado',
  'Ajuste de tono para que no suene robótico',
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

export const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const priceVal = useCountUp(997, 1500, isInView);

  return (
    <section id="sentinel-pricing" ref={sectionRef} className="relative w-full bg-[#000000] py-[80px] lg:py-[120px] overflow-hidden">
      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[600px] mx-auto">

        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ color: 'rgba(0,212,170,0.8)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif', marginBottom: '16px', textAlign: 'center' }}>
          PRECIO LANZAMIENTO
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-4"
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
          Implementá tu Empleado IA<br />por <span style={{ color: '#00D4AA' }}>USD 997</span>.
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mb-10"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
          Precio lanzamiento por tiempo limitado. Después sube a USD 1.500.
        </motion.p>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full rounded-[28px] relative overflow-hidden pricing-card-glow"
          style={{ background: '#0A0A0A' }}
        >
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-[28px] pointer-events-none" style={{ padding: '1px', background: 'linear-gradient(135deg, #0066FF 0%, #00D4AA 100%)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />

          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#00D4AA] opacity-[0.05] blur-[80px] pointer-events-none rounded-full" />

          <div className="relative z-10 p-6 md:p-8 flex flex-col items-center">
            {/* Badge */}
            <div className="mb-6 px-5 py-2 rounded-full cupos-badge"
              style={{ background: '#050505', border: '1px solid rgba(0,212,170,0.25)' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                PRECIO LANZAMIENTO · <span style={{ color: '#00D4AA' }}>QUEDAN 3 CUPOS</span>
              </span>
            </div>

            {/* Price */}
            <div className="mb-3" style={{ fontFamily: 'Saira, sans-serif', fontSize: 'clamp(56px, 14vw, 96px)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.04em' }}>
              USD {priceVal}
            </div>
            <p className="mb-8" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
              Implementación única personalizada
            </p>

            <div className="w-full h-[1px] bg-white/[0.06] mb-6" />

            {/* Includes */}
            <div className="w-full mb-6">
              <h4 className="mb-4" style={{ fontFamily: 'Saira, sans-serif', fontSize: '14px', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Incluye:</h4>
              <div className="flex flex-col gap-3">
                {includes.map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(0,212,170,0.12)' }}>
                      <Check className="w-3.5 h-3.5 text-[#00D4AA]" strokeWidth={3} />
                    </div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.8)', fontWeight: 500, lineHeight: 1.3 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/[0.06] mb-6" />

            {/* Bonos */}
            <div className="w-full rounded-xl p-5 mb-6" style={{ background: '#050505', border: '1px dashed rgba(255,255,255,0.08)' }}>
              <h4 className="mb-3" style={{ fontFamily: 'Saira, sans-serif', fontSize: '14px', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Bonos incluidos:</h4>
              <div className="flex flex-col gap-3">
                {bonos.map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Plus className="w-4 h-4 text-[#00D4AA] shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, lineHeight: 1.3 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/[0.06] mb-6" />

            {/* Maintenance */}
            <div className="text-center mb-6">
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                Mantenimiento mensual: desde <span style={{ color: '#00D4AA', fontWeight: 700 }}>USD 49</span>
              </span>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>
                Incluye actualizaciones, monitoreo y soporte
              </p>
            </div>

            <div className="w-full h-[1px] bg-white/[0.06] mb-6" />

            {/* CTA */}
            <Link to={CTA_URL} target="_blank" rel="noopener noreferrer" className="w-full"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderRadius: '999px', background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '16px', color: '#020403', textDecoration: 'none', boxShadow: '0 4px 24px rgba(0,212,170,0.2)', marginBottom: '12px' }}>
              Reservar implementación →
            </Link>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 1.4, maxWidth: '400px' }}>
              Costos externos de herramientas (WhatsApp Business API, modelo IA) se informan transparente antes de avanzar.
            </p>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pricingGlow { 0%, 100% { box-shadow: 0 0 30px rgba(0,212,170,0.1); } 50% { box-shadow: 0 0 60px rgba(0,212,170,0.2); } }
        .pricing-card-glow { animation: pricingGlow 4s ease-in-out infinite; }
        @keyframes cuposPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .cupos-badge span span { animation: cuposPulse 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pricing-card-glow { animation: none; } .cupos-badge span span { animation: none; } }
      `}} />
    </section>
  );
};
