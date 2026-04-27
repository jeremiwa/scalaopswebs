import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/Button';

const fugas = [
  {
    num: '01',
    label: 'Respuesta',
    title: 'Respuesta',
    desc: 'Medimos el tiempo real de primera respuesta y su impacto en cierres.',
  },
  {
    num: '02',
    label: 'Seguimiento',
    title: 'Seguimiento',
    desc: 'Cuántos contactos reales se hacen y dónde se corta el proceso.',
  },
  {
    num: '03',
    label: 'Motivos de pérdida',
    title: 'Motivos de pérdida',
    desc: 'Si no registrás por qué se pierde, estás adivinando.',
  },
  {
    num: '04',
    label: 'Etapas fantasma',
    title: 'Etapas fantasma',
    desc: 'Leads en limbo: ni cerrados ni descartados.',
  },
  {
    num: '05',
    label: 'Discurso',
    title: 'Discurso',
    desc: 'Evaluamos chats/llamadas: claridad, objeciones y cierre.',
  },
];

export const Fugas = () => {
  const [active, setActive] = useState(0);
  const isPaused = useRef(false);

  // Auto-cycle every 3.5s, pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        setActive(prev => (prev + 1) % fugas.length);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-[72px] md:py-[90px] relative" style={{ background: '#000000' }}>
      <div className="container-custom relative z-10 flex flex-col items-center">

        {/* ── MODULE CARD WRAPPER ── */}
        <div className="relative w-full max-w-[1200px] mx-auto">

          {/* Glow TOP */}
          <div
            className="absolute pointer-events-none z-0"
            style={{
              top: '-80px', left: '-60px', right: '-60px', height: '200px',
              background: 'radial-gradient(600px 180px at 50% 100%, rgba(16,185,129,0.14), transparent 60%)',
              filter: 'blur(50px)', opacity: 0.7, transform: 'translateZ(0)'
            }}
          />
          {/* Glow BOTTOM */}
          <div
            className="absolute pointer-events-none z-0"
            style={{
              bottom: '-80px', left: '-60px', right: '-60px', height: '200px',
              background: 'radial-gradient(600px 180px at 50% 0%, rgba(16,185,129,0.12), transparent 60%)',
              filter: 'blur(55px)', opacity: 0.65, transform: 'translateZ(0)'
            }}
          />

          {/* ═══ MODULE CARD ═══ */}
          <div
            className="relative rounded-[24px] flex flex-col items-center"
            style={{
              background: 'linear-gradient(180deg, rgba(2,6,23,0.72) 0%, rgba(2,6,23,0.55) 100%)',
              border: '1px solid rgba(148,163,184,0.14)',
              padding: '40px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.50)',
              zIndex: 1,
            }}
          >
            {/* Top highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-[24px] overflow-hidden">
              <div style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.08) 50%, transparent 100%)', height: '1px' }} />
            </div>

            {/* ── HEADER ── */}
            <div className="text-center mb-10 md:mb-12 w-full">
              <span className="text-[13px] font-semibold tracking-[0.08em] uppercase text-[#5A5A6E] mb-4 block">
                LO QUE AUDITAMOS
              </span>
              <h2 className="text-[30px] md:text-[42px] lg:text-[46px] font-[700] tracking-[-0.03em] text-[#F5F5F7] mb-3 leading-[1.08]">
                Auditamos 5 fugas.
              </h2>
              <p className="text-[16px] font-normal leading-[1.6] max-w-[520px] mx-auto" style={{ color: 'rgba(203,213,225,0.78)' }}>
                En 72hs te mostramos cuáles te están costando ventas.
              </p>
            </div>

            {/* ── 5-NODE HORIZONTAL LINE ── */}
            <div className="w-full max-w-[900px] mx-auto mb-8 md:mb-10 px-2">
              <div className="relative flex items-start justify-between">
                {/* Connecting line behind nodes */}
                <div className="absolute top-[15px] left-[10%] right-[10%] h-[2px] rounded-full z-0" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  {/* Filled portion */}
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(active / 4) * 100}%`,
                      background: 'linear-gradient(90deg, #6bdda1, #185de8)',
                      boxShadow: '0 0 10px rgba(16,185,129,0.20)',
                    }}
                  />
                </div>

                {fugas.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => { setActive(i); isPaused.current = false; }}
                    onMouseEnter={() => { setActive(i); isPaused.current = true; }}
                    onMouseLeave={() => { isPaused.current = false; }}
                    className="relative z-10 flex flex-col items-center cursor-pointer group flex-1"
                  >
                    {/* Num */}
                    <div
                      className="text-[10px] font-bold uppercase tracking-widest mb-2 transition-colors duration-300"
                      style={{ color: i <= active ? '#6bdda1' : '#5A5A6E' }}
                    >
                      {f.num}
                    </div>

                    {/* Node circle */}
                    <div
                      className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all duration-300 mb-3 shrink-0"
                      style={{
                        background: i === active ? 'rgba(107, 221, 161,0.15)' : '#0D0D14',
                        border: `2px solid ${i <= active ? '#6bdda1' : 'rgba(148,163,184,0.15)'}`,
                        boxShadow: i === active ? '0 0 16px rgba(107, 221, 161,0.25)' : 'none',
                      }}
                    >
                      <div
                        className="w-[8px] h-[8px] rounded-full transition-all duration-300"
                        style={{
                          background: i <= active ? '#6bdda1' : 'rgba(148,163,184,0.20)',
                        }}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className="text-[11px] md:text-[12px] font-medium text-center leading-[1.3] transition-colors duration-300 max-w-[80px]"
                      style={{ color: i === active ? '#F5F5F7' : '#5A5A6E' }}
                    >
                      {f.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── DETAIL BLOCK ── */}
            <div
              className="w-full max-w-[600px] mx-auto rounded-[16px] p-6 md:p-8 text-center mb-8 md:mb-10 transition-all duration-300"
              style={{
                background: 'rgba(15,23,42,0.35)',
                border: '1px solid rgba(148,163,184,0.10)',
              }}
            >
              <h3 className="text-[18px] md:text-[20px] font-bold text-[#F5F5F7] mb-2 transition-all duration-300">
                {fugas[active].title}
              </h3>
              <p className="text-[15px] leading-[1.6] transition-all duration-300" style={{ color: 'rgba(203,213,225,0.72)' }}>
                {fugas[active].desc}
              </p>
            </div>

            {/* ── CTA ── */}
            <div className="flex flex-col items-center">
              <Button variant="primary" className="px-8 text-[16px] mb-2">Agendá tu llamada gratuita</Button>
              <p className="text-[13px] text-[#5A5A6E] font-medium">Sin costo. Resultados en 72hs.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
