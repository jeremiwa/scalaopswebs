import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCountdown } from '../../hooks/useCountdown';

const CTA_URL = '/formulario';
const pad = (n: number) => String(n).padStart(2, '0');

/** Countdown digit box — matches urgency bar style */
const Digit = ({ value, label }: { value: string; label: string }) => (
  <span style={{
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  }}>
    <span style={{
      fontFamily: 'Saira, sans-serif',
      fontWeight: 800,
      fontSize: '16px',
      lineHeight: 1,
      color: '#FFFFFF',
      background: '#111',
      border: '1px solid rgba(107,221,161,0.25)',
      borderRadius: '5px',
      padding: '4px 6px',
      minWidth: '32px',
      textAlign: 'center',
      letterSpacing: '0.02em',
    }}>
      {value}
    </span>
    <span style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: '9px',
      fontWeight: 600,
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    }}>
      {label}
    </span>
  </span>
);

const Separator = () => (
  <span style={{
    fontFamily: 'Saira, sans-serif',
    fontWeight: 800,
    fontSize: '16px',
    color: 'rgba(255,255,255,0.3)',
    margin: '0 2px',
    alignSelf: 'flex-start',
    paddingTop: '4px',
  }}>:</span>
);

export const OfertaSimple = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <section id="pricing" ref={ref} className="w-full bg-[#000000] py-[48px] md:py-[80px] flex flex-col items-center relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00D4AA]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom px-[20px] w-full max-w-[600px] mx-auto relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-[40px]"
        >
          <h2 className="text-[clamp(28px,6vw,44px)] font-[800] text-white leading-[1.1] tracking-tight mb-[16px]" style={{ fontFamily: 'Saira, sans-serif' }}>
            Implementá Sentinel por precio lanzamiento.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full bg-[#050807] border border-[#00D4AA]/20 rounded-[24px] p-[32px] md:p-[48px] shadow-[0_0_40px_rgba(0,212,170,0.05)] relative overflow-hidden"
        >
          {/* a) Badge superior con countdown */}
          <div className="flex flex-col items-center text-center mb-[32px]">
            <div
              className="bg-[#00D4AA]/10 text-[#00D4AA] text-[11px] md:text-[12px] font-bold px-[12px] py-[6px] rounded-full mb-[16px] uppercase tracking-widest flex items-center gap-[8px] flex-wrap justify-center"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span>🔥 OFERTA DE LANZAMIENTO — TERMINA EN:</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px', justifyContent: 'center' }}>
              <Digit value={pad(days)} label="días" />
              <Separator />
              <Digit value={pad(hours)} label="hs" />
              <Separator />
              <Digit value={pad(minutes)} label="min" />
              <Separator />
              <Digit value={pad(seconds)} label="seg" />
            </div>
          </div>

          {/* b) Implementación tachada */}
          <div className="text-center mb-[24px] pb-[24px] border-b border-white/5">
            <p className="text-[16px] md:text-[18px] mb-[6px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Implementación: </span>
              <span style={{ color: '#666', textDecoration: 'line-through', fontWeight: 500 }}>USD 997</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', margin: '0 8px' }}>→</span>
              <span style={{ color: '#6bdda1', fontWeight: 800, fontSize: '120%' }}>USD 0</span>
            </p>
            <p className="text-[12px] text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>
              Bonificada solo durante el lanzamiento.
            </p>
          </div>

          {/* c) Precio principal */}
          <div className="flex flex-col items-center text-center border-b border-white/5 pb-[32px] mb-[32px]">
            <div className="text-[56px] md:text-[64px] font-[800] text-white leading-[1] mb-[8px]" style={{ fontFamily: 'Saira, sans-serif', letterSpacing: '-0.03em' }}>
              USD 350<span className="text-[28px] md:text-[32px] text-white/70">/mes</span>
            </div>
            <p className="text-[16px] text-white/70 mb-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Tu Empleado IA trabajando todos los días, todo el día.
            </p>
            <p className="text-[13px] text-white/40 max-w-[420px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Un vendedor cuesta USD 1.500/mes y trabaja 8 horas. Sentinel cuesta USD 350 y trabaja 24.
            </p>
          </div>

          {/* d) Bloque 1 — Implementación incluida */}
          <div className="mb-[24px]">
            <h4 className="text-[14px] font-bold text-[#6bdda1] mb-[16px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Tu implementación incluida (valor USD 997):
            </h4>
            <ul className="flex flex-col gap-[12px]">
              {[
                "Diagnóstico inicial",
                "Configuración y entrenamiento con tu información",
                "Flujo de venta y seguimiento",
                "Puesta en marcha en 7 días"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-[12px] text-[15px] text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <CheckCircle2 className="w-5 h-5 text-[#00D4AA] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* e) Bonos incluidos — within Bloque 1 */}
          <div className="bg-[#111816] border border-white/5 rounded-[12px] p-[20px] mb-[24px]">
            <div className="flex items-center gap-[8px] mb-[12px]">
              <Gift className="w-4 h-4 text-[#FF4D6D]" />
              <h4 className="text-[14px] font-bold text-[#FF4D6D] uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>Bonos incluidos</h4>
            </div>
            <ul className="flex flex-col gap-[8px]">
              <li className="flex items-start gap-[8px] text-[14px] text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-[#FF4D6D] mt-[2px]">•</span> Mapa de oportunidades perdidas
              </li>
              <li className="flex items-start gap-[8px] text-[14px] text-white/70" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-[#FF4D6D] mt-[2px]">•</span> Ajuste de tono para que no suene robótico
              </li>
            </ul>
          </div>

          {/* d) Bloque 2 — Todos los meses */}
          <div className="mb-[32px]">
            <h4 className="text-[14px] font-bold text-white mb-[16px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Y todos los meses:
            </h4>
            <ul className="flex flex-col gap-[12px]">
              {[
                "Mejoras continuas del agente",
                "Monitoreo de conversaciones",
                "Ajustes de tono y respuestas",
                "Soporte directo"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-[12px] text-[15px] text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <CheckCircle2 className="w-5 h-5 text-[#00D4AA] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* f) CTA */}
          <Link
            to={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center h-[56px] rounded-[999px] mb-[16px] hover:scale-[0.98] transition-transform"
            style={{
              background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 800,
              fontSize: '17px',
              color: '#020403',
              boxShadow: '0 4px 16px rgba(0, 212, 170, 0.15)',
              textDecoration: 'none'
            }}
          >
            Implementar Sentinel
          </Link>

          {/* g) Micro-copy bajo CTA */}
          <p className="text-[12px] text-white/40 text-center mb-[24px]" style={{ fontFamily: 'Inter, sans-serif' }}>
            USD 350/mes · Sin costos ocultos · Garantía de 30 días
          </p>

          {/* h) Guarantee */}
          <div className="flex items-center justify-center gap-[8px] pt-[24px] border-t border-white/5">
            <ShieldCheck className="w-5 h-5 text-white/50" />
            <span className="text-[13px] font-medium text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
              Garantía de implementación 30 días
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
