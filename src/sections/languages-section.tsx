"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { languages } from "@/data/resume";

const LEVEL_PERCENT: Record<string, number> = {
  native: 100,
  fluent: 85,
  intermediate: 60,
  basic: 35,
};

export function Languages() {
  const { t, locale } = useTranslation();

  return (
    <section id="languages" className="scroll-mt-20 py-16 sm:py-24">
      <SectionHeading>{t.languages.title}</SectionHeading>

      <div className="grid gap-4 sm:grid-cols-3">
        {languages.map((lang, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-2xl border border-border p-5 text-center transition-all duration-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:p-6"
          >
            {/* Flag */}
            <span className="text-4xl">{lang.flag}</span>

            {/* Name */}
            <h3 className="mt-3 text-base font-semibold text-foreground">
              {lang.name[locale]}
            </h3>

            {/* Level label */}
            <p className="mt-1 text-sm font-medium text-accent">
              {t.languages[lang.level]}
            </p>

            {/* Circular indicator */}
            <div className="mx-auto mt-4 flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 64 64">
                {/* Background circle */}
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="5"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 26}
                  initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                  whileInView={{
                    strokeDashoffset: 2 * Math.PI * 26 * (1 - LEVEL_PERCENT[lang.level] / 100),
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                  transform="rotate(-90 32 32)"
                />
                {/* Percentage text */}
                <text
                  x="32"
                  y="32"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-foreground text-xs font-semibold"
                  style={{ fontSize: "12px" }}
                >
                  {LEVEL_PERCENT[lang.level]}%
                </text>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
