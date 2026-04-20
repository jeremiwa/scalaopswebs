import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Mail, Database, CheckCircle2, Zap } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════
   TIPOS
   ═══════════════════════════════════════════════════════════════════ */

type ConversationEntry =
  | { t: number; type: 'user'; text: string; timestamp: string }
  | { t: number; type: 'bot'; text: string; timestamp: string }
  | { t: number; type: 'typing'; duration: number }
  | { t: number; type: 'slots' }
  | { t: number; type: 'slot-select'; value: string };

type BadgeEntry = {
  t: number;
  text: string;
  icon: string;
  duration: number;
};

type CardState = 'idle' | 'active' | 'done';

type CRMLine = { label: string; value: string; isTeal?: boolean };

/* ═══════════════════════════════════════════════════════════════════
   GUIÓN DE LA CONVERSACIÓN
   ═══════════════════════════════════════════════════════════════════ */

const conversation: ConversationEntry[] = [
  // Fase 1: Contacto inicial
  { t: 0, type: 'user', text: 'Hola! Me interesa implementar IA en mi empresa', timestamp: '10:24' },
  { t: 2, type: 'typing', duration: 1200 },
  { t: 3.2, type: 'bot', text: '¡Hola! Soy el asistente de Scala 👋 Para recomendarte la mejor solución, ¿cuántas personas tiene tu equipo comercial?', timestamp: '10:24' },

  // Fase 2: Calificación
  { t: 6, type: 'user', text: 'Somos 8, pero perdemos leads por demoras', timestamp: '10:25' },
  { t: 8, type: 'typing', duration: 1500 },
  { t: 9.5, type: 'bot', text: 'Es el problema #1 que resolvemos. ¿Cuántos leads recibís por mes aprox?', timestamp: '10:25' },

  // Fase 3: Scoring
  { t: 12, type: 'user', text: 'Unos 300 por mes', timestamp: '10:26' },

  // Fase 4: Propuesta de agenda
  { t: 15, type: 'typing', duration: 1500 },
  { t: 16.5, type: 'bot', text: 'Caso ideal. Te propongo agendar una auditoría gratuita. Tengo estos espacios:', timestamp: '10:26' },
  { t: 17, type: 'slots' },

  // Fase 5: Selección de slot
  { t: 19, type: 'slot-select', value: 'Mié 22 · 15:30' },
  { t: 19.5, type: 'user', text: 'Mié 22 · 15:30', timestamp: '10:27' },

  // Fase 6: Confirmación
  { t: 22, type: 'typing', duration: 1500 },
  { t: 23.5, type: 'bot', text: 'Listo ✅ Te agendé el miércoles 22 a las 15:30. Te envié el link de Meet a tu mail.', timestamp: '10:27' },

  // Fase 7: Cierre
  { t: 27, type: 'user', text: 'Perfecto, gracias!', timestamp: '10:28' },
  { t: 28.5, type: 'typing', duration: 1000 },
  { t: 29.5, type: 'bot', text: '¡Genial! Nos vemos el miércoles 🚀', timestamp: '10:28' },
];

const badges: BadgeEntry[] = [
  { t: 7, text: 'Analizando perfil...', icon: '🧠', duration: 5000 },
  { t: 13, text: 'Lead calificado · Score: 87/100', icon: '✓', duration: 6000 },
  { t: 20, text: 'Agendando...', icon: '📅', duration: 3000 },
  { t: 20.5, text: 'Preparando email...', icon: '✉️', duration: 3500 },
];

const crmLines: CRMLine[] = [
  { label: 'Contacto', value: 'Juan P.' },
  { label: 'Empresa', value: 'Inmobiliaria' },
  { label: 'Leads/mes', value: '300' },
  { label: 'Score', value: '87/100', isTeal: true },
];

const agendaSlots = ['Mar 21 · 10:00', 'Mié 22 · 15:30', 'Vie 24 · 11:00'];

const LOOP_DURATION = 35000; // 35s total (33s content + 2s pausa)

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTES
   ═══════════════════════════════════════════════════════════════════ */

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

const ChatBubble = ({
  type,
  text,
  timestamp,
  delay,
}: {
  type: 'user' | 'bot';
  text: string;
  timestamp: string;
  delay: number;
}) => {
  const isUser = type === 'user';
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

const StatusBadge = ({ text, icon }: { text: string; icon: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    transition={{ duration: 0.2 }}
    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#6bdda1] border border-[#6bdda1]/30 bg-[#6bdda1]/10"
  >
    <span>{icon}</span>
    <span>{text}</span>
  </motion.div>
);

const AgendaSlots = ({
  selectedSlot,
}: {
  selectedSlot: string | null;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex flex-wrap gap-2 mb-3 pl-1"
  >
    {agendaSlots.map((slot, i) => {
      const isSelected = selectedSlot === slot;
      return (
        <motion.div
          key={slot}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.25 }}
          className={`px-3 py-2 rounded-lg text-[12px] font-semibold transition-all duration-300 cursor-default ${
            isSelected
              ? 'bg-[#6bdda1] text-[#000000] shadow-[0_0_12px_rgba(107,221,161,0.4)]'
              : 'border border-[#6bdda1]/40 text-[#6bdda1] bg-transparent'
          }`}
          role="presentation"
        >
          {slot}
        </motion.div>
      );
    })}
  </motion.div>
);

const SystemCard = ({
  icon: Icon,
  label,
  state,
  children,
}: {
  icon: typeof Database;
  label: string;
  state: CardState;
  children: React.ReactNode;
}) => (
  <div
    className={`relative flex flex-col rounded-xl border p-3 transition-all duration-500 overflow-hidden h-[120px] ${
      state === 'idle'
        ? 'opacity-40 border-white/[0.04] bg-[#050505]'
        : 'opacity-100 border-white/[0.04] bg-[#050505]'
    }`}
  >
    {/* Glow teal activo */}
    {state === 'active' && (
      <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ boxShadow: '0 0 20px rgba(107,221,161,0.12), inset 0 0 20px rgba(107,221,161,0.05)' }} />
    )}

    {/* Header */}
    <div className="flex items-center justify-between mb-2 relative z-10">
      <div className="flex items-center gap-2">
        <Icon className="w-[16px] h-[16px] text-white/50" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {state === 'done' && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#6bdda1]" />
          </motion.div>
        )}
        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
          state === 'idle' ? 'bg-white/10' : 'bg-[#6bdda1]'
        }`}>
          {state === 'active' && (
            <motion.div
              className="w-2 h-2 rounded-full bg-[#6bdda1]"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>
      </div>
    </div>

    {/* Body */}
    <div className="flex-1 relative z-10 overflow-hidden">
      {children}
    </div>
  </div>
);

const SummaryBanner = () => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="border-b border-[#6bdda1]/15 overflow-hidden flex-shrink-0 relative z-10"
    style={{
      background: 'linear-gradient(90deg, rgba(24,93,232,0.1), rgba(107,221,161,0.1))',
    }}
  >
    <div className="flex items-center gap-2 text-white text-[11px] font-semibold px-5 py-2.5">
      <Zap className="w-3.5 h-3.5 text-[#6bdda1] flex-shrink-0" />
      <span>
        <span className="text-[#6bdda1]">Ejecutado en 30s:</span>{' '}
        1 lead · 1 reunión · 1 CRM · 1 email
      </span>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════════════ */

export default function AIEmployeeLiveDemo() {
  // --- Estado del timeline ---
  const [visibleMessages, setVisibleMessages] = useState<ConversationEntry[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [activeBadges, setActiveBadges] = useState<BadgeEntry[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showSlots, setShowSlots] = useState(false);

  // Cards states
  const [crmState, setCrmState] = useState<CardState>('idle');
  const [calState, setCalState] = useState<CardState>('idle');
  const [emailState, setEmailState] = useState<CardState>('idle');
  const [crmVisibleLines, setCrmVisibleLines] = useState(0);
  const [emailProgress, setEmailProgress] = useState(0);

  // Summary banner
  const [showSummary, setShowSummary] = useState(false);

  // Reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);

  // Refs
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Detectar prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Helper para programar un timeout y guardarlo
  const schedule = useCallback((fn: () => void, delayMs: number) => {
    const id = setTimeout(fn, delayMs);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  // Limpia todos los timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  // Reset completo
  const resetState = useCallback(() => {
    setVisibleMessages([]);
    setShowTyping(false);
    setActiveBadges([]);
    setSelectedSlot(null);
    setShowSlots(false);
    setCrmState('idle');
    setCalState('idle');
    setEmailState('idle');
    setCrmVisibleLines(0);
    setEmailProgress(0);
    setShowSummary(false);
  }, []);

  // Auto-scroll chat (solo dentro del contenedor, no mueve la pagina)
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleMessages, showTyping, showSlots]);

  // --- MODO REDUCIDO: renderizar estado final estático ---
  if (reducedMotion) {
    return (
      <div
        role="img"
        aria-label="Demostración animada del Empleado IA de Scala calificando un lead, agendando reunión y actualizando CRM en tiempo real"
        className="hidden md:flex w-full max-w-[520px] flex-col rounded-2xl border border-[#1E293B] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at center, #0F172A 0%, #0A0F1C 70%)' }}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1E293B]">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full bg-[#0D1321] border border-[#2A3447] flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-[#00D4AA]" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-white">Scala AI Agent</div>
              <div className="text-[11px] text-[#00D4AA] font-semibold uppercase tracking-wider">Operativo 24/7</div>
            </div>
          </div>
        </div>
        {/* Conversación completa estática */}
        <div className="flex-1 px-4 py-4 space-y-2 max-h-[320px] overflow-y-auto">
          {conversation.filter(e => e.type === 'user' || e.type === 'bot').map((e, i) => (
            <div key={i} className={`flex flex-col ${e.type === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 text-[14px] leading-[1.5] ${
                e.type === 'user' ? 'bg-[#0066FF] text-white rounded-2xl rounded-br-sm' : 'bg-[#1A2234] border border-[#2A3447] text-[#E2E8F0] rounded-2xl rounded-bl-sm'
              }`}>
                {'text' in e ? e.text : ''}
              </div>
            </div>
          ))}
        </div>
        {/* Cards en estado completado */}
        <div className="border-t border-[#1E293B] p-3 grid grid-cols-3 gap-2">
          {[{ icon: Database, label: 'CRM' }, { icon: Calendar, label: 'Calendario' }, { icon: Mail, label: 'Email' }].map(({ icon: I, label }) => (
            <div key={label} className="rounded-xl border border-[#1E293B] bg-[#0D1321] p-3 h-[100px]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5"><I className="w-4 h-4 text-[#94A3B8]" /><span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">{label}</span></div>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00D4AA]" />
              </div>
              <div className="text-[10px] text-[#00D4AA]">Completado</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- TIMELINE PRINCIPAL (Loop) ---
  useEffect(() => {
    const runTimeline = () => {
      resetState();
      clearAllTimeouts();

      // === Mensajes de conversación ===
      conversation.forEach((entry) => {
        const ms = entry.t * 1000;

        if (entry.type === 'typing') {
          schedule(() => setShowTyping(true), ms);
          schedule(() => setShowTyping(false), ms + entry.duration);
        } else if (entry.type === 'user' || entry.type === 'bot') {
          schedule(() => {
            setVisibleMessages((prev) => [...prev, entry]);
          }, ms);
        } else if (entry.type === 'slots') {
          schedule(() => setShowSlots(true), ms);
        } else if (entry.type === 'slot-select') {
          schedule(() => setSelectedSlot(entry.value), ms);
          schedule(() => setShowSlots(false), ms + 200);
        }
      });

      // === Badges ===
      badges.forEach((badge) => {
        const ms = badge.t * 1000;
        schedule(() => {
          setActiveBadges((prev) => [...prev, badge]);
        }, ms);
        schedule(() => {
          setActiveBadges((prev) => prev.filter((b) => b !== badge));
        }, ms + badge.duration);
      });

      // === Card CRM: activo en t=13s, done en t=15s ===
      schedule(() => setCrmState('active'), 13000);
      crmLines.forEach((_, i) => {
        schedule(() => setCrmVisibleLines(i + 1), 13300 + i * 400);
      });
      schedule(() => setCrmState('done'), 15000);

      // === Card Calendario: activo en t=20s, done en t=22s ===
      schedule(() => setCalState('active'), 20000);
      schedule(() => setCalState('done'), 22000);

      // === Card Email: activo en t=21s, done en t=23s ===
      schedule(() => setEmailState('active'), 21000);
      for (let p = 0; p <= 100; p += 8) {
        schedule(() => setEmailProgress(Math.min(p, 100)), 21000 + (p / 100) * 1500);
      }
      schedule(() => {
        setEmailProgress(100);
        setEmailState('done');
      }, 22500);

      // === Banner de resumen: t=31s ===
      schedule(() => setShowSummary(true), 31000);

      // === Fade out y loop: t=33s ===
      schedule(() => {
        setShowSummary(false);
      }, 33000);
      schedule(() => {
        runTimeline();
      }, LOOP_DURATION);
    };

    runTimeline();
    return () => clearAllTimeouts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      role="img"
      aria-label="Demostración animada del Empleado IA de Scala calificando un lead, agendando reunión y actualizando CRM en tiempo real"
      className="hidden md:flex w-full max-w-[500px] h-[550px] flex-col rounded-3xl border border-white/[0.04] bg-[#020202] overflow-hidden select-none shadow-[0_0_100px_rgba(24,93,232,0.1)]"
      style={{
        fontFamily: 'var(--font-primary), Inter, system-ui, sans-serif',
      }}
    >
      {/* Glows Scala */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#185de8]/15 blur-[60px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#6bdda1]/10 blur-[80px] pointer-events-none rounded-full" />

      {/* ═══ ZONA 1: Chat (flex-1, scroll interno) ═══ */}
      <div className="relative flex flex-col flex-1 min-h-0">
        {/* Header del chat */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.04] flex-shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-[#0A0A0F] border border-white/[0.06] flex items-center justify-center shadow-[0_0_15px_rgba(107,221,161,0.2)]">
              <div className="w-4 h-4 rounded-full bg-[#6bdda1] animate-pulse" />
            </div>
            <div>
              <div className="text-[14px] font-bold text-white tracking-wide" style={{ fontFamily: 'var(--font-primary)' }}>Scala AI Agent</div>
              <div className="text-[11px] text-[#6bdda1] font-medium tracking-wider uppercase">Operativo 24/7</div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
            <AnimatePresence mode="wait">
              {activeBadges.length > 0 ? (
                <StatusBadge
                  key={`${activeBadges[activeBadges.length - 1].text}-${activeBadges[activeBadges.length - 1].t}`}
                  text={activeBadges[activeBadges.length - 1].text}
                  icon={activeBadges[activeBadges.length - 1].icon}
                />
              ) : (
                <motion.div
                  key="dots"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-1.5"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#185de8]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Banner de resumen (strip no superpuesta) */}
        <AnimatePresence>
          {showSummary && <SummaryBanner />}
        </AnimatePresence>

        {/* Área de mensajes — scroll interno únicamente */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: 'none' }}>
          <AnimatePresence>
            {visibleMessages.map((msg, i) => {
              if (msg.type === 'user' || msg.type === 'bot') {
                return (
                  <ChatBubble
                    key={`msg-${i}`}
                    type={msg.type}
                    text={msg.text}
                    timestamp={msg.timestamp}
                    delay={0}
                  />
                );
              }
              return null;
            })}
          </AnimatePresence>

          {/* Slots de agenda */}
          <AnimatePresence>
            {showSlots && <AgendaSlots selectedSlot={selectedSlot} />}
          </AnimatePresence>

          {/* Typing indicator */}
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

        {/* Footer (decorativo) */}
        <div className="flex items-center gap-3 px-5 py-2.5 border-t border-white/[0.04] flex-shrink-0 relative z-10">
          <div className="flex-1 bg-[#0A0A0F] border border-white/[0.06] rounded-full px-4 py-2 text-[12px] text-white/20">
            Escribiendo...
          </div>
        </div>
      </div>

      {/* ═══ ZONA 2: Panel de sistemas ═══ */}
      <div className="border-t border-white/[0.04] p-3 grid grid-cols-3 gap-2 flex-shrink-0 relative z-10">
        {/* Card CRM */}
        <SystemCard icon={Database} label="CRM" state={crmState}>
          {crmState === 'idle' ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-2.5 bg-[#1E293B] rounded w-full" style={{ width: `${70 + i * 8}%` }} />
              ))}
            </div>
          ) : (
            <div className="space-y-1.5">
              {crmLines.slice(0, crmVisibleLines).map((line, i) => (
                <motion.div
                  key={line.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex justify-between text-[11px]"
                >
                  <span className="text-[#64748B]">{line.label}</span>
                  <span className={line.isTeal ? 'text-[#00D4AA] font-bold' : 'text-[#94A3B8]'}>{line.value}</span>
                </motion.div>
              ))}
              {crmState === 'done' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-[#00D4AA] font-bold mt-1">
                  Creado ✓
                </motion.div>
              )}
            </div>
          )}
        </SystemCard>

        {/* Card Calendario */}
        <SystemCard icon={Calendar} label="Calendario" state={calState}>
          {calState === 'idle' ? (
            <div className="grid grid-cols-5 gap-1 mt-1">
              {['L', 'M', 'X', 'J', 'V'].map((d) => (
                <div key={d} className="h-5 bg-[#1E293B] rounded text-[8px] text-[#334155] flex items-center justify-center font-bold">
                  {d}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-5 gap-1 mt-1">
                {['L', 'M', 'X', 'J', 'V'].map((d) => (
                  <motion.div
                    key={d}
                    className={`h-5 rounded text-[8px] flex items-center justify-center font-bold transition-all duration-500 ${
                      d === 'X'
                        ? 'bg-[#00D4AA] text-[#0A0F1C] shadow-[0_0_8px_rgba(0,212,170,0.4)]'
                        : 'bg-[#1E293B] text-[#475569]'
                    }`}
                  >
                    {d}
                  </motion.div>
                ))}
              </div>
              {calState !== 'idle' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-2">
                  <div className="text-[10px] text-[#00D4AA] font-semibold">15:30</div>
                  <div className="text-[9px] text-[#64748B] mt-0.5">Auditoría · 45 min</div>
                </motion.div>
              )}
              {calState === 'done' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-[#00D4AA] font-bold mt-1">
                  Agendado ✓
                </motion.div>
              )}
            </div>
          )}
        </SystemCard>

        {/* Card Email */}
        <SystemCard icon={Mail} label="Email" state={emailState}>
          {emailState === 'idle' ? (
            <div className="space-y-2">
              <div className="h-2.5 bg-[#1E293B] rounded w-[80%]" />
              <div className="h-2.5 bg-[#1E293B] rounded w-[60%]" />
              <div className="h-1.5 bg-[#1E293B] rounded w-full mt-3" />
            </div>
          ) : (
            <div className="space-y-1.5">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-[#64748B]">
                Para: <span className="text-[#94A3B8]">juan@...</span>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="text-[10px] text-[#64748B]">
                Asunto: <span className="text-[#94A3B8]">Confirmación auditoría</span>
              </motion.div>
              {/* Progress bar */}
              <div className="h-1.5 bg-[#1E293B] rounded-full w-full mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-[#00D4AA] rounded-full"
                  style={{ width: `${emailProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              {emailState === 'done' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-[#00D4AA] font-bold">
                  Enviado ✓
                </motion.div>
              )}
            </div>
          )}
        </SystemCard>
      </div>
    </div>
  );
}
