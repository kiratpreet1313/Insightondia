import React, { useEffect, useRef, useState } from "react";

interface SketchUnderlineProps {
  children: React.ReactNode;
  variant?: "wave" | "double" | "scribble" | "loop";
  color?: "sky" | "blue" | "navy" | "gradient";
  className?: string;
  delay?: number;
}

export default function SketchUnderline({
  children,
  variant = "wave",
  color = "sky",
  className = "",
  delay = 0,
}: SketchUnderlineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Stroke color mappings
  const primaryColor = color === "navy" ? "#0A1F44" : color === "blue" ? "#0284c7" : "#38bdf8";
  const secondaryColor = color === "navy" ? "#38bdf8" : color === "blue" ? "#38bdf8" : "#93c5fd";

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      
      <svg
        className="absolute -bottom-1.5 left-0 w-[105%] -ml-[2.5%] h-3.5 overflow-visible pointer-events-none z-0"
        viewBox="0 0 200 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {variant === "double" && (
          <>
            {/* Primary soft wave line */}
            <path
              d="M 2 8 C 45 4, 110 3, 198 7"
              stroke={primaryColor}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="210"
              strokeDashoffset={isVisible ? "0" : "210"}
              style={{
                transition: `stroke-dashoffset 0.85s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
                opacity: 0.9,
              }}
            />
            {/* Secondary sketch trail */}
            <path
              d="M 12 11 C 65 7, 135 6, 188 10"
              stroke={secondaryColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="190"
              strokeDashoffset={isVisible ? "0" : "190"}
              style={{
                transition: `stroke-dashoffset 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${delay + 0.15}s`,
                opacity: 0.7,
              }}
            />
          </>
        )}

        {variant === "wave" && (
          <>
            {/* Organic wavy energetic underline */}
            <path
              d="M 3 8 Q 50 3, 100 8 T 197 7"
              stroke={primaryColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="210"
              strokeDashoffset={isVisible ? "0" : "210"}
              style={{
                transition: `stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
                opacity: 0.92,
              }}
            />
            <path
              d="M 15 11 Q 60 7, 110 11 T 185 10"
              stroke={secondaryColor}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="180"
              strokeDashoffset={isVisible ? "0" : "180"}
              style={{
                transition: `stroke-dashoffset 0.85s cubic-bezier(0.4, 0, 0.2, 1) ${delay + 0.12}s`,
                opacity: 0.65,
              }}
            />
          </>
        )}

        {variant === "scribble" && (
          <>
            {/* Playful loose scribble */}
            <path
              d="M 2 9 C 30 5, 60 11, 95 6 C 130 11, 165 5, 198 8"
              stroke={primaryColor}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="220"
              strokeDashoffset={isVisible ? "0" : "220"}
              style={{
                transition: `stroke-dashoffset 0.85s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
                opacity: 0.9,
              }}
            />
            <path
              d="M 10 12 C 40 8, 80 13, 120 9 C 150 13, 175 9, 190 11"
              stroke={secondaryColor}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeDasharray="190"
              strokeDashoffset={isVisible ? "0" : "190"}
              style={{
                transition: `stroke-dashoffset 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${delay + 0.1}s`,
                opacity: 0.65,
              }}
            />
          </>
        )}

        {variant === "loop" && (
          <>
            {/* Playful little loop accent */}
            <path
              d="M 2 8 C 45 4, 90 2, 130 8 C 145 10, 150 2, 140 2 C 132 2, 138 9, 155 8 L 198 7"
              stroke={primaryColor}
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeDasharray="230"
              strokeDashoffset={isVisible ? "0" : "230"}
              style={{
                transition: `stroke-dashoffset 0.95s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
                opacity: 0.9,
              }}
            />
          </>
        )}
      </svg>
    </span>
  );
}
