import React from 'react';

export const TargetAudience = () => {
  const channels = ['WhatsApp', 'Instagram', 'Formularios web', 'Llamadas', 'CRM', 'Sistemas internos'];
  const businesses = ['Servicios B2B', 'Clínicas y estética', 'Real Estate', 'Educación y mentorías', 'Equipos comerciales', 'Negocios high-ticket'];

  return (
    <section className="py-20 bg-[#0A0A0F] border-y border-white/5">
      <div className="container-custom">
        <div className="text-center mb-14 reveal">
          <h2 className="text-3xl md:text-[40px] font-bold text-white tracking-tight">Dónde aplicamos IA</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-3xl mx-auto reveal-stagger">
          {/* Canales */}
          <div>
            <h3 className="text-[12px] font-bold text-white/30 uppercase tracking-[0.18em] mb-6">Canales</h3>
            <div className="flex flex-col gap-3">
              {channels.map((ch) => (
                <div key={ch} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-scala-green flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-white/65 text-[15px]">{ch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Negocios */}
          <div>
            <h3 className="text-[12px] font-bold text-white/30 uppercase tracking-[0.18em] mb-6">Negocios</h3>
            <div className="flex flex-col gap-3">
              {businesses.map((biz) => (
                <div key={biz} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-scala-green flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-white/65 text-[15px]">{biz}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
