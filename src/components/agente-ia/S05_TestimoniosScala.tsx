import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonios = [
  {
    badge: "Cursos y capacitaciones",
    quote: "Antes muchas consultas quedaban esperando hasta que alguien podía responder. Sentinel empezó a contestar, filtrar y dejar listas las conversaciones importantes para el equipo.",
    name: "Martín R.",
    role: "Director comercial · Empresa B2B",
    avatarColor: "#0066FF"
  },
  {
    badge: "Estética y turnos",
    quote: "Sentinel respondió fuera de horario, resolvió dudas frecuentes y nos ayudó a avanzar consultas sin depender de que alguien esté mirando WhatsApp todo el día.",
    name: "Sofía V.",
    role: "CEO · Centro de estética",
    avatarColor: "#00D4AA"
  },
  {
    badge: "Ventas por WhatsApp",
    quote: "El cambio más grande fue pasar de 5 vendedores a dos. Sentinel absorbió todo el ruido y el equipo se enfocó en cerrar.",
    name: "Federico L.",
    role: "Dueño · Negocio de servicios",
    avatarColor: "#FF4D6D"
  }
];

export const S05_TestimoniosScala = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <section ref={ref} className="w-full bg-[#000000] py-[48px] md:py-[80px] flex flex-col items-center overflow-hidden border-y border-white/[0.02]">
      
      <div className="container-custom px-0 md:px-[20px] w-full max-w-[1200px] mx-auto">
        
        {/* Encabezado */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-[64px] px-[20px]"
        >
          <span className="block text-[11px] font-bold text-[#00D4AA] uppercase tracking-[0.2em] mb-[16px]">
            Resultados Reales
          </span>
          <h2 className="text-[clamp(32px,6vw,48px)] font-[800] text-white leading-[1.1] tracking-tight mb-[24px]" style={{ fontFamily: 'Saira, sans-serif' }}>
            Negocios que dejaron de perder consultas por responder tarde.
          </h2>
          <p className="text-[clamp(16px,4vw,20px)] text-white/70 leading-[1.4] max-w-[700px] mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Sentinel trabaja la primera atención para que el equipo comercial llegue con mejores oportunidades.
          </p>
        </motion.div>

        {/* Testimonios Grid / Scroll */}
        <div className="flex md:grid md:grid-cols-3 gap-[24px] px-[20px] pb-[20px] overflow-x-auto md:overflow-visible snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
          
          {testimonios.map((t, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="flex-shrink-0 w-[85%] sm:w-[400px] md:w-full snap-center group flex flex-col bg-[#0A0A0A] rounded-[24px] relative transition-all duration-400 hover:-translate-y-2 border border-[#1A1A1A] hover:border-[#00D4AA]/40 hover:shadow-[0_10px_40px_rgba(0,212,170,0.05)]"
            >
              <div className="absolute top-0 right-4 text-[140px] leading-none opacity-[0.03] select-none pointer-events-none" style={{ fontFamily: 'Saira, sans-serif' }}>
                "
              </div>

              <div className="p-[32px] flex flex-col h-full relative z-10">
                
                {/* Badge Superior */}
                <div className="self-start inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] mb-[32px] border" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <svg className="w-3 h-3 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span className="text-white/80 text-[11px] font-bold tracking-wide uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {t.badge}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-[17px] text-white/90 leading-[1.6] italic mb-[40px] flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>
                  "{t.quote}"
                </p>

                {/* Divider Gradiente */}
                <div className="w-full h-px mb-[24px]" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)' }} />

                {/* Avatar + Info */}
                <div className="flex items-center gap-[16px]">
                  <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0 border-2 border-[#1A1A1A]" style={{ backgroundColor: t.avatarColor }}>
                    <span className="text-[16px] font-bold text-white uppercase tracking-wider" style={{ fontFamily: 'Saira, sans-serif' }}>
                      {getInitials(t.name)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-white font-bold text-[16px] tracking-tight mb-[2px]" style={{ fontFamily: 'Inter, sans-serif' }}>{t.name}</h4>
                    <span className="text-white/50 text-[13px] font-medium leading-[1.2]" style={{ fontFamily: 'Inter, sans-serif' }}>{t.role}</span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
          
        </div>

      </div>
    </section>
  );
};
