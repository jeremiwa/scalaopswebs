import React from 'react';
import { Link } from 'react-router-dom';

const founders = [
  {
    name: "Founder Uno",
    role: "Co-Founder · Comercial & Growth",
    bio: "Estrategia comercial, posicionamiento y desarrollo de negocio.",
    img: "/images/placeholder-founder1.jpg"
  },
  {
    name: "Founder Dos",
    role: "Co-Founder · Operaciones & Implementación",
    bio: "Procesos, automatizaciones, integraciones y ejecución técnica.",
    img: "/images/placeholder-founder2.jpg"
  }
];

export const Founders = () => {
  return (
    <section className="py-20 bg-[#030712]">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-14 reveal">
          <span className="block mb-4 text-[11px] font-bold tracking-[0.2em] uppercase text-scala-green">Quiénes están detrás</span>
          <h2 className="text-3xl md:text-[40px] font-bold text-white mb-5 tracking-tight leading-tight">
            Scala nace para implementar IA de forma útil, no teórica.
          </h2>
          <p className="text-white/45 text-lg">
            La mayoría de las empresas no necesita más contenido sobre IA. Necesita detectar dónde aplicarla e implementarla bien.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10 reveal-stagger">
          {founders.map((f, i) => (
            <div key={i} className="bg-[#0A0D14] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center group hover:border-white/10 transition-colors">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-5 bg-[#15151F] border border-white/8 relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <img src={f.img} alt={f.name} className="w-full h-full object-cover relative z-10 opacity-0 transition-opacity" onLoad={(e) => (e.currentTarget.style.opacity = '1')} />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight mb-1">{f.name}</h3>
              <p className="text-[11px] font-bold uppercase tracking-widest text-scala-green/80 mb-3">{f.role}</p>
              <p className="text-white/45 text-[14px]">{f.bio}</p>
            </div>
          ))}
        </div>

        <div className="text-center reveal-stagger">
          <Link to="/web/nosotros" className="text-white/40 text-[13px] uppercase tracking-widest font-semibold hover:text-white transition-colors inline-flex items-center gap-2">
            Conocer más sobre Scala <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
