import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Filter, Rocket, X, Check } from 'lucide-react';

export const DiferenciacionBreve = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="w-full bg-[#000000] py-[40px] md:py-[80px] flex flex-col items-center">
      <div className="container-custom px-[20px] w-full max-w-[800px] mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-[40px]"
        >
          <h2 className="text-[clamp(28px,6vw,44px)] font-[800] text-white leading-[1.1] tracking-tight mb-[16px]" style={{ fontFamily: 'Saira, sans-serif' }}>
            No es un chatbot.<br className="block md:hidden" /> Es un empleado comercial de IA.
          </h2>
          <p className="text-[clamp(15px,3.5vw,18px)] text-white/70 leading-[1.4]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Un bot responde mensajes. Sentinel trabaja oportunidades.
          </p>
        </motion.div>

        {/* 3 Bloques Compactos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[12px] mb-[32px]">
          {[
            { icon: <MessageSquare className="w-5 h-5 text-[#00D4AA]" />, title: "Responde", text: "Atiende consultas 24/7." },
            { icon: <Filter className="w-5 h-5 text-[#00D4AA]" />, title: "Filtra", text: "Detecta clientes con intención real." },
            { icon: <Rocket className="w-5 h-5 text-[#00D4AA]" />, title: "Avanza", text: "Agenda, envía links o sigue la conversación." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-[12px] p-[16px] rounded-[12px]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="w-[36px] h-[36px] shrink-0 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-white mb-[2px]" style={{ fontFamily: 'Inter, sans-serif' }}>{item.title}</h4>
                <p className="text-[13px] text-white/60 leading-[1.2]" style={{ fontFamily: 'Inter, sans-serif' }}>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini Comparativa */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full rounded-[16px] overflow-hidden flex flex-col md:flex-row border border-white/10"
        >
          <div className="flex-1 bg-[#1A1114] p-[20px] md:p-[24px]">
            <h4 className="text-[14px] font-bold text-white/50 uppercase tracking-widest mb-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Bot común
            </h4>
            <ul className="flex flex-col gap-[10px]">
              {["Menús rígidos", "Respuestas genéricas", "Sin seguimiento"].map((b, i) => (
                <li key={i} className="flex items-center gap-[8px] text-[15px] text-white/70">
                  <X className="w-4 h-4 text-[#FF4D6D] shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 p-[20px] md:p-[24px]" style={{ background: 'linear-gradient(180deg, #051A15 0%, #020C0A 100%)' }}>
            <h4 className="text-[14px] font-bold text-[#00D4AA] uppercase tracking-widest mb-[12px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Sentinel
            </h4>
            <ul className="flex flex-col gap-[10px]">
              {["Lenguaje natural", "Información real", "Seguimiento automático"].map((b, i) => (
                <li key={i} className="flex items-center gap-[8px] text-[15px] text-white">
                  <Check className="w-4 h-4 text-[#00D4AA] shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
