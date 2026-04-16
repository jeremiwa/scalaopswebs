import React from 'react';
import { Link } from 'react-router-dom';

export const HeroInstitutional = () => {
  return (
    <section className="relative pt-6 pb-16 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#22C55E]/[0.06] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-30%] right-[-8%] w-[500px] h-[400px] bg-[#22C55E]/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 w-full flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#22C55E]/15 text-[#22C55E] text-[10px] font-bold tracking-[0.22em] uppercase mb-7 reveal" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03))' }}>
          <span className="w-[5px] h-[5px] rounded-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.9)]" />
          Soluciones de IA para empresas
        </span>

        {/* Headline */}
        <h1 className="text-[40px] md:text-[60px] lg:text-[76px] font-extrabold text-white tracking-[-0.03em] leading-[1.04] max-w-[820px] mx-auto mb-5 reveal" style={{ textShadow: '0 0 80px rgba(34,197,94,0.08)' }}>
          Implementamos IA en tu empresa.
        </h1>

        {/* Subheadline */}
        <p className="text-[16px] md:text-[18px] text-white/50 max-w-[580px] mx-auto mb-10 leading-[1.7] font-normal reveal-stagger">
          Auditamos tu negocio y diseñamos agentes, bots, automatizaciones, CRM inteligente y apps internas para vender más, operar mejor y escalar.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-10 reveal-stagger">
          {/* Primary Button */}
          <a
            href="https://calendar.app.google/your-link-here"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl text-[14px] font-semibold tracking-wide text-white transition-all duration-300"
            style={{
              padding: '15px 36px',
              background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
              boxShadow: '0 0 20px rgba(34,197,94,0.25), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 32px rgba(34,197,94,0.4), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(34,197,94,0.25), 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Agendar llamada
          </a>
          {/* Secondary Ghost Button */}
          <Link
            to="/web/soluciones"
            className="inline-flex items-center justify-center rounded-xl text-[14px] font-semibold tracking-wide text-white/70 transition-all duration-300 hover:text-white hover:border-white/20"
            style={{
              padding: '15px 36px',
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.02)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; }}
          >
            Ver soluciones
          </Link>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14 reveal-stagger">
          {['Agentes IA', 'Automatizaciones', 'CRM con IA', 'Apps a medida', 'Integraciones'].map((chip) => (
            <span key={chip} className="px-4 py-[6px] rounded-lg text-[11px] font-semibold tracking-[0.04em] text-white/40 transition-colors hover:text-white/60" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {chip}
            </span>
          ))}
        </div>

        {/* ═══ PREMIUM VISUAL COMPOSITION ═══ */}
        <div className="relative w-full max-w-[1080px] mx-auto reveal-stagger">
          {/* Glow behind composition */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#22C55E]/[0.04] blur-[100px] rounded-full pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* ─── MAIN CARD: Agente IA (spans 7 cols) ─── */}
            <div className="md:col-span-7 rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(10,13,20,0.95), rgba(6,8,14,0.98))', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.03)' }}>
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#22C55E]/[0.03] blur-[60px] rounded-full pointer-events-none" />
              
              {/* Card Header */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.08))', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <svg className="w-4 h-4 text-[#22C55E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <span className="text-[12px] font-bold text-white/50 uppercase tracking-[0.12em]">Agente IA · Activo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#22C55E] shadow-[0_0_6px_rgba(34,197,94,0.8)] animate-pulse" />
                  <span className="text-[10px] text-[#22C55E]/70 font-semibold">Online</span>
                </div>
              </div>

              {/* Conversation mockup */}
              <div className="flex flex-col gap-3 relative z-10">
                {/* Incoming */}
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center flex-shrink-0 border border-white/5">
                    <span className="text-[9px] text-white/40 font-bold">ML</span>
                  </div>
                  <div>
                    <div className="rounded-xl rounded-tl-sm px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <p className="text-[12px] text-white/55 leading-relaxed">Hola, vi su plan Enterprise. ¿Podemos agendar una demo esta semana?</p>
                    </div>
                    <span className="text-[9px] text-white/20 mt-1 block pl-1">Hace 12 seg</span>
                  </div>
                </div>
                {/* AI Response */}
                <div className="flex items-start gap-3 max-w-[90%] ml-auto flex-row-reverse">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.3), rgba(34,197,94,0.1))', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <span className="text-[8px] text-[#22C55E] font-black">IA</span>
                  </div>
                  <div>
                    <div className="rounded-xl rounded-tr-sm px-4 py-2.5" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03))', border: '1px solid rgba(34,197,94,0.1)' }}>
                      <p className="text-[12px] text-white/70 leading-relaxed">¡Perfecto! Te envío el link de agenda. ¿Preferís martes o miércoles por la tarde? También te adjunto un resumen del plan.</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 pl-1">
                      <span className="text-[9px] text-white/20">Ahora</span>
                      <span className="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-[#22C55E]/10 text-[#22C55E]/60 border border-[#22C55E]/10">Respuesta en 3s</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom metrics bar */}
              <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/[0.04] relative z-10">
                {[
                  { label: 'Tiempo respuesta', value: '< 5s', color: '#22C55E' },
                  { label: 'Leads calificados', value: '94%', color: '#22C55E' },
                  { label: 'Conversaciones hoy', value: '127', color: '#60A5FA' },
                ].map((m, i) => (
                  <div key={i} className="flex-1 text-center">
                    <p className="text-[9px] text-white/25 uppercase tracking-wider font-semibold mb-0.5">{m.label}</p>
                    <p className="text-[14px] font-bold" style={{ color: m.color }}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── RIGHT COLUMN: 2 stacked modules (5 cols) ─── */}
            <div className="md:col-span-5 flex flex-col gap-4">

              {/* Module: Automatización Flow */}
              <div className="rounded-2xl p-5 flex-1 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(10,13,20,0.95), rgba(6,8,14,0.98))', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.12)' }}>
                    <svg className="w-3 h-3 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                  </div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.14em]">Automatización</span>
                  <span className="ml-auto px-2 py-0.5 rounded text-[8px] font-bold tracking-wider bg-purple-500/10 text-purple-400/70 border border-purple-500/10 uppercase">Activo</span>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { step: 'Lead ingresa', status: 'done' },
                    { step: 'IA califica', status: 'done' },
                    { step: 'CRM asigna', status: 'done' },
                    { step: 'Vendedor notificado', status: 'active' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-bold ${s.status === 'done' ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-purple-500/15 text-purple-400 animate-pulse'}`}>
                        {s.status === 'done' ? '✓' : '▸'}
                      </div>
                      <span className={`text-[11px] ${s.status === 'active' ? 'text-white/70 font-medium' : 'text-white/40'}`}>{s.step}</span>
                      {i < 3 && <div className="flex-grow h-px bg-white/[0.03] ml-1" />}
                      {s.status === 'done' && <span className="text-[8px] text-white/15 font-mono">0.{i + 1}s</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Module: CRM Scoring + App Summary side by side */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* CRM Mini */}
                <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(10,13,20,0.95), rgba(6,8,14,0.98))', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.15)', border: '1px solid rgba(96,165,250,0.1)' }}>
                      <svg className="w-2.5 h-2.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                    </div>
                    <span className="text-[9px] font-bold text-white/35 uppercase tracking-wider">CRM</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { name: 'Torres', score: 94, color: '#22C55E' },
                      { name: 'Ruiz', score: 72, color: '#60A5FA' },
                      { name: 'Vega', score: 38, color: '#F59E0B' },
                    ].map((l) => (
                      <div key={l.name} className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40 w-10 truncate">{l.name}</span>
                        <div className="flex-grow h-[3px] rounded-full bg-white/[0.04] overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${l.score}%`, background: l.color }} />
                        </div>
                        <span className="text-[8px] font-mono text-white/25 w-4 text-right">{l.score}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[8px] text-blue-400/50 font-semibold uppercase tracking-wider mt-3">Scoring activo</p>
                </div>

                {/* App Summary Mini */}
                <div className="rounded-2xl p-4 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, rgba(10,13,20,0.95), rgba(6,8,14,0.98))', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.1)' }}>
                      <span className="text-[7px] text-amber-400 font-black">AI</span>
                    </div>
                    <span className="text-[9px] font-bold text-white/35 uppercase tracking-wider">Resumen</span>
                  </div>
                  <div className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <p className="text-[10px] text-white/40 leading-[1.6]">Cliente necesita integración ERP. Prioridad <span className="text-amber-400/70 font-semibold">alta</span>. Follow-up miércoles.</p>
                  </div>
                  <div className="flex gap-1.5 mt-2.5">
                    <span className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-amber-400/10 text-amber-400/50 border border-amber-400/10 uppercase">Urgente</span>
                    <span className="px-1.5 py-0.5 rounded text-[7px] font-bold bg-white/[0.03] text-white/25 border border-white/[0.04] uppercase">ERP</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Floating labels around composition */}
          <div className="hidden lg:block">
            <span className="absolute -left-6 top-[40%] px-3 py-1.5 rounded-lg text-[9px] text-white/30 font-semibold shadow-xl -rotate-2" style={{ background: 'rgba(10,13,20,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>Integra con tu CRM</span>
            <span className="absolute -right-5 top-[20%] px-3 py-1.5 rounded-lg text-[9px] font-semibold shadow-xl rotate-1" style={{ background: 'rgba(10,13,20,0.9)', border: '1px solid rgba(34,197,94,0.12)', color: 'rgba(34,197,94,0.5)' }}>24/7 activo</span>
            <span className="absolute -right-3 bottom-[25%] px-3 py-1.5 rounded-lg text-[9px] text-white/25 font-semibold shadow-xl rotate-[-1deg]" style={{ background: 'rgba(10,13,20,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>Multi-canal</span>
          </div>
        </div>

        {/* Bottom line */}
        <p className="text-[12px] text-white/25 mt-10 font-medium tracking-wide text-center max-w-md reveal-stagger">
          Diseñado para empresas, equipos comerciales y negocios que quieren aplicar IA de verdad.
        </p>
      </div>
    </section>
  );
};
