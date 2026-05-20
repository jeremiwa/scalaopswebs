import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

export const Calculadora = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [consultas, setConsultas] = useState(30);
  const [ticket, setTicket] = useState(100);
  const [porcentaje, setPorcentaje] = useState(20);
  const [horas, setHoras] = useState(6);

  const [resultado, setResultado] = useState(0);
  const [recupero, setRecupero] = useState(0);
  const [roi, setRoi] = useState(0);
  const [payback, setPayback] = useState(0);

  useEffect(() => {
    const riesgo = Math.round(consultas * 30 * ticket * (porcentaje / 100));
    const rec = Math.round(riesgo * 0.35);
    const costoAnual = 1585;
    const roiCalc = rec > 0 ? Math.round(((rec * 12 - costoAnual) / costoAnual) * 100) : 0;
    const dailyRec = rec / 30;
    const paybackDays = dailyRec > 0 ? Math.ceil(997 / dailyRec) : 999;

    setResultado(riesgo);
    setRecupero(rec);
    setRoi(roiCalc);
    setPayback(paybackDays);
  }, [consultas, ticket, porcentaje, horas]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-[80px] lg:py-[120px] overflow-hidden">
      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[600px] mx-auto">

        <motion.div initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ color: 'rgba(0,212,170,0.8)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif', marginBottom: '16px', textAlign: 'center' }}>
          TU CÁLCULO
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-4"
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
          ¿Cuánto te cuesta hoy<br />no tener Sentinel?
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mb-10"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
          Movele los inputs según tu negocio. La cuenta es tuya.
        </motion.p>

        {/* Calculator Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full rounded-2xl p-6 relative"
          style={{ background: '#0A0A0A', border: '1px solid rgba(0,212,170,0.15)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>

          <div className="flex flex-col gap-5">
            {/* Input 1 */}
            <div className="flex flex-col">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
                Consultas por día
              </label>
              <input type="number" value={consultas} onChange={(e) => setConsultas(Math.max(0, Number(e.target.value)))}
                className="w-full bg-[#050505] text-white font-bold text-[22px] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00D4AA]"
                style={{ border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Saira, sans-serif' }} />
            </div>

            {/* Input 2 */}
            <div className="flex flex-col">
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
                Ticket promedio (USD)
              </label>
              <input type="number" value={ticket} onChange={(e) => setTicket(Math.max(0, Number(e.target.value)))}
                className="w-full bg-[#050505] text-white font-bold text-[22px] px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#00D4AA]"
                style={{ border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'Saira, sans-serif' }} />
            </div>

            {/* Slider 1 */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>
                  % Sin respuesta / seguimiento
                </label>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#00D4AA', fontFamily: 'Saira, sans-serif' }}>{porcentaje}%</span>
              </div>
              <input type="range" min="0" max="80" value={porcentaje} onChange={(e) => setPorcentaje(Number(e.target.value))} className="w-full accent-[#00D4AA]" />
            </div>

            {/* Slider 2 (NEW) */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>
                  Horas respondiendo consultas / día
                </label>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#00D4AA', fontFamily: 'Saira, sans-serif' }}>{horas}hs</span>
              </div>
              <input type="range" min="1" max="12" value={horas} onChange={(e) => setHoras(Number(e.target.value))} className="w-full accent-[#00D4AA]" />
            </div>

            {/* Result — Loss (coral) */}
            <div className="flex flex-col items-center justify-center p-5 rounded-xl mt-2" style={{ background: 'rgba(255,77,109,0.06)', border: '1px solid rgba(255,77,109,0.15)' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', fontFamily: 'Inter, sans-serif' }}>
                Oportunidad mensual en riesgo
              </span>
              <div style={{ fontSize: 'clamp(32px, 7vw, 44px)', fontWeight: 800, color: '#FF4D6D', letterSpacing: '-0.02em', lineHeight: 1, fontFamily: 'Saira, sans-serif' }}>
                USD {resultado.toLocaleString('en-US')}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/[0.06]" />

            {/* Result — Gain (cyan) */}
            <div className="flex flex-col items-center justify-center p-5 rounded-xl" style={{ background: 'rgba(0,212,170,0.04)', border: '1px solid rgba(0,212,170,0.12)' }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>
                Sentinel recupera ~35% de eso
              </span>
              <div className="mb-2" style={{ fontSize: '28px', fontWeight: 800, color: '#00D4AA', fontFamily: 'Saira, sans-serif' }}>
                → USD {recupero.toLocaleString('en-US')} / mes
              </div>
              <div className="flex flex-col items-center gap-1 mt-2">
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>
                  Costo total Sentinel año 1: <span style={{ color: '#00D4AA' }}>USD 1.585</span>
                </span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#00D4AA', fontFamily: 'Inter, sans-serif' }}>
                  ROI: {roi}% en el primer año
                </span>
              </div>
              <div className="mt-3 px-4 py-2 rounded-full" style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#00D4AA', fontFamily: 'Saira, sans-serif' }}>
                  Sentinel se paga solo en {payback} días
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', textAlign: 'center', lineHeight: 1.4, fontFamily: 'Inter, sans-serif' }}>
              Estimación orientativa basada en benchmarks promedio. 35% es el rango de recupero típico observado. No garantiza resultados específicos.
            </p>

            {/* CTA */}
            <Link to={CTA_URL} target="_blank" rel="noopener noreferrer" className="w-full"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '56px', borderRadius: '999px', background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '15px', color: '#020403', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,212,170,0.15)' }}>
              Reservar diagnóstico para mi negocio →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
