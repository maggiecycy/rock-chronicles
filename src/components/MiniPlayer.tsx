"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMusicPlayer } from "@/components/MusicPlayerProvider";
import { formatDuration } from "@/lib/audio";
import { useLocale } from "@/i18n/LocaleProvider";

type Dock = "bottom" | "side";

const DOCK_KEY = "rc-player-dock";

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
  const [dock, setDock] = useState<Dock>("bottom");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DOCK_KEY);
      if (saved === "side" || saved === "bottom") setDock(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setDockMode = (mode: Dock) => {
    setDock(mode);
    try {
      localStorage.setItem(DOCK_KEY, mode);
    } catch {
      /* ignore */
    }
  };

  if (!current) return null;

  const ratio = duration > 0 ? progress / duration : 0;

  const transport = (
    <div className="flex flex-wrap items-center gap-1">
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
    </div>
  );

  const seekBar = (
    <div className="flex items-center gap-2">
      <span className="w-8 shrink-0 text-right text-[10px] tabular-nums text-muted">
        {formatDuration(progress)}
      </span>
      <input
        type="range"
        min={0}
        max={1000}
        value={Math.round(ratio * 1000)}
        aria-label={t.player.seek}
        onChange={(e) => seek(Number(e.target.value) / 1000)}
        className="h-1 min-w-0 flex-1 cursor-pointer accent-[var(--color-accent,#c45c26)]"
      />
      <span className="w-8 shrink-0 text-[10px] tabular-nums text-muted">
        {formatDuration(duration || current.durationSec)}
      </span>
    </div>
  );

  const meta = (
    <>
      <p className="truncate text-sm font-medium">{current.title}</p>
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
    </>
  );

  const queuePanel = queueOpen ? (
    <div className="max-h-48 overflow-auto border-b border-ink/20">
      <div className="sticky top-0 flex items-center justify-between bg-paper px-3 py-2">
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
  ) : null;

  if (dock === "side") {
    return (
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 w-[min(18rem,calc(100vw-2rem))] sm:bottom-6 sm:right-6">
        <div className="pointer-events-auto border-2 border-ink bg-paper/95 shadow-[4px_4px_0_0_rgba(22,21,19,0.12)] backdrop-blur-sm">
          {queuePanel}
          <div className="space-y-3 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">{meta}</div>
              <button
                type="button"
                onClick={close}
                aria-label={t.player.close}
                className="shrink-0 border border-ink px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider hover:bg-ink hover:text-paper"
              >
                ✕
              </button>
            </div>
            {transport}
            {seekBar}
            <div className="flex flex-wrap gap-1 border-t border-ink/15 pt-2">
              <button
                type="button"
                onClick={() => setQueueOpen(!queueOpen)}
                aria-expanded={queueOpen}
                className="border border-ink px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider hover:bg-ink/10"
              >
                {t.player.queue}
              </button>
              <button
                type="button"
                onClick={() => setDockMode("bottom")}
                className="border border-ink px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider hover:bg-ink/10"
              >
                {t.player.dockBottom}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="min-w-0 flex-1">{meta}</div>
          <div className="flex items-center gap-1 sm:gap-2">
            {transport}
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
              onClick={() => setDockMode("side")}
              aria-label={t.player.dockSide}
              className="border-2 border-ink px-2 py-1 text-xs font-medium uppercase tracking-wider hover:bg-ink/10"
            >
              {t.player.dockSide}
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
        <div className="mx-auto max-w-6xl px-3 pb-2 sm:px-6">{seekBar}</div>
      </div>
    </div>
  );
}
