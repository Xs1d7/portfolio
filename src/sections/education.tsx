"use client";

import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { education } from "@/data/resume";

export function Education() {
  const { t, locale } = useTranslation();

  return (
    <section id="education" className="scroll-mt-20 py-24">
      <SectionHeading>{t.education.title}</SectionHeading>

      <div className="space-y-8">
        {education.map((edu, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border p-6 transition-colors duration-200 hover:border-accent/30"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {edu.degree[locale]}
                </h3>
                <p className="text-sm font-medium text-accent">
                  {edu.institution}
                </p>
              </div>
              <time className="shrink-0 text-sm text-muted">
                {edu.period.start} — {edu.period.end ?? "..."}
              </time>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
