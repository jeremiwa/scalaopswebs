import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import {
  Search, UserCheck, GitBranch, Plug, FlaskConical, TrendingUp,
  Check, Bot, Users, MessageCircle, Calendar, Mail, Slack,
  AlertTriangle, Loader2, CheckCircle2, Lightbulb
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════
   TIPOS Y DATOS
   ═══════════════════════════════════════════════════════════════════ */

interface StepData {
  id: number;
  label: string;
  title: string;
  description: string;
  icon: typeof Search;
}

const steps: StepData[] = [
  {
    id: 1, label: 'FASE 01', title: 'Entendimiento', icon: Search,
    description: 'Radiografía profunda del negocio, el usuario que compra y el proceso interno actual. Entrevistas, análisis de datos y mapeo del pipeline real.',
  },
  {
    id: 2, label: 'FASE 02', title: 'Definición del Rol', icon: UserCheck,
    description: 'Qué tareas asume el Empleado IA y cuáles estrictamente quedan en manos humanas. Escribimos el job description exacto antes de tocar código.',
  },
  {
    id: 3, label: 'FASE 03', title: 'Arquitectura', icon: GitBranch,
    description: 'Diseño de la lógica comercial, estructura de datos y criterios de respuesta. Acá definimos el cerebro: reglas, decisiones, ramificaciones.',
  },
  {
    id: 4, label: 'FASE 04', title: 'Implementación', icon: Plug,
    description: 'Integración con WhatsApp, CRMs y el resto de tu stack. No te pedimos que cambies de herramientas: nos conectamos a las que ya usás.',
  },
  {
    id: 5, label: 'FASE 05', title: 'Validación', icon: FlaskConical,
    description: 'Pruebas de estrés conversacional contra casos reales y objeciones complejas. Ajustamos antes de que hable con tu primer cliente real.',
  },
  {
    id: 6, label: 'FASE 06', title: 'Optimización', icon: TrendingUp,
    description: 'Re-entrenamiento continuo sobre las interacciones reales. Cada semana el sistema aprende del comportamiento de tus clientes y mejora.',
  },
];

/* ═══════════════════════════════════════════════════════════════════
   HOOK: useMediaQuery
   ═══════════════════════════════════════════════════════════════════ */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return matches;
}

/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 1: Entendimiento — Discovery Dashboard
   ═══════════════════════════════════════════════════════════════════ */

const industries = [
  { name: 'Inmobiliaria', team: '8 personas', leads: '~300', ticket: 'USD 180k' },
  { name: 'Agencia Digital', team: '12 personas', leads: '~500', ticket: 'USD 5k' },
  { name: 'E-commerce', team: '6 personas', leads: '~1,200', ticket: 'USD 85' },
];

const Step1Discovery = () => {
  const [industryIdx, setIndustryIdx] = useState(0);
  const industry = industries[industryIdx];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndustryIdx(p => (p + 1) % industries.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'INDUSTRIA', value: industry.name },
    { label: 'EQUIPO COMERCIAL', value: industry.team },
    { label: 'LEADS/MES', value: industry.leads },
    { label: 'TICKET PROMEDIO', value: industry.ticket },
  ];

  const flowNodes = [
    { label: 'Lead entra', alert: null },
    { label: 'Responde asesor', alert: '⚠ 40% sin respuesta' },
    { label: 'Agenda visita', alert: '⚠ 35% no agenda' },
    { label: 'Cierra venta', alert: '⚠ 62% no cierra' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 h-full">
      {/* Columna 1 — Negocio */}
      <div className="flex flex-col gap-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={industryIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-2"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.3 }}
                className="bg-[#0A0D14] border border-white/[0.06] rounded-lg p-2.5"
              >
                <div className="text-[9px] text-[#64748B] uppercase tracking-wider">{s.label}</div>
                <div className="text-[12px] text-white font-semibold mt-0.5">
                  {s.label === 'INDUSTRIA' ? (
                    <span className="inline-flex items-center gap-1.5">
                      {s.value}
                      <span className="text-[8px] bg-[#6bdda1]/20 text-[#6bdda1] px-1.5 py-0.5 rounded-full">{s.value === 'Inmobiliaria' ? 'RE' : s.value === 'Agencia Digital' ? 'MKT' : 'EC'}</span>
                    </span>
                  ) : s.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Columna 2 — Buyer Persona */}
      <div className="flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-[#0A0D14] border border-white/[0.06] rounded-lg p-3 h-full flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#185de8] to-[#6bdda1] flex items-center justify-center text-white text-[10px] font-bold">P</div>
            <div>
              <div className="text-[11px] text-white font-semibold">Pedro, 38 años</div>
              <div className="text-[9px] text-[#64748B]">Buyer persona</div>
            </div>
          </div>
          {[
            'Busca: 2do inmueble / inversión',
            'Ciclo decisión: 2-4 semanas',
            'Objeciones: precio, financiación',
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.3 }}
              className="text-[10px] text-[#8B8B9E] border-l-2 border-[#185de8]/30 pl-2 py-1 mt-1"
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Columna 3 — Proceso actual */}
      <div className="flex flex-col gap-1.5">
        {flowNodes.map((node, i) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.3 }}
            className="relative"
          >
            <div className="bg-[#0A0D14] border border-white/[0.06] rounded-lg px-2.5 py-2 text-[10px] text-white font-medium text-center">
              {node.label}
            </div>
            {node.alert && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.3, duration: 0.25 }}
                className="text-[8px] text-[#ef4444] bg-[#ef4444]/10 border border-[#ef4444]/20 rounded px-1.5 py-0.5 mt-1 text-center"
              >
                {node.alert}
              </motion.div>
            )}
            {i < flowNodes.length - 1 && (
              <div className="h-1.5 flex justify-center">
                <div className="w-px bg-white/[0.08]" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 2: Definición del Rol — Matriz de Decisión
   ═══════════════════════════════════════════════════════════════════ */

const Step2Matrix = () => {
  const aiTasks = [
    'Responder consultas entrantes (< 30s)',
    'Calificar leads por criterios',
    'Agendar reuniones en calendario',
    'Seguimiento automático (D+1, D+3, D+7)',
    'Actualizar CRM tras cada interacción',
    'Enviar resúmenes al equipo humano',
  ];

  const humanTasks = [
    'Cerrar negociación y precio',
    'Manejo de objeciones complejas',
    'Relaciones estratégicas',
    'Decisiones fuera del guión',
    'Supervisión y ajustes al sistema',
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="text-[10px] text-[#64748B] uppercase tracking-widest text-center mb-3 font-semibold">Matriz de Decisión</div>
      <div className="flex-1 grid grid-cols-2 gap-3 relative">
        {/* Línea divisoria central */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
          <motion.div
            className="w-full h-full"
            style={{ background: 'linear-gradient(180deg, #185de8, #6bdda1, #185de8)' }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Lado IA */}
        <div className="pr-2">
          <div className="flex items-center gap-1.5 mb-3">
            <Bot className="w-3.5 h-3.5 text-[#6bdda1]" />
            <span className="text-[10px] font-bold text-[#6bdda1] uppercase tracking-wider">Empleado IA</span>
          </div>
          <div className="space-y-1.5">
            {aiTasks.map((task, i) => (
              <motion.div
                key={task}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.3, duration: 0.3 }}
                className="flex items-start gap-1.5"
              >
                <Check className="w-3 h-3 text-[#6bdda1] flex-shrink-0 mt-0.5" />
                <span className="text-[10px] text-[#94A3B8] leading-tight">{task}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lado Humano */}
        <div className="pl-2">
          <div className="flex items-center gap-1.5 mb-3">
            <Users className="w-3.5 h-3.5 text-[#185de8]" />
            <span className="text-[10px] font-bold text-[#185de8] uppercase tracking-wider">Equipo Comercial</span>
          </div>
          <div className="space-y-1.5">
            {humanTasks.map((task, i) => (
              <motion.div
                key={task}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.3, duration: 0.3 }}
                className="flex items-start gap-1.5"
              >
                <Check className="w-3 h-3 text-[#185de8] flex-shrink-0 mt-0.5" />
                <span className="text-[10px] text-[#94A3B8] leading-tight">{task}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="text-[9px] text-[#64748B] text-center mt-3 pt-2 border-t border-white/[0.04] italic"
      >
        Cada tarea fue negociada con tu equipo, no impuesta.
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 3: Arquitectura — Flowchart de Decisión
   ═══════════════════════════════════════════════════════════════════ */

const Step3Architecture = () => {
  const [pulseTarget, setPulseTarget] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTarget(p => (p + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const outcomes = [
    { label: '📅 Agendar reunión', color: '#6bdda1', filled: true },
    { label: '🔁 Nutrir con contenido', color: '#6bdda1', filled: false },
    { label: '💤 Archivar + D+30', color: '#64748B', filled: false },
  ];

  const rules = [
    'Presupuesto ≥ USD 100k → Calificado',
    'Timing ≤ 3 meses → Calificado',
    'Responde en < 24hs → Calificado',
    '≥ 3 criterios → Agenda automática',
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Flowchart */}
      <div className="flex-1 flex flex-col items-center gap-2 mb-3">
        {/* Nodo entrada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0A0D14] border border-[#6bdda1]/30 rounded-full px-4 py-1.5 text-[11px] text-white font-medium"
        >
          📩 Lead entra
        </motion.div>

        <div className="w-px h-4 bg-white/[0.08]" />

        {/* Nodo decisión */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-[#0A0D14] border border-[#185de8]/40 rounded-lg px-4 py-2 text-[11px] text-white font-medium transform rotate-0"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' , padding: '16px 28px' }}
        >
          🧠 ¿Calificado?
        </motion.div>

        <div className="w-px h-3 bg-white/[0.08]" />

        {/* Tres ramas */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {outcomes.map((out, i) => (
            <motion.div
              key={out.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: pulseTarget === i ? `0 0 12px ${out.color}30` : 'none',
              }}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.3 }}
              className={`rounded-lg px-2 py-2 text-[9px] text-center font-medium transition-colors duration-500 ${
                pulseTarget === i
                  ? 'border-2'
                  : 'border border-white/[0.06]'
              }`}
              style={{
                backgroundColor: out.filled && pulseTarget === i ? `${out.color}15` : '#0A0D14',
                borderColor: pulseTarget === i ? out.color : undefined,
                color: pulseTarget === i ? out.color : '#94A3B8',
              }}
            >
              {out.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Panel reglas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className="bg-[#0A0D14] border border-white/[0.06] rounded-lg p-3"
      >
        <div className="text-[9px] text-[#64748B] uppercase tracking-wider mb-2 font-semibold">Criterios de Decisión</div>
        <div className="space-y-1">
          {rules.map((rule, i) => (
            <motion.div
              key={rule}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 + i * 0.2, duration: 0.3 }}
              className="text-[9px] text-[#8B8B9E] pl-2 border-l border-[#185de8]/30"
            >
              {rule}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 4: Implementación — Hub de Integraciones
   ═══════════════════════════════════════════════════════════════════ */

const integrationTools = [
  { name: 'WhatsApp', color: '#25D366', icon: MessageCircle },
  { name: 'CRM', color: '#FF7A00', icon: Users },
  { name: 'Calendar', color: '#4285F4', icon: Calendar },
  { name: 'Gmail', color: '#EA4335', icon: Mail },
  { name: 'Meta', color: '#0668E1', icon: Bot },
  { name: 'Slack', color: '#4A154B', icon: Slack },
];

const Step4Integrations = () => {
  const [connectedCount, setConnectedCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setConnectedCount(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    integrationTools.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setConnectedCount(prev => prev + 1);
      }, 800 + i * 800));
    });

    const totalDuration = 800 + integrationTools.length * 800 + 3000;
    const resetTimer = setTimeout(() => {
      setCycle(c => c + 1);
    }, totalDuration);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resetTimer);
    };
  }, [cycle]);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {/* Hub central + orbitales */}
      <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center mx-auto">
        {/* Núcleo central */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center z-10 relative"
          style={{ background: 'linear-gradient(135deg, #185de8, #6bdda1)' }}
        >
          <Bot className="w-7 h-7 text-white" />
        </div>

        {/* Orbitales */}
        {integrationTools.map((tool, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const radius = 100;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isConnected = i < connectedCount;
          const Icon = tool.icon;

          return (
            <React.Fragment key={tool.name}>
              {/* Línea de conexión */}
              <motion.div
                className="absolute left-1/2 top-1/2 h-px origin-left z-0"
                style={{
                  width: radius - 20,
                  transform: `translate(-50%, -50%) translate(50%, 0) rotate(${i * 60 - 90}deg)`,
                  transformOrigin: '0 50%',
                  background: isConnected ? tool.color : '#1E293B',
                }}
                animate={{
                  opacity: isConnected ? [0.6, 1, 0.6] : 0.3,
                }}
                transition={isConnected ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
              />

              {/* Ícono orbital */}
              <motion.div
                className="absolute w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300"
                style={{
                  left: `calc(50% + ${x}px - 20px)`,
                  top: `calc(50% + ${y}px - 20px)`,
                  background: '#0A0D14',
                  border: `1.5px solid ${isConnected ? tool.color : '#1E293B'}`,
                  boxShadow: isConnected ? `0 0 12px ${tool.color}30` : 'none',
                }}
                animate={isConnected ? { scale: [1, 1.1, 1] } : {}}
                transition={isConnected ? { duration: 0.4 } : {}}
              >
                <Icon className="w-4 h-4" style={{ color: isConnected ? tool.color : '#64748B' }} />
              </motion.div>

              {/* Label */}
              <div
                className="absolute text-[8px] font-medium text-center transition-colors duration-300"
                style={{
                  left: `calc(50% + ${x}px - 24px)`,
                  top: `calc(50% + ${y}px + 22px)`,
                  width: 48,
                  color: isConnected ? '#6bdda1' : '#64748B',
                }}
              >
                {isConnected ? '✓ Conectado' : tool.name}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Barra de progreso */}
      <div className="mt-4 w-full max-w-[240px]">
        <div className="flex justify-between text-[9px] text-[#64748B] mb-1">
          <span>Integraciones: {connectedCount}/{integrationTools.length}</span>
          <span className="text-[#6bdda1]">Implementado en 7 días</span>
        </div>
        <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)', width: `${(connectedCount / integrationTools.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 5: Validación — QA Dashboard
   ═══════════════════════════════════════════════════════════════════ */

interface TestCase {
  emoji: string;
  label: string;
  score: number;
  pass: boolean;
}

const testCases: TestCase[] = [
  { emoji: '🔥', label: 'Cliente enojado', score: 94, pass: true },
  { emoji: '💸', label: 'Objeción de precio', score: 91, pass: true },
  { emoji: '❓', label: 'Consulta ambigua', score: 72, pass: false },
  { emoji: '🌙', label: 'Fuera de horario', score: 98, pass: true },
  { emoji: '🗣️', label: 'Slang regional', score: 89, pass: true },
  { emoji: '🤔', label: 'Cliente indeciso', score: 87, pass: true },
  { emoji: '📞', label: 'Escalamiento a humano', score: 96, pass: true },
  { emoji: '🚫', label: 'Fuera de scope', score: 93, pass: true },
];

const Step5Validation = () => {
  const [progress, setProgress] = useState<number[]>([]);
  const [counter, setCounter] = useState(247);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setProgress([]);
    setCounter(247);
    const timers: ReturnType<typeof setTimeout>[] = [];
    testCases.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setProgress(p => [...p, i]);
      }, i * 1200));
    });

    const resetTimer = setTimeout(() => {
      setCycle(c => c + 1);
    }, testCases.length * 1200 + 3000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(resetTimer);
    };
  }, [cycle]);

  // Counter incrementa
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(p => p + 1);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const passedCount = progress.filter(i => testCases[i].pass).length;
  const adjustCount = progress.filter(i => !testCases[i].pass).length;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#6bdda1]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] text-[#6bdda1] font-semibold uppercase tracking-wider">Ejecutando Pruebas</span>
        </div>
        <span className="text-[10px] text-[#64748B]">{counter} conversaciones</span>
      </div>

      {/* Lista de tests */}
      <div className="flex-1 space-y-1 overflow-hidden">
        {testCases.map((tc, i) => {
          const isDone = progress.includes(i);
          const isRunning = !isDone && progress.length === i;

          return (
            <motion.div
              key={tc.label}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: isDone || isRunning ? 1 : 0.4 }}
              className="flex items-center justify-between bg-[#0A0D14] border border-white/[0.04] rounded-lg px-2.5 py-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px]">{tc.emoji}</span>
                <span className="text-[10px] text-white font-medium">{tc.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {isDone ? (
                  <>
                    {tc.pass ? (
                      <CheckCircle2 className="w-3 h-3 text-[#6bdda1]" />
                    ) : (
                      <AlertTriangle className="w-3 h-3 text-[#FFA94D]" />
                    )}
                    <span className={`text-[10px] font-semibold ${tc.pass ? 'text-[#6bdda1]' : 'text-[#FFA94D]'}`}>
                      {tc.score}/100
                    </span>
                  </>
                ) : isRunning ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <Loader2 className="w-3 h-3 text-[#6bdda1]" />
                  </motion.div>
                ) : (
                  <span className="text-[10px] text-[#334155]">—</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-2 pt-2 border-t border-white/[0.04] text-[9px] text-[#64748B]">
        Score promedio: <span className="text-[#6bdda1]">90/100</span> · {adjustCount > 0 ? <span className="text-[#FFA94D]">1 caso requiere ajuste</span> : 'Evaluando...'}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MICRO-ANIMACIÓN 6: Optimización — Gráfico de Métricas + Before/After KPIs
   ═══════════════════════════════════════════════════════════════════ */

const insights = [
  '💡 Detectó que clientes responden mejor a audios cortos',
  '💡 Optimizó horario de envío a 10:30 AM (mejor tasa)',
  '💡 Agregó 12 objeciones nuevas al catálogo',
  '💡 Redujo 18% el tiempo de respuesta promedio',
];

/* ── Count-up hook ── */
function useCountUp(target: number, duration: number, start: boolean, suffix = '', isTime = false): string {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) { setValue(0); return; }
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  if (isTime) {
    // Format as hours and minutes for "before" or seconds for "after"
    if (suffix === 'seg') return `${value} seg`;
    const h = Math.floor(value / 60);
    const m = value % 60;
    return `${h}h ${m}min`;
  }
  return `${value}${suffix}`;
}

/* ── Single KPI Row ── */
const KPIRow = ({ label, beforeValue, afterValue, beforeSuffix, afterSuffix, changeLabel, changeDirection, started, delay, isTimeBefore, isTimeAfter }: {
  label: string;
  beforeValue: number;
  afterValue: number;
  beforeSuffix: string;
  afterSuffix: string;
  changeLabel: string;
  changeDirection: 'up' | 'down';
  started: boolean;
  delay: number;
  isTimeBefore?: boolean;
  isTimeAfter?: boolean;
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);

  const before = useCountUp(beforeValue, 1200, show, beforeSuffix, isTimeBefore);
  const after = useCountUp(afterValue, 1400, show, afterSuffix, isTimeAfter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-[1fr_auto_1fr] items-center gap-2"
    >
      {/* Before */}
      <div className="text-right">
        <div className="text-[9px] text-[#64748B] mb-0.5">{label}</div>
        <div className="text-[16px] font-bold text-[#64748B] tabular-nums">{before}</div>
      </div>
      {/* Arrow / change */}
      <div className="flex flex-col items-center">
        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${changeDirection === 'down' ? 'text-[#6bdda1] bg-[#6bdda1]/10' : 'text-[#6bdda1] bg-[#6bdda1]/10'}`}>
          {changeDirection === 'up' ? '↑' : '↓'} {changeLabel}
        </span>
      </div>
      {/* After */}
      <div>
        <div className="text-[9px] text-[#6bdda1]/70 mb-0.5">{label}</div>
        <div className="text-[16px] font-bold text-[#6bdda1] tabular-nums">{after}</div>
      </div>
    </motion.div>
  );
};

const Step6Optimization = () => {
  const [insightIdx, setInsightIdx] = useState(0);
  const [drawProgress, setDrawProgress] = useState(0);
  const [cycle, setCycle] = useState(0);
  const kpiRef = useRef<HTMLDivElement>(null);
  const [kpiVisible, setKpiVisible] = useState(false);

  // Observe KPI section visibility
  useEffect(() => {
    if (!kpiRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setKpiVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(kpiRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setInsightIdx(p => (p + 1) % insights.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setDrawProgress(0);
    const interval = setInterval(() => {
      setDrawProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 40);

    const resetTimer = setTimeout(() => {
      setCycle(c => c + 1);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(resetTimer);
    };
  }, [cycle]);

  const metrics = [
    { label: 'Respuesta exitosa', color: '#6bdda1', points: [72, 76, 79, 80, 83, 85, 87, 89, 91, 93, 94, 96] },
    { label: 'Satisfacción cliente', color: '#185de8', points: [68, 71, 73, 76, 78, 80, 83, 85, 87, 89, 90, 91] },
    { label: 'Leads calificados', color: '#A78BFA', points: [74, 76, 77, 79, 81, 83, 85, 87, 89, 91, 92, 93] },
  ];

  const chartH = 120;
  const chartW = 280;
  const stepX = chartW / 11;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold">Métricas de Aprendizaje</span>
        <motion.div
          className="text-[9px] text-[#6bdda1] bg-[#6bdda1]/10 border border-[#6bdda1]/20 rounded-full px-2 py-0.5 font-medium"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          MEJORA +23%
        </motion.div>
      </div>

      {/* Gráfico SVG */}
      <div className="flex items-center justify-center">
        <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} className="w-full max-w-[300px]" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(v => {
            const y = chartH - (v / 100) * chartH;
            return (
              <g key={v}>
                <line x1={0} y1={y} x2={chartW} y2={y} stroke="#1E293B" strokeWidth={0.5} />
                <text x={-2} y={y + 3} fill="#475569" fontSize={7} textAnchor="end">{v}%</text>
              </g>
            );
          })}

          {/* Week labels */}
          {Array.from({ length: 12 }, (_, i) => (
            <text key={i} x={i * stepX} y={chartH + 14} fill="#475569" fontSize={6} textAnchor="middle">
              S{i + 1}
            </text>
          ))}

          {/* Líneas de métricas */}
          {metrics.map((m, mi) => {
            const pathData = m.points
              .map((v, i) => {
                const x = i * stepX;
                const y = chartH - (v / 100) * chartH;
                return `${i === 0 ? 'M' : 'L'}${x},${y}`;
              })
              .join(' ');

            const visiblePoints = Math.floor((drawProgress / 100) * 12);

            return (
              <g key={m.label}>
                <motion.path
                  d={pathData}
                  fill="none"
                  stroke={m.color}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeDasharray="1000"
                  strokeDashoffset={1000 - (drawProgress / 100) * 1000}
                  opacity={0.8}
                />
                {/* Gradient fill for primera línea */}
                {mi === 0 && (
                  <motion.path
                    d={`${pathData} L${(m.points.length - 1) * stepX},${chartH} L0,${chartH} Z`}
                    fill={m.color}
                    opacity={0.06 * (drawProgress / 100)}
                  />
                )}
                {/* Dots */}
                {m.points.slice(0, visiblePoints).map((v, i) => (
                  <motion.circle
                    key={i}
                    cx={i * stepX}
                    cy={chartH - (v / 100) * chartH}
                    r={2}
                    fill={m.color}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex gap-3 justify-center mb-3">
        {metrics.map(m => (
          <div key={m.label} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
            <span className="text-[8px] text-[#64748B]">{m.label}</span>
          </div>
        ))}
      </div>

      {/* ═══ BEFORE / AFTER KPIs ═══ */}
      <div ref={kpiRef} className="bg-[#0A0D14] border border-white/[0.06] rounded-xl p-4 mt-1">
        {/* Column headers */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 mb-4">
          <div className="text-right">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#64748B]">Antes de Scala</span>
          </div>
          <div className="w-px" />
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#6bdda1]">Después de 90 días</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-4" />

        {/* KPI Rows */}
        <div className="space-y-4">
          <KPIRow
            label="Tiempo respuesta"
            beforeValue={260}
            afterValue={28}
            beforeSuffix=""
            afterSuffix="seg"
            changeLabel="99%"
            changeDirection="down"
            started={kpiVisible}
            delay={0}
            isTimeBefore={true}
            isTimeAfter={true}
          />
          <KPIRow
            label="Leads sin contactar"
            beforeValue={42}
            afterValue={3}
            beforeSuffix="%"
            afterSuffix="%"
            changeLabel="93%"
            changeDirection="down"
            started={kpiVisible}
            delay={300}
          />
          <KPIRow
            label="Tasa de cierre"
            beforeValue={8}
            afterValue={19}
            beforeSuffix="%"
            afterSuffix="%"
            changeLabel="137%"
            changeDirection="up"
            started={kpiVisible}
            delay={600}
          />
        </div>
      </div>

      {/* Insights rotantes */}
      <div className="bg-[#0A0D14] border border-white/[0.04] rounded-lg p-2 mt-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={insightIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="text-[9px] text-[#8B8B9E] flex items-center gap-1.5"
          >
            <Lightbulb className="w-3 h-3 text-[#6bdda1] flex-shrink-0" />
            {insights[insightIdx]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTES DE VISUALIZACIÓN MAPEADOS
   ═══════════════════════════════════════════════════════════════════ */

const stepVisualizations: React.FC[] = [
  Step1Discovery,
  Step2Matrix,
  Step3Architecture,
  Step4Integrations,
  Step5Validation,
  Step6Optimization,
];

/* ═══════════════════════════════════════════════════════════════════
   DESKTOP LAYOUT — Click-based navigation (reliable)
   ═══════════════════════════════════════════════════════════════════ */

const DesktopLayout = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance timer (optional, pauses on interaction)
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayRef = useRef(autoPlay);
  autoPlayRef.current = autoPlay;

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      if (autoPlayRef.current) {
        setActiveStep(prev => (prev + 1) % steps.length);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const handleStepClick = useCallback((stepIdx: number) => {
    setActiveStep(stepIdx);
    setAutoPlay(false);
    // Resume auto-play after 20s of inactivity
    setTimeout(() => setAutoPlay(true), 20000);
  }, []);

  return (
    <div className="container-custom">
      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Columna izquierda — Lista de pasos */}
        <div className="col-span-5 lg:col-span-4">
          <div className="relative">
            {/* Línea conectora vertical */}
            <div className="absolute left-[14px] top-[14px] bottom-[14px] w-[1.5px] bg-[#1E293B]">
              <motion.div
                className="w-full rounded-full"
                style={{
                  background: 'linear-gradient(180deg, #6bdda1, #185de8)',
                }}
                animate={{
                  height: `${((activeStep + 1) / steps.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Pasos */}
            <div className="space-y-5">
              {steps.map((step, i) => {
                const isActive = i === activeStep;
                const isCompleted = i < activeStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(i)}
                    className={`flex items-start gap-4 w-full text-left transition-all duration-400 cursor-pointer group ${
                      isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                    aria-current={isActive ? 'step' : undefined}
                    tabIndex={0}
                  >
                    {/* Indicador circular */}
                    <div
                      className={`w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 text-[11px] font-bold relative z-10 ${
                        isActive
                          ? 'bg-[#6bdda1] text-black shadow-[0_0_20px_rgba(107,221,161,0.5)]'
                          : isCompleted
                          ? 'bg-[#6bdda1]/20 text-[#6bdda1]'
                          : 'bg-transparent border border-[#334155] text-[#64748B]'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.id}
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-[#64748B] uppercase tracking-widest mb-0.5">{step.label}</div>
                      <div
                        className={`text-[16px] lg:text-[18px] font-semibold transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-[#64748B]'
                        }`}
                        style={{ fontFamily: 'var(--font-primary)' }}
                      >
                        {step.title}
                      </div>

                      {/* Descripción — solo visible en paso activo */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, y: 4 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 4 }}
                            transition={{ duration: 0.3 }}
                            className="text-[13px] text-[#8B8B9E] leading-relaxed mt-1.5 overflow-hidden"
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Columna derecha — Visualización */}
        <div className="col-span-7 lg:col-span-8">
          <div className="bg-[#060606] border border-white/[0.06] rounded-[20px] p-5 lg:p-7 relative overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)]" style={{ minHeight: '460px' }}>
            {/* Glow accents */}
            <div className="absolute -top-20 -right-20 w-[200px] h-[200px] bg-[#185de8]/8 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-[200px] h-[200px] bg-[#6bdda1]/6 blur-[80px] pointer-events-none" />
            
            {/* Número watermark */}
            <div className="absolute right-4 top-2 text-[120px] lg:text-[160px] font-black text-white/[0.02] leading-none select-none pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeStep}
                  initial={{ opacity: 0, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4 }}
                >
                  0{activeStep + 1}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Label superior */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="text-[9px] text-[#475569] uppercase tracking-widest">
                VISTA PREVIA · PASO 0{activeStep + 1}
              </div>
              {/* Step indicator dots */}
              <div className="flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleStepClick(i)}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeStep
                        ? 'w-5 h-1.5 bg-[#6bdda1]'
                        : i < activeStep
                        ? 'w-1.5 h-1.5 bg-[#6bdda1]/40'
                        : 'w-1.5 h-1.5 bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Contenido — crossfade entre pasos */}
            <div className="relative z-10" style={{ minHeight: '380px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                  style={{ minHeight: '380px' }}
                >
                  {React.createElement(stepVisualizations[activeStep])}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom progress bar */}
            <div className="mt-4 pt-3 border-t border-white/[0.04] relative z-10">
              <div className="flex items-center justify-between text-[9px] text-[#475569] mb-1.5">
                <span>{steps[activeStep].label} — {steps[activeStep].title}</span>
                <span className="text-[#6bdda1]">{activeStep + 1} de {steps.length}</span>
              </div>
              <div className="h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }}
                  animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MOBILE LAYOUT — Apilado vertical sin sticky scroll
   ═══════════════════════════════════════════════════════════════════ */

const MobileLayout = () => (
  <div className="space-y-8">
    {steps.map((step, i) => {
      const StepViz = stepVisualizations[i];
      const Icon = step.icon;

      return (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="bg-[#060606] border border-white/[0.05] rounded-[20px] p-5 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
        >
          {/* Header del paso */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#6bdda1] flex items-center justify-center text-black text-[12px] font-bold">
              {step.id}
            </div>
            <div>
              <div className="text-[9px] text-[#64748B] uppercase tracking-wider">{step.label}</div>
              <div className="text-[16px] font-semibold text-white" style={{ fontFamily: 'var(--font-primary)' }}>
                {step.title}
              </div>
            </div>
          </div>
          <p className="text-[13px] text-[#8B8B9E] leading-relaxed mb-4">{step.description}</p>

          {/* Visualización */}
          <div className="min-h-[250px]">
            <StepViz />
          </div>
        </motion.div>
      );
    })}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════════════ */

const ScalaProcessShowcase: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <section
      className="bg-[#020202] relative overflow-hidden"
      role="region"
      aria-label="Proceso de 6 fases para diseñar un Empleado IA"
    >
      {/* Header */}
      <div className="container-custom pt-24 lg:pt-32 pb-16 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[900px] mx-auto"
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-[#6bdda1] text-[11px] font-bold uppercase tracking-[0.2em] mb-5 bg-[#6bdda1]/10 border border-[#6bdda1]/20 rounded-full px-4 py-1.5">
            Nuestro Método
          </span>

          <h2
            className="text-[32px] md:text-[44px] lg:text-[52px] font-bold text-white mb-5 leading-[1.1] tracking-tight"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Cómo diseñamos un Empleado IA en Scala
          </h2>

          <p
            className="text-[15px] md:text-[17px] text-[#8B8B9E] leading-relaxed max-w-[680px] mx-auto"
            style={{ fontFamily: 'var(--font-secondary)' }}
          >
            Seis fases que combinan diagnóstico profundo, ingeniería comercial y optimización continua. Así construimos sistemas que se sienten parte del equipo, no un bot más.
          </p>
        </motion.div>
      </div>

      {/* Layout condicional */}
      <div className="pb-24 lg:pb-32">
        {isMobile ? (
          <div className="container-custom">
            <MobileLayout />
          </div>
        ) : (
          <DesktopLayout />
        )}
      </div>
    </section>
  );
};

export default ScalaProcessShowcase;
