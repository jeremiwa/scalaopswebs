import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Clock, BellOff, Users, Moon } from 'lucide-react';

const cards = [
  {
    icon: <MessageCircle className="w-5 h-5 text-white/70" strokeWidth={1.5} />,
    title: 'Mensaje sin responder',
    scenario: 'Te escriben a las 21:34. Lo ves a las 9:15 del día siguiente. Ya compraron en otro lado.',
    impactNum: '30-50%',
    impactText: 'de los leads se pierden si pasan más de 5 minutos sin respuesta.'
  },
  {
    icon: <Clock className="w-5 h-5 text-white/70" strokeWidth={1.5} />,
    title: 'Respuesta lenta',
    scenario: 'Tu vendedor está con otro cliente. El que esperó 20 minutos ya pidió presupuesto en otros 3 lugares.',
    impactNum: '78%',
    impactText: 'cierra con el primer proveedor en responder.'
  },
  {
    icon: <BellOff className="w-5 h-5 text-white/70" strokeWidth={1.5} />,
    title: 'Seguimiento olvidado',
    scenario: 'Pidió precio el martes. Nadie volvió a escribirle. Lo perdiste sin saberlo.',
    impactNum: '80%',
    impactText: 'de las ventas requiere 5+ contactos. La mayoría hace 1.'
  },
  {
    icon: <Users className="w-5 h-5 text-white/70" strokeWidth={1.5} />,
    title: 'Equipo saturado',
    scenario: 'Tres vendedores respondiendo lo mismo todo el día. Sueldos por USD 3.000+/mes para hacer trabajo de filtro.',
    impactNum: '60%',
    impactText: 'del día se pierde en consultas que un bot resuelve en segundos.'
  },
  {
    icon: <Moon className="w-5 h-5 text-white/70" strokeWidth={1.5} />,
    title: 'Fuera de horario',
    scenario: 'Sábado a las 23:00 alguien te consulta en serio. Nadie le contesta hasta el lunes a las 10.',
    impactNum: '40%',
    impactText: 'del tráfico entra fuera del horario. Esas oportunidades llegan frías el lunes.'
  }
];

export const NotABot = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-[80px] overflow-hidden">
      {/* Background Radial Coral */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,77,109,0.04) 0%, transparent 70%)'
        }}
      />

      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[1100px] mx-auto">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{
            color: 'rgba(0, 212, 170, 0.8)',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '16px',
            textAlign: 'center'
          }}
        >
          DIAGNÓSTICO
        </motion.div>

        {/* Headline */}
        <div className="mb-5 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              fontFamily: 'Saira, var(--font-primary), sans-serif',
              fontSize: 'clamp(38px, 8vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              margin: 0,
              padding: 0
            }}
          >
            Cinco lugares donde se te
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative inline-block"
            style={{
              fontFamily: 'Saira, var(--font-primary), sans-serif',
              fontSize: 'clamp(38px, 8vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              margin: 0,
              padding: 0
            }}
          >
            escapa la <span style={{ color: 'var(--color-loss, #FF4D6D)' }}>plata</span>.
          </motion.div>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(16px, 4vw, 18px)',
            color: 'rgba(255,255,255,0.70)',
            lineHeight: 1.45,
            textAlign: 'center',
            maxWidth: '90%',
            marginBottom: '48px'
          }}
        >
          Cada una cuesta más de lo que pensás. Sentinel las cubre todas.
        </motion.p>

        {/* Grid de 5 Tarjetas */}
        <div className="pain-cards-grid w-full mb-[40px]">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 1.3 + (i * 0.12) }}
              className="pain-card group"
            >
              {/* Dripping Accent */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-[16px] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-[#FF4D6D] to-transparent dripping-anim" />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.15)'
                  }}
                >
                  {card.icon}
                </div>
                <h3 style={{ fontFamily: 'Saira, sans-serif', fontSize: '18px', fontWeight: 600, color: '#FFFFFF' }}>
                  {card.title}
                </h3>
              </div>

              {/* Divisor */}
              <div className="w-full h-[1px] mb-4 bg-white/[0.08]" />

              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: '20px' }}>
                {card.scenario}
              </p>

              {/* Impacto */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                transition={{ duration: 0.3, delay: 1.3 + (i * 0.12) + 0.2 }}
                className="flex items-start gap-2 impact-box transition-colors duration-300"
                style={{
                  background: 'rgba(255,77,109,0.06)',
                  padding: '10px 14px',
                  borderRadius: '10px'
                }}
              >
                <div className="mt-1" style={{ color: 'var(--color-loss, #FF4D6D)', fontSize: '12px' }}>▸</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', lineHeight: 1.4 }}>
                  <span style={{ color: 'var(--color-loss, #FF4D6D)', fontWeight: 700, paddingRight: '4px' }}>
                    {card.impactNum}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                    {card.impactText}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Closing Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 2.5 }}
          className="w-full relative rounded-2xl closing-box-glow"
          style={{
            background: '#0A0A0A',
            border: '1px solid transparent',
            backgroundClip: 'padding-box',
          }}
        >
          {/* Gradient border wrapper */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
            padding: '1px',
            background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }} />

          <div className="py-6 px-4 w-full text-center">
            <h4 style={{
              fontFamily: 'Saira, sans-serif',
              fontSize: 'clamp(20px, 4vw, 26px)',
              fontWeight: 600,
              color: '#FFFFFF',
              margin: 0
            }}>
              Cinco fugas. Un solo Empleado IA que <span style={{ color: '#00D4AA' }}>las cierra todas</span>.
            </h4>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --color-loss: #FF4D6D;
        }

        .pain-cards-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }

        /* Tablet (481-1024px) */
        @media (min-width: 481px) and (max-width: 1024px) {
          .pain-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .pain-cards-grid > div:last-child {
            grid-column: span 2;
          }
        }

        /* Desktop (≥1025px) */
        @media (min-width: 1025px) {
          .pain-cards-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 20px;
          }
          .pain-cards-grid > div:nth-child(1),
          .pain-cards-grid > div:nth-child(2),
          .pain-cards-grid > div:nth-child(3) {
            grid-column: span 2;
          }
          .pain-cards-grid > div:nth-child(4),
          .pain-cards-grid > div:nth-child(5) {
            grid-column: span 3;
          }
        }

        .pain-card {
          position: relative;
          background: #0A0A0A;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px;
          transition: transform 0.2s ease, border-width 0.2s ease;
        }

        .pain-card:active, .pain-card:hover {
          transform: scale(1.01);
        }

        .pain-card:active .impact-box, .pain-card:hover .impact-box {
          background: rgba(255,77,109,0.09) !important;
        }

        .pain-card:active .dripping-anim, .pain-card:hover .dripping-anim {
          width: 3px;
        }

        @keyframes dripping {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        @keyframes boxGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 170, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 212, 170, 0.5); }
        }

        .dripping-anim {
          animation: dripping 6s ease-in-out infinite;
          width: 2px;
          transition: width 0.2s ease;
        }

        .closing-box-glow {
          animation: boxGlow 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .dripping-anim { animation: none; transform: none; }
          .closing-box-glow { animation: none; box-shadow: none; }
          .scratch-anim { animation: none; transform: none; }
        }
      `}} />
    </section>
  );
};
