"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { DailyBandIndex } from "@/lib/daily";

export function DailyBandView({ index }: { index: DailyBandIndex }) {
  const { locale, t } = useLocale();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {t.daily.eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
          {t.daily.eyebrow}
        </p>
      ) : null}
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        {loc(index.title, locale)}
      </h1>
      {loc(index.intro, locale) ? (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {loc(index.intro, locale)}
        </p>
      ) : null}

      <ol className="mt-10 divide-y divide-ink/15 border-2 border-ink">
        {index.days.map((d) => (
          <li
            key={d.day}
            className="flex flex-wrap items-baseline justify-between gap-3 px-4 py-3 sm:px-5"
          >
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
                Day {String(d.day).padStart(2, "0")}
              </p>
              <Link
                href={`/bands/${d.bandSlug}`}
                className="font-display text-lg font-semibold underline-offset-2 hover:underline"
              >
                {d.name}
              </Link>
              <p className="mt-0.5 text-xs text-muted">
                {d.signature.title} · {d.signature.year}
              </p>
            </div>
            <Link
              href={`/eras/${d.eraSlug}`}
              className="shrink-0 text-[10px] uppercase tracking-wider text-muted underline-offset-2 hover:underline"
            >
              {t.daily.openEra}
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-10">
        <Link
          href="/guide"
          className="text-sm font-medium uppercase tracking-wider underline-offset-4 hover:underline"
        >
          {t.daily.backGuide}
        </Link>
      </p>
    </main>
  );
}
