"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { Band, Era } from "@/lib/types";

export function HomeView({
  eras,
  decisive,
}: {
  eras: Era[];
  decisive: Band[];
}) {
  const { locale, t } = useLocale();

  return (
    <main>
      {/* Hero is separate client island imported by page */}
      <section className="border-b-2 border-ink px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
              {t.home.howToRead}
            </p>
            <h2 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">
              {t.home.narrativeExplore}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              {t.home.howBody}
            </p>
          </div>
          <ol className="space-y-4 border-2 border-ink p-6">
            <li className="border-b border-ink/15 pb-4">
              <p className="text-xs uppercase tracking-wider text-muted">01</p>
              <p className="mt-1 font-medium">{t.home.step1}</p>
            </li>
            <li className="border-b border-ink/15 pb-4">
              <p className="text-xs uppercase tracking-wider text-muted">02</p>
              <p className="mt-1 font-medium">{t.home.step2}</p>
            </li>
            <li className="border-b border-ink/15 pb-4">
              <p className="text-xs uppercase tracking-wider text-muted">03</p>
              <p className="mt-1 font-medium">{t.home.step3}</p>
            </li>
            <li>
              <p className="text-xs uppercase tracking-wider text-muted">04</p>
              <p className="mt-1 font-medium">{t.home.step4}</p>
            </li>
          </ol>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
            {t.home.firstPathTitle}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Link
              href="/guide"
              className="border-2 border-ink bg-ink px-4 py-4 text-paper transition-colors hover:bg-accent hover:border-accent"
            >
              <p className="font-display text-lg font-semibold">
                {t.home.firstPathGuide}
              </p>
            </Link>
            <Link
              href="/bands/led-zeppelin"
              className="border-2 border-ink px-4 py-4 transition-colors hover:bg-ink hover:text-paper"
            >
              <p className="font-display text-lg font-semibold">
                {t.home.firstPathBand}
              </p>
            </Link>
            <Link
              href="/timeline"
              className="border-2 border-ink px-4 py-4 transition-colors hover:bg-ink hover:text-paper"
            >
              <p className="font-display text-lg font-semibold">
                {t.home.firstPathTimeline}
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-paper-deep/30 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold">
            {t.home.historySpine}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {eras.length} {t.home.historySpineMeta}
          </p>
          <ul className="mt-8 flex gap-3 overflow-x-auto pb-2">
            {eras.map((era) => (
              <li key={era.slug} className="w-48 shrink-0">
                <Link
                  href={`/eras/${era.slug}`}
                  className="block h-full border-2 border-ink bg-paper p-4 transition-colors hover:bg-ink hover:text-paper"
                >
                  <p className="text-xs uppercase tracking-wider opacity-70">
                    {era.decade}
                  </p>
                  <p className="font-display mt-2 text-lg font-semibold leading-tight">
                    {loc(era.name, locale)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold">
            {t.home.decisiveBands}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {t.home.decisiveMeta}
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {decisive.map((band) => (
              <li key={band.slug}>
                <Link
                  href={`/bands/${band.slug}`}
                  className="block h-full border-2 border-ink p-5 transition-colors hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <p className="text-xs uppercase tracking-wider opacity-70">
                    {band.formed}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-semibold">
                    {band.name}
                  </h3>
                  <p className="mt-2 text-sm opacity-80 line-clamp-3">
                    {loc(band.whyMatters ?? band.shortBio, locale)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
