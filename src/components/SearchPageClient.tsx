"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { SearchHit } from "@/lib/search";

function kindLabel(
  kind: SearchHit["kind"],
  t: ReturnType<typeof useLocale>["t"],
): string {
  switch (kind) {
    case "band":
      return t.search.kindBand;
    case "person":
      return t.search.kindPerson;
    case "genre":
      return t.search.kindGenre;
    case "era":
      return t.search.kindEra;
    case "guide":
      return t.search.kindGuide;
    case "trope":
      return t.search.kindTrope;
    case "live":
      return t.search.kindLive;
  }
}

function SearchInner() {
  const { locale, t } = useLocale();
  const router = useRouter();
  const params = useSearchParams();
  const initial = (params.get("q") ?? "").trim();
  const [q, setQ] = useState(initial);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQ(initial);
  }, [initial]);

  useEffect(() => {
    const needle = initial;
    if (!needle) {
      setHits([]);
      setLoading(false);
      return;
    }
    const ctrl = new AbortController();
    setLoading(true);
    fetch(
      `/api/search?q=${encodeURIComponent(needle)}&locale=${locale}&limit=40`,
      { signal: ctrl.signal },
    )
      .then((res) => res.json())
      .then((data: { hits: SearchHit[] }) => setHits(data.hits ?? []))
      .catch((err) => {
        if ((err as Error).name !== "AbortError") setHits([]);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [initial, locale]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const needle = q.trim();
    router.push(needle ? `/search?q=${encodeURIComponent(needle)}` : "/search");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      {t.search.eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
          {t.search.eyebrow}
        </p>
      ) : null}
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        {t.search.title}
      </h1>

      <form onSubmit={onSubmit} className="mt-8" role="search">
        <label className="sr-only" htmlFor="site-search-q">
          {t.search.placeholder}
        </label>
        <input
          id="site-search-q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.search.placeholder}
          autoFocus
          className="w-full border-2 border-ink bg-paper px-3 py-2 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </form>

      {!initial && t.search.hint ? (
        <p className="mt-8 text-sm text-muted">{t.search.hint}</p>
      ) : null}
      {initial && loading && (
        <p className="mt-8 text-sm text-muted">{t.search.searching}</p>
      )}
      {initial && !loading && hits.length === 0 && (
        <p className="mt-8 text-sm text-muted">{t.search.noResults}</p>
      )}

      {hits.length > 0 && (
        <ul className="mt-10 divide-y-2 divide-ink border-2 border-ink">
          {hits.map((hit) => (
            <li key={`${hit.kind}-${hit.slug}`}>
              <Link
                href={hit.href}
                className="block px-4 py-4 transition-colors hover:bg-ink hover:text-paper"
              >
                <p className="text-[10px] font-medium uppercase tracking-wider opacity-70">
                  {kindLabel(hit.kind, t)}
                </p>
                <p className="font-display mt-1 text-xl font-semibold">
                  {hit.title}
                </p>
                {hit.blurb && (
                  <p className="mt-1 text-sm opacity-80 line-clamp-2">
                    {hit.blurb}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export function SearchPageClient() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm text-muted">…</p>
        </main>
      }
    >
      <SearchInner />
    </Suspense>
  );
}
