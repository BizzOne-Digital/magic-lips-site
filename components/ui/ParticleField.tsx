"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; color: string;
  pulse: number; pulseSpeed: number;
  life: number; maxLife: number;
}

const COLORS = ["#7E6BAD","#9D8EC4","#C4B5FD","#BAE6FD","#F9A8D4","#FDE68A","#E879F9"];

export default function ParticleField({ count = 60 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.clientHeight;
      canvas.width  = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (): Particle => ({
      x:          Math.random() * canvas.width,
      y:          Math.random() * canvas.height,
      vx:         (Math.random() - 0.5) * 0.4,
      vy:         (Math.random() - 0.5) * 0.4,
      size:       Math.random() * 2.5 + 0.5,
      opacity:    Math.random() * 0.5 + 0.1,
      color:      COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse:      Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.01,
      life:       0,
      maxLife:    Math.random() * 600 + 200,
    });

    const particles: Particle[] = Array.from({ length: count }, spawn);
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x    += p.vx;
        p.y    += p.vy;
        p.pulse+= p.pulseSpeed;
        p.life++;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        if (p.life > p.maxLife)  particles[i] = spawn();

        const lifeFade = p.life < 30
          ? p.life / 30
          : p.life > p.maxLife - 30
            ? (p.maxLife - p.life) / 30
            : 1;

        const a = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse)) * lifeFade;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = a;
        ctx.shadowBlur  = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur  = 0;
        ctx.globalAlpha = 1;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none w-full h-full max-w-full"
      style={{ zIndex: 1, opacity: 0.6 }}
    />
  );
}
