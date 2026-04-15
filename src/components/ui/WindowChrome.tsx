import React from 'react';

interface WindowChromeProps {
  children: React.ReactNode;
  className?: string;
}

export const WindowChrome: React.FC<WindowChromeProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-scala-card border border-white/[0.08] rounded-[16px] overflow-hidden shadow-lg ${className}`}>
      {/* Chrome Header */}
      <div className="h-10 bg-white/[0.03] border-b border-white/[0.08] flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
      </div>
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};
