import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';

const STORAGE_KEY = 'sentinel_urgency_bar_dismissed';

const pad = (n: number) => String(n).padStart(2, '0');

/** Inline countdown digit box — consistent with Hero stat boxes */
const Digit = ({ value, label, isLast24h }: { value: string; label: string; isLast24h: boolean }) => (
  <span style={{
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  }}>
    <span style={{
      fontFamily: 'Saira, sans-serif',
      fontWeight: 800,
      fontSize: '14px',
      lineHeight: 1,
      color: isLast24h ? '#FF5C5C' : '#FFFFFF',
      background: '#111',
      border: `1px solid ${isLast24h ? 'rgba(255,92,92,0.25)' : 'rgba(107,221,161,0.25)'}`,
      borderRadius: '4px',
      padding: '3px 5px',
      minWidth: '28px',
      textAlign: 'center',
      letterSpacing: '0.02em',
      transition: 'color 0.3s ease, border-color 0.3s ease',
    }}>
      {value}
    </span>
    <span style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: '8px',
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
    fontSize: '14px',
    color: 'rgba(255,255,255,0.3)',
    margin: '0 2px',
    alignSelf: 'flex-start',
    paddingTop: '3px',
  }}>:</span>
);

export const UrgencyBar = () => {
  const { days, hours, minutes, seconds, isLast24h } = useCountdown();
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'true') setDismissed(true);
    setMounted(true);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, 'true');
    // Dispatch custom event so Navbar/Hero can adjust
    window.dispatchEvent(new CustomEvent('urgencybar-dismiss'));
  };

  if (dismissed || !mounted) return null;

  return (
    <>
      <style>{`
        .urgency-bar-responsive { height: 56px; }
        @media (min-width: 768px) { .urgency-bar-responsive { height: 76px; } }
      `}</style>
      <a
        href="#pricing"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }}
        id="urgency-bar"
        className="urgency-bar-responsive"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050505',
          borderBottom: '1px solid rgba(107,221,161,0.25)',
          cursor: 'pointer',
          textDecoration: 'none',
          paddingLeft: '16px',
          paddingRight: '48px', // space for X
        }}
      >
        {/* Desktop text (2 lines) */}
        <div
          className="hidden md:flex flex-col items-center justify-center w-full h-full"
          style={{ gap: '4px' }}
        >
        {/* Línea 1 */}
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#FFFFFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>🚀</span>
          <span>
            Implementación <span style={{ fontWeight: 800, color: '#6bdda1' }}>GRATIS</span>{' '}
            <span style={{ fontWeight: 400, color: '#888888', fontSize: '80%', textDecoration: 'line-through' }}>(antes USD 997)</span>
          </span>
        </div>
        {/* Línea 2 */}
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10.5px', color: '#AAAAAA', fontWeight: 400, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Solo por lanzamiento · Termina en</span>
          <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '3px' }}>
            <Digit value={pad(days)} label="días" isLast24h={isLast24h} />
            <Separator />
            <Digit value={pad(hours)} label="hs" isLast24h={isLast24h} />
            <Separator />
            <Digit value={pad(minutes)} label="min" isLast24h={isLast24h} />
            <Separator />
            <Digit value={pad(seconds)} label="seg" isLast24h={isLast24h} />
          </span>
        </div>
      </div>

      {/* Mobile text (1 line) */}
      <div
        className="flex md:hidden w-full h-full items-center justify-center flex-wrap"
        style={{ gap: '6px' }}
      >
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#FFFFFF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>🚀</span>
          <span className="whitespace-nowrap">
            Implementación <span style={{ fontWeight: 800, color: '#6bdda1' }}>GRATIS</span>
          </span>
          <span style={{ fontWeight: 400, color: '#888888', textDecoration: 'line-through' }}>USD 997</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>·</span>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2px' }}>
          {/* Hide days on very small screens, show HH:MM:SS */}
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
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={handleDismiss}
        aria-label="Cerrar barra de urgencia"
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          cursor: 'pointer',
          padding: 0,
          color: 'rgba(255,255,255,0.4)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
        }}
      >
        <X size={14} />
      </button>
    </a>
    </>
  );
};
