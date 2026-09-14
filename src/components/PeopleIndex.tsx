"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { Person } from "@/lib/types";

function PersonCard({ person }: { person: Person }) {
  const { locale, t } = useLocale();
  const blurb = loc(person.shortBio, locale) || loc(person.whyHub, locale);

  return (
    <Link
      href={`/people/${person.slug}`}
      className="block h-full border-2 border-ink p-5 transition-colors hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <p className="text-xs uppercase tracking-wider opacity-70">
        {person.hub ? `${t.people.hub} ` : ""}
        {person.born ? `· ${person.born}` : ""}
      </p>
      <h2 className="font-display mt-2 text-2xl font-semibold">{person.name}</h2>
      <p className="mt-1 text-xs opacity-70">{person.roles.join(" · ")}</p>
      {blurb && (
        <p className="mt-3 text-sm opacity-80 line-clamp-3">{blurb}</p>
      )}
    </Link>
  );
}

export function PeopleIndex({ people }: { people: Person[] }) {
  const { t } = useLocale();
  const hubs = people.filter((p) => p.hub);
  const rest = people.filter((p) => !p.hub);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
        {t.people.eyebrow}
      </p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        {t.people.title}
      </h1>
      <p className="mt-3 text-sm text-muted">
        {people.length} {t.people.count}
      </p>
      <p className="mt-4 flex flex-wrap gap-4">
        <Link
          href="/people/graph"
          className="text-sm font-medium uppercase tracking-wider underline-offset-4 hover:underline"
        >
          {t.people.openGraph}
        </Link>
      </p>

      {hubs.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">{t.people.hubs}</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hubs.map((person) => (
              <li key={person.slug}>
                <PersonCard person={person} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold">
            {t.people.lineup}
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((person) => (
              <li key={person.slug}>
                <PersonCard person={person} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
