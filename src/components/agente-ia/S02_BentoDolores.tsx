import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { DollarSign, Zap, Clock, MessageSquare, RefreshCw, ListChecks } from 'lucide-react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const BLUE = '#4A8FFF';

const cards = [
  {
    icon: DollarSign,
    titulo: "Costos",
    destacado: "Implementación única: USD 997",
    breve: "Sin sueldo mensual ni cargas.",
    contraste: "Vs. +USD 18.000 al año por vendedor.",
  },
  {
    icon: Zap,
    titulo: "Velocidad",
    destacado: "Responde en menos de 8 segundos",
    breve: "No deja consultas esperando.",
    contraste: "Tu equipo hoy tarda hasta 40 min promedio.",
  },
  {
    icon: Clock,
    titulo: "Horario",
    destacado: "Atiende 24/7/365",
    breve: "Responde de noche, domingos y feriados.",
    contraste: "Muchos leads llegan fuera de horario.",
  },
  {
    icon: MessageSquare,
    titulo: "Capacidad",
    destacado: "50+ chats en simultáneo",
    breve: "Atiende a todos al mismo tiempo.",
    contraste: "Un humano atiende un chat por vez.",
  },
  {
    icon: RefreshCw,
    titulo: "Rotación",
    destacado: "Se entrena una sola vez",
    breve: "Aprende tu negocio y no se va.",
    contraste: "No tenés que re-capacitar cada vez.",
  },
  {
    icon: ListChecks,
    titulo: "Tareas repetitivas",
    destacado: "Filtra y deriva oportunidades reales",
    breve: "Tu equipo recibe leads más listos para cerrar.",
    contraste: "Hoy pierden horas respondiendo lo mismo.",
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
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.firstElementChild
        ? (el.firstElementChild as HTMLElement).offsetWidth
        : 280;
      const gap = 12;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, cards.length - 1));
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
      {/* HEADER */}
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

      {/* CAROUSEL */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
        className="w-full max-w-[1100px]"
      >
        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-[8px] lg:grid lg:grid-cols-3 lg:overflow-visible"
          style={{
            gap: '12px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col bg-[#0C0C0E] rounded-[20px] transition-colors duration-200 ease-out"
                style={{
                  width: 'clamp(280px, 75vw, 340px)',
                  scrollSnapAlign: 'start',
                  border: '0.5px solid rgba(255,255,255,0.08)',
                  padding: 'clamp(24px, 4vw, 32px)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                {/* Icon */}
                <div className="mb-[16px]">
                  <div
                    className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center"
                    style={{ backgroundColor: `${BLUE}12`, border: `0.5px solid ${BLUE}25` }}
                  >
                    <Icon size={20} strokeWidth={1.5} style={{ color: BLUE }} />
                  </div>
                </div>

                {/* Título */}
                <h3 style={{
                  fontFamily: 'Saira, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'rgba(255,255,255,0.45)',
                  textTransform: 'uppercase' as const,
                  marginBottom: '12px',
                }}>
                  {c.titulo}
                </h3>

                {/* Línea principal destacada */}
                <p style={{
                  fontFamily: 'Saira, sans-serif',
                  fontSize: 'clamp(22px, 4.5vw, 28px)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: BLUE,
                  marginBottom: '10px',
                }}>
                  {c.destacado}
                </p>

                {/* Línea breve */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(14px, 3vw, 15px)',
                  lineHeight: 1.45,
                  color: 'rgba(255,255,255,0.80)',
                  marginBottom: '16px',
                }}>
                  {c.breve}
                </p>

                {/* Línea final comparativa */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(12px, 2.5vw, 13px)',
                  lineHeight: 1.4,
                  color: 'rgba(255,255,255,0.35)',
                  marginTop: 'auto',
                  paddingTop: '12px',
                  borderTop: '0.5px solid rgba(255,255,255,0.06)',
                }}>
                  {c.contraste}
                </p>
              </div>
            );
          })}
        </div>

        {/* Progress dots — mobile only */}
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

      {/* CIERRE */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.3, delay: 0.8, ease: EASE }}
        className="text-center flex flex-col items-center gap-[24px] mt-[48px] px-[20px]"
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

        <a
          href="https://scalaops.com/formulario"
          className="inline-flex items-center justify-center transition-colors duration-150 ease-out"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#000000',
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            padding: '14px 32px',
            borderRadius: '100px',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.92)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF'; }}
        >
          Implementar Sentinel →
        </a>
      </motion.div>

      {/* Hide scrollbar CSS */}
      <style dangerouslySetInnerHTML={{__html:`
        [style*="scroll-snap-type"] { -ms-overflow-style: none; }
        [style*="scroll-snap-type"]::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
};
