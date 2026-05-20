import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const Calculadora = () => {
  const [consultas, setConsultas] = useState(30);
  const [ticket, setTicket] = useState(100);
  const [porcentaje, setPorcentaje] = useState(20);
  const [resultado, setResultado] = useState(0);

  const controls = useAnimation();

  useEffect(() => {
    const val = Math.round(consultas * 30 * ticket * (porcentaje / 100));
    setResultado(val);
    
    // Animate the result change
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    });
  }, [consultas, ticket, porcentaje, controls]);

  return (
    <section className="relative" style={{ background: '#030504', padding: '72px 0' }}>
      <div className="container-custom relative z-10 flex flex-col px-[24px] md:px-0 max-w-[600px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 reveal">
          <h2 style={{ 
            fontSize: 'clamp(28px, 7vw, 40px)', 
            fontWeight: 800, 
            color: '#F5F7FA', 
            letterSpacing: '-0.02em', 
            lineHeight: 1.1, 
            marginBottom: '14px' 
          }}>
            ¿Cuánta plata se enfría por no responder a tiempo?
          </h2>
          <p style={{ 
            fontSize: '17px', 
            color: '#9EA0B4', 
            lineHeight: 1.45,
            maxWidth: '42ch',
            margin: '0 auto'
          }}>
            Calculá una estimación simple de oportunidades en riesgo.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="reveal flex flex-col p-6 rounded-[24px] relative" style={{
          background: '#080C0B',
          border: '1px solid rgba(105,235,170,0.2)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}>
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#68E6A3] opacity-5 blur-[80px] pointer-events-none rounded-full" />
          
          <div className="flex flex-col gap-5 relative z-10">
            {/* Input 1 */}
            <div className="flex flex-col">
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#7D8195', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Consultas por día
              </label>
              <input 
                type="number" 
                value={consultas} 
                onChange={(e) => setConsultas(Number(e.target.value))}
                className="w-full bg-[#030504] text-white font-bold text-[22px] px-4 py-3 rounded-[12px] focus:outline-none focus:ring-1 focus:ring-[#68E6A3]"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            {/* Input 2 */}
            <div className="flex flex-col">
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#7D8195', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Ticket promedio (USD)
              </label>
              <input 
                type="number" 
                value={ticket} 
                onChange={(e) => setTicket(Number(e.target.value))}
                className="w-full bg-[#030504] text-white font-bold text-[22px] px-4 py-3 rounded-[12px] focus:outline-none focus:ring-1 focus:ring-[#68E6A3]"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            {/* Input 3 Slider */}
            <div className="flex flex-col mb-4">
              <div className="flex justify-between items-center mb-4">
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#7D8195', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  % Sin seguimiento o respuesta lenta
                </label>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#68E6A3' }}>
                  {porcentaje}%
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={porcentaje} 
                onChange={(e) => setPorcentaje(Number(e.target.value))}
                className="w-full accent-[#68E6A3]"
              />
            </div>

            {/* Result Box */}
            <div className="flex flex-col items-center justify-center p-6 rounded-[16px] mt-2" style={{
              background: 'linear-gradient(135deg, rgba(36,107,254,0.1) 0%, rgba(104,230,163,0.1) 100%)',
              border: '1px solid rgba(105,235,170,0.3)',
            }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#9EA0B4', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                Oportunidad mensual en riesgo
              </span>
              <motion.div 
                animate={controls}
                style={{ fontSize: 'clamp(36px, 8vw, 48px)', fontWeight: 800, color: '#F5F7FA', letterSpacing: '-0.02em', lineHeight: 1 }}
              >
                USD {resultado.toLocaleString('es-AR')}
              </motion.div>
              <p style={{ fontSize: '11px', color: '#7D8195', marginTop: '12px', opacity: 0.8 }}>
                Estimación orientativa. No garantiza resultados.
              </p>
            </div>

            {/* CTA */}
            <button 
              onClick={() => {
                const el = document.getElementById('sentinel-pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full mt-2 py-4 rounded-full font-bold text-[15px] text-[#030504] transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, #246BFE 0%, #68E6A3 100%)', boxShadow: '0 4px 20px rgba(105,235,170,0.15)' }}
            >
              Quiero recuperar esas oportunidades
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};
