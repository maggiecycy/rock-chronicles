import type { Band } from "@/lib/types";

/** Full long-form page: magazine chapters, not just a stub bio. */
export const COMPLETE_NARRATIVE_MIN = 3;

export function isBandComplete(band: Band): boolean {
  return (band.narrative?.length ?? 0) >= COMPLETE_NARRATIVE_MIN;
}

export type BandShipStatus = "complete" | "stub" | "missing";

export function bandShipStatus(
  slug: string,
  bySlug: Map<string, Band>,
): BandShipStatus {
  const band = bySlug.get(slug);
  if (!band) return "missing";
  return isBandComplete(band) ? "complete" : "stub";
}
