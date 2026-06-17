"use client";

import { useTranslation } from "@/components/language-provider";

export function MaosLivresHighlight() {
  const { t } = useTranslation();

  return (
    <a
      href="https://maoslivres.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group mb-8 flex flex-col gap-3 rounded-2xl border border-border bg-linear-to-br from-sky-500/5 via-transparent to-accent/5 p-5 transition-colors hover:border-accent/35 sm:flex-row sm:items-center sm:justify-between sm:p-6"
    >
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          {t.experience.companyHighlightLabel}
        </p>
        <h3 className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-xl">
          {t.experience.companyHighlightTitle}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {t.experience.companyHighlightDescription}
        </p>
      </div>

      <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity group-hover:opacity-90 sm:self-center">
        {t.experience.visitHub}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </span>
    </a>
  );
}
