"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { useActiveSection, type SectionId } from "@/hooks/use-active-section";
import {
  useSilhouetteAnchor,
  type SilhouetteAnchorRect,
} from "@/hooks/use-silhouette-anchor";
import { useMediaCapabilities } from "@/hooks/use-media-capabilities";
import { useParticleScroll } from "@/hooks/use-particle-scroll";
import {
  useExperienceJourneyScroll,
  type ExperienceJourneyScroll,
} from "@/hooks/use-experience-journey-scroll";

const SiteCursor = dynamic(
  () => import("@/components/site-cursor").then((m) => m.SiteCursor),
  { ssr: false },
);

const SiteParticleBackground = dynamic(
  () =>
    import("@/components/site-particle-background").then(
      (m) => m.SiteParticleBackground,
    ),
  { ssr: false },
);

interface ParticleBackgroundState {
  activeSection: SectionId;
  sectionProgress: number;
  pageScrollProgress: number;
  heroScrollProgress: number;
  scaleProgress: number;
  anchor: SilhouetteAnchorRect;
  experienceJourney: ExperienceJourneyScroll;
  mouse: { x: number; y: number };
  interactive: boolean;
  ambientRepulse: boolean;
  trackMouse: boolean;
  enabled: boolean;
  setMouse: (mouse: { x: number; y: number }) => void;
  registerSilhouetteAnchor: (el: HTMLElement | null) => void;
  registerExperienceJourney: (
    el: HTMLElement | null,
    milestoneCount: number,
  ) => void;
}

const ParticleBackgroundContext = createContext<ParticleBackgroundState | null>(
  null,
);

export function ParticleBackgroundProvider({ children }: { children: ReactNode }) {
  const { isMobile, isCoarsePointer, prefersReducedMotion } =
    useMediaCapabilities();
  const { activeSection, sectionProgress } = useActiveSection();
  const { pageScrollProgress, heroScrollProgress, scaleProgress } =
    useParticleScroll();
  const [mouse, setMouseState] = useState({ x: 0.5, y: 0.5 });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [journeyEl, setJourneyEl] = useState<HTMLElement | null>(null);
  const [journeyCount, setJourneyCount] = useState(1);
  const anchor = useSilhouetteAnchor(anchorEl);
  const experienceJourney = useExperienceJourneyScroll(journeyEl, journeyCount);

  const enabled =
    !isMobile && !isCoarsePointer && !prefersReducedMotion;

  const trackMouse = enabled;

  const interactive = enabled && activeSection === "about";

  const ambientRepulse =
    enabled &&
    (activeSection === "freelances" ||
      activeSection === "skills" ||
      activeSection === "education" ||
      activeSection === "courses" ||
      activeSection === "languages" ||
      activeSection === "contact");

  const setMouse = useCallback((next: { x: number; y: number }) => {
    setMouseState(next);
  }, []);

  useEffect(() => {
    if (!trackMouse) return;

    const onMove = (event: MouseEvent) => {
      setMouseState({
        x: event.clientX / window.innerWidth,
        y: 1 - event.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [trackMouse]);

  const registerSilhouetteAnchor = useCallback((el: HTMLElement | null) => {
    setAnchorEl(el);
  }, []);

  const registerExperienceJourney = useCallback(
    (el: HTMLElement | null, milestoneCount: number) => {
      setJourneyEl(el);
      setJourneyCount(Math.max(1, milestoneCount));
    },
    [],
  );

  const value = useMemo(
    () => ({
      activeSection,
      sectionProgress,
      pageScrollProgress,
      heroScrollProgress,
      scaleProgress,
      anchor,
      experienceJourney,
      mouse,
      interactive,
      ambientRepulse,
      trackMouse,
      enabled,
      setMouse,
      registerSilhouetteAnchor,
      registerExperienceJourney,
    }),
    [
      activeSection,
      sectionProgress,
      pageScrollProgress,
      heroScrollProgress,
      scaleProgress,
      anchor,
      experienceJourney,
      mouse,
      interactive,
      ambientRepulse,
      trackMouse,
      enabled,
      setMouse,
      registerSilhouetteAnchor,
      registerExperienceJourney,
    ],
  );

  return (
    <ParticleBackgroundContext.Provider value={value}>
      {enabled && <SiteParticleBackground />}
      {enabled && <SiteCursor />}
      {children}
    </ParticleBackgroundContext.Provider>
  );
}

export function useParticleBackground() {
  const ctx = useContext(ParticleBackgroundContext);
  if (!ctx) {
    throw new Error(
      "useParticleBackground must be used within ParticleBackgroundProvider",
    );
  }
  return ctx;
}
