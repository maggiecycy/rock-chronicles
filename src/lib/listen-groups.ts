import { audioIndex, type AudioTrack } from "@/lib/audio";
import type { Band, Era } from "@/lib/types";

export type ListenBandGroup = {
  bandSlug: string;
  bandName: string;
  formed: number;
  eraSlug: string;
  tracks: AudioTrack[];
};

export type ListenEraGroup = {
  era: Era;
  bands: ListenBandGroup[];
};

/** Chronicle tracks grouped by era → band; Extra as a flat list. */
export function buildListenGroups(
  eras: Era[],
  bands: Band[],
  tracks: AudioTrack[] = audioIndex.tracks,
): { eras: ListenEraGroup[]; extra: AudioTrack[] } {
  const bandBySlug = new Map(bands.map((b) => [b.slug, b]));
  const eraOrder = new Map(eras.map((e) => [e.slug, e.order]));
  const erasSorted = eras.slice().sort((a, b) => a.order - b.order);

  const chronicle = tracks.filter((t) => !t.extra && t.bandSlug);
  const extra = tracks
    .filter((t) => t.extra || !t.bandSlug)
    .slice()
    .sort(
      (a, b) =>
        a.artistLabel.localeCompare(b.artistLabel) ||
        a.title.localeCompare(b.title),
    );

  const byBand = new Map<string, AudioTrack[]>();
  for (const t of chronicle) {
    const slug = t.bandSlug!;
    if (!byBand.has(slug)) byBand.set(slug, []);
    byBand.get(slug)!.push(t);
  }

  const bandGroups: ListenBandGroup[] = [...byBand.entries()]
    .map(([bandSlug, bandTracks]) => {
      const band = bandBySlug.get(bandSlug);
      return {
        bandSlug,
        bandName: band?.name ?? bandTracks[0]?.artistLabel ?? bandSlug,
        formed: band?.formed ?? 9999,
        eraSlug: band?.primaryEra ?? "",
        tracks: bandTracks
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title)),
      };
    })
    .sort((a, b) => {
      const oa = eraOrder.get(a.eraSlug) ?? 999;
      const ob = eraOrder.get(b.eraSlug) ?? 999;
      if (oa !== ob) return oa - ob;
      if (a.formed !== b.formed) return a.formed - b.formed;
      return a.bandName.localeCompare(b.bandName);
    });

  const byEraSlug = new Map<string, ListenBandGroup[]>();
  const noEra: ListenBandGroup[] = [];
  for (const g of bandGroups) {
    if (!g.eraSlug || !eraOrder.has(g.eraSlug)) {
      noEra.push(g);
      continue;
    }
    if (!byEraSlug.has(g.eraSlug)) byEraSlug.set(g.eraSlug, []);
    byEraSlug.get(g.eraSlug)!.push(g);
  }

  const eraGroups: ListenEraGroup[] = erasSorted
    .filter((era) => (byEraSlug.get(era.slug)?.length ?? 0) > 0)
    .map((era) => ({ era, bands: byEraSlug.get(era.slug)! }));

  if (noEra.length) {
    eraGroups.push({
      era: {
        slug: "_unsorted",
        name: { en: "Unsorted", zh: "未分期" },
        decade: "—",
        years: "—",
        order: 999,
        summary: { en: "", zh: "" },
        sound: { en: "", zh: "" },
        anchorBands: [],
        alsoNotable: [],
        genres: [],
        body: { en: "", zh: "" },
      },
      bands: noEra,
    });
  }

  return { eras: eraGroups, extra };
}
