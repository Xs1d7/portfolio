"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="flex min-h-[calc(100svh-73px)] flex-col justify-center py-20">
      <motion.div
        className="max-w-2xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="mb-4 text-sm font-medium tracking-widest text-accent uppercase"
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
          className="mt-2 text-2xl font-medium text-muted sm:text-3xl"
        >
          {t.hero.role}
        </motion.p>

        <motion.p
          variants={item}
          className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
        >
          {t.hero.description}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
          >
            {t.hero.cta}
          </a>
          <a
            href="#"
            className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-accent/10"
          >
            {t.hero.download}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
