import React from 'react';
import { Outlet } from 'react-router-dom';
import { WebNavbar } from './WebNavbar';
import { WebFooter } from './WebFooter';
import { useAnimations } from '../../hooks/useAnimations';

export const WebLayout = () => {
  // Inicializamos las animaciones de scroll para toda la rama /web
  useAnimations();

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

      {/* Navbar global corporativo */}
      <WebNavbar />

      {/* Contenido Inyectado por React Router (Home, Soluciones, Casos...) */}
      <main className="flex-grow flex flex-col pt-[80px]">
        <Outlet />
      </main>

      {/* Footer corporativo pesado */}
      <WebFooter />

    </div>
  );
};
