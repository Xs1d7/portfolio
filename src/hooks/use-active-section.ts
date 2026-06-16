"use client";

import { useEffect, useRef, useState } from "react";

export const SECTION_IDS = [
  "about",
  "experience",
  "freelances",
  "skills",
  "education",
  "courses",
  "languages",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

interface SectionState {
  activeSection: SectionId;
  sectionProgress: number;
}

const HYSTERESIS = 0.08;

export function useActiveSection(): SectionState {
  const [state, setState] = useState<SectionState>({
    activeSection: "about",
    sectionProgress: 0,
  });
  const activeRef = useRef<SectionId>("about");

  useEffect(() => {
    const ratios = new Map<SectionId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          if (SECTION_IDS.includes(id)) {
            ratios.set(id, entry.intersectionRatio);
          }
        }

        let candidate: SectionId = "about";
        let candidateRatio = 0;

        for (const id of SECTION_IDS) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > candidateRatio) {
            candidateRatio = ratio;
            candidate = id;
          }
        }

        const current = activeRef.current;
        const currentRatio = ratios.get(current) ?? 0;

        if (candidate !== current) {
          const shouldSwitch =
            candidateRatio > currentRatio + HYSTERESIS || candidateRatio > 0.5;
          if (!shouldSwitch) {
            candidate = current;
            candidateRatio = currentRatio;
          } else {
            activeRef.current = candidate;
          }
        }

        setState({
          activeSection: candidate,
          sectionProgress: candidateRatio,
        });
      },
      { rootMargin: "-5% 0px -55% 0px", threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 1] },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return state;
}
