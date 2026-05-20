import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Brain, RotateCcw, Zap, Smartphone, TrendingUp } from 'lucide-react';

const capabilities = [
  { icon: <MessageSquare className="w-6 h-6" />, title: 'Conversa de forma natural', desc: 'No usa menús ni opciones 1-2-3. Entiende contexto, detecta intención y responde como un humano.' },
  { icon: <Brain className="w-6 h-6" />, title: 'Aprende tu negocio', desc: 'Le pasamos tu catálogo, tus precios, tus políticas y tu tono. Cada Sentinel es único.' },
  { icon: <RotateCcw className="w-6 h-6" />, title: 'Hace seguimientos', desc: 'No espera que el cliente vuelva. Si pidió precio y se fue, Sentinel le escribe 1, 3 y 7 días después.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Cierra acciones reales', desc: 'Reserva turnos. Cobra señas. Agenda llamadas. Manda links de pago. No solo conversa: actúa.' },
  { icon: <Smartphone className="w-6 h-6" />, title: 'Atiende multicanal', desc: 'WhatsApp Business + Instagram DM en simultáneo. Misma personalidad, misma información, una sola base de datos.' },
  { icon: <TrendingUp className="w-6 h-6" />, title: 'Escala sin límite', desc: 'Atiende 50, 500 o 5.000 chats simultáneos. Tu costo es el mismo.' },
];

export const QueEsSentinel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#000000] py-[80px] lg:py-[120px] overflow-hidden">
      <div className="container-custom relative z-10 flex flex-col items-center px-[20px] max-w-[1100px] mx-auto">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{ color: 'rgba(0,212,170,0.8)', fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Inter, sans-serif', marginBottom: '16px', textAlign: 'center' }}
        >
          EL PRODUCTO
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-4"
          style={{ fontFamily: 'Saira, var(--font-primary), sans-serif', fontSize: 'clamp(30px, 7vw, 56px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FFFFFF' }}
        >
          Sentinel no es un chatbot.<br />Es un <span style={{ background: 'linear-gradient(90deg, #0066FF, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Empleado IA</span>.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mb-12"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 3.5vw, 18px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: '560px' }}
        >
          Conversa, califica, hace seguimientos y cierra. Entrenado con la información real de tu negocio, opera en WhatsApp e Instagram las 24 horas.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[900px]">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="group flex flex-col p-5 lg:p-6 rounded-2xl transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: '#0A0A0A',
                border: i === 0 ? '1px solid rgba(0,212,170,0.2)' : '1px solid rgba(255,255,255,0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Glow on first card */}
              {i === 0 && (
                <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-[#00D4AA] opacity-[0.06] blur-[40px] rounded-full pointer-events-none cap-glow" />
              )}

              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div style={{ color: 'rgba(255,255,255,0.7)' }} className="group-hover:text-[#00D4AA] transition-colors duration-300">
                  {cap.icon}
                </div>
              </div>

              <h3 className="relative z-10 mb-2" style={{ fontFamily: 'Saira, sans-serif', fontSize: '16px', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.2 }}>
                {cap.title}
              </h3>

              <p className="relative z-10" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.45 }}>
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Cierre */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="text-center mt-10"
          style={{ fontFamily: 'Saira, sans-serif', fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}
        >
          Es un empleado, no una herramienta.
        </motion.p>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes capGlow { 0%, 100% { opacity: 0.04; } 50% { opacity: 0.1; } }
        .cap-glow { animation: capGlow 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .cap-glow { animation: none; } }
      `}} />
    </section>
  );
};
