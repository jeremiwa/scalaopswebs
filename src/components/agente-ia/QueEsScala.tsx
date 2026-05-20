import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle2 } from 'lucide-react';

/* ── Industry Data ── */
interface ChatMessage {
  from: 'client' | 'sentinel';
  text: string;
  timestamp: string;
  triggerStep?: number; // 0, 1, 2
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
      { from: 'client', text: 'Hola, ¿tenés talle 42?', timestamp: '14:20', triggerStep: 0 },
      { from: 'sentinel', text: '¡Hola! Sí, nos queda el último par en 42. ¿Estabas buscando para retirar por el local o con envío?', timestamp: '14:20' },
      { from: 'client', text: 'Envío a Palermo.', timestamp: '14:21' },
      { from: 'sentinel', text: '¡Perfecto! El envío a Palermo es gratis superando los $50.000, así que te queda bonificado. ¿Querés que te reserve el par y te pase el link de pago?', timestamp: '14:21', triggerStep: 1 },
      { from: 'client', text: 'Dale, pasame el link así ya lo abono.', timestamp: '14:23' },
      { from: 'sentinel', text: 'Genial, te dejo el link acá: Link de Pago Seguro', timestamp: '14:23' },
      { from: 'client', text: 'Listo, ya lo pagué.', timestamp: '14:25' },
      { from: 'sentinel', text: 'Excelente, pago recibido. Mañana mismo te estamos despachando las zapatillas 🚀', timestamp: '14:25', triggerStep: 2 },
    ],
  },
  {
    id: 'inmobiliarias',
    label: 'Inmobiliarias',
    resultTitle: 'Visita agendada',
    resultDesc: 'Cliente calificado · Depto Palermo',
    conversations: [
      { from: 'client', text: 'Hola, vi un departamento de 2 ambientes en Palermo publicado, ¿sigue disponible?', timestamp: '11:05', triggerStep: 0 },
      { from: 'sentinel', text: '¡Hola! Sí, el 2 ambientes de la calle Güemes sigue disponible. ¿Buscabas para comprar o para alquilar?', timestamp: '11:05' },
      { from: 'client', text: 'Para comprar.', timestamp: '11:08' },
      { from: 'sentinel', text: 'Excelente. Te cuento que está USD 135.000 y es apto crédito. ¿En qué rango de presupuesto te estás manejando?', timestamp: '11:08', triggerStep: 1 },
      { from: 'client', text: 'Ando por los 130k-140k.', timestamp: '11:10' },
      { from: 'sentinel', text: 'Perfecto, encaja justo. Tenemos disponibilidad para mostrarlo este jueves o viernes por la tarde. Podés elegir el horario acá: Calendario de Visitas', timestamp: '11:10' },
      { from: 'client', text: 'Ahí agendé para el jueves.', timestamp: '11:15' },
      { from: 'sentinel', text: '¡Turno confirmado! Nos vemos el jueves. Te envié los detalles al mail.', timestamp: '11:15', triggerStep: 2 },
    ],
  },
  {
    id: 'autos',
    label: 'Autos',
    resultTitle: 'Reserva tomada',
    resultDesc: '7 días de alquiler · USD 1.000',
    conversations: [
      { from: 'client', text: 'Hola, quería alquilar una camioneta 4x4 por una semana.', timestamp: '15:30', triggerStep: 0 },
      { from: 'sentinel', text: '¡Hola! Claro que sí. Tenemos la Toyota Hilux y la VW Amarok. ¿Para qué fechas aproximadas la estarías necesitando?', timestamp: '15:30' },
      { from: 'client', text: 'Del 10 al 17 de este mes.', timestamp: '15:35' },
      { from: 'sentinel', text: 'Tenemos una Amarok automática disponible para esas fechas. ¿Dónde preferís retirarla: Ezeiza, Aeroparque o Microcentro?', timestamp: '15:35', triggerStep: 1 },
      { from: 'client', text: 'Ezeiza, que llego en vuelo al mediodía.', timestamp: '15:37' },
      { from: 'sentinel', text: 'Perfecto. Para congelar precio y dejar la unidad a tu nombre te pido abonar la reserva acá: Pagar Reserva', timestamp: '15:37' },
      { from: 'client', text: 'Ya pagué la reserva.', timestamp: '15:40' },
      { from: 'sentinel', text: '¡Reserva confirmada! Queda bloqueada para vos. Te esperamos en Ezeiza el 10 al mediodía.', timestamp: '15:40', triggerStep: 2 },
    ],
  },
  {
    id: 'cursos',
    label: 'Cursos',
    resultTitle: 'Inscripción confirmada',
    resultDesc: 'Programa Full-Stack · USD 150',
    conversations: [
      { from: 'client', text: 'Hola, me interesa la formación en programación.', timestamp: '09:10', triggerStep: 0 },
      { from: 'sentinel', text: '¡Hola! Qué bueno que quieras sumarte. Contame un poco, ¿estás buscando arrancar de cero o ya tenés algo de experiencia?', timestamp: '09:10' },
      { from: 'client', text: 'De cero, no sé nada pero quiero cambiar de rubro.', timestamp: '09:11' },
      { from: 'sentinel', text: 'Entiendo perfecto. Nuestro curso Full-Stack desde cero es ideal. ¿Te interesa que te cuente cómo es la cursada?', timestamp: '09:11', triggerStep: 1 },
      { from: 'client', text: 'Sí, ¿cuánto dura y qué precio tiene?', timestamp: '09:12' },
      { from: 'sentinel', text: 'Dura 4 meses. Cuesta 3 cuotas de $50.000. Te paso el link de inscripción directa: Link de Inscripción', timestamp: '09:12' },
      { from: 'client', text: 'Dale, ya me anoté.', timestamp: '09:15' },
      { from: 'sentinel', text: '¡Bienvenido/a al curso! Ya te mandé el acceso a la plataforma al mail. Empezamos el lunes 🚀', timestamp: '09:15', triggerStep: 2 },
    ],
  },
  {
    id: 'estetica',
    label: 'Medicina Estética',
    resultTitle: 'Turno reservado',
    resultDesc: 'Consulta estética · Seña tomada',
    conversations: [
      { from: 'client', text: 'Hola, quería saber precio de limpieza facial y botox.', timestamp: '16:45', triggerStep: 0 },
      { from: 'sentinel', text: '¡Hola! Te paso los valores. ¿Sería tu primera vez haciéndote estos tratamientos?', timestamp: '16:45' },
      { from: 'client', text: 'Limpieza me hice, botox sería la primera vez.', timestamp: '16:46' },
      { from: 'sentinel', text: '¡Súper normal! Para botox usamos marcas premium y es muy sutil. La doctora te evalúa sin cargo. ¿Agendamos?', timestamp: '16:46', triggerStep: 1 },
      { from: 'client', text: 'Dale me parece bien. Tienen lugar el jueves?', timestamp: '16:47' },
      { from: 'sentinel', text: 'Sí, nos queda el jueves a las 17:30 o a las 19:00. Podés reservarlo acá: Link Turnos', timestamp: '16:47' },
      { from: 'client', text: 'Agendé el de las 17:30.', timestamp: '16:50' },
      { from: 'sentinel', text: '¡Turno confirmado! Te esperamos el jueves a las 17:30. Te va a encantar el resultado ✨', timestamp: '16:50', triggerStep: 2 },
    ],
  },
];

/* ── Sub Components ── */
const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-3 px-2">
    <div className="bg-[#FFFFFF] border border-black/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-[6px] h-[6px] rounded-full bg-[#8B8B9E]"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
        />
      ))}
    </div>
  </div>
);

const ChatBubble = ({ type, text, timestamp }: { type: 'client' | 'sentinel'; text: string; timestamp: string }) => {
  const isClient = type === 'client';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col mb-3 px-2 ${isClient ? 'items-end' : 'items-start'}`}
    >
      <div
        className={`max-w-[85%] px-4 py-2.5 text-[14px] leading-[1.4] shadow-sm relative ${
          isClient
            ? 'bg-[#E7FFDB] text-[#111B21] rounded-2xl rounded-tr-sm'
            : 'bg-[#FFFFFF] text-[#111B21] rounded-2xl rounded-tl-sm'
        }`}
      >
        {text}
        <div className="flex items-center justify-end gap-1 mt-1 -mb-1">
          <span className="text-[10px] text-black/40 font-medium">
            {timestamp}
          </span>
          {isClient && (
            <div className="flex">
              <Check className="w-3 h-3 text-[#53BDEB] -mr-1.5" strokeWidth={3} />
              <Check className="w-3 h-3 text-[#53BDEB]" strokeWidth={3} />
            </div>
          )}
        </div>
      </div>
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
  const [showResult, setShowResult] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const clearTimers = useCallback(() => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleMsgs, showTyping, showResult]);

  const animateConversation = useCallback((industry: Industry) => {
    clearTimers();
    setVisibleMsgs([]);
    setShowTyping(false);
    setShowResult(false);
    setActiveStep(-1);

    let delay = 600;
    const msgs = industry.conversations;

    msgs.forEach((msg, index) => {
      if (msg.from === 'sentinel') {
        const typingTimer = setTimeout(() => setShowTyping(true), delay);
        timerRefs.current.push(typingTimer);
        delay += 1000;
      }

      const msgTimer = setTimeout(() => {
        setShowTyping(false);
        setVisibleMsgs(prev => [...prev, msg]);
        if (msg.triggerStep !== undefined) {
          setActiveStep(msg.triggerStep);
        }
        
        if (index === msgs.length - 1) {
          setShowResult(true);
        }
      }, delay);
      timerRefs.current.push(msgTimer);
      
      delay += msg.from === 'client' ? 1200 : 1800; 
    });
  }, [clearTimers]);

  useEffect(() => {
    if (!isVisible) return;
    animateConversation(industries[activeIndustry]);
    return clearTimers;
  }, [isVisible, activeIndustry, animateConversation, clearTimers]);

  const switchIndustry = useCallback((index: number) => {
    if (index === activeIndustry) return;
    setChatFading(true);
    setTimeout(() => {
      setActiveIndustry(index);
      setChatFading(false);
    }, 250);
  }, [activeIndustry]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-[80px] lg:py-[120px] overflow-hidden">
      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[1100px] mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ color: 'rgba(0,212,170,0.8)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif', marginBottom: '16px', textAlign: 'center' }}>
          EN VIVO
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 15 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-4"
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(30px, 7vw, 56px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
          Mirá cómo vende Sentinel<br />en tu rubro.
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mb-10"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 3.5vw, 18px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: '560px' }}>
          Cada demo termina con una acción comercial concreta. Pasá el dedo para cambiar de rubro.
        </motion.p>

        {/* Industry Selector */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full mb-8 overflow-hidden">
          <div className="flex gap-2 pb-2 px-4 md:justify-center" style={{ overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            {industries.map((ind, i) => (
              <button key={ind.id} onClick={() => switchIndustry(i)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.3s ease',
                  background: activeIndustry === i ? 'rgba(0,212,170,0.1)' : 'rgba(255,255,255,0.03)',
                  border: activeIndustry === i ? '1px solid rgba(0,212,170,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  color: activeIndustry === i ? '#00D4AA' : 'rgba(255,255,255,0.5)',
                  boxShadow: activeIndustry === i ? '0 0 16px rgba(0,212,170,0.15)' : 'none',
                }}>
                {ind.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Chat Mockup */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full max-w-[420px] mx-auto relative"
          style={{ opacity: chatFading ? 0 : 1, transform: chatFading ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 0.25s ease, transform 0.25s ease' }}>
          
          <div className="flex flex-col w-full h-[580px] rounded-[32px] overflow-hidden select-none relative z-10 shadow-2xl"
            style={{ border: '8px solid #111B21', background: '#E5DDD5', fontFamily: 'Inter, system-ui, sans-serif' }}>
            
            {/* WhatsApp Texture overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply" 
              style={{ backgroundImage: 'url("https://w0.peakpx.com/wallpaper/433/59/HD-wallpaper-whatsapp-bg-pattern-texture-lines.jpg")', backgroundSize: 'cover' }} />

            {/* Header WhatsApp */}
            <div className="flex flex-col flex-shrink-0 relative z-10">
              <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54] text-white shadow-md">
                <div className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                  <div className="w-full h-full bg-[#128C7E] flex items-center justify-center text-[16px] font-bold">S</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-bold truncate">Sentinel · {industries[activeIndustry].label}</div>
                  <div className="text-[12px] text-white/80 truncate">en línea</div>
                </div>
              </div>
              
              {/* Progress Steps Indicator */}
              <div className="flex items-center justify-between px-4 py-2 bg-white/95 border-b border-black/5 shadow-sm text-[10px] font-bold uppercase tracking-wider text-black/30">
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${activeStep >= 0 ? 'bg-[#00D4AA] shadow-[0_0_8px_#00D4AA]' : 'bg-black/10'}`} />
                  <span className={activeStep >= 0 ? 'text-[#00D4AA]' : ''}>Intención</span>
                </div>
                <div className={`w-8 h-[2px] transition-colors duration-500 ${activeStep >= 1 ? 'bg-[#00D4AA]' : 'bg-black/5'}`} />
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${activeStep >= 1 ? 'bg-[#00D4AA] shadow-[0_0_8px_#00D4AA]' : 'bg-black/10'}`} />
                  <span className={activeStep >= 1 ? 'text-[#00D4AA]' : ''}>Objeción</span>
                </div>
                <div className={`w-8 h-[2px] transition-colors duration-500 ${activeStep >= 2 ? 'bg-[#00D4AA]' : 'bg-black/5'}`} />
                <div className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${activeStep >= 2 ? 'bg-[#00D4AA] shadow-[0_0_8px_#00D4AA]' : 'bg-black/10'}`} />
                  <span className={activeStep >= 2 ? 'text-[#00D4AA]' : ''}>Cierre</span>
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto py-4 relative z-10" style={{ scrollbarWidth: 'none' }}>
              <AnimatePresence>
                {visibleMsgs.map((msg, i) => (
                  <ChatBubble key={`${activeIndustry}-${i}`} type={msg.from} text={msg.text} timestamp={msg.timestamp} />
                ))}
              </AnimatePresence>
              
              <AnimatePresence>
                {showTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result Overlay Card */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-4 mt-4 mb-2"
                >
                  <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
                    <div className="bg-[#00D4AA]/20 rounded-full p-2 shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-[#00D4AA]" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#111B21', marginBottom: '2px', fontFamily: 'Saira, sans-serif' }}>
                        {industries[activeIndustry].resultTitle}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#667781', fontWeight: 500 }}>
                        {industries[activeIndustry].resultDesc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Fake input area */}
            <div className="bg-[#F0F2F5] px-2 py-2 flex gap-2 shrink-0 relative z-10 items-center">
              <div className="flex-1 bg-white rounded-full h-[40px] px-4 flex items-center">
                <span className="text-black/30 text-[14px]">Mensaje...</span>
              </div>
              <div className="w-[40px] h-[40px] rounded-full bg-[#00A884] flex items-center justify-center shrink-0">
                <div className="w-3 h-3 border-t-2 border-r-2 border-white transform rotate-45 -ml-1" />
              </div>
            </div>

          </div>
        </motion.div>
        
        {/* Call to action */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 1.2 }} className="mt-10">
           <a href="/formulario" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '56px', padding: '0 32px', borderRadius: '999px', background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)', fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '16px', color: '#020403', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,212,170,0.15)' }}>
            Quiero ver Sentinel en mi negocio →
          </a>
        </motion.div>
      </div>
    </section>
  );
};
