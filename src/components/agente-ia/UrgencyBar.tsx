import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';

const STORAGE_KEY = 'sentinel_urgency_bar_dismissed';

const pad = (n: number) => String(n).padStart(2, '0');

/** Inline countdown digit box — consistent with Hero stat boxes */
const Digit = ({ value, label }: { value: string; label: string }) => (
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
      color: '#FFFFFF',
      background: '#111',
      border: '1px solid rgba(107,221,161,0.25)',
      borderRadius: '4px',
      padding: '3px 5px',
      minWidth: '28px',
      textAlign: 'center',
      letterSpacing: '0.02em',
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
  const { days, hours, minutes, seconds } = useCountdown();
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
    <a
      href="#pricing"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      }}
      id="urgency-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        background: '#050505',
        borderBottom: '1px solid rgba(107,221,161,0.25)',
        cursor: 'pointer',
        textDecoration: 'none',
        padding: '0 48px 0 16px',
      }}
    >
      {/* Desktop text */}
      <div
        className="hidden md:flex"
        style={{
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.85)',
        }}
      >
        <span>🚀</span>
        <span>Lanzamiento: implementación de USD 997 bonificada — termina en</span>
        <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '3px' }}>
          <Digit value={pad(days)} label="días" />
          <Separator />
          <Digit value={pad(hours)} label="hs" />
          <Separator />
          <Digit value={pad(minutes)} label="min" />
          <Separator />
          <Digit value={pad(seconds)} label="seg" />
        </span>
        <span style={{ color: '#6bdda1' }}>→</span>
      </div>

      {/* Mobile text */}
      <div
        className="flex md:hidden"
        style={{
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.85)',
        }}
      >
        <span>Implementación USD 997 → <span style={{ color: '#6bdda1', fontWeight: 800 }}>USD 0</span></span>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
        <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '2px' }}>
          <Digit value={pad(days)} label="días" />
          <Separator />
          <Digit value={pad(hours)} label="hs" />
          <Separator />
          <Digit value={pad(minutes)} label="min" />
          <Separator />
          <Digit value={pad(seconds)} label="seg" />
        </span>
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
  );
};
