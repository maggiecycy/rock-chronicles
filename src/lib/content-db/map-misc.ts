import type { Prisma, TropeTone as PrismaTropeTone } from "@prisma/client";
import type {
  GuideArticle,
  LiveEvent,
  Trope,
  TropeTone,
} from "@/lib/types";
import { localized, optionalLocalized } from "./localize";

export const guideDetailInclude = {
  relatedBands: { orderBy: { sortOrder: "asc" as const } },
  relatedGenres: { orderBy: { sortOrder: "asc" as const } },
  relatedTropes: { orderBy: { sortOrder: "asc" as const } },
} satisfies Prisma.GuideArticleInclude;

export type GuideDetailRecord = Prisma.GuideArticleGetPayload<{
  include: typeof guideDetailInclude;
}>;

export function mapGuideFromDb(row: GuideDetailRecord): GuideArticle {
  return {
    slug: row.slug,
    order: row.sortOrder,
    title: localized(row.titleEn, row.titleZh),
    summary: localized(row.summaryEn, row.summaryZh),
    body: localized(row.bodyEn, row.bodyZh),
    relatedBandSlugs: row.relatedBands.length
      ? row.relatedBands.map((b) => b.bandSlug)
      : undefined,
    relatedGenreSlugs: row.relatedGenres.length
      ? row.relatedGenres.map((g) => g.genreSlug)
      : undefined,
    relatedTropeSlugs: row.relatedTropes.length
      ? row.relatedTropes.map((t) => t.tropeSlug)
      : undefined,
  };
}

export const tropeDetailInclude = {
  examples: { orderBy: { sortOrder: "asc" as const } },
} satisfies Prisma.TropeInclude;

export type TropeDetailRecord = Prisma.TropeGetPayload<{
  include: typeof tropeDetailInclude;
}>;

function mapTropeTone(tone: PrismaTropeTone): TropeTone {
  if (tone === "half_true") return "half-true";
  return tone;
}

export function mapTropeFromDb(row: TropeDetailRecord): Trope {
  return {
    slug: row.slug,
    title: localized(row.titleEn, row.titleZh),
    summary: localized(row.summaryEn, row.summaryZh),
    body: localized(row.bodyEn, row.bodyZh),
    tone: mapTropeTone(row.tone),
    examples: row.examples.map((ex) => ({
      label: ex.label,
      bandSlug: ex.bandSlug ?? undefined,
      personSlug: ex.personSlug ?? undefined,
      note: optionalLocalized(ex.noteEn, ex.noteZh),
    })),
  };
}

export const liveDetailInclude = {
  bands: { orderBy: { sortOrder: "asc" as const } },
  tracks: { orderBy: { sortOrder: "asc" as const } },
} satisfies Prisma.LiveEventInclude;

export type LiveDetailRecord = Prisma.LiveEventGetPayload<{
  include: typeof liveDetailInclude;
}>;

export function mapLiveFromDb(row: LiveDetailRecord): LiveEvent {
  return {
    slug: row.slug,
    title: localized(row.titleEn, row.titleZh),
    year: row.year,
    venue: localized(row.venueEn, row.venueZh),
    summary: localized(row.summaryEn, row.summaryZh),
    whyEpic: localized(row.whyEpicEn, row.whyEpicZh),
    bandSlugs: row.bands.map((b) => b.bandSlug),
    keyTracks: row.tracks.map((t) => ({
      title: t.title,
      bandSlug: t.bandSlug ?? undefined,
      note: optionalLocalized(t.noteEn, t.noteZh),
    })),
    rightsNote: optionalLocalized(row.rightsNoteEn, row.rightsNoteZh),
  };
}
