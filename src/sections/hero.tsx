"use client";

import { useTranslation } from "@/components/language-provider";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="flex min-h-[calc(100svh-73px)] flex-col justify-center py-20">
      <div className="max-w-2xl">
        <p className="mb-4 text-sm font-medium tracking-widest text-accent uppercase">
          {t.hero.greeting}
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {t.hero.name}
        </h1>

        <p className="mt-2 text-2xl font-medium text-muted sm:text-3xl">
          {t.hero.role}
        </p>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          {t.hero.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
          >
            {t.hero.cta}
          </a>
          <a
            href="#"
            className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-accent/10"
          >
            {t.hero.download}
          </a>
        </div>
      </div>
    </section>
  );
}
