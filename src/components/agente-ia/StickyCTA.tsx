import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CTA_URL = '/formulario';

const trackEvent = () => {
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({ event: 'sentinel_cta_clicked', location: 'sticky', page: 'agente-ia', offer: 'sentinel_997' });
  }
};

export const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // Hide conditions: haven't passed hero, or in pricing/final CTA zones
      const pricingEl = document.getElementById('sentinel-pricing');
      const ctaFinalEl = document.getElementById('sentinel-cta-final');

      let inExclusionZone = false;
      if (pricingEl) {
        const rect = pricingEl.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) inExclusionZone = true;
      }
      if (ctaFinalEl) {
        const rect = ctaFinalEl.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) inExclusionZone = true;
      }

      setVisible(scrollY > heroHeight * 0.7 && !inExclusionZone);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        opacity: visible ? 1 : 0,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div style={{
        background: 'rgba(5,5,5,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'center',
        maxHeight: '64px',
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
            maxWidth: '400px',
            minHeight: '44px',
            padding: '12px 24px',
            borderRadius: '100px',
            background: 'linear-gradient(90deg, #185de8, #6bdda1)',
            fontFamily: 'var(--font-primary)',
            fontWeight: 800,
            fontSize: '14px',
            color: '#000',
            textDecoration: 'none',
            boxShadow: '0 0 20px rgba(107,221,161,0.15)',
          }}
        >
          Implementar Sentinel · USD 997
        </Link>
      </div>
    </div>
  );
};
