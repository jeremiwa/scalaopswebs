import React from 'react';

export const TrustBand = () => {
  const sectors = ['Servicios B2B', 'Educación', 'Real Estate', 'Clínicas', 'High-Ticket', 'Equipos comerciales'];

  return (
    <section className="py-14 border-y border-white/5 bg-[#030712]/60">
      <div className="container-custom flex flex-col items-center gap-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-semibold text-center">
          Trabajamos con empresas de distintos sectores
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {sectors.map((sector) => (
            <span key={sector} className="px-5 py-2 rounded-full bg-white/[0.025] border border-white/6 text-white/50 text-[13px] font-medium tracking-wide hover:border-white/12 hover:text-white/70 transition-colors cursor-default">
              {sector}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
