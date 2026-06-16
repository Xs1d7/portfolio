"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useParticleBackground } from "@/contexts/particle-background-context";
import { loadSilhouetteData, type SilhouettePoint } from "@/lib/silhouette-data";
import { SiteParticles } from "@/components/site-particles";

function readAccentColor() {
  if (typeof document === "undefined") return "#1d4ed8";
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent")
    .trim();
  return value || "#1d4ed8";
}

function Scene({
  points,
  accentColor,
}: {
  points: SilhouettePoint[];
  accentColor: string;
}) {
  const {
    activeSection,
    sectionProgress,
    scaleProgress,
    heroScrollProgress,
    pageScrollProgress,
    anchor,
    experienceJourney,
    mouse,
    interactive,
    ambientRepulse,
    trackMouse,
    setMouse,
  } = useParticleBackground();

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!trackMouse) return;
      setMouse({
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      });
    },
    [trackMouse, setMouse],
  );

  return (
    <div
      className="absolute inset-0"
      onPointerMove={onPointerMove}
      style={{ pointerEvents: trackMouse ? "auto" : "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 1.4], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SiteParticles
            points={points}
            activeSection={activeSection}
            sectionProgress={sectionProgress}
            scaleProgress={scaleProgress}
            heroScrollProgress={heroScrollProgress}
            pageScrollProgress={pageScrollProgress}
            anchor={anchor}
            experienceJourney={experienceJourney}
            mouse={mouse}
            interactive={interactive}
            ambientRepulse={ambientRepulse}
            accentColor={accentColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function SiteParticleBackground() {
  const [points, setPoints] = useState<SilhouettePoint[] | null>(null);
  const [accentColor, setAccentColor] = useState(readAccentColor);

  useEffect(() => {
    let cancelled = false;
    loadSilhouetteData(false)
      .then((data) => {
        if (!cancelled) setPoints(data.points);
      })
      .catch(() => {
        if (!cancelled) setPoints(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setAccentColor(readAccentColor());
    const observer = new MutationObserver(() => setAccentColor(readAccentColor()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (!points) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
    >
      <Scene points={points} accentColor={accentColor} />
    </div>
  );
}
