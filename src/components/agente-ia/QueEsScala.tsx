import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Industry Data ── */
interface ChatMessage {
  from: 'client' | 'sentinel';
  text: string;
  timestamp: string;
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
      { from: 'client', text: 'Hola, vi un producto en Instagram. ¿Me pasás precio?', timestamp: '10:24' },
      { from: 'sentinel', text: '¡Hola! Sí claro. ¿De cuál de todos los que subimos hoy?', timestamp: '10:24' },
      { from: 'client', text: 'Las zapatillas blancas con suela alta. Soy de Palermo.', timestamp: '10:25' },
      { from: 'sentinel', text: '¡Perfecto! Son las Urban Flow. Tenemos stock. El envío a Palermo es gratis. ¿Qué talle buscás?', timestamp: '10:25' },
      { from: 'client', text: 'Talle 42. ¿Tardan mucho en llegar?', timestamp: '10:26' },
      { from: 'sentinel', text: 'Si comprás hoy antes de las 14hs, te llegan mañana. Te dejo el link de pago seguro: Link de Pago', timestamp: '10:26' },
      { from: 'client', text: 'Ahí lo pagué!', timestamp: '10:28' },
      { from: 'sentinel', text: '¡Pago recibido! Ya estamos preparando tu pedido. Te aviso apenas salga. ¡Gracias!', timestamp: '10:28' },
    ],
  },
  {
    id: 'inmobiliarias',
    label: 'Inmobiliarias',
    conversations: [
      { from: 'client', text: 'Hola, ¿sigue disponible el departamento de 2 ambientes de Belgrano?', timestamp: '11:15' },
      { from: 'sentinel', text: '¡Hola! Sí, sigue disponible. Es súper luminoso. ¿Lo buscás para vivir o para inversión?', timestamp: '11:15' },
      { from: 'client', text: 'Para vivir. Mi contrato se vence en dos meses.', timestamp: '11:16' },
      { from: 'sentinel', text: 'Ideal entonces. ¿Tenés garantía o seguro de caución aprobado?', timestamp: '11:16' },
      { from: 'client', text: 'Tengo seguro de caución. ¿Se puede ir a ver mañana?', timestamp: '11:17' },
      { from: 'sentinel', text: '¡Excelente! Sí, mañana hay disponibilidad por la tarde. Elegí tu horario en este link y te reservo el lugar: Calendario', timestamp: '11:17' },
      { from: 'client', text: 'Listo, elegí a las 16hs.', timestamp: '11:19' },
      { from: 'sentinel', text: '¡Agendado! Nos vemos mañana a las 16hs en la puerta. Te mando los detalles al mail.', timestamp: '11:19' },
    ],
  },
  {
    id: 'autos',
    label: 'Autos',
    conversations: [
      { from: 'client', text: 'Hola, quería consultar por alquiler de un auto.', timestamp: '14:30' },
      { from: 'sentinel', text: '¡Hola! Te ayudo con eso. ¿Para qué fecha lo necesitás y por cuántos días?', timestamp: '14:30' },
      { from: 'client', text: 'Del viernes al domingo. Busco algo deportivo si tienen.', timestamp: '14:31' },
      { from: 'sentinel', text: '¡Buena elección! Para este finde tenemos un Audi A5 y un BMW Serie 4. ¿Te gusta alguno de esos?', timestamp: '14:31' },
      { from: 'client', text: 'El BMW está perfecto. ¿Qué incluye?', timestamp: '14:32' },
      { from: 'sentinel', text: 'Viene con seguro a todo riesgo y 500km libres. Para bloquear la reserva necesito una seña en este link: Link de Seña', timestamp: '14:32' },
      { from: 'client', text: 'Listo, seña transferida.', timestamp: '14:35' },
      { from: 'sentinel', text: '¡Reserva confirmada! El viernes a las 10hs te esperamos en la sucursal.', timestamp: '14:35' },
    ],
  },
  {
    id: 'cursos',
    label: 'Cursos',
    conversations: [
      { from: 'client', text: 'Hola, quería info del curso de programación.', timestamp: '09:10' },
      { from: 'sentinel', text: '¡Hola! Te paso info. ¿Ya tenés experiencia o arrancás desde cero?', timestamp: '09:10' },
      { from: 'client', text: 'Arranco de cero, mi idea es conseguir trabajo de esto.', timestamp: '09:11' },
      { from: 'sentinel', text: 'Entiendo perfecto. Nuestro curso Full-Stack desde cero es ideal. ¿Te interesa que te cuente cómo es la cursada?', timestamp: '09:11' },
      { from: 'client', text: 'Sí, ¿cuánto dura y qué precio tiene?', timestamp: '09:12' },
      { from: 'sentinel', text: 'Dura 4 meses. Cuesta 3 cuotas de $50.000. Te paso el link de inscripción directa: Link de Inscripción', timestamp: '09:12' },
      { from: 'client', text: 'Dale, ya me anoté.', timestamp: '09:15' },
      { from: 'sentinel', text: '¡Bienvenido/a al curso! Ya te mandé el acceso a la plataforma al mail. Empezamos el lunes 🚀', timestamp: '09:15' },
    ],
  },
  {
    id: 'estetica',
    label: 'Estética',
    conversations: [
      { from: 'client', text: 'Hola, quería saber precio de limpieza facial y botox.', timestamp: '16:45' },
      { from: 'sentinel', text: '¡Hola! Te paso los valores. ¿Sería tu primera vez haciéndote estos tratamientos?', timestamp: '16:45' },
      { from: 'client', text: 'Limpieza me hice, botox sería la primera vez.', timestamp: '16:46' },
      { from: 'sentinel', text: '¡Súper normal! Para botox usamos marcas premium y es muy sutil. La doctora te evalúa sin cargo. ¿Agendamos?', timestamp: '16:46' },
      { from: 'client', text: 'Dale me parece bien. Tienen lugar el jueves?', timestamp: '16:47' },
      { from: 'sentinel', text: 'Sí, nos queda el jueves a las 17:30 o a las 19:00. Podés reservarlo acá: Link Turnos', timestamp: '16:47' },
      { from: 'client', text: 'Agendé el de las 17:30.', timestamp: '16:50' },
      { from: 'sentinel', text: '¡Turno confirmado! Te esperamos el jueves a las 17:30. Te va a encantar el resultado ✨', timestamp: '16:50' },
    ],
  },
  {
    id: 'servicios',
    label: 'Servicios',
    conversations: [
      { from: 'client', text: 'Hola, necesito ayuda con las ventas de mi empresa.', timestamp: '10:00' },
      { from: 'sentinel', text: '¡Hola! Llegaste al lugar indicado. ¿Hoy qué sistema están usando para recibir consultas?', timestamp: '10:00' },
      { from: 'client', text: 'WhatsApp pero tardamos en responder y perdemos clientes.', timestamp: '10:01' },
      { from: 'sentinel', text: 'Es el problema #1 que resolvemos automatizando con IA. ¿Cuántos leads reciben al mes?', timestamp: '10:01' },
      { from: 'client', text: 'Unos 500 aprox. Necesito urgente ordenarlo.', timestamp: '10:02' },
      { from: 'sentinel', text: 'Con ese volumen el impacto es inmediato. Te dejo este link para agendar un diagnóstico y armarte un plan: Calendario', timestamp: '10:02' },
      { from: 'client', text: 'Agendado para mañana.', timestamp: '10:05' },
      { from: 'sentinel', text: '¡Excelente! Mañana nos vemos en la videollamada para mostrarte la solución funcionando.', timestamp: '10:05' },
    ],
  },
];

/* ── Sub Components ── */
const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-3">
    <div className="bg-[#0A0A0F] border border-[#185de8]/20 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-[#8B8B9E]"
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  </div>
);

const ChatBubble = ({ type, text, timestamp }: { type: 'client' | 'sentinel'; text: string; timestamp: string }) => {
  const isUser = type === 'client';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col mb-3 ${isUser ? 'items-end' : 'items-start'}`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 text-[14px] leading-[1.5] ${
          isUser
            ? 'bg-[#185de8] text-white rounded-2xl rounded-br-sm'
            : 'bg-[#0A0A0F] border border-[#185de8]/20 text-[#A0A0B5] rounded-2xl rounded-bl-sm'
        }`}
      >
        {text}
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="text-[10px] text-white/30 mt-1.5 px-1"
      >
        {timestamp}
      </motion.span>
    </motion.div>
  );
};

/* ── Main Component ── */
export const WhatIsSentinel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [visibleMsgs, setVisibleMsgs] = useState<ChatMessage[]>([]);
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

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleMsgs, showTyping]);

  // Animate messages sequentially
  const animateConversation = useCallback((msgs: ChatMessage[]) => {
    clearTimers();
    setVisibleMsgs([]);
    setShowTyping(false);

    let delay = 300;
    msgs.forEach((msg) => {
      if (msg.from === 'sentinel') {
        const typingTimer = setTimeout(() => setShowTyping(true), delay);
        timerRefs.current.push(typingTimer);
        delay += 1200; // time typing
      }

      const msgTimer = setTimeout(() => {
        setShowTyping(false);
        setVisibleMsgs(prev => [...prev, msg]);
      }, delay);
      timerRefs.current.push(msgTimer);
      delay += msg.from === 'client' ? 800 : 500;
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
            Cada negocio tiene preguntas, objeciones y procesos distintos. Sentinel se entrena con la información de tu empresa para responder con tu tono y agendar o vender.
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

        {/* Chat Mockup - MATCHING EMPLEADO-IA ESTHETIC */}
        <div 
          className="w-full max-w-[500px] mx-auto reveal relative shadow-[0_0_100px_rgba(24,93,232,0.1)]"
          style={{
            opacity: chatFading ? 0 : 1,
            transform: chatFading ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          <div
            className="flex flex-col w-full h-[450px] rounded-3xl border border-white/[0.04] bg-[#020202] overflow-hidden select-none relative z-10"
            style={{
              fontFamily: 'var(--font-primary), Inter, system-ui, sans-serif',
            }}
          >
            {/* Glows */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#185de8]/15 blur-[60px] pointer-events-none rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#6bdda1]/10 blur-[80px] pointer-events-none rounded-full" />

            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.04] flex-shrink-0 relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-[#0A0A0F] border border-white/[0.06] flex items-center justify-center shadow-[0_0_15px_rgba(107,221,161,0.2)]">
                  <div className="w-4 h-4 rounded-full bg-[#6bdda1] animate-pulse" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-white tracking-wide">Sentinel</div>
                  <div className="text-[11px] text-[#6bdda1] font-medium tracking-wider uppercase">Operativo 24/7</div>
                </div>
              </div>
              <div className="flex gap-1.5 opacity-50">
                <div className="w-1.5 h-1.5 rounded-full bg-[#185de8]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#185de8]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#185de8]" />
              </div>
            </div>

            {/* Message Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: 'none' }}>
              <AnimatePresence>
                {visibleMsgs.map((msg, i) => (
                  <ChatBubble
                    key={`${activeIndustry}-${i}`}
                    type={msg.from}
                    text={msg.text}
                    timestamp={msg.timestamp}
                  />
                ))}
              </AnimatePresence>
              
              <AnimatePresence>
                {showTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-3 px-5 py-2.5 border-t border-white/[0.04] flex-shrink-0 relative z-10 bg-[#020202]">
              <div className="flex-1 bg-[#0A0A0F] border border-white/[0.06] rounded-full px-4 py-2 text-[12px] text-white/20">
                Escribiendo...
              </div>
            </div>
          </div>
        </div>

        {/* Capability Cards — compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-[700px] mt-10 reveal-stagger px-4">
          {[
            { title: 'Responde', desc: 'Atiende consultas incluso cuando tu equipo no está.' },
            { title: 'Califica', desc: 'Detecta si el cliente tiene intención real.' },
            { title: 'Vende', desc: 'Envía links de pago de forma autónoma.' },
            { title: 'Agenda', desc: 'Sincroniza reuniones en el calendario.' },
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
    </section>
  );
};
