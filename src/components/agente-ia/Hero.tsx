import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

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
  'No se olvida',
  'No descansa',
  'No deja consultas frías',
];

export const Hero = () => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <section className="relative overflow-hidden" style={{ background: '#030504', paddingTop: '100px', paddingBottom: '32px' }}>
      {/* Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] pointer-events-none z-0 bg-[#246BFE] blur-[140px] opacity-15 rounded-full" />
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] pointer-events-none z-0 bg-[#68E6A3] blur-[120px] opacity-10 rounded-full" />

      <div className="container-custom relative z-10 flex flex-col items-center text-center px-[24px] md:px-0">

        {/* Eyebrow */}
        <div
          className="sentinel-fade-in inline-block mb-3"
          style={{
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#68E6A3',
          }}
        >
          WHATSAPP + INSTAGRAM 24/7
        </div>

        {/* H1 */}
        <div className="w-full max-w-[700px] mx-auto">
          <h1
            className="sentinel-fade-in text-[#F5F7FA]"
            style={{ 
              fontSize: 'clamp(36px, 9vw, 46px)', 
              fontWeight: 800, 
              lineHeight: 1.05, 
              letterSpacing: '-0.03em',
              marginBottom: '16px', 
              animationDelay: '0.1s' 
            }}
          >
            Tu equipo no puede responder todo.<br />
            <span style={{ color: '#68E6A3' }}>Sentinel sí.</span>
          </h1>

          <p
            className="sentinel-fade-in"
            style={{
              fontSize: '18px',
              color: '#9EA0B4',
              lineHeight: 1.45,
              maxWidth: '38ch',
              margin: '0 auto',
              marginBottom: '28px',
              animationDelay: '0.2s',
            }}
          >
            Un Empleado IA que atiende, filtra y vende usando la información real de tu negocio.
          </p>
        </div>

        {/* 3 Chips */}
        <div className="sentinel-fade-in flex flex-wrap justify-center gap-2 mb-8" style={{ animationDelay: '0.25s' }}>
          {heroChips.map((chip, index) => (
            <span
              key={chip}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 600,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(105,235,170,0.18)',
                color: '#F5F7FA',
                letterSpacing: '0.01em',
                animation: \`fadeInUp 0.5s ease forwards \${0.3 + index * 0.12}s\`,
                opacity: 0,
                transform: 'translateY(10px)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#68E6A3', flexShrink: 0 }} />
              {chip}
            </span>
          ))}
        </div>

        {/* Video Container */}
        <div
          ref={videoRef}
          className="sentinel-scale-in relative w-full mb-8"
          style={{ maxWidth: '680px', animationDelay: '0.4s' }}
        >
          {/* Video glow */}
          <div style={{
            position: 'absolute', top: '-40px', left: '-40px', right: '-40px', bottom: '-40px',
            zIndex: 0, pointerEvents: 'none', borderRadius: '80px',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(105, 235, 170, 0.05) 0%, rgba(36, 107, 254, 0.03) 40%, transparent 70%)',
            filter: 'blur(60px)', transform: 'translateZ(0)',
          }} />
          
          <div
            className="bg-[#050706] relative shadow-lg overflow-hidden z-20"
            style={{
              borderRadius: '24px',
              border: '1px solid rgba(105, 235, 170, 0.16)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 0 30px rgba(105, 235, 170, 0.04)',
            }}
          >
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              {!isPlaying ? (
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                  style={{ background: 'linear-gradient(180deg, #0A0F0D 0%, #030504 100%)' }}
                >
                  <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Play className="w-8 h-8 text-[#68E6A3] ml-1" fill="currentColor" />
                  </div>
                  <p style={{ color: '#F5F7FA', fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                    Antes de contratar otro vendedor, mirá esto.
                  </p>
                </div>
              ) : (
                videoVisible && (
                  <iframe
                    src="https://player.vimeo.com/video/1180578010?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title="Sentinel — Empleado IA Comercial"
                    loading="lazy"
                  />
                )
              )}
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="sentinel-fade-in flex flex-col items-center w-full" style={{ animationDelay: '0.6s' }}>
          <Link
            to={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('hero')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '380px',
              height: '56px',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #246BFE 0%, #68E6A3 100%)',
              fontFamily: 'var(--font-primary), Inter, sans-serif',
              fontWeight: 800,
              fontSize: '16px',
              color: '#030504',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(105,235,170,0.2)',
              letterSpacing: '-0.01em',
              marginBottom: '12px',
            }}
          >
            Implementar Sentinel · USD 997
          </Link>
          <p style={{ fontSize: '13px', color: '#7D8195', fontWeight: 500 }}>
            Personalizado para tu negocio · Listo en pocos días
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: \`
        @keyframes sentinel-fade { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sentinel-scale { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .sentinel-fade-in { animation: sentinel-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .sentinel-scale-in { animation: sentinel-scale 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .sentinel-fade-in, .sentinel-scale-in { animation: none; opacity: 1; transform: none; }
        }
      \`}} />
    </section>
  );
};
