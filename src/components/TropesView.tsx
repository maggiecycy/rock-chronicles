"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { Trope } from "@/lib/types";

const toneKey = {
  lore: "toneLore",
  meme: "toneMeme",
  "half-true": "toneHalfTrue",
} as const;

export function TropesView({ tropes }: { tropes: Trope[] }) {
  const { locale, t } = useLocale();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
        {t.tropes.eyebrow}
      </p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        {t.tropes.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
        {t.tropes.intro}
      </p>

      <ul className="mt-10 grid gap-6 lg:grid-cols-2">
        {tropes.map((trope) => (
          <li
            key={trope.slug}
            id={trope.slug}
            className="scroll-mt-24 border-2 border-ink p-5 sm:p-6"
          >
            <p className="text-xs uppercase tracking-wider text-muted">
              {t.tropes[toneKey[trope.tone]]}
            </p>
            <h2 className="font-display mt-2 text-2xl font-semibold">
              {loc(trope.title, locale)}
            </h2>
            <p className="mt-2 text-sm font-medium text-ink-soft">
              {loc(trope.summary, locale)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft whitespace-pre-line">
              {loc(trope.body, locale)}
            </p>
            {trope.examples.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-ink/20 pt-4">
                <li className="text-xs uppercase tracking-wider text-muted">
                  {t.tropes.examples}
                </li>
                {trope.examples.map((ex) => {
                  const href = ex.bandSlug
                    ? `/bands/${ex.bandSlug}`
                    : ex.personSlug
                      ? `/people/${ex.personSlug}`
                      : undefined;
                  return (
                    <li key={`${ex.label}-${ex.bandSlug ?? ex.personSlug ?? ""}`}>
                      {href ? (
                        <Link
                          href={href}
                          className="text-sm underline-offset-2 hover:underline"
                        >
                          {ex.label}
                        </Link>
                      ) : (
                        <span className="text-sm">{ex.label}</span>
                      )}
                      {ex.note && (
                        <span className="text-xs text-muted">
                          {" — "}
                          {loc(ex.note, locale)}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-ink-soft">
        {t.tropes.moreHint}{" "}
        <Link href="/guide" className="underline-offset-2 hover:underline">
          {t.nav.guide}
        </Link>
      </p>
    </main>
  );
}
