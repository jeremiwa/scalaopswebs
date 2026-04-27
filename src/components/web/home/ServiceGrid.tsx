import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    badge: "7 días",
    title: "Auditoría Comercial",
    desc: "Encontramos dónde perdés plata. Con datos reales, no con opiniones.",
    features: [
      "Análisis de respuesta y seguimiento",
      "Revisión de pipeline y CRM",
      "Escucha de llamadas y chats",
      "Plan de acción priorizado"
    ],
    cta: "Agendar auditoría",
    link: "/auditoria",
    featured: false
  },
  {
    badge: "30 días",
    title: "Sistema Comercial Completo",
    desc: "Dejamos la máquina armada. Para que no dependas de nadie.",
    features: [
      "Guiones y estructura de ventas",
      "Automatizaciones zapier/make",
      "Tablero de control en tiempo real",
      "Entrenamiento a tu equipo"
    ],
    cta: "Ver alcance",
    link: "/implementacion",
    featured: true
  },
  {
    badge: "24/7",
    title: "Empleado IA",
    desc: "Responde en 4 segundos. Califica, agenda y hace seguimiento automático.",
    features: [
      "Agente conectado a WhatsApp/IG",
      "Calificación de leads en tiempo real",
      "Integración total con tu CRM",
      "Traspaso a humano inteligente"
    ],
    cta: "Ver cómo funciona",
    link: "/empleado-ia",
    featured: false
  }
];

export const ServiceGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.21, 1.02, 0.73, 1] } 
    }
  };

  return (
    <section className="py-10 md:py-16 bg-[#000000] relative overflow-hidden" id="soluciones">
      {/* Opcional: fondo general grid sutil o glow de seccion si hiciera falta */}

      <div className="container-custom relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-10 md:mb-16 lg:mb-20 flex flex-col items-center max-w-4xl mx-auto">
          
          {/* ADN Scala: Las 3 barras */}
          <div className="flex flex-col items-center gap-2 mb-6 opacity-80">
            <div className="h-[4px] w-[60px] rounded-full" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />
            <div className="h-[4px] w-[100px] rounded-full" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />
            <div className="h-[4px] w-[140px] rounded-full" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />
          </div>

          <span className="block text-[11px] font-bold text-[#185de8] uppercase tracking-[0.2em] mb-4">
            LO QUE HACEMOS
          </span>
          <h2 className="text-[38px] md:text-[52px] font-bold text-white tracking-tight leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
            Tres servicios. Un solo objetivo:<br/>que vendas más.
          </h2>
        </div>

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((s, i) => (
            <motion.div 
              key={i}
              variants={cardVariants}
              className={`relative flex flex-col ${s.featured ? 'lg:-translate-y-4 shadow-2xl z-10 pt-[16px]' : 'z-0 pt-[16px]'}`}
            >
              
              {/* Contenedor oficial de la tarjeta */}
              <div 
                className={`card-base h-full relative p-8 md:p-10 flex flex-col transition-all duration-400 cursor-default rounded-[24px] overflow-visible group ${s.featured ? 'card-featured' : 'card-normal'}`}
              >

                {/* Badge Producto Estrella (Solo Featured) */}
                {s.featured && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 rounded-full px-4 py-1.5 shadow-[0_8px_20px_rgba(24,93,232,0.3)] z-50 pointer-events-none" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }}>
                    <span className="text-[11px] text-black font-black tracking-widest uppercase flex items-center gap-1.5">
                      <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      Producto Estrella
                    </span>
                  </div>
                )}

                {/* Badge Superior */}
                <div className="mb-8">
                  <span className="inline-block px-3 py-1.5 rounded-md text-[11px] font-bold tracking-[0.1em] uppercase bg-[#185de8]/10 text-[#6bdda1] border border-[#185de8]/20">
                    {s.badge}
                  </span>
                </div>

                {/* Header Card */}
                <h3 className="text-[24px] font-bold text-white mb-3 tracking-tight" style={{ fontFamily: 'var(--font-primary)' }}>
                  {s.title}
                </h3>
                <p className="text-[15px] text-[#999999] leading-relaxed mb-8 h-[48px]" style={{ fontFamily: 'var(--font-secondary)' }}>
                  {s.desc}
                </p>

                {/* Features (Checkmarks rediseñados) */}
                <ul className="space-y-4 mb-10 flex-grow">
                  {s.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-[2px] shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'linear-gradient(135deg, #185de8, #6bdda1)' }} />
                        <svg className="w-[10px] h-[10px] text-[#6bdda1] flex-shrink-0 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-[14px] text-white/80 leading-snug font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Final (más premium) */}
                <div className="mt-auto pt-6 border-t border-white/[0.04]">
                  <a href={s.link} className="group/cta inline-flex items-center text-[15px] font-bold text-[#6bdda1] transition-colors hover:text-white" style={{ fontFamily: 'var(--font-primary)' }}>
                    {s.cta}
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/cta:translate-x-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    {/* Hover Gradient Underline */}
                    <div className="absolute -bottom-[2px] left-0 w-0 h-[2px] transition-all duration-300 group-hover/cta:w-full" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        /* Card Normal */
        .card-normal {
          background: #0A0A0A;
          border: 1px solid #1A1A1A;
          position: relative;
        }
        .card-normal::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, rgba(24,93,232,0.05) 0%, transparent 60%);
          border-radius: inherit;
          pointer-events: none;
        }
        .card-normal:hover {
          border-color: rgba(107, 221, 161, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 10px 40px rgba(107, 221, 161, 0.05);
        }

        /* Card Featured (Vercel Style Rotating Gradient) */
        @property --v-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        .card-featured {
          background: #0A0A0A;
          position: relative;
          z-index: 1;
        }
        /* Fallback de CSS puro para navegadores usando animacion wrapper. Dado que tailwind bloquea @property en varios escenarios, usaremos el wrapper tradicional. */
        
        .card-featured::after {
          /* El background interior sólido negro */
          content: "";
          position: absolute;
          inset: 1px; /* 1px border o 2px */
          background: #050505; /* Fondo solido de la card para tapar el pseudo elemento gradiente */
          border-radius: 23px;
          z-index: -1;
        }
        
        .card-featured::before {
          /* Animacion de borde conic-gradient pseudo elemento giratorio */
          content: "";
          position: absolute;
          inset: -1px; /* Grueso del borde! */
          background: conic-gradient(from var(--v-angle), #185de8, #6bdda1, #185de8);
          border-radius: 24px;
          z-index: -2;
          animation: spin-conic 4s linear infinite;
        }
        
        @keyframes spin-conic {
          0% { --v-angle: 0deg; }
          100% { --v-angle: 360deg; }
        }

        /* Si el browser no soporta @property --v-angle, usamos un keyframe block con background-position de barrido rotatorio, o clip-path. Un wrapper animado seria perfecto */
        @supports not (background: paint(something)) {
          /* Fallback si arroja problemas (Chrome siempre lo soporta) */
        }
      `}</style>
    </section>
  );
};
