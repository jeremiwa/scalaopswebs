import React from 'react';
import { motion } from 'framer-motion';

export default function ImplementacionProcessAnimation() {
  const steps = [
    { label: "Proceso Caótico", color: "#ef4444" },
    { label: "Análisis & IA", color: "#185de8" },
    { label: "Ecosistema Escalable", color: "#6bdda1" }
  ];

  return (
    <div className="w-full h-[400px] relative bg-[#050505] border border-white/[0.04] rounded-2xl p-6 flex flex-col justify-between overflow-hidden group">
      {/* Background radial soft glows */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#185de8]/10 blur-[50px] transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[#6bdda1]/10 blur-[60px] transition-opacity duration-700 opacity-30 group-hover:opacity-100" />
      
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-2 h-2 rounded-full bg-[#185de8] animate-pulse" />
        <span className="text-[11px] font-bold tracking-widest uppercase text-white/50" style={{ fontFamily: 'var(--font-secondary)' }}>
          System Transformation
        </span>
      </div>

      <div className="relative flex-1 mt-10 w-full flex items-center justify-center z-10">
        <svg viewBox="0 0 300 200" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#185de8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6bdda1" stopOpacity="1" />
            </linearGradient>

            <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Connecting Tube */}
          <path 
            d="M 50 100 Q 150 100 250 100" 
            fill="none" 
            stroke="white" 
            strokeOpacity="0.05" 
            strokeWidth="20" 
            strokeLinecap="round" 
          />
          
          <motion.path 
            d="M 50 100 Q 150 100 250 100" 
            fill="none" 
            stroke="url(#flowGrad)" 
            strokeWidth="4" 
            strokeLinecap="round"
            filter="url(#neon)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1],
              opacity: [0, 1, 0] 
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Nodes */}
          {steps.map((step, i) => {
            const cx = 50 + (i * 100);
            return (
              <g key={i} transform={`translate(${cx}, 100)`}>
                {/* Node Ring */}
                <motion.circle 
                  r="16" 
                  fill="#050505" 
                  stroke={step.color} 
                  strokeWidth="2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                />
                
                {/* Core */}
                <circle r="5" fill={step.color} />

                {/* Floating data particles inside node 2 (AI) */}
                {i === 1 && (
                  <motion.circle
                    r="25"
                    fill="none"
                    stroke="#185de8"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                )}
                
                <text 
                  y={i % 2 === 0 ? -35 : 40} 
                  textAnchor="middle" 
                  fill="white" 
                  fontSize="10" 
                  fontWeight="bold"
                  opacity="0.8"
                  style={{ fontFamily: 'var(--font-secondary)' }}
                >
                  {step.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating tech badge */}
        <motion.div 
          className="absolute -right-4 top-4 bg-[#0A0A0F]/80 backdrop-blur-md border border-white/[0.08] px-3 py-1.5 rounded-full flex items-center gap-2"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#6bdda1] animate-pulse" />
          <span className="text-[10px] text-[#6bdda1] font-bold tracking-wider">SCALA AI AGENT</span>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-white/[0.04] pt-4 mt-4 flex items-center justify-between">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Input</span>
            <span className="text-[12px] text-white font-medium">Caos Manual</span>
          </div>
          <div className="w-px h-8 bg-white/[0.04]" />
          <div className="flex flex-col">
            <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Output</span>
            <span className="text-[12px] text-[#6bdda1] font-bold">Orden & Escala</span>
          </div>
        </div>
      </div>
    </div>
  );
}
