"use client";

import Link from "next/link";
import { TimelineRail } from "@/components/TimelineRail";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Band, Era } from "@/lib/types";

export function TimelineView({
  eras,
  bandsByEra,
  decisive,
}: {
  eras: Era[];
  bandsByEra: Record<string, Band[]>;
  decisive: Band[];
}) {
  const { t } = useLocale();

  return (
    <main className="pb-16">
      <header className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
          {t.timeline.exploreLayer}
        </p>
        <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          {t.timeline.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {t.timeline.intro}
        </p>
      </header>

      <div className="mt-10 border-y-2 border-ink bg-paper-deep/25 py-8">
        <div className="mx-auto max-w-[100vw] px-0 sm:px-2">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <TimelineRail eras={eras} bandsByEra={bandsByEra} />
          </div>
        </div>
      </div>

      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">
          {t.timeline.jumpDecisive}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {decisive.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/bands/${b.slug}`}
                className="border-2 border-ink px-3 py-1.5 text-sm hover:bg-ink hover:text-paper"
              >
                {b.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
