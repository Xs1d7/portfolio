"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  animate,
} from "framer-motion";
import type { MascotPhase } from "@/contexts/panel-mascot-context";

const PANEL_WIDTH_SM = 540;
const PANEL_WIDTH_LG = 600;
const PULL_DURATION = 2.6;
const TURN_DURATION = 0.55;
const WALK_DURATION = 14;
const POOF_DURATION = 0.38;
const CAPYBARA_WIDTH = 52;

function getPanelLeftEdge() {
  if (typeof window === "undefined") return 0;
  const w = window.innerWidth;
  if (w >= 1024) return w - PANEL_WIDTH_LG;
  if (w >= 640) return w - PANEL_WIDTH_SM;
  return 0;
}

function getViewportWidth() {
  if (typeof window === "undefined") return 1024;
  return window.innerWidth;
}

/** Side-profile capybara facing right (head on the right). Use scaleX(-1) to face left. */
function CapybaraSvg({
  className,
  showRope = false,
}: {
  className?: string;
  showRope?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 96 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Tail */}
      <ellipse cx="10" cy="30" rx="7" ry="4" fill="#6E5F4F" />
      {/* Hind leg */}
      <rect x="18" y="40" width="7" height="11" rx="3" fill="#5E5044" />
      <ellipse cx="21.5" cy="51" rx="5" ry="2.5" fill="#4A3F36" />
      {/* Body */}
      <ellipse cx="40" cy="30" rx="26" ry="15" fill="#7A6B5C" />
      <ellipse cx="38" cy="32" rx="22" ry="11" fill="#958575" />
      {/* Front leg */}
      <rect x="48" y="40" width="7" height="11" rx="3" fill="#5E5044" />
      <ellipse cx="51.5" cy="51" rx="5" ry="2.5" fill="#4A3F36" />
      {/* Neck */}
      <ellipse cx="58" cy="26" rx="9" ry="11" fill="#7A6B5C" />
      {/* Head block */}
      <rect x="62" y="14" width="22" height="20" rx="7" fill="#7A6B5C" />
      <rect x="64" y="16" width="18" height="16" rx="6" fill="#8F7F6E" />
      {/* Ears */}
      <ellipse cx="68" cy="13" rx="3" ry="4.5" fill="#6E5F4F" />
      <ellipse cx="78" cy="12" rx="3" ry="4.5" fill="#6E5F4F" />
      <ellipse cx="68" cy="13.5" rx="1.6" ry="2.5" fill="#B8A088" />
      <ellipse cx="78" cy="12.5" rx="1.6" ry="2.5" fill="#B8A088" />
      {/* Snout — blunt capybara muzzle */}
      <rect x="80" y="22" width="14" height="10" rx="4" fill="#8F7F6E" />
      <ellipse cx="92" cy="27" rx="3.5" ry="4" fill="#6B5D50" />
      {/* Nostrils */}
      <circle cx="90.5" cy="26" r="0.9" fill="#3D342C" />
      <circle cx="93" cy="27.5" r="0.7" fill="#3D342C" />
      {/* Eye */}
      <circle cx="74" cy="22" r="2.2" fill="#1E1A17" />
      <circle cx="74.8" cy="21.2" r="0.7" fill="#F5F0E8" />
      {/* Whisker dots */}
      <circle cx="86" cy="25" r="0.5" fill="#5E5044" opacity="0.5" />
      <circle cx="87" cy="27" r="0.5" fill="#5E5044" opacity="0.5" />
      {/* Pull rope toward panel (right side) */}
      {showRope && (
        <path
          d="M92 27 C96 27 100 26 104 24"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
}

function PoofParticles() {
  const angles = [0, 60, 120, 180, 240, 300];
  return (
    <>
      {angles.map((deg, i) => (
        <motion.span
          key={deg}
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-accent"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((deg * Math.PI) / 180) * (24 + i * 4),
            y: Math.sin((deg * Math.PI) / 180) * (24 + i * 4),
            opacity: 0,
            scale: 0.2,
          }}
          transition={{ duration: POOF_DURATION - 0.06, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

interface Props {
  phase: MascotPhase;
  onPullComplete: () => void;
  onWalkComplete: () => void;
  onPoofComplete: () => void;
}

export function CapybaraMascot({
  phase,
  onPullComplete,
  onWalkComplete,
  onPoofComplete,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [panelLeft, setPanelLeft] = useState(0);
  const left = useMotionValue(getViewportWidth() + 80);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(0);
  const faceScale = useMotionValue(-1);
  const bob = useMotionValue(0);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const bobRef = useRef<ReturnType<typeof animate> | null>(null);

  const stopAnim = () => {
    animRef.current?.stop();
    animRef.current = null;
    bobRef.current?.stop();
    bobRef.current = null;
  };

  const startBob = (slow = false) => {
    bobRef.current?.stop();
    bobRef.current = animate(bob, [-2, 2, -2], {
      duration: slow ? 0.42 : 0.26,
      repeat: Infinity,
      ease: "easeInOut",
    });
  };

  useEffect(() => {
    const update = () => setPanelLeft(getPanelLeftEdge());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    if (phase === "hidden") {
      stopAnim();
      opacity.set(0);
      return;
    }

    if (phase === "pulling") {
      stopAnim();
      const vw = getViewportWidth();
      const pullEnd = Math.max(panelLeft - CAPYBARA_WIDTH, 48);
      let cancelled = false;

      left.set(vw + 80);
      scale.set(1);
      opacity.set(0);
      faceScale.set(-1);
      bob.set(0);

      animate(opacity, 1, { duration: 0.4, ease: "easeOut" });
      startBob(false);

      const pullControls = animate(left, pullEnd, {
        duration: PULL_DURATION,
        ease: [0.22, 0.03, 0.26, 1],
      });

      pullControls.then(async () => {
        if (cancelled) return;
        stopAnim();
        bob.set(0);
        await animate(faceScale, 1, {
          duration: TURN_DURATION,
          ease: "easeInOut",
        });
        if (cancelled) return;
        onPullComplete();
      });

      animRef.current = pullControls;
      return () => {
        cancelled = true;
        stopAnim();
      };
    }

    if (phase === "walking") {
      stopAnim();
      let cancelled = false;

      const walkTarget = -CAPYBARA_WIDTH - 24;

      animate(faceScale, -1, { duration: 0.35, ease: "easeOut" }).then(() => {
        if (cancelled) return;
        startBob(true);
        animRef.current = animate(left, walkTarget, {
          duration: WALK_DURATION,
          ease: "linear",
          onComplete: () => {
            if (!cancelled) onWalkComplete();
          },
        });
      });

      return () => {
        cancelled = true;
        stopAnim();
      };
    }

    if (phase === "poof") {
      stopAnim();
      bob.set(0);

      const poofScale = animate(scale, [1, 1.45, 0], {
        duration: POOF_DURATION,
        ease: "easeOut",
      });
      const poofOpacity = animate(opacity, [1, 0.95, 0], {
        duration: POOF_DURATION,
        ease: "easeOut",
      });

      animRef.current = poofScale;
      Promise.all([poofScale, poofOpacity]).then(() => onPoofComplete());

      return stopAnim;
    }

    return stopAnim;
  }, [
    phase,
    panelLeft,
    left,
    scale,
    opacity,
    faceScale,
    bob,
    onPullComplete,
    onWalkComplete,
    onPoofComplete,
    prefersReducedMotion,
  ]);

  if (prefersReducedMotion) return null;

  const visible = phase !== "hidden";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[95]"
      aria-hidden
    >
      {visible && (
        <motion.div
          className="absolute bottom-[12%]"
          style={{
            left,
            y: bob,
            scale,
            opacity,
          }}
        >
          <motion.div style={{ scaleX: faceScale }}>
            {phase === "poof" ? (
              <div className="relative h-14 w-20">
                <PoofParticles />
                <CapybaraSvg className="h-14 w-20 drop-shadow-md" />
              </div>
            ) : (
              <CapybaraSvg
                className="h-14 w-20 drop-shadow-md"
                showRope={phase === "pulling"}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
