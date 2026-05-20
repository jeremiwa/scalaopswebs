import { useState, useEffect } from 'react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#030504]/90 backdrop-blur-md border-b border-white/[0.04]' : 'bg-transparent'
      }`}
    >
      {/* Thin premium green line at the top */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, rgba(36,107,254,0.8) 0%, rgba(104,230,163,0.8) 100%)' }} />
      
      <div 
        className={`container-custom flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-[56px]' : 'h-[72px]'
        }`}
      >
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
        <div className="flex items-center">
          <Link to={CTA_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '46px',
                padding: '0 22px',
                borderRadius: '999px',
                background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: 700,
                color: '#050706',
                boxShadow: '0 2px 10px rgba(0, 212, 170, 0.15)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Implementar Sentinel
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
