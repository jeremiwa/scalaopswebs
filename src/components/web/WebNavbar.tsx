import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { TopBar } from './TopBar';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';

const VSL_NAV_ITEM = {
  label: 'VER MÉTODO',
  href: '/por-que-scala',
  icon: 'play',
  highlight: true,
  trackingEvent: 'nav_cta_vsl_clicked',
};

export const WebNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    if (pathname !== '/') {
      navigate('/');
      setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 flex flex-col">
      <TopBar />
      <nav
        className={`w-full transition-all duration-300 py-4 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#000000]/90 backdrop-blur-xl border-b border-white/[0.04]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between">

          {/* Logo - EXACT MATCH TO SCREENSHOT */}
          <Link to="/" className="flex items-center gap-3 z-50 group hover:opacity-80 transition-opacity">
            <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="relative group py-6">
            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-white hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              SERVICIOS
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            <div className="absolute top-[80%] left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <div className="bg-[#050505] border border-white/[0.08] rounded-[16px] w-[220px] p-2 flex flex-col shadow-2xl backdrop-blur-xl">
                <Link to="/auditoria" className="text-[12px] font-bold tracking-widest uppercase text-white hover:bg-white/5 hover:text-[#6bdda1] px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
                  Auditoría
                </Link>
                <Link to="/implementacion" className="text-[12px] font-bold tracking-widest uppercase text-white hover:bg-white/5 hover:text-[#185de8] px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
                  Implementación
                </Link>
                <Link to="/empleado-ia" className="text-[12px] font-bold tracking-widest uppercase text-white hover:bg-white/5 hover:text-[#6bdda1] px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
                  Empleado IA
                </Link>
              </div>
            </div>
          </div>

          <div className="relative group py-6">
            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-white hover:text-white transition-colors cursor-pointer flex items-center gap-1">
              NOSOTROS
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
            <div className="absolute top-[80%] left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <div className="bg-[#050505] border border-white/[0.08] rounded-[16px] w-[220px] p-2 flex flex-col shadow-2xl backdrop-blur-xl">
                <Link to="/nosotros" className="text-[12px] font-bold tracking-widest uppercase text-white hover:bg-white/5 hover:text-[#6bdda1] px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
                  Quiénes somos
                </Link>
                <Link to="/filosofia" className="text-[12px] font-bold tracking-widest uppercase text-white hover:bg-white/5 hover:text-[#6bdda1] px-4 py-3 rounded-lg transition-colors flex items-center gap-2">
                  Nuestra filosofía
                </Link>
              </div>
            </div>
          </div>
          <button onClick={() => scrollToSection('como-trabajamos')} className="text-[11px] font-bold tracking-[0.08em] uppercase text-white hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none">
            ¿CÓMO FUNCIONA?
          </button>
          <button onClick={() => scrollToSection('casos')} className="text-[11px] font-bold tracking-[0.08em] uppercase text-white hover:text-white transition-colors cursor-pointer bg-transparent border-none outline-none">
            RESULTADOS
          </button>
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
      <div className={`fixed left-0 top-0 w-full h-screen bg-[#050505] z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col pt-28 px-6 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold tracking-widest uppercase text-white/50">SERVICIOS</span>
            <Link to="/auditoria" className="text-[18px] font-bold tracking-widest uppercase text-white pl-4 border-l-2 border-[#185de8]/30 hover:border-[#185de8] transition-colors">Auditoría</Link>
            <Link to="/implementacion" className="text-[18px] font-bold tracking-widest uppercase text-white pl-4 border-l-2 border-[#185de8]/30 hover:border-[#185de8] transition-colors">Implementación</Link>
            <Link to="/empleado-ia" className="text-[18px] font-bold tracking-widest uppercase text-white pl-4 border-l-2 border-[#6bdda1]/30 hover:border-[#6bdda1] transition-colors">Empleado IA</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold tracking-widest uppercase text-white/50">NOSOTROS</span>
            <Link to="/nosotros" className="text-[18px] font-bold tracking-widest uppercase text-white pl-4 border-l-2 border-[#185de8]/30 hover:border-[#185de8] transition-colors">Quiénes somos</Link>
            <Link to="/filosofia" className="text-[18px] font-bold tracking-widest uppercase text-white pl-4 border-l-2 border-[#185de8]/30 hover:border-[#185de8] transition-colors">Nuestra filosofía</Link>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToSection('como-trabajamos');
            }}
            className="text-left mt-4 text-xl font-bold tracking-widest uppercase text-white pl-[12px] border-l-2 border-[#6bdda1]/30 hover:border-[#6bdda1] transition-colors bg-transparent border-none outline-none"
          >
            ¿Cómo funciona?
          </button>
          <button onClick={() => scrollToSection('casos')} className="text-xl font-bold tracking-widest uppercase text-white text-left bg-transparent border-none outline-none cursor-pointer">RESULTADOS</button>
          <a href="https://scalaops.com/formulario" className="text-xl font-bold tracking-widest uppercase text-[#6bdda1]">CONTÁCTANOS</a>
        </div>
      </div>
    </nav>
  </header>
  );
};
