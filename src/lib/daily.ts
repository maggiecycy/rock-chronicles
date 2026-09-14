import { readFileSync } from "fs";
import { join } from "path";
import type { Localized } from "@/i18n/config";

export interface DailyBandEntry {
  day: number;
  bandSlug: string;
  name: string;
  eraSlug: string;
  signature: { title: string; year: number };
  note: Localized | null;
  links: { label: string; url: string }[];
}

export interface DailyBandIndex {
  version: number;
  title: Localized;
  intro: Localized;
  days: DailyBandEntry[];
}

let cached: DailyBandIndex | null = null;
let cachedMtime = 0;

export function getDailyBandIndex(): DailyBandIndex {
  const path = join(process.cwd(), "content/daily/one-band-a-day.json");
  const { mtimeMs } = require("fs").statSync(path);
  if (cached && cachedMtime === mtimeMs) return cached;
  cached = JSON.parse(readFileSync(path, "utf8")) as DailyBandIndex;
  cachedMtime = mtimeMs;
  return cached;
}
