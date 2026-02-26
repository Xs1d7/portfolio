"use client";

import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="scroll-mt-20 py-24">
      <SectionHeading>{t.about.title}</SectionHeading>

      <div className="max-w-2xl space-y-6">
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {t.about.p1}
        </p>
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {t.about.p2}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <span className="inline-flex items-center gap-2 text-sm text-foreground">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t.about.location}
          </span>

          <span className="inline-flex items-center gap-2 text-sm text-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {t.about.available}
          </span>
        </div>
      </div>
    </section>
  );
}
