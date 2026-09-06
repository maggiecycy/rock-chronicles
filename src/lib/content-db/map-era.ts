import type { Prisma } from "@prisma/client";
import type { Era } from "@/lib/types";
import { localized } from "./localize";

export const eraDetailInclude = {
  alsoNotable: { orderBy: { sortOrder: "asc" as const } },
  genres: { orderBy: { sortOrder: "asc" as const } },
  anchorBands: { orderBy: { sortOrder: "asc" as const } },
} satisfies Prisma.EraInclude;

export type EraDetailRecord = Prisma.EraGetPayload<{
  include: typeof eraDetailInclude;
}>;

export function mapEraFromDb(row: EraDetailRecord): Era {
  return {
    slug: row.slug,
    name: localized(row.nameEn, row.nameZh),
    decade: row.decade,
    years: row.years,
    order: row.sortOrder,
    summary: localized(row.summaryEn, row.summaryZh),
    sound: localized(row.soundEn, row.soundZh),
    body: localized(row.bodyEn, row.bodyZh),
    alsoNotable: row.alsoNotable.map((n) => n.label),
    genres: row.genres.map((g) => g.genreSlug),
    anchorBands: row.anchorBands.map((b) => b.bandSlug),
  };
}
