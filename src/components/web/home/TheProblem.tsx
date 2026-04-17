import React from 'react';
import { motion } from 'framer-motion';

const problems = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#6bdda1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    title: "Tardás más de 30 minutos",
    text: "Para cuando contestás, el cliente ya le escribió a otro.",
    metric: "80% de los leads no responden si tardás más de 5 min"
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#6bdda1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
    title: "Nadie vuelve a escribir",
    text: "El interesado no compró, pero tampoco dijo que no. Quedó flotando.",
    metric: "Se necesitan 5 contactos promedio para cerrar una venta"
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#6bdda1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
        <line x1="2" y1="2" x2="22" y2="22"></line>
      </svg>
    ),
    title: "No sabés cuánto perdés",
    text: "No medís tiempos, no registrás motivos de pérdida, no ves el embudo.",
    metric: "Sin datos, no hay mejora posible"
  }
];

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export const TheProblem = () => {
  return (
    <section className="relative py-16 bg-[#000000] overflow-hidden">
      
      {/* Sutil divider arriba (ADN Scala gradient) */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(24,93,232,0.3) 50%, rgba(107,221,161,0.3) 100%, transparent 100%)' }} />

      <div className="container-custom relative z-10">
        
        {/* Header content */}
        <div className="max-w-3xl mx-auto mb-16 text-center flex flex-col items-center">
          <span className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-4">
            EL PROBLEMA
          </span>
          <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: 'var(--font-primary)' }}>
            Te llegan consultas.<br/>Se caen antes de cerrar.
          </h2>
          <p className="text-[17px] md:text-[20px] text-white/50 leading-relaxed font-normal mb-8 max-w-[600px]" style={{ fontFamily: 'var(--font-secondary)' }}>
            Esto es lo que pasa en la mayoría de los negocios que venden por WhatsApp, Instagram o llamadas.
          </p>

          {/* Separador de 3 barras ADN Scala */}
          <div className="flex flex-col gap-2 mt-2 opacity-60">
            <div className="h-[4px] w-[50px] rounded-full" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />
            <div className="h-[4px] w-[120px] rounded-full" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />
            <div className="h-[4px] w-[80px] rounded-full" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {problems.map((prob, i) => (
            <motion.div 
              key={i}
              variants={cardVariants}
              className="group relative flex flex-col h-full rounded-[20px] transition-all duration-400 ease-in-out cursor-default overflow-hidden"
              style={{
                background: 'radial-gradient(circle at top left, #0F1419 0%, #0A0A0A 100%)',
                border: '1px solid #1A1A1A',
                padding: '40px',
              }}
              whileHover={{
                y: -4,
                boxShadow: '0 10px 40px rgba(24, 93, 232, 0.1), 0 10px 40px rgba(107, 221, 161, 0.05)'
              }}
            >
              {/* Fake animated gradient border on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[20px]" 
                style={{ 
                  padding: '1px', 
                  background: 'linear-gradient(135deg, #185de8, #6bdda1)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
                  WebkitMaskComposite: 'xor', 
                  maskComposite: 'exclude' 
                }} 
              />



              {/* Zona 1: Ícono */}
              <div className="mb-10 inline-flex relative w-12 h-12 items-center justify-center rounded-full bg-[#030303]">
                {/* Border gradiente fino para el ícono */}
                <div 
                  className="absolute inset-0 rounded-full" 
                  style={{ 
                    padding: '1.5px', 
                    background: 'linear-gradient(135deg, #185de8, #6bdda1)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', 
                    WebkitMaskComposite: 'xor', 
                    maskComposite: 'exclude' 
                  }} 
                />
                {prob.icon}
              </div>
              
              {/* Zona 2: Título y descripción */}
              <div className="mb-12 flex-grow relative z-10">
                <h3 className="text-[26px] md:text-[28px] font-bold text-white mb-4 tracking-tight leading-tight" style={{ fontFamily: 'var(--font-primary)' }}>
                  {prob.title}
                </h3>
                <p className="text-[16px] text-[#bababa] leading-[1.6]" style={{ fontFamily: 'var(--font-secondary)' }}>
                  {prob.text}
                </p>
              </div>
              
              {/* Zona 3: Stat badge rediseñado */}
              <div className="mt-auto block relative z-10">
                {/* Línea horizontal gradiente decorativa */}
                <div className="h-[2px] w-12 rounded-full mb-3" style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} />
                
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#E8E8E8] shrink-0 mt-0.5 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <span className="text-[13px] md:text-[14px] font-semibold tracking-wide opacity-80" style={{ color: '#E8E8E8', fontFamily: 'var(--font-secondary)' }}>
                    {prob.metric}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Bajada de Cierre */}
        <div className="max-w-2xl mx-auto text-center mt-8">
          <p className="text-[18px] md:text-[20px] text-white leading-[1.6] font-medium" style={{ fontFamily: 'var(--font-secondary)' }}>
            Scala entra exactamente ahí. Auditamos, corregimos y automatizamos <br className="hidden md:block"/> para que dejes de perder ventas que ya tenías.
          </p>
        </div>

      </div>
    </section>
  );
};
