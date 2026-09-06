"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { Band, LiveEvent } from "@/lib/types";

export function LivesView({
  lives,
  bandMap,
}: {
  lives: LiveEvent[];
  bandMap: Record<string, Band>;
}) {
  const { locale, t } = useLocale();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
        {t.lives.eyebrow}
      </p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        {t.lives.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
        {t.lives.intro}
      </p>
      <p className="mt-3 max-w-2xl border-l-4 border-accent pl-4 text-sm text-ink-soft">
        {t.lives.rightsBanner}
      </p>

      <ul className="mt-10 space-y-8">
        {lives.map((live) => (
          <li
            key={live.slug}
            id={live.slug}
            className="scroll-mt-24 border-2 border-ink p-5 sm:p-8"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-display text-3xl font-semibold tabular-nums">
                {live.year}
              </span>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                {loc(live.title, locale)}
              </h2>
            </div>
            <p className="mt-2 text-sm text-muted">{loc(live.venue, locale)}</p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {loc(live.summary, locale)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                {t.lives.whyEpic}
              </span>
              <br />
              {loc(live.whyEpic, locale)}
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  {t.lives.bands}
                </p>
                <ul className="mt-2 space-y-1">
                  {live.bandSlugs.map((slug) => {
                    const band = bandMap[slug];
                    return (
                      <li key={slug}>
                        {band ? (
                          <Link
                            href={`/bands/${slug}`}
                            className="text-sm font-medium underline-offset-2 hover:underline"
                          >
                            {band.name}
                          </Link>
                        ) : (
                          <span className="text-sm text-muted">{slug}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  {t.lives.keyTracks}
                </p>
                <ul className="mt-2 space-y-2">
                  {live.keyTracks.map((track) => (
                    <li key={`${track.title}-${track.bandSlug ?? ""}`}>
                      <p className="text-sm font-medium">{track.title}</p>
                      {track.bandSlug && bandMap[track.bandSlug] && (
                        <Link
                          href={`/bands/${track.bandSlug}`}
                          className="text-xs text-muted underline-offset-2 hover:underline"
                        >
                          {bandMap[track.bandSlug].name}
                        </Link>
                      )}
                      {track.note && (
                        <p className="text-xs text-muted">
                          {loc(track.note, locale)}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted">
              {live.rightsNote
                ? loc(live.rightsNote, locale)
                : t.lives.rightsDefault}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
