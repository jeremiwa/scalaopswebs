import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DollarSign, Zap, Clock, MessageSquare, RefreshCw, ListChecks } from 'lucide-react';

const EASE_APPLE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const BLUE = '#4A8FFF';

const bloques = [
  {
    etiqueta: "Costos",
    icon: DollarSign,
    dolor: "USD 18.000+/año",
    subdato: "en sueldo, cargas, aguinaldo, ART",
    resolucion: "USD 997",
    microcopy: "Sin cargas. Sin aguinaldo. Sin ART.",
  },
  {
    etiqueta: "Velocidad",
    icon: Zap,
    dolor: "20 min",
    subdato: "tarda tu equipo en responder",
    resolucion: "<8 segundos",
    microcopy: "Mientras la competencia duerme.",
  },
  {
    etiqueta: "Horario",
    icon: Clock,
    dolor: "40% de leads",
    subdato: "entran fuera del horario laboral",
    resolucion: "24/7/365",
    microcopy: "Sábado 23hs, lunes feriado, Navidad.",
  },
  {
    etiqueta: "Capacidad",
    icon: MessageSquare,
    dolor: "1 chat por vez",
    subdato: "es lo que atiende un humano",
    resolucion: "50+ simultáneos",
    microcopy: "Sin tiempos de espera. Nunca.",
  },
  {
    etiqueta: "Rotación",
    icon: RefreshCw,
    dolor: "3 meses",
    subdato: "para capacitar a cada vendedor nuevo",
    resolucion: "entrenado una vez",
    microcopy: "Cero re-capacitación. Cero curva.",
  },
  {
    etiqueta: "Tareas repetitivas",
    icon: ListChecks,
    dolor: "60% del día",
    subdato: "tu mejor vendedor responde lo mismo",
    resolucion: "filtra y deriva",
    microcopy: "Tu equipo solo cierra oportunidades reales.",
  },
];

export const S02_BentoDolores = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#000000] flex flex-col items-center relative overflow-hidden"
      style={{ paddingTop: 'clamp(96px, 10vw, 140px)', paddingBottom: 'clamp(64px, 8vw, 96px)' }}
    >
      <div className="w-full max-w-[1100px] mx-auto px-[16px] md:px-[20px] flex flex-col items-center">

        {/* EYEBROW */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.5 } : {}}
          transition={{ duration: 0.3, ease: EASE_APPLE }}
          className="block text-white text-[10px] font-medium tracking-[0.08em] mb-[16px] text-center"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          LO QUE SENTINEL TE SACA DE ENCIMA
        </motion.span>

        {/* HEADLINE */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15, ease: EASE_APPLE }}
          className="text-center mb-[24px]"
          style={{
            fontFamily: 'Saira, sans-serif',
            fontSize: 'clamp(34px, 5.5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
          }}
        >
          Seis dolores.<br />
          <span style={{ color: BLUE }}>Una sola solución.</span>
        </motion.h2>

        {/* SUBHEADLINE */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 0.55, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.35, ease: EASE_APPLE }}
          className="text-center mb-[32px] md:mb-[48px] max-w-[90%] md:max-w-[500px]"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(14px, 3vw, 16px)',
            lineHeight: 1.4,
            color: '#FFFFFF',
          }}
        >
          Mirá lo que cambia el día que activás Sentinel.
        </motion.p>

        {/* GRID */}
        <div
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-[32px] md:mb-[48px]"
          style={{ gap: 'clamp(8px, 1.5vw, 12px)' }}
        >
          {bloques.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.55 + i * 0.06, ease: EASE_APPLE }}
                className="flex flex-col justify-between bg-[#0C0C0E] rounded-[18px] transition-colors duration-200 ease-out"
                style={{
                  border: '0.5px solid rgba(255,255,255,0.08)',
                  padding: 'clamp(22px, 3vw, 28px)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                {/* Ícono + Etiqueta */}
                <div className="flex items-center gap-[8px] mb-[10px]">
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    style={{ color: `${BLUE}d9`, flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.48)',
                      letterSpacing: '0em',
                    }}
                  >
                    {b.etiqueta}
                  </span>
                </div>

                {/* Dato dolor */}
                <h3
                  className="mb-[6px]"
                  style={{
                    fontFamily: 'Saira, sans-serif',
                    fontSize: 'clamp(26px, 4vw, 32px)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: 'rgba(255,255,255,0.95)',
                  }}
                >
                  {b.dolor}
                </h3>

                {/* Subdato */}
                <p
                  className="mb-[16px]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(12px, 2.5vw, 13px)',
                    lineHeight: 1.35,
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {b.subdato}
                </p>

                {/* Divisor */}
                <div
                  className="mb-[16px]"
                  style={{
                    width: '32px',
                    height: '0.5px',
                    backgroundColor: 'rgba(255,255,255,0.10)',
                  }}
                />

                {/* Resolución */}
                <h4
                  className="mb-[6px]"
                  style={{
                    fontFamily: 'Saira, sans-serif',
                    fontSize: 'clamp(15px, 2.8vw, 17px)',
                    fontWeight: 500,
                    lineHeight: 1.2,
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>Sentinel: </span>
                  <span style={{ color: BLUE }}>{b.resolucion}</span>
                </h4>

                {/* Microcopy */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    lineHeight: 1.35,
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {b.microcopy}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CIERRE */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 1.0, ease: EASE_APPLE }}
          className="text-center flex flex-col items-center gap-[20px]"
        >
          <p
            style={{
              fontFamily: 'Saira, sans-serif',
              fontSize: 'clamp(16px, 3.5vw, 20px)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
            }}
          >
            Seis problemas que cuestan caro. Uno solo que{' '}
            <span style={{ color: BLUE }}>los resuelve.</span>
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

      </div>
    </section>
  );
};
