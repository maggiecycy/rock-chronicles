"use client";

import Link from "next/link";
import { TagPill } from "@/components/TagPill";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { Band, Genre, GenreLink } from "@/lib/types";

export function GenreView({
  genre,
  upstream,
  downstream,
  genreMap,
  bands,
}: {
  genre: Genre;
  upstream: GenreLink[];
  downstream: GenreLink[];
  genreMap: Record<string, Genre>;
  bands: Band[];
}) {
  const { locale, t } = useLocale();

  const typeLabel = (type: GenreLink["type"]) => t.genres[type];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
        {t.genres.genreLabel} · {genre.eraFocus}
      </p>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {genre.name}
      </h1>
      <p className="mt-4 text-lg text-ink-soft">{loc(genre.summary, locale)}</p>
      <p className="mt-6 leading-relaxed text-ink-soft">
        {loc(genre.body, locale)}
      </p>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="border-2 border-ink p-5">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.genres.upstream}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {upstream.length === 0 && (
              <li className="text-sm text-muted">{t.genres.rootNode}</li>
            )}
            {upstream.map((l) => (
              <li key={l.from}>
                <TagPill
                  label={`${genreMap[l.from]?.name ?? l.from} · ${typeLabel(l.type)}`}
                  href={`/genres/${l.from}`}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="border-2 border-ink p-5">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.genres.downstream}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {downstream.length === 0 && (
              <li className="text-sm text-muted">{t.genres.leafNode}</li>
            )}
            {downstream.map((l) => (
              <li key={l.to}>
                <TagPill
                  label={`${genreMap[l.to]?.name ?? l.to} · ${typeLabel(l.type)}`}
                  href={`/genres/${l.to}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {(genre.pioneerBands?.length ?? 0) > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">
            {t.genres.pioneers}
          </h2>
          <p className="mt-2 text-sm text-muted">{t.genres.pioneersHint}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {genre.pioneerBands!.map((slug) => {
              const band = bands.find((b) => b.slug === slug);
              return (
                <li key={slug}>
                  <TagPill
                    label={band?.name ?? slug}
                    href={`/bands/${slug}`}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">
          {t.genres.representative}
        </h2>
        {bands.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{t.genres.noBands}</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {bands.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/bands/${b.slug}`}
                  className="block border-2 border-ink px-4 py-3 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
                >
                  {b.name}
                  <span className="ml-2 text-xs font-normal opacity-70">
                    {b.origin} · {b.formed}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-10">
        <Link
          href="/genres"
          className="text-sm font-medium uppercase tracking-wider underline-offset-4 hover:underline"
        >
          {t.genres.backMap}
        </Link>
      </p>
    </main>
  );
}
