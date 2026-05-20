import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

/* ── Industry Data ── */
interface ChatMessage {
  from: 'client' | 'sentinel';
  text: string;
}

interface Industry {
  id: string;
  label: string;
  conversations: ChatMessage[];
  resultTitle: string;
  resultDesc: string;
}

const industries: Industry[] = [
  {
    id: 'productos',
    label: 'Productos',
    resultTitle: 'Venta realizada',
    resultDesc: 'Zapatillas talle 42 · USD 80',
    conversations: [
      { from: 'client', text: 'Hola, ¿tenés talle 42?' },
      { from: 'sentinel', text: 'Sí, hay stock. ¿Lo querés para retirar o envío?' },
      { from: 'client', text: 'Envío a Palermo.' },
      { from: 'sentinel', text: 'Perfecto. Envío gratis a Palermo. Te reservo el talle 42 y te paso el link de pago.' },
      { from: 'client', text: 'Listo, ya pagué.' },
      { from: 'sentinel', text: 'Excelente, recibimos el pago. Mañana despachamos 🚀' }
    ],
  },
  {
    id: 'inmobiliarias',
    label: 'Inmobiliarias',
    resultTitle: 'Visita agendada',
    resultDesc: 'Cliente calificado · Depto Palermo',
    conversations: [
      { from: 'client', text: 'Busco depto en Palermo, 2 ambientes.' },
      { from: 'sentinel', text: 'Perfecto. ¿Comprar o alquilar? ¿Y en qué rango de presupuesto estás?' },
      { from: 'client', text: 'Comprar. Hasta USD 140.000.' },
      { from: 'sentinel', text: 'Tenemos opciones que encajan. Te dejo el link para agendar una visita esta semana.' },
      { from: 'client', text: 'Agendé para el jueves.' },
      { from: 'sentinel', text: 'Turno confirmado. Nos vemos el jueves.' }
    ],
  },
  {
    id: 'autos',
    label: 'Autos',
    resultTitle: 'Reserva tomada',
    resultDesc: '7 días de alquiler · USD 1.000',
    conversations: [
      { from: 'client', text: 'Necesito un auto premium por una semana.' },
      { from: 'sentinel', text: 'Perfecto. ¿Para qué fechas y en qué zona lo retirás?' },
      { from: 'client', text: 'Del lunes al domingo, en CABA.' },
      { from: 'sentinel', text: 'Hay disponibilidad. Te dejo el link para abonar la seña y bloquear la fecha.' },
      { from: 'client', text: 'Ya pagué la seña.' },
      { from: 'sentinel', text: 'Reserva confirmada por 7 días. Te esperamos el lunes.' }
    ],
  },
  {
    id: 'cursos',
    label: 'Cursos',
    resultTitle: 'Llamada agendada',
    resultDesc: 'Programa USD 3.000',
    conversations: [
      { from: 'client', text: 'Me interesa el programa, ¿cuánto sale?' },
      { from: 'sentinel', text: 'Te paso la info. Antes: ¿buscás aprender desde cero o ya tenés experiencia?' },
      { from: 'client', text: 'Ya tengo experiencia y quiero escalar.' },
      { from: 'sentinel', text: 'Perfecto. Por tu perfil, te conviene una llamada para ver si aplicás. Agendá acá.' },
      { from: 'client', text: 'Ahí reservé.' },
      { from: 'sentinel', text: 'Llamada confirmada. Hablamos pronto.' }
    ],
  },
  {
    id: 'estetica',
    label: 'Medicina estética',
    resultTitle: 'Turno reservado',
    resultDesc: 'Consulta estética · Seña tomada',
    conversations: [
      { from: 'client', text: 'Hola, quiero hacerme limpieza facial.' },
      { from: 'sentinel', text: 'Perfecto. ¿Buscás limpieza profunda, hidratación o tratamiento antiage?' },
      { from: 'client', text: 'Limpieza profunda.' },
      { from: 'sentinel', text: 'Tenemos turno disponible esta semana. Te dejo el link para pagar la seña y reservar.' },
      { from: 'client', text: 'Listo, seña pagada.' },
      { from: 'sentinel', text: 'Turno reservado con éxito. Te esperamos ✨' }
    ],
  },
  {
    id: 'servicios',
    label: 'Servicios B2B',
    resultTitle: 'Reunión agendada',
    resultDesc: 'Oportunidad estimada · USD 3.000',
    conversations: [
      { from: 'client', text: 'Necesito mejorar mis ventas por WhatsApp.' },
      { from: 'sentinel', text: 'Perfecto. ¿Cuántas consultas reciben por día aproximadamente?' },
      { from: 'client', text: 'Entre 40 y 60.' },
      { from: 'sentinel', text: 'Hay mucho para optimizar. Te dejo mi calendario para agendar un diagnóstico.' },
      { from: 'client', text: 'Agendado para el martes.' },
      { from: 'sentinel', text: '¡Excelente! El martes analizamos tu proceso comercial.' }
    ],
  },
];

export const WhatIsSentinel = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [visibleMsgs, setVisibleMsgs] = useState<ChatMessage[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [chatFading, setChatFading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progressStep, setProgressStep] = useState(0); // 0, 1, 2, 3 (done)
  const [showResult, setShowResult] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const timerRefs = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = useCallback(() => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  }, []);

  // Animate messages sequentially
  const animateConversation = useCallback((industry: Industry) => {
    clearTimers();
    setVisibleMsgs([]);
    setShowTyping(false);
    setProgressStep(0);
    setShowResult(false);

    let delay = 600;
    const msgs = industry.conversations;

    msgs.forEach((msg, index) => {
      if (msg.from === 'sentinel') {
        const typingTimer = setTimeout(() => setShowTyping(true), delay);
        timerRefs.current.push(typingTimer);
        delay += 800; // Type fast 0.8s
      }

      const msgTimer = setTimeout(() => {
        setShowTyping(false);
        setVisibleMsgs(prev => [...prev, msg]);

        if (index === 0) setProgressStep(1); // Client intent
        if (index === 1) setProgressStep(2); // Sentinel responded
        if (index === msgs.length - 1) {
          setProgressStep(3); // Closed action
          setShowResult(true);
        }

      }, delay);
      timerRefs.current.push(msgTimer);
      
      delay += msg.from === 'client' ? 1400 : 2000; 
    });
  }, [clearTimers]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    animateConversation(industries[activeIndustry]);
    return clearTimers;
  }, [isVisible, activeIndustry, animateConversation, clearTimers]);

  // Auto scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleMsgs, showTyping]);

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
      style={{ background: '#020202', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '72px 0' }}
    >
      <div className="container-custom relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-8 px-[24px]">
          <h2 style={{ fontSize: 'clamp(32px, 8vw, 42px)', fontWeight: 800, color: '#F5F5F7', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '12px' }}>
            Elegí tu rubro y mirá cómo vende Sentinel.
          </h2>
          <p style={{ fontSize: '17px', color: '#8B8B9E', lineHeight: 1.45, maxWidth: '400px', margin: '0 auto' }}>
            Cada demo termina con una acción comercial concreta: venta, reserva, turno o llamada.
          </p>
        </div>

        {/* Tabs */}
        <div className="w-full overflow-hidden mb-6 relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 px-4 gap-2" style={{ WebkitOverflowScrolling: 'touch' }}>
            {industries.map((ind, i) => {
              const active = i === activeIndustry;
              return (
                <button
                  key={ind.id}
                  onClick={() => switchIndustry(i)}
                  className="snap-start shrink-0 flex items-center gap-2 px-5 py-3 transition-all duration-300"
                  style={{
                    background: active ? 'rgba(24,93,232,0.1)' : 'rgba(255,255,255,0.03)',
                    border: active ? '1px solid rgba(24,93,232,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '100px',
                    color: active ? '#185de8' : '#7D8195',
                    fontSize: '15px',
                    fontWeight: 600,
                  }}
                >
                  {active && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#185de8' }} />}
                  {ind.label}
                </button>
              );
            })}
          </div>
          <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[#020202] to-transparent pointer-events-none" />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-2 mb-6 w-full max-w-[400px] px-6">
          <ProgressStep label="Detectó intención" active={progressStep >= 1} />
          <div className="h-[1px] flex-1 bg-white/10" />
          <ProgressStep label="Respondió objeción" active={progressStep >= 2} />
          <div className="h-[1px] flex-1 bg-white/10" />
          <ProgressStep label="Cerró acción" active={progressStep >= 3} />
        </div>

        {/* Chat Phone */}
        <div className="w-full max-w-[400px] px-4">
          <div
            style={{
              background: '#050505',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              position: 'relative'
            }}
          >
            {/* Header */}
            <div style={{
              background: '#0A0A0F',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div className="relative">
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#111', border: '1px solid rgba(24,93,232,0.2)' }} />
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#185de8] border-2 border-[#0A0A0F]" />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#F5F5F7' }}>Sentinel</div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#185de8', letterSpacing: '0.05em' }}>OPERATIVO 24/7</div>
              </div>
            </div>

            {/* Chat Body */}
            <div
              ref={chatContainerRef}
              className="p-5 flex flex-col gap-4 overflow-y-auto hide-scrollbar scroll-smooth relative"
              style={{ height: '360px' }}
            >
              <div
                className="absolute inset-0 z-50 transition-opacity duration-300 pointer-events-none bg-[#050505]"
                style={{ opacity: chatFading ? 1 : 0 }}
              />

              <AnimatePresence>
                {visibleMsgs.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.from === 'client' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.from === 'sentinel' && (
                      <div className="w-6 h-6 rounded-full bg-[#111] shrink-0 mr-2 mt-auto mb-1 border border-white/5" />
                    )}
                    <div
                      style={{
                        padding: '12px 16px',
                        borderRadius: '16px',
                        borderBottomLeftRadius: msg.from === 'sentinel' ? '4px' : '16px',
                        borderBottomRightRadius: msg.from === 'client' ? '4px' : '16px',
                        maxWidth: '85%',
                        fontSize: '14px',
                        lineHeight: 1.5,
                        color: msg.from === 'client' ? '#FFF' : '#A0A0B5',
                        background: msg.from === 'client' ? '#185de8' : '#0A0A0F',
                        border: msg.from === 'sentinel' ? '1px solid rgba(24,93,232,0.2)' : 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {showTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-[#111] shrink-0 mr-2 mt-auto mb-1 border border-white/5" />
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '16px',
                      borderBottomLeftRadius: '4px',
                      background: '#0A0A0F',
                      border: '1px solid rgba(24,93,232,0.2)',
                    }}
                  >
                    <div className="flex gap-1.5">
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-[#8B8B9E]" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} className="w-1.5 h-1.5 rounded-full bg-[#8B8B9E]" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-[#8B8B9E]" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Result Card */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="mt-2 w-full"
                >
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(24,93,232,0.1), rgba(24,93,232,0.05))',
                    border: '1px solid rgba(24,93,232,0.3)',
                    borderRadius: '16px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div className="bg-[#185de8]/20 rounded-full p-2">
                      <CheckCircle2 className="w-6 h-6 text-[#185de8]" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#F5F5F7', marginBottom: '2px' }}>
                        {industries[activeIndustry].resultTitle}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#A0A0B5' }}>
                        {industries[activeIndustry].resultDesc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Progress Step Component
const ProgressStep = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div 
      className="w-2.5 h-2.5 rounded-full transition-colors duration-300"
      style={{ background: active ? '#185de8' : 'rgba(255,255,255,0.1)' }}
    />
    <span 
      className="text-center transition-colors duration-300"
      style={{ 
        fontSize: '10px', 
        fontWeight: active ? 700 : 500, 
        textTransform: 'uppercase', 
        color: active ? '#F5F5F7' : '#7D8195',
        maxWidth: '70px',
        lineHeight: 1.1
      }}
    >
      {label}
    </span>
  </div>
);
