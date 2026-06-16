"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "@/components/language-provider";
import {
  EMPLOYMENT_BADGE,
  TYPE_BADGE,
  type ExperienceEntry,
  type ExperienceSelection,
} from "@/data/experience";
import {
  expandExperienceSteps,
  sortExperienceSteps,
} from "@/lib/experience-steps";
import { formatMonthRange, formatTenureDuration } from "@/lib/tenure-duration";

interface Props {
  entries: ExperienceEntry[];
  onSelect: (selection: ExperienceSelection) => void;
}

function stripMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\[(.*?)\]\(.*?\)/g, "$1");
}

export function ExperienceList({ entries, onSelect }: Props) {
  const { t, locale } = useTranslation();

  const steps = useMemo(
    () => sortExperienceSteps(expandExperienceSteps(entries), "desc"),
    [entries],
  );

  const employmentLabel = (contract: NonNullable<ExperienceEntry["employment"]>) =>
    contract === "clt" ? t.experience.employmentClt : t.experience.employmentPj;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-6 bg-gradient-to-b from-background to-transparent" />

      <div className="scrollbar-hidden max-h-[640px] overflow-y-auto py-4 sm:max-h-[680px] sm:py-6">
        <div className="space-y-3">
          {steps.map((step, i) => {
            const { entry } = step;
            const summary = stripMarkdown(step.summary[locale]);
            const duration = formatTenureDuration(
              step.period.start,
              step.period.end,
              locale,
              t.experience.present,
            );

            return (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.4) }}
                onClick={() => onSelect({ entry, tenureIndex: step.tenureIndex })}
                className="group w-full rounded-2xl border border-border p-4 text-left transition-all duration-200 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 sm:p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                      {step.role[locale]}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-accent">
                      {step.company}
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-muted sm:line-clamp-4 line-clamp-5">
                      {summary}
                    </p>

                    {entry.clients && entry.clients.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {entry.clients.slice(0, 3).map((client) => (
                          <span
                            key={`${client.name}-${client.relationship}`}
                            className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted"
                          >
                            {client.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {entry.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
                        >
                          {tech}
                        </span>
                      ))}
                      {entry.technologies.length > 4 && (
                        <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                          +{entry.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:pl-0">
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_BADGE[entry.type]}`}
                      >
                        {t.experience.types[entry.type]}
                      </span>
                      {entry.type === "fulltime" && entry.employment && (
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${EMPLOYMENT_BADGE[entry.employment]}`}
                        >
                          {employmentLabel(entry.employment)}
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <time className="block shrink-0 text-xs font-medium text-foreground sm:text-sm">
                        {formatMonthRange(
                          step.period.start,
                          step.period.end,
                          locale,
                          t.experience.present,
                        )}
                      </time>
                      <span className="mt-0.5 block text-[11px] text-muted">
                        {duration}
                      </span>
                    </div>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="hidden text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-6 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
