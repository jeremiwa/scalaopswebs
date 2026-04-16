import React from 'react';
import { Link } from 'react-router-dom';

const articles = [
  {
    category: "Agentes IA",
    title: "Qué puede hacer un agente IA en una empresa hoy",
    desc: "Casos concretos en ventas, atención y soporte."
  },
  {
    category: "Automatización",
    title: "Qué procesos conviene automatizar primero con IA",
    desc: "Dónde suele estar el mayor retorno al empezar."
  },
  {
    category: "CRM & IA",
    title: "CRM con IA: qué cambia realmente",
    desc: "Menos intuición, más visibilidad y mejores decisiones."
  }
];

export const FeaturedBlog = () => {
  return (
    <section className="py-24 bg-[#0A0A0F] border-t border-white/5">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4 reveal">
          <div>
            <span className="block mb-4 text-[11px] font-bold tracking-[0.2em] uppercase text-scala-green">Insights de IA</span>
            <h2 className="text-3xl md:text-[40px] font-bold text-white tracking-tight leading-tight">IA aplicada a empresas, explicada con claridad.</h2>
            <p className="text-white/45 text-lg mt-3">Ideas, casos y aprendizajes para implementar IA en negocios reales.</p>
          </div>
          <Link to="/web/blog" className="text-white/40 text-[12px] uppercase tracking-widest font-bold hover:text-white transition-colors flex items-center gap-2 flex-shrink-0">
            Ver todos los artículos <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-stagger">
          {articles.map((art, i) => (
            <Link key={i} to="/web/blog" className="group block">
              <div className="w-full aspect-[5/3] bg-[#06080E] rounded-2xl mb-5 border border-white/5 overflow-hidden relative group-hover:border-white/10 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-scala-green/[0.04] to-transparent group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-black/40 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase text-white/60 border border-white/8">
                    {art.category}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-scala-green transition-colors tracking-tight">{art.title}</h3>
              <p className="text-white/40 text-[14px]">{art.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
