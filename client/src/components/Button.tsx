import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "text";
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  fullWidth = false,
  disabled = false,
}) => {
  const baseStyle =
    "px-6 py-3 rounded-full font-medium transition-all duration-300 transform active:scale-95 text-sm tracking-wide flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-emerald-900 text-white hover:bg-emerald-800 shadow-lg hover:shadow-xl disabled:bg-stone-300 disabled:shadow-none disabled:cursor-not-allowed",
    secondary:
      "bg-white text-emerald-900 border border-emerald-900/20 hover:border-emerald-900 hover:bg-emerald-50",
    outline:
      "bg-transparent border-2 border-white text-white hover:bg-white/10",
    text: "text-emerald-900 hover:text-emerald-700 underline-offset-4 hover:underline px-0",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
