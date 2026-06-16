"use client";

import { useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

interface Options {
  containerRef: React.RefObject<HTMLElement | null>;
  count: number;
  enabled?: boolean;
}

export function useScrollMilestone({
  containerRef,
  count,
  enabled = true,
}: Options) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!enabled || count <= 1) return;
    const index = Math.min(
      count - 1,
      Math.max(0, Math.round(latest * (count - 1))),
    );
    setActiveIndex(index);
  });

  return { activeIndex, scrollYProgress, setActiveIndex };
}
