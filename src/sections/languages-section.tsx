"use client";

import { useTranslation } from "@/components/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { languages } from "@/data/resume";

const LEVEL_WIDTH: Record<string, string> = {
  native: "w-full",
  fluent: "w-4/5",
  intermediate: "w-3/5",
  basic: "w-2/5",
};

export function Languages() {
  const { t, locale } = useTranslation();

  return (
    <section id="languages" className="scroll-mt-20 py-24">
      <SectionHeading>{t.languages.title}</SectionHeading>

      <div className="max-w-md space-y-6">
        {languages.map((lang, i) => (
          <div key={i}>
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-sm font-medium text-foreground">
                {lang.name[locale]}
              </span>
              <span className="text-xs text-muted">
                {t.languages[lang.level]}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-border">
              <div
                className={`h-full rounded-full bg-accent transition-all duration-500 ${LEVEL_WIDTH[lang.level]}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
