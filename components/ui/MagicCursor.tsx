"use client";
import { useEffect, useRef, useState } from "react";
import { isMobileClient } from "@/lib/isMobileClient";

export default function MagicCursor() {
  const cursorRef   = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const posRef      = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (isMobileClient()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursor   = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    document.body.classList.add("magic-cursor-active");

    const applyTransform = () => {
      const { x, y } = posRef.current;
      const scale = hoveringRef.current ? 2.5 : 1;
      const ringScale = hoveringRef.current ? 1.5 : 1;
      cursor.style.transform = `translate(${x - 6}px, ${y - 6}px) scale(${scale})`;
      follower.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px) scale(${ringScale})`;
    };

    const move = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      applyTransform();
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let raf: number;
    const loop = () => {
      followerPos.current.x = lerp(followerPos.current.x, posRef.current.x, 0.12);
      followerPos.current.y = lerp(followerPos.current.y, posRef.current.y, 0.12);
      applyTransform();
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onEnter = () => {
      hoveringRef.current = true;
      cursor.style.background = "rgba(157,142,196,0.85)";
      follower.style.borderColor = "rgba(157,142,196,0.6)";
    };
    const onLeave = () => {
      hoveringRef.current = false;
      cursor.style.background = "rgba(142,125,184,0.9)";
      follower.style.borderColor = "rgba(157,142,196,0.35)";
    };

    const buttons = document.querySelectorAll("a, button, [data-cursor]");
    buttons.forEach((b) => {
      b.addEventListener("mouseenter", onEnter);
      b.addEventListener("mouseleave", onLeave);
    });

    document.addEventListener("mousemove", move);
    return () => {
      document.body.classList.remove("magic-cursor-active");
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      buttons.forEach((b) => {
        b.removeEventListener("mouseenter", onEnter);
        b.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[99999] transition-[background,transform] duration-200 ease-out"
        style={{ background: "rgba(142,125,184,0.9)" }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[99998] transition-[border-color,transform] duration-300 ease-out"
        style={{ border: "1.5px solid rgba(157,142,196,0.35)" }}
      />
    </>
  );
}
