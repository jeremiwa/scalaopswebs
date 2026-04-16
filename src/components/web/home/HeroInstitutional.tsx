import React from 'react';
import { Link } from 'react-router-dom';

export const HeroInstitutional = () => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-scala-green/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-5%] w-[400px] h-[400px] bg-scala-green/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10 w-full flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scala-green/10 border border-scala-green/20 text-scala-green text-[11px] font-bold tracking-[0.18em] uppercase mb-8 reveal">
          <span className="w-1.5 h-1.5 rounded-full bg-scala-green shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
          Soluciones de IA para empresas
        </span>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-[68px] font-bold text-white tracking-tight leading-[1.08] max-w-[800px] mx-auto mb-6 reveal">
          Implementamos IA en tu empresa.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/55 max-w-[720px] mx-auto mb-10 leading-relaxed font-light reveal-stagger">
          Auditamos tu negocio y diseñamos agentes, bots, automatizaciones, CRM inteligente y apps internas para vender más, operar mejor y escalar.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-10 reveal-stagger">
          <a
            href="https://calendar.app.google/your-link-here"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '14px 32px', fontSize: '14px' }}
          >
            Agendar llamada
          </a>
          <Link
            to="/web/soluciones"
            className="btn-secondary"
            style={{ padding: '14px 32px', fontSize: '14px' }}
          >
            Ver soluciones
          </Link>
        </div>

        {/* Micro-confianza chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 reveal-stagger">
          {['Agentes IA', 'Automatizaciones', 'CRM con IA', 'Apps a medida', 'Integraciones'].map((chip) => (
            <span key={chip} className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/8 text-white/50 text-[12px] font-medium tracking-wide">
              {chip}
            </span>
          ))}
        </div>

        {/* ═══ VISUAL PREMIUM: IA Infrastructure Composition ═══ */}
        <div className="relative w-full max-w-[1060px] mx-auto reveal-stagger">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {/* Card: Agente IA */}
            <div className="bg-[#0A0D14] border border-white/6 rounded-2xl p-5 flex flex-col gap-3 group hover:border-scala-green/20 transition-all duration-500">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-scala-green/15 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-scala-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Agente IA</span>
              </div>
              <div className="bg-[#06060A] rounded-xl p-3 border border-white/4">
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-scala-green/20 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <span className="text-[8px] text-scala-green font-bold">IA</span>
                  </div>
                  <p className="text-white/60 text-[11px] leading-relaxed">Hola! Vi tu consulta sobre el plan enterprise. ¿Agendamos una demo para esta semana?</p>
                </div>
              </div>
              <span className="text-[10px] text-scala-green/70 font-semibold tracking-wider uppercase mt-auto">Responde en segundos</span>
            </div>

            {/* Card: Automatización */}
            <div className="bg-[#0A0D14] border border-white/6 rounded-2xl p-5 flex flex-col gap-3 group hover:border-scala-green/20 transition-all duration-500">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Flow</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {['Lead entra', 'IA califica', 'CRM asigna', 'Vendedor recibe'].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold ${i < 3 ? 'bg-scala-green/20 text-scala-green' : 'bg-white/5 text-white/30'}`}>{i + 1}</div>
                    <span className="text-white/50 text-[11px]">{step}</span>
                    {i < 3 && <div className="flex-grow h-px bg-white/5" />}
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-purple-400/70 font-semibold tracking-wider uppercase mt-auto">Automatiza tareas</span>
            </div>

            {/* Card: CRM con IA */}
            <div className="bg-[#0A0D14] border border-white/6 rounded-2xl p-5 flex flex-col gap-3 group hover:border-scala-green/20 transition-all duration-500">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">CRM</span>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { name: 'M. Torres', score: 92, color: 'bg-scala-green' },
                  { name: 'L. Ruiz', score: 78, color: 'bg-blue-400' },
                  { name: 'C. Vega', score: 45, color: 'bg-amber-400' },
                ].map((lead, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <span className="text-white/50 text-[11px] truncate">{lead.name}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1 rounded-full bg-white/5 overflow-hidden">
                        <div className={`h-full rounded-full ${lead.color}`} style={{ width: `${lead.score}%` }} />
                      </div>
                      <span className="text-white/30 text-[9px] font-mono w-5 text-right">{lead.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-blue-400/70 font-semibold tracking-wider uppercase mt-auto">Califica leads</span>
            </div>

            {/* Card: App interna */}
            <div className="bg-[#0A0D14] border border-white/6 rounded-2xl p-5 flex flex-col gap-3 group hover:border-scala-green/20 transition-all duration-500">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                </div>
                <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">App</span>
              </div>
              <div className="bg-[#06060A] rounded-xl p-3 border border-white/4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-[10px]">Resumen IA</span>
                  <span className="w-5 h-5 rounded bg-amber-400/10 flex items-center justify-center text-amber-400 text-[8px] font-bold">AI</span>
                </div>
                <div className="h-px bg-white/5" />
                <p className="text-white/40 text-[10px] leading-relaxed">El cliente necesita integración con su ERP. Prioridad alta. Seguimiento el miércoles.</p>
              </div>
              <span className="text-[10px] text-amber-400/70 font-semibold tracking-wider uppercase mt-auto">Resume conversaciones</span>
            </div>

          </div>

          {/* Floating labels around composition */}
          <div className="hidden lg:block">
            <span className="absolute -left-4 top-1/3 px-3 py-1.5 rounded-lg bg-[#0A0D14] border border-white/8 text-[10px] text-white/40 font-medium shadow-lg -rotate-2">Integra con tu CRM</span>
            <span className="absolute -right-4 top-1/4 px-3 py-1.5 rounded-lg bg-[#0A0D14] border border-scala-green/15 text-[10px] text-scala-green/60 font-medium shadow-lg rotate-1">24/7 activo</span>
          </div>
        </div>

        {/* Línea inferior corta */}
        <p className="text-[13px] text-white/30 mt-12 font-medium tracking-wide text-center max-w-lg reveal-stagger">
          Diseñado para empresas, equipos comerciales y negocios que quieren aplicar IA de verdad.
        </p>

      </div>
    </section>
  );
};
