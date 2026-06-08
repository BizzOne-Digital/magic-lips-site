"use client";
import { useEffect, useState } from "react";

interface Sparkle {
  id: number; x: number; y: number;
  size: number; delay: number; duration: number; color: string;
}

// Soft palette to match lavender/sky/blush theme
const COLORS = ["#9D8EC4", "#FDE68A", "#FBCFE8", "#93C5FD", "#F0ABFC"];

export default function Sparkles({
  count = 16, className = "",
}: {
  count?: number; className?: string;
}) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    setSparkles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5,
        delay: Math.random() * 4,
        duration: Math.random() * 2.5 + 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    );
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {sparkles.map((s) => (
        <svg
          key={s.id}
          width={s.size}
          height={s.size}
          viewBox="0 0 24 24"
          className="absolute"
          style={{
            left: `${s.x}%`,
            top:  `${s.y}%`,
            fill: s.color,
            opacity: 0.8,
            animation: `sparkle ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
            filter: `drop-shadow(0 0 3px ${s.color})`,
          }}
        >
          <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z" />
        </svg>
      ))}
    </div>
  );
}
