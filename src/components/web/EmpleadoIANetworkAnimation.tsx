import React from 'react';
import { motion } from 'framer-motion';

export default function EmpleadoIANetworkAnimation() {
  const messages = [
    { text: "Me interesa la implementación", time: "10:24" },
    { text: "Lead capturado. Evaluando...", time: "10:24", isAi: true },
    { text: "Scoring: Alto. Derivando a equipo.", time: "10:24", isAi: true }
  ];

  return (
    <div className="w-full max-w-[500px] h-[550px] relative rounded-3xl border border-white/[0.04] bg-[#020202] p-8 flex flex-col justify-between overflow-hidden shadow-[0_0_100px_rgba(24,93,232,0.1)]">
      {/* Glows */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#185de8]/15 blur-[60px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#6bdda1]/10 blur-[80px] pointer-events-none rounded-full" />

      {/* Header UI */}
      <div className="flex items-center justify-between z-10 relative mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0A0A0F] border border-white/[0.06] flex items-center justify-center relative shadow-[0_0_15px_rgba(107,221,161,0.2)]">
            <div className="w-4 h-4 rounded-full bg-[#6bdda1] animate-pulse" />
          </div>
          <div>
            <div className="text-[14px] font-bold text-white tracking-wide" style={{ fontFamily: 'var(--font-primary)' }}>Scala AI Agent</div>
            <div className="text-[11px] text-[#6bdda1] font-medium tracking-wider uppercase">Operativo 24/7</div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((_, i) => (
            <motion.div 
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#185de8]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 space-y-4 relative z-10 w-full mb-8">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.isAi ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 1.5 }}
            className={`flex flex-col max-w-[85%] ${msg.isAi ? 'items-start self-start' : 'items-end self-end ml-auto'}`}
          >
            <div className={`p-4 rounded-2xl text-[14px] leading-relaxed shadow-lg ${
              msg.isAi 
                ? 'bg-[#0A0A0F] border border-[#185de8]/20 text-[#A0A0B5] rounded-tl-none' 
                : 'bg-[#185de8] text-white rounded-tr-none'
            }`}>
              {msg.text}
            </div>
            <span className="text-[10px] text-white/30 mt-2 tracking-wider">{msg.time}</span>
          </motion.div>
        ))}
      </div>

      {/* CRM Pipeline Visualization */}
      <div className="relative z-10 w-full bg-[#050505] border border-white/[0.04] rounded-xl p-5 overflow-hidden group">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#6bdda1] to-transparent opacity-30" />
        <div className="flex justify-between items-center mb-6">
          <span className="text-[11px] font-bold text-white/50 tracking-wider uppercase">Integración CRM</span>
          <span className="text-[11px] text-[#6bdda1]">Lead Calificado</span>
        </div>
        <div className="relative h-[2px] bg-white/[0.04] w-full rounded-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full w-[30%] bg-gradient-to-r from-[#185de8] to-[#6bdda1] rounded-full"
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div className="w-[30%] h-8 rounded-md bg-[#185de8]/10 border border-[#185de8]/20" />
          <div className="w-[30%] h-8 rounded-md bg-[#6bdda1]/10 border border-[#6bdda1]/20 shadow-[0_0_10px_rgba(107,221,161,0.1)]" />
          <div className="w-[30%] h-8 rounded-md bg-white/[0.02] border border-white/[0.04]" />
        </div>
      </div>

    </div>
  );
}
