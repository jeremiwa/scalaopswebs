import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DollarSign, Zap, Clock, MessageSquare, RefreshCw, ListChecks } from 'lucide-react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const BLUE = '#4A8FFF';

const bloques = [
  {
    etiqueta: "Costos",
    icon: DollarSign,
    solucion: "Implementación única USD 997",
    descripcion: "Sin sueldo mensual, sin cargas, sin aguinaldo, sin ART.",
    dolor: "Antes: USD 18.000+ al año por cada vendedor.",
  },
  {
    etiqueta: "Velocidad",
    icon: Zap,
    solucion: "Responde en menos de 8 segundos",
    descripcion: "Cada consulta tiene respuesta instantánea, sin importar el volumen.",
    dolor: "Antes: tu equipo tarda 40 minutos promedio.",
  },
  {
    etiqueta: "Horario",
    icon: Clock,
    solucion: "Atiende 24/7/365",
    descripcion: "Sábado a las 23hs, domingo, feriados, Navidad. Nunca cierra.",
    dolor: "Antes: el 40% de tus leads entran fuera de horario.",
  },
  {
    etiqueta: "Capacidad",
    icon: MessageSquare,
    solucion: "50+ chats en simultáneo",
    descripcion: "Sin filas de espera. Atiende a todos al mismo tiempo, sin saturarse.",
    dolor: "Antes: un humano solo atiende un chat por vez.",
  },
  {
    etiqueta: "Rotación",
    icon: RefreshCw,
    solucion: "Entrenado una sola vez",
    descripcion: "Aprende tu negocio en días y se queda. Cero re-capacitación.",
    dolor: "Antes: 3 meses para capacitar a cada vendedor nuevo.",
  },
  {
    etiqueta: "Tareas repetitivas",
    icon: ListChecks,
    solucion: "Filtra y deriva oportunidades reales",
    descripcion: "Tu equipo solo recibe los leads calificados, listos para cerrar.",
    dolor: "Antes: tu mejor vendedor pierde el 60% del día respondiendo lo mismo.",
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
          transition={{ duration: 0.3, ease: EASE }}
          className="block text-white text-[10px] font-medium tracking-[0.08em] mb-[16px] text-center"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          LO QUE RESUELVE SENTINEL
        </motion.span>

        {/* HEADLINE */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
          className="text-center mb-[24px]"
          style={{
            fontFamily: 'Saira, sans-serif',
            fontSize: 'clamp(34px, 5.5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            color: 'rgba(255,255,255,0.95)',
          }}
        >
          Seis problemas resueltos.<br />
          Con un solo <span style={{ color: BLUE }}>Empleado IA.</span>
        </motion.h2>

        {/* SUBHEADLINE */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 0.55, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.35, ease: EASE }}
          className="text-center mb-[32px] md:mb-[48px] max-w-[90%] md:max-w-[500px]"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(14px, 3vw, 16px)',
            lineHeight: 1.4,
            color: '#FFFFFF',
          }}
        >
          Lo que cambia el día que activás Sentinel.
        </motion.p>

        {/* GRID — 2 cols mobile, 2 cols tablet, 3 cols desktop */}
        <div
          className="w-full grid grid-cols-2 lg:grid-cols-3 mb-[32px] md:mb-[48px]"
          style={{ gap: 'clamp(8px, 1.5vw, 12px)' }}
        >
          {bloques.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.55 + i * 0.06, ease: EASE }}
                className="flex flex-col bg-[#0C0C0E] rounded-[18px] transition-colors duration-200 ease-out"
                style={{
                  border: '0.5px solid rgba(255,255,255,0.08)',
                  padding: 'clamp(16px, 3vw, 28px)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                {/* Ícono */}
                <div className="mb-[8px] md:mb-[12px]">
                  <Icon size={20} strokeWidth={1.5} style={{ color: BLUE, flexShrink: 0 }} />
                </div>

                {/* Etiqueta como título */}
                <h3 style={{
                  fontFamily: 'Saira, sans-serif',
                  fontSize: 'clamp(16px, 3.5vw, 22px)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  marginBottom: 'clamp(8px, 1.5vw, 12px)',
                }}>
                  {b.etiqueta}
                </h3>

                {/* Solución */}
                <p style={{
                  fontFamily: 'Saira, sans-serif',
                  fontSize: 'clamp(14px, 2.8vw, 18px)',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: BLUE,
                  marginBottom: 'clamp(6px, 1vw, 8px)',
                }}>
                  {b.solucion}
                </p>

                {/* Descripción */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(11px, 2.2vw, 14px)',
                  lineHeight: 1.45,
                  color: 'rgba(255,255,255,0.80)',
                  marginBottom: 'clamp(10px, 1.5vw, 14px)',
                }}>
                  {b.descripcion}
                </p>

                {/* Divisor */}
                <div style={{
                  width: '32px',
                  height: '0.5px',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  marginBottom: 'clamp(10px, 1.5vw, 14px)',
                }} />

                {/* Contexto dolor en rojo */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(10px, 2vw, 12px)',
                  lineHeight: 1.4,
                  color: '#E85B5B',
                }}>
                  {b.dolor}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CIERRE */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 1.0, ease: EASE }}
          className="text-center flex flex-col items-center gap-[20px]"
        >
          <p style={{
            fontFamily: 'Saira, sans-serif',
            fontSize: 'clamp(17px, 3.5vw, 20px)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.90)',
            lineHeight: 1.2,
          }}>
            Un solo Empleado IA.{' '}
            <span style={{ color: BLUE }}>Seis problemas que dejás de tener.</span>
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
