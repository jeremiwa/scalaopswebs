import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CONFIG = {
  desktopTimerMs: 8000,
  mobileTimerMs: 10000,
  scrollThreshold: 0.3,
  dismissDays: 7,
  vslUrl: '/por-que-scala',
  excludedPaths: ['/por-que-scala', '/gracias', '/formulario', '/admin'],
};

// Extensión para los tipos de window
declare global {
  interface Window {
    dataLayer?: any[];
    analytics?: { track: (event: string, properties?: any) => void };
  }
}

export const useVSLModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  // Refs de control para evitar sobreescribir lógica de triggers
  const hasTriggeredRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const hiddenTimeRef = useRef<number | null>(null);

  // Analíticas
  const trackEvent = useCallback((eventName: string, properties: any = {}) => {
    if (window.dataLayer) {
      window.dataLayer.push({ event: eventName, ...properties });
    } else if (window.analytics) {
      window.analytics.track(eventName, properties);
    } else if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Track] ${eventName}:`, properties);
    }
  }, []);

  const open = useCallback((trigger: string) => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    sessionStorage.setItem('scala_vsl_modal_shown_session', '1');
    setIsOpen(true);
    trackEvent('scala_vsl_modal_shown', { trigger });
  }, [trackEvent]);

  // Cierre general guardando expiración de "no mostrar" de 7 días
  const close = useCallback((method: string) => {
    setIsOpen(false);
    const dismissDate = new Date();
    dismissDate.setDate(dismissDate.getDate() + CONFIG.dismissDays);
    localStorage.setItem('scala_vsl_modal_dismissed_until', dismissDate.toISOString());
    trackEvent('scala_vsl_modal_closed', { method });
  }, [trackEvent]);

  const onCTAClick = useCallback(() => {
    // Si da clic no guardamos el dismiss limitante porque asumimos que tiene interés, solo session
    localStorage.setItem('scala_vsl_watched_attempt', 'true');
    trackEvent('scala_vsl_modal_cta_clicked');
    setIsOpen(false); // Cerramos visualmente de inmediato
    
    // Navegar
    if (pathname !== CONFIG.vslUrl) {
      navigate(CONFIG.vslUrl);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [navigate, pathname, trackEvent]);

  const onSecondaryClick = useCallback(() => {
    trackEvent('scala_vsl_modal_cta_secondary_clicked');
    close('secondary_cta');
  }, [close, trackEvent]);

  useEffect(() => {
    // CONDICIONES "AND" DE BLOQUEO (si cualquiera es true, bloqueamos inicialización)
    
    // Ya mostrado en sesión?
    if (sessionStorage.getItem('scala_vsl_modal_shown_session') === '1') {
      return; // Completamente cancelado
    }

    // Está la URL excluida?
    const isExcludedPath = CONFIG.excludedPaths.some(p => pathname.startsWith(p));
    if (isExcludedPath) return;

    // Querystring ?no_popup=1 ?
    const isQAExclusion = search.includes('no_popup=1');
    if (isQAExclusion) return;

    // El usario tiene un dismiss blockeado de hace < 7 días?
    const dismissedUntil = localStorage.getItem('scala_vsl_modal_dismissed_until');
    if (dismissedUntil && new Date(dismissedUntil).getTime() > Date.now()) {
      return;
    }

    // Viene referenciado de otra pestaña tuya (navegando dentro del mismo dominio)
    // Excepción local: En dev si la URL es localhost tmb debería bloquear en teoría, 
    // pero para probar está bien.
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
      return; // ya navega internamente
    }

    // --- TRIGGERS ---
    let timer: ReturnType<typeof setTimeout>;

    const isMobile = window.innerWidth < 768;

    // 1) Trigger simple de Temporizador
    timer = setTimeout(() => {
      open('timer');
    }, isMobile ? CONFIG.mobileTimerMs : CONFIG.desktopTimerMs);

    // 2) Scroll Handler
    const handleScroll = () => {
      if (hasTriggeredRef.current) return;
      
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollY / (docHeight - winHeight);

      if (!isMobile) {
        // Desktop Scroll Trigger (> 30%)
        if (scrollPercent >= CONFIG.scrollThreshold) {
          open('scroll');
        }
      } else {
        // Mobile Scroll-up Trigger rápído
        const now = Date.now();
        const timeDiff = now - lastScrollTimeRef.current;
        const scrollDiff = lastScrollYRef.current - scrollY;

        // Si bajó de cant. Y más de 200 píxeles en menos de 400ms
        if (scrollDiff > 200 && timeDiff < 400 && scrollY > 100) {
          open('scroll_up');
        }

        lastScrollYRef.current = scrollY;
        lastScrollTimeRef.current = now;
      }
    };

    // 3) Visibility Change (Solo mobile + > 3s oculto)
    const handleVisibilityChange = () => {
      if (hasTriggeredRef.current) return;
      if (!isMobile) return;

      if (document.hidden) {
        hiddenTimeRef.current = Date.now();
      } else if (hiddenTimeRef.current) {
        const timeHidden = Date.now() - hiddenTimeRef.current;
        if (timeHidden > 3000) {
          open('visibility');
        }
        hiddenTimeRef.current = null;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4) Exit intent (desktop only — mouseleave from viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasTriggeredRef.current) return;
      if (isMobile) return;
      if (e.clientY <= 0) {
        open('exit_intent');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pathname, search, open]);

  return { isOpen, close, onCTAClick, onSecondaryClick };
};
