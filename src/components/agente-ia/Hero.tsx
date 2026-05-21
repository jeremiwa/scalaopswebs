import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { SentinelLogo } from './SentinelLogo';

const CTA_URL = '/formulario';

const useCountUp = (end: number, duration: number, trigger: boolean, delayMs: number = 0) => {
  const [val, setVal] = useState(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(Math.floor(end * ease));
      if (p < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    timeoutId = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, trigger, delayMs]);

  return val;
};

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const timeCount = useCountUp(8, 800, isInView, 1400);
  const chatCount = useCountUp(50, 800, isInView, 1400);

  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setGlitch(true);
      }, 1400); // 1100ms fade delay + 300ms transition time
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="relative w-full flex flex-col items-center justify-start overflow-hidden pt-[100px] md:pt-[140px] pb-[80px]" style={{ background: '#000000', minHeight: '100vh' }}>
      
      {/* Background Radial overlay - clean and premium */}
      <div
        className="absolute top-0 left-0 w-full h-[80%] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(100% 100% at 50% 0%, rgba(0,102,255,0.05) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-[50%] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(100% 100% at 50% 100%, rgba(0,212,170,0.02) 0%, transparent 80%)',
        }}
      />

      {/* Main Content Container */}
      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] md:px-0 mx-auto w-full max-w-[100%] sm:max-w-[480px] md:max-w-[800px]">

        {/* 03 Headline */}
        <div className="flex flex-col items-center w-full text-center mb-[24px]">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-primary), Inter, sans-serif',
              fontSize: 'clamp(32px, 6.8vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              color: '#FFFFFF',
              margin: 0,
              padding: 0
            }}
          >
            Tu negocio no necesita más personal,<br />
            <span style={{
              background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              whiteSpace: 'nowrap'
            }}>Necesita un Empleado IA.</span>
          </motion.h1>
        </div>

        {/* 04 Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mb-[32px]"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(14px, 3.8vw, 18px)',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.42,
            maxWidth: '600px',
            textAlign: 'center',
          }}
        >
          Sentinel atiende, califica, vende y hace seguimiento 24/7.
        </motion.p>

        {/* 07 Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="w-full relative rounded-[24px] overflow-hidden flex items-center justify-center mb-[24px] bg-[#070B12]"
          style={{
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 10px 30px rgba(0,102,255,0.06)'
          }}
        >
          <div style={{ padding: '56.25% 0 0 0', position: 'relative', width: '100%' }}>
            <iframe 
              src="https://player.vimeo.com/video/1194518903?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
              title="VSL V2">
            </iframe>
          </div>
        </motion.div>

        {/* 06 Stat strips (Movido abajo del video, más chicos y premium) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="w-full max-w-[600px] mb-[32px] overflow-hidden rounded-[16px]"
          style={{
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}
        >
          <div className="stat-strip-container px-[16px]">
            {/* Stat 1 */}
            <div className="stat-box">
              <span className="stat-number">&lt;{timeCount}s</span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.8 }}
                className="stat-label"
              >
                Tiempo de respuesta
              </motion.span>
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.2, delay: 1.7 }}
                className="stat-divider origin-top" 
              />
            </div>
            
            {/* Stat 2 */}
            <div className="stat-box">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.7 }}
                className="stat-number"
              >
                24/7
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.8 }}
                className="stat-label"
              >
                Operación continua
              </motion.span>
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.2, delay: 1.75 }}
                className="stat-divider origin-top desktop-hidden-divider" 
              />
            </div>

            {/* Stat 3 */}
            <div className="stat-box">
              <span className="stat-number">{chatCount}+</span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 1.8 }}
                className="stat-label"
              >
                Chats simultáneos
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* 08 CTA Primario */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 1.7 }}
          className="w-full flex flex-col items-center relative md:max-w-[420px]"
        >
          {/* Subtle Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[120%] bg-[#00D4AA] blur-[30px] rounded-full z-0 pointer-events-none opacity-20"
          />
          
          <Link 
            to={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '56px',
              padding: '0 32px',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#050706',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0, 212, 170, 0.25)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 212, 170, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 212, 170, 0.25)';
            }}
          >
            <SentinelLogo className="w-5 h-5" variant="white" />
            Implementar Sentinel
          </Link>
        </motion.div>

        {/* 09 Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.8 }}
          style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.48)',
            marginTop: '12px',
            marginBottom: '0',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center'
          }}
        >
          Personalizado para tu negocio · Listo en 7 días
        </motion.p>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stat-strip-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          width: 100%;
        }
        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 0;
          position: relative;
        }
        .stat-number {
          font-family: 'Saira', sans-serif;
          font-weight: 800;
          font-size: clamp(24px, 5vw, 32px);
          color: #FFFFFF;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .stat-label {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: clamp(9px, 2.2vw, 11px);
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 6px;
          text-align: center;
          line-height: 1.3;
          max-width: 120px;
        }
        .stat-divider {
          position: absolute;
          right: 0;
          top: 20%;
          height: 60%;
          width: 1px;
          background: rgba(0,212,170,0.15);
          overflow: hidden;
        }
        .stat-divider::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #00D4AA, transparent);
          animation: shimmerDivider 8s infinite ease-in-out;
        }
        @keyframes shimmerDivider {
          0%, 80% { top: -100%; }
          90% { top: 100%; }
          100% { top: 100%; }
        }
        @keyframes glitch-coral {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 1px) }
          40% { transform: translate(-1px, -1px) }
          60% { transform: translate(2px, 1px) }
          80% { transform: translate(1px, -1px) }
          100% { transform: translate(0) }
        }
        .glitch-animation {
          animation: glitch-coral 0.2s cubic-bezier(.25, .46, .45, .94) both;
        }
        .hover-scale {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-scale:hover {
          transform: scale(0.985);
        }
        @media (max-width: 480px) {
          .stat-strip-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat-box {
            padding: 16px 0;
          }
          .stat-box:nth-child(3) {
            grid-column: 1 / -1;
            padding-top: 0;
            padding-bottom: 16px;
          }
          .desktop-hidden-divider {
            display: none;
          }
        }
      `}} />
    </section>
  );
};
