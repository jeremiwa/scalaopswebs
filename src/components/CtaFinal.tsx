import { Link } from 'react-router-dom';

export const CtaFinal = () => {
  return (
    <section className="relative" style={{ background: '#0A0A0F', padding: '120px 0 80px' }}>
      <div style={{ position: 'absolute', top: '-80px', left: '-100px', right: '-100px', bottom: '-80px', zIndex: 0, pointerEvents: 'none', borderRadius: '80px', background: 'radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.07) 0%, rgba(34,197,94,0.02) 40%, transparent 65%)', filter: 'blur(120px)', transform: 'translateZ(0)' }}></div>
      {/* Dot grid pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '24px 24px', maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)' }}></div>

      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        <div className="max-w-[700px] mx-auto reveal">
          <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '16px' }}>
            Estás perdiendo ventas<br className="hidden md:block" /> mientras leés esto.
          </h2>
          <p style={{ fontSize: '17px', color: '#8B8B9E', lineHeight: 1.5, maxWidth: '520px', margin: '0 auto 56px auto' }}>
            Tu competencia no va a esperar a que ordenes tu proceso de venta. Cada día sin visibilidad es plata que dejás sobre la mesa.
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_6px_#22C55E]"></span>
            <span className="text-[14px] font-medium" style={{ color: 'rgba(203,213,225,0.72)' }}>+100 negocios ya ordenaron su proceso comercial</span>
          </div>

          <div className="relative inline-block">
            <div className="absolute -inset-4 rounded-[18px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(34,197,94,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }}></div>
            <Link to="/formulario" target="_blank" rel="noopener noreferrer" className="cta-final-btn relative" style={{ display: 'inline-block', padding: '16px 36px', background: '#22C55E', color: '#0A0A0F', fontSize: '17px', fontWeight: 700, borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 0 30px rgba(34,197,94,0.25)', transition: 'all 0.3s ease', textDecoration: 'none' }}>
              Agendar llamada gratuita
            </Link>
          </div>

          <div className="mt-8 text-[13px] flex flex-wrap justify-center items-center gap-x-6 gap-y-3 font-medium" style={{ color: 'rgba(203,213,225,0.68)' }}>
            <span className="flex items-center gap-1.5"><span className="text-[#22C55E]">✓</span> Llamada sin costo</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/10"></span>
            <span className="flex items-center gap-1.5"><span className="text-[#22C55E]">✓</span> Resultados en 72hs</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/10"></span>
            <span className="flex items-center gap-1.5"><span className="text-[#22C55E]">✓</span> Sin permanencia</span>
          </div>

          <div className="mt-10">
            <a href="https://wa.link/sn01qs" target="_blank" rel="noopener noreferrer" className="text-[14px] hover:text-[#22C55E] transition-colors border-b border-transparent hover:border-[#22C55E] pb-0.5 inline-flex flex-col md:flex-row items-center gap-1" style={{ color: 'rgba(203,213,225,0.60)' }}>
              ¿Preferís escribirnos? Abrir WhatsApp →
            </a>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
                .cta-final-btn:hover { background: #16A34A !important; box-shadow: 0 0 40px rgba(34,197,94,0.35) !important; transform: translateY(-2px); }
                .card-premium:hover { background: linear-gradient(145deg, rgba(99,102,241,0.28) 0%, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.04) 60%, rgba(34,197,94,0.22) 100%) !important; }
            `}} />
    </section>
  );
};
