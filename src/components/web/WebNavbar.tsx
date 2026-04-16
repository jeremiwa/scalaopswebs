import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const WebNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú mobile al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Inicio', path: '/web' },
    { name: 'Soluciones', path: '/web/soluciones' },
    { name: 'Cómo trabajamos', path: '/web/como-trabajamos' },
    { name: 'Casos', path: '/web/casos' },
    { name: 'Nosotros', path: '/web/nosotros' },
    { name: 'Blog', path: '/web/blog' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#030712]/80 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/web" className="flex items-center gap-2 z-50 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#22C55E] to-[#166534] flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all">
            <span className="text-white font-bold text-lg tracking-tighter mix-blend-overlay">S</span>
          </div>
          <span className="text-xl font-bold text-white tracking-widest uppercase">
            Scala
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[13px] font-medium tracking-wide uppercase transition-colors ${
                  pathname === link.path 
                    ? 'text-white' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/web/contacto"
            className="text-[13px] font-medium tracking-wide uppercase text-white/80 hover:text-white transition-colors"
          >
            Contacto
          </Link>
          <a
            href="https://calendar.app.google/your-link-here"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '13px', padding: '10px 20px' }}
          >
            Agendar Llamada
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className="md:hidden z-50 text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-[2px] w-full bg-white transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-[9px] rotate-45' : ''}`} />
            <span className={`block h-[2px] w-full bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] w-full bg-white transition-transform duration-300 ${mobileMenuOpen ? '-translate-y-[9px] -rotate-45' : ''}`} />
          </div>
        </button>

      </div>

      {/* MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 bg-[#030712] z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col pt-24 px-6 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-2xl font-semibold tracking-tight transition-colors ${
                pathname === link.path ? 'text-white' : 'text-white/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/web/contacto"
            className={`text-2xl font-semibold tracking-tight transition-colors ${
              pathname === '/web/contacto' ? 'text-white' : 'text-white/60'
            }`}
          >
            Contacto
          </Link>
        </div>
        
        <div className="mt-auto mb-10 flex flex-col gap-4">
          <a
            href="https://wa.me/xxx"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full justify-center"
          >
            WhatsApp
          </a>
          <a
            href="https://calendar.app.google/your-link-here"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full justify-center"
          >
            Agendar Llamada
          </a>
        </div>
      </div>

    </nav>
  );
};
