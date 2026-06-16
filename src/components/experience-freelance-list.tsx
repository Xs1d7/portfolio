"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/components/language-provider";
import { TYPE_BADGE, type ExperienceEntry, type ExperienceSelection } from "@/data/experience";

interface Props {
  entries: ExperienceEntry[];
  onSelect: (selection: ExperienceSelection) => void;
}

function stripMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\[(.*?)\]\(.*?\)/g, "$1");
}

export function ExperienceFreelanceList({ entries, onSelect }: Props) {
  const { t, locale } = useTranslation();

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {entries.map((entry, i) => {
        const duration = entry.productionDuration?.[locale] ?? "—";
        const summary = stripMarkdown(entry.shortDescription[locale]);

        return (
          <motion.button
            key={entry.id}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
            onClick={() => onSelect({ entry, tenureIndex: null })}
            className="group flex h-full flex-col rounded-2xl border border-border p-4 text-left transition-all duration-200 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5 sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                  {entry.role[locale]}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-amber-600 dark:text-amber-400">
                  {entry.company}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_BADGE.freelance}`}
              >
                {t.experience.types.freelance}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-4">
              {summary}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {entry.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400"
                >
                  {tech}
                </span>
              ))}
              {entry.technologies.length > 4 && (
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                  +{entry.technologies.length - 4}
                </span>
              )}
            </div>

            <p className="mt-auto pt-4 text-xs font-medium text-muted">
              <span className="text-foreground/70">{t.freelances.productionTime}:</span>{" "}
              {duration}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
