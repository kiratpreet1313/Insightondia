import React from "react";
import logoImg from "../assets/images/insightondia_logo.png";

interface InsightondiaLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function InsightondiaLogo({
  className = "",
  size = "md",
}: InsightondiaLogoProps) {
  const sizeClasses = {
    xs: "w-7 h-7",
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-xl bg-white shrink-0 border border-slate-200/80 shadow-sm overflow-hidden group ${sizeClasses[size]} ${className}`}
      style={{
        boxShadow: "0 2px 8px -2px rgba(15, 23, 42, 0.12)",
      }}
      title="Insightondia"
    >
      <img
        src={logoImg}
        alt="Insightondia Official Logo"
        className="w-full h-full object-cover scale-125 transition-transform duration-300 group-hover:scale-135"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
}
