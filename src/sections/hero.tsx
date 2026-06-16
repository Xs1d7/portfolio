"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { ResumeExportPanel } from "@/components/resume-export-panel";

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

export function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const textY = useTransform(scrollYProgress, [0, 0.85], [0, -40]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative left-1/2 scroll-mt-20 w-screen max-w-[100vw] -translate-x-1/2 py-14 sm:py-20"
    >
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-61px)] w-full max-w-5xl flex-col justify-center px-5 sm:min-h-[calc(100svh-73px)] sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-background/92 via-background/55 to-background/15"
          aria-hidden
        />

        <motion.div
          className="relative w-full"
          style={
            prefersReducedMotion
              ? undefined
              : { opacity: textOpacity, y: textY }
          }
        >
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p
              variants={item}
              className="mb-4 text-xs font-medium tracking-widest text-accent uppercase sm:text-sm"
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              variants={item}
              className="max-w-5xl text-4xl font-bold tracking-tight text-foreground text-balance sm:text-5xl lg:text-7xl"
            >
              {t.hero.name}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 max-w-4xl text-xl font-medium leading-snug text-muted text-balance sm:text-3xl lg:text-4xl"
            >
              {t.hero.role}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-8 w-full max-w-4xl text-base leading-relaxed text-muted sm:text-lg lg:text-xl"
            >
              {t.hero.description}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 w-full max-w-4xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {t.about.p1}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-4 w-full max-w-4xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {t.about.p2}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
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
              className="mt-10 flex flex-col items-stretch gap-3 min-[380px]:flex-row min-[380px]:items-center sm:flex-wrap sm:gap-4"
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
      </div>
    </section>
  );
}
