"use client";

import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { experiences } from "@/data/resume";
import type { Locale } from "@/components/language-provider";

function formatPeriod(start: string, end: string | null, locale: Locale, presentLabel: string) {
  const fmt = (d: string) => {
    const date = new Date(d + "-01");
    return date.toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
      month: "short",
      year: "numeric",
    });
  };
  return `${fmt(start)} — ${end ? fmt(end) : presentLabel}`;
}

export function Experience() {
  const { t, locale } = useTranslation();

  return (
    <section id="experience" className="scroll-mt-20 py-24">
      <SectionHeading>{t.experience.title}</SectionHeading>

      <div className="space-y-12">
        {experiences.map((exp, i) => (
          <div key={i} className="group relative pl-8 before:absolute before:left-0 before:top-2 before:h-3 before:w-3 before:rounded-full before:bg-accent before:content-[''] after:absolute after:left-[5px] after:top-5 after:h-[calc(100%+12px)] after:w-px after:bg-border last:after:hidden after:content-['']">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {exp.role[locale]}
                </h3>
                <p className="text-sm font-medium text-accent">
                  {exp.company}
                </p>
              </div>
              <time className="shrink-0 text-sm text-muted">
                {formatPeriod(exp.period.start, exp.period.end, locale, t.experience.present)}
              </time>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {exp.description[locale]}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {exp.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
