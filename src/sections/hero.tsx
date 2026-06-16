"use client";

import { motion } from "framer-motion";
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

  return (
    <section
      id="about"
      className="flex min-h-[calc(100svh-61px)] scroll-mt-20 flex-col justify-center py-14 sm:min-h-[calc(100svh-73px)] sm:py-20"
    >
      <motion.div
        className="max-w-2xl"
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
          className="mt-6 text-base leading-relaxed text-muted sm:text-lg"
        >
          {t.hero.description}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
        >
          {t.about.p1}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 text-base leading-relaxed text-muted sm:text-lg"
        >
          {t.about.p2}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap gap-4"
        >
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
    </section>
  );
}
