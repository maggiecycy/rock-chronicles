export type Locale = "en" | "zh";

export const LOCALES: Locale[] = ["en", "zh"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "rock-chronicles-locale";

/** UI or content string that can be plain (legacy) or bilingual. */
export type Localized = string | { en: string; zh: string };

export function loc(value: Localized | undefined | null, locale: Locale): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[locale] || value.en || value.zh || "";
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "zh";
}
