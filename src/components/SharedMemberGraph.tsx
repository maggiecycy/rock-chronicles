"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Band, SharedMemberEdge } from "@/lib/types";

export function SharedMemberGraph({
  edges,
  bands,
}: {
  edges: SharedMemberEdge[];
  bands: Band[];
}) {
  const { t } = useLocale();
  const [focus, setFocus] = useState<string | null>(null);

  const bandMap = useMemo(
    () => Object.fromEntries(bands.map((b) => [b.slug, b])),
    [bands],
  );

  const nodes = useMemo(() => {
    const set = new Set<string>();
    for (const e of edges) {
      set.add(e.bandA);
      set.add(e.bandB);
    }
    return [...set]
      .map((slug) => bandMap[slug])
      .filter(Boolean)
      .sort((a, b) => a!.formed - b!.formed) as Band[];
  }, [bandMap, edges]);

  const filtered = useMemo(() => {
    if (!focus) return edges;
    return edges.filter((e) => e.bandA === focus || e.bandB === focus);
  }, [edges, focus]);

  const layout = useMemo(() => {
    const w = 640;
    const h = 420;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.38;
    const pos: Record<string, { x: number; y: number }> = {};
    nodes.forEach((n, i) => {
      const a = (i / Math.max(nodes.length, 1)) * Math.PI * 2 - Math.PI / 2;
      pos[n.slug] = { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    });
    return { w, h, pos };
  }, [nodes]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
        {t.peopleGraph.eyebrow}
      </p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        {t.peopleGraph.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
        {t.peopleGraph.intro}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFocus(null)}
          className={`border-2 px-3 py-1 text-xs uppercase tracking-wider ${
            !focus ? "border-ink bg-ink text-paper" : "border-ink text-ink"
          }`}
        >
          {t.peopleGraph.all}
        </button>
        {nodes.map((b) => (
          <button
            key={b.slug}
            type="button"
            onClick={() => setFocus(b.slug === focus ? null : b.slug)}
            className={`border-2 px-3 py-1 text-xs tracking-wider ${
              focus === b.slug
                ? "border-ink bg-ink text-paper"
                : "border-ink/40 text-ink hover:border-ink"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {nodes.length === 0 ? (
        <p className="mt-10 text-sm text-muted">{t.peopleGraph.empty}</p>
      ) : (
        <div className="mt-8 overflow-x-auto border-2 border-ink bg-paper-deep/20 p-4">
          <svg
            viewBox={`0 0 ${layout.w} ${layout.h}`}
            className="mx-auto h-auto w-full max-w-3xl"
            role="img"
            aria-label={t.peopleGraph.title}
          >
            {filtered.map((e) => {
              const a = layout.pos[e.bandA];
              const b = layout.pos[e.bandB];
              if (!a || !b) return null;
              return (
                <g key={`${e.personSlug}-${e.bandA}-${e.bandB}`}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="text-ink/35"
                  />
                  <text
                    x={(a.x + b.x) / 2}
                    y={(a.y + b.y) / 2 - 6}
                    textAnchor="middle"
                    className="fill-muted text-[9px]"
                  >
                    {e.personName}
                  </text>
                </g>
              );
            })}
            {nodes.map((n) => {
              const p = layout.pos[n.slug];
              const active = !focus || focus === n.slug;
              return (
                <g key={n.slug}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={active ? 10 : 6}
                    className={active ? "fill-ink" : "fill-ink/30"}
                  />
                  <text
                    x={p.x}
                    y={p.y + 22}
                    textAnchor="middle"
                    className="fill-ink text-[10px] font-medium"
                  >
                    {n.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">
          {t.peopleGraph.edgeList}
        </h2>
        <ul className="mt-4 space-y-2">
          {filtered.map((e) => (
            <li
              key={`${e.personSlug}-${e.bandA}-${e.bandB}`}
              className="border border-ink/25 px-4 py-3 text-sm"
            >
              <Link
                href={`/people/${e.personSlug}`}
                className="font-medium underline-offset-2 hover:underline"
              >
                {e.personName}
              </Link>
              <span className="text-muted"> · </span>
              <Link
                href={`/bands/${e.bandA}`}
                className="underline-offset-2 hover:underline"
              >
                {bandMap[e.bandA]?.name ?? e.bandA}
              </Link>
              <span className="text-muted"> ↔ </span>
              <Link
                href={`/bands/${e.bandB}`}
                className="underline-offset-2 hover:underline"
              >
                {bandMap[e.bandB]?.name ?? e.bandB}
              </Link>
            </li>
          ))}
        </ul>
      </section>

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
