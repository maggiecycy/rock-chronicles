"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TagPill } from "@/components/TagPill";
import { PullQuote } from "@/components/PullQuote";
import { EntityHeroImage } from "@/components/EntityHeroImage";
import { TrackList } from "@/components/TrackList";
import { useSound } from "@/components/SoundProvider";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc, type Localized } from "@/i18n/config";
import { getTracksByBand } from "@/lib/audio";
import type { Band, EntityImage, Genre, NarrativeChapter, StickyVisual } from "@/lib/types";

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
  stickyImage,
}: {
  band: Band;
  genres: Genre[];
  related: Band[];
  visual: StickyVisual;
  sceneIndex?: number;
  quoteIndex?: number;
  stickyImage?: EntityImage;
}) {
  const { locale, t } = useLocale();
  const reduceMotion = useReducedMotion();
  const scene = band.scenes?.[sceneIndex ?? 0];
  const quote = band.interviewQuotes?.[quoteIndex ?? 0];

  return (
    <motion.div
      key={`${visual}-${sceneIndex}-${quoteIndex}-${stickyImage?.src ?? ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.35 }}
      className="border-2 border-ink bg-paper p-5 sm:p-6"
    >
      {stickyImage && (
        <figure className="mb-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-ink/30 bg-paper-deep">
            {/* eslint-disable-next-line @next/next/no-img-element -- sticky chapter assets; avoid hero priority */}
            <img
              src={stickyImage.src}
              alt={loc(stickyImage.alt, locale)}
              className="h-full w-full object-cover object-top"
            />
          </div>
          <figcaption className="mt-2 text-[11px] leading-relaxed text-muted">
            <span>{stickyImage.credit}</span>
            <span aria-hidden> · </span>
            <span>{stickyImage.license}</span>
          </figcaption>
        </figure>
      )}
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

function mobileSummary(
  band: Band,
  genres: Genre[],
  related: Band[],
  chapter: NarrativeChapter,
  locale: "en" | "zh",
  t: ReturnType<typeof useLocale>["t"],
): string {
  const visual = chapter.stickyVisual;
  if (visual === "thesis") {
    return loc(band.whyMatters ?? band.shortBio, locale);
  }
  if (visual === "members") {
    return band.members
      .slice(0, 4)
      .map((m) => m.name)
      .join(" · ");
  }
  if (visual === "lineupVersions") {
    const peak =
      band.lineupVersions?.find((v) => v.peak) ?? band.lineupVersions?.[0];
    if (!peak) return loc(chapter.title, locale);
    return `${loc(peak.label, locale)} · ${peak.years}`;
  }
  if (visual === "scene") {
    const scene = band.scenes?.[chapter.sceneIndex ?? 0];
    if (!scene) return loc(chapter.title, locale);
    const note = scene.note ? loc(scene.note, locale) : scene.membersOnStage.join(" · ");
    return `${scene.track} (${scene.year}) · ${note}`;
  }
  if (visual === "quote") {
    const quote = band.interviewQuotes?.[chapter.quoteIndex ?? 0];
    return quote ? `“${quote.text}” — ${quote.speaker}` : loc(chapter.title, locale);
  }
  if (visual === "dna") {
    const genreNames = genres.map((g) => loc(g.name, locale)).join(" · ");
    const relatedNames = related
      .slice(0, 3)
      .map((b) => b.name)
      .join(" · ");
    return [genreNames, relatedNames].filter(Boolean).join(" · ") || t.band.related;
  }
  if (visual === "influence") {
    const from = band.influenceFrom.slice(0, 2).join(" · ");
    const to = band.influenced.slice(0, 2).join(" · ");
    return [from && `${t.band.from}: ${from}`, to && `${t.band.influenced}: ${to}`]
      .filter(Boolean)
      .join(" · ");
  }
  if (visual === "tracks") {
    return band.essentialTracks
      .slice(0, 3)
      .map((tr) => tr.title)
      .join(" · ");
  }
  return loc(chapter.title, locale);
}

function MobileStickyBar({
  band,
  genres,
  related,
  chapter,
  chapterIndex,
  chapterCount,
  onPrev,
  onNext,
}: {
  band: Band;
  genres: Genre[];
  related: Band[];
  chapter: NarrativeChapter;
  chapterIndex: number;
  chapterCount: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { locale, t } = useLocale();
  const scene = band.scenes?.[chapter.sceneIndex ?? 0];
  const title =
    chapter.stickyVisual === "scene" && scene
      ? scene.track
      : loc(chapter.title, locale);
  const summary = mobileSummary(band, genres, related, chapter, locale, t);
  const img = chapter.stickyImage;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-16 z-40 lg:hidden">
      <div className="pointer-events-auto mx-auto max-w-6xl border-t-2 border-ink bg-paper/95 px-3 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:px-6">
        <div className="flex items-stretch gap-3">
          {img && (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-ink/40 bg-paper-deep">
              {/* eslint-disable-next-line @next/next/no-img-element -- mobile sticky thumb */}
              <img
                src={img.src}
                alt={loc(img.alt, locale)}
                className="h-full w-full object-cover object-top"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
              {String(chapterIndex + 1).padStart(2, "0")} /{" "}
              {String(chapterCount).padStart(2, "0")}
            </p>
            <p className="truncate text-sm font-medium leading-snug">{title}</p>
            <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-ink-soft">
              {summary}
            </p>
          </div>
          <div className="flex shrink-0 flex-col justify-center gap-1">
            <button
              type="button"
              onClick={onPrev}
              disabled={chapterIndex <= 0}
              aria-label={t.player.prev}
              className="border border-ink px-2 py-1 text-[10px] font-medium uppercase tracking-wider enabled:hover:bg-ink/10 disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={chapterIndex >= chapterCount - 1}
              aria-label={t.player.next}
              className="border border-ink px-2 py-1 text-[10px] font-medium uppercase tracking-wider enabled:hover:bg-ink/10 disabled:opacity-30"
            >
              ↓
            </button>
          </div>
        </div>
      </div>
    </div>
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
  const reduceMotion = useReducedMotion();
  const chapters = band.narrative ?? [];
  const listenTracks = getTracksByBand(band.slug);
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
      el?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    },
    [activeIdx, chapters, reduceMotion],
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
          {band.image && <EntityHeroImage image={band.image} variant="wide" />}
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
            {band.pageEyebrow
              ? loc(band.pageEyebrow, locale)
              : `${t.band.decisiveBand} · ${eraLabel}`}
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight sm:text-7xl">
            {band.name}
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-ink-soft">
            {loc(band.whyMatters ?? band.shortBio, locale)}
          </p>
          {band.image && <EntityHeroImage image={band.image} variant="wide" />}
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
            </div>
          )}
        </div>
      </header>

      {/* Scrolly body */}
      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1.15fr_0.85fr] sm:px-6">
        <div className="pb-28 lg:pb-0">
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
                {ch.stickyImage && (
                  <figure className="mt-6 lg:hidden">
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-ink bg-paper-deep">
                      <img
                        src={ch.stickyImage.src}
                        alt={loc(ch.stickyImage.alt, locale)}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <figcaption className="mt-2 text-xs leading-relaxed text-muted">
                      <span>{ch.stickyImage.credit}</span>
                      <span aria-hidden> · </span>
                      <span>{ch.stickyImage.license}</span>
                    </figcaption>
                  </figure>
                )}
              </div>
            </ChapterObserver>
          ))}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-20 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain py-8 pr-1 [scrollbar-gutter:stable]">
            {active && (
              <StickyPanel
                band={band}
                genres={genres}
                related={related}
                visual={active.stickyVisual}
                sceneIndex={active.sceneIndex}
                quoteIndex={active.quoteIndex}
                stickyImage={active.stickyImage}
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

      {/* Mobile chrome — thumb + summary + chapter nav, fixed above MiniPlayer */}
      {active && (
        <MobileStickyBar
          band={band}
          genres={genres}
          related={related}
          chapter={active}
          chapterIndex={activeIdx}
          chapterCount={chapters.length}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      )}

      {/* Listen preview queue */}
      {listenTracks.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <TrackList
            tracks={listenTracks}
            title={t.band.listen}
            hint={t.band.listenHint}
            showArtist={false}
          />
        </div>
      )}

      {/* Lineup versions */}
      {(band.lineupVersions?.length ?? 0) > 0 && (
        <section className="border-t-2 border-ink px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-semibold">
              {t.band.lineupVersions}
            </h2>
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
