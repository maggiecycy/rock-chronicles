"use client";

import Link from "next/link";
import { TagPill } from "@/components/TagPill";
import { PullQuote } from "@/components/PullQuote";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc, type Localized } from "@/i18n/config";
import type { Band, Genre } from "@/lib/types";

interface BandMagazineSpreadProps {
  band: Band;
  genres: Genre[];
  related: Band[];
  eraName: Localized;
  eraSlug: string;
}

export function BandMagazineSpread({
  band,
  genres,
  related,
  eraName,
  eraSlug,
}: BandMagazineSpreadProps) {
  const { locale, t } = useLocale();

  return (
    <div className="grid gap-0 lg:grid-cols-2 lg:border-2 lg:border-ink">
      <aside className="border-2 border-ink bg-paper-deep/50 p-6 sm:p-8 lg:border-0 lg:border-r-2">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
          {t.band.decisiveBand}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold leading-none tracking-tight sm:text-5xl">
          {band.name}
        </h1>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="w-20 text-muted">{t.era.formed}</dt>
            <dd className="font-medium">{band.formed}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 text-muted">Origin</dt>
            <dd className="font-medium">{band.origin}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-20 text-muted">Era</dt>
            <dd>
              <Link
                href={`/eras/${eraSlug}`}
                className="font-medium underline-offset-2 hover:underline"
              >
                {loc(eraName, locale)}
              </Link>
            </dd>
          </div>
        </dl>

        <div className="mt-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.band.genreDna}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {genres.map((g, i) => (
              <span key={g.slug} className="contents">
                {i > 0 && (
                  <span className="text-muted" aria-hidden>
                    →
                  </span>
                )}
                <TagPill label={g.name} href={`/genres/${g.slug}`} />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.band.lineup}
          </h2>
          <ul className="mt-3 space-y-2">
            {band.members.map((m) => (
              <li
                key={`${m.name}-${m.years}`}
                className="group border border-ink/20 px-3 py-2 transition-colors hover:border-ink hover:bg-paper"
                title={`${m.role} · ${m.years}`}
              >
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-muted">
                  {m.role} · {m.years}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <article className="border-2 border-ink border-t-0 p-6 sm:p-8 lg:border-0">
        <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
          {loc(band.shortBio, locale)}
        </p>
        <div className="prose-magazine mt-6">
          <p className="leading-relaxed text-ink-soft">
            {loc(band.body, locale)}
          </p>
        </div>

        {band.lyricQuotes.length > 0 && (
          <section className="mt-10 space-y-4">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
              Lyric wall
            </h2>
            {band.lyricQuotes.map((q) => (
              <PullQuote key={q} quote={q} />
            ))}
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.band.essentialTracks}
          </h2>
          <ol className="mt-3 divide-y divide-ink/15 border-2 border-ink">
            {band.essentialTracks.map((track, i) => (
              <li
                key={track.title}
                className="flex items-baseline justify-between gap-3 px-4 py-3"
              >
                <span className="text-sm">
                  <span className="mr-3 text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium">{track.title}</span>
                  {track.note && (
                    <span className="ml-2 text-xs text-muted">
                      · {loc(track.note, locale)}
                    </span>
                  )}
                </span>
                <span className="shrink-0 text-xs text-muted">{track.year}</span>
              </li>
            ))}
          </ol>
        </section>

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
              {t.band.related}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {related.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/bands/${b.slug}`}
                    className="border border-ink px-3 py-1 text-sm hover:bg-ink hover:text-paper"
                  >
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
