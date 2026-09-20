"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { HundredBandsCanon } from "@/lib/canon";
import type { BandShipStatus } from "@/lib/band-status";
import { CanonEraTimeline } from "@/components/CanonEraTimeline";

export function CanonView({
  canon,
  statusBySlug,
}: {
  canon: HundredBandsCanon;
  statusBySlug: Record<string, BandShipStatus>;
  coverage?: {
    total: number;
    complete: number;
    stub: number;
    missing: number;
  };
}) {
  const { locale, t } = useLocale();

  const totalBands = canon.periods.reduce((n, p) => n + p.bands.length, 0);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {t.canon.eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
          {t.canon.eyebrow}
        </p>
      ) : null}
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {loc(canon.title, locale)}
      </h1>
      <p className="mt-3 text-sm text-muted">
        {totalBands} {t.canon.actsCount}
      </p>

      <nav
        className="mt-6 flex gap-2 overflow-x-auto border-2 border-ink p-2 lg:hidden"
        aria-label={t.canon.eraRail}
      >
        {canon.periods
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((period) => (
            <Link
              key={period.id}
              href={`/eras/${period.eraSlug}`}
              className="shrink-0 border border-ink px-2 py-1 text-[10px] font-medium uppercase tracking-wider hover:bg-ink hover:text-paper"
            >
              {loc(period.name, locale)}
            </Link>
          ))}
      </nav>

      <div className="mt-10 flex gap-8 lg:gap-10">
        <CanonEraTimeline periods={canon.periods} />

        <div className="min-w-0 flex-1 space-y-12">
          {canon.periods
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((period) => {
              const genreSet = [
                ...new Set(period.bands.flatMap((b) => b.genres)),
              ].slice(0, 6);
              return (
                <div
                  key={period.id}
                  id={`canon-period-${period.id}`}
                  className="scroll-mt-28"
                >
                  <div className="border-b-2 border-ink pb-3">
                    <p className="text-xs uppercase tracking-wider text-muted">
                      {period.years}
                      {" · "}
                      <Link
                        href={`/eras/${period.eraSlug}`}
                        className="underline-offset-2 hover:underline"
                      >
                        {t.canon.openEra}
                      </Link>
                    </p>
                    <h2 className="font-display mt-1 text-2xl font-semibold sm:text-3xl">
                      {loc(period.name, locale)}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-ink-soft">
                      {loc(period.summary, locale)}
                    </p>
                    {genreSet.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {genreSet.map((g) => (
                          <li key={g}>
                            <Link
                              href={`/genres/${g}`}
                              className="border border-ink px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider hover:bg-ink hover:text-paper"
                            >
                              {g}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <ul className="mt-4 divide-y divide-ink/15 border-2 border-ink">
                    {period.bands.map((band) => {
                      const status = statusBySlug[band.slug] ?? "missing";
                      const hasPage = status !== "missing";
                      return (
                        <li
                          key={band.slug}
                          className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-start sm:justify-between"
                        >
                          <div className="min-w-0">
                            {hasPage ? (
                              <Link
                                href={`/bands/${band.slug}`}
                                className="font-display text-lg font-semibold underline-offset-2 hover:underline"
                              >
                                {band.name}
                              </Link>
                            ) : (
                              <span className="font-display text-lg font-semibold text-muted">
                                {band.name}
                              </span>
                            )}
                            <p className="mt-1 text-sm text-ink-soft">
                              {loc(band.role, locale)}
                            </p>
                            <p className="mt-1 text-xs text-muted">
                              {band.signature.title} · {band.signature.year} ·{" "}
                              {band.origin}
                            </p>
                            <ul className="mt-2 flex flex-wrap gap-1.5">
                              {band.genres.map((g) => (
                                <li key={g}>
                                  <Link
                                    href={`/genres/${g}`}
                                    className="text-[10px] uppercase tracking-wider text-accent underline-offset-2 hover:underline"
                                  >
                                    {g}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {hasPage && (
                            <Link
                              href={`/bands/${band.slug}`}
                              className="shrink-0 text-xs font-medium uppercase tracking-wider underline-offset-4 hover:underline"
                            >
                              {t.canon.openBand} →
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}

          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold">
              {t.canon.resources}
            </h2>
            {t.canon.resourcesHint ? (
              <p className="mt-2 text-sm text-muted">{t.canon.resourcesHint}</p>
            ) : null}
            {(
              [
                ["forums", t.canon.forums, canon.resources.forums],
                ["media", t.canon.mediaOutlets, canon.resources.media],
                ["youtube", t.canon.youtube, canon.resources.youtube],
              ] as const
            ).map(([key, label, items]) => (
              <div key={key} className="mt-8">
                <h3 className="text-xs font-medium uppercase tracking-wider text-muted">
                  {label}
                </h3>
                <ul className="mt-3 space-y-3">
                  {items.map((item) => (
                    <li key={item.url} className="border-2 border-ink p-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline-offset-2 hover:underline"
                      >
                        {item.name}
                      </a>
                      <p className="mt-1 text-sm text-ink-soft">
                        {loc(item.note, locale)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
