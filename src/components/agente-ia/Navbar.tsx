import React, { useState, useEffect } from 'react';
import { Logo } from '../ui/Logo';
import { Link } from 'react-router-dom';
import { SentinelLogo } from './SentinelLogo';
import { useCountdown } from '../../hooks/useCountdown';
import { X } from 'lucide-react';

const CTA_URL = '/formulario';
const pad = (n: number) => String(n).padStart(2, '0');
const DISMISS_KEY = 'sentinel_mobile_urgency_dismissed';

/* ─── Desktop Digit (small, for navbar center) ─── */
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
      textAlign: 'center' as const,
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
      textTransform: 'uppercase' as const,
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

/* ─── Mobile Digit (larger boxes per spec: 32×36px) ─── */
const MobileDigit = ({ value, label, isLast24h }: { value: string; label: string; isLast24h: boolean }) => (
  <span style={{
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  }}>
    <span style={{
      fontFamily: 'Saira, sans-serif',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: 1,
      color: isLast24h ? '#FF5C5C' : '#FFFFFF',
      background: '#111111',
      border: '1px solid #222222',
      borderRadius: '6px',
      width: '32px',
      height: '36px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center' as const,
      letterSpacing: '0.02em',
      transition: 'color 0.3s ease',
    }}>
      {value}
    </span>
    <span style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: '9px',
      fontWeight: 600,
      color: '#AAAAAA',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.04em',
    }}>
      {label}
    </span>
  </span>
);

const MobileSeparator = () => (
  <span style={{
    fontFamily: 'Saira, sans-serif',
    fontWeight: 700,
    fontSize: '16px',
    color: '#6bdda1',
    margin: '0 3px',
    alignSelf: 'flex-start',
    paddingTop: '8px',
  }}>:</span>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileDismissed, setMobileDismissed] = useState(false);
  const { days, hours, minutes, seconds, isLast24h } = useCountdown();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check if mobile urgency was dismissed this session
    if (sessionStorage.getItem(DISMISS_KEY) === 'true') {
      setMobileDismissed(true);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, 'true');
  };

  return (
    <nav 
      className={`fixed left-0 right-0 z-50 transition-all duration-300 top-0 ${
        scrolled ? 'bg-[#030504]/90 backdrop-blur-md border-b border-white/[0.04]' : 'bg-transparent'
      }`}
    >
      {/* Thin premium green line at the top */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, rgba(36,107,254,0.8) 0%, rgba(104,230,163,0.8) 100%)' }} />

      {/* ═══════════════════════════════════════════════
          MOBILE LAYOUT (< md): Urgency strip + logo row
          ═══════════════════════════════════════════════ */}
      <div className="md:hidden">
        {/* ── Mobile urgency strip (clickable, dismissible) ── */}
        {!mobileDismissed && (
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '10px 16px 12px 16px',
              background: 'linear-gradient(180deg, #000000 0%, #0A0A0A 100%)',
              borderBottom: '1px solid #6bdda1',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            {/* Line 1: 🚀 Implementación GRATIS */}
            <div style={{
              fontFamily: 'Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}>
              <span style={{ fontSize: '15px' }}>🚀</span>
              <span style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '15px' }}>Implementación</span>
              <span style={{ fontWeight: 800, color: '#6bdda1', fontSize: '17px' }}>GRATIS</span>
            </div>

            {/* Line 2: Oferta lanzamiento */}
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 400,
              color: '#888888',
              marginTop: '2px',
              textAlign: 'center' as const,
            }}>
              Oferta lanzamiento · antes USD 997
            </div>

            {/* Line 3: Countdown boxes */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginTop: '6px',
            }}>
              {days > 0 && (
                <>
                  <MobileDigit value={pad(days)} label="D" isLast24h={isLast24h} />
                  <MobileSeparator />
                </>
              )}
              <MobileDigit value={pad(hours)} label="H" isLast24h={isLast24h} />
              <MobileSeparator />
              <MobileDigit value={pad(minutes)} label="M" isLast24h={isLast24h} />
              <MobileSeparator />
              <MobileDigit value={pad(seconds)} label="S" isLast24h={isLast24h} />
            </div>

            {/* X close button */}
            <button
              onClick={handleMobileDismiss}
              aria-label="Cerrar"
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: '#666666',
              }}
            >
              <X size={18} />
            </button>
          </a>
        )}

        {/* ── Mobile logo + CTA row ── */}
        <div 
          className={`container-custom flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-[50px]' : 'h-[56px]'
          }`}
        >
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
            <Logo />
          </Link>
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

      {/* ═══════════════════════════════════════════════
          DESKTOP LAYOUT (>= md): Single row navbar
          ═══════════════════════════════════════════════ */}
      <div 
        className={`hidden md:flex container-custom items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-[56px]' : 'h-[64px]'
        }`}
      >
        {/* Left: Logo */}
        <Link to="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
          <Logo />
          <div className="h-[20px] w-px bg-white/20"></div>
          <div className="flex items-center gap-2">
            <SentinelLogo className="w-5 h-5" />
            <span className="text-white font-bold tracking-widest text-[14px]" style={{ fontFamily: 'Saira, sans-serif' }}>SENTINEL</span>
          </div>
        </Link>

        {/* Center: Desktop urgency */}
        <div className="flex flex-row lg:flex-col xl:flex-row items-center justify-center gap-4 lg:gap-1 xl:gap-4">
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#FFFFFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🚀</span>
            <span className="whitespace-nowrap">
              Implementación <span style={{ fontWeight: 800, color: '#6bdda1' }}>GRATIS</span>{' '}
              <span style={{ fontWeight: 400, color: '#888888', fontSize: '80%', textDecoration: 'line-through' }}>(antes USD 997)</span>
            </span>
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#AAAAAA', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Solo por lanzamiento · Termina en</span>
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
    </nav>
  );
};
