import React from 'react';

export const TrustBand = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-[#030712]/50">
      <div className="container-custom flex flex-col items-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold mb-10 text-center">
          Empresas que escalan su sistema comercial con nosotros
        </p>
        
        {/* Usamos un grid horizontal sutil para los logos/nombres */}
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          
          {/* Logo Placerholders - Diseño Tipográfico Sólido */}
          {['TECHCORP', 'NEXOVA', 'ACUITY', 'ZENITH', 'LUXESTATE', 'OMNIA'].map((company, i) => (
            <div key={i} className="flex items-center gap-2 group cursor-default">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-scala-green/30 transition-colors">
                 <span className="text-white/40 text-[10px] font-bold group-hover:text-scala-green transition-colors flex">-</span>
              </div>
              <span className="text-white/50 text-xl font-black tracking-tighter uppercase group-hover:text-white transition-colors">
                {company}
              </span>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};
