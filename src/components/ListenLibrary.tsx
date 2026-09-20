"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TrackList } from "@/components/TrackList";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { AudioTrack } from "@/lib/audio";
import type { ListenEraGroup } from "@/lib/listen-groups";

function filterTracks(tracks: AudioTrack[], needle: string): AudioTrack[] {
  if (!needle) return tracks;
  return tracks.filter(
    (tr) =>
      tr.title.toLowerCase().includes(needle) ||
      tr.artistLabel.toLowerCase().includes(needle),
  );
}

export function ListenLibrary({
  eraGroups,
  extra,
}: {
  eraGroups: ListenEraGroup[];
  extra: AudioTrack[];
}) {
  const { locale, t } = useLocale();
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();

  const filteredEras = useMemo(() => {
    if (!needle) return eraGroups;
    return eraGroups
      .map((eg) => ({
        era: eg.era,
        bands: eg.bands
          .map((b) => ({
            ...b,
            tracks: filterTracks(b.tracks, needle),
          }))
          .filter((b) => b.tracks.length > 0),
      }))
      .filter((eg) => eg.bands.length > 0);
  }, [eraGroups, needle]);

  const filteredExtra = useMemo(
    () => filterTracks(extra, needle),
    [extra, needle],
  );

  const total =
    filteredEras.reduce(
      (n, eg) => n + eg.bands.reduce((m, b) => m + b.tracks.length, 0),
      0,
    ) + filteredExtra.length;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {t.listen.eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
          {t.listen.eyebrow}
        </p>
      ) : null}
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {t.listen.title}
      </h1>

      <label className="mt-8 block">
        <span className="sr-only">{t.listen.searchPlaceholder}</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.listen.searchPlaceholder}
          className="w-full border-2 border-ink bg-paper px-3 py-2 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>

      {total === 0 && (
        <p className="mt-8 text-sm text-muted">{t.listen.empty}</p>
      )}

      <div className="mt-10 space-y-14">
        {filteredEras.map((eg) => (
          <section key={eg.era.slug}>
            <div className="mb-6 flex flex-wrap items-baseline gap-3 border-b-2 border-ink pb-3">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                {eg.era.decade}
              </p>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                {loc(eg.era.name, locale)}
              </h2>
              {eg.era.slug !== "_unsorted" && (
                <Link
                  href={`/eras/${eg.era.slug}`}
                  className="text-xs uppercase tracking-wider text-muted underline-offset-2 hover:underline"
                >
                  {t.canon.openEra} →
                </Link>
              )}
            </div>
            <div className="space-y-6">
              {eg.bands.map((b) => (
                <TrackList
                  key={b.bandSlug}
                  tracks={b.tracks}
                  title={b.bandName}
                  showArtist={false}
                  replaceQueue
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {filteredExtra.length > 0 && (
        <section className="mt-14">
          <TrackList
            tracks={filteredExtra}
            title={t.listen.extra}
            hint={t.listen.extraHint}
            replaceQueue
          />
        </section>
      )}
    </main>
  );
}
