import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MessageCircle, Bot, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

// Sequence steps definition
const SEQUENCE = [
  { id: 'sin-1', duration: 2000 }, // 0: Sin Sentinel, cliente 1, 00:01
  { id: 'sin-2', duration: 2000 }, // 1: 18 min, cliente 2
  { id: 'sin-3', duration: 1500 }, // 2: cliente 3
  { id: 'sin-4', duration: 3000 }, // 3: VENTA PERDIDA
  { id: 'trans', duration: 2500 }, // 4: Transición
  { id: 'con-1', duration: 1500 }, // 5: Con Sentinel, cliente 1
  { id: 'con-2', duration: 1500 }, // 6: Sentinel 1
  { id: 'con-3', duration: 1500 }, // 7: Cliente 2
  { id: 'con-4', duration: 1500 }, // 8: Sentinel 2
  { id: 'con-5', duration: 3000 }, // 9: CONSULTA AGENDADA
  { id: 'reset', duration: 500 },  // 10: Reset
];

export const S03_FueraDeHorario = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let timeout: NodeJS.Timeout;
    
    const runSequence = (currentStep: number) => {
      const nextStep = (currentStep + 1) % SEQUENCE.length;
      timeout = setTimeout(() => {
        setStep(nextStep);
      }, SEQUENCE[currentStep].duration);
    };

    runSequence(step);

    return () => clearTimeout(timeout);
  }, [step, isInView]);

  const phase = step < 4 ? 'sin' : step === 4 ? 'trans' : step < 10 ? 'con' : 'reset';

  return (
    <section ref={ref} className="w-full bg-[#000000] py-[80px] md:py-[120px] flex flex-col items-center overflow-hidden">
      
      <div className="container-custom px-[20px] w-full max-w-[800px] mx-auto flex flex-col items-center">
        
        {/* 1. HEADLINE GRANDE */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-[32px] max-w-[700px]"
        >
          <h2 className="text-[clamp(32px,6vw,48px)] font-[800] text-white leading-[1.05] tracking-tight mb-[24px]" style={{ fontFamily: 'Saira, sans-serif' }}>
            Tus mejores clientes no siempre llegan en horario laboral.
          </h2>
        </motion.div>

        {/* 2. CHIPS VISUALES */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-[12px] mb-[64px]"
        >
          {['Domingo · 22:47', 'Feriado · 00:18', 'Vendedor ocupado'].map((chip, i) => (
            <div key={i} className="px-[16px] py-[8px] rounded-full bg-white/5 border border-white/10 text-white text-[13px] font-bold flex items-center gap-[6px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              <Clock className="w-3.5 h-3.5" />
              {chip}
            </div>
          ))}
        </motion.div>

        {/* Escenario de Animación */}
        <div className="w-full max-w-[500px] bg-[#0A0E0C] border border-white/10 rounded-[24px] overflow-hidden relative shadow-2xl h-[500px] md:h-[550px] flex flex-col">
          
          {/* Header Scene */}
          <div className="h-[60px] bg-black/40 border-b border-white/5 flex items-center justify-center px-[20px]">
            <AnimatePresence mode="wait">
              {phase === 'sin' && (
                <motion.div key="sin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse" />
                  <span className="text-[#FF4D6D] font-bold text-[14px] uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>Sin Sentinel</span>
                </motion.div>
              )}
              {phase === 'con' && (
                <motion.div key="con" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse" />
                  <span className="text-[#00D4AA] font-bold text-[14px] uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>Con Sentinel</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-[20px] md:p-[24px] relative flex flex-col gap-[16px] overflow-hidden">
            
            <AnimatePresence>
              {/* TRANSICIÓN */}
              {phase === 'trans' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-[#0A0E0C]/90 backdrop-blur-sm"
                >
                  <p className="text-[20px] text-white font-bold text-center px-[24px] glitch-text" style={{ fontFamily: 'Saira, sans-serif' }}>
                    Ahora mirá qué hubiera pasado con Sentinel.
                  </p>
                </motion.div>
              )}

              {/* FASE 1: SIN SENTINEL */}
              {phase === 'sin' && (
                <motion.div key="phase-sin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col gap-[16px] w-full h-full">
                  
                  {/* Bubble 1 */}
                  {(step >= 0) && (
                    <motion.div initial={{ opacity: 0, y: 10, x: -10 }} animate={{ opacity: step >= 1 ? 0.4 : 1, y: 0, x: 0 }} className="self-start max-w-[85%]">
                      <div className="text-[11px] text-white/40 mb-1 ml-1" style={{ fontFamily: 'Inter, sans-serif' }}>Domingo · 22:47</div>
                      <div className="bg-[#1A221F] border border-white/5 p-[14px] rounded-[16px] rounded-tl-sm text-[14px] text-white/90 leading-[1.4]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Hola, quiero reservar para mañana. ¿Tienen disponibilidad?
                      </div>
                      
                      {/* Counter */}
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                        className="mt-2 text-[12px] font-medium flex items-center gap-1.5" style={{ fontFamily: 'Inter, sans-serif', color: step >= 1 ? '#FF4D6D' : '#888' }}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {step === 0 ? "Sin respuesta: 00:01" : "Sin respuesta: 18 min"}
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Bubble 2 */}
                  {(step >= 1) && (
                    <motion.div initial={{ opacity: 0, y: 10, x: -10 }} animate={{ opacity: step >= 2 ? 0.4 : 1, y: 0, x: 0 }} className="self-start max-w-[85%] mt-2">
                      <div className="bg-[#1A221F] border border-white/5 p-[14px] rounded-[16px] rounded-tl-sm text-[14px] text-white/90 leading-[1.4]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Estoy viendo otra opción también.
                      </div>
                    </motion.div>
                  )}

                  {/* Bubble 3 */}
                  {(step >= 2) && (
                    <motion.div initial={{ opacity: 0, y: 10, x: -10 }} animate={{ opacity: 1, y: 0, x: 0 }} className="self-start max-w-[85%] mt-4">
                      <div className="bg-[#1A221F] border border-white/5 p-[14px] rounded-[16px] rounded-tl-sm text-[14px] text-white/90 leading-[1.4]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Gracias, ya lo resolví con otro.
                      </div>
                    </motion.div>
                  )}

                  {/* VENTA PERDIDA */}
                  <AnimatePresence>
                    {(step >= 3) && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-x-[20px] bottom-[30px] z-20 flex flex-col items-center justify-center bg-[#FF0033]/10 border border-[#FF0033]/30 p-[24px] rounded-[16px] backdrop-blur-md shadow-[0_10px_40px_rgba(255,0,51,0.2)]"
                      >
                        <AlertTriangle className="w-8 h-8 text-[#FF4D6D] mb-2" />
                        <span className="text-[24px] font-[900] text-[#FF4D6D] tracking-tight leading-none mb-2" style={{ fontFamily: 'Saira, sans-serif' }}>
                          VENTA PERDIDA
                        </span>
                        <p className="text-[13px] text-[#FF4D6D]/80 text-center leading-[1.3] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Llegó listo para avanzar.<br/>Nadie respondió a tiempo.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              )}

              {/* FASE 2: CON SENTINEL */}
              {phase === 'con' && (
                <motion.div key="phase-con" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-[12px] w-full h-full">
                  
                  {/* Bubble 1 (Customer) */}
                  {(step >= 5) && (
                    <motion.div initial={{ opacity: 0, y: 10, x: -10 }} animate={{ opacity: 1, y: 0, x: 0 }} className="self-start max-w-[85%]">
                      <div className="text-[11px] text-white/40 mb-1 ml-1" style={{ fontFamily: 'Inter, sans-serif' }}>Domingo · 22:47</div>
                      <div className="bg-[#1A221F] border border-white/5 p-[14px] rounded-[16px] rounded-tl-sm text-[14px] text-white/90 leading-[1.4]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Hola, quiero reservar para mañana. ¿Tienen disponibilidad?
                      </div>
                    </motion.div>
                  )}

                  {/* Bubble 2 (Sentinel) */}
                  {(step >= 6) && (
                    <motion.div initial={{ opacity: 0, y: 10, x: 10 }} animate={{ opacity: 1, y: 0, x: 0 }} className="self-end max-w-[85%] flex flex-col items-end mt-2">
                      <div className="flex items-center gap-1.5 mb-1 mr-1">
                        <Bot className="w-3.5 h-3.5 text-[#00D4AA]" />
                        <span className="text-[11px] text-[#00D4AA] font-bold uppercase tracking-widest" style={{ fontFamily: 'Inter, sans-serif' }}>Sentinel</span>
                      </div>
                      <div className="bg-[#00D4AA]/10 border border-[#00D4AA]/20 p-[14px] rounded-[16px] rounded-tr-sm text-[14px] text-white/95 leading-[1.4] shadow-[0_4px_20px_rgba(0,212,170,0.05)]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Sí, tenemos disponibilidad. Te paso opciones, precio y podemos dejarlo agendado ahora.
                      </div>
                    </motion.div>
                  )}

                  {/* Bubble 3 (Customer) */}
                  {(step >= 7) && (
                    <motion.div initial={{ opacity: 0, y: 10, x: -10 }} animate={{ opacity: 1, y: 0, x: 0 }} className="self-start max-w-[85%] mt-2">
                      <div className="bg-[#1A221F] border border-white/5 p-[14px] rounded-[16px] rounded-tl-sm text-[14px] text-white/90 leading-[1.4]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Perfecto, pasame opciones.
                      </div>
                    </motion.div>
                  )}

                  {/* Bubble 4 (Sentinel) */}
                  {(step >= 8) && (
                    <motion.div initial={{ opacity: 0, y: 10, x: 10 }} animate={{ opacity: 1, y: 0, x: 0 }} className="self-end max-w-[85%] flex flex-col items-end mt-2">
                      <div className="bg-[#00D4AA]/10 border border-[#00D4AA]/20 p-[14px] rounded-[16px] rounded-tr-sm text-[14px] text-white/95 leading-[1.4] shadow-[0_4px_20px_rgba(0,212,170,0.05)]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Genial. Te dejo las opciones disponibles y te tomo los datos para avanzar.
                      </div>
                    </motion.div>
                  )}

                  {/* CONSULTA AGENDADA */}
                  <AnimatePresence>
                    {(step >= 9) && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-x-[20px] bottom-[30px] z-20 flex flex-col items-center justify-center bg-[#00D4AA]/10 border border-[#00D4AA]/30 p-[24px] rounded-[16px] backdrop-blur-md shadow-[0_10px_40px_rgba(0,212,170,0.2)]"
                      >
                        <CheckCircle2 className="w-8 h-8 text-[#00D4AA] mb-2" />
                        <span className="text-[24px] font-[900] text-[#00D4AA] tracking-tight leading-none mb-2" style={{ fontFamily: 'Saira, sans-serif' }}>
                          CONSULTA AGENDADA
                        </span>
                        <p className="text-[13px] text-[#00D4AA]/80 text-center leading-[1.3] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Sentinel respondió, resolvió y avanzó<br/>sin esperar a tu equipo.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* FRASE FINAL */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-[40px]"
        >
          <div className="px-[24px] py-[16px] bg-white/5 border border-white/10 rounded-full">
            <p className="text-[15px] md:text-[17px] text-white/80 font-medium text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              Cuando tu equipo no llega, Sentinel responde, vende y agenda.
            </p>
          </div>
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{__html:`
        .glitch-text {
          animation: glitch-anim 2s infinite;
        }
        @keyframes glitch-anim {
          0% { text-shadow: 0 0 0 rgba(0,212,170,0); }
          5% { text-shadow: -2px 0 0 rgba(0,212,170,0.5), 2px 0 0 rgba(255,77,109,0.5); }
          10% { text-shadow: 0 0 0 rgba(0,212,170,0); }
          100% { text-shadow: 0 0 0 rgba(0,212,170,0); }
        }
      `}} />
    </section>
  );
};
