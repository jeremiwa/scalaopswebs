import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: '¿Sentinel reemplaza a mis vendedores?',
    a: 'No necesariamente. Sentinel ayuda a que tu equipo no pierda oportunidades. Responde, filtra y sigue clientes para que los vendedores lleguen a conversaciones más ordenadas.',
  },
  {
    q: '¿Es igual que ManyChat o un bot tradicional?',
    a: 'No. Un bot tradicional suele funcionar con reglas o flujos rígidos. Sentinel está pensado como un empleado IA conversacional, entrenado con información de tu negocio y orientado al proceso comercial.',
  },
  {
    q: '¿Puede equivocarse?',
    a: 'Como toda IA, puede requerir ajustes. Por eso se configura, se prueba y se entrena antes de dejarlo funcionando.',
  },
  {
    q: '¿Qué pasa si el cliente pregunta algo muy específico?',
    a: 'Sentinel puede derivar la conversación a una persona de tu equipo cuando corresponde.',
  },
  {
    q: '¿En cuánto tiempo puede estar funcionando?',
    a: 'Depende de la información disponible y del alcance, pero la idea es que pueda estar funcionando en pocos días.',
  },
  {
    q: '¿Necesito saber de tecnología?',
    a: 'No. Scala se encarga de la implementación técnica y de dejar el sistema preparado para operar.',
  },
  {
    q: '¿El precio es final?',
    a: 'USD 997 es el precio lanzamiento de implementación. Si hay costos de plataformas externas, mantenimiento o herramientas adicionales, se informan antes de avanzar.',
  },
  {
    q: '¿Sirve si recibo pocas consultas?',
    a: 'Si recibís muy pocas consultas, probablemente no sea la prioridad. Sentinel tiene más sentido cuando ya hay oportunidades entrando y querés dejar de perderlas.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative border-t border-white/[0.03]" style={{ background: '#020202', padding: '100px 0' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #6bdda1, transparent)' }} />

      <div className="container-custom relative z-10 flex flex-col items-center">
        <div className="text-center mb-10 md:mb-14 reveal">
          <span className="mb-4 block" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#6B6B80' }}>
            Dudas frecuentes
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 46px)', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.08 }}>
            Preguntas antes de implementar.
          </h2>
        </div>

        <div className="w-full max-w-[680px] reveal-stagger">
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className={`border-b border-white/[0.06] py-6 cursor-pointer ${i === 0 ? 'border-t' : ''}`}
              style={{ minHeight: '44px' }}
            >
              <div className="flex justify-between items-center text-[17px] font-medium text-[#F5F5F7] group">
                <span className="group-hover:text-white transition-colors pr-4">{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={`text-[#5A5A6E] transition-transform duration-300 shrink-0 ${openIndex === i ? 'rotate-180 text-[#6bdda1]' : ''}`}
                />
              </div>
              <div
                className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] text-[15px] leading-[1.6]"
                style={{
                  maxHeight: openIndex === i ? '250px' : '0px',
                  opacity: openIndex === i ? 1 : 0,
                  paddingTop: openIndex === i ? '12px' : '0px',
                  color: 'rgba(203,213,225,0.72)',
                }}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
