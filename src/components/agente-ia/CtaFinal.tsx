import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

const CTA_URL = '/formulario';
const WA_URL = 'https://wa.link/sn01qs';

const trackEvent = (location: string) => {
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({ event: 'sentinel_cta_clicked', location, page: 'agente-ia', offer: 'sentinel_997' });
  }
};

export const CtaFinal = () => {
  return (
    <section id="sentinel-cta-final" className="relative" style={{ background: '#000000', padding: '120px 0 80px' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '-80px', left: '-100px', right: '-100px', bottom: '-80px',
        zIndex: 0, pointerEvents: 'none', borderRadius: '80px',
        background: 'radial-gradient(ellipse at 50% 60%, rgba(107,221,161,0.07) 0%, rgba(107,221,161,0.02) 40%, transparent 65%)',
        filter: 'blur(120px)', transform: 'translateZ(0)',
      }} />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
      }} />

      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        <div className="max-w-[700px] mx-auto reveal">
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '16px' }}>
            Tus clientes ya están escribiendo.<br className="hidden md:block" /> La pregunta es quién les responde primero.
          </h2>
          <p style={{ fontSize: '17px', color: '#8B8B9E', lineHeight: 1.5, maxWidth: '520px', margin: '0 auto 40px' }}>
            Implementá Sentinel y dejá de perder oportunidades por falta de respuesta, seguimiento o tiempo.
          </p>

          {/* CTA */}
          <div className="relative inline-block">
            <div className="absolute -inset-4 rounded-[18px] pointer-events-none" style={{
              background: 'radial-gradient(ellipse at center, rgba(107,221,161,0.12) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }} />
            <Link
              to={CTA_URL} target="_blank" rel="noopener noreferrer"
              className="relative btn-hover-scale overflow-hidden flex items-center justify-center cursor-pointer"
              style={{
                background: 'linear-gradient(90deg, #185de8, #6bdda1)',
                padding: '18px 44px', borderRadius: '100px',
                fontFamily: 'var(--font-primary)', fontWeight: 800, fontSize: '15px', color: '#000',
                boxShadow: '0 0 40px rgba(107,221,161,0.1)', textDecoration: 'none',
              }}
              onClick={() => trackEvent('final')}
            >
              <div className="absolute inset-0 bg-white/30 skew-x-[-20deg] animate-shimmer-btn" style={{ width: '30%' }} />
              <span className="relative z-10">Quiero implementar Sentinel</span>
            </Link>
          </div>

          {/* Microcopy */}
          <div className="mt-6 text-[13px] flex flex-wrap justify-center items-center gap-x-6 gap-y-3 font-medium" style={{ color: 'rgba(203,213,225,0.68)' }}>
            <span className="flex items-center gap-1.5"><span className="text-[#6bdda1]">✓</span> USD 997 precio lanzamiento</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/10" />
            <span className="flex items-center gap-1.5"><span className="text-[#6bdda1]">✓</span> Implementación personalizada</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/10" />
            <span className="flex items-center gap-1.5"><span className="text-[#6bdda1]">✓</span> Cupos sujetos a disponibilidad</span>
          </div>

          {/* WhatsApp */}
          <div className="mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="text-[14px] hover:text-[#6bdda1] transition-colors border-b border-transparent hover:border-[#6bdda1] pb-0.5 inline-flex items-center gap-1"
              style={{ color: 'rgba(203,213,225,0.60)' }}
            >
              ¿Preferís escribirnos? Abrir WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
