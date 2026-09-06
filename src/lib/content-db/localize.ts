import type { Localized } from "@/i18n/config";

export function localized(en: string, zh: string): Localized {
  return { en, zh };
}

export function optionalLocalized(
  en: string | null | undefined,
  zh: string | null | undefined,
): Localized | undefined {
  if (!en && !zh) return undefined;
  return { en: en ?? "", zh: zh ?? "" };
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}
