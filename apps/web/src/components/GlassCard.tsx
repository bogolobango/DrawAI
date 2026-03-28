import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  onClick,
}: GlassCardProps) {
  return (
    <div
      className={`glass-panel p-6 ${onClick ? "cursor-pointer glass-hover" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
