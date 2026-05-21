import React from 'react';

export const SentinelLogo = ({ className = "w-6 h-6", variant = "gradient" }: { className?: string, variant?: "gradient" | "white" | "black" }) => {
  const imgSrc = variant === "white" ? "/images/sentinel-logo-white.png" : "/images/sentinel-logo-gradient.png";
  
  return (
    <div className={className} style={{ overflow: 'hidden', position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      <img 
        src={imgSrc} 
        alt="Sentinel Icon" 
        style={{ 
          height: '100%', 
          width: 'auto', 
          maxWidth: 'none',
          objectFit: 'cover',
          objectPosition: 'left center'
        }} 
      />
    </div>
  );
};
