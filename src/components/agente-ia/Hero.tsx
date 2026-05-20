import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTA_URL = '/formulario';

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start pt-[144px] pb-[80px] md:pt-[180px] overflow-hidden" style={{ background: '#000000' }}>
      
      {/* Background Radial & Rotation Loop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ 
          opacity: { duration: 1 }, 
          rotate: { duration: 15, repeat: Infinity, ease: 'linear' } 
        }}
        className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(0,102,255,0.08) 0%, transparent 60%)',
          transformOrigin: 'center center'
        }}
      />

      <div className="container-custom relative z-10 flex flex-col items-center text-center px-[24px] md:px-0 max-w-[720px] mx-auto w-full">

        {/* 03 Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
          style={{
            color: '#00D4AA',
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '16px'
          }}
        >
          Antes de contratar
        </motion.div>

        {/* 04 Headline */}
        <div className="mb-6 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20, skewY: 2 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
            style={{
              fontFamily: 'Saira, var(--font-primary), sans-serif',
              fontSize: 'clamp(44px, 10vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              margin: 0,
              padding: 0
            }}
          >
            Antes de contratar
            <br />
            otro vendedor,
          </motion.h1>
          
          <motion.h1
            initial={{ opacity: 0, y: 20, backgroundPosition: '200% center' }}
            animate={{ opacity: 1, y: 0, backgroundPosition: '0% center' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
            className="shimmer-text"
            style={{
              fontFamily: 'Saira, var(--font-primary), sans-serif',
              fontSize: 'clamp(44px, 10vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              margin: 0,
              padding: 0,
              background: 'linear-gradient(90deg, #0066FF 0%, #00D4AA 50%, #0066FF 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            leé esto.
          </motion.h1>
        </div>

        {/* 05 Subheadline */}
        <div className="flex flex-col items-center gap-4 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            style={{
              fontSize: 'clamp(17px, 4vw, 20px)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.45,
              maxWidth: '35ch',
              margin: 0
            }}
          >
            Sentinel atiende, califica y vende como tu mejor vendedor.
          </motion.p>
          <div className="flex flex-col items-center gap-1.5" style={{ fontSize: 'clamp(16px, 3.8vw, 18px)', color: 'rgba(255,255,255,0.75)' }}>
            {[
              'No pide aumento.',
              'No renuncia.',
              'No te exige indemnización.'
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + (i * 0.08) }}
                className="flex items-center gap-2"
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D4AA' }} />
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 06 Chips */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-3 mb-10 w-full">
          {[
            'Responde en <8 segundos',
            'Atiende 50 chats simultáneos',
            'Hace seguimientos automáticos'
          ].map((chip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.1 + (i * 0.1) }}
              className="flex items-center gap-2 px-4 py-2"
              style={{
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '100px',
              }}
            >
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00D4AA' }} />
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{chip}</span>
            </motion.div>
          ))}
        </div>

        {/* 07 Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="w-full max-w-[600px] mb-8 relative rounded-3xl overflow-hidden"
          style={{
            aspectRatio: '16/9',
            background: '#050706',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://i.ibb.co/6P0D3q7p/poster-sentinel.png"
          >
            <source src="https://storage.googleapis.com/scala-assets/vsl-demo.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* 08 CTA Primario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="w-full flex flex-col items-center relative"
        >
          {/* Breathing glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[150%] bg-[#00D4AA] blur-[40px] rounded-full z-0 pointer-events-none"
          />
          
          <Link
            to={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 hover-scale"
            style={{
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
              fontSize: '16px',
              color: '#FFFFFF',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0, 212, 170, 0.25)',
              letterSpacing: '-0.01em',
            }}
          >
            Implementar Sentinel
          </Link>
        </motion.div>

        {/* 09 Microcopy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '16px',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          Personalizado para tu negocio · Listo en 7 días
        </motion.p>

      </div>

      {/* Global Styles for specific loops and hovers */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
        .shimmer-text {
          animation: shimmer 6s infinite linear 2s;
        }
        .hover-scale {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
        }
        .hover-scale:hover {
          transform: scale(0.98);
          box-shadow: 0 4px 30px rgba(0, 212, 170, 0.4) !important;
        }
      `}} />
    </section>
  );
};
