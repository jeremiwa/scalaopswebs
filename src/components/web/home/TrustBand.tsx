import React from 'react';

const brands = [
  'Vertex Digital', 'GangAI', 'Capital Sur', 'Instituto NW', 'Grupo Riviera',
  'Vertex Digital', 'GangAI', 'Capital Sur', 'Instituto NW', 'Grupo Riviera',
  'Vertex Digital', 'GangAI', 'Capital Sur', 'Instituto NW', 'Grupo Riviera',
];

export const TrustBand = () => {
  return (
    <section className="py-10 border-y border-white/[0.04] bg-[#030712]/80 overflow-hidden">
      <div className="container-custom mb-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/20 font-semibold text-center">
          Empresas y negocios que confían en Scala
        </p>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #030712, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #030712, transparent)' }} />

        <div className="flex animate-marquee">
          {brands.map((name, i) => (
            <div key={i} className="flex items-center justify-center px-10 flex-shrink-0">
              <span className="text-[16px] md:text-[18px] font-bold text-white/[0.12] tracking-tight whitespace-nowrap hover:text-white/25 transition-colors duration-500 cursor-default select-none">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee animation CSS */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
