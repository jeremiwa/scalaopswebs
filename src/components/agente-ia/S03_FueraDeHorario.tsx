import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Bot } from 'lucide-react';

export const S03_FueraDeHorario = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="w-full bg-[#000000] py-[80px] md:py-[120px] flex flex-col items-center relative overflow-hidden">
      
      <div className="container-custom px-[20px] w-full max-w-[1000px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Encabezado */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-[64px] max-w-[700px]"
        >
          <h2 className="text-[clamp(32px,6vw,48px)] font-[800] text-white leading-[1.05] tracking-tight mb-[24px]" style={{ fontFamily: 'Saira, sans-serif' }}>
            Tus mejores consultas no siempre llegan en horario laboral.
          </h2>
          <p className="text-[clamp(16px,4vw,20px)] text-white/70 leading-[1.4] mb-[24px]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Llegan a la noche. Un domingo. Mientras tu vendedor está ocupado. O cuando nadie está mirando WhatsApp.
          </p>
          <p className="text-[18px] text-[#FF4D6D] font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
            Y cuando respondés tarde, muchas veces ya compraron en otro lado.
          </p>
        </motion.div>

        {/* Escena Visual: Radar + Notificaciones */}
        <div className="relative w-full max-w-[800px] h-[500px] md:h-[400px] flex items-center justify-center mb-[40px]">
          
          {/* Radar Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-[#00D4AA]/30"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full border border-[#00D4AA]/20"
            />
          </div>

          {/* Notificación 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute top-[5%] left-[5%] md:top-[10%] md:left-[10%] z-20 flex items-start gap-[12px] bg-[#111816] p-[16px] rounded-[16px] rounded-tl-none border border-white/5 shadow-2xl max-w-[240px]"
          >
            <div className="w-[32px] h-[32px] bg-white/5 rounded-full flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-white/50" />
            </div>
            <div>
              <span className="text-[11px] text-white/40 font-bold mb-[4px] block" style={{ fontFamily: 'Inter, sans-serif' }}>22:47</span>
              <p className="text-[14px] text-white/90 leading-[1.3]" style={{ fontFamily: 'Inter, sans-serif' }}>Hola, ¿tenés disponibilidad para mañana?</p>
            </div>
          </motion.div>

          {/* Notificación 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: -20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute top-[25%] right-[5%] md:top-[15%] md:right-[5%] z-20 flex items-start gap-[12px] bg-[#111816] p-[16px] rounded-[16px] rounded-tr-none border border-white/5 shadow-2xl max-w-[220px]"
          >
            <div className="w-[32px] h-[32px] bg-white/5 rounded-full flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-white/50" />
            </div>
            <div>
              <span className="text-[11px] text-white/40 font-bold mb-[4px] block" style={{ fontFamily: 'Inter, sans-serif' }}>00:18</span>
              <p className="text-[14px] text-white/90 leading-[1.3]" style={{ fontFamily: 'Inter, sans-serif' }}>Me pasás precio?</p>
            </div>
          </motion.div>

          {/* Notificación 3 */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.9 }}
            className="absolute bottom-[20%] left-[10%] md:bottom-[15%] md:left-[15%] z-20 flex items-start gap-[12px] bg-[#111816] p-[16px] rounded-[16px] rounded-bl-none border border-white/5 shadow-2xl max-w-[260px]"
          >
            <div className="w-[32px] h-[32px] bg-white/5 rounded-full flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-white/50" />
            </div>
            <div>
              <span className="text-[11px] text-white/40 font-bold mb-[4px] block" style={{ fontFamily: 'Inter, sans-serif' }}>Domingo 10:32</span>
              <p className="text-[14px] text-white/90 leading-[1.3]" style={{ fontFamily: 'Inter, sans-serif' }}>Estoy entre ustedes y otra opción.</p>
            </div>
          </motion.div>

          {/* Panel Sentinel Central */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="relative z-30 flex items-start gap-[16px] p-[20px] rounded-[20px] max-w-[320px] bg-black border border-[#00D4AA]/30 shadow-[0_0_40px_rgba(0,212,170,0.15)] mt-[80px] md:mt-[40px]"
          >
            {/* Pulse effect */}
            <motion.div
              animate={{ boxShadow: ['0 0 0px rgba(0,212,170,0)', '0 0 20px rgba(0,212,170,0.4)', '0 0 0px rgba(0,212,170,0)'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute inset-0 rounded-[20px] pointer-events-none"
            />
            
            <div className="w-[40px] h-[40px] bg-[#00D4AA]/10 rounded-full flex items-center justify-center shrink-0 border border-[#00D4AA]/30 relative">
              <Bot className="w-5 h-5 text-[#00D4AA]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00D4AA] rounded-full border-2 border-black" />
            </div>
            <div>
              <span className="text-[12px] text-[#00D4AA] font-bold mb-[6px] block uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>Sentinel</span>
              <p className="text-[15px] text-white leading-[1.4]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Te respondo ahora. Te paso la info y, si querés, te dejo agendada la consulta.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Remate */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 3.5 }}
          className="text-center"
        >
          <p className="text-[16px] md:text-[18px] text-white/80 font-medium px-[20px] py-[12px] rounded-full bg-white/5 border border-white/10" style={{ fontFamily: 'Inter, sans-serif' }}>
            Sentinel mantiene caliente la oportunidad hasta que tu equipo la toma.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
