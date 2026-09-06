"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { GuideArticle } from "@/lib/types";

export function GuideIndex({ articles }: { articles: GuideArticle[] }) {
  const { locale, t } = useLocale();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
        {t.guide.eyebrow}
      </p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        {t.guide.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
        {t.guide.intro}
      </p>

      <ul className="mt-10 space-y-3">
        {articles.map((article, i) => (
          <li key={article.slug}>
            <Link
              href={`/guide/${article.slug}`}
              className="flex gap-4 border-2 border-ink p-5 transition-colors hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:gap-6"
            >
              <span className="text-xs font-medium uppercase tracking-wider opacity-70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <h2 className="font-display text-2xl font-semibold">
                  {loc(article.title, locale)}
                </h2>
                <p className="mt-2 text-sm opacity-80">
                  {loc(article.summary, locale)}
                </p>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-14 border-t-2 border-ink pt-10">
        <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
          {t.guide.alsoBrowse}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <li>
            <Link
              href="/tropes"
              className="block h-full border-2 border-ink p-5 transition-colors hover:bg-ink hover:text-paper"
            >
              <p className="font-display text-xl font-semibold">
                {t.guide.tropesCard}
              </p>
              <p className="mt-2 text-sm opacity-80">{t.guide.tropesCardHint}</p>
            </Link>
          </li>
          <li>
            <Link
              href="/lives"
              className="block h-full border-2 border-ink p-5 transition-colors hover:bg-ink hover:text-paper"
            >
              <p className="font-display text-xl font-semibold">
                {t.guide.livesCard}
              </p>
              <p className="mt-2 text-sm opacity-80">{t.guide.livesCardHint}</p>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
