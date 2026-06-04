import { useState, useEffect } from 'react';
import { Logo } from '../ui/Logo';
import { Link } from 'react-router-dom';
import { SentinelLogo } from './SentinelLogo';

const CTA_URL = '/formulario';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [urgencyBarVisible, setUrgencyBarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check if urgency bar is dismissed
    const checkUrgencyBar = () => {
      const bar = document.getElementById('urgency-bar');
      setUrgencyBarVisible(!!bar);
    };

    // Listen for urgency bar dismiss
    const handleDismiss = () => setUrgencyBarVisible(false);
    window.addEventListener('urgencybar-dismiss', handleDismiss);

    // Initial check
    checkUrgencyBar();

    // Also check periodically in case of timing issues
    const interval = setInterval(checkUrgencyBar, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('urgencybar-dismiss', handleDismiss);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav 
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${urgencyBarVisible ? 'top-[44px] md:top-[64px]' : 'top-0'} ${
        scrolled ? 'bg-[#030504]/90 backdrop-blur-md border-b border-white/[0.04]' : 'bg-transparent'
      }`}
    >
      {/* Thin premium green line at the top */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, rgba(36,107,254,0.8) 0%, rgba(104,230,163,0.8) 100%)' }} />
      
      <div 
        className={`container-custom flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-[56px]' : 'h-[64px]'
        }`}
      >
        <Link to="/" className="hover:opacity-80 transition-opacity flex items-center gap-3">
          <Logo />
          <div className="h-[20px] w-px bg-white/20 hidden md:block"></div>
          <div className="flex items-center gap-2">
            <SentinelLogo className="w-5 h-5 hidden md:block" />
            <span className="text-white font-bold tracking-widest text-[14px] hidden md:block" style={{ fontFamily: 'Saira, sans-serif' }}>SENTINEL</span>
          </div>
        </Link>
        <div className="flex items-center">
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
              <span className="md:hidden flex items-center gap-2"><SentinelLogo className="w-4 h-4" variant="white" /> Implementar</span>
              <span className="hidden md:flex items-center gap-2"><SentinelLogo className="w-4 h-4" variant="white" /> Implementar Sentinel</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
