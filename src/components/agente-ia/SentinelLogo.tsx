import React from 'react';

export const SentinelLogo = ({ className = "w-6 h-6", style }: { className?: string, style?: React.CSSProperties }) => (
  <svg 
    className={className} 
    style={style}
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="sentinel-grad-logo" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0066FF" />
        <stop offset="100%" stop-color="#00D4AA" />
      </linearGradient>
    </defs>
    {/* Blue/Top part */}
    <path 
      d="M4 12 V 6 L 12 3 L 20 6 V 10 L 10 14 H 5" 
      stroke="url(#sentinel-grad-logo)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    {/* Green/Bottom part */}
    <path 
      d="M20 12 V 15 C 20 18 12 21 12 21 C 12 21 4 18 4 15 V 10 L 14 6 H 19" 
      stroke="url(#sentinel-grad-logo)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);
