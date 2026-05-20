import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const CTA_URL = '/formulario';

export const Hero = () => {
  return (
    <section className="relative w-full flex flex-col items-center justify-start overflow-hidden pt-[116px] md:pt-[160px] pb-[40px] md:pb-[64px]" style={{ background: '#000000', minHeight: '100vh' }}>
      
      {/* Background Radial overlay */}
      <div
        className="absolute top-0 left-0 w-full h-[80%] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(120% 100% at 50% 0%, rgba(0,102,255,0.06) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-[50%] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(100% 100% at 50% 100%, rgba(0,212,170,0.03) 0%, transparent 80%)',
        }}
      />

      {/* Main Content Container */}
      <div className="container-custom relative z-10 flex flex-col items-center px-[24px] md:px-0 mx-auto w-full max-w-[340px] md:max-w-[760px]">

        {/* 02 Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          style={{
            color: '#00D4AA',
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '18px',
            textAlign: 'center'
          }}
        >
          Antes de contratar
        </motion.div>

        {/* 03 Headline */}
        <div className="mb-[20px] flex flex-col items-center w-full max-w-[330px] md:max-w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            style={{
              fontFamily: 'Saira, var(--font-primary), sans-serif',
              fontSize: 'clamp(40px, 9vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              margin: 0,
              padding: 0
            }}
          >
            Antes de contratar<br className="hidden md:block" />
            <span className="md:hidden"> </span>otro vendedor,
          </motion.h1>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
            style={{
              fontFamily: 'Saira, var(--font-primary), sans-serif',
              fontSize: 'clamp(40px, 9vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
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
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.45,
            maxWidth: '310px',
            mdMaxWidth: '600px',
            textAlign: 'center',
            marginBottom: '18px'
          }}
        >
          Sentinel atiende, califica y vende como tu mejor vendedor.
        </motion.p>

        {/* 05 Bullets de negación */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex flex-col gap-[10px] w-full max-w-[290px] mx-auto md:max-w-max md:flex-row md:gap-6 md:justify-center"
        >
          {[
            'No pide aumento.',
            'No renuncia.',
            'No te exige indemnización.'
          ].map((text, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + (i * 0.08) }}
              className="flex items-start gap-[10px]"
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00D4AA', marginTop: '6px', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.88)', lineHeight: 1.35, fontWeight: 500, textAlign: 'left' }}>
                {text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* 06 Chips */}
        <div className="w-full mt-[22px] mb-[24px] grid grid-cols-2 gap-[10px] md:flex md:flex-row md:justify-center md:flex-wrap">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="chip-base"
          >
            <div className="chip-dot" />
            <span className="chip-text">Responde en &lt;8 seg</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="chip-base"
          >
            <div className="chip-dot" />
            <span className="chip-text line-clamp-2">Atiende 50 chats</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 1.0 }}
            className="chip-base col-span-2 md:col-span-1 mx-auto max-w-[240px] md:max-w-none"
          >
            <div className="chip-dot" />
            <span className="chip-text">Hace seguimientos automáticos</span>
          </motion.div>
        </div>

        {/* 07 Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="w-full relative rounded-[28px] overflow-hidden flex items-center justify-center cursor-pointer group"
          style={{
            aspectRatio: '16/9',
            background: '#0A0F16',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 10px 30px rgba(0,102,255,0.1)'
          }}
        >
          {/* Custom Poster Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-transparent to-[#000000]/60">
            <div className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 backdrop-blur-md flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
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
            className="w-full h-full object-cover opacity-60 mix-blend-screen"
          >
            <source src="https://storage.googleapis.com/scala-assets/vsl-demo.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* 08 CTA Primario */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="w-full flex flex-col items-center relative mt-[18px]"
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
              maxWidth: '380px',
              height: '56px',
              padding: '0 24px',
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 100%)',
              fontFamily: 'Inter, var(--font-primary), sans-serif',
              fontWeight: 800,
              fontSize: '17px',
              color: '#050706',
              boxShadow: '0 4px 16px rgba(0, 212, 170, 0.15)',
              letterSpacing: '-0.01em',
            }}>
              Implementar Sentinel
            </div>
          </Link>
        </motion.div>

        {/* 09 Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '12px',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center'
          }}
        >
          Personalizado para tu negocio · Listo en 7 días
        </motion.p>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .chip-base {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 999px;
          padding: 12px 14px;
          min-height: 48px;
        }
        .chip-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00D4AA;
          flex-shrink: 0;
        }
        .chip-text {
          font-family: Inter, sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.86);
          line-height: 1.2;
          text-align: left;
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
