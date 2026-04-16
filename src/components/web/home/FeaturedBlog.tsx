import React from 'react';
import { Link } from 'react-router-dom';

const articles = [
  {
    category: "Inteligencia Artificial",
    title: "Por qué un Chatbot genérico arruina ventas (y cómo armar un Empleado IA)",
    desc: "Los consumidores detectan la IA barata en 3 segundos. Cómo estructurar agentes que realmente cierren.",
    date: "14 Oct, 2026"
  },
  {
    category: "Procesos Comerciales",
    title: "La regla de los 5 minutos: la métrica que separa a los líderes del resto",
    desc: "Datos duros de por qué contestar después de 30 minutos reduce tu probabilidad de cierre en un 400%.",
    date: "02 Oct, 2026"
  },
  {
    category: "CRM & Ops",
    title: "Arquitectura Handoff: pasando leads de Marketing a Ventas sin fugas",
    desc: "El punto ciego operativo más grande en empresas B2B y cómo solucionarlo con automatizaciones nativas.",
    date: "28 Sep, 2026"
  }
];

export const FeaturedBlog = () => {
  return (
    <section className="py-24 bg-[#030712]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
          <div>
            <span className="block mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-scala-green">Insights & Autoridad</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Conocimiento Operativo.</h2>
          </div>
          <Link to="/web/blog" className="text-white/60 text-[13px] uppercase tracking-widest font-semibold hover:text-white transition-colors flex items-center gap-2">
            Ver todas las publicaciones
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-stagger">
          {articles.map((art, i) => (
            <Link key={i} to="/web/blog" className="group block">
               <div className="w-full aspect-[4/3] bg-[#11111A] rounded-2xl mb-6 border border-white/5 overflow-hidden relative">
                 {/* Abstract visual para el blog */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-scala-green/5 to-transparent group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded bg-black/50 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase text-white/70 border border-white/10">
                      {art.category}
                    </span>
                 </div>
               </div>
               
               <div className="flex flex-col">
                 <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-scala-green transition-colors">{art.title}</h3>
                 <p className="text-white/50 text-[15px] mb-4 line-clamp-2">{art.desc}</p>
                 <span className="text-white/30 text-xs font-medium uppercase tracking-wider">{art.date}</span>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
