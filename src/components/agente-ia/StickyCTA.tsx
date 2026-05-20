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
  const [inPricing, setInPricing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // Show after 20% of viewport
      setVisible(scrollY > heroHeight * 0.2);

      // Check if in pricing section to change copy
      const pricingEl = document.getElementById('sentinel-pricing');
      let isPricing = false;
      if (pricingEl) {
        const rect = pricingEl.getBoundingClientRect();
        // If pricing section is within viewport bounds
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          isPricing = true;
        }
      }
      setInPricing(isPricing);
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
        transition: 'transform 250ms cubic-bezier(0.25, 1, 0.5, 1), opacity 250ms linear',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div style={{
        background: 'rgba(3,5,4,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(105,235,170,0.12)',
        boxShadow: '0 -4px 32px rgba(0,0,0,0.8)',
        padding: '12px 24px',
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
            background: 'linear-gradient(90deg, #246BFE 0%, #68E6A3 100%)',
            fontFamily: 'var(--font-primary), Inter, sans-serif',
            fontWeight: 800,
            fontSize: '15px',
            color: '#030504',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(105,235,170,0.18)',
            letterSpacing: '-0.01em',
          }}
        >
          {inPricing ? 'Reservar implementación · USD 997' : 'Implementar Sentinel · USD 997'}
        </Link>
      </div>
    </div>
  );
};
