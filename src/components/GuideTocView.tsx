"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { GuideArticle, GuideOutlineChapter } from "@/lib/types";

function chapterNum(label: string | undefined): number | null {
  if (!label) return null;
  const m = /^(\d+)\./.exec(label.trim());
  return m ? Number(m[1]) : null;
}

function outlineChapterNum(chapter: GuideOutlineChapter): number | null {
  for (const item of chapter.items) {
    const n = chapterNum(item.label);
    if (n != null) return n;
  }
  return null;
}

export function GuideTocView({
  article,
  sections,
}: {
  article: GuideArticle;
  sections: GuideArticle[];
}) {
  const { locale, t } = useLocale();
  const intro = loc(article.body, locale)
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  const byChapter = new Map<number, GuideArticle[]>();
  for (const child of sections) {
    const n = chapterNum(child.sectionLabel);
    if (n == null) continue;
    const list = byChapter.get(n) ?? [];
    list.push(child);
    byChapter.set(n, list);
  }
  for (const list of byChapter.values()) {
    list.sort((a, b) => a.order - b.order);
  }

  const liveChapterNums = new Set(byChapter.keys());

  const chapterHeading = (n: number): string => {
    if (n === 1) {
      return loc(article.sectionsHeading, locale) || t.guide.availableSections;
    }
    const fromOutline = (article.outline ?? []).find(
      (ch) => outlineChapterNum(ch) === n,
    );
    if (fromOutline) return loc(fromOutline.heading, locale);
    return `${t.guide.section} ${n}`;
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
        {t.guide.tocEyebrow}
      </p>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {loc(article.title, locale)}
      </h1>
      <p className="mt-4 text-lg text-ink-soft">
        {loc(article.summary, locale)}
      </p>

      {intro.length > 0 && (
        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft">
          {intro.map((p, i) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>
      )}

      {[...byChapter.keys()]
        .sort((a, b) => a - b)
        .map((n) => {
          const kids = byChapter.get(n) ?? [];
          return (
            <section key={`live-${n}`} className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-ink">
                {chapterHeading(n)}
              </h2>
              <ul className="mt-4 divide-y-2 divide-ink border-2 border-ink">
                {kids.map((child) => (
                  <li key={child.slug}>
                    <Link
                      href={`/guide/${child.slug}`}
                      className="flex gap-4 px-4 py-4 transition-colors hover:bg-ink hover:text-paper"
                    >
                      <span className="shrink-0 text-xs font-medium uppercase tracking-wider opacity-70">
                        {child.sectionLabel ?? ""}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="font-display text-lg font-semibold">
                          {loc(child.title, locale)}
                        </span>
                        {loc(child.summary, locale) ? (
                          <span className="mt-1 block text-sm opacity-80">
                            {loc(child.summary, locale)}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

      {(article.outline ?? []).map((chapter, ci) => {
        const n = outlineChapterNum(chapter);
        // Already rendered as live section links above
        if (n != null && liveChapterNums.has(n)) return null;

        const isReadingList = chapter.items.some((item) =>
          Boolean(loc(item.summary, locale)),
        );

        return (
          <section key={`outline-${ci}`} className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-ink">
              {loc(chapter.heading, locale)}
            </h2>
            <ul
              className={
                isReadingList
                  ? "mt-4 divide-y-2 divide-ink border-2 border-ink"
                  : "mt-4 divide-y border-2 border-ink/40 divide-ink/20"
              }
            >
              {chapter.items.map((item, ii) => {
                const blurb = loc(item.summary, locale);
                const isNote = blurb.length > 0;
                const linked =
                  item.slug ||
                  sections.find((s) => s.sectionLabel === item.label)?.slug;

                if (linked) {
                  return (
                    <li key={`${item.label}-${ii}`}>
                      <Link
                        href={`/guide/${linked}`}
                        className="flex gap-4 px-4 py-3 text-ink transition-colors hover:bg-ink hover:text-paper"
                      >
                        <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-ink-soft">
                          {item.label}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="font-display text-base font-semibold">
                            {loc(item.title, locale)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                }

                if (isNote) {
                  return (
                    <li key={`${item.label}-${ii}`}>
                      <div className="guide-reading-note flex gap-4 px-4 py-4 text-ink">
                        <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-ink-soft">
                          {item.label}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="font-display text-base font-semibold text-ink">
                            {loc(item.title, locale)}
                          </span>
                          <span className="mt-2 block text-sm leading-relaxed text-ink whitespace-pre-line">
                            {blurb}
                          </span>
                        </span>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={`${item.label}-${ii}`}>
                    <div className="flex gap-4 px-4 py-3 text-muted">
                      <span className="shrink-0 text-xs font-medium uppercase tracking-wider opacity-70">
                        {item.label}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="font-display text-base font-semibold">
                          {loc(item.title, locale)}
                        </span>
                        <span className="mt-1 block text-xs opacity-60">
                          {t.guide.stubHint}
                        </span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <p className="mt-10">
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
