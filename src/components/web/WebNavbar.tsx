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

  const navLinks = [
    { name: 'Inicio', path: '/web' },
    { name: 'Soluciones', path: '/web/soluciones' },
    { name: 'Casos', path: '/web/casos' },
    { name: 'Nosotros', path: '/web/nosotros' },
    { name: 'Blog', path: '/web/blog' },
    { name: 'Contacto', path: '/web/contacto' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-white/5 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">

        {/* Logo */}
        <Link to="/web" className="flex items-center gap-2 z-50 group">
          <div className="w-7 h-7 rounded bg-gradient-to-br from-[#22C55E] to-[#166534] flex items-center justify-center shadow-[0_0_12px_rgba(34,197,94,0.25)] group-hover:shadow-[0_0_18px_rgba(34,197,94,0.45)] transition-all">
            <span className="text-white font-bold text-sm tracking-tighter">S</span>
          </div>
          <span className="text-lg font-bold text-white tracking-widest uppercase">Scala</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[12px] font-semibold tracking-wide uppercase transition-colors ${
                pathname === link.path ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <a
            href="https://calendar.app.google/your-link-here"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '12px', padding: '8px 18px' }}
          >
            Agendar Llamada
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
      <div className={`fixed inset-0 bg-[#030712] z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col pt-24 px-6 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className={`text-2xl font-semibold tracking-tight ${pathname === link.path ? 'text-white' : 'text-white/50'}`}>
              {link.name}
            </Link>
          ))}
        </div>
        <div className="mt-auto mb-10 flex flex-col gap-3">
          <a href="https://wa.me/xxx" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full justify-center">WhatsApp</a>
          <a href="https://calendar.app.google/your-link-here" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">Agendar Llamada</a>
        </div>
      </div>
    </nav>
  );
};
