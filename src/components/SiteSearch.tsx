"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
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

export function SiteSearch() {
  const { locale, t } = useLocale();
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const needle = q.trim();
    if (needle.length < 2) {
      setHits([]);
      setLoading(false);
      return;
    }

    const ctrl = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(needle)}&locale=${locale}&limit=8`,
          { signal: ctrl.signal },
        );
        if (!res.ok) return;
        const data = (await res.json()) as { hits: SearchHit[] };
        setHits(data.hits);
        setOpen(true);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setHits([]);
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => {
      window.clearTimeout(timer);
      ctrl.abort();
    };
  }, [q, locale]);

  useEffect(() => {
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const needle = q.trim();
    if (!needle) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(needle)}`);
  };

  return (
    <div ref={rootRef} className="relative">
      <form onSubmit={onSubmit} role="search">
        <label className="sr-only" htmlFor={listId}>
          {t.search.placeholder}
        </label>
        <input
          id={listId}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => {
            if (hits.length > 0) setOpen(true);
          }}
          placeholder={t.search.placeholder}
          autoComplete="off"
          className="w-28 border-2 border-ink bg-paper px-2 py-1 text-xs outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-40 sm:text-sm"
        />
      </form>

      {open && q.trim().length >= 2 && (
        <div className="absolute top-full right-0 z-50 mt-1 w-[min(20rem,calc(100vw-2rem))] border-2 border-ink bg-paper shadow-sm">
          {loading && hits.length === 0 && (
            <p className="px-3 py-2 text-xs text-muted">{t.search.searching}</p>
          )}
          {!loading && hits.length === 0 && (
            <p className="px-3 py-2 text-xs text-muted">{t.search.noResults}</p>
          )}
          {hits.length > 0 && (
            <ul className="max-h-80 overflow-auto">
              {hits.map((hit) => (
                <li key={`${hit.kind}-${hit.slug}`} className="border-b border-ink/15 last:border-b-0">
                  <Link
                    href={hit.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 hover:bg-ink hover:text-paper"
                  >
                    <p className="text-[10px] uppercase tracking-wider opacity-70">
                      {kindLabel(hit.kind, t)}
                    </p>
                    <p className="font-display text-sm font-semibold">{hit.title}</p>
                    {hit.blurb && (
                      <p className="mt-0.5 line-clamp-2 text-xs opacity-80">
                        {hit.blurb}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href={`/search?q=${encodeURIComponent(q.trim())}`}
            onClick={() => setOpen(false)}
            className="block border-t-2 border-ink px-3 py-2 text-xs font-medium uppercase tracking-wider hover:bg-ink hover:text-paper"
          >
            {t.search.viewAll}
          </Link>
        </div>
      )}
    </div>
  );
}
