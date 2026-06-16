"use client";

import { useEffect, useRef, useState } from "react";
import { useParticleBackground } from "@/contexts/particle-background-context";

export function SiteCursor() {
  const { enabled } = useParticleBackground();
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("site-custom-cursor");

    const onMove = (event: MouseEvent) => {
      dotRef.current = { x: event.clientX, y: event.clientY };
      setActive(true);
    };

    const onLeave = () => setActive(false);
    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);

    let raf = 0;
    const animate = () => {
      ringRef.current.x += (dotRef.current.x - ringRef.current.x) * 0.14;
      ringRef.current.y += (dotRef.current.y - ringRef.current.y) * 0.14;

      const root = rootRef.current;
      if (root) {
        root.style.setProperty("--cx", `${dotRef.current.x}px`);
        root.style.setProperty("--cy", `${dotRef.current.y}px`);
        root.style.setProperty("--rx", `${ringRef.current.x}px`);
        root.style.setProperty("--ry", `${ringRef.current.y}px`);
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("site-custom-cursor");
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled]);

  if (!enabled || !active) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`site-cursor${pressing ? " site-cursor--press" : ""}`}
    >
      <span className="site-cursor__ring" />
      <span className="site-cursor__ticks" />
      <span className="site-cursor__core" />
    </div>
  );
}
