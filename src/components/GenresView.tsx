"use client";

import { GenreNetwork } from "@/components/GenreNetwork";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Genre, GenreLink } from "@/lib/types";

export function GenresView({
  genres,
  links,
}: {
  genres: Genre[];
  links: GenreLink[];
}) {
  const { t } = useLocale();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
          {t.genres.topology}
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          {t.genres.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
          {t.genres.intro}
        </p>
      </header>
      <GenreNetwork genres={genres} links={links} />
    </main>
  );
}
