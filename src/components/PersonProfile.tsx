"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { Person } from "@/lib/types";

function formatTo(
  to: number | "present" | undefined,
  presentLabel: string,
): string {
  if (to === undefined) return "";
  if (to === "present") return presentLabel;
  return String(to);
}

export function PersonProfile({
  person,
  related,
}: {
  person: Person;
  related: Person[];
}) {
  const { locale, t } = useLocale();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
        {t.people.hub}
        {person.born ? ` · ${person.born}` : ""}
      </p>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {person.name}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {person.origin} · {person.roles.join(" · ")}
      </p>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        {loc(person.shortBio, locale)}
      </p>

      <section className="mt-10 border-2 border-ink p-5 sm:p-6">
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted">
          {t.people.whyHub}
        </h2>
        <p className="font-display mt-3 text-2xl leading-snug font-semibold">
          {loc(person.whyHub, locale)}
        </p>
        <p className="mt-4 leading-relaxed text-ink-soft">
          {loc(person.body, locale)}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">
          {t.people.tenures}
        </h2>
        <ol className="mt-4 space-y-0 border-2 border-ink">
          {person.tenures.map((tenure, i) => (
            <li
              key={`${tenure.bandName}-${tenure.from}-${i}`}
              className="border-b border-ink/15 px-4 py-4 last:border-b-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium">
                  {tenure.bandSlug ? (
                    <Link
                      href={`/bands/${tenure.bandSlug}`}
                      className="underline-offset-2 hover:underline"
                    >
                      {tenure.bandName}
                    </Link>
                  ) : (
                    tenure.bandName
                  )}
                </p>
                <p className="text-xs text-muted">
                  {tenure.from}
                  {tenure.to !== undefined
                    ? `–${formatTo(tenure.to, t.people.present)}`
                    : ""}
                </p>
              </div>
              <p className="mt-1 text-sm text-ink-soft">{tenure.role}</p>
              {tenure.note && (
                <p className="mt-2 text-xs text-muted">
                  {loc(tenure.note, locale)}
                </p>
              )}
              {tenure.bandSlug && (
                <Link
                  href={`/bands/${tenure.bandSlug}`}
                  className="mt-2 inline-block text-xs font-medium uppercase tracking-wider underline-offset-4 hover:underline"
                >
                  {t.people.openBand} →
                </Link>
              )}
            </li>
          ))}
        </ol>
      </section>

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">
            {t.people.relatedPeople}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/people/${p.slug}`}
                  className="border-2 border-ink px-3 py-1.5 text-sm hover:bg-ink hover:text-paper"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-10">
        <Link
          href="/people"
          className="text-sm font-medium uppercase tracking-wider underline-offset-4 hover:underline"
        >
          {t.people.backPeople}
        </Link>
      </p>
    </main>
  );
}
