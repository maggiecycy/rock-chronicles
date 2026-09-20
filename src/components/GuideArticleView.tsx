"use client";

import Link from "next/link";
import { TagPill } from "@/components/TagPill";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { Band, Genre, GuideArticle, Trope } from "@/lib/types";

export function GuideArticleView({
  article,
  bands,
  genres,
  tropes,
  parent,
}: {
  article: GuideArticle;
  bands: Band[];
  genres: Genre[];
  tropes: Trope[];
  parent?: GuideArticle;
}) {
  const { locale, t } = useLocale();
  const paragraphs = loc(article.body, locale)
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {(article.sectionLabel || t.guide.eyebrow) && (
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
          {article.sectionLabel
            ? `${t.guide.section} ${article.sectionLabel}`
            : t.guide.eyebrow}
        </p>
      )}
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {loc(article.title, locale)}
      </h1>
      {loc(article.summary, locale) && (
        <p className="mt-4 text-lg text-ink-soft">
          {loc(article.summary, locale)}
        </p>
      )}

      <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft">
        {paragraphs.map((p, i) => (
          <p key={i} className="whitespace-pre-line">
            {p}
          </p>
        ))}
      </div>

      {(bands.length > 0 || genres.length > 0 || tropes.length > 0) && (
        <section className="mt-12 border-t-2 border-ink pt-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
            {t.guide.related}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {bands.map((b) => (
              <TagPill key={b.slug} label={b.name} href={`/bands/${b.slug}`} />
            ))}
            {genres.map((g) => (
              <TagPill
                key={g.slug}
                label={g.name}
                href={`/genres/${g.slug}`}
              />
            ))}
            {tropes.map((tr) => (
              <TagPill
                key={tr.slug}
                label={loc(tr.title, locale)}
                href={`/tropes#${tr.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      <p className="mt-10 flex flex-wrap gap-4">
        {parent && (
          <Link
            href={`/guide/${parent.slug}`}
            className="text-sm font-medium uppercase tracking-wider underline-offset-4 hover:underline"
          >
            {t.guide.backToToc}
          </Link>
        )}
        <Link
          href="/guide"
          className="text-sm font-medium uppercase tracking-wider underline-offset-4 hover:underline"
        >
          {t.guide.back}
        </Link>
      </p>
    </main>
  );
}
