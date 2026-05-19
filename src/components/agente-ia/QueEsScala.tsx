import { useRef, useEffect, useState } from 'react';

const chatMessages = [
  { from: 'client', text: 'Hola, quería saber precios.', time: '10:02' },
  { from: 'sentinel', text: 'Hola, ¿cómo estás? Te ayudo. Para recomendarte bien, ¿buscás esto para vos o para tu empresa?', time: '10:02' },
  { from: 'client', text: 'Para mi empresa.', time: '10:03' },
  { from: 'sentinel', text: 'Perfecto. Te hago dos preguntas rápidas y te derivo con un asesor para que te muestren la mejor opción.', time: '10:03' },
];

const chips = ['Responde', 'Califica', 'Sigue', 'Deriva'];

const cards = [
  { title: 'Responde', desc: 'Atiende consultas incluso cuando tu equipo no está conectado.' },
  { title: 'Califica', desc: 'Detecta si el cliente tiene intención real o solo está preguntando.' },
  { title: 'Sigue', desc: 'Vuelve a contactar oportunidades que normalmente se enfrían.' },
];

export const WhatIsSentinel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleMsgs, setVisibleMsgs] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleMsgs(i);
      if (i >= chatMessages.length) clearInterval(timer);
    }, 600);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ background: '#020202', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '120px 0' }}
    >
      <div className="container-custom relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-14 md:mb-16 reveal">
          <span style={{ display: 'block', marginBottom: '14px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6bdda1' }}>
            Qué es Sentinel
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
            Sentinel es tu Empleado IA comercial.
          </h2>
          <p style={{ fontSize: '17px', color: '#8B8B9E', lineHeight: 1.55, maxWidth: '560px', margin: '0 auto' }}>
            No solo responde mensajes. Atiende, califica y sigue oportunidades para que tu equipo no pierda clientes por falta de tiempo.
          </p>
        </div>

        {/* Layout: Mockup + Cards */}
        <div className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-start">

          {/* Mockup WhatsApp */}
          <div className="relative reveal">
            <div style={{
              maxWidth: '380px', margin: '0 auto',
              background: '#0B141A', borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(107,221,161,0.03)',
            }}>
              {/* WA Header */}
              <div className="flex items-center gap-[10px] px-4 py-[10px]" style={{ background: '#1F2C34', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="text-[14px]" style={{ color: '#8696A0' }}>←</span>
                <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0" style={{ background: '#6bdda1', color: '#000' }}>S</div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[14px] font-medium text-[#E9EDEF] truncate">Sentinel</span>
                  <span className="text-[11px]" style={{ color: '#8696A0' }}>en línea</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex flex-col gap-2 p-4" style={{
                minHeight: '320px',
                backgroundColor: '#0B141A',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}>
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] px-3 py-2 text-[13px] leading-[1.45] ${msg.from === 'client' ? 'self-start rounded-tr-xl rounded-br-xl rounded-bl-xl rounded-tl-sm' : 'self-end rounded-tl-xl rounded-bl-xl rounded-br-xl rounded-tr-sm'}`}
                    style={{
                      background: msg.from === 'client' ? '#202C33' : 'rgba(107,221,161,0.12)',
                      color: '#E9EDEF',
                      opacity: i < visibleMsgs ? 1 : 0,
                      transform: i < visibleMsgs ? 'translateY(0)' : 'translateY(8px)',
                      transition: 'opacity 0.4s ease, transform 0.4s ease',
                    }}
                  >
                    {msg.text}
                    <span className="block text-right text-[10px] mt-0.5" style={{ color: '#8696A0' }}>{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {chips.map((chip, i) => (
                <span
                  key={chip}
                  className="reveal"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 600,
                    background: 'rgba(107,221,161,0.06)', border: '1px solid rgba(107,221,161,0.15)',
                    color: '#6bdda1', letterSpacing: '0.03em',
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6bdda1' }} />
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* 3 Cards */}
          <div className="flex flex-col gap-4 reveal-stagger">
            {cards.map((card) => (
              <div
                key={card.title}
                className="reveal"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '18px',
                  padding: '24px 28px',
                  transition: 'all 0.3s ease',
                }}
              >
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#F5F5F7', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#8B8B9E', lineHeight: 1.55 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
