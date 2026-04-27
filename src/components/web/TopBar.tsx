import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Top Bar de acceso permanente al VSL / Método Scala.
 * Se muestra fija arriba del navbar en toda la web institucional.
 */
export const TopBar = () => {
  const handleClick = () => {
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'topbar_vsl_clicked', location: 'topbar' });
    }
  };

  return (
    <div 
      className="w-full relative z-[101] overflow-hidden bg-[#020202]"
      style={{ 
        borderBottom: '1px solid rgba(24,93,232,0.15)'
      }}
    >
      {/* Premium glow sutil de fondo */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]" style={{ background: 'radial-gradient(ellipse at center, rgba(107,221,161,0.5) 0%, transparent 60%)' }}></div>
      
      <Link 
        to="/por-que-scala" 
        onClick={handleClick}
        className="relative z-10 flex items-center justify-center gap-3 py-2 px-4 text-[11px] md:text-[12px] font-bold tracking-[0.08em] uppercase transition-all duration-300 text-white/70 hover:text-white group"
      >
        <span className="opacity-80 group-hover:opacity-100 transition-opacity">¿Cómo multiplicar tus ventas?</span>
        <div className="flex items-center gap-1.5 px-3 py-[3px] rounded-full bg-[#185de8]/10 border border-[#185de8]/30 group-hover:bg-[#185de8]/20 group-hover:border-[#185de8]/50 transition-all">
          <span className="text-[#6bdda1]">VER MÉTODO</span>
          <Play size={10} className="text-[#6bdda1] group-hover:scale-110 transition-transform" fill="currentColor" />
        </div>
      </Link>
    </div>
  );
};
