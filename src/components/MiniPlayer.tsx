"use client";

import Link from "next/link";
import { useMusicPlayer } from "@/components/MusicPlayerProvider";
import { formatDuration } from "@/lib/audio";
import { useLocale } from "@/i18n/LocaleProvider";

export function MiniPlayer() {
  const {
    current,
    playing,
    progress,
    duration,
    queue,
    index,
    queueOpen,
    setQueueOpen,
    toggle,
    next,
    prev,
    seek,
    jumpTo,
    close,
  } = useMusicPlayer();
  const { t } = useLocale();

  if (!current) return null;

  const ratio = duration > 0 ? progress / duration : 0;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-stretch">
      {queueOpen && (
        <div className="pointer-events-auto mx-auto mb-2 max-h-64 w-full max-w-3xl overflow-auto border-2 border-ink bg-paper shadow-lg sm:mb-3">
          <div className="sticky top-0 flex items-center justify-between border-b border-ink/20 bg-paper px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              {t.player.queue} · {queue.length}
            </p>
            <button
              type="button"
              className="text-xs uppercase tracking-wider underline-offset-2 hover:underline"
              onClick={() => setQueueOpen(false)}
            >
              {t.player.closeQueue}
            </button>
          </div>
          <ul>
            {queue.map((track, i) => (
              <li key={`${track.id}-${i}`}>
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  className={`flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-ink/5 ${
                    i === index ? "bg-ink/10 font-medium" : ""
                  }`}
                >
                  <span className="min-w-0 truncate">
                    {track.title}
                    <span className="text-muted"> · {track.artistLabel}</span>
                  </span>
                  <span className="shrink-0 text-xs text-muted">
                    {formatDuration(track.durationSec)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pointer-events-auto border-t-2 border-ink bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2 sm:px-6 sm:py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium sm:text-base">
              {current.title}
            </p>
            <p className="truncate text-xs text-muted">
              {current.bandSlug ? (
                <Link
                  href={`/bands/${current.bandSlug}`}
                  className="underline-offset-2 hover:underline"
                >
                  {current.artistLabel}
                </Link>
              ) : (
                current.artistLabel
              )}
              {current.extra ? (
                <span className="ml-2 uppercase tracking-wider text-accent">
                  Extra
                </span>
              ) : null}
            </p>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label={t.player.prev}
              className="border-2 border-ink px-2 py-1 text-xs font-medium uppercase tracking-wider hover:bg-ink hover:text-paper"
            >
              ‹‹
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? t.player.pause : t.player.play}
              className="border-2 border-accent bg-accent px-3 py-1 text-xs font-medium uppercase tracking-wider text-paper"
            >
              {playing ? t.player.pause : t.player.play}
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t.player.next}
              disabled={index >= queue.length - 1}
              className="border-2 border-ink px-2 py-1 text-xs font-medium uppercase tracking-wider hover:bg-ink hover:text-paper disabled:opacity-40"
            >
              ››
            </button>
            <button
              type="button"
              onClick={() => setQueueOpen(!queueOpen)}
              aria-expanded={queueOpen}
              className="hidden border-2 border-ink px-2 py-1 text-xs font-medium uppercase tracking-wider hover:bg-ink/10 sm:inline"
            >
              {t.player.queue}
            </button>
            <button
              type="button"
              onClick={close}
              aria-label={t.player.close}
              className="border-2 border-ink px-2 py-1 text-xs font-medium uppercase tracking-wider hover:bg-ink hover:text-paper"
            >
              {t.player.close}
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 pb-2 sm:px-6">
          <span className="w-10 shrink-0 text-right text-[10px] tabular-nums text-muted">
            {formatDuration(progress)}
          </span>
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(ratio * 1000)}
            aria-label={t.player.seek}
            onChange={(e) => seek(Number(e.target.value) / 1000)}
            className="h-1 flex-1 cursor-pointer accent-[var(--color-accent,#c45c26)]"
          />
          <span className="w-10 shrink-0 text-[10px] tabular-nums text-muted">
            {formatDuration(duration || current.durationSec)}
          </span>
        </div>
      </div>
    </div>
  );
}
