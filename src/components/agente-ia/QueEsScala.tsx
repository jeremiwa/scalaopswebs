import { useRef, useEffect, useState, useCallback } from 'react';

/* ── Industry Data ── */
interface ChatMessage {
  from: 'client' | 'sentinel';
  text: string;
  chip?: string;
}

interface Industry {
  id: string;
  label: string;
  conversations: ChatMessage[];
}

const industries: Industry[] = [
  {
    id: 'productos',
    label: 'Productos',
    conversations: [
      { from: 'client', text: 'Hola, vi un producto en Instagram. ¿Me pasás precio?' },
      { from: 'sentinel', text: 'Hola, ¿cómo estás? Sí, te ayudo. ¿Cuál producto te interesó y para qué zona sería el envío?', chip: 'Responde' },
      { from: 'client', text: 'Las zapatillas blancas. Soy de Palermo.' },
      { from: 'sentinel', text: 'Perfecto. Te confirmo stock y envío. ¿Qué talle buscás?', chip: 'Califica' },
      { from: 'client', text: '42.' },
      { from: 'sentinel', text: 'Tenemos talle 42 disponible. ¿Querés que te pase el link de pago o preferís que te atienda una persona?', chip: 'Deriva' },
    ],
  },
  {
    id: 'inmobiliarias',
    label: 'Inmobiliarias',
    conversations: [
      { from: 'client', text: 'Hola, ¿sigue disponible el departamento de 2 ambientes?' },
      { from: 'sentinel', text: 'Hola, ¿cómo estás? Te ayudo. ¿Lo buscás para vivir o para inversión?', chip: 'Responde' },
      { from: 'client', text: 'Para vivir.' },
      { from: 'sentinel', text: '¿En qué zona estás buscando y cuál es tu presupuesto aproximado?', chip: 'Califica' },
      { from: 'client', text: 'Palermo o Belgrano, hasta 700 dólares.' },
      { from: 'sentinel', text: 'Perfecto. Te derivo con un asesor para coordinar horarios disponibles y enviarte los requisitos.', chip: 'Agenda' },
    ],
  },
  {
    id: 'autos',
    label: 'Autos',
    conversations: [
      { from: 'client', text: 'Hola, quería consultar por el alquiler de un auto premium.' },
      { from: 'sentinel', text: 'Hola, ¿cómo estás? Te ayudo. ¿Para qué fecha lo necesitás y por cuántos días?', chip: 'Responde' },
      { from: 'client', text: 'Del viernes al domingo.' },
      { from: 'sentinel', text: '¿Buscás algo deportivo, SUV o más ejecutivo?', chip: 'Califica' },
      { from: 'client', text: 'Algo deportivo.' },
      { from: 'sentinel', text: 'Te puedo mostrar opciones y derivarte con un asesor para confirmar precio, garantía y reserva.', chip: 'Deriva' },
    ],
  },
  {
    id: 'cursos',
    label: 'Cursos',
    conversations: [
      { from: 'client', text: 'Hola, quería info del curso.' },
      { from: 'sentinel', text: 'Hola, ¿cómo estás? ¿Ya tenés experiencia en el tema o arrancás desde cero?', chip: 'Responde' },
      { from: 'client', text: 'Arranco desde cero.' },
      { from: 'sentinel', text: '¿Tu idea es aprender por interés personal o querés usarlo para generar ingresos?', chip: 'Califica' },
      { from: 'client', text: 'Quiero aprender para generar ingresos.' },
      { from: 'sentinel', text: 'Tiene sentido que veas el programa completo. ¿Querés coordinar una llamada con un asesor?', chip: 'Agenda' },
    ],
  },
  {
    id: 'estetica',
    label: 'Estética',
    conversations: [
      { from: 'client', text: 'Hola, quería saber precio de botox.' },
      { from: 'sentinel', text: 'Hola, ¿cómo estás? El valor varía según la zona a tratar. ¿Es para frente, entrecejo u otra zona?', chip: 'Responde' },
      { from: 'client', text: 'Frente y entrecejo.' },
      { from: 'sentinel', text: '¿Ya te hiciste este tratamiento antes o sería tu primera vez?', chip: 'Califica' },
      { from: 'client', text: 'Primera vez.' },
      { from: 'sentinel', text: 'Lo ideal es coordinar una evaluación profesional. Te puedo ofrecer turnos esta semana.', chip: 'Agenda' },
    ],
  },
  {
    id: 'servicios',
    label: 'Servicios',
    conversations: [
      { from: 'client', text: 'Hola, quería saber cuánto cuesta el servicio.' },
      { from: 'sentinel', text: 'Hola, ¿cómo estás? Para pasarte algo serio, necesito entender qué estás buscando resolver.', chip: 'Responde' },
      { from: 'client', text: 'Necesito ordenar las consultas que me llegan por WhatsApp.' },
      { from: 'sentinel', text: '¿Hoy cuántas consultas reciben por día aproximadamente y quién las responde?', chip: 'Califica' },
      { from: 'client', text: 'Unas 40 por día. Las responde mi equipo, pero se atrasan.' },
      { from: 'sentinel', text: 'Tiene sentido evaluarlo. ¿Querés coordinar una llamada de 20 minutos con alguien del equipo?', chip: 'Agenda' },
    ],
  },
];

const chipColors: Record<string, string> = {
  Responde: '#6bdda1',
  Califica: '#60a5fa',
  Sigue: '#f59e0b',
  Agenda: '#a78bfa',
  Deriva: '#f472b6',
};

/* ── Typing Indicator ── */
const TypingIndicator = () => (
  <div
    className="self-end max-w-[85%] px-3 py-2.5 rounded-tl-xl rounded-bl-xl rounded-br-xl rounded-tr-sm"
    style={{ background: 'rgba(107,221,161,0.12)' }}
  >
    <div className="flex gap-1 items-center h-[18px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#6bdda1',
            opacity: 0.6,
            animation: `typingDot 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  </div>
);

/* ── Chip Badge ── */
const ChipBadge = ({ label, visible }: { label: string; visible: boolean }) => {
  const color = chipColors[label] || '#6bdda1';
  return (
    <div
      className="self-end"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.92)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '4px 12px',
          borderRadius: '100px',
          fontSize: '11px',
          fontWeight: 700,
          background: `${color}12`,
          border: `1px solid ${color}30`,
          color: color,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color }} />
        {label}
      </span>
    </div>
  );
};

/* ── Main Component ── */
export const WhatIsSentinel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [chatFading, setChatFading] = useState(false);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  // IO to trigger initial visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Clear all pending timers
  const clearTimers = useCallback(() => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  }, []);

  // Animate messages sequentially
  const animateConversation = useCallback((msgs: ChatMessage[]) => {
    clearTimers();
    setVisibleMsgs(0);
    setShowTyping(false);

    let delay = 300;
    msgs.forEach((msg, i) => {
      // If sentinel, show typing first
      if (msg.from === 'sentinel') {
        const typingTimer = setTimeout(() => setShowTyping(true), delay);
        timerRefs.current.push(typingTimer);
        delay += 600;
      }

      const msgTimer = setTimeout(() => {
        setShowTyping(false);
        setVisibleMsgs(i + 1);
      }, delay);
      timerRefs.current.push(msgTimer);
      delay += msg.from === 'client' ? 500 : 700;
    });
  }, [clearTimers]);

  // Start animation when visible or industry changes
  useEffect(() => {
    if (!isVisible) return;
    animateConversation(industries[activeIndustry].conversations);
    return clearTimers;
  }, [isVisible, activeIndustry, animateConversation, clearTimers]);

  // Switch industry with fade
  const switchIndustry = useCallback((index: number) => {
    if (index === activeIndustry) return;
    setChatFading(true);
    setTimeout(() => {
      setActiveIndustry(index);
      setChatFading(false);
    }, 250);
  }, [activeIndustry]);

  const currentMsgs = industries[activeIndustry].conversations;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ background: '#020202', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '80px 0 72px' }}
    >
      <div className="container-custom relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10 reveal px-4">
          <span style={{ display: 'block', marginBottom: '12px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6bdda1' }}>
            Qué es Sentinel
          </span>
          <h2 style={{ fontSize: 'clamp(24px, 4.5vw, 42px)', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '12px' }}>
            Elegí tu rubro y mirá cómo trabajaría Sentinel.
          </h2>
          <p style={{ fontSize: '16px', color: '#8B8B9E', lineHeight: 1.55, maxWidth: '540px', margin: '0 auto' }}>
            Cada negocio tiene preguntas, objeciones y procesos distintos. Sentinel se entrena con la información de tu empresa para responder con tu tono y derivar cuando corresponde.
          </p>
        </div>

        {/* Industry Selector */}
        <div className="w-full mb-6 reveal" style={{ overflow: 'hidden' }}>
          <div
            className="flex gap-2 pb-2 px-4 md:justify-center"
            style={{ overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {industries.map((ind, i) => (
              <button
                key={ind.id}
                onClick={() => switchIndustry(i)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 18px',
                  borderRadius: '100px',
                  fontSize: '13px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: activeIndustry === i ? 'rgba(107,221,161,0.10)' : 'rgba(255,255,255,0.03)',
                  border: activeIndustry === i ? '1px solid rgba(107,221,161,0.35)' : '1px solid rgba(255,255,255,0.08)',
                  color: activeIndustry === i ? '#6bdda1' : 'rgba(255,255,255,0.50)',
                  boxShadow: activeIndustry === i ? '0 0 16px rgba(107,221,161,0.08)' : 'none',
                }}
              >
                {activeIndustry === i && (
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6bdda1' }} />
                )}
                {ind.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Mockup */}
        <div className="w-full max-w-[420px] mx-auto reveal px-4">
          <div
            style={{
              background: '#0B141A',
              borderRadius: '22px',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              boxShadow: '0 16px 50px rgba(0,0,0,0.5), 0 0 24px rgba(107,221,161,0.03)',
              opacity: chatFading ? 0 : 1,
              transform: chatFading ? 'translateY(8px)' : 'translateY(0)',
              transition: 'opacity 0.25s ease, transform 0.25s ease',
            }}
          >
            {/* Chat Header */}
            <div className="flex items-center gap-[10px] px-4 py-[10px]" style={{ background: '#1F2C34', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span className="text-[14px]" style={{ color: '#8696A0' }}>←</span>
              <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center text-[12px] font-semibold shrink-0" style={{ background: '#6bdda1', color: '#000' }}>S</div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[14px] font-medium text-[#E9EDEF] truncate">Sentinel</span>
                <span className="text-[10px]" style={{ color: '#8696A0' }}>en línea · Demo para: {industries[activeIndustry].label}</span>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex flex-col gap-1.5 p-3"
              style={{
                minHeight: '300px',
                maxHeight: '380px',
                backgroundColor: '#0B141A',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              {currentMsgs.map((msg, i) => (
                <div key={`${activeIndustry}-${i}`}>
                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] px-3 py-2 text-[13px] leading-[1.45] ${
                      msg.from === 'client'
                        ? 'self-start rounded-tr-xl rounded-br-xl rounded-bl-xl rounded-tl-sm'
                        : 'self-end rounded-tl-xl rounded-bl-xl rounded-br-xl rounded-tr-sm ml-auto'
                    }`}
                    style={{
                      display: 'block',
                      width: 'fit-content',
                      background: msg.from === 'client' ? '#202C33' : 'rgba(107,221,161,0.12)',
                      color: '#E9EDEF',
                      opacity: i < visibleMsgs ? 1 : 0,
                      transform: i < visibleMsgs ? 'translateY(0)' : 'translateY(8px)',
                      transition: 'opacity 0.4s ease, transform 0.4s ease',
                      marginLeft: msg.from === 'sentinel' ? 'auto' : undefined,
                    }}
                  >
                    {msg.text}
                  </div>

                  {/* Chip */}
                  {msg.chip && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px', marginBottom: '4px' }}>
                      <ChipBadge label={msg.chip} visible={i < visibleMsgs} />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {showTyping && <TypingIndicator />}
            </div>
          </div>

          {/* Microcopy */}
          <p style={{
            textAlign: 'center',
            marginTop: '14px',
            fontSize: '11px',
            color: '#5A5A6E',
            fontStyle: 'italic',
            lineHeight: 1.5,
            maxWidth: '340px',
            margin: '14px auto 0',
          }}>
            Esto es solo una simulación. Sentinel se entrena con la información, tono y proceso real de tu negocio.
          </p>
        </div>

        {/* Capability Cards — compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-[700px] mt-10 reveal-stagger px-4">
          {[
            { title: 'Responde', desc: 'Atiende consultas incluso cuando tu equipo no está.' },
            { title: 'Califica', desc: 'Detecta si el cliente tiene intención real.' },
            { title: 'Sigue', desc: 'Vuelve a contactar oportunidades que se enfrían.' },
            { title: 'Deriva', desc: 'Pasa la conversación a una persona cuando corresponde.' },
          ].map((card) => (
            <div
              key={card.title}
              className="reveal"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                padding: '18px 16px',
              }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#6bdda1', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '12px', color: '#8B8B9E', lineHeight: 1.45 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Typing animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
      `}} />
    </section>
  );
};
