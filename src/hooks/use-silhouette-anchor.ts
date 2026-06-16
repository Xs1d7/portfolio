"use client";

import { useEffect, useState } from "react";

export interface SilhouetteAnchorRect {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
}

const DEFAULT_ANCHOR: SilhouetteAnchorRect = {
  centerX: 0.72,
  centerY: 0.52,
  width: 0.35,
  height: 0.55,
};

export function useSilhouetteAnchor(element: HTMLElement | null) {
  const [rect, setRect] = useState<SilhouetteAnchorRect>(DEFAULT_ANCHOR);

  useEffect(() => {
    if (!element) {
      setRect(DEFAULT_ANCHOR);
      return;
    }

    const update = () => {
      const r = element.getBoundingClientRect();
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      if (r.width < 1 || r.height < 1) return;

      setRect({
        centerX: (r.left + r.width / 2) / vw,
        centerY: 1 - (r.top + r.height / 2) / vh,
        width: r.width / vw,
        height: r.height / vh,
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [element]);

  return rect;
}
