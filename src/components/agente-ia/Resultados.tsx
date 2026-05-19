import { useState } from 'react';

export const Resultados = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section style={{
      background: '#020202',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      padding: '120px 0 130px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%,-50%)',
        width: '800px', height: '450px',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(107,221,161,0.04) 0%, transparent 65%)',
        filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="container-custom relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-14 md:mb-16 reveal">
          <span style={{ display: 'block', marginBottom: '14px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6bdda1' }}>
            Prueba social
          </span>
          <h2 style={{ fontSize: 'clamp(26px, 4.5vw, 42px)', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '14px' }}>
            Negocios que ya confían en Scala para ordenar su operación comercial.
          </h2>
          <p style={{ fontSize: '17px', color: '#8B8B9E', lineHeight: 1.55, maxWidth: '560px', margin: '0 auto' }}>
            Sentinel nace de la misma lógica: usar IA para que ninguna oportunidad quede olvidada.
          </p>
        </div>

        {/* Featured Testimonial — Jordi */}
        <div className="w-full max-w-[700px] mb-6 reveal" style={{
          background: 'rgba(255,255,255,0.022)', borderRadius: '22px',
          border: '1px solid rgba(107,221,161,0.10)', padding: '28px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.18), 0 0 30px rgba(107,221,161,0.025)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(107,221,161,0.25), transparent)', pointerEvents: 'none' }} />
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Video */}
            <div style={{
              position: 'relative', width: '140px', minWidth: '140px', borderRadius: '14px',
              overflow: 'hidden', background: '#08080D',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 6px 28px rgba(0,0,0,0.45)',
              aspectRatio: '9 / 16', flexShrink: 0,
            }}>
              {!videoPlaying ? (
                <div
                  style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    backgroundImage: 'linear-gradient(170deg, rgba(8,8,13,0.6), rgba(5,5,10,0.9)), url(/images/jordi.jpg)',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                  }}
                  onClick={() => setVideoPlaying(true)}
                  role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setVideoPlaying(true)}
                  aria-label="Reproducir testimonio de Jordi Falcon"
                >
                  <div className="play-btn-ring" style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: 'rgba(107,221,161,0.10)', border: '1.5px solid rgba(107,221,161,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)', marginBottom: '6px',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polygon points="8,5 20,12 8,19" fill="#6bdda1" /></svg>
                  </div>
                  <p style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Ver video</p>
                </div>
              ) : (
                <iframe
                  src="https://player.vimeo.com/video/1183439807?badge=0&autopause=0&autoplay=1&player_id=0&app_id=58479"
                  frameBorder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin" title="Testimonio Jordi Falcon – Scala"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                />
              )}
            </div>
            {/* Quote */}
            <div className="flex flex-col">
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '14px' }}>
                "Los recomiendo mucho, gran predisposición y conocimiento técnico."
              </p>
              <div className="flex items-center gap-3">
                <ProfileAvatar src="/images/jordi.jpg" name="Jordi Falcon" />
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#F5F5F7' }}>Jordi Falcon</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.40)' }}>CEO · Servicios inmobiliarios · Barcelona</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[700px] reveal-stagger">
          {/* Martín */}
          <TestimonialCard
            name="Martín S."
            role="Director Comercial · Real Estate"
            avatar="/images/martin.jpg"
            quote="La auditoría fue un antes y un después. Nos mostró fallas reales en cómo vendíamos: objeciones mal trabajadas, poco seguimiento y un equipo sin un proceso claro. Scala nos cambió el negocio."
            badge="Implementado en 27 días"
          />
          {/* Laura */}
          <TestimonialCard
            name="Laura G."
            role="CEO · Agencia B2B"
            avatar="/images/laura.jpg"
            quote="Implementamos IA en toda la empresa, la velocidad y profesionalismo 10 puntos. No solo los recomiendo, es casi una obligación si tenés un negocio y no tenés IA."
            badge="Implementado en 30 días"
          />
        </div>

        {/* Trust Strip */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-12 reveal">
          {['Implementación personalizada', 'IA aplicada a ventas', 'Acompañamiento real'].map((t) => (
            <span key={t} className="flex items-center gap-2 text-[13px] font-medium" style={{ color: 'rgba(203,213,225,0.60)' }}>
              <span className="text-[#6bdda1]">✓</span> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Micro-components ── */
const ProfileAvatar = ({ src, name }: { src: string; name: string }) => (
  <div style={{
    width: '42px', height: '42px', borderRadius: '50%',
    border: '1.5px solid rgba(255,255,255,0.08)', background: '#1A1A24',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', flexShrink: 0,
  }}>
    <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        (e.currentTarget.parentElement as HTMLElement).innerHTML =
          `<span style="color:rgba(255,255,255,0.35);font-weight:500;font-size:15px">${name.charAt(0)}</span>`;
      }}
    />
  </div>
);

const TestimonialCard = ({ name, role, avatar, quote, badge }: { name: string; role: string; avatar: string; quote: string; badge: string }) => (
  <div className="testimonial-card reveal" style={{
    background: 'rgba(255,255,255,0.025)', borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.06)', padding: '28px 24px',
    display: 'flex', flexDirection: 'column',
    boxShadow: '0 2px 12px rgba(0,0,0,0.14)',
  }}>
    <div className="flex items-center gap-3 mb-4">
      <ProfileAvatar src={avatar} name={name} />
      <div>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#F5F5F7' }}>{name}</p>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.40)' }}>{role}</p>
      </div>
    </div>
    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '16px', flex: 1 }}>
      "{quote}"
    </p>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{
        background: 'rgba(107,221,161,0.06)', border: '1px solid rgba(107,221,161,0.14)',
        borderRadius: '100px', padding: '5px 14px',
      }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(107,221,161,0.75)', letterSpacing: '0.03em' }}>{badge}</span>
      </div>
    </div>
  </div>
);
