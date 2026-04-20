"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import pt from "@/translations/pt.json";
import en from "@/translations/en.json";

export type Locale = "pt" | "en";

type Translations = typeof pt;

const dictionaries: Record<Locale, Translations> = { pt, en };

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "locale";

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "pt";

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "pt" || stored === "en" ? stored : "pt";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale === "pt" ? "pt-BR" : "en";
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t: dictionaries[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}
