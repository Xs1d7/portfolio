"use client";

import { useEffect, useState } from "react";

export function useMediaCapabilities() {
  const [state, setState] = useState({
    isMobile: false,
    isCoarsePointer: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setState({
        isMobile: mobile.matches,
        isCoarsePointer: coarse.matches,
        prefersReducedMotion: reduced.matches,
      });
    };

    sync();
    mobile.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      mobile.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return state;
}
