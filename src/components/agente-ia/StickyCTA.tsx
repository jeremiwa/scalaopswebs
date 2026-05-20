import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

const trackEvent = () => {
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({ event: 'sentinel_cta_clicked', location: 'sticky', page: 'agente-ia' });
  }
};

export const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // Show after 80% of viewport so it does not conflict with Hero
      let shouldShow = scrollY > heroHeight * 0.8;

      // Check if in pricing or final CTA section to hide
      const pricingEl = document.getElementById('sentinel-pricing');
      const finalCtaEl = document.getElementById('sentinel-cta-final');
      
      if (pricingEl) {
        const rect = pricingEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          shouldShow = false;
        }
      }
      if (finalCtaEl) {
        const rect = finalCtaEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          shouldShow = false;
        }
      }

      setVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[100]"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 300ms ease-out, opacity 300ms ease-out',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div style={{
        background: 'rgba(0,0,0,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 -4px 32px rgba(0,0,0,0.8)',
        padding: '8px 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '64px',
      }}>
        <Link
          to={CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackEvent}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '380px',
            height: '48px',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
            fontFamily: 'var(--font-primary), Inter, sans-serif',
            fontWeight: 800,
            fontSize: '15px',
            color: '#FFFFFF',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(0, 212, 170, 0.2)',
            letterSpacing: '-0.01em',
          }}
        >
          Implementar Sentinel →
        </Link>
      </div>
    </div>
  );
};
