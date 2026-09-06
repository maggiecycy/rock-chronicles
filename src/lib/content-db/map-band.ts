import type { Localized } from "@/i18n/config";
import type { Prisma, StickyVisual as PrismaStickyVisual } from "@prisma/client";
import type {
  Band,
  BandScene,
  StickyVisual,
} from "@/lib/types";

export const bandDetailInclude = {
  genres: { orderBy: { sortOrder: "asc" as const } },
  alsoEras: true,
  members: { orderBy: { sortOrder: "asc" as const } },
  essentialTracks: { orderBy: { sortOrder: "asc" as const } },
  lyricQuotes: { orderBy: { sortOrder: "asc" as const } },
  scenes: { orderBy: { sortOrder: "asc" as const } },
  interviewQuotes: { orderBy: { sortOrder: "asc" as const } },
  narratives: { orderBy: { sortOrder: "asc" as const } },
  lineupVersions: {
    orderBy: { sortOrder: "asc" as const },
    include: {
      members: { orderBy: { sortOrder: "asc" as const } },
    },
  },
  landmark: {
    include: {
      genres: { orderBy: { sortOrder: "asc" as const } },
    },
  },
  relatedOut: true,
  influenceOut: true,
  influenceIn: true,
} satisfies Prisma.BandInclude;

export type BandDetailRecord = Prisma.BandGetPayload<{
  include: typeof bandDetailInclude;
}>;

function localized(en: string, zh: string): Localized {
  return { en, zh };
}

function optionalLocalized(
  en: string | null | undefined,
  zh: string | null | undefined,
): Localized | undefined {
  if (!en && !zh) return undefined;
  return { en: en ?? "", zh: zh ?? "" };
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

function mapStickyVisual(visual: PrismaStickyVisual): StickyVisual {
  return visual;
}

export function mapBandFromDb(row: BandDetailRecord): Band {
  const scenes: BandScene[] | undefined =
    row.scenes.length === 0
      ? undefined
      : row.scenes.map((s) => {
          const intensity = s.intensity;
          return {
            year: s.year,
            track: s.track,
            membersOnStage: asStringArray(s.membersOnStage),
            genreTags: asStringArray(s.genreTags),
            note: optionalLocalized(s.noteEn, s.noteZh),
            intensity:
              intensity === 1 || intensity === 2 || intensity === 3
                ? intensity
                : undefined,
          };
        });

  const alsoAppearsIn = row.alsoEras.map((e) => e.eraSlug);
  const whyMatters = optionalLocalized(row.whyMattersEn, row.whyMattersZh);

  return {
    name: row.name,
    slug: row.slug,
    formed: row.formed,
    origin: row.origin,
    primaryEra: row.primaryEraSlug,
    alsoAppearsIn: alsoAppearsIn.length ? alsoAppearsIn : undefined,
    genres: row.genres.map((g) => g.genreSlug),
    members: row.members.map((m) => ({
      name: m.name,
      role: m.role,
      years: m.years,
      personSlug: m.personSlug ?? undefined,
    })),
    essentialTracks: row.essentialTracks.map((t) => ({
      title: t.title,
      year: t.year,
      note: optionalLocalized(t.noteEn, t.noteZh),
    })),
    lyricQuotes: row.lyricQuotes.map((q) => q.quote),
    relatedBands: row.relatedOut.map((r) => r.toBandSlug),
    influenceFrom: row.influenceIn.map((e) => e.fromBandSlug),
    influenced: row.influenceOut.map((e) => e.toBandSlug),
    shortBio: localized(row.shortBioEn, row.shortBioZh),
    body: localized(row.bodyEn, row.bodyZh),
    accentColor: row.accentColor ?? undefined,
    decisive: row.decisive || undefined,
    whyMatters,
    scenes,
    interviewQuotes:
      row.interviewQuotes.length === 0
        ? undefined
        : row.interviewQuotes.map((q) => ({
            text: q.text,
            speaker: q.speaker,
            source: q.source,
            year: q.year ?? undefined,
          })),
    narrative:
      row.narratives.length === 0
        ? undefined
        : row.narratives.map((ch) => ({
            id: ch.chapterId,
            title: localized(ch.titleEn, ch.titleZh),
            body: localized(ch.bodyEn, ch.bodyZh),
            stickyVisual: mapStickyVisual(ch.stickyVisual),
            sceneIndex: ch.sceneIndex ?? undefined,
            quoteIndex: ch.quoteIndex ?? undefined,
            soundGenre: ch.soundGenre ?? undefined,
          })),
    lineupVersions:
      row.lineupVersions.length === 0
        ? undefined
        : row.lineupVersions.map((v) => ({
            id: v.versionId,
            label: localized(v.labelEn, v.labelZh),
            years: v.years,
            note: optionalLocalized(v.noteEn, v.noteZh),
            peak: v.peak || undefined,
            members: v.members.map((m) => ({
              name: m.name,
              role: m.role,
              personSlug: m.personSlug ?? undefined,
            })),
          })),
    landmark: row.landmark
      ? {
          debutTrack: {
            title: row.landmark.debutTitle,
            year: row.landmark.debutYear,
            note: optionalLocalized(
              row.landmark.debutNoteEn,
              row.landmark.debutNoteZh,
            ),
          },
          pioneeredGenres: row.landmark.genres.map((g) => g.genreSlug),
          note: optionalLocalized(row.landmark.noteEn, row.landmark.noteZh),
        }
      : undefined,
  };
}
