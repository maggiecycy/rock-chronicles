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
      <section className="border-b-2 border-ink bg-paper-deep/30 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold">
            {t.home.historySpine}
          </h2>
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
