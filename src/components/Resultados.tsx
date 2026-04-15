import { motion } from 'framer-motion';

export const Resultados = () => {
  const testimonials = [
    {
      name: "Martín S.",
      role: "Director Comercial · Real Estate",
      image: "/images/martin.jpg",
      quote: "Dejamos de perder leads por contestar tarde. Hoy cada oportunidad tiene un camino claro desde el primer mensaje hasta el cierre o el descarte.",
      before1: "Respuestas en +4hs",
      now1: "Respuestas en <5min",
      before2: "Sin proceso de venta",
      now2: "Proceso con 5 etapas claras",
      days: 27
    },
    {
      name: "Laura G.",
      role: "CEO · Agencia B2B",
      image: "/images/laura.jpg",
      quote: "Por primera vez sabemos exactamente por qué se caen las ventas. Antes era todo intuición. Ahora tenemos datos.",
      before1: "0 visibilidad de métricas",
      now1: "Tablero de perdidas en vivo",
      before2: "Seguimiento manual",
      now2: "Automatizado con alertas",
      days: 30
    }
  ];

  return (
    <section id="resultados" className="border-y border-white/[0.03]" style={{ background: '#0C0C14', borderTop: '1px solid rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', padding: '130px 0' }}>
      {/* Decorative divider top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #22C55E, transparent)' }}></div>

      <div className="container-custom relative z-10 flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14 reveal">
          <span className="mb-4 block" style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#22C55E' }}>
            RESULTADOS REALES
          </span>
          <h2 style={{ fontSize: '48px', fontWeight: 700, color: '#F5F5F7', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: '16px' }}>
            Negocios que dejaron de perder ventas.
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-[1000px] reveal-stagger">
          {testimonials.map((testial, i) => (
            <div
              key={i}
              className="bg-[#111116] border-l-[3px] border-[#22C55E] border-y border-r rounded-[18px] p-8 md:p-10 flex flex-col items-start relative card-hover overflow-hidden"
              style={{ borderColor: undefined, borderLeftColor: '#22C55E', borderTopColor: 'rgba(255,255,255,0.05)', borderRightColor: 'rgba(255,255,255,0.05)', borderBottomColor: 'rgba(255,255,255,0.05)' }}
            >
              {/* Watermark quote */}
              <div className="absolute top-4 right-6 text-[80px] font-serif leading-none text-[rgba(34,197,94,0.06)] pointer-events-none select-none">"</div>

              {/* Profile */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-[56px] h-[56px] rounded-full border-[2px] border-white/10 bg-[#1A222C] flex items-center justify-center overflow-hidden shrink-0">
                  <img src={testial.image} alt={testial.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = `<span class="text-[#8B8B9E] font-medium text-lg">${testial.name.charAt(0)}</span>`; }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-medium text-[#F5F5F7]">{testial.name}</span>
                  <span className="text-[14px]" style={{ color: 'rgba(203,213,225,0.68)' }}>{testial.role}</span>
                </div>
              </div>

              {/* Quote */}
              <p className="text-[16px] md:text-[17px] text-[#F5F5F7] leading-[1.6] font-normal mb-8 italic relative z-10">
                "{testial.quote}"
              </p>

              {/* Before/After */}
              <div className="w-full mb-8">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-[15px]">
                    <span className="text-[#5A5A6E] line-through decoration-[#1A222C] decoration-2 w-[40%] truncate">{testial.before1}</span>
                    <span className="text-[#22C55E] shrink-0">→</span>
                    <span className="text-[#F5F5F7] font-medium w-[55%] truncate">{testial.now1}</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/[0.04]"></div>
                  <div className="flex items-center gap-3 text-[15px]">
                    <span className="text-[#5A5A6E] line-through decoration-[#1A222C] decoration-2 w-[40%] truncate">{testial.before2}</span>
                    <span className="text-[#22C55E] shrink-0">→</span>
                    <span className="text-[#F5F5F7] font-medium w-[55%] truncate">{testial.now2}</span>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="mt-auto bg-[#22C55E]/8 px-4 py-1.5 rounded-full border border-[#22C55E]/20">
                <span className="text-[#22C55E] text-[13px] font-semibold tracking-wide">
                  Implementado en {testial.days} días
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
