"use client";

import Link from "next/link";
import { useCallback, useId, useMemo, useState } from "react";
import type { Genre, GenreLink } from "@/lib/types";
import { useSound } from "@/components/SoundProvider";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";

interface GenreNetworkProps {
  genres: Genre[];
  links: GenreLink[];
}

/** Hand-tuned editorial layout — readable magazine diagram, not a physics toy. */
const LAYOUT: Record<string, { x: number; y: number }> = {
  blues: { x: 8, y: 42 },
  "rock-n-roll": { x: 22, y: 42 },
  psychedelic: { x: 36, y: 22 },
  "hard-rock": { x: 36, y: 58 },
  "progressive-rock": { x: 52, y: 16 },
  "heavy-metal": { x: 52, y: 64 },
  punk: { x: 36, y: 84 },
  "post-punk": { x: 52, y: 84 },
  grunge: { x: 64, y: 50 },
  alternative: { x: 76, y: 36 },
  britpop: { x: 76, y: 16 },
  "indie-rock": { x: 90, y: 46 },
};

const SVG_LAYOUT: Record<string, { x: number; y: number }> = {
  blues: { x: 80, y: 200 },
  "rock-n-roll": { x: 220, y: 200 },
  psychedelic: { x: 360, y: 110 },
  "hard-rock": { x: 360, y: 280 },
  "progressive-rock": { x: 520, y: 80 },
  "heavy-metal": { x: 520, y: 300 },
  punk: { x: 360, y: 400 },
  "post-punk": { x: 520, y: 400 },
  grunge: { x: 640, y: 240 },
  alternative: { x: 760, y: 180 },
  britpop: { x: 760, y: 80 },
  "indie-rock": { x: 900, y: 220 },
};

const TYPE_STROKE: Record<GenreLink["type"], string> = {
  branched: "#161513",
  influenced: "#6f6a63",
  fused: "#b91c1c",
};

export function GenreNetwork({ genres, links }: GenreNetworkProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const titleId = useId();
  const { playGenre, stop, enabled } = useSound();
  const { locale, t } = useLocale();

  const genreMap = useMemo(
    () => new Map(genres.map((g) => [g.slug, g])),
    [genres],
  );

  const selectedGenre = selected ? genreMap.get(selected) : undefined;

  const connected = useMemo(() => {
    if (!selected) {
      return { upstream: [] as GenreLink[], downstream: [] as GenreLink[] };
    }
    return {
      upstream: links.filter((l) => l.to === selected),
      downstream: links.filter((l) => l.from === selected),
    };
  }, [links, selected]);

  const onSelect = useCallback(
    (slug: string) => {
      setSelected((prev) => {
        if (prev === slug) {
          stop();
          return null;
        }
        playGenre(slug, 2);
        return slug;
      });
    },
    [playGenre, stop],
  );

  const typeLabel = (type: GenreLink["type"]) => t.genres[type];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
      <div className="relative border-2 border-ink bg-paper-deep/30 p-2 sm:p-4">
        <svg
          viewBox="0 0 1000 480"
          className="h-auto w-full"
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>Rock genre influence network</title>
          {links.map((link) => {
            const a = SVG_LAYOUT[link.from];
            const b = SVG_LAYOUT[link.to];
            if (!a || !b) return null;
            const active =
              !selected || link.from === selected || link.to === selected;
            return (
              <line
                key={`${link.from}-${link.to}-${link.type}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={TYPE_STROKE[link.type]}
                strokeWidth={link.type === "fused" ? 2.5 : 1.5}
                strokeDasharray={
                  link.type === "influenced" ? "6 4" : undefined
                }
                opacity={active ? 0.9 : 0.15}
              />
            );
          })}
          {genres.map((g) => {
            const pos = SVG_LAYOUT[g.slug];
            if (!pos) return null;
            const isSelected = selected === g.slug;
            const isDimmed =
              selected !== null &&
              !isSelected &&
              !links.some(
                (l) =>
                  (l.from === selected && l.to === g.slug) ||
                  (l.to === selected && l.from === g.slug),
              );
            return (
              <g key={g.slug} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle
                  r={isSelected ? 22 : 18}
                  fill={isSelected ? "#161513" : "#f4f3ef"}
                  stroke="#161513"
                  strokeWidth={2}
                  opacity={isDimmed ? 0.25 : 1}
                  aria-hidden
                />
                <text
                  y={36}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  fill="#161513"
                  fontSize="11"
                  fontWeight={600}
                  opacity={isDimmed ? 0.25 : 1}
                >
                  {g.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Keyboard-accessible hit targets over the diagram */}
        <div className="pointer-events-none absolute inset-2 sm:inset-4" aria-hidden={false}>
          {genres.map((g) => {
            const pos = LAYOUT[g.slug];
            if (!pos) return null;
            const isSelected = selected === g.slug;
            return (
              <button
                key={g.slug}
                type="button"
                onClick={() => onSelect(g.slug)}
                aria-pressed={isSelected}
                aria-label={`Select genre ${g.name}`}
                className="pointer-events-auto absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              />
            );
          })}
        </div>

        <ul className="mt-2 flex flex-wrap gap-4 px-2 text-xs text-muted">
          <li className="flex items-center gap-2">
            <span className="inline-block h-0.5 w-6 bg-ink" /> {t.genres.branched}
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-0.5 w-6 border-t border-dashed border-muted" />{" "}
            {t.genres.influenced}
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-0.5 w-6 bg-accent" /> {t.genres.fused}
          </li>
        </ul>
      </div>

      <aside className="border-2 border-ink p-5" aria-live="polite">
        {selectedGenre ? (
          <>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              {t.genres.selected}
            </p>
            <h2 className="font-display mt-2 text-2xl font-semibold">
              {selectedGenre.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {loc(selectedGenre.summary, locale)}
            </p>
            {(connected.upstream.length > 0 ||
              connected.downstream.length > 0) && (
              <div className="mt-4 space-y-2 text-xs text-muted">
                {connected.upstream.map((l) => (
                  <p key={`up-${l.from}`}>
                    ← {genreMap.get(l.from)?.name} ({typeLabel(l.type)})
                  </p>
                ))}
                {connected.downstream.map((l) => (
                  <p key={`down-${l.to}`}>
                    → {genreMap.get(l.to)?.name} ({typeLabel(l.type)})
                  </p>
                ))}
              </div>
            )}
            <Link
              href={`/genres/${selectedGenre.slug}`}
              className="mt-5 inline-block border-2 border-ink px-3 py-1.5 text-xs font-medium uppercase tracking-wider hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t.genres.openGenre}
            </Link>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-3 block text-xs text-muted underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {t.genres.clear}
            </button>
          </>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              {t.genres.title}
            </p>
            <h2 className="font-display mt-2 text-xl font-semibold">
              {t.genres.pickNode}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {enabled ? t.genres.pickHintOn : t.genres.pickHintOff}
            </p>
          </>
        )}
      </aside>
    </div>
  );
}
