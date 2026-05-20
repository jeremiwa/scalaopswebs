import { useRef, useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

const trackEvent = (location: string) => {
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'sentinel_cta_clicked',
      location,
      page: 'agente-ia',
      offer: 'sentinel_997',
    });
  }
};

const heroChips = [
  'Personalizado para tu negocio',
  'Precio lanzamiento',
  'Listo en pocos días',
];

export const Hero = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'sentinel_page_view', page: 'agente-ia' });
    }
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVideoVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ background: '#000000', paddingTop: '100px', paddingBottom: '32px' }}>
      {/* Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] pointer-events-none z-0 bg-[#185de8] blur-[120px] opacity-15 rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] pointer-events-none z-0 bg-[#6bdda1] blur-[120px] opacity-15 rounded-full" />

      <div className="container-custom relative z-10 flex flex-col items-center text-center">

        {/* Badge */}
        <div
          className="sentinel-fade-in inline-flex items-center gap-2 mb-5"
          style={{
            padding: '7px 18px',
            background: 'rgba(107, 221, 161, 0.06)',
            border: '1px solid rgba(107, 221, 161, 0.15)',
            borderRadius: '100px',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#6bdda1',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6bdda1', flexShrink: 0 }} />
          Precio lanzamiento · USD 997
        </div>

        {/* H1 */}
        <div className="max-w-[740px] mx-auto px-4 md:px-0">
          <h1
            className="sentinel-fade-in text-[26px] md:text-[42px] lg:text-[48px] font-[800] leading-[1.08] tracking-[-0.03em]"
            style={{ marginBottom: '14px', animationDelay: '0.1s' }}
          >
            <span className="text-white">Tu negocio no necesita otro empleado.{' '}</span>
            <span className="scala-gradient-text">Necesita un Empleado IA.</span>
          </h1>

          <p
            className="sentinel-fade-in"
            style={{
              fontSize: '16px',
              color: '#A0A0B5',
              opacity: 0.88,
              lineHeight: 1.55,
              maxWidth: '54ch',
              margin: '0 auto',
              marginBottom: '28px',
              animationDelay: '0.2s',
            }}
          >
            Sentinel responde, califica y sigue oportunidades por WhatsApp e Instagram para que tu equipo no pierda clientes por falta de tiempo.
          </p>
        </div>

        {/* Video */}
        <div
          ref={videoRef}
          className="sentinel-scale-in relative w-full"
          style={{ maxWidth: '680px', animationDelay: '0.3s' }}
        >
          {/* Video glow */}
          <div style={{
            position: 'absolute', top: '-80px', left: '-80px', right: '-80px', bottom: '-80px',
            zIndex: 0, pointerEvents: 'none', borderRadius: '80px',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(107, 221, 161, 0.025) 0%, rgba(24, 93, 232, 0.015) 40%, transparent 70%)',
            filter: 'blur(100px)', transform: 'translateZ(0)',
          }} />
          <div
            className="bg-[#050505] relative shadow-lg overflow-hidden z-20"
            style={{
              borderRadius: '18px',
              border: '1px solid rgba(107, 221, 161, 0.12)',
              boxShadow: '0 16px 50px rgba(0,0,0,0.5), 0 0 30px rgba(107, 221, 161, 0.04), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              {videoVisible && (
                <iframe
                  src="https://player.vimeo.com/video/1180578010?badge=0&autopause=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  title="Sentinel — Empleado IA Comercial"
                  loading="lazy"
                />
              )}
            </div>
          </div>
          {/* Caption */}
          <p style={{
            textAlign: 'center', marginTop: '12px', fontSize: '12px',
            color: '#5A5A6E', fontStyle: 'italic', fontWeight: 500,
          }}>
            Miralo antes de contratar otro vendedor.
          </p>
        </div>

        {/* CTA */}
        <div className="sentinel-fade-in flex flex-col items-center mt-8" style={{ animationDelay: '0.45s' }}>
          <Link
            to={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
            onClick={() => trackEvent('hero')}
          >
            <Button variant="primary" className="text-lg px-10 py-4 btn-hover-lift">
              Quiero implementar Sentinel
            </Button>
          </Link>

          {/* 3 Chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {heroChips.map((chip) => (
              <span
                key={chip}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.60)',
                  letterSpacing: '0.02em',
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6bdda1', flexShrink: 0 }} />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sentinel-fade { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sentinel-scale { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .sentinel-fade-in { animation: sentinel-fade 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .sentinel-scale-in { animation: sentinel-scale 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .sentinel-fade-in, .sentinel-scale-in { animation: none; opacity: 1; transform: none; }
        }
      `}} />
    </section>
  );
};
