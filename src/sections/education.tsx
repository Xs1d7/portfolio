"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { education } from "@/data/resume";

export function Education() {
  const { t, locale } = useTranslation();

  return (
    <section id="education" className="scroll-mt-20 py-16 sm:py-24">
      <SectionHeading>{t.education.title}</SectionHeading>

      <div className="space-y-6">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 sm:p-6"
          >
            <div className="flex flex-col gap-4 min-[420px]:flex-row min-[420px]:items-start">
              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                  <path d="M22 10v6" />
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                </svg>
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {edu.field[locale]}
                    </h3>
                    <p className="text-sm text-muted">
                      {edu.degree[locale]} — <span className="font-medium text-accent">{edu.institution}</span>
                    </p>
                  </div>
                  <time className="shrink-0 text-sm text-muted">
                    {edu.period.start} — {edu.period.end ?? "..."}
                  </time>
                </div>

                {edu.description && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {edu.description[locale]}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
