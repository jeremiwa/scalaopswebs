import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const CTA_URL = '/formulario';

export const Hero = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-start overflow-hidden pt-[100px] md:pt-[140px] pb-[48px]" style={{ background: '#000000', minHeight: '100vh' }}>
      
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
      <div className="container-custom relative z-10 flex flex-col items-center px-[24px] md:px-0 mx-auto w-full max-w-[360px] md:max-w-[760px]">

        {/* 02 Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          style={{
            color: '#00D4AA',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            marginBottom: '16px',
            textAlign: 'center'
          }}
        >
          Antes de contratar
        </motion.div>

        {/* 03 Headline */}
        <div className="flex flex-col items-center w-full max-w-[330px] md:max-w-[680px] text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            style={{
              fontFamily: 'Saira, var(--font-primary), sans-serif',
              fontSize: 'clamp(36px, 8vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.03,
              letterSpacing: '-0.035em',
              color: '#FFFFFF',
              margin: 0,
              padding: 0
            }}
          >
            Antes de contratar<br />
            otro vendedor,
          </motion.h1>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
            style={{
              fontFamily: 'Saira, var(--font-primary), sans-serif',
              fontSize: 'clamp(36px, 8vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.03,
              letterSpacing: '-0.035em',
              margin: 0,
              padding: 0,
              background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            leé esto.
          </motion.h1>
        </div>

        {/* 04 Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(16px, 4vw, 20px)',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.42,
            maxWidth: '315px',
            mdMaxWidth: '600px',
            textAlign: 'center',
            marginTop: '18px',
            marginBottom: '20px'
          }}
        >
          Sentinel atiende, califica y sigue oportunidades 24/7, sin sumar otro sueldo a tu equipo.
        </motion.p>

        {/* 05 Beneficios compactos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="w-full flex flex-row flex-wrap justify-center gap-[8px] mb-[24px]"
        >
          <div className="chip-benefit">
            <div className="chip-dot" />
            <span className="chip-text">Sin aumentos</span>
          </div>
          <div className="chip-benefit">
            <div className="chip-dot" />
            <span className="chip-text">Sin rotación</span>
          </div>
          <div className="chip-benefit">
            <div className="chip-dot" />
            <span className="chip-text">Seguimiento automático</span>
          </div>
        </motion.div>

        {/* 06 Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="w-full relative rounded-[24px] overflow-hidden flex items-center justify-center cursor-pointer group"
          style={{
            aspectRatio: '16/9',
            background: '#070B12',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 10px 30px rgba(0,102,255,0.06)'
          }}
        >
          {/* Custom Poster Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-[#000000]/70">
            <div className="w-[58px] h-[58px] rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 backdrop-blur-md flex items-center justify-center mb-2 group-hover:scale-105 transition-transform duration-300">
              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
            </div>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: '#FFFFFF', letterSpacing: '0.02em' }}>
              Mirá cómo trabaja Sentinel
            </span>
          </div>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50 mix-blend-screen"
          >
            <source src="https://storage.googleapis.com/scala-assets/vsl-demo.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* 07 CTA Primario */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="w-full flex flex-col items-center relative mt-[18px] md:max-w-[420px]"
        >
          {/* Subtle Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[120%] bg-[#00D4AA] blur-[30px] rounded-full z-0 pointer-events-none opacity-20"
          />
          
          <Link
            to={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 hover-scale w-full flex justify-center"
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '56px',
              padding: '0 24px',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
              fontFamily: 'Inter, var(--font-primary), sans-serif',
              fontWeight: 800,
              fontSize: '17px',
              color: '#020403',
              boxShadow: '0 4px 16px rgba(0, 212, 170, 0.15)',
              letterSpacing: '-0.01em',
            }}>
              Implementar Sentinel
            </div>
          </Link>
        </motion.div>

        {/* 08 Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
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
        .chip-benefit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 0 12px;
          height: 42px;
          white-space: nowrap;
        }
        .chip-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #00D4AA;
          flex-shrink: 0;
        }
        .chip-text {
          font-family: Inter, sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.86);
        }
        .hover-scale {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-scale:hover {
          transform: scale(0.985);
        }
      `}} />
    </section>
  );
};
