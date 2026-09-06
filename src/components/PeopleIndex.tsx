"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { Person } from "@/lib/types";

export function PeopleIndex({ people }: { people: Person[] }) {
  const { locale, t } = useLocale();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
        {t.people.eyebrow}
      </p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        {t.people.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
        {t.people.intro}
      </p>
      <p className="mt-4 flex flex-wrap gap-4">
        <Link
          href="/people/graph"
          className="text-sm font-medium uppercase tracking-wider underline-offset-4 hover:underline"
        >
          {t.people.openGraph}
        </Link>
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <li key={person.slug}>
            <Link
              href={`/people/${person.slug}`}
              className="block h-full border-2 border-ink p-5 transition-colors hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <p className="text-xs uppercase tracking-wider opacity-70">
                {person.hub ? t.people.hub : ""}{" "}
                {person.born ? `· ${person.born}` : ""}
              </p>
              <h2 className="font-display mt-2 text-2xl font-semibold">
                {person.name}
              </h2>
              <p className="mt-1 text-xs opacity-70">
                {person.roles.join(" · ")}
              </p>
              <p className="mt-3 text-sm opacity-80 line-clamp-3">
                {loc(person.whyHub, locale)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
