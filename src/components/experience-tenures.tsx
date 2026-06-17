"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import { useTranslation } from "@/components/language-provider";
import type { CareerTenure } from "@/data/experience";
import {
  formatMonthRange,
  formatTenureDuration,
} from "@/lib/tenure-duration";

const markdownComponents: Components = {
  p: ({ children }) => (
    <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
  ),
};

interface Props {
  tenures: CareerTenure[];
}

export function ExperienceTenures({ tenures }: Props) {
  const { locale, t } = useTranslation();

  return (
    <div className="mb-8">
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
        {t.experience.careerPath}
      </h4>

      <ol className="relative space-y-0">
        {tenures.map((tenure, index) => {
          const isLast = index === tenures.length - 1;
          const duration = formatTenureDuration(
            tenure.period.start,
            tenure.period.end,
            locale,
            t.experience.present,
          );
          const range = formatMonthRange(
            tenure.period.start,
            tenure.period.end,
            locale,
            t.experience.present,
          );

          return (
            <li key={`${tenure.company}-${tenure.role.pt}-${tenure.period.start}`} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast && (
                <span
                  className="absolute left-[11px] top-6 bottom-0 w-px bg-border"
                  aria-hidden
                />
              )}

              <span
                className="relative z-10 mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background text-[10px] font-bold text-accent"
                aria-hidden
              >
                {index + 1}
              </span>

              <div className="min-w-0 flex-1 rounded-2xl border border-border bg-background p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                      {tenure.company}
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-foreground">
                      {tenure.role[locale]}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {duration}
                  </span>
                </div>

                <p className="mt-2 text-xs text-muted">{range}</p>

                {tenure.highlight && (
                  <ReactMarkdown components={markdownComponents}>
                    {tenure.highlight[locale]}
                  </ReactMarkdown>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
