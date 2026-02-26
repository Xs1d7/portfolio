"use client";

import { useTranslation } from "@/components/language-provider";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold tracking-tight">{t.hero.title}</h1>
      <p className="mt-2 text-muted">{t.hero.subtitle}</p>
    </main>
  );
}
