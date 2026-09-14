"use client";

import Link from "next/link";
import { useMusicPlayer } from "@/components/MusicPlayerProvider";
import { formatDuration, type AudioTrack } from "@/lib/audio";
import { useLocale } from "@/i18n/LocaleProvider";

export function TrackList({
  tracks,
  title,
  hint,
  showArtist = true,
  replaceQueue = true,
}: {
  tracks: AudioTrack[];
  title?: string;
  hint?: string;
  showArtist?: boolean;
  /** When true, clicking a track replaces the queue with this list. */
  replaceQueue?: boolean;
}) {
  const { playTracks, current, playing } = useMusicPlayer();
  const { t } = useLocale();

  if (!tracks.length) return null;

  const playAll = () => playTracks(tracks);

  const onRow = (track: AudioTrack) => {
    if (replaceQueue) playTracks(tracks, track.id);
    else playTracks([track], track.id);
  };

  return (
    <section className="border-2 border-ink p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          {title && (
            <h2 className="font-display text-xl font-semibold sm:text-2xl">
              {title}
            </h2>
          )}
          {hint && <p className="mt-1 max-w-xl text-sm text-muted">{hint}</p>}
        </div>
        {tracks.length >= 2 && (
          <button
            type="button"
            onClick={playAll}
            className="border-2 border-accent bg-accent px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-paper"
          >
            {t.player.playAll}
          </button>
        )}
      </div>
      <ul className="mt-4 divide-y divide-ink/15">
        {tracks.map((track) => {
          const active = current?.id === track.id;
          return (
            <li key={track.id}>
              <button
                type="button"
                onClick={() => onRow(track)}
                className={`flex w-full items-baseline justify-between gap-3 py-2.5 text-left text-sm hover:bg-ink/5 ${
                  active ? "font-medium text-accent" : ""
                }`}
              >
                <span className="min-w-0 truncate">
                  {active && playing ? "▶ " : active ? "❚❚ " : ""}
                  {track.title}
                  {showArtist && (
                    <span className="text-muted">
                      {" "}
                      ·{" "}
                      {track.bandSlug ? (
                        <Link
                          href={`/bands/${track.bandSlug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="underline-offset-2 hover:underline"
                        >
                          {track.artistLabel}
                        </Link>
                      ) : (
                        track.artistLabel
                      )}
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-xs text-muted">
                  {formatDuration(track.durationSec)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
