import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';

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
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="relative group py-6">
            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-white hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              NOSOTROS
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            <div className="absolute top-[80%] left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <div className="bg-[#050505] border border-white/[0.08] rounded-[16px] w-[220px] p-2 flex flex-col shadow-2xl backdrop-blur-xl">
                <Link to="/web/nosotros" className="text-[12px] font-bold tracking-widest uppercase text-white hover:bg-white/5 hover:text-[#6bdda1] px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
                  Quiénes somos
                </Link>
                <Link to="/web/filosofia" className="text-[12px] font-bold tracking-widest uppercase text-white hover:bg-white/5 hover:text-[#6bdda1] px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
                  Nuestra filosofía
                </Link>
              </div>
            </div>
          </div>
          <Link to="/web#como-trabajamos" className="text-[11px] font-bold tracking-[0.08em] uppercase text-white hover:text-white transition-colors relative">
            ¿CÓMO FUNCIONA?
          </Link>
          <Link to="/web#casos" className="text-[11px] font-bold tracking-[0.08em] uppercase text-white hover:text-white transition-colors">
            RESULTADOS
          </Link>
          <a href="https://scalaops.com/formulario" className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#6bdda1] hover:text-[#6bdda1]/80 transition-colors">
            CONTÁCTANOS
          </a>
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
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold tracking-widest uppercase text-white/50">NOSOTROS</span>
            <Link to="/web/nosotros" className="text-[18px] font-bold tracking-widest uppercase text-white pl-4 border-l-2 border-[#185de8]/30 hover:border-[#185de8] transition-colors">Quiénes somos</Link>
            <Link to="/web/filosofia" className="text-[18px] font-bold tracking-widest uppercase text-white pl-4 border-l-2 border-[#185de8]/30 hover:border-[#185de8] transition-colors">Nuestra filosofía</Link>
          </div>
          <Link to="/web#como-trabajamos" className="text-xl font-bold tracking-widest uppercase text-white mt-4">¿CÓMO FUNCIONA?</Link>
          <Link to="/web#casos" className="text-xl font-bold tracking-widest uppercase text-white">RESULTADOS</Link>
          <a href="https://scalaops.com/formulario" className="text-xl font-bold tracking-widest uppercase text-[#6bdda1]">CONTÁCTANOS</a>
        </div>
      </div>
    </nav>
  );
};
