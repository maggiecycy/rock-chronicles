import { readFileSync, statSync } from "fs";
import { join } from "path";
import type { Localized } from "@/i18n/config";
import { getAllBands } from "@/lib/content";
import { bandShipStatus, isBandComplete } from "@/lib/band-status";
import type { Band } from "@/lib/types";

export interface CanonSignature {
  title: string;
  year: number;
}

export interface CanonBand {
  slug: string;
  name: string;
  formed: number;
  origin: string;
  primaryEra: string;
  genres: string[];
  signature: CanonSignature;
  role: Localized;
}

export interface CanonPeriod {
  id: string;
  order: number;
  /** Same as timeline Era.slug — single source of truth */
  eraSlug: string;
  name: Localized;
  years: string;
  summary: Localized;
  bands: CanonBand[];
}

export interface CanonResource {
  name: string;
  url: string;
  note: Localized;
}

export interface HundredBandsCanon {
  version: number;
  title: Localized;
  intro: Localized;
  selectionPrinciples: { en: string[]; zh: string[] };
  periods: CanonPeriod[];
  expansionCandidates: string[];
  resources: {
    forums: CanonResource[];
    media: CanonResource[];
    youtube: CanonResource[];
  };
  futureFeatures: { en: string[]; zh: string[] };
}

let cached: HundredBandsCanon | null = null;
let cachedMtimeMs = 0;

export function getHundredBandsCanon(): HundredBandsCanon {
  const path = join(process.cwd(), "content/canon/hundred-bands.json");
  const { mtimeMs } = statSync(path);
  if (cached && cachedMtimeMs === mtimeMs) return cached;
  cached = JSON.parse(readFileSync(path, "utf8")) as HundredBandsCanon;
  cachedMtimeMs = mtimeMs;
  return cached;
}

export type CanonCoverage = {
  total: number;
  /** Full magazine pages (narrative chapters) */
  complete: number;
  /** Stub bio pages only */
  stub: number;
  missing: number;
};

export async function getCanonCoverage(): Promise<{
  coverage: CanonCoverage;
  bySlug: Map<string, Band>;
}> {
  const canon = getHundredBandsCanon();
  const bands = await getAllBands();
  const bySlug = new Map(bands.map((b) => [b.slug, b]));

  const allSlugs = [
    ...new Set(canon.periods.flatMap((p) => p.bands.map((b) => b.slug))),
  ];

  let complete = 0;
  let stub = 0;
  let missing = 0;
  for (const slug of allSlugs) {
    const status = bandShipStatus(slug, bySlug);
    if (status === "complete") complete++;
    else if (status === "stub") stub++;
    else missing++;
  }

  return {
    coverage: {
      total: allSlugs.length,
      complete,
      stub,
      missing,
    },
    bySlug,
  };
}

export { isBandComplete };
