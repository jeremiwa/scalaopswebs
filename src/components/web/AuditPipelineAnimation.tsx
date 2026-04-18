import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   AuditPipelineAnimation
   
   Animación de auditoría en tiempo real para el hero de
   scalaops.com/web/auditoria. Una lupa recorre un pipeline
   comercial vertical detectando fugas en cada etapa.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Etapas del pipeline (editable) ─── */
const STAGES = [
  { label: 'Leads entrantes', value: '847' },
  { label: 'Contactados <5min', value: '312' },
  { label: 'Con seguimiento activo', value: '184' },
  { label: 'Propuesta enviada', value: '96' },
  { label: 'Cerrados', value: '41' },
];

/* ─── Mensajes de popover por etapa (editable) ─── */
const POP_MSGS = [
  { text: '⚠ −63% fuga', color: '#FF4D6D' },
  { text: '⚠ −41% fuga · resp. lenta', color: '#FF4D6D' },
  { text: '⚠ −48% fuga · sin follow-up', color: '#FF4D6D' },
  { text: '⚠ −57% fuga · prop. frías', color: '#FF4D6D' },
  { text: '✓ 41 cerradas', color: '#00D4AA' },
];

/* ─── Layout (viewBox 0 0 480 580) ─── */
const NX = 64;
const Y0 = 55;
const DY = 110;
const ny = (i: number) => Y0 + i * DY;
const LX = NX + 32;
const PX = 260;

/* ─── Colores de marca Scala ─── */
const CL = {
  blue: '#0066FF',
  teal: '#00D4AA',
  red: '#FF4D6D',
  bOff: '#334155',
  fill: '#0F172A',
  lOff: '#64748B',
  lOn: '#FFFFFF',
  nOff: '#94A3B8',
  nOn: '#FFFFFF',
  pBg: '#0F172A',
  pBd: '#1E293B',
};

/* ─── Duración total del loop ─── */
const DUR = 10;

/* ═══════════════════════════════════════════════════════════════
   TIMING (normalizado 0–1, sobre 10 segundos)
   
   Fase 0: 0.00–0.10  Lupa entra (fade in + scale desde 0.7)
   Fase 1: 0.10–0.28  Lupa en nodo 0 (escaneo)
   Fase 2: 0.28–0.44  Tránsito → nodo 1 → hold
   Fase 3: 0.44–0.60  Tránsito → nodo 2 → hold
   Fase 4: 0.60–0.76  Tránsito → nodo 3 → hold
   Fase 5: 0.76–0.92  Tránsito → nodo 4 → hold
   Fase 6: 0.92–1.00  Lupa sale (fade out)
   ═══════════════════════════════════════════════════════════════ */

// Ventanas de escaneo por nodo [inicio_hold, fin_hold]
const SCAN: [number, number][] = [
  [0.10, 0.28],
  [0.33, 0.44],
  [0.49, 0.60],
  [0.65, 0.76],
  [0.81, 0.92],
];

// Ventanas de popover (offset de ±0.02 ≈ 200ms)
const POPW: [number, number][] = SCAN.map(([s, e]) => [s + 0.02, e - 0.02]);

/* ─── Helper: keyframes con activación por ventana temporal ─── */
function wk<T>(base: T, active: T, s: number, e: number): { t: number[]; v: T[] } {
  return {
    t: [0, Math.max(0.005, s - 0.01), s, e, Math.min(0.995, e + 0.01), 1],
    v: [base, base, active, active, base, base],
  };
}

/* ─── Keyframes de la lupa (posición Y, opacidad, escala) ─── */
const LY_T = [0, 0.10, 0.28, 0.33, 0.44, 0.49, 0.60, 0.65, 0.76, 0.81, 0.92, 1.0];
const LY_V = [-30, ny(0), ny(0), ny(1), ny(1), ny(2), ny(2), ny(3), ny(3), ny(4), ny(4), ny(4)];
const LO_T = [0, 0.04, 0.10, 0.90, 0.96, 1.0];
const LO_V = [0, 1, 1, 1, 0, 0];
const LS_T = [0, 0.08, 0.10, 1.0];
const LS_V = [0.7, 1.0, 1.0, 1.0];

/* ─── Keyframes pre-calculados por nodo (evita recrear en render) ─── */
const NODE_KF = STAGES.map((_, i) => {
  const isLast = i === 4;
  const ac = isLast ? CL.teal : CL.blue;
  const [sS, sE] = SCAN[i];
  const [pS, pE] = POPW[i];

  const pop = wk(0, 1, pS, pE);

  return {
    stroke: wk(CL.bOff, ac, sS, sE),
    scale: wk(1, 1.15, sS, sE),
    label: wk(CL.lOff, CL.lOn, sS, sE),
    num: wk(CL.nOff, CL.nOn, sS, sE),
    pop,
    popX: pop.v.map((v: number) => (v === 0 ? 10 : 0)),
    ringT: [0, Math.max(0.005, sS - 0.005), sS, sS + 0.02, sS + 0.05, 1],
    ringSc: [1, 1, 1, 1.8, 2.5, 2.5],
    ringOp: [0, 0, 0.5, 0.2, 0, 0],
    activeColor: ac,
  };
});

/* ─── Transición base reutilizable ─── */
const loop = { duration: DUR, repeat: Infinity };

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
   ═══════════════════════════════════════════════════════════════ */

export default function AuditPipelineAnimation() {
  const reducedMotion = useReducedMotion();

  /* ─── Versión estática (prefers-reduced-motion: reduce) ─── */
  if (reducedMotion) {
    return (
      <div
        role="img"
        aria-label="Pipeline comercial con indicadores de fugas detectadas en cada etapa"
        className="w-full max-w-[480px] mx-auto hidden md:block"
      >
        <svg viewBox="0 0 480 580" preserveAspectRatio="xMidYMid meet" className="w-full h-auto">
          <line x1={NX} y1={ny(0)} x2={NX} y2={ny(4)} stroke={CL.bOff} strokeWidth="2" />
          {STAGES.map((stage, i) => {
            const y = ny(i);
            const kf = NODE_KF[i];
            return (
              <g key={i}>
                <circle cx={NX} cy={y} r={12} fill={CL.fill} stroke={kf.activeColor} strokeWidth="2" />
                <text x={LX} y={y - 6} fill={CL.lOn} fontSize="13" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">{stage.label}</text>
                <text x={LX} y={y + 14} fill={CL.nOn} fontSize="15" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">{stage.value}</text>
                <foreignObject x={PX} y={y - 14} width="200" height="30">
                  <div style={{ background: CL.pBg, border: `1px solid ${CL.pBd}`, borderRadius: 6, padding: '4px 10px', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, system-ui, sans-serif', color: POP_MSGS[i].color, whiteSpace: 'nowrap', display: 'inline-block' }}>
                    {POP_MSGS[i].text}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  /* ─── Versión animada ─── */
  return (
    <div
      role="img"
      aria-label="Animación de auditoría: análisis en tiempo real de fugas en el pipeline comercial"
      className="w-full max-w-[480px] mx-auto hidden md:block"
    >
      <svg viewBox="0 0 480 580" preserveAspectRatio="xMidYMid meet" className="w-full h-auto" style={{ overflow: 'visible' }}>
        <defs>
          {/* Filtros de glow */}
          <filter id="gl" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <filter id="gr" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>

        {/* ─── Línea base del pipeline ─── */}
        <line x1={NX} y1={ny(0)} x2={NX} y2={ny(4)} stroke={CL.bOff} strokeWidth="2" strokeLinecap="round" />

        {/* ─── Flujo animado sobre la línea (simula datos moviéndose) ─── */}
        <motion.line
          x1={NX} y1={ny(0)} x2={NX} y2={ny(4)}
          stroke={CL.blue} strokeWidth="2" strokeDasharray="6 18" strokeLinecap="round" opacity={0.2}
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* ─── Nodos del pipeline ─── */}
        {STAGES.map((stage, i) => {
          const y = ny(i);
          const kf = NODE_KF[i];

          return (
            <g key={i}>
              {/* Ring pulse: escala y desvanece al activarse el nodo */}
              <g transform={`translate(${NX},${y})`}>
                <motion.circle
                  cx={0} cy={0} r={12}
                  fill="none" stroke={kf.activeColor} strokeWidth="1.5"
                  filter="url(#gr)"
                  animate={{ scale: kf.ringSc, opacity: kf.ringOp }}
                  transition={{ ...loop, times: kf.ringT }}
                />
              </g>

              {/* Nodo principal: borde y escala animados */}
              <g transform={`translate(${NX},${y})`}>
                <motion.circle
                  cx={0} cy={0} r={12}
                  fill={CL.fill} strokeWidth="2"
                  animate={{ stroke: kf.stroke.v, scale: kf.scale.v }}
                  transition={{ ...loop, times: kf.stroke.t }}
                />
              </g>

              {/* Label del nodo */}
              <motion.text
                x={LX} y={y - 6}
                fontSize="13" fontWeight="600" fontFamily="Inter, system-ui, sans-serif"
                animate={{ fill: kf.label.v }}
                transition={{ ...loop, times: kf.label.t }}
              >
                {stage.label}
              </motion.text>

              {/* Valor numérico */}
              <motion.text
                x={LX} y={y + 14}
                fontSize="15" fontWeight="700" fontFamily="Inter, system-ui, sans-serif"
                animate={{ fill: kf.num.v }}
                transition={{ ...loop, times: kf.num.t }}
              >
                {stage.value}
              </motion.text>

              {/* Popover: aparece 200ms después de la lupa, desaparece 200ms antes */}
              <motion.g
                animate={{ opacity: kf.pop.v, x: kf.popX }}
                transition={{ ...loop, times: kf.pop.t }}
              >
                <foreignObject x={PX} y={y - 15} width="210" height="32">
                  <div
                    style={{
                      background: CL.pBg,
                      border: `1px solid ${CL.pBd}`,
                      borderRadius: 6,
                      padding: '5px 12px',
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: POP_MSGS[i].color,
                      whiteSpace: 'nowrap',
                      display: 'inline-block',
                    }}
                  >
                    {POP_MSGS[i].text}
                  </div>
                </foreignObject>
              </motion.g>
            </g>
          );
        })}

        {/* ═══ LUPA ═══ */}

        {/* Capa 1: posición X estática (centrada sobre el pipeline) */}
        <g transform={`translate(${NX},0)`}>

          {/* Capa 2: posición Y animada (viaja entre nodos con ease) */}
          <motion.g
            animate={{ y: LY_V }}
            transition={{ ...loop, times: LY_T, ease: 'easeInOut' }}
          >

            {/* Capa 3: opacidad (fade in al inicio, fade out al final) */}
            <motion.g
              animate={{ opacity: LO_V }}
              transition={{ ...loop, times: LO_T }}
            >

              {/* Capa 4: escala (entra desde 0.7 → 1.0) */}
              <motion.g
                animate={{ scale: LS_V }}
                transition={{ ...loop, times: LS_T }}
              >

                {/* Capa 5: float idle sutil (±2px, loop independiente 2s) */}
                <motion.g
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Glow difuso permanente */}
                  <circle cx={0} cy={0} r={24} fill={CL.teal} opacity={0.3} filter="url(#gl)" />

                  {/* Aro exterior doble */}
                  <circle cx={0} cy={0} r={24} fill="none" stroke={CL.teal} strokeWidth="2.5" opacity={0.9} />
                  <circle cx={0} cy={0} r={21} fill="none" stroke={CL.teal} strokeWidth="0.5" opacity={0.4} />

                  {/* Vidrio semitransparente */}
                  <circle cx={0} cy={0} r={20} fill={CL.teal} fillOpacity={0.05} />

                  {/* Reflejo del vidrio */}
                  <ellipse cx={-5} cy={-7} rx={8} ry={4} fill="white" opacity={0.07} transform="rotate(-25)" />

                  {/* Mango diagonal (abajo-derecha) */}
                  <line x1={17} y1={17} x2={36} y2={36} stroke={CL.teal} strokeWidth="3.5" strokeLinecap="round" opacity={0.9} />
                  <line x1={18} y1={18} x2={35} y2={35} stroke={CL.teal} strokeWidth="1.5" strokeLinecap="round" opacity={0.3} />
                </motion.g>

              </motion.g>
            </motion.g>
          </motion.g>
        </g>

      </svg>
    </div>
  );
}
