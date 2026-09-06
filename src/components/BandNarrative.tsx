"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TagPill } from "@/components/TagPill";
import { PullQuote } from "@/components/PullQuote";
import { useSound } from "@/components/SoundProvider";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc, type Localized } from "@/i18n/config";
import type { Band, Genre, StickyVisual } from "@/lib/types";

interface BandNarrativeProps {
  band: Band;
  genres: Genre[];
  related: Band[];
  eraName: Localized;
  eraSlug: string;
}

function ChapterObserver({
  children,
  onEnter,
}: {
  children: React.ReactNode;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.45, margin: "-10% 0px -10% 0px" });
  const prev = useRef(false);

  useEffect(() => {
    if (inView && !prev.current) onEnter();
    prev.current = inView;
  }, [inView, onEnter]);

  return (
    <section
      ref={ref}
      className="flex min-h-[100dvh] flex-col justify-center py-16"
    >
      {children}
    </section>
  );
}

function StickyPanel({
  band,
  genres,
  related,
  visual,
  sceneIndex,
  quoteIndex,
}: {
  band: Band;
  genres: Genre[];
  related: Band[];
  visual: StickyVisual;
  sceneIndex?: number;
  quoteIndex?: number;
}) {
  const { locale, t } = useLocale();
  const scene = band.scenes?.[sceneIndex ?? 0];
  const quote = band.interviewQuotes?.[quoteIndex ?? 0];

  return (
    <motion.div
      key={`${visual}-${sceneIndex}-${quoteIndex}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="border-2 border-ink bg-paper p-5 sm:p-6"
    >
      {visual === "thesis" && (
        <>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.band.whyMatters}
          </p>
          <p className="font-display mt-3 text-2xl leading-snug font-semibold">
            {loc(band.whyMatters ?? band.shortBio, locale)}
          </p>
          <p className="mt-4 text-sm text-ink-soft">
            {band.formed} · {band.origin}
          </p>
        </>
      )}

      {visual === "members" && (
        <>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.band.lineup}
          </p>
          <ul className="mt-4 space-y-2">
            {band.members.map((m) => (
              <li key={m.name} className="border border-ink/20 px-3 py-2">
                <p className="text-sm font-medium">
                  {m.personSlug ? (
                    <Link
                      href={`/people/${m.personSlug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {m.name}
                    </Link>
                  ) : (
                    m.name
                  )}
                </p>
                <p className="text-xs text-muted">
                  {m.role} · {m.years}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}

      {visual === "lineupVersions" && (
        <>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.band.lineupVersions}
          </p>
          <ul className="mt-4 space-y-4">
            {(band.lineupVersions ?? []).map((v) => (
              <li key={v.id} className="border border-ink/20 px-3 py-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="text-sm font-medium">{loc(v.label, locale)}</p>
                  {v.peak && (
                    <span className="text-[10px] uppercase tracking-wider text-accent">
                      {t.band.peak}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted">{v.years}</p>
                <p className="mt-2 text-xs text-ink-soft">
                  {v.members.map((m) => m.name).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}

      {visual === "tracks" && (
        <>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.band.essentialTracks}
          </p>
          <ol className="mt-4 space-y-2">
            {band.essentialTracks.map((track, i) => (
              <li key={track.title} className="flex justify-between gap-2 text-sm">
                <span>
                  <span className="text-muted">
                    {String(i + 1).padStart(2, "0")}{" "}
                  </span>
                  {track.title}
                </span>
                <span className="text-xs text-muted">{track.year}</span>
              </li>
            ))}
          </ol>
        </>
      )}

      {visual === "dna" && (
        <>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.band.genreDna}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {genres.map((g, i) => (
              <span key={g.slug} className="contents">
                {i > 0 && <span className="text-muted">→</span>}
                <TagPill label={g.name} href={`/genres/${g.slug}`} />
              </span>
            ))}
          </div>
          {related.length > 0 && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-muted">
                {t.band.related}
              </p>
              <ul className="mt-2 space-y-1">
                {related.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/bands/${b.slug}`}
                      className="text-sm underline-offset-2 hover:underline"
                    >
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {visual === "scene" && scene && (
        <>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.band.sceneComposition}
          </p>
          <p className="font-display mt-3 text-xl font-semibold">{scene.track}</p>
          <p className="mt-1 text-sm text-muted">{scene.year}</p>
          <p className="mt-4 text-xs uppercase tracking-wider text-muted">
            {t.band.membersOnStage}
          </p>
          <p className="mt-1 text-sm">{scene.membersOnStage.join(" · ")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {scene.genreTags.map((tag) => (
              <TagPill key={tag} label={tag} href={`/genres/${tag}`} />
            ))}
          </div>
          {scene.note && (
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {loc(scene.note, locale)}
            </p>
          )}
        </>
      )}

      {visual === "quote" && quote && (
        <>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.band.quoteWall}
          </p>
          <blockquote className="mt-4 border-l-4 border-accent pl-4">
            <p className="font-display text-xl leading-snug">“{quote.text}”</p>
            <footer className="mt-3 text-xs text-muted">
              — {quote.speaker}
              {quote.year ? `, ${quote.year}` : ""} · {quote.source}
            </footer>
          </blockquote>
        </>
      )}

      {visual === "influence" && (
        <>
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.band.influenceGraph}
          </p>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="text-xs uppercase text-muted">{t.band.from}</p>
              <ul className="mt-1">
                {(band.influenceFrom.length
                  ? band.influenceFrom
                  : [t.band.rootsPeers]
                ).map((s) => (
                  <li key={s}>
                    {band.influenceFrom.includes(s) ? (
                      <Link
                        href={`/bands/${s}`}
                        className="underline-offset-2 hover:underline"
                      >
                        {s}
                      </Link>
                    ) : (
                      s
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase text-muted">{t.band.influenced}</p>
              <ul className="mt-1">
                {band.influenced.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/bands/${s}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export function BandNarrative({
  band,
  genres,
  related,
  eraName,
  eraSlug,
}: BandNarrativeProps) {
  const { locale, t } = useLocale();
  const chapters = band.narrative ?? [];
  const { playGenre, enabled } = useSound();
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const eraLabel = loc(eraName, locale);

  const active = chapters[activeIdx] ?? chapters[0];

  const onEnterChapter = useCallback(
    (index: number) => {
      setActiveIdx(index);
      const ch = chapters[index];
      if (!ch) return;
      const scene = band.scenes?.[ch.sceneIndex ?? -1];
      const genre =
        ch.soundGenre ??
        scene?.genreTags[0] ??
        band.genres[0];
      if (genre) {
        playGenre(genre, scene?.intensity ?? 2);
      }
    },
    [band.genres, band.scenes, chapters, playGenre],
  );

  const go = useCallback(
    (dir: -1 | 1) => {
      const next = Math.min(
        chapters.length - 1,
        Math.max(0, activeIdx + dir),
      );
      const el = document.getElementById(`chapter-${chapters[next]?.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    [activeIdx, chapters],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const hasNarrative = chapters.length > 0;

  const fallbackBody = useMemo(
    () => (
      <>
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="font-display text-4xl font-semibold">{band.name}</h1>
          <p className="mt-4 text-lg text-ink-soft">
            {loc(band.shortBio, locale)}
          </p>
          <p className="mt-6 leading-relaxed text-ink-soft">
            {loc(band.body, locale)}
          </p>
          {band.landmark && (
            <div className="mt-8 border-2 border-ink p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                {t.band.landmark}
              </p>
              <p className="font-display mt-2 text-xl font-semibold">
                {band.landmark.debutTrack.title} · {band.landmark.debutTrack.year}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {band.landmark.pioneeredGenres.map((g) => (
                  <TagPill key={g} label={g} href={`/genres/${g}`} />
                ))}
              </div>
            </div>
          )}
          {band.lyricQuotes.map((q) => (
            <div key={q} className="mt-6">
              <PullQuote quote={q} />
            </div>
          ))}
        </div>
        <p className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <Link
            href={`/eras/${eraSlug}`}
            className="text-sm font-medium uppercase tracking-wider underline-offset-4 hover:underline"
          >
            {t.band.backTo} {eraLabel}
          </Link>
        </p>
      </>
    ),
    [band, eraLabel, eraSlug, locale, t.band.backTo],
  );

  if (!hasNarrative) return fallbackBody;

  return (
    <div ref={scrollerRef}>
      {/* Hero */}
      <header className="relative flex min-h-[100dvh] flex-col justify-center border-b-2 border-ink px-4 py-20 sm:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
            {t.band.decisiveBand} · {eraLabel}
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
            {band.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-ink-soft">
            {loc(band.whyMatters ?? band.shortBio, locale)}
          </p>
          {band.landmark && (
            <div className="mt-8 max-w-xl border-2 border-ink bg-paper-deep/30 p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                {t.band.landmark}
              </p>
              <p className="font-display mt-2 text-xl font-semibold">
                {band.landmark.debutTrack.title}{" "}
                <span className="text-base font-normal text-muted">
                  · {band.landmark.debutTrack.year}
                </span>
              </p>
              {band.landmark.debutTrack.note && (
                <p className="mt-2 text-sm text-ink-soft">
                  {loc(band.landmark.debutTrack.note, locale)}
                </p>
              )}
              <p className="mt-4 text-xs uppercase tracking-wider text-muted">
                {t.band.pioneered}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {band.landmark.pioneeredGenres.map((g) => (
                  <TagPill key={g} label={g} href={`/genres/${g}`} />
                ))}
              </div>
              {band.landmark.note && (
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {loc(band.landmark.note, locale)}
                </p>
              )}
              <p className="mt-3 text-xs text-muted">{t.band.landmarkHint}</p>
            </div>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-4 text-xs uppercase tracking-wider text-muted">
            <span>{t.band.scrollOrKeys}</span>
            <span aria-hidden>↓</span>
            <span>{t.band.or}</span>
            <span className="border border-ink px-2 py-1">↑</span>
            <span className="border border-ink px-2 py-1">↓</span>
            <span>{enabled ? t.band.soundFollows : t.band.soundOff}</span>
          </div>
        </div>
      </header>

      {/* Scrolly body */}
      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1.15fr_0.85fr] sm:px-6">
        <div>
          {chapters.map((ch, index) => (
            <ChapterObserver
              key={ch.id}
              onEnter={() => onEnterChapter(index)}
            >
              <div id={`chapter-${ch.id}`} className="max-w-xl scroll-mt-24">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(chapters.length).padStart(2, "0")}
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                  {loc(ch.title, locale)}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
                  {loc(ch.body, locale)}
                </p>
              </div>
            </ChapterObserver>
          ))}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-20 py-16">
            {active && (
              <StickyPanel
                band={band}
                genres={genres}
                related={related}
                visual={active.stickyVisual}
                sceneIndex={active.sceneIndex}
                quoteIndex={active.quoteIndex}
              />
            )}
            <p className="mt-4 text-xs text-muted">
              Explore ·{" "}
              <Link href="/timeline" className="underline-offset-2 hover:underline">
                {t.nav.timeline}
              </Link>
              {" · "}
              <Link href="/genres" className="underline-offset-2 hover:underline">
                {t.nav.genres}
              </Link>
              {" · "}
              <Link href="/people" className="underline-offset-2 hover:underline">
                {t.nav.people}
              </Link>
              {" · "}
              <Link
                href={`/eras/${eraSlug}`}
                className="underline-offset-2 hover:underline"
              >
                {eraLabel}
              </Link>
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile sticky strip */}
      <div className="sticky bottom-0 border-t-2 border-ink bg-paper p-3 lg:hidden">
        {active && (
          <p className="truncate text-sm font-medium">
            {active.stickyVisual === "scene" && band.scenes?.[active.sceneIndex ?? 0]
              ? band.scenes[active.sceneIndex ?? 0].track
              : loc(active.title, locale)}
          </p>
        )}
      </div>

      {/* Lineup versions */}
      {(band.lineupVersions?.length ?? 0) > 0 && (
        <section className="border-t-2 border-ink px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-semibold">
              {t.band.lineupVersions}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              {t.band.lineupVersionsHint}
            </p>
            <ul className="mt-8 grid gap-4 lg:grid-cols-2">
              {band.lineupVersions!.map((v) => (
                <li key={v.id} className="border-2 border-ink p-5">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="font-display text-xl font-semibold">
                      {loc(v.label, locale)}
                    </h3>
                    {v.peak && (
                      <span className="border border-accent px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                        {t.band.peak}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted">{v.years}</p>
                  {v.note && (
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {loc(v.note, locale)}
                    </p>
                  )}
                  <ul className="mt-4 space-y-2 border-t border-ink/15 pt-3">
                    {v.members.map((m) => (
                      <li
                        key={`${v.id}-${m.name}-${m.role}`}
                        className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
                      >
                        <span className="font-medium">
                          {m.personSlug ? (
                            <Link
                              href={`/people/${m.personSlug}`}
                              className="underline-offset-2 hover:underline"
                            >
                              {m.name}
                            </Link>
                          ) : (
                            m.name
                          )}
                        </span>
                        <span className="text-xs text-muted">{m.role}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Quote wall gallery */}
      {(band.interviewQuotes?.length ?? 0) > 0 && (
        <section className="border-t-2 border-ink px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-semibold">
              {t.band.quoteWall}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              {t.band.quoteWallHint}
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {band.interviewQuotes!.map((q) => (
                <li key={q.text} className="border-2 border-ink p-5">
                  <p className="font-display text-lg leading-snug">“{q.text}”</p>
                  <p className="mt-3 text-xs text-muted">
                    — {q.speaker}
                    {q.year ? `, ${q.year}` : ""} · {q.source}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Scene table */}
      {(band.scenes?.length ?? 0) > 0 && (
        <section className="border-t-2 border-ink px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-semibold">
              {t.band.compositionTable}
            </h2>
            <p className="mt-2 text-sm text-muted">{t.band.compositionHint}</p>
            <div className="mt-6 overflow-x-auto border-2 border-ink">
              <table className="w-full min-w-[40rem] text-left text-sm">
                <thead className="border-b-2 border-ink bg-paper-deep/50 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-3 py-2 font-medium">{t.band.year}</th>
                    <th className="px-3 py-2 font-medium">{t.band.track}</th>
                    <th className="px-3 py-2 font-medium">
                      {t.band.membersOnStage}
                    </th>
                    <th className="px-3 py-2 font-medium">{t.band.genreTags}</th>
                  </tr>
                </thead>
                <tbody>
                  {band.scenes!.map((s) => (
                    <tr
                      key={`${s.year}-${s.track}`}
                      className="border-b border-ink/15 align-top"
                    >
                      <td className="px-3 py-3 whitespace-nowrap">{s.year}</td>
                      <td className="px-3 py-3 font-medium">
                        {s.track}
                        {s.note && (
                          <span className="mt-1 block text-xs font-normal text-muted">
                            {loc(s.note, locale)}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-ink-soft">
                        {s.membersOnStage.join(", ")}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-1">
                          {s.genreTags.map((tag) => (
                            <TagPill
                              key={tag}
                              label={tag}
                              href={`/genres/${tag}`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <p className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Link
          href={`/eras/${eraSlug}`}
          className="text-sm font-medium uppercase tracking-wider underline-offset-4 hover:underline"
        >
          {t.band.backTo} {eraLabel}
        </Link>
      </p>
    </div>
  );
}
