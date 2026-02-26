"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useTranslation } from "@/components/language-provider";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between py-6">
      <span className="text-sm font-semibold tracking-tight text-foreground">
        {t.header.name}
      </span>
      <div className="flex items-center gap-3">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
}
