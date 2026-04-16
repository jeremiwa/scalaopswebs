import React from 'react';

export const TargetAudience = () => {
  return (
    <section className="py-24 bg-[#0A0A0F]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Grupo 1: Canales */}
          <div className="reveal">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 tracking-tight flex items-center gap-4">
              <span className="w-8 h-[2px] bg-scala-green hidden md:block"></span>
              Ideal para negocios que venden por
            </h3>
            <div className="flex flex-wrap gap-4">
              {['WhatsApp', 'Instagram', 'Formularios web', 'Llamadas agendadas'].map((canal) => (
                <div key={canal} className="px-6 py-3 rounded-full bg-white/[0.03] border border-white/5 text-white/70 text-sm font-medium shadow-sm hover:border-white/10 hover:bg-white/[0.05] transition-colors cursor-default">
                  {canal}
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Divider for Desktop, Horizontal for Mobile */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

          {/* Grupo 2: Industrias/Sectores */}
          <div className="reveal-stagger">
             <h3 className="text-xl md:text-2xl font-bold text-white mb-8 tracking-tight flex items-center gap-4">
              <span className="w-8 h-[2px] bg-scala-green hidden md:block"></span>
              Trabajamos especialmente con
            </h3>
             <div className="flex flex-col gap-3">
               {[
                 { title: 'Servicios B2B', desc: 'Agencias, consultoras y empresas de software.' },
                 { title: 'Educación & Mentorías', desc: 'Academias online, infoproductos y coaching.' },
                 { title: 'Real Estate', desc: 'Inmobiliarias comerciales y residenciales.' },
                 { title: 'Salud & Estética', desc: 'Clínicas, centros médicos y odontológicos.' },
                 { title: 'Ofertas High-Ticket', desc: 'Ventas consultivas complejas de alto valor.' },
               ].map((rubro) => (
                 <div key={rubro.title} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                   <div className="w-2 h-2 rounded-full bg-scala-green mt-2 shadow-[0_0_8px_rgba(34,197,94,0.6)] flex-shrink-0"></div>
                   <div>
                     <h4 className="text-white font-semibold text-[15px]">{rubro.title}</h4>
                     <p className="text-white/40 text-sm mt-1">{rubro.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
