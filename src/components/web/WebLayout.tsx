import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { WebNavbar } from './WebNavbar';
import { WebFooter } from './WebFooter';
import { useAnimations } from '../../hooks/useAnimations';
import { useVSLModal } from '../../hooks/useVSLModal';
import { VSLInviteModal } from './VSLInviteModal';

export const WebLayout = () => {
  // Inicializamos las animaciones de scroll para toda la rama /web
  useAnimations();
  const { hash, pathname } = useLocation();
  const { isOpen, close, onCTAClick, onSecondaryClick } = useVSLModal();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Pequeño delay para asegurar que el DOM esté listo
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);

  return (
    <div className="min-h-screen bg-[#000000] selection:bg-[#6bdda1] selection:text-[#030712] relative overflow-x-hidden font-sans">
      
      {/* Global Noise Layer para dar la textura tipo film grain (Premium) */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999] mix-blend-overlay" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          opacity: 0.03
        }} 
      />

      <WebNavbar />

      {/* Contenido Inyectado por React Router (Home, Soluciones, Casos...) */}
      <main className="flex-grow flex flex-col pt-[80px]">
        <Outlet />
      </main>

      {/* Footer corporativo pesado */}
      <WebFooter />

      {/* Modal de Tráfico Frío Global */}
      <VSLInviteModal 
        isOpen={isOpen} 
        onClose={close} 
        onCTAClick={onCTAClick} 
        onSecondaryClick={onSecondaryClick} 
      />
    </div>
  );
};
