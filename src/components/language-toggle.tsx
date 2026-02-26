"use client";

import { useTranslation } from "@/components/language-provider";

export function LanguageToggle() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <button
        onClick={() => setLocale("pt")}
        className={`rounded px-1.5 py-0.5 transition-colors duration-200 ${
          locale === "pt"
            ? "text-accent"
            : "text-muted hover:text-foreground"
        }`}
        aria-label="Português"
      >
        PT
      </button>
      <span className="text-border">|</span>
      <button
        onClick={() => setLocale("en")}
        className={`rounded px-1.5 py-0.5 transition-colors duration-200 ${
          locale === "en"
            ? "text-accent"
            : "text-muted hover:text-foreground"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
