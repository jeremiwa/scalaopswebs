import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-[14px] transition-all duration-200";
  const variants = {
    primary: "bg-scala-green text-white hover:bg-[#059669] px-[18px] py-[14px] shadow-sm",
    secondary: "bg-transparent text-white border border-white/[0.12] hover:bg-white/[0.05] px-[18px] py-[14px]"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
