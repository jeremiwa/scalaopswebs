import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface VSLInviteModalProps {
  isOpen: boolean;
  onClose: (method: string) => void;
  onCTAClick: () => void;
  onSecondaryClick: () => void;
}

const COPY_VARIANTS = {
  // Ángulo: frustración operativa / algo que no termina de funcionar
  frustracion: {
    eyebrow: 'NUEVO',
    title: 'Sentís que tu equipo comercial podría vender mucho más.',
    bullets: [
      'Dónde se pierde el esfuerzo del equipo',
      'Por qué los leads se enfrían sin razón',
      'Cómo recuperar el control en 60 días',
    ],
    ctaPrimary: 'Ver presentación',
    ctaSecondary: 'Seguir explorando',
    trust: 'Usado por equipos comerciales en inmobiliarias, agencias y e-commerce',
  },
  // Ángulo: agotamiento / dueño apagando incendios
  agotamiento: {
    eyebrow: 'NUEVO',
    title: 'Ordená tu operación comercial. Dejá de apagar incendios.',
    bullets: [
      'Qué tareas repetitivas te consumen',
      'Cómo dejar de depender del seguimiento manual',
      'Resultados sostenibles en 30-60 días',
    ],
    ctaPrimary: 'Ver presentación',
    ctaSecondary: 'Seguir explorando',
    trust: 'Usado por equipos comerciales en inmobiliarias, agencias y e-commerce',
  },
  // Variante activa
  intuicion: {
    eyebrow: 'NUEVO',
    title: 'Podrías estar facturando mucho más. Mirá dónde se te escapan ventas y cómo empezar a corregirlo.',
    bullets: [
      'Detectá fugas de venta',
      'Identificá qué traba al equipo',
      'Empezá a recuperar ventas en 30 días',
    ],
    ctaPrimary: 'Ver presentación',
    ctaSecondary: 'Seguir explorando',
    trust: 'Usado por equipos comerciales en inmobiliarias, agencias y e-commerce',
  },
};

// Variante activa — cambiar acá para testear
const MODAL_COPY = COPY_VARIANTS.intuicion;

export const VSLInviteModal: React.FC<VSLInviteModalProps> = ({ 
  isOpen, 
  onClose, 
  onCTAClick, 
  onSecondaryClick 
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Manejo de foco y Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose('escape');
      }
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Enfocar el botón 'Cerrar' por defecto al abrir
      setTimeout(() => closeBtnRef.current?.focus(), 100);
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Motion Variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        type: "spring", stiffness: 180, damping: 22,
        staggerChildren: 0.15,
        delayChildren: 0.1
      } 
    },
    exit: { opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.25, ease: "easeIn" } }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="vsl-modal-title"
        >
          {/* Overlay Background */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => onClose('overlay')}
            className="absolute inset-0 z-0 cursor-pointer"
            style={{ 
              backgroundColor: 'rgba(5, 8, 15, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full md:w-[720px] lg:w-[920px] bg-[#0F172A] flex flex-col md:flex-row overflow-hidden md:rounded-[20px] rounded-t-[20px] rounded-b-none border border-[#1E293B] shadow-2xl"
            style={{
              backgroundImage: 'radial-gradient(circle at 0% 0%, #111827, transparent 80%)',
              boxShadow: '0 0 60px rgba(0, 212, 170, 0.15), 0 0 120px rgba(0, 102, 255, 0.1), 0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
          >
            {/* Close Button CAUTION: ensure good accessible contrast */}
            <button
              ref={closeBtnRef}
              onClick={() => onClose('x_button')}
              aria-label="Cerrar invitación"
              className="absolute top-4 right-4 md:top-3 md:right-3 z-50 w-[32px] h-[32px] bg-[#1E293B] hover:bg-[#334155] rounded-full flex items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#00D4AA]"
            >
              <X size={14} className="text-[#94A3B8] hover:text-white transition-colors" />
            </button>

            {/* Mobile View: Video Thumbnail on top (hidden on desktop) */}
            <div className="md:hidden w-full aspect-video relative flex-shrink-0 bg-[#0A0F1C] border-b border-[#1E293B]/50"
                 style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(0, 102, 255, 0.25), transparent 60%), radial-gradient(circle at 70% 60%, rgba(0, 212, 170, 0.2), transparent 50%)' }}>
              {/* Noise layer overlay */}
              <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 cursor-pointer group" onClick={onCTAClick}>
                <div className="absolute top-3 right-3 bg-[#00D4AA]/10 border border-[#00D4AA]/30 text-[#00D4AA] text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-[4px]">
                  SCALA MÉTODO
                </div>
                
                {/* Play Button */}
                <div className="relative w-[60px] h-[60px] flex items-center justify-center rounded-full bg-white/95 group-hover:scale-105 transition-transform">
                  <Play size={24} fill="#0A0F1C" color="#0A0F1C" className="ml-1" />
                  
                  {/* Pulse Rings */}
                  <motion.div animate={{ scale: [1, 1.6], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} className="absolute inset-0 rounded-full border border-[#00D4AA]" />
                  <motion.div animate={{ scale: [1, 1.6], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }} className="absolute inset-0 rounded-full border border-[#00D4AA]" />
                </div>
                
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium border border-white/10">
                  <Clock size={11} /> 4:00 min
                </div>
              </div>
            </div>

            {/* Left Column Text Content */}
            <div className="w-full md:w-[60%] lg:w-[55%] p-6 md:p-9 lg:p-12 flex flex-col justify-center">
              
              <motion.div variants={childVariants} className="mb-3 md:mb-4">
                <span className="inline-flex items-center text-[#00D4AA] text-[11px] uppercase tracking-[0.1em] font-bold py-1 px-2.5 border border-[#00D4AA]/20 rounded-full bg-[#00D4AA]/5">
                  {MODAL_COPY.eyebrow}
                </span>
              </motion.div>

              <motion.h2 
                id="vsl-modal-title"
                variants={childVariants} 
                className="text-[24px] md:text-[26px] lg:text-[30px] font-bold text-white leading-[1.15] mb-6 tracking-tight"
              >
                {MODAL_COPY.title}
              </motion.h2>

              <div className="flex flex-col gap-3 mb-8 md:mb-10 mt-2 md:mt-2">
                {MODAL_COPY.bullets.map((bullet, i) => (
                  <motion.div key={i} variants={childVariants} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#00D4AA] shrink-0 mt-[2px]" size={16} />
                    <span className="text-white text-[13px] md:text-[14px] leading-snug">{bullet}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={childVariants} className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mb-6 md:mb-8">
                {/* Primary CTA */}
                <button 
                  onClick={onCTAClick}
                  className="group relative w-full md:w-auto flex items-center justify-center gap-2 text-[#0A0F1C] font-bold text-[14px] md:text-[15px] px-5 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #00D4AA, #0066FF)' }}
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ boxShadow: '0 0 24px rgba(0, 212, 170, 0.4)' }} />
                  
                  <Play size={14} fill="#0A0F1C" />
                  <span className="relative z-10">{MODAL_COPY.ctaPrimary}</span>
                </button>

                {/* Secondary CTA */}
                <button 
                  onClick={onSecondaryClick}
                  className="group w-full md:w-auto flex items-center justify-center gap-2 text-[#94A3B8] hover:text-white font-medium text-[14px] px-4 py-3.5 transition-colors focus-visible:outline-none focus-visible:underline underline-offset-4 whitespace-nowrap"
                >
                  {MODAL_COPY.ctaSecondary} 
                  <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              </motion.div>

              <motion.div variants={childVariants} className="flex items-center gap-2 text-[#64748B] text-[11px] md:text-[12px] leading-tight">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] shrink-0" 
                />
                <p>{MODAL_COPY.trust}</p>
              </motion.div>

            </div>

            {/* Right Column / Desktop Thumbnail */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
              className="hidden md:flex w-[40%] lg:w-[45%] flex-col relative bg-[#0A0F1C] border-l border-[#1E293B]/50"
            >
              {/* Complex gradient background matching the spec */}
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(0, 102, 255, 0.25), transparent 60%), radial-gradient(circle at 70% 60%, rgba(0, 212, 170, 0.2), transparent 50%)' }} />
              <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

              <div className="relative flex-grow flex items-center justify-center p-8 z-10 cursor-pointer group" onClick={onCTAClick}>
                
                <div className="absolute top-6 right-6 bg-[#00D4AA]/10 border border-[#00D4AA]/30 text-[#00D4AA] text-[10px] md:text-[11px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-[4px]">
                  SCALA MÉTODO
                </div>

                {/* Big Play Button Desktop */}
                <div className="relative w-[72px] h-[72px] flex items-center justify-center rounded-full bg-white/95 group-hover:scale-105 transition-transform duration-300">
                  <Play size={28} fill="#0A0F1C" color="#0A0F1C" className="ml-1.5" />
                  
                  {/* Pulse Rings */}
                  <motion.div animate={{ scale: [1, 1.8], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} className="absolute inset-0 rounded-full border border-[#00D4AA]" />
                  <motion.div animate={{ scale: [1, 1.8], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }} className="absolute inset-0 rounded-full border border-[#00D4AA]" />
                </div>

                <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm text-white flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium border border-white/10">
                  <Clock size={12} /> 4:00 min
                </div>

              </div>

              {/* Bottom Label under the visual area inside the column */}
              <div className="relative z-10 h-[50px] flex items-center justify-center border-t border-[#1E293B]/50 bg-[#0F172A]/80 backdrop-blur-md">
                <span className="text-[#64748B] text-[11px] uppercase tracking-widest font-medium">PRESENTACIÓN · SCALA MÉTODO</span>
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VSLInviteModal;
