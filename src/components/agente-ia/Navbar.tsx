import { useState, useEffect } from 'react';
import { Logo } from '../ui/Logo';
import { Link } from 'react-router-dom';
import { SentinelLogo } from './SentinelLogo';
import { useCountdown } from '../../hooks/useCountdown';

const CTA_URL = '/formulario';
const pad = (n: number) => String(n).padStart(2, '0');

/** Compact Digit for Navbar integration */
const Digit = ({ value, label, isLast24h }: { value: string; label: string; isLast24h: boolean }) => (
  <span style={{
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1px',
  }}>
    <span style={{
      fontFamily: 'Saira, sans-serif',
      fontWeight: 800,
      fontSize: '11px',
      lineHeight: 1,
      color: isLast24h ? '#FF5C5C' : '#FFFFFF',
      background: '#111',
      border: `1px solid ${isLast24h ? 'rgba(255,92,92,0.25)' : 'rgba(107,221,161,0.25)'}`,
      borderRadius: '3px',
      padding: '2px 4px',
      minWidth: '22px',
      textAlign: 'center',
      letterSpacing: '0.02em',
      transition: 'color 0.3s ease, border-color 0.3s ease',
    }}>
      {value}
    </span>
    <span style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: '7px',
      fontWeight: 600,
      color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    }}>
      {label}
    </span>
  </span>
);

const Separator = () => (
  <span style={{
    fontFamily: 'Saira, sans-serif',
    fontWeight: 800,
    fontSize: '11px',
    color: 'rgba(255,255,255,0.3)',
    margin: '0 1px',
    alignSelf: 'flex-start',
    paddingTop: '2px',
  }}>:</span>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { days, hours, minutes, seconds, isLast24h } = useCountdown();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed left-0 right-0 z-50 transition-all duration-300 top-0 ${
        scrolled ? 'bg-[#030504]/90 backdrop-blur-md border-b border-white/[0.04]' : 'bg-transparent'
      }`}
    >
      {/* Thin premium green line at the top */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, rgba(36,107,254,0.8) 0%, rgba(104,230,163,0.8) 100%)' }} />
      
      <div 
        className={`container-custom flex flex-col lg:flex-row items-center justify-between transition-all duration-300 py-3 lg:py-0 ${
          scrolled ? 'min-h-[56px]' : 'min-h-[64px]'
        } gap-4 lg:gap-0`}
      >
        
        {/* Left: Logo (and Mobile CTA) */}
        <div className="w-full lg:w-auto flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
            <Logo />
            <div className="h-[20px] w-px bg-white/20 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <SentinelLogo className="w-5 h-5 hidden md:block" />
              <span className="text-white font-bold tracking-widest text-[14px] hidden md:block" style={{ fontFamily: 'Saira, sans-serif' }}>SENTINEL</span>
            </div>
          </Link>

          {/* Mobile CTA */}
          <div className="flex lg:hidden items-center">
            <Link to={CTA_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '36px',
                  padding: '0 14px',
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#050706',
                  boxShadow: '0 2px 10px rgba(0, 212, 170, 0.15)',
                }}
              >
                <span className="flex items-center gap-2"><SentinelLogo className="w-4 h-4" variant="white" /> Implementar</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Center: Urgency Notification */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center gap-1 sm:gap-4 lg:gap-1 xl:gap-4 order-3 lg:order-none w-full lg:w-auto">
          {/* Line 1 */}
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#FFFFFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🚀</span>
            <span className="whitespace-nowrap">
              Implementación <span style={{ fontWeight: 800, color: '#6bdda1' }}>GRATIS</span>{' '}
              <span style={{ fontWeight: 400, color: '#888888', fontSize: '80%', textDecoration: 'line-through' }} className="hidden sm:inline">(antes USD 997)</span>
            </span>
          </div>
          {/* Line 2 */}
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#AAAAAA', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="hidden sm:inline">Solo por lanzamiento · Termina en</span>
            <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '2px' }}>
              {days > 0 && (
                <>
                  <Digit value={pad(days)} label="d" isLast24h={isLast24h} />
                  <Separator />
                </>
              )}
              <Digit value={pad(hours)} label="h" isLast24h={isLast24h} />
              <Separator />
              <Digit value={pad(minutes)} label="m" isLast24h={isLast24h} />
              <Separator />
              <Digit value={pad(seconds)} label="s" isLast24h={isLast24h} />
            </span>
          </div>
        </div>

        {/* Right: Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Link to={CTA_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '42px',
                padding: '0 18px',
                borderRadius: '999px',
                background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                color: '#050706',
                boxShadow: '0 2px 10px rgba(0, 212, 170, 0.15)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span className="flex items-center gap-2"><SentinelLogo className="w-4 h-4" variant="white" /> Implementar Sentinel</span>
            </div>
          </Link>
        </div>

      </div>
    </nav>
  );
};
