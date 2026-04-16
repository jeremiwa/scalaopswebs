import { useState } from 'react';

export const Resultados = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section
      id="resultados"
      style={{
        background: '#0B0B12',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
        padding: '120px 0 130px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow — very subtle */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '450px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.04) 0%, transparent 65%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container-custom relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-14 md:mb-16 reveal">
          <span
            style={{
              display: 'block',
              marginBottom: '14px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#22C55E',
            }}
          >
            Resultados reales
          </span>
          <h2
            style={{
              fontSize: 'clamp(30px, 4.5vw, 46px)',
              fontWeight: 700,
              color: '#F5F5F7',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Negocios que dejaron de perder ventas.
          </h2>
        </div>

        {/* ── 3-column grid — align-items: start so side cards are compact ── */}
        <div
          className="reveal-stagger grid grid-cols-1 lg:grid-cols-3 gap-5 w-full"
          style={{ maxWidth: '1120px', alignItems: 'start' }}
        >

          {/* ━━ LEFT CARD — Martín S. ━━ */}
          <div className="order-2 lg:order-1 lg:mt-9">
            <div
              className="testimonial-card"
              style={{
                background: 'rgba(255,255,255,0.025)',
                borderRadius: '22px',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '32px 28px 28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.14), 0 0 0 0.5px rgba(255,255,255,0.03)',
              }}
            >
              {/* Profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px', height: '46px' }}>
                <ProfileAvatar src="/images/martin.jpg" name="Martín S." />
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#F5F5F7', letterSpacing: '-0.01em' }}>
                    Martín S.
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.40)', fontWeight: 400 }}>
                    Director Comercial · Real Estate
                  </p>
                </div>
              </div>

              {/* Quote */}
              <p style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.7,
                fontStyle: 'italic',
                marginBottom: '24px',
                height: '155px',
              }}>
                "La auditoría fue un antes y un después. Nos mostró fallas reales en cómo vendíamos: objeciones mal trabajadas, poco seguimiento y un equipo sin un proceso claro. Scala nos cambió el negocio."
              </p>

              {/* Badge — centered */}
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Badge label="Implementado en 27 días" />
              </div>
            </div>
          </div>

          {/* ━━ CENTER CARD — Jordi Falcon (video) ━━ */}
          <div className="order-1 lg:order-2">
            <div
              className="testimonial-card-featured"
              style={{
                background: 'rgba(255,255,255,0.022)',
                borderRadius: '22px',
                border: '1px solid rgba(34,197,94,0.10)',
                padding: '28px 28px 20px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.18), 0 0 30px rgba(34,197,94,0.025), 0 0 0 0.5px rgba(34,197,94,0.06)',
              }}
            >
              {/* Subtle top accent line */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.25), transparent)',
                  pointerEvents: 'none',
                }}
              />

              {/* Profile — same style as side cards */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
                <ProfileAvatar src="/images/jordi.jpg" name="Jordi Falcon" />
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#F5F5F7', letterSpacing: '-0.01em' }}>
                    Jordi Falcon
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.40)', fontWeight: 400 }}>
                    CEO · Servicios inmobiliarios · Barcelona
                  </p>
                </div>
              </div>

              {/* Quote */}
              <p style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.7,
                fontStyle: 'italic',
                marginBottom: '14px',
              }}>
                "Los recomiendo mucho, gran predisposición y conocimiento técnico."
              </p>

              {/* Video — contained, elegant */}
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '0',
              }}>
                <div
                  style={{
                    position: 'relative',
                    width: '180px',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: '#08080D',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: '0 6px 28px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(255,255,255,0.04)',
                    aspectRatio: '9 / 16',
                  }}
                >
                  {!videoPlaying ? (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(170deg, rgba(17,17,22,0.95) 0%, rgba(10,10,16,1) 100%)',
                        cursor: 'pointer',
                      }}
                      onClick={() => setVideoPlaying(true)}
                      aria-label="Reproducir testimonio de Jordi Falcon"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setVideoPlaying(true)}
                    >
                      {/* Glow behind play */}
                      <div
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '100px',
                          height: '100px',
                          background: 'radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%)',
                          filter: 'blur(18px)',
                          pointerEvents: 'none',
                        }}
                      />
                      {/* Play button */}
                      <div
                        className="play-btn-ring"
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          background: 'rgba(34,197,94,0.10)',
                          border: '1.5px solid rgba(34,197,94,0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 0 20px rgba(34,197,94,0.12)',
                          marginBottom: '8px',
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <polygon points="8,5 20,12 8,19" fill="#22C55E" />
                        </svg>
                      </div>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        Ver video
                      </p>
                    </div>
                  ) : (
                    <iframe
                      src="https://player.vimeo.com/video/1183439807?badge=0&autopause=0&autoplay=1&player_id=0&app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="Testimonio Jordi Falcon – Scala"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* ━━ RIGHT CARD — Laura G. ━━ */}
          <div className="order-3 lg:mt-9">
            <div
              className="testimonial-card"
              style={{
                background: 'rgba(255,255,255,0.025)',
                borderRadius: '22px',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '32px 28px 28px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.14), 0 0 0 0.5px rgba(255,255,255,0.03)',
              }}
            >
              {/* Profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px', height: '46px' }}>
                <ProfileAvatar src="/images/laura.jpg" name="Laura G." />
                <div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#F5F5F7', letterSpacing: '-0.01em' }}>
                    Laura G.
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.40)', fontWeight: 400 }}>
                    CEO · Agencia B2B
                  </p>
                </div>
              </div>

              {/* Quote */}
              <p style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.7,
                fontStyle: 'italic',
                marginBottom: '24px',
                height: '155px',
              }}>
                "Implementamos IA en toda la empresa, la velocidad y profesionalismo 10 puntos. no solo los recomiendo, es casi una obligacion si tenes un negocio y no tenes IA"
              </p>

              {/* Badge — centered */}
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Badge label="Implementado en 30 días" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


/* ── Micro-components ── */

const ProfileAvatar = ({ src, name }: { src: string; name: string }) => (
  <div
    style={{
      width: '46px',
      height: '46px',
      borderRadius: '50%',
      border: '1.5px solid rgba(255,255,255,0.08)',
      background: '#1A1A24',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
    }}
  >
    <img
      src={src}
      alt={name}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      onError={(e) => {
        e.currentTarget.style.display = 'none';
        (e.currentTarget.parentElement as HTMLElement).innerHTML =
          `<span style="color:rgba(255,255,255,0.35);font-weight:500;font-size:16px">${name.charAt(0)}</span>`;
      }}
    />
  </div>
);

const BeforeAfterRow = ({ before, now }: { before: string; now: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
    <span style={{
      color: 'rgba(255,255,255,0.28)',
      textDecoration: 'line-through',
      textDecorationColor: 'rgba(255,255,255,0.12)',
      flex: '0 0 auto',
      maxWidth: '45%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }}>
      {before}
    </span>
    <span style={{ color: 'rgba(34,197,94,0.6)', flexShrink: 0, fontSize: '12px' }}>→</span>
    <span style={{
      color: 'rgba(255,255,255,0.72)',
      fontWeight: 500,
      flex: '0 0 auto',
      maxWidth: '50%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }}>
      {now}
    </span>
  </div>
);

const Badge = ({ label }: { label: string }) => (
  <div
    style={{
      background: 'rgba(34,197,94,0.06)',
      border: '1px solid rgba(34,197,94,0.14)',
      borderRadius: '100px',
      padding: '5px 14px',
    }}
  >
    <span style={{
      fontSize: '12px',
      fontWeight: 600,
      color: 'rgba(34,197,94,0.75)',
      letterSpacing: '0.03em',
    }}>
      {label}
    </span>
  </div>
);
