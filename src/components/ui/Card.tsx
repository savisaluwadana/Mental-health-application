import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-[0_10px_35px_-18px_rgba(15,23,42,0.35)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}
