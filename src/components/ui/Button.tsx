import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 relative overflow-hidden group cursor-pointer text-center";
  
  if (variant === 'primary') {
    return (
      <button 
        className={`btn-hover-scale ${baseStyles} ${className}`} 
        style={{ 
          background: 'linear-gradient(90deg, #185de8, #6bdda1)', 
          padding: '16px 36px', 
          borderRadius: '100px', 
          fontFamily: 'var(--font-primary)', 
          fontWeight: 800, 
          fontSize: '15px', 
          color: '#000000',
          boxShadow: '0 0 40px rgba(107,221,161,0.1)',
          border: 'none',
          ...props.style
        }} 
        {...props}
      >
        <div className="absolute inset-0 bg-white/20 skew-x-[-20deg] animate-shimmer-btn" style={{ width: '30%', transition: 'all 0.8s ease' }} />
        <span className="relative z-10">{children}</span>
      </button>
    );
  }

  // secondary
  return (
    <button 
      className={`${baseStyles} bg-transparent text-white border border-white/[0.12] hover:bg-white/[0.05] px-[18px] py-[14px] rounded-[100px] font-bold ${className}`} 
      style={{ fontFamily: 'var(--font-primary)', ...props.style }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};
