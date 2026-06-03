"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import type { Locale } from "@/components/language-provider";
import {
  EMPLOYMENT_BADGE,
  TYPE_BADGE,
  type ExperienceEntry,
  type ExperienceType,
} from "@/data/experience";
import { formatMonthRange } from "@/lib/tenure-duration";

interface Props {
  entries: ExperienceEntry[];
  onSelect: (entry: ExperienceEntry) => void;
}

export function ExperienceList({ entries, onSelect }: Props) {
  const { t, locale } = useTranslation();

  const employmentLabel = (contract: NonNullable<ExperienceEntry["employment"]>) =>
    contract === "clt" ? t.experience.employmentClt : t.experience.employmentPj;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-6 bg-gradient-to-b from-background to-transparent" />

      <div className="scrollbar-hidden max-h-[520px] overflow-y-auto py-4 sm:max-h-[540px] sm:py-6">
        <div className="space-y-4">
          {entries.map((entry, i) => (
            <motion.button
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => onSelect(entry)}
              className="group w-full rounded-2xl border border-border p-4 text-left transition-all duration-200 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 sm:p-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                    <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                      {entry.role[locale]}
                    </h3>
                  </div>
                  <p className="mt-1 pl-5.5 text-sm font-medium text-accent">
                    {entry.company}
                  </p>
                  {entry.tenures && entry.tenures.length > 0 && (
                    <p className="mt-1 pl-5.5 text-xs font-medium text-muted">
                      {entry.tenures.length}{" "}
                      {entry.tenures.length === 1
                        ? t.experience.tenureSingular
                        : t.experience.tenurePlural}{" "}
                      · {t.experience.tenureListHint}
                    </p>
                  )}
                  <p className="mt-2.5 pl-5.5 text-sm leading-relaxed text-muted">
                    {entry.shortDescription[locale]}
                  </p>

                  {entry.clients && entry.clients.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 pl-5.5">
                      {entry.clients.slice(0, 3).map((client) => (
                        <span
                          key={`${client.name}-${client.relationship}`}
                          className="rounded-full border border-border px-2.5 py-0.5 text-[11px] font-medium text-muted"
                        >
                          {client.name}
                          <span className="text-foreground/40"> · </span>
                            {entry.id === "prodia" && client.name === "Mãos Livres"
                              ? t.experience.parentCompany
                              : client.relationship === "direct"
                                ? t.experience.clientDirect
                                : t.experience.clientIndirect}
                        </span>
                      ))}
                    </div>
                  )}

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

                <div className="flex flex-wrap items-center gap-2 pl-5.5 sm:flex-col sm:items-end sm:pl-0">
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

                  <time className="shrink-0 text-xs text-muted sm:text-sm">
                    {formatMonthRange(
                      entry.period.start,
                      entry.period.end,
                      locale,
                      t.experience.present,
                    )}
                  </time>

                  {entry.media.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                      {entry.media.length}
                    </div>
                  )}

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
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-6 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
