import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cards = [
  {
    cat: "COSTOS",
    dolor: "Pagar otro sueldo no debería ser tu única salida.",
    solucion: "Sentinel trabaja por USD 997 de implementación.\nSin sueldo mensual, cargas ni aguinaldo.",
    costaLabel: "HOY TE CUESTA",
    costa: "+USD 18.000/año por vendedor",
  },
  {
    cat: "VELOCIDAD",
    dolor: "Cuando responden tarde, el cliente ya está comparando.",
    solucion: "Sentinel responde en menos de 8 segundos.",
    costaLabel: "HOY TE CUESTA",
    costa: "ventas que se enfrían en minutos",
  },
  {
    cat: "HORARIO",
    dolor: "Tus clientes compran cuando tu equipo no está.",
    solucion: "Sentinel atiende 24/7/365.\nDe noche, domingos y feriados.",
    costaLabel: "HOY TE CUESTA",
    costa: "consultas sin respuesta fuera de horario",
  },
  {
    cat: "CAPACIDAD",
    dolor: "Cuando entran muchos chats, tu equipo colapsa.",
    solucion: "Sentinel atiende 50+ chats en simultáneo.",
    costaLabel: "HOY TE CUESTA",
    costa: "clientes esperando y oportunidades frías",
  },
  {
    cat: "ROTACIÓN",
    dolor: "Capacitás vendedores… y después se van.",
    solucion: "Sentinel se entrena una vez y queda.",
    costaLabel: "HOY TE CUESTA",
    costa: "volver a explicar todo desde cero",
  },
  {
    cat: "TAREAS REPETITIVAS",
    dolor: "Tu mejor vendedor está respondiendo lo mismo todo el día.",
    solucion: "Sentinel filtra, responde y deriva oportunidades reales.",
    costaLabel: "HOY TE CUESTA",
    costa: "horas perdidas en tareas básicas",
  },
];

export const S02_BentoDolores = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const child = el.firstElementChild as HTMLElement | null;
      if (!child) return;
      const w = child.offsetWidth + 14;
      setActiveIndex(Math.min(Math.round(el.scrollLeft / w), cards.length - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#000000] flex flex-col items-center relative overflow-hidden"
      style={{ paddingTop: 'clamp(80px, 10vw, 130px)', paddingBottom: 'clamp(56px, 8vw, 80px)' }}
    >
      {/* Header */}
      <div className="w-full max-w-[1100px] mx-auto px-[20px] flex flex-col items-center relative z-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : {}}
          transition={{ duration: 0.3, ease: EASE }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', color: '#fff', display: 'block', marginBottom: '18px', textAlign: 'center' }}
        >
          LO QUE RESUELVE SENTINEL
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
          style={{
            fontFamily: 'Saira, sans-serif',
            fontSize: 'clamp(30px, 6vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            color: '#fff',
            textAlign: 'center',
            marginBottom: '18px',
          }}
        >
          Seis dolores que hoy te cuestan ventas.<br />
          <span style={{ background: 'linear-gradient(90deg, #0066FF, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Un solo Empleado IA para resolverlos.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 0.6, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.3, ease: EASE }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 3vw, 16px)', lineHeight: 1.45, color: '#fff', textAlign: 'center', maxWidth: '480px', marginBottom: 'clamp(36px, 6vw, 56px)' }}
        >
          Todo lo que dejás de perder cuando activás Sentinel.
        </motion.p>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.45, ease: EASE }}
        className="w-full max-w-[1100px]"
      >
        <div
          ref={scrollRef}
          className="flex overflow-x-auto lg:grid lg:grid-cols-3 lg:overflow-visible"
          style={{ gap: '14px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '4px' }}
        >
          {cards.map((c, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col relative group"
              style={{
                width: 'clamp(300px, 84vw, 360px)',
                scrollSnapAlign: 'center',
                borderRadius: '22px',
                overflow: 'hidden',
              }}
            >
              {/* Gradient top accent bar */}
              <div style={{ height: '2px', background: 'linear-gradient(90deg, #0066FF, #00D4AA)', flexShrink: 0 }} />

              {/* Card body */}
              <div
                className="flex-1 flex flex-col transition-colors duration-200"
                style={{
                  backgroundColor: '#0A0D0C',
                  border: '0.5px solid rgba(255,255,255,0.07)',
                  borderTop: 'none',
                  borderRadius: '0 0 22px 22px',
                  padding: 'clamp(22px, 5vw, 30px)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.16)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                {/* Background texture bars */}
                <div style={{ position: 'absolute', top: '30px', right: '20px', opacity: 0.04, pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ width: '40px', height: '3px', background: 'linear-gradient(90deg, #0066FF, #00D4AA)', borderRadius: '2px' }} />
                  <div style={{ width: '28px', height: '3px', background: 'linear-gradient(90deg, #0066FF, #00D4AA)', borderRadius: '2px' }} />
                  <div style={{ width: '18px', height: '3px', background: 'linear-gradient(90deg, #0066FF, #00D4AA)', borderRadius: '2px' }} />
                </div>

                {/* Category */}
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: 'rgba(255,255,255,0.30)',
                  marginBottom: '16px',
                  display: 'block',
                }}>
                  {c.cat}
                </span>

                {/* Dolor */}
                <h3 style={{
                  fontFamily: 'Saira, sans-serif',
                  fontSize: 'clamp(22px, 5.2vw, 28px)',
                  fontWeight: 700,
                  lineHeight: 1.12,
                  letterSpacing: '-0.025em',
                  color: '#FFFFFF',
                  marginBottom: 'clamp(20px, 4vw, 26px)',
                }}>
                  {c.dolor}
                </h3>

                {/* Solution band */}
                <div style={{
                  padding: 'clamp(14px, 3vw, 18px)',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(0,102,255,0.08), rgba(0,212,170,0.08))',
                  border: '0.5px solid rgba(0,212,170,0.18)',
                  marginBottom: 'clamp(14px, 3vw, 18px)',
                  position: 'relative' as const,
                  overflow: 'hidden',
                }}>
                  {/* Subtle left glow */}
                  <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '80px', height: '80px', background: 'radial-gradient(circle, rgba(0,102,255,0.15), transparent 70%)', pointerEvents: 'none' }} />
                  <p style={{
                    fontFamily: 'Saira, sans-serif',
                    fontSize: 'clamp(15px, 3.4vw, 18px)',
                    fontWeight: 600,
                    lineHeight: 1.35,
                    whiteSpace: 'pre-line',
                    background: 'linear-gradient(90deg, #4A8FFF, #00D4AA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    position: 'relative' as const,
                  }}>
                    {c.solucion}
                  </p>
                </div>

                {/* HOY TE CUESTA */}
                <div style={{
                  padding: 'clamp(12px, 2.5vw, 16px)',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255,255,255,0.025)',
                  border: '0.5px solid rgba(255,255,255,0.06)',
                  marginTop: 'auto',
                }}>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.40)',
                    display: 'block',
                    marginBottom: '6px',
                  }}>
                    {c.costaLabel}
                  </span>
                  <p style={{
                    fontFamily: 'Saira, sans-serif',
                    fontSize: 'clamp(15px, 3.2vw, 17px)',
                    fontWeight: 600,
                    lineHeight: 1.25,
                    color: 'rgba(255,255,255,0.75)',
                  }}>
                    {c.costa}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex lg:hidden items-center justify-center gap-[6px] mt-[22px]">
          {cards.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIndex === i ? '22px' : '6px',
                height: '6px',
                background: activeIndex === i ? 'linear-gradient(90deg, #0066FF, #00D4AA)' : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Cierre */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, delay: 0.75, ease: EASE }}
        className="text-center mt-[48px] px-[20px]"
      >
        <p style={{
          fontFamily: 'Saira, sans-serif',
          fontSize: 'clamp(20px, 4.5vw, 28px)',
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.92)',
        }}>
          Menos sueldos.<br />
          Más respuestas.<br />
          <span style={{ background: 'linear-gradient(90deg, #0066FF, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Más ventas.
          </span>
        </p>
      </motion.div>

      <style dangerouslySetInnerHTML={{__html:`
        [style*="scroll-snap-type"] { -ms-overflow-style: none; }
        [style*="scroll-snap-type"]::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
};
