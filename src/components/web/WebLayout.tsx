import React from 'react';
import { Outlet } from 'react-router-dom';
import { WebNavbar } from './WebNavbar';
import { WebFooter } from './WebFooter';
import { useAnimations } from '../../hooks/useAnimations';

export const WebLayout = () => {
  // Inicializamos las animaciones de scroll para toda la rama /web
  useAnimations();

  return (
    <div className="min-h-screen bg-scala-bg selection:bg-scala-green selection:text-[#030712] relative overflow-x-hidden font-sans">
      <div className="scroll-bar"></div>
      
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
