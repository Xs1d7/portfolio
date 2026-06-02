"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { ExperienceDetail } from "@/components/experience-detail";
import {
  experienceEntries,
  TYPE_BADGE,
  type ExperienceEntry,
  type ExperienceType,
} from "@/data/experience";
import type { Locale } from "@/components/language-provider";

const FILTERS: Array<ExperienceType | "all"> = [
  "all",
  "personal",
  "fulltime",
  "freelance",
];

function formatPeriod(start: string, end: string | null, locale: Locale, presentLabel: string) {
  const fmt = (d: string) => {
    const date = new Date(d.length === 7 ? d + "-01" : d + "-01-01");
    return date.toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
      month: "short",
      year: "numeric",
    });
  };
  return `${fmt(start)} — ${end ? fmt(end) : presentLabel}`;
}

export function Experience() {
  const { t, locale } = useTranslation();
  const [selected, setSelected] = useState<ExperienceEntry | null>(null);
  const [filter, setFilter] = useState<ExperienceType | "all">("all");

  const filtered =
    filter === "all"
      ? experienceEntries
      : experienceEntries.filter((entry) => entry.type === filter);

  const filterLabel = (key: ExperienceType | "all") =>
    key === "all" ? t.experience.filterAll : t.experience.types[key];

  return (
    <section id="experience" className="scroll-mt-20 py-16 sm:py-24">
      <SectionHeading>{t.experience.title}</SectionHeading>

      {/* Type filters */}
      <div className="mb-2 flex flex-wrap gap-2">
        {FILTERS.map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filter === key
                ? "bg-accent text-white"
                : "border border-border text-muted hover:border-accent/40 hover:text-foreground"
            }`}
          >
            {filterLabel(key)}
          </button>
        ))}
      </div>

      {/* Scroll container with fade gradients */}
      <div className="relative">
        {/* Top fade */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-6 bg-gradient-to-b from-background to-transparent" />

        {/* Scrollable list — shows ~3 items, rest via scroll */}
        <div className="scrollbar-hidden max-h-[520px] overflow-y-auto py-4 sm:max-h-[540px] sm:py-6">
          <div className="space-y-4">
            {filtered.map((entry, i) => (
              <motion.button
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setSelected(entry)}
                className="group w-full rounded-2xl border border-border p-4 text-left transition-all duration-200 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 sm:p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    {/* Role + company */}
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                      <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                        {entry.role[locale]}
                      </h3>
                    </div>
                    <p className="mt-1 pl-5.5 text-sm font-medium text-accent">
                      {entry.company}
                    </p>

                    {/* Short description */}
                    <p className="mt-2.5 pl-5.5 text-sm leading-relaxed text-muted">
                      {entry.shortDescription[locale]}
                    </p>

                    {/* Tech tags — first 4 */}
                    <div className="mt-3 flex flex-wrap gap-1.5 pl-5.5">
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

                  {/* Period + indicators */}
                  <div className="flex flex-wrap items-center gap-2 pl-5.5 sm:flex-col sm:items-end sm:pl-0">
                    {/* Type badge */}
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_BADGE[entry.type]}`}
                    >
                      {t.experience.types[entry.type]}
                    </span>

                    <time className="shrink-0 text-xs text-muted sm:text-sm">
                      {formatPeriod(entry.period.start, entry.period.end, locale, t.experience.present)}
                    </time>

                    {/* Media indicator */}
                    {entry.media.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        {entry.media.length}
                      </div>
                    )}

                    {/* Arrow */}
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="hidden text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-6 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Scroll hint */}
      <p className="mt-3 text-center text-xs text-muted">
        {t.experience.scrollHint}
      </p>

      {/* Detail panel */}
      {selected && (
        <ExperienceDetail
          entry={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
