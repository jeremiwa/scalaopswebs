import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export const CostoInvisible = () => {
  return (
    <section className="relative" style={{ background: '#0A0A0F', padding: '130px 0' }}>
      <div style={{ position: 'absolute', top: '-100px', left: '-120px', right: '-120px', bottom: '-100px', zIndex: 0, pointerEvents: 'none', borderRadius: '80px', background: 'radial-gradient(ellipse at 45% 50%, rgba(34,197,94,0.05) 0%, transparent 55%), radial-gradient(ellipse at 60% 50%, rgba(99,102,241,0.03) 0%, transparent 55%)', filter: 'blur(120px)', transform: 'translateZ(0)' }}></div>

      <div className="container-custom relative z-10 flex flex-col items-center">

        {/* ── MODULE CARD (PREMIUM) ── */}
        <div className="w-full card-premium" style={{
          maxWidth: '860px', margin: '0 auto', padding: '1px', borderRadius: '24px',
          background: 'linear-gradient(145deg, rgba(99,102,241,0.18) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.03) 60%, rgba(34,197,94,0.14) 100%)',
          transition: 'all 0.4s ease'
        }}>
          <div className="w-full flex flex-col items-center" style={{
            background: '#0C0C14', borderRadius: '23px', padding: '44px 48px 36px',
            backgroundImage: 'radial-gradient(ellipse at 30% 0%, rgba(99,102,241,0.04) 0%, transparent 40%)',
            textAlign: 'center'
          }}>

            {/* ── HEADER INSIDE CARD ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center w-full"
            >
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#22C55E', marginBottom: '12px', display: 'block' }}>
                LO QUE ESTÁ EN JUEGO
              </span>
              <h2 style={{ fontSize: '44px', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.08, margin: '0 0 10px' }}>
                Mismo tráfico. Mismo ticket. Más cierres.
              </h2>
              <p className="calc-pullquote">
                <span className="calc-quote-main">La diferencia entre 2% y 6% de tasa de cierre no es un detalle.</span>
                <span className="calc-quote-punch">Es otro negocio.</span>
              </p>
            </motion.div>

            {/* ── BEFORE / AFTER CARDS ── */}
            <div className="flex flex-col md:flex-row items-center gap-5 w-full mb-5">
              {/* ANTES */}
              <div className="rounded-[18px] p-7 md:p-8 flex flex-col justify-between w-full flex-1" style={{ background: 'rgba(15,23,42,0.35)', border: '1px solid rgba(148,163,184,0.12)' }}>
                <div className="text-[11px] font-semibold tracking-widest uppercase text-[#5A5A6E] mb-8">ANTES</div>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-5">
                    <span className="text-[15px]" style={{ color: 'rgba(203,213,225,0.68)' }}>Leads / mes</span>
                    <span className="text-[20px] text-[#F5F5F7] font-medium">500</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-6">
                    <span className="text-[15px]" style={{ color: 'rgba(203,213,225,0.68)' }}>Tasa de cierre</span>
                    <span className="text-[20px] text-[#EF4444] font-medium">2%</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[15px]" style={{ color: 'rgba(203,213,225,0.68)' }}>Facturación</span>
                    <span className="text-[24px] text-[#F5F5F7] font-medium">$10.000</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 text-[#5A5A6E] text-[20px]">→</div>

              {/* DESPUÉS */}
              <div className="rounded-[18px] p-7 md:p-8 flex flex-col justify-between w-full flex-1" style={{ background: 'rgba(15,23,42,0.35)', border: '1px solid rgba(16,185,129,0.15)' }}>
                <div className="text-[11px] font-semibold tracking-widest uppercase text-[#22C55E] mb-8">DESPUÉS</div>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-5">
                    <span className="text-[15px]" style={{ color: 'rgba(203,213,225,0.68)' }}>Leads / mes</span>
                    <span className="text-[20px] text-[#F5F5F7] font-medium">500</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-5">
                    <span className="text-[15px]" style={{ color: 'rgba(203,213,225,0.68)' }}>Tasa de cierre</span>
                    <span className="text-[20px] text-[#22C55E] font-medium">6%</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[15px]" style={{ color: 'rgba(203,213,225,0.68)' }}>Facturación</span>
                    <span className="text-[24px] text-[#F5F5F7] font-medium">$30.000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── DINERO RECUPERADO ── */}
            <div className="w-full relative mt-1">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '38px 24px', marginTop: '24px', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.02) 100%)', border: '1px solid rgba(34, 197, 94, 0.15)', borderRadius: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#A0A0B5', marginBottom: '4px' }}>Dinero recuperado:</span>
                <span style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em', color: '#22C55E', lineHeight: 1 }}>
                  <span className="counter-up" data-target="20000" data-prefix="+$" data-duration="1500">+$0</span>
                  <span style={{ fontSize: '20px', fontWeight: 500, color: 'rgba(34, 197, 94, 0.7)', marginLeft: '4px' }}>/mes</span>
                </span>
                <span style={{ marginTop: '8px', fontSize: '14px', color: '#F5F5F7', fontWeight: 500 }}>Sin gastar un dólar más en publicidad.</span>
              </div>
              <div className="text-center mt-5">
                <p className="text-[13px] text-[#5A5A6E]">Basado en ticket promedio de $1.000. Ajustá los números a tu negocio.</p>
              </div>
            </div>

          </div>
        </div>

        {/* ── CTA INTERMEDIO ── */}
        <div style={{ textAlign: 'center', paddingTop: '20px', width: '100%' }}>
          <Link to="/formulario" target="_blank" rel="noopener noreferrer" className="mid-cta-btn" style={{ display: 'inline-block', padding: '14px 32px', background: 'transparent', color: '#22C55E', border: '1.5px solid rgba(34, 197, 94, 0.3)', borderRadius: '10px', fontSize: '16px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}>Quiero recuperar esas ventas</Link>
          <p style={{ marginTop: '10px', fontSize: '13px', color: '#5A5A6E' }}>Llamada gratuita. Sin compromiso.</p>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideFromLeft { from { opacity:0; transform: translateX(-40px); } to { opacity:1; transform: translateX(0); } }
          @keyframes slideFromRight { from { opacity:0; transform: translateX(40px); } to { opacity:1; transform: translateX(0); } }
          .calc-slide-left.visible { animation: slideFromLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .calc-slide-right.visible { animation: slideFromRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 200ms; }
          .mid-cta-btn:hover { background: rgba(34, 197, 94, 0.08) !important; border-color: rgba(34, 197, 94, 0.5) !important; box-shadow: 0 0 20px rgba(34, 197, 94, 0.10) !important; }
        `}} />
    </section>
  );
};
