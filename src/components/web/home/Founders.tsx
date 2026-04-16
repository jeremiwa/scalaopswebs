import React from 'react';

const founders = [
  {
    name: "Founder Uno",
    role: "Co-Founder · Comercial & Growth",
    bio: "Lidera estrategia comercial, posicionamiento y desarrollo de negocio. Experto en diseñar modelos de adquisición y escalabilidad operativa.",
    img: "/images/placeholder-founder1.jpg" // A la espera de la foto real
  },
  {
    name: "Founder Dos",
    role: "Co-Founder · Operaciones & Implementación",
    bio: "Lidera mapeo de procesos, automatizaciones complejas e implementación tecnológica. Orquesta sistemas de IA y CRMs escalables.",
    img: "/images/placeholder-founder2.jpg" // A la espera de la foto real
  }
];

export const Founders = () => {
  return (
    <section className="py-24 bg-[#0A0A0F] border-t border-white/5">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center reveal">
          <span className="block mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-scala-green">Equipo Fundador</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Scala nació viendo repetirse el mismo problema una y otra vez.
          </h2>
          <p className="text-xl text-white/50 leading-relaxed font-light mb-16">
            Negocios con excelente producto, alta demanda y equipo talentoso, pero perdiendo capital constante por procesos oscuros, falta de seguimiento profesional y ausencia de sistema tecnológico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto reveal-stagger">
          {founders.map((f, i) => (
            <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left group">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full md:rounded-[32px] overflow-hidden mb-8 bg-[#15151F] border border-white/10 relative shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500">
                 {/* Fallback avatar shape for placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <svg className="w-24 h-24 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                 </div>
                 {/* Real Image (when provided) will cover the SVG */}
                 <img src={f.img} alt={f.name} className="w-full h-full object-cover relative z-10 opacity-0 transition-opacity duration-300" onLoad={(e) => (e.currentTarget.style.opacity = '1')} />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mb-2">{f.name}</h3>
              <p className="text-[13px] font-bold uppercase tracking-widest text-scala-green mb-4">{f.role}</p>
              <p className="text-white/50 text-[15px] leading-relaxed max-w-sm">{f.bio}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center border-t border-white/5 pt-12">
          <p className="text-2xl font-light italic text-white/80">"Scala une visión comercial direccional con ejecución operativa implacable."</p>
        </div>
      </div>
    </section>
  );
};
