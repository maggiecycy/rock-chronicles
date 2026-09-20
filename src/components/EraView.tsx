"use client";

import Link from "next/link";
import { TagPill } from "@/components/TagPill";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { Band, Era, Genre } from "@/lib/types";

function resolveAlsoNotable(
  label: string,
  bandsBySlug: Map<string, Band>,
  bandsByName: Map<string, Band>,
): Band | undefined {
  const asSlug = label.trim().toLowerCase();
  if (bandsBySlug.has(asSlug)) return bandsBySlug.get(asSlug);
  return bandsByName.get(label.trim().toLowerCase());
}

function BandCard({
  band,
  formedLabel,
}: {
  band: Band;
  formedLabel: string;
}) {
  const { locale } = useLocale();
  return (
    <Link
      href={`/bands/${band.slug}`}
      className="block h-full border-2 border-ink p-5 transition-colors hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <p className="text-xs uppercase tracking-wider opacity-70">
        {formedLabel} {band.formed}
      </p>
      <h3 className="font-display mt-2 text-xl font-semibold">{band.name}</h3>
      <p className="mt-2 text-sm opacity-80">{loc(band.shortBio, locale)}</p>
    </Link>
  );
}

export function EraView({
  era,
  genres,
  primary,
  catalog,
}: {
  era: Era;
  genres: Genre[];
  primary: Band[];
  /** Full band list for resolving alsoNotable / cross-era links. */
  catalog: Band[];
}) {
  const { locale, t } = useLocale();

  const bySlug = new Map(catalog.map((b) => [b.slug, b]));
  const byName = new Map(catalog.map((b) => [b.name.toLowerCase(), b]));
  const primaryBySlug = new Map(primary.map((b) => [b.slug, b]));

  const anchorSlugs = era.anchorBands ?? [];
  const anchors = anchorSlugs
    .map((slug) => primaryBySlug.get(slug) ?? bySlug.get(slug))
    .filter((b): b is Band => Boolean(b));
  const anchorSet = new Set(anchors.map((b) => b.slug));
  const alsoInEra = primary.filter((b) => !anchorSet.has(b.slug));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
        {era.decade} · {era.years}
      </p>
      <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {loc(era.name, locale)}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        {loc(era.summary, locale)}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <article className="prose-magazine border-2 border-ink p-6 sm:p-8">
          {t.era.chapter ? (
            <h2 className="font-display text-xl font-semibold">{t.era.chapter}</h2>
          ) : null}
          {loc(era.body, locale)
            .split(/\n\n+/)
            .filter(Boolean)
            .map((para) => (
              <p
                key={para.slice(0, 48)}
                className="mt-4 first:mt-0 leading-relaxed text-ink-soft"
              >
                {para}
              </p>
            ))}
          <p className="mt-6 text-sm text-muted">
            <span className="font-medium text-ink">{t.era.sound} </span>
            {loc(era.sound, locale)}
          </p>
        </article>

        <aside className="space-y-6">
          <div className="border-2 border-ink p-5">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
              {t.era.genresInEra}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {genres.map((g) => (
                <TagPill key={g.slug} label={g.name} href={`/genres/${g.slug}`} />
              ))}
            </div>
          </div>
          <div className="border-2 border-ink p-5">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
              {t.era.alsoNotable}
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-ink-soft">
              {era.alsoNotable.map((name) => {
                const band = resolveAlsoNotable(name, bySlug, byName);
                return (
                  <li key={name}>
                    {band ? (
                      <Link
                        href={`/bands/${band.slug}`}
                        className="underline-offset-2 hover:underline"
                      >
                        {band.name}
                      </Link>
                    ) : (
                      name
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">{t.era.anchorBands}</h2>
        {anchors.length === 0 ? (
          <p className="mt-4 text-sm text-muted">{t.era.noAnchors}</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {anchors.map((band) => (
              <li key={band.slug}>
                <BandCard band={band} formedLabel={t.era.formed} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {alsoInEra.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            {t.era.alsoInEra}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {alsoInEra.map((band) => (
              <li key={band.slug}>
                <BandCard band={band} formedLabel={t.era.formed} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10">
        <Link
          href="/timeline"
          className="text-sm font-medium uppercase tracking-wider underline-offset-4 hover:underline"
        >
          {t.era.backTimeline}
        </Link>
      </p>
    </main>
  );
}
