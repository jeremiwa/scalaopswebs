import React from 'react';

const steps = [
  {
    num: "01",
    title: "Diagnóstico",
    desc: "Escuchamos llamadas, revisamos chats, analizamos seguimiento y detectamos fugas reales de capital."
  },
  {
    num: "02",
    title: "Diseño",
    desc: "Definimos proceso de punta a punta, responsables, automatizaciones clave, guiones y métricas objetivo."
  },
  {
    num: "03",
    title: "Implementación",
    desc: "Lo dejamos estructurado y funcionando dentro de la operación real del negocio."
  },
  {
    num: "04",
    title: "Entrenamiento",
    desc: "Alineamos al equipo de ventas para que trabajen con un nuevo estándar comercial superior."
  },
  {
    num: "05",
    title: "Optimización",
    desc: "Medimos la conversión, corregimos desvíos y mejoramos agresivamente basándonos en datos."
  }
];

export const Methodology = () => {
  return (
    <section className="py-32 bg-[#030712] relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-24 reveal">
          <span className="block mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-scala-green">Cómo Trabajamos</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">El Método Scala</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">No somos consultoría de PDF. Somos una unidad operativa externa que entra a tu empresa e instala un sistema que factura.</p>
        </div>

        {/* Timeline Desktop Interactivo */}
        <div className="max-w-4xl mx-auto relative hidden md:block">
          {/* Línea central */}
          <div className="absolute left-[38px] top-4 bottom-4 w-px bg-white/10 hidden md:block"></div>
          
          <div className="flex flex-col gap-16">
            {steps.map((step, i) => (
               <div key={i} className="relative flex gap-12 group reveal-stagger">
                 <div className="relative z-10 w-20 h-20 rounded-full bg-[#0A0A0F] border-2 border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-scala-green group-hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-500">
                    <span className="text-xl font-bold text-white group-hover:text-scala-green transition-colors">{step.num}</span>
                 </div>
                 <div className="pt-4 pb-8 border-b border-white/5 flex-grow group-hover:border-white/20 transition-colors">
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                    <p className="text-lg text-white/50 leading-relaxed font-light">{step.desc}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col gap-8 reveal">
          {steps.map((step, i) => (
             <div key={i} className="bg-[#0A0A0F] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-4xl font-black text-white/[0.03] select-none">{step.num}</span>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
                <p className="text-white/50 text-sm relative z-10">{step.desc}</p>
             </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};
