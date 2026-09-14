"use client";

import { useMemo, useState } from "react";
import { TrackList } from "@/components/TrackList";
import { useLocale } from "@/i18n/LocaleProvider";
import { audioIndex, type AudioTrack } from "@/lib/audio";

function groupByArtist(tracks: AudioTrack[]) {
  const map = new Map<string, AudioTrack[]>();
  for (const t of tracks) {
    const key = t.artistLabel;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(t);
  }
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

export default function ListenPage() {
  const { t } = useLocale();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return audioIndex.tracks;
    return audioIndex.tracks.filter(
      (tr) =>
        tr.title.toLowerCase().includes(needle) ||
        tr.artistLabel.toLowerCase().includes(needle),
    );
  }, [q]);

  const inChronicle = filtered.filter((tr) => !tr.extra);
  const extra = filtered.filter((tr) => tr.extra);
  const extraGroups = groupByArtist(extra);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
        {t.listen.eyebrow}
      </p>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {t.listen.title}
      </h1>
      <p className="mt-4 text-lg text-ink-soft">{t.listen.intro}</p>
      <p className="mt-2 text-sm text-muted">
        {audioIndex.trackCount} {t.listen.trackCount} · {t.listen.rights}
      </p>

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

      {filtered.length === 0 && (
        <p className="mt-8 text-sm text-muted">{t.listen.empty}</p>
      )}

      {inChronicle.length > 0 && (
        <div className="mt-10">
          <TrackList
            tracks={inChronicle}
            title={t.listen.inChronicle}
            replaceQueue
          />
        </div>
      )}

      {extraGroups.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            {t.listen.extra}
          </h2>
          <p className="mt-2 text-sm text-muted">{t.listen.extraHint}</p>
          <div className="mt-6 space-y-6">
            {extraGroups.map(([artist, tracks]) => (
              <TrackList
                key={artist}
                tracks={tracks}
                title={artist}
                showArtist={false}
                replaceQueue
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
