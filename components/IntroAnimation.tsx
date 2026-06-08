"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const ringRef      = useRef<HTMLDivElement>(null);
  const ring2Ref     = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLParagraphElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Rings expand from center
      tl.fromTo(ringRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
        0
      )
      .fromTo(ring2Ref.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.5, duration: 1.1, ease: "power3.out" },
        0.1
      )
      // Rings slow spin
      .to(ringRef.current,  { rotation: 360, duration: 12, ease: "none", repeat: -1 }, 0)
      .to(ring2Ref.current, { rotation: -360,duration: 18, ease: "none", repeat: -1 }, 0)

      // 2. Logo drops in with spring
      .fromTo(logoRef.current,
        { y: -80, scale: 0.5, opacity: 0, filter: "blur(20px)" },
        { y: 0,   scale: 1,   opacity: 1, filter: "blur(0px)",
          duration: 1.0, ease: "back.out(1.5)" },
        0.4
      )

      // 3. Logo glow pulse
      .to(logoRef.current, {
        filter: "drop-shadow(0 0 40px rgba(142,125,184,0.9)) drop-shadow(0 0 80px rgba(139,92,246,0.5))",
        duration: 0.8, ease: "power2.inOut", yoyo: true, repeat: 2,
      }, 1.2)

      // 4. Tagline slides up
      .fromTo(textRef.current,
        { y: 30, opacity: 0, letterSpacing: "0.1em" },
        { y: 0,  opacity: 1, letterSpacing: "0.35em", duration: 0.7, ease: "power3.out" },
        1.5
      )

      // 5. Progress bar
      .fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 3.5, ease: "none", transformOrigin: "left center" },
        0.3
      )

      // 6. Exit: everything compresses to center and fades
      .to(containerRef.current, {
        scale: 1.06, opacity: 0, duration: 0.75, ease: "power2.inOut",
        onComplete: () => {
          setVisible(false);
          onComplete();
        },
      }, 4.0);

    }, containerRef);

    const safeExit = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 4500);

    return () => {
      ctx.revert();
      clearTimeout(safeExit);
    };
  }, [onComplete]);

  useEffect(() => {
    if (!visible) onComplete();
  }, [visible, onComplete]);

  const sparklePos = [
    { x:"8%",  y:"15%", d:0 },   { x:"88%", y:"10%", d:0.3 },
    { x:"18%", y:"78%", d:0.6 }, { x:"82%", y:"75%", d:0.15 },
    { x:"50%", y:"5%",  d:0.45 },{ x:"5%",  y:"48%", d:0.7 },
    { x:"94%", y:"52%", d:0.2 }, { x:"46%", y:"92%", d:0.5 },
    { x:"70%", y:"28%", d:0.1 }, { x:"30%", y:"38%", d:0.35 },
    { x:"60%", y:"18%", d:0.55 },{ x:"22%", y:"55%", d:0.25 },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at center, #1e0a3c 0%, #120028 50%, #07001a 100%)",
          }}
        >
          {/* Animated gradient blobs */}
          <motion.div
            animate={{ scale:[1,1.3,1], opacity:[0.2,0.4,0.2], rotate:[0,180,360] }}
            transition={{ duration:8, repeat:Infinity, ease:"easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:"radial-gradient(ellipse 60% 50% at 30% 50%, rgba(142,125,184,0.4) 0%, transparent 70%)",
            }}
          />
          <motion.div
            animate={{ scale:[1.2,1,1.2], opacity:[0.15,0.35,0.15] }}
            transition={{ duration:6, repeat:Infinity, ease:"easeInOut", delay:1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:"radial-gradient(ellipse 50% 60% at 70% 50%, rgba(157,142,196,0.3) 0%, transparent 70%)",
            }}
          />

          {/* Sparkle stars */}
          {sparklePos.map((p, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{ left:p.x, top:p.y }}
              initial={{ opacity:0, scale:0, rotate:0 }}
              animate={{ opacity:[0,1,0], scale:[0,1.2,0], rotate:[0,180,360] }}
              transition={{ duration:2.2, delay:p.d, repeat:Infinity, repeatDelay: 1 + (i % 3) * 0.6 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"
                fill={["#C4B5FD","#FDE68A","#FBCFE8","#BAE6FD","#E879F9"][i%5]}
                style={{ filter:`drop-shadow(0 0 6px ${["#9D8EC4","#F59E0B","#F9A8D4","#7DD3FC","#D946EF"][i%5]})` }}>
                <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5Z"/>
              </svg>
            </motion.div>
          ))}

          {/* Spinning rings */}
          <div
            ref={ringRef}
            className="absolute rounded-full pointer-events-none"
            style={{
              width:"360px", height:"360px",
              border:"1px dashed rgba(167,139,250,0.3)",
            }}
          />
          <div
            ref={ring2Ref}
            className="absolute rounded-full pointer-events-none"
            style={{
              width:"480px", height:"480px",
              border:"1px solid rgba(157,142,196,0.15)",
            }}
          />
          {/* Third static ring */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width:"220px", height:"220px",
              border:"1px solid rgba(196,181,253,0.2)",
            }}
          />

          {/* Central logo + text */}
          <div className="relative z-10 flex flex-col items-center">
            <div ref={logoRef} style={{ opacity:0 }}>
              <Image
                src="/logo.png"
                alt="Magic Lips"
                width={220} height={220}
                priority
                className="object-contain select-none"
                onError={(e)=>{ (e.target as HTMLImageElement).src="/logo.svg"; }}
              />
            </div>

            <p
              ref={textRef}
              className="mt-5 text-xs font-semibold uppercase"
              style={{ opacity:0, color:"#C4B5FD", letterSpacing:"0.35em", fontFamily:"var(--font-inter)" }}
            >
              ✦ Premium Beauty ✦
            </p>
          </div>

          {/* Skip */}
          <motion.button
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:1.2 }}
            onClick={() => { setVisible(false); onComplete(); }}
            className="absolute bottom-8 right-8 text-white/30 hover:text-white/70 text-xs tracking-widest uppercase transition-colors"
          >
            Skip →
          </motion.button>

          {/* Progress bar */}
          <div
            ref={progressRef}
            className="absolute bottom-0 left-0 h-[2px] origin-left"
            style={{
              width: "100%",
              background: "linear-gradient(to right, #8A7AB8, #7E6BAD, #9D8EC4, #7DD3FC, #FBCFE8)",
              transform: "scaleX(0)",
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
