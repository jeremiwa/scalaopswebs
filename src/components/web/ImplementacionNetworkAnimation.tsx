import React from 'react';
import { motion } from 'framer-motion';

export default function ImplementacionNetworkAnimation() {
  const nodes = [
    { id: 'lead', label: 'Lead Entry', x: 20, y: 50, color: '#185de8' },
    { id: 'scoring', label: 'AI Scoring', x: 120, y: 15, color: '#6bdda1' },
    { id: 'crm', label: 'CRM Sync', x: 120, y: 85, color: '#6bdda1' },
    { id: 'followup', label: 'Auto Follow-up', x: 220, y: 15, color: '#185de8' },
    { id: 'sales', label: 'Sales Rep', x: 220, y: 85, color: '#6bdda1' },
    { id: 'close', label: 'Closed Won', x: 320, y: 50, color: '#22c55e' },
  ];

  const paths = [
    { d: 'M 30 50 Q 75 15 110 20', from: 'lead', to: 'scoring' },
    { d: 'M 30 50 Q 75 85 110 80', from: 'lead', to: 'crm' },
    { d: 'M 130 20 Q 175 15 210 20', from: 'scoring', to: 'followup' },
    { d: 'M 130 80 Q 175 85 210 80', from: 'crm', to: 'sales' },
    { d: 'M 220 25 Q 220 50 220 75', from: 'followup', to: 'sales', dashed: true },
    { d: 'M 230 80 Q 275 80 310 55', from: 'sales', to: 'close' },
    { d: 'M 230 20 Q 275 20 310 45', from: 'followup', to: 'close', dashed: true },
  ];

  const pulseVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: [0, 1, 1],
      opacity: [0, 1, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 0.5,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative p-8">
      <div className="relative w-full max-w-[500px] aspect-[16/10]">
        
        {/* Glows bg */}
        <div className="absolute top-0 right-10 w-[200px] h-[200px] bg-[#185de8]/10 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[200px] h-[200px] bg-[#6bdda1]/10 blur-[60px] rounded-full pointer-events-none" />

        <svg viewBox="0 0 350 120" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#185de8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#6bdda1" stopOpacity="0.8" />
            </linearGradient>
            
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Base Paths */}
          {paths.map((p, i) => (
            <path 
              key={`base-${i}`}
              d={p.d}
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.04"
              strokeWidth="1.5"
              strokeDasharray={p.dashed ? "4 4" : "none"}
            />
          ))}

          {/* Animated Pulses */}
          {paths.map((p, i) => (
            <motion.path 
              key={`pulse-${i}`}
              d={p.d}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#glow)"
              variants={pulseVariants}
              initial="initial"
              animate="animate"
              // Stagger paths slightly depending on index logic to look organic
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}

          {/* Nodes */}
          {nodes.map((node, i) => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              {/* Node Outer Ripple */}
              <motion.circle 
                r="6"
                fill={node.color}
                opacity="0.2"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 2.5, 1], opacity: [0.2, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
              
              {/* Node Outer Ring */}
              <circle r="4.5" fill="#0A0A0F" stroke={node.color} strokeWidth="1.5" />
              
              {/* Node Inner Core */}
              <circle r="2" fill={node.color} />

              <motion.text 
                y="-12"
                textAnchor="middle"
                fill="#888"
                fontSize="6"
                fontWeight="600"
                style={{ fontFamily: 'var(--font-secondary)' }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: -12 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.8 }}
              >
                {node.label}
              </motion.text>
            </g>
          ))}
        </svg>

        {/* Dashboard floating elements */}
        <motion.div 
          className="absolute -right-4 -top-6 rounded-xl bg-[#080808] border border-white/[0.06] p-3 flex items-center gap-3 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="w-7 h-7 rounded-full bg-[#185de8]/10 border border-[#185de8]/20 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-[#185de8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <div className="text-[9px] font-bold tracking-wider uppercase text-white/50 mb-0.5" style={{ fontFamily: 'var(--font-secondary)' }}>System Health</div>
            <div className="text-[13px] font-bold text-white leading-none" style={{ fontFamily: 'var(--font-primary)' }}>100% Sync</div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute -left-6 bottom-4 rounded-xl bg-[#080808] border border-white/[0.06] p-3 flex flex-col gap-1.5 backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.9, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="text-[9px] font-bold tracking-wider uppercase text-[#6bdda1]" style={{ fontFamily: 'var(--font-secondary)' }}>Automation</div>
          <div className="flex gap-1" style={{ width: '60px' }}>
            <div className="h-1.5 bg-[#6bdda1] rounded-full w-[80%]"/>
            <div className="h-1.5 bg-white/10 rounded-full w-[20%]"/>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
