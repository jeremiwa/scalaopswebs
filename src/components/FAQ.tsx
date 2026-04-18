import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => { setOpenIndex(openIndex === index ? null : index); };

  const faqs = [
    {
      q: "¿Qué resultados puedo esperar?",
      a: "Depende del punto de partida de tu negocio, pero estos son los cambios más comunes que vemos en los primeros 30 a 60 días:\n\n— Tiempo de primera respuesta baja de horas a minutos.\n— Tasa de seguimiento sube de menos del 20% a más del 80%.\n— El equipo deja de perder leads por falta de proceso.\n— Tenés visibilidad real de cuánto entra, cuánto se cierra y por qué se pierden ventas.\n— La tasa de cierre mejora entre un 40% y un 200% dependiendo de qué tan desordenado esté el proceso actual.\n\nNo prometemos un número mágico porque cada negocio arranca desde un lugar distinto. Lo que sí te garantizamos: después de la primera semana vas a saber exactamente cuánto estás perdiendo y por qué."
    },
    {
      q: "¿En cuánto tiempo veo resultados?",
      a: "Los primeros cambios los ves en la primera semana, cuando te mostramos el diagnóstico con datos reales de tu operación. La implementación completa tarda 30 días. La mayoría de los negocios ven mejoras en métricas clave (tiempo de respuesta, tasa de seguimiento, visibilidad) antes del día 15."
    },
    {
      q: "¿Cuánto cuesta?",
      a: "Cada proyecto se cotiza después de una llamada inicial gratuita donde analizamos tu situación y te decimos si podemos ayudarte. El costo depende del tamaño de tu equipo y la complejidad de tu operación. Lo que sí te podemos decir: el costo de SCALA se recupera en el primer o segundo mes con las ventas que hoy se te están escapando."
    },
    {
      q: "¿Y si mi equipo no quiere cambiar la forma de trabajar?",
      a: "Es lo más común y lo tenemos en cuenta desde el día 1. No le tiramos un manual encima a tu equipo. Trabajamos con ellos, los entrenamos con sus propios casos reales, y les mostramos con datos por qué el nuevo proceso funciona mejor. Cuando ven que cierran más y trabajan más ordenados, la resistencia desaparece sola."
    },
    {
      q: "¿El agente IA puede manejar audios y notas de voz?",
      a: "Sí. El agente transcribe y procesa audios y notas de voz automáticamente. Responde en texto con contexto de lo que el lead dijo en el audio. Si la conversación requiere intervención humana, la deriva a tu equipo con el resumen completo."
    },
    {
      q: "¿Necesito seguir pagando después de los 30 días?",
      a: "Lo que armamos en los 30 días es tuyo: el proceso, los guiones, las automatizaciones, el tablero de métricas. Queda todo funcionando en tu negocio. Si querés que sigamos optimizando o que mantengamos el agente IA activo, hay planes de continuidad opcionales. Pero no hay permanencia obligatoria."
    },
    {
      q: "¿Funciona si vendo por llamada, no solo por chat?",
      a: "Sí. SCALA funciona para cualquier equipo comercial que venda high ticket, ya sea por WhatsApp, Instagram, llamada telefónica o reuniones presenciales. El proceso de venta, el seguimiento y las métricas aplican igual sin importar el canal."
    },
    {
      q: "¿Qué pasa si no funciona?",
      a: "Si en la llamada inicial vemos que tu negocio no tiene un problema comercial que podamos resolver, te lo decimos directamente. No tomamos proyectos donde no podamos generar un impacto claro. La llamada es gratuita y sin compromiso — es nuestra forma de verificar que podemos ayudarte antes de que pongas un peso."
    }
  ];

  return (
    <section className="relative border-t border-white/[0.03]" style={{ background: '#020202', padding: '100px 0' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #6bdda1, transparent)' }}></div>
      <div className="container-custom relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 reveal">
          <span className="mb-4 block" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#6B6B80' }}>DUDAS FRECUENTES</span>
          <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '16px' }}>Preguntas que nos hacen.</h2>
        </div>
        <div className="w-full max-w-[680px] reveal-stagger">
          {faqs.map((faq, i) => (
            <div key={i} onClick={() => toggleFaq(i)} className={`faq-item border-b border-white/[0.06] py-6 cursor-pointer ${i === 0 ? 'border-t' : ''} ${openIndex === i ? 'open' : ''}`}>
              <div className="flex justify-between items-center text-[17px] font-medium text-[#F5F5F7] group">
                <span className="group-hover:text-white transition-colors">{faq.q}</span>
                <ChevronDown size={20} className={`faq-chevron text-[#5A5A6E] transition-transform duration-300 shrink-0 ml-4 ${openIndex === i ? 'rotate-180 text-[#6bdda1]' : ''}`} />
              </div>
              <div className="faq-answer overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] text-[15px] leading-[1.6]" style={{ maxHeight: openIndex === i ? '300px' : '0px', opacity: openIndex === i ? 1 : 0, paddingTop: openIndex === i ? '12px' : '0px', color: 'rgba(203,213,225,0.72)' }}>
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
