import React from 'react';

const brands = [
  'Vertex Digital', 'GangAI', 'Capital Sur', 'Instituto NW', 'Grupo Riviera',
  'Vertex Digital', 'GangAI', 'Capital Sur', 'Instituto NW', 'Grupo Riviera',
  'Vertex Digital', 'GangAI', 'Capital Sur', 'Instituto NW', 'Grupo Riviera',
];

export const TrustBand = () => {
  return (
    <section className="py-10 border-y border-white/[0.04] bg-[#000] overflow-hidden">
      <div className="container-custom mb-6">
        <p className="text-[12px] uppercase tracking-widest text-[#0055FF] font-bold text-center" style={{ fontFamily: 'var(--font-primary)' }}>
          / EMPRESAS Y NEGOCIOS QUE CONFÍAN EN SCALA
        </p>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #000, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #000, transparent)' }} />

        <div className="flex animate-marquee">
          {brands.map((name, i) => (
            <div key={i} className="flex items-center justify-center px-12 flex-shrink-0">
              <span className="text-[20px] font-bold text-white/[0.15] tracking-wide whitespace-nowrap hover:text-white/30 transition-colors duration-500 cursor-default select-none" style={{ fontFamily: 'var(--font-primary)' }}>{name}</span>
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
