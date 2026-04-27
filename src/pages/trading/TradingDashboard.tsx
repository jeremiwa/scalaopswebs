import React, { useState, useEffect, useRef } from 'react';
import {
  AreaChart, Area, BarChart, Bar, Cell, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import {
  DEFAULT_INPUTS, simulateResults, getScaledEquitySeries,
  formatUsd, formatPct,
  type SimulatorInputs, type SimulatedResults,
} from './tradingData';

/* ── useCountUp hook ── */
function useCountUp(target: number, duration = 1200, decimals = 2): number {
  const [value, setValue] = useState(0);
  const prevTarget = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = prevTarget.current;
    const diff = target - start;
    const startTime = performance.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round((start + diff * eased) * Math.pow(10, decimals)) / Math.pow(10, decimals));
      if (progress < 1) { rafRef.current = requestAnimationFrame(animate); }
      else { prevTarget.current = target; }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, decimals]);

  return value;
}

/* ────────────────────────────────────────────
   INLINE STYLES (scoped to this page only)
   ──────────────────────────────────────────── */

const STYLES = `
  .td-root {
    --td-navy-950: #0a0e1a;
    --td-navy-900: #0d1221;
    --td-navy-800: #121829;
    --td-navy-700: #1a2138;
    --td-navy-600: #232d47;
    --td-navy-500: #364161;
    --td-navy-400: #4f5d82;
    --td-navy-300: #7584a8;
    --td-navy-200: #a0adca;
    --td-gain: #00e5a0;
    --td-gain-dim: #00c98c;
    --td-gain-glow: rgba(0,229,160,0.2);
    --td-loss: #ff4d6a;
    --td-loss-glow: rgba(255,77,106,0.15);
    --td-accent: #00d4ff;
    --td-accent-glow: rgba(0,212,255,0.15);
    --td-border: rgba(100,120,160,0.12);
    --td-border-h: rgba(100,120,160,0.24);
    --td-card: rgba(26,34,53,0.6);
    --td-card-h: rgba(35,45,71,0.5);

    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--td-navy-950);
    color: #e2e8f0;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
  .td-root *, .td-root *::before, .td-root *::after { box-sizing: border-box; }

  .td-card {
    background: var(--td-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--td-border);
    border-radius: 16px;
    transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .td-card:hover {
    border-color: var(--td-border-h);
    background: var(--td-card-h);
  }
  .td-card-s {
    background: var(--td-card);
    backdrop-filter: blur(20px);
    border: 1px solid var(--td-border);
    border-radius: 16px;
  }

  @keyframes td-fadeUp {
    from { opacity:0; transform:translateY(12px); }
    to { opacity:1; transform:translateY(0); }
  }
  .td-anim { animation: td-fadeUp .6s cubic-bezier(.4,0,.2,1) forwards; opacity:0; }

  @keyframes td-ping { 75%,100% { transform:scale(2); opacity:0; } }
  .td-ping { animation: td-ping 1s cubic-bezier(0,0,.2,1) infinite; }

  /* Slider */
  .td-root input[type=range] {
    -webkit-appearance:none; appearance:none; width:100%; height:4px;
    background:var(--td-navy-700); border-radius:2px; outline:none; cursor:pointer;
  }
  .td-root input[type=range]::-webkit-slider-thumb {
    -webkit-appearance:none; width:16px; height:16px; background:var(--td-accent);
    border-radius:50%; cursor:pointer; border:2px solid var(--td-navy-950);
    box-shadow:0 0 8px var(--td-accent-glow); transition:all .2s;
  }
  .td-root input[type=range]::-webkit-slider-thumb:hover { transform:scale(1.2); }
  .td-root input[type=range]::-moz-range-thumb {
    width:16px; height:16px; background:var(--td-accent); border-radius:50%;
    cursor:pointer; border:2px solid var(--td-navy-950); box-shadow:0 0 8px var(--td-accent-glow);
  }

  /* Number input */
  .td-root input[type=number] { -moz-appearance:textfield; }
  .td-root input[type=number]::-webkit-outer-spin-button,
  .td-root input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; margin:0; }

  /* Toggle */
  .td-toggle { width:40px; height:22px; border-radius:11px; background:var(--td-navy-700); position:relative; cursor:pointer; transition:background .3s; }
  .td-toggle.on { background:var(--td-gain); }
  .td-toggle-dot { width:18px; height:18px; border-radius:50%; background:#fff; position:absolute; top:2px; left:2px; transition:transform .3s cubic-bezier(.4,0,.2,1); }
  .td-toggle.on .td-toggle-dot { transform:translateX(18px); }

  /* Recharts */
  .td-root .recharts-cartesian-grid-horizontal line,
  .td-root .recharts-cartesian-grid-vertical line { stroke:rgba(100,120,160,0.06); }
  .td-root .recharts-tooltip-wrapper { outline:none !important; }

  /* Scrollbar */
  .td-root::-webkit-scrollbar { width:6px; }
  .td-root::-webkit-scrollbar-track { background:transparent; }
  .td-root::-webkit-scrollbar-thumb { background:var(--td-navy-600); border-radius:3px; }
`;

/* ── Tiny helper components ── */
const Pill: React.FC<{ children: React.ReactNode; variant: 'date' | 'active' | 'disclaimer' }> = ({ children, variant }) => {
  const base = 'inline-flex items-center gap-1.5 text-xs font-medium tracking-wide';
  if (variant === 'active')
    return <span className={`${base} px-3.5 py-1.5 rounded-full`} style={{ background: 'rgba(0,229,160,0.06)', color: 'var(--td-gain)', border: '1px solid rgba(0,229,160,0.2)' }}>{children}</span>;
  if (variant === 'disclaimer')
    return <span className={`${base} uppercase px-3 py-1 rounded-full`} style={{ fontSize: 10, color: 'var(--td-navy-400)', border: '1px solid var(--td-border)', background: 'rgba(13,18,33,0.5)' }}>{children}</span>;
  return <span className={`${base} px-3 py-1.5 rounded-full`} style={{ color: 'var(--td-navy-300)', border: '1px solid var(--td-border)', background: 'rgba(100,120,160,0.08)' }}>{children}</span>;
};

/* ── KPI Card ── */
const KpiCard: React.FC<{
  title: string; value: string; subvalue?: string;
  variant?: 'gain' | 'loss' | 'neutral' | 'accent'; delay?: number; icon?: React.ReactNode;
}> = ({ title, value, subvalue, variant = 'neutral', delay = 0, icon }) => {
  const color = { gain: 'var(--td-gain)', loss: 'var(--td-loss)', neutral: '#fff', accent: 'var(--td-accent)' }[variant];
  const glow = variant === 'gain' ? '0 0 20px var(--td-gain-glow)' : variant === 'loss' ? '0 0 20px var(--td-loss-glow)' : variant === 'accent' ? '0 0 20px var(--td-accent-glow)' : 'none';

  return (
    <div className="td-card td-anim" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8, animationDelay: `${delay}ms`, boxShadow: glow }}>
      <div className="flex items-center gap-2">
        {icon && <span style={{ color: 'var(--td-navy-400)' }}>{icon}</span>}
        <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--td-navy-400)' }}>{title}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color, lineHeight: 1.1 }}>{value}</div>
      {subvalue && <span style={{ fontSize: 13, fontWeight: 500, color: variant === 'loss' ? '#e0425c' : 'var(--td-navy-300)' }}>{subvalue}</span>}
    </div>
  );
};

/* ── Tooltip components ── */
const EqTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (<div className="td-card-s" style={{ padding: '10px 14px', borderRadius: 8 }}><p style={{ fontSize: 11, color: 'var(--td-navy-400)', marginBottom: 4 }}>{label}</p><p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>${formatUsd(payload[0].value)} USD</p></div>);
};
const PnlTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  return (<div className="td-card-s" style={{ padding: '10px 14px', borderRadius: 8 }}><p style={{ fontSize: 11, color: 'var(--td-navy-400)', marginBottom: 4 }}>{label}</p><p style={{ fontSize: 13, fontWeight: 700, color: v >= 0 ? 'var(--td-gain)' : 'var(--td-loss)' }}>{v >= 0 ? '+' : ''}{formatUsd(v)} USD</p></div>);
};

/* ── Metric Item ── */
const MetricItem: React.FC<{ label: string; value: string; sub?: string; variant?: 'gain' | 'loss' | 'neutral' }> = ({ label, value, sub, variant = 'neutral' }) => {
  const c = { gain: 'var(--td-gain)', loss: 'var(--td-loss)', neutral: '#fff' }[variant];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 12, borderRadius: 8, background: 'rgba(13,18,33,0.3)', border: '1px solid rgba(100,120,160,0.06)' }}>
      <span style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--td-navy-400)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: c }}>{value}</span>
      {sub && <span style={{ fontSize: 11, fontWeight: 500, color: variant === 'gain' ? 'var(--td-gain-dim)' : variant === 'loss' ? '#e0425c' : 'var(--td-navy-300)' }}>{sub}</span>}
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════ */

export function TradingDashboard() {
  const [inputs, setInputs] = useState<SimulatorInputs>(DEFAULT_INPUTS);
  const results = simulateResults(inputs);
  const equityData = getScaledEquitySeries(inputs, results);

  // Count‑up hooks
  const cTotalPnl = useCountUp(results.totalPnl, 1400, 2);
  const cTotalPnlPct = useCountUp(results.totalPnlPct, 1400, 2);
  const cDrawdown = useCountUp(results.maxEquityDrawdown, 1400, 2);
  const cDrawdownPct = useCountUp(results.maxEquityDrawdownPct, 1400, 2);
  const cTrades = useCountUp(results.totalTrades, 1000, 0);
  const cWinRate = useCountUp(results.winRate, 1200, 2);
  const cPF = useCountUp(results.profitFactor, 1200, 3);
  const cWinCount = useCountUp(results.winningTrades, 1000, 0);
  const cLoseCount = useCountUp(results.losingTrades, 1000, 0);

  // Chart filter
  const [filter, setFilter] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('ALL');
  const filterMap: Record<string, number> = { '1M': 1, '3M': 3, '6M': 6, '1Y': 12, 'ALL': 999 };
  const filteredData = filter === 'ALL' ? equityData : equityData.slice(Math.max(0, equityData.length - filterMap[filter]));
  const pnlData = filteredData.map(d => ({ month: d.month, pnl: d.monthlyPnl }));
  const minEq = Math.min(...filteredData.map(d => d.equity));
  const maxEq = Math.max(...filteredData.map(d => d.equity));
  const eqPad = (maxEq - minEq) * 0.1;

  // Donut
  const donutData = [
    { name: 'Win', value: results.winningTrades, color: '#00e5a0' },
    { name: 'Lose', value: results.losingTrades, color: '#ff4d6a' },
  ];
  const winLossRatio = results.losingTrades > 0 ? (results.avgWinningTrade / results.avgLosingTrade).toFixed(2) : '∞';

  const update = (p: Partial<SimulatorInputs>) => setInputs(prev => ({ ...prev, ...p }));

  // Course chips
  const chips = ['AI Strategy Design', 'Backtesting & Optimization', 'Risk Management Engine', 'Bot Execution Logic', 'Performance Analytics'];

  // Highlights
  const highlights = [
    { title: 'Consistent Capital Growth', desc: `+${formatPct(results.totalPnlPct)} simulated return over 24 months`, gradient: 'linear-gradient(135deg,#00e5a0,#00d4ff)' },
    { title: 'Risk Managed', desc: `Max equity drawdown limited to ${formatPct(results.maxEquityDrawdownPct)}`, gradient: 'linear-gradient(135deg,#ff4d6a,#ff8a4d)' },
    { title: 'AI-Driven Logic', desc: 'Adaptive entries, exits and risk controls', gradient: 'linear-gradient(135deg,#00d4ff,#7c3aed)' },
    { title: 'Positive Expectancy', desc: `Profit factor ${results.profitFactor.toFixed(3)} with ${results.totalTrades} operations`, gradient: 'linear-gradient(135deg,#00e5a0,#00d4ff)' },
  ];

  return (
    <>
      <style>{STYLES}</style>
      <div className="td-root" style={{ position: 'relative' }}>
        {/* Background */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: '25%', width: 600, height: 600, background: 'rgba(0,229,160,0.02)', borderRadius: '50%', filter: 'blur(120px)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: '25%', width: 500, height: 500, background: 'rgba(0,212,255,0.02)', borderRadius: '50%', filter: 'blur(100px)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', padding: '24px 24px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* ── HEADER ── */}
          <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>AI Bot Performance Dashboard</h1>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--td-navy-300)', marginTop: 4 }}>ETH Quant v5 · RSI Flow · Simulated Results</p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Pill variant="date">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.6 }}><rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" /><path d="M1 5h10" stroke="currentColor" strokeWidth="1.2" /><path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                Apr 23, 2024 — Apr 23, 2026
              </Pill>
              <Pill variant="active">
                <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8 }}>
                  <span className="td-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--td-gain)', opacity: 0.75 }} />
                  <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8, borderRadius: '50%', background: 'var(--td-gain)' }} />
                </span>
                Bot Status: ACTIVE
              </Pill>
              <Pill variant="disclaimer">Backtest simulation · Educational use only</Pill>
            </div>
          </header>

          {/* ── KPI ROW ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
            <KpiCard title="Total P&L" value={`+${formatUsd(cTotalPnl)} USD`} subvalue={`+${formatPct(cTotalPnlPct)}`} variant="gain" delay={0}
              icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 14L6 8L9 11L14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 2H14V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} />
            <KpiCard title="Max Equity Drawdown" value={`${formatUsd(cDrawdown)} USD`} subvalue={formatPct(cDrawdownPct)} variant="loss" delay={80}
              icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2L6 8L9 5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 14H14V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>} />
            <KpiCard title="Total Trades" value={`${cTrades}`} variant="neutral" delay={160}
              icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" /></svg>} />
            <KpiCard title="Profitable Trades" value={formatPct(cWinRate)} subvalue={`${results.winningTrades} / ${results.totalTrades}`} variant="gain" delay={240}
              icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" /><path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>} />
            <KpiCard title="Profit Factor" value={cPF.toFixed(3)} variant="accent" delay={320}
              icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M4 6l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>} />
          </div>

          {/* ── MAIN GRID: Chart + Sidebar ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>

            {/* Equity Chart */}
            <div className="td-card td-anim" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, animationDelay: '200ms' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>Capital Simulation</h2>
                  <p style={{ fontSize: 11, color: 'var(--td-navy-400)', margin: '2px 0 0' }}>Equity curve over time</p>
                </div>
                <div className="flex gap-1" style={{ padding: 4, background: 'rgba(13,18,33,0.5)', borderRadius: 8, border: '1px solid var(--td-border)' }}>
                  {(['1M', '3M', '6M', '1Y', 'ALL'] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                      style={{ padding: '5px 10px', fontSize: 11, fontWeight: 500, borderRadius: 6, cursor: 'pointer', border: filter === f ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent', background: filter === f ? 'rgba(0,212,255,0.12)' : 'transparent', color: filter === f ? 'var(--td-accent)' : 'var(--td-navy-400)', transition: 'all .2s' }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area chart */}
              <div style={{ height: 280, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredData} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00e5a0" stopOpacity={0.3} />
                        <stop offset="50%" stopColor="#00e5a0" stopOpacity={0.08} />
                        <stop offset="100%" stopColor="#00e5a0" stopOpacity={0} />
                      </linearGradient>
                      <filter id="glw"><feGaussianBlur stdDeviation="2" result="cb" /><feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,120,160,0.06)" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#7584a8' }} axisLine={{ stroke: 'rgba(100,120,160,0.1)' }} tickLine={false} interval={Math.max(0, Math.floor(filteredData.length / 8))} />
                    <YAxis tick={{ fontSize: 10, fill: '#7584a8' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} domain={[minEq - eqPad, maxEq + eqPad]} width={55} />
                    <Tooltip content={<EqTooltip />} />
                    <ReferenceLine y={inputs.initialCapital} stroke="rgba(100,120,160,0.2)" strokeDasharray="4 4" label={{ value: `Initial: $${(inputs.initialCapital / 1000).toFixed(0)}k`, position: 'left', fill: '#4f5d82', fontSize: 10 }} />
                    <Area type="monotone" dataKey="equity" stroke="#00e5a0" strokeWidth={2.5} fill="url(#eqGrad)" filter="url(#glw)" animationDuration={2000} animationEasing="ease-out" dot={false} activeDot={{ r: 5, stroke: '#00e5a0', strokeWidth: 2, fill: '#0a0e1a' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Final label */}
              <div className="flex items-center justify-between" style={{ padding: '0 8px' }}>
                <span style={{ fontSize: 11, color: 'var(--td-navy-400)' }}>Simulated equity performance</span>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 11, color: 'var(--td-navy-400)' }}>Final:</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--td-gain)' }}>${formatUsd(results.finalCapital)} USD</span>
                </div>
              </div>

              {/* Monthly P&L bars */}
              <div>
                <h3 style={{ fontSize: 11, fontWeight: 500, color: 'var(--td-navy-400)', marginBottom: 8, paddingLeft: 4 }}>Monthly P&L</h3>
                <div style={{ height: 100, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pnlData} margin={{ top: 5, right: 30, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,120,160,0.06)" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#4f5d82' }} axisLine={false} tickLine={false} interval={Math.max(0, Math.floor(pnlData.length / 8))} />
                      <YAxis tick={{ fontSize: 9, fill: '#4f5d82' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} width={55} />
                      <Tooltip content={<PnlTooltip />} />
                      <ReferenceLine y={0} stroke="rgba(100,120,160,0.15)" />
                      <Bar dataKey="pnl" radius={[3, 3, 0, 0]} animationDuration={1500} animationEasing="ease-out">
                        {pnlData.map((e, i) => <Cell key={i} fill={e.pnl >= 0 ? '#00e5a0' : '#ff4d6a'} fillOpacity={0.75} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Simulator */}
              <div className="td-card td-anim" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 18, animationDelay: '400ms' }}>
                <div className="flex items-center gap-2.5">
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </div>
                  <div>
                    <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>Results Simulator</h2>
                    <p style={{ fontSize: 10, color: 'var(--td-navy-400)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>Adjust parameters</p>
                  </div>
                </div>

                {/* Initial Capital */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div className="flex items-center justify-between">
                    <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--td-navy-300)' }}>Initial Capital</label>
                    <span style={{ fontSize: 11, color: 'var(--td-navy-400)' }}>${formatUsd(inputs.initialCapital, 0)}</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--td-navy-400)' }}>$</span>
                    <input
                      type="number" min={1000} max={10000000} step={1000} value={inputs.initialCapital}
                      onChange={e => { const v = Number(e.target.value); if (v > 0) update({ initialCapital: v }); }}
                      style={{ width: '100%', background: 'rgba(13,18,33,0.6)', border: '1px solid var(--td-border)', borderRadius: 8, padding: '9px 10px 9px 24px', fontSize: 13, fontWeight: 500, color: '#fff', outline: 'none', transition: 'border-color .2s' }}
                    />
                  </div>
                </div>

                {/* Operations */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div className="flex items-center justify-between">
                    <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--td-navy-300)' }}>Number of Operations</label>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{inputs.totalTrades}</span>
                  </div>
                  <input type="range" min={5} max={200} step={1} value={inputs.totalTrades} onChange={e => update({ totalTrades: Number(e.target.value) })} />
                  <div className="flex justify-between" style={{ fontSize: 10, color: 'var(--td-navy-500)' }}><span>5</span><span>200</span></div>
                </div>

                {/* Win Rate */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div className="flex items-center justify-between">
                    <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--td-navy-300)' }}>Win Rate</label>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--td-gain)' }}>{inputs.winRate.toFixed(2)}%</span>
                  </div>
                  <input type="range" min={30} max={80} step={0.5} value={inputs.winRate} onChange={e => update({ winRate: Number(e.target.value) })} />
                  <div className="flex justify-between" style={{ fontSize: 10, color: 'var(--td-navy-500)' }}><span>30%</span><span>80%</span></div>
                </div>

                {/* Open P&L toggle */}
                <div className="flex items-center justify-between">
                  <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--td-navy-300)' }}>Include Open P&L</label>
                  <div className={`td-toggle ${inputs.includeOpenPnl ? 'on' : ''}`} onClick={() => update({ includeOpenPnl: !inputs.includeOpenPnl })}>
                    <div className="td-toggle-dot" />
                  </div>
                </div>

                {/* Reset */}
                <button onClick={() => setInputs(DEFAULT_INPUTS)} style={{ fontSize: 11, color: 'var(--td-navy-400)', cursor: 'pointer', textAlign: 'center', padding: '8px 0', border: '1px solid var(--td-border)', borderRadius: 8, background: 'transparent', transition: 'all .2s' }}>
                  Reset to defaults
                </button>
              </div>

              {/* Operations Donut */}
              <div className="td-card td-anim" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, animationDelay: '300ms' }}>
                <div>
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>Operations Simulation</h2>
                  <p style={{ fontSize: 11, color: 'var(--td-navy-400)', margin: '2px 0 0' }}>Trade distribution</p>
                </div>

                <div style={{ position: 'relative', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={78} paddingAngle={3} dataKey="value" strokeWidth={0} animationDuration={1500} animationEasing="ease-out">
                        {donutData.map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                    <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>{cTrades}</span>
                    <span style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--td-navy-400)' }}>Total Trades</span>
                  </div>
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { color: '#00e5a0', name: 'Winning Trades', count: cWinCount, pct: results.winRate.toFixed(2) },
                    { color: '#ff4d6a', name: 'Losing Trades', count: cLoseCount, pct: (100 - results.winRate).toFixed(2) },
                    { color: '#4f5d82', name: 'Break Even', count: 0, pct: '0.00' },
                  ].map(l => (
                    <div key={l.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: l.color }} />
                        <span style={{ fontSize: 11, color: 'var(--td-navy-300)' }}>{l.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{l.count}</span>
                        <span style={{ fontSize: 10, color: 'var(--td-navy-400)' }}>/ {l.pct}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--td-border)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 11, color: 'var(--td-navy-400)' }}>Avg Payoff</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>${formatUsd(results.expectedPayoff)} USD</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 11, color: 'var(--td-navy-400)' }}>Win/Loss Ratio</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--td-accent)' }}>{winLossRatio}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── PERFORMANCE SUMMARY + KEY HIGHLIGHTS ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16 }}>

            {/* Performance */}
            <div className="td-card td-anim" style={{ padding: 20, animationDelay: '500ms' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10l3-4 3 3 4-7" stroke="#00e5a0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>Performance Summary</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8 }}>
                <MetricItem label="Initial Capital" value={`${formatUsd(results.initialCapital)} USD`} />
                <MetricItem label="Open P&L" value={`+${formatUsd(results.openPnl)} USD`} sub={`+${formatPct(results.openPnlPct)}`} variant="gain" />
                <MetricItem label="Net P&L" value={`+${formatUsd(results.netPnl)} USD`} sub={`+${formatPct(results.netPnlPct)}`} variant="gain" />
                <MetricItem label="Gross Profit" value={`${formatUsd(results.grossProfit)} USD`} variant="gain" />
                <MetricItem label="Gross Loss" value={`${formatUsd(results.grossLoss)} USD`} variant="loss" />
                <MetricItem label="Expected Payoff" value={`${formatUsd(results.expectedPayoff)} USD`} />
                <MetricItem label="CAGR" value={formatPct(results.cagr)} variant="gain" />
                <MetricItem label="Avg Winning Trade" value={`${formatUsd(results.avgWinningTrade)} USD`} sub={formatPct(results.avgWinningTradePct)} variant="gain" />
                <MetricItem label="Avg Losing Trade" value={`${formatUsd(results.avgLosingTrade)} USD`} sub={formatPct(results.avgLosingTradePct)} variant="loss" />
                <MetricItem label="Largest Win" value={`${formatUsd(results.largestWinningTrade)} USD`} sub={formatPct(results.largestWinningTradePct)} variant="gain" />
                <MetricItem label="Largest Loss" value={`${formatUsd(results.largestLosingTrade)} USD`} sub={formatPct(results.largestLosingTradePct)} variant="loss" />
                <MetricItem label="Final Capital" value={`${formatUsd(results.finalCapital)} USD`} variant="gain" />
              </div>
            </div>

            {/* Key Highlights */}
            <div className="td-card td-anim" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, animationDelay: '350ms' }}>
              <div className="flex items-center gap-2">
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polygon points="7,1 8.5,5 13,5 9.5,8 10.5,12 7,9.5 3.5,12 4.5,8 1,5 5.5,5" stroke="#00d4ff" strokeWidth="1" fill="none" /></svg>
                </div>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>Key Highlights</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'start', gap: 12, padding: 12, borderRadius: 8, background: 'rgba(13,18,33,0.3)', border: '1px solid rgba(100,120,160,0.06)', transition: 'border-color .3s' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(18,24,41,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: h.gradient }} />
                    </div>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{h.title}</span>
                      <span style={{ display: 'block', fontSize: 11, color: 'var(--td-navy-300)', lineHeight: 1.5, marginTop: 2 }}>{h.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── COURSE FOOTER ── */}
          <div className="td-card td-anim" style={{ padding: 20, animationDelay: '600ms' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
              <div className="flex items-center gap-3">
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,rgba(0,212,255,0.2),rgba(0,229,160,0.2))', border: '1px solid rgba(0,212,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#00d4ff" strokeWidth="1.2" /><path d="M6 7l2 2 4-4" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>What you'll learn to build inside the course</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {chips.map(c => (
                  <span key={c} className="flex items-center gap-1.5" style={{ padding: '6px 12px', borderRadius: 100, fontSize: 11, fontWeight: 500, background: 'rgba(0,229,160,0.06)', color: 'rgba(0,229,160,0.8)', border: '1px solid rgba(0,229,160,0.1)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 6l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── LEGAL ── */}
          <footer style={{ textAlign: 'center', padding: '12px 0' }}>
            <p style={{ fontSize: 10, color: 'var(--td-navy-500)', letterSpacing: '0.02em' }}>
              Simulated backtest results. Past performance does not guarantee future results. Educational purposes only.
            </p>
          </footer>

        </div>
      </div>
    </>
  );
}

export default TradingDashboard;
