"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - clamp01(t), 3);
}

function measureHeroProgress() {
  const hero = document.getElementById("about");
  if (!hero) return 0;

  const rect = hero.getBoundingClientRect();
  const heroHeight = hero.offsetHeight || 1;
  const scrolled = Math.max(0, -rect.top);
  return clamp01(scrolled / heroHeight);
}

export function useParticleScroll() {
  const [heroProgress, setHeroProgress] = useState(0);
  const [pageProgress, setPageProgress] = useState(0);
  const [scaleProgress, setScaleProgress] = useState(0);

  const { scrollYProgress: pageScrollYProgress } = useScroll();

  useMotionValueEvent(pageScrollYProgress, "change", (v) => {
    setPageProgress(v);
  });

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const hp = measureHeroProgress();
      setHeroProgress(hp);
      setScaleProgress(easeOutCubic(hp));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return {
    pageScrollProgress: pageProgress,
    heroScrollProgress: heroProgress,
    scaleProgress,
  };
}
