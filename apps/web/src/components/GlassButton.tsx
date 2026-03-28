import type { ButtonHTMLAttributes, ReactNode } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3 text-base rounded-xl",
};

const variantClasses = {
  default: "glass-button text-[var(--color-text)]",
  primary: "glass-button glass-button-primary",
  danger:
    "glass-button bg-red-500/85 text-white border-red-400/40 hover:bg-red-500/95",
};

export default function GlassButton({
  variant = "default",
  size = "md",
  children,
  className = "",
  ...props
}: GlassButtonProps) {
  return (
    <button
      className={`${variantClasses[variant]} ${sizeClasses[size]} font-medium transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
