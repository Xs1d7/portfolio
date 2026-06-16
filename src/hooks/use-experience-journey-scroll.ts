"use client";

import { useEffect, useState } from "react";

export interface ExperienceJourneyScroll {
  milestoneIndex: number;
  milestoneProgress: number;
  journeyProgress: number;
  milestoneCount: number;
  active: boolean;
}

const IDLE: ExperienceJourneyScroll = {
  milestoneIndex: 0,
  milestoneProgress: 0,
  journeyProgress: 0,
  milestoneCount: 1,
  active: false,
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function useExperienceJourneyScroll(
  container: HTMLElement | null,
  milestoneCount: number,
) {
  const [state, setState] = useState<ExperienceJourneyScroll>(IDLE);

  useEffect(() => {
    if (!container || milestoneCount <= 0) {
      setState(IDLE);
      return;
    }

    const update = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;

      if (scrollable <= 8) {
        setState({
          milestoneIndex: 0,
          milestoneProgress: 0,
          journeyProgress: 0,
          milestoneCount,
          active: true,
        });
        return;
      }

      const scrolled = clamp01(Math.max(0, -rect.top) / scrollable);
      const scaled = scrolled * Math.max(1, milestoneCount - 1);
      const index = Math.min(milestoneCount - 1, Math.floor(scaled));
      const frac =
        milestoneCount > 1 ? scaled - Math.floor(scaled) : 0;

      setState({
        milestoneIndex: index,
        milestoneProgress: frac,
        journeyProgress: scrolled,
        milestoneCount,
        active: true,
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const observer = new ResizeObserver(update);
    observer.observe(container);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [container, milestoneCount]);

  return state;
}
