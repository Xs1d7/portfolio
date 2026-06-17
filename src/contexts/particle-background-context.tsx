"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { useActiveSection, type SectionId } from "@/hooks/use-active-section";
import type { SilhouetteAnchorRect } from "@/hooks/use-silhouette-anchor";
import { useMediaCapabilities } from "@/hooks/use-media-capabilities";
import { useParticleScroll } from "@/hooks/use-particle-scroll";

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
  mouse: { x: number; y: number };
  interactive: boolean;
  ambientRepulse: boolean;
  trackMouse: boolean;
  enabled: boolean;
  overlaySuppressed: boolean;
  setMouse: (mouse: { x: number; y: number }) => void;
  registerSilhouetteAnchor: (el: HTMLElement | null) => void;
  registerOverlaySuppression: (active: boolean) => void;
}

const ParticleBackgroundContext = createContext<ParticleBackgroundState | null>(
  null,
);

const VIEWPORT_PLANET_ANCHOR: SilhouetteAnchorRect = {
  centerX: 0.5,
  centerY: 0.48,
  width: 0.5,
  height: 0.5,
};

export function ParticleBackgroundProvider({ children }: { children: ReactNode }) {
  const { isMobile, isCoarsePointer, prefersReducedMotion } =
    useMediaCapabilities();
  const { activeSection, sectionProgress } = useActiveSection();
  const { pageScrollProgress, heroScrollProgress, scaleProgress } =
    useParticleScroll();
  const [mouse, setMouseState] = useState({ x: 0.5, y: 0.5 });
  const overlayCountRef = useRef(0);
  const [overlaySuppressed, setOverlaySuppressed] = useState(false);
  const anchor = VIEWPORT_PLANET_ANCHOR;

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

  const registerSilhouetteAnchor = useCallback((_el: HTMLElement | null) => {
    // Planet anchor is viewport-fixed; hero no longer drives position.
  }, []);

  const registerOverlaySuppression = useCallback((active: boolean) => {
    overlayCountRef.current += active ? 1 : -1;
    if (overlayCountRef.current < 0) overlayCountRef.current = 0;
    setOverlaySuppressed(overlayCountRef.current > 0);
  }, []);

  const value = useMemo(
    () => ({
      activeSection,
      sectionProgress,
      pageScrollProgress,
      heroScrollProgress,
      scaleProgress,
      anchor,
      mouse,
      interactive,
      ambientRepulse,
      trackMouse,
      enabled,
      overlaySuppressed,
      setMouse,
      registerSilhouetteAnchor,
      registerOverlaySuppression,
    }),
    [
      activeSection,
      sectionProgress,
      pageScrollProgress,
      heroScrollProgress,
      scaleProgress,
      anchor,
      mouse,
      interactive,
      ambientRepulse,
      trackMouse,
      enabled,
      overlaySuppressed,
      setMouse,
      registerSilhouetteAnchor,
      registerOverlaySuppression,
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

/** Fade particle layer while modals/panels are open over page content. */
export function useParticleOverlaySuppression(active: boolean) {
  const { registerOverlaySuppression } = useParticleBackground();

  useEffect(() => {
    registerOverlaySuppression(active);
    return () => registerOverlaySuppression(false);
  }, [active, registerOverlaySuppression]);
}
