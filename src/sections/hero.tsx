"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { ResumeExportPanel } from "@/components/resume-export-panel";
import { useParticleBackground } from "@/contexts/particle-background-context";
import { useMediaCapabilities } from "@/hooks/use-media-capabilities";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const layoutSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 22,
};

export function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isMobile, prefersReducedMotion: reducedMedia } = useMediaCapabilities();
  const { registerSilhouetteAnchor, enabled: particlesEnabled } =
    useParticleBackground();
  const [layoutReady, setLayoutReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const textY = useTransform(scrollYProgress, [0, 0.85], [0, -40]);

  const showSplitLayout =
    particlesEnabled && !isMobile && !reducedMedia && !prefersReducedMotion;

  useEffect(() => {
    if (!showSplitLayout) {
      setLayoutReady(true);
      return;
    }
    const timer = window.setTimeout(() => setLayoutReady(true), 420);
    return () => window.clearTimeout(timer);
  }, [showSplitLayout]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative scroll-mt-20 py-14 sm:py-20"
    >
      <div className="flex min-h-[calc(100svh-61px)] flex-col justify-center sm:min-h-[calc(100svh-73px)]">
        <div className="grid items-center lg:grid-cols-12 lg:gap-10">
          <motion.div
            layout
            transition={layoutSpring}
            className={`relative z-10 ${
              showSplitLayout && layoutReady ? "lg:col-span-5" : "lg:col-span-12"
            }`}
            style={
              prefersReducedMotion
                ? undefined
                : { opacity: textOpacity, y: textY }
            }
          >
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.p
                variants={item}
                className="mb-4 text-xs font-medium tracking-widest text-accent uppercase sm:text-sm"
              >
                {t.hero.greeting}
              </motion.p>

              <motion.h1
                variants={item}
                className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              >
                {t.hero.name}
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-3 text-xl font-medium leading-snug text-muted sm:text-3xl"
              >
                {t.hero.role}
              </motion.p>

              <motion.p
                variants={item}
                className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
              >
                {t.hero.description}
              </motion.p>

              <motion.p
                variants={item}
                className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
              >
                {t.about.p1}
              </motion.p>

              <motion.p
                variants={item}
                className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
              >
                {t.about.p2}
              </motion.p>

              <motion.div variants={item} className="mt-6 flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 text-sm text-foreground">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {t.about.location}
                </span>

                <span className="inline-flex items-center gap-2 text-sm text-foreground">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  {t.about.available}
                </span>
              </motion.div>

              <motion.div
                variants={item}
                className="mt-8 flex flex-col items-stretch gap-3 min-[380px]:flex-row min-[380px]:items-center sm:mt-10 sm:flex-wrap sm:gap-4"
              >
                <a
                  href="#contact"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {t.hero.cta}
                </a>
                <ResumeExportPanel />
              </motion.div>
            </motion.div>
          </motion.div>

          {showSplitLayout && (
            <div
              ref={registerSilhouetteAnchor}
              className="hidden min-h-[320px] lg:col-span-7 lg:block lg:min-h-[420px]"
              aria-hidden
            />
          )}
        </div>
      </div>
    </section>
  );
}
