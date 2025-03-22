
import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  animation?: "fade" | "scale" | "slide" | "none";
  delay?: number;
  onClick?: () => void; 
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hover = false,
  clickable = false,
  animation = "none",
  delay = 0,
  onClick,
}) => {
  const getAnimationClass = () => {
    if (animation === "none") return "";
    
    const delayClass = delay ? `animate-delay-${delay}` : "";
    
    switch (animation) {
      case "fade":
        return `opacity-0 animate-fade-in ${delayClass}`;
      case "scale":
        return `opacity-0 animate-scale-in ${delayClass}`;
      case "slide":
        return `opacity-0 animate-slide-up ${delayClass}`;
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "neo-glass rounded-xl overflow-hidden",
        hover && "elevated-hover",
        clickable && "cursor-pointer active:scale-[0.98]",
        getAnimationClass(),
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
