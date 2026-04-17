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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#000000]/90 backdrop-blur-xl border-b border-white/[0.04] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex items-center justify-between">

        {/* Logo - EXACT MATCH TO SCREENSHOT */}
        <Link to="/web" className="flex items-center gap-3 z-50 group hover:opacity-80 transition-opacity">
          {/* Logo Isotype (Escalera left-aligned, pure white) */}
          <div className="flex flex-col items-start gap-[4px] justify-center mt-1">
            <div className="h-[3px] w-[14px] bg-white rounded-sm" />
            <div className="h-[3px] w-[22px] bg-white rounded-sm" />
            <div className="h-[3px] w-[30px] bg-white rounded-sm" />
          </div>
          {/* Logo Logotype (Wide tracking, sans-serif flat) */}
          <span className="text-[22px] text-white tracking-[0.15em] font-bold" style={{ fontFamily: 'var(--font-primary)", "Space Grotesk", sans-serif' }}>
            SCALA
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/web/nosotros" className="text-[11px] font-bold tracking-[0.08em] uppercase text-white hover:text-white transition-colors">
            NOSOTROS
          </Link>
          <Link to="/web/como-funciona" className="text-[11px] font-bold tracking-[0.08em] uppercase text-white hover:text-white transition-colors relative">
            ¿CÓMO FUNCIONA?
          </Link>
          <Link to="/web/casos" className="text-[11px] font-bold tracking-[0.08em] uppercase text-white hover:text-white transition-colors">
            RESULTADOS
          </Link>
          <Link to="/web/contacto" className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#00FF94] hover:text-[#00FF94]/80 transition-colors">
            CONTÁCTANOS
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden z-50 text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-[1.5px] w-full bg-white transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block h-[1.5px] w-full bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[1.5px] w-full bg-white transition-transform duration-300 ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </div>
        </button>

      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#000000] z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col pt-24 px-6 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-6">
          <Link to="/web/nosotros" className="text-xl font-bold tracking-widest uppercase text-white">NOSOTROS</Link>
          <Link to="/web/como-funciona" className="text-xl font-bold tracking-widest uppercase text-white">¿CÓMO FUNCIONA?</Link>
          <Link to="/web/casos" className="text-xl font-bold tracking-widest uppercase text-white">RESULTADOS</Link>
          <Link to="/web/contacto" className="text-xl font-bold tracking-widest uppercase text-[#00FF94]">CONTÁCTANOS</Link>
        </div>
      </div>
    </nav>
  );
};
