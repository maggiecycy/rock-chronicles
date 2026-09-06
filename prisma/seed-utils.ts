import type { Localized } from "@/i18n/config";

export function splitLocalized(
  value: Localized | undefined,
  fallback = "",
): { en: string; zh: string } {
  if (!value) return { en: fallback, zh: fallback };
  if (typeof value === "string") return { en: value, zh: value };
  return { en: value.en, zh: value.zh };
}

export function mapTropeTone(tone: string): "lore" | "meme" | "half_true" {
  if (tone === "half-true") return "half_true";
  if (tone === "meme") return "meme";
  return "lore";
}

export function mapStickyVisual(
  visual: string,
):
  | "thesis"
  | "members"
  | "tracks"
  | "dna"
  | "quote"
  | "scene"
  | "influence"
  | "lineupVersions" {
  const allowed = [
    "thesis",
    "members",
    "tracks",
    "dna",
    "quote",
    "scene",
    "influence",
    "lineupVersions",
  ] as const;
  if ((allowed as readonly string[]).includes(visual)) {
    return visual as (typeof allowed)[number];
  }
  return "thesis";
}

export function parseTenureTo(
  to: number | "present" | undefined,
): { yearTo: number | null; present: boolean } {
  if (to === "present" || to === undefined) {
    return { yearTo: null, present: to === "present" };
  }
  return { yearTo: to, present: false };
}
