import React from 'react';
import { motion } from 'framer-motion';

export const FinalCTA = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 15, delay: 0.6 }
    }
  };

  const textMessage = encodeURIComponent("Hola Scala, me gustaría saber más sobre la auditoría.");
  const whatsappUrl = `https://wa.me/5491100000000?text=${textMessage}`;

  return (
    <section className="relative py-10 md:py-16 overflow-hidden bg-[#000000]">
      
      {/* Elemento Gráfico de Fondo: Barras de Marca Desplazándose */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex flex-col justify-center items-center gap-[40px] opacity-[0.12]">
        <motion.div 
           className="w-[120%] h-[20px] rounded-full" 
           style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} 
           animate={{ x: ['-5%', '5%', '-5%'] }} 
           transition={{ duration: 15, ease: 'linear', repeat: Infinity }} 
        />
        <motion.div 
           className="w-[140%] h-[25px] rounded-full" 
           style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} 
           animate={{ x: ['5%', '-5%', '5%'] }} 
           transition={{ duration: 20, ease: 'linear', repeat: Infinity }} 
        />
        <motion.div 
           className="w-[100%] h-[30px] rounded-full" 
           style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} 
           animate={{ x: ['-2%', '8%', '-2%'] }} 
           transition={{ duration: 18, ease: 'linear', repeat: Infinity }} 
        />
        <motion.div 
           className="w-[150%] h-[35px] rounded-full" 
           style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} 
           animate={{ x: ['8%', '-2%', '8%'] }} 
           transition={{ duration: 25, ease: 'linear', repeat: Infinity }} 
        />
        <motion.div 
           className="w-[130%] h-[40px] rounded-full" 
           style={{ background: 'linear-gradient(90deg, #185de8, #6bdda1)' }} 
           animate={{ x: ['-7%', '3%', '-7%'] }} 
           transition={{ duration: 22, ease: 'linear', repeat: Infinity }} 
        />
      </div>

      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        
        {/* Panel Central */}
        <motion.div 
          className="max-w-[700px] w-full flex flex-col items-center relative overflow-hidden"
          style={{
            background: 'radial-gradient(circle at center, #0F1419 0%, #000000 100%)',
            borderRadius: '32px',
            padding: '64px 32px',
            boxShadow: 'inset 0 0 40px rgba(107, 221, 161, 0.02), 0 20px 60px rgba(0,0,0,0.5)'
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Border sutil gradiente con clip */}
          <div className="absolute inset-0 rounded-[32px] pointer-events-none" style={{ padding: '1px', background: 'linear-gradient(135deg, rgba(24,93,232,0.4), rgba(107,221,161,0.4))', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', WebkitMaskComposite: 'xor' }} />

          {/* Eyebrow */}
          <motion.span variants={itemVariants} className="block text-[11px] font-bold text-[#6bdda1] uppercase tracking-[0.2em] mb-6">
            LO QUE ESTÁ EN JUEGO
          </motion.span>

          {/* Indicator Pill Rediseñado */}
          <motion.div variants={itemVariants} className="flex items-center gap-2.5 px-3 py-1.5 rounded-full mb-8 relative"
                      style={{ background: 'rgba(107, 221, 161, 0.1)', border: '1px solid rgba(107, 221, 161, 0.3)' }}>
            <motion.div 
              className="w-[6px] h-[6px] rounded-full bg-[#6bdda1]"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[13px] font-medium text-[#6bdda1] tracking-wide" style={{ fontFamily: 'var(--font-secondary)' }}>
              +100 negocios ya ordenaron su proceso comercial
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 variants={itemVariants} className="text-[40px] md:text-[52px] font-extrabold text-white tracking-tight leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-primary)' }}>
            Estás perdiendo ventas mientras leés esto.
          </motion.h2>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-[16px] md:text-[18px] text-[#999999] leading-[1.6] mb-12 max-w-[500px]" style={{ fontFamily: 'var(--font-secondary)' }}>
            Tu competencia no va a esperar a que ordenes tu proceso de venta. Cada día sin visibilidad es plata que dejás sobre la mesa.
          </motion.p>

          {/* Main Button Premium */}
          <div className="relative mb-10 w-full sm:w-auto">
            <motion.div variants={buttonVariants}>
              <motion.a
                href="https://calendar.app.google/your-link-here"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center overflow-hidden text-black text-[16px] transition-all w-full sm:w-auto text-center"
                style={{
                   padding: '22px 56px',
                   borderRadius: '100px',
                   fontFamily: 'var(--font-primary)',
                   fontWeight: 800,
                   background: 'linear-gradient(90deg, #185de8, #6bdda1)',
                   backgroundSize: '200% auto',
                   boxShadow: '0 0 60px rgba(107, 221, 161, 0.2)'
                }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 0 80px rgba(107, 221, 161, 0.5)',
                  backgroundPosition: 'right center'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer interno */}
                <motion.div
                  className="absolute top-0 bottom-0 w-[40px] bg-white/20 skew-x-[-20deg]"
                  style={{ left: '-20%' }}
                  animate={{ left: ['-20%', '120%'] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                />
                <span className="relative z-10 w-full whitespace-nowrap">Agendar llamada gratuita</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-12 text-[13px] text-[#bababa]" style={{ fontFamily: 'var(--font-secondary)' }}>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#6bdda1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> 
              Llamada sin costo
            </span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#6bdda1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> 
              Resultados en 72hs
            </span>
            <span className="hidden sm:inline text-white/10">|</span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#6bdda1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg> 
              Sin permanencia
            </span>
          </motion.div>

          {/* Alternative WhatsApp */}
          <motion.div variants={itemVariants} className="w-full relative pt-8">
             <div className="absolute top-0 left-[10%] right-[10%] h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)' }} />
             
             <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-[14px] font-medium text-white/50 transition-colors" style={{ fontFamily: 'var(--font-secondary)' }}>
               ¿Preferís escribirnos? 
               <span className="flex items-center gap-2 text-[#6bdda1] font-semibold transition-all">
                 <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/></svg>
                 <span className="relative group-hover:text-white transition-colors">
                   Abrir WhatsApp →
                   <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#6bdda1] group-hover:w-full transition-all duration-300"></span>
                 </span>
               </span>
             </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
