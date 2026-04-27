import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  MessageCircle, Plug, RefreshCw, Calendar, Clock, Zap,
  CheckCircle2, Bot, ArrowRight
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════
   DATOS EDITABLES
   ═══════════════════════════════════════════════════════════════════ */

// Card 1 — Industrias rotativas para calificación
const industries = [
  {
    label: 'Inmobiliaria',
    chat: [
      { from: 'user', text: 'Busco depto en Palermo, 2 amb' },
      { from: 'bot', text: '¿Presupuesto aprox?' },
      { from: 'user', text: 'USD 150k' },
    ],
    criteria: ['Presupuesto', 'Zona', 'Urgencia', 'Timing'],
    values: [92, 78, 65, 85],
    score: 87,
  },
  {
    label: 'Agencia',
    chat: [
      { from: 'user', text: 'Necesito sitio web y ads' },
      { from: 'bot', text: '¿Facturación mensual?' },
      { from: 'user', text: 'USD 30k' },
    ],
    criteria: ['Facturación', 'Industria', 'Madurez', 'Fit'],
    values: [70, 88, 55, 90],
    score: 76,
  },
  {
    label: 'E-commerce',
    chat: [
      { from: 'user', text: 'Quiero automatizar ventas' },
      { from: 'bot', text: '¿Plataforma actual?' },
      { from: 'user', text: 'Shopify + Meta' },
    ],
    criteria: ['Volumen', 'Stack', 'Ticket', 'Urgencia'],
    values: [80, 95, 60, 72],
    score: 82,
  },
];

// Card 2 — Stacks rotativas
const stacks = [
  'WhatsApp + HubSpot + Calendly',
  'Gmail + Notion + Google Cal',
  'Meta + Pipedrive + Slack',
];

// Card 2 — Herramientas orbitales con SVG paths de logos reales
const orbitTools = [
  { name: 'WhatsApp', color: '#25D366',
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z' },
  { name: 'Gmail', color: '#EA4335',
    path: 'M20 18h-2V9.25L12 13 6 9.25V18H4V6h1.2l6.8 4.25L18.8 6H20v12z' },
  { name: 'Calendar', color: '#4285F4',
    path: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z' },
  { name: 'HubSpot', color: '#FF7A59',
    path: 'M15.5 8.5V5.27a2 2 0 10-1 0V8.5a3.5 3.5 0 00-2.48 1.46l-2.96-1.72a2 2 0 10-.56.83l2.98 1.73a3.5 3.5 0 100 3.4l-2.98 1.73a2 2 0 10.56.83l2.96-1.72A3.5 3.5 0 0015.5 8.5z' },
  { name: 'Slack', color: '#E01E5A',
    path: 'M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z' },
  { name: 'Meta', color: '#0081FB',
    path: 'M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z' },
];

// Card 5 — Acciones del reloj
const clockActions = [
  { hour: 3, text: 'Respondió consulta', icon: '💬' },
  { hour: 6, text: 'Agendó reunión', icon: '📅' },
  { hour: 9, text: 'Calificó lead', icon: '✓' },
  { hour: 12, text: 'Envió propuesta', icon: '✉️' },
  { hour: 15, text: 'Actualizó CRM', icon: '🔄' },
  { hour: 18, text: 'Derivó a Laura', icon: '→' },
  { hour: 21, text: 'Recordatorio', icon: '⏰' },
  { hour: 0, text: 'Reactivó lead', icon: '🔥' },
];

// Card 6 — Tareas del stream
const streamTasks = [
  { icon: '📝', text: 'Ficha de Juan P. actualizada en HubSpot' },
  { icon: '📅', text: 'Reunión agendada con Mariana · Jueves' },
  { icon: '✉️', text: 'Propuesta enviada a InmoSur' },
  { icon: '💬', text: 'Respondí 14 consultas en WhatsApp' },
  { icon: '🔄', text: '3 leads movidos a "Negociación"' },
  { icon: '⚠️', text: 'Lead frío reactivado con descuento' },
  { icon: '📞', text: 'Llamada urgente transferida a Carlos' },
  { icon: '🧾', text: 'Resumen diario generado para gerencia' },
  { icon: '🏷️', text: '12 conversaciones etiquetadas' },
  { icon: '📊', text: 'Reporte semanal enviado al equipo' },
];

/* ═══════════════════════════════════════════════════════════════════
   FRAMER VARIANTS
   ═══════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const staggerGrid = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ═══════════════════════════════════════════════════════════════════
   WRAPPER DE CARD
   ═══════════════════════════════════════════════════════════════════ */

const CapabilityCard = ({
  icon: Icon,
  title,
  subtitle,
  children,
  className = '',
  highlighted = true,
}: {
  icon: typeof MessageCircle;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
}) => {
  const baseBg = highlighted ? 'bg-[#0B0D12]' : 'bg-[#060606]';
  const baseBorder = highlighted ? 'border-white/[0.08]' : 'border-white/[0.05]';
  const shadow = highlighted ? 'shadow-[0_8px_30px_rgba(0,0,0,0.4)]' : 'shadow-[0_4px_24px_rgba(0,0,0,0.3)]';

  return (
    <motion.div
      variants={fadeUp}
      role="article"
      aria-label={title}
      className={`relative rounded-[20px] border ${baseBorder} ${baseBg} ${shadow} p-6 overflow-hidden flex flex-col transition-all duration-300 group hover:border-[#6bdda1]/30 ${className}`}
      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(107,221,161,0.06)' }}
    >
      {highlighted && (
        <div className="absolute inset-0 rounded-[20px] pointer-events-none" style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.04)' }} />
      )}
      {/* Header de la card */}
      <div className="flex items-center gap-3 mb-2 relative z-10">
        <Icon className="w-5 h-5 text-[#6bdda1] flex-shrink-0" />
        <h3 className="text-[18px] font-semibold text-white">{title}</h3>
      </div>
      <p className="text-[14px] text-[#8B8B9E] mb-4 relative z-10 leading-relaxed">{subtitle}</p>
      {/* Zona de animación */}
      <div className="flex-1 relative z-10 min-h-0">{children}</div>
    </motion.div>
  );
};


/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 1: Calificación por industria
   ═══════════════════════════════════════════════════════════════════ */

const QualifyAnimation = () => {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => setIdx((p) => (p + 1) % industries.length), 3500);
    return () => clearInterval(iv);
  }, [inView]);

  const ind = industries[idx];

  return (
    <div ref={ref} className="flex gap-3 h-full min-h-[160px]">
      {/* Mini chat */}
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="space-y-1.5">
            {ind.chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-1.5 rounded-xl text-[11px] max-w-[90%] ${msg.from === 'user' ? 'bg-[#185de8] text-white rounded-br-sm' : 'bg-[#0A0A0F] text-[#8B8B9E] border border-white/[0.06] rounded-bl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Panel scoring */}
      <div className="w-[140px] flex-shrink-0 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <div className="text-[9px] font-bold uppercase tracking-wider text-[#6bdda1] mb-1.5 truncate">
              Perfil: {ind.label}
            </div>
            <div className="space-y-2">
              {ind.criteria.map((c, i) => (
                <div key={c}>
                  <div className="flex justify-between text-[9px] mb-0.5">
                    <span className="text-[#64748B]">{c}</span>
                    <span className="text-[#94A3B8]">{ind.values[i]}%</span>
                  </div>
                  <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#6bdda1] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${ind.values[i]}%` }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <span className="text-[24px] font-bold text-[#6bdda1]">{ind.score}</span>
              <span className="text-[11px] text-[#64748B]">/100</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 2: Órbita de integraciones
   ═══════════════════════════════════════════════════════════════════ */

const IntegrationsOrbit = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [stackIdx, setStackIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => setActiveIdx((p) => (p + 1) % orbitTools.length), 1200);
    return () => clearInterval(iv);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => setStackIdx((p) => (p + 1) % stacks.length), 2500);
    return () => clearInterval(iv);
  }, [inView]);

  const cx = 120, cy = 100, r = 70;
  return (
    <div ref={ref} className="flex flex-col items-center justify-center h-full min-h-[160px] relative">
      <svg width="240" height="200" viewBox="0 0 240 200" className="overflow-visible">
        {/* Líneas al centro */}
        {orbitTools.map((_, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          return (
            <line key={`line-${i}`} x1={cx} y1={cy} x2={x} y2={y} stroke={activeIdx === i ? '#6bdda1' : 'rgba(255,255,255,0.04)'} strokeWidth={1} className="transition-colors duration-300" />
          );
        })}
        {/* Núcleo central */}
        <circle cx={cx} cy={cy} r={24} fill="url(#coreGrad)" />
        {activeIdx >= 0 && (
          <motion.circle cx={cx} cy={cy} r={28} fill="none" stroke="#6bdda1" strokeWidth={1} animate={{ r: [28, 36, 28], opacity: [0.4, 0, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
        )}
        <Bot x={cx - 10} y={cy - 10} width={20} height={20} color="#fff" />
        <text x={cx} y={cy + 38} textAnchor="middle" className="text-[9px] font-bold fill-[#64748B] uppercase tracking-wider">Empleado IA</text>
        {/* Logos de marca orbitales */}
        {orbitTools.map((tool, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          const isActive = activeIdx === i;
          return (
            <g key={tool.name}>
              <circle cx={x} cy={y} r={16} fill="#050505" stroke={isActive ? '#6bdda1' : 'rgba(255,255,255,0.06)'} strokeWidth={1} className="transition-colors duration-300" />
              {isActive && <motion.circle cx={x} cy={y} r={16} fill="none" stroke="#6bdda1" strokeWidth={1} initial={{ opacity: 0.5 }} animate={{ opacity: [0.5, 0, 0.5] }} transition={{ duration: 1, repeat: Infinity }} />}
              <svg x={x - 7} y={y - 7} width={14} height={14} viewBox="0 0 24 24">
                <path d={tool.path} fill={isActive ? tool.color : '#64748B'} className="transition-colors duration-300" />
              </svg>
            </g>
          );
        })}
        <defs>
          <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#185de8" />
            <stop offset="100%" stopColor="#6bdda1" />
          </linearGradient>
        </defs>
      </svg>
      {/* Stack chip rotativo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stackIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="text-[10px] text-[#6bdda1] border border-[#6bdda1]/20 bg-[#6bdda1]/5 rounded-full px-3 py-1 mt-1"
        >
          Usa: {stacks[stackIdx]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 3: Timeline de seguimiento
   ═══════════════════════════════════════════════════════════════════ */

const followUpSteps = [
  { day: 'Día 1', label: 'Primer contacto', channel: '💬' },
  { day: 'Día 3', label: 'Recordatorio', channel: '✉️' },
  { day: 'Día 7', label: 'Propuesta', channel: '💬' },
  { day: 'Día 14', label: 'Reactivación', channel: '✉️' },
];

const FollowUpTimeline = () => {
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => {
      setActiveStep((p) => (p >= followUpSteps.length ? 0 : p + 1));
    }, 1800);
    return () => clearInterval(iv);
  }, [inView]);

  return (
    <div ref={ref} className="flex flex-col gap-0 h-full justify-center pl-2">
      {followUpSteps.map((step, i) => {
        const done = i < activeStep;
        const active = i === activeStep;
        return (
          <div key={i} className="flex items-start gap-3 relative">
            {/* Línea vertical */}
            {i < followUpSteps.length - 1 && (
              <div className="absolute left-[7px] top-[18px] w-[2px] h-[28px] bg-white/[0.04] overflow-hidden">
                {done && <motion.div className="w-full bg-[#6bdda1]" initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 0.5 }} />}
              </div>
            )}
            {/* Dot */}
            <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors duration-300 ${done ? 'bg-[#6bdda1]' : active ? 'bg-[#185de8]' : 'bg-white/[0.06]'}`}>
              {done && <CheckCircle2 className="w-3 h-3 text-[#000000]" />}
              {active && <motion.div className="w-2 h-2 rounded-full bg-white" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />}
            </div>
            {/* Label */}
            <div className="flex-1 min-w-0 pb-4">
              <div className="flex items-center gap-1.5">
                <span className={`text-[11px] font-bold ${done || active ? 'text-white' : 'text-[#475569]'}`}>{step.day}</span>
                <span className="text-[10px]">{step.channel}</span>
              </div>
              <span className={`text-[11px] ${done || active ? 'text-[#94A3B8]' : 'text-[#334155]'}`}>{step.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 4: Derivación inteligente
   ═══════════════════════════════════════════════════════════════════ */

const routingTargets = [
  { name: 'Carlos', role: 'Ventas B2B', rule: 'Empresa grande' },
  { name: 'Laura', role: 'Ventas PYMES', rule: 'PYME' },
  { name: 'Diego', role: 'Cuentas Clave', rule: 'Cliente existente' },
];

const RoutingFlow = () => {
  const [activeTarget, setActiveTarget] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => setActiveTarget((p) => (p + 1) % routingTargets.length), 2500);
    return () => clearInterval(iv);
  }, [inView]);

  return (
    <div ref={ref} className="flex items-center gap-4 h-full justify-center">
      {/* Mini calendario */}
      <div className="flex flex-col items-center gap-1">
        <div className="grid grid-cols-5 gap-0.5">
          {['L', 'M', 'X', 'J', 'V'].map((d) => (
            <div key={d} className={`w-6 h-5 rounded text-[7px] font-bold flex items-center justify-center ${d === 'X' ? 'bg-[#6bdda1] text-[#000000]' : 'bg-white/[0.04] text-[#475569]'}`}>
              {d}
            </div>
          ))}
        </div>
        <span className="text-[8px] text-[#6bdda1] font-semibold">15:30 · Auditoría</span>
      </div>

      {/* Flecha */}
      <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <ArrowRight className="w-4 h-4 text-[#6bdda1]" />
      </motion.div>

      {/* Avatares */}
      <div className="flex flex-col gap-2">
        {routingTargets.map((t, i) => {
          const isActive = activeTarget === i;
          return (
            <div key={t.name} className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all duration-300 ${isActive ? 'bg-[#6bdda1]/10 border border-[#6bdda1]/30' : 'border border-transparent'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold ${isActive ? 'bg-[#6bdda1] text-[#000000]' : 'bg-white/[0.04] text-[#475569]'}`}>
                {t.name[0]}
              </div>
              <div className="min-w-0">
                <div className={`text-[10px] font-semibold truncate ${isActive ? 'text-white' : 'text-[#475569]'}`}>{t.name}</div>
                <div className="text-[8px] text-[#475569] truncate">{t.role}</div>
              </div>
            </div>
          );
        })}
        <AnimatePresence mode="wait">
          <motion.div key={activeTarget} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[8px] text-[#6bdda1] bg-[#6bdda1]/5 rounded px-1.5 py-0.5 text-center">
            {routingTargets[activeTarget].rule} → {routingTargets[activeTarget].name}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 5: Reloj 24/7
   ═══════════════════════════════════════════════════════════════════ */

const TwentyFourSevenClock = () => {
  const [rotation, setRotation] = useState(0);
  const [actionCount, setActionCount] = useState(847);
  const [activeAction, setActiveAction] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const iv = setInterval(() => {
      setRotation((p) => {
        const next = (p + 45) % 360;
        const hourIdx = Math.floor(next / 45) % clockActions.length;
        setActiveAction(hourIdx);
        setTimeout(() => setActiveAction(null), 800);
        return next;
      });
      setActionCount((p) => p + Math.floor(Math.random() * 2) + 1);
    }, 1500);
    return () => clearInterval(iv);
  }, [inView]);

  const cx = 70, cy = 70, r = 52;
  return (
    <div ref={ref} className="flex flex-col items-center justify-center h-full relative">
      {/* Contador */}
      <div className="flex items-center gap-1.5 mb-2">
        <motion.div className="w-1.5 h-1.5 rounded-full bg-[#6bdda1]" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B8B9E]">
          Activo · <span className="text-[#6bdda1]">{actionCount}</span> acciones hoy
        </span>
      </div>

      <svg width="140" height="140" viewBox="0 0 140 140">
        {/* Aro */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={2} />
        {/* Marcas de hora */}
        {clockActions.map((a, i) => {
          const angle = (i * 45 - 90) * (Math.PI / 180);
          const x = cx + (r - 8) * Math.cos(angle);
          const y = cy + (r - 8) * Math.sin(angle);
          const isActive = activeAction === i;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={3} fill={isActive ? '#6bdda1' : '#334155'} className="transition-colors duration-200" />
              {isActive && (
                <motion.circle cx={x} cy={y} r={6} fill="none" stroke="#6bdda1" strokeWidth={1} initial={{ opacity: 0.6, r: 4 }} animate={{ opacity: 0, r: 12 }} transition={{ duration: 0.6 }} />
              )}
            </g>
          );
        })}
        {/* Manecilla */}
        <motion.line
          x1={cx} y1={cy}
          x2={cx + 30 * Math.cos((rotation - 90) * (Math.PI / 180))}
          y2={cy + 30 * Math.sin((rotation - 90) * (Math.PI / 180))}
          stroke="#6bdda1" strokeWidth={2} strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r={3} fill="#6bdda1" />
      </svg>

      {/* Tooltip de acción */}
      <div className="h-5">
        <AnimatePresence>
          {activeAction !== null && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] text-[#8B8B9E] flex items-center gap-1"
            >
              <span>{clockActions[activeAction].icon}</span>
              <span>{clockActions[activeAction].text}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 6: Stream de tareas (marquee)
   ═══════════════════════════════════════════════════════════════════ */

const TasksStream = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const doubled = [...streamTasks, ...streamTasks];

  return (
    <div ref={ref} className="h-full flex flex-col justify-center overflow-hidden relative">
      {/* Header del stream */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-[#6bdda1]" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B8B9E]">
            Hoy · <span className="text-[#6bdda1]">1,247</span> acciones ejecutadas
          </span>
        </div>
        <span className="text-[10px] text-[#6bdda1] font-medium hidden sm:block">Ver log completo →</span>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-3 group-hover:[animation-play-state:paused]"
          animate={inView ? { x: ['0%', '-50%'] } : {}}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {doubled.map((task, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-2 bg-[#0A0A0F] border border-white/[0.04] rounded-xl px-3 py-2.5 min-w-[220px]"
            >
              <span className="text-[16px]">{task.icon}</span>
              <div className="min-w-0">
                <div className="text-[12px] text-white font-medium truncate">{task.text}</div>
                <div className="text-[9px] text-[#475569]">hace {Math.floor(Math.random() * 10) + 1}s</div>
              </div>
              <div className="flex-shrink-0 text-[9px] text-[#6bdda1] font-bold ml-auto">✓</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════════════ */

export default function CustomAIEmployeeCapabilities() {
  // Reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#020202] border-y border-white/[0.04]">
      {/* Noise texture sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")' }} />

      <div className="container-custom relative z-10">
        {/* ═══ HEADER ═══ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-[820px] mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#6bdda1]/20 bg-[#6bdda1]/5 mb-6">
            <Bot className="w-3.5 h-3.5 text-[#6bdda1]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6bdda1]">
              Empleados IA personalizados
            </span>
          </div>

          <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-[1.15] mb-5">
            <span className="text-[#64748B]">No creamos bots genéricos. </span>
            <span className="text-white">Creamos Empleados IA adaptados a la operación real de tu empresa.</span>
          </h2>

          <p className="text-[16px] md:text-[17px] text-[#8B8B9E] leading-relaxed max-w-[680px]">
            Cada sistema se configura según tu negocio, tus reglas, tus procesos y las tareas que hoy consumen tiempo o hacen que pierdas ventas.
          </p>
        </motion.div>

        {/* ═══ BENTO GRID ═══ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerGrid}
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {/* Row 1 */}
          <CapabilityCard
            icon={MessageCircle}
            title="Responden y califican"
            subtitle="Califican cada conversación según criterios que definís vos."
            className="md:col-span-2 lg:col-span-3 min-h-[280px] lg:min-h-[320px]"
            highlighted={true}
          >
            {reducedMotion ? <div className="text-[11px] text-[#475569]">Calificación automática por industria</div> : <QualifyAnimation />}
          </CapabilityCard>

          <CapabilityCard
            icon={Plug}
            title="Se integran a tus herramientas"
            subtitle="WhatsApp, Gmail, Calendar, CRM. Lo que uses ya."
            className="md:col-span-2 lg:col-span-3 min-h-[280px] lg:min-h-[320px]"
            highlighted={true}
          >
            {reducedMotion ? <div className="text-[11px] text-[#475569]">Integraciones con tu stack actual</div> : <IntegrationsOrbit />}
          </CapabilityCard>

          {/* Row 2 */}
          <CapabilityCard
            icon={RefreshCw}
            title="Seguimiento automático"
            subtitle="Cadencias que vos definís, sin leads olvidados."
            className="md:col-span-2 lg:col-span-2 min-h-[220px] lg:min-h-[240px]"
          >
            {reducedMotion ? <div className="text-[11px] text-[#475569]">Follow-up automatizado</div> : <FollowUpTimeline />}
          </CapabilityCard>

          <CapabilityCard
            icon={Calendar}
            title="Agendan y derivan"
            subtitle="Leen el contexto y derivan al humano indicado."
            className="md:col-span-2 lg:col-span-2 min-h-[220px] lg:min-h-[240px]"
          >
            {reducedMotion ? <div className="text-[11px] text-[#475569]">Derivación inteligente por contexto</div> : <RoutingFlow />}
          </CapabilityCard>

          <CapabilityCard
            icon={Clock}
            title="Trabajan 24/7"
            subtitle="Responden en segundos, siempre. No duermen."
            className="md:col-span-4 lg:col-span-2 min-h-[220px] lg:min-h-[240px]"
          >
            {reducedMotion ? <div className="text-[11px] text-[#475569]">Operativo las 24 horas</div> : <TwentyFourSevenClock />}
          </CapabilityCard>

          {/* Row 3 — Full width */}
          <CapabilityCard
            icon={Zap}
            title="Ejecutan tareas operativas reales"
            subtitle="No solo conversan. Ejecutan acciones concretas en tus sistemas."
            className="md:col-span-4 lg:col-span-6 min-h-[180px] lg:min-h-[200px]"
          >
            {reducedMotion ? <div className="text-[11px] text-[#475569]">Stream de acciones ejecutadas</div> : <TasksStream />}
          </CapabilityCard>
        </motion.div>
      </div>
    </section>
  );
}
