"use client";

import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <span className="text-sm font-semibold tracking-tight text-foreground">
        Andressa
      </span>
      <ThemeToggle />
    </header>
  );
}
