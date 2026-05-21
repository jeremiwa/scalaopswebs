import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const BLUE = '#4A8FFF';

const cards = [
  {
    eyebrow: "COSTOS",
    dolor: "Un vendedor más te cuesta una fortuna.",
    solucion: "Sentinel se implementa una sola vez.\nUSD 997, sin sueldo mensual ni cargas.",
    antesLabel: "ANTES",
    antes: "+USD 18.000/año por vendedor",
  },
  {
    eyebrow: "VELOCIDAD",
    dolor: "Cuando respondés tarde, la venta ya se fue.",
    solucion: "Sentinel responde en menos de 8 segundos.",
    antesLabel: "ANTES",
    antes: "hasta 40 min de demora promedio",
  },
  {
    eyebrow: "HORARIO",
    dolor: "Tus mejores leads llegan cuando nadie responde.",
    solucion: "Sentinel atiende 24/7/365.\nDe noche, domingos y feriados.",
    antesLabel: "ANTES",
    antes: "consultas perdidas fuera de horario",
  },
  {
    eyebrow: "CAPACIDAD",
    dolor: "Tu equipo no puede atender todo al mismo tiempo.",
    solucion: "Sentinel gestiona 50+ chats en simultáneo.",
    antesLabel: "ANTES",
    antes: "un humano atiende 1 chat por vez",
  },
  {
    eyebrow: "ROTACIÓN",
    dolor: "Cada vendedor nuevo te hace empezar de cero.",
    solucion: "Sentinel se entrena una sola vez.\nAprende tu negocio y no se va.",
    antesLabel: "ANTES",
    antes: "meses de capacitación otra vez",
  },
  {
    eyebrow: "TAREAS REPETITIVAS",
    dolor: "Tu mejor vendedor pierde tiempo en tareas básicas.",
    solucion: "Sentinel filtra y deriva oportunidades reales.",
    antesLabel: "ANTES",
    antes: "horas respondiendo lo mismo",
  },
];

export const S02_BentoDolores = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const child = el.firstElementChild as HTMLElement | null;
      if (!child) return;
      const cardW = child.offsetWidth;
      const gap = 12;
      const idx = Math.round(el.scrollLeft / (cardW + gap));
      setActiveIndex(Math.min(idx, cards.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#000000] flex flex-col items-center relative overflow-hidden"
      style={{ paddingTop: 'clamp(80px, 10vw, 140px)', paddingBottom: 'clamp(64px, 8vw, 96px)' }}
    >
      {/* Header */}
      <div className="w-full max-w-[1100px] mx-auto px-[20px] flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.45 } : {}}
          transition={{ duration: 0.3, ease: EASE }}
          className="block text-white text-[10px] font-medium tracking-[0.08em] mb-[16px] text-center"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          LO QUE RESUELVE SENTINEL
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
          className="text-center mb-[16px]"
          style={{
            fontFamily: 'Saira, sans-serif',
            fontSize: 'clamp(34px, 5.5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            color: 'rgba(255,255,255,0.95)',
          }}
        >
          Seis problemas resueltos.<br />
          Con un solo <span style={{ color: BLUE }}>Empleado IA.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 0.55, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.35, ease: EASE }}
          className="text-center mb-[40px] md:mb-[56px] max-w-[90%] md:max-w-[480px]"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(14px, 3vw, 16px)',
            lineHeight: 1.4,
            color: '#FFFFFF',
          }}
        >
          Lo que dejás de perder cuando activás Sentinel.
        </motion.p>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
        className="w-full max-w-[1100px]"
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-[4px] lg:grid lg:grid-cols-3 lg:overflow-visible"
          style={{
            gap: '12px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          {cards.map((c, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col rounded-[20px] overflow-hidden transition-colors duration-200"
              style={{
                width: 'clamp(300px, 84vw, 360px)',
                scrollSnapAlign: 'center',
                border: '0.5px solid rgba(255,255,255,0.08)',
                backgroundColor: '#0C0C0E',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >
              {/* Top section: eyebrow + dolor */}
              <div style={{ padding: 'clamp(24px, 5vw, 32px)', paddingBottom: '0' }}>
                {/* Eyebrow */}
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.35)',
                  display: 'block',
                  marginBottom: '14px',
                }}>
                  {c.eyebrow}
                </span>

                {/* Dolor = título principal */}
                <h3 style={{
                  fontFamily: 'Saira, sans-serif',
                  fontSize: 'clamp(22px, 5vw, 28px)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  marginBottom: 'clamp(20px, 4vw, 28px)',
                }}>
                  {c.dolor}
                </h3>
              </div>

              {/* Solution band */}
              <div style={{
                margin: '0 clamp(16px, 3vw, 24px)',
                padding: 'clamp(16px, 3vw, 20px)',
                borderRadius: '14px',
                backgroundColor: `${BLUE}0F`,
                border: `0.5px solid ${BLUE}30`,
              }}>
                <p style={{
                  fontFamily: 'Saira, sans-serif',
                  fontSize: 'clamp(16px, 3.5vw, 19px)',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: BLUE,
                  whiteSpace: 'pre-line',
                }}>
                  {c.solucion}
                </p>
              </div>

              {/* ANTES block */}
              <div style={{
                margin: 'clamp(16px, 3vw, 20px) clamp(16px, 3vw, 24px) clamp(24px, 4vw, 32px)',
                padding: 'clamp(14px, 2.5vw, 16px)',
                borderRadius: '12px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '0.5px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#E85B5B',
                  display: 'block',
                  marginBottom: '6px',
                }}>
                  {c.antesLabel}
                </span>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(14px, 3vw, 15px)',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  color: 'rgba(255,255,255,0.70)',
                }}>
                  {c.antes}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots — mobile only */}
        <div className="flex lg:hidden items-center justify-center gap-[6px] mt-[20px]">
          {cards.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIndex === i ? '20px' : '6px',
                height: '6px',
                backgroundColor: activeIndex === i ? BLUE : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Cierre */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, delay: 0.8, ease: EASE }}
        className="text-center mt-[48px] px-[20px]"
      >
        <p style={{
          fontFamily: 'Saira, sans-serif',
          fontSize: 'clamp(20px, 4vw, 26px)',
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.90)',
        }}>
          Un solo Empleado IA.<br />
          <span style={{ color: BLUE }}>Seis problemas menos.</span>
        </p>
      </motion.div>

      <style dangerouslySetInnerHTML={{__html:`
        [style*="scroll-snap-type"] { -ms-overflow-style: none; }
        [style*="scroll-snap-type"]::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
};
