import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Timer, BellOff, Inbox } from 'lucide-react';

export const DolorSimple = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="w-full bg-[#000000] py-[64px] md:py-[100px] flex flex-col items-center">
      <div className="container-custom px-[20px] w-full max-w-[800px] mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-[40px]"
        >
          <h2 className="text-[clamp(28px,6vw,44px)] font-[800] text-white leading-[1.1] tracking-tight mb-[16px]" style={{ fontFamily: 'Saira, sans-serif' }}>
            Esto es lo que pasa cuando nadie responde a tiempo.
          </h2>
          <p className="text-[clamp(15px,3.5vw,18px)] text-white/70 leading-[1.4]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Cada consulta que queda esperando puede transformarse en una venta perdida.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-[16px] w-full">
          {[
            {
              icon: <Timer className="w-6 h-6 text-[#00D4AA]" />,
              title: "Respuesta lenta",
              text: "Cuando contestás, ya compró en otro lado."
            },
            {
              icon: <BellOff className="w-6 h-6 text-[#00D4AA]" />,
              title: "Seguimiento olvidado",
              text: "Pidió precio y nadie volvió a escribirle."
            },
            {
              icon: <Inbox className="w-6 h-6 text-[#00D4AA]" />,
              title: "Equipo saturado",
              text: "Tus vendedores hacen lo que pueden."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="flex items-center gap-[16px] p-[20px] rounded-[16px] w-full"
              style={{
                background: '#080C0B',
                border: '1px solid rgba(255,255,255,0.10)',
                minHeight: '105px'
              }}
            >
              <div className="w-[48px] h-[48px] shrink-0 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-[17px] font-bold text-white mb-[2px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-[14px] text-white/60 leading-[1.3]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
