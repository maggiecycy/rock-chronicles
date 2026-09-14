"use client";

import Link from "next/link";
import { useRef } from "react";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { CanonPeriod } from "@/lib/canon";

/** Vertical era rail: drag handle scrolls page; links navigate normally. */
export function CanonEraTimeline({ periods }: { periods: CanonPeriod[] }) {
  const { locale, t } = useLocale();
  const dragRef = useRef<{ y: number; scroll: number } | null>(null);

  const sorted = periods.slice().sort((a, b) => a.order - b.order);

  return (
    <aside className="sticky top-24 hidden max-h-[calc(100dvh-8rem)] w-44 shrink-0 overflow-y-auto bg-paper lg:block">
      <div
        className="cursor-grab touch-none select-none px-1 py-2 active:cursor-grabbing"
        onPointerDown={(e) => {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          dragRef.current = { y: e.clientY, scroll: window.scrollY };
        }}
        onPointerMove={(e) => {
          const d = dragRef.current;
          if (!d) return;
          window.scrollTo({ top: d.scroll - (e.clientY - d.y) * 1.6 });
        }}
        onPointerUp={(e) => {
          dragRef.current = null;
          try {
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
          } catch {
            /* ignore */
          }
        }}
        onPointerCancel={() => {
          dragRef.current = null;
        }}
      >
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
          {t.canon.eraRail}
        </p>
        <p className="mt-1 text-[10px] leading-snug text-muted">
          {t.canon.eraRailHint}
        </p>
      </div>
      <ol className="relative space-y-0 border-l-2 border-ink py-3 pl-3 ml-3">
        {sorted.map((period) => (
          <li key={period.id} className="relative pb-5 last:pb-0 pr-2">
            <span
              className="absolute -left-[1.15rem] top-1.5 size-2.5 border-2 border-ink bg-accent"
              aria-hidden
            />
            <p className="text-[10px] uppercase tracking-wider text-muted">
              {period.years}
            </p>
            <Link
              href={`/eras/${period.eraSlug}`}
              className="font-display mt-0.5 block text-sm font-semibold leading-tight underline-offset-2 hover:underline"
            >
              {loc(period.name, locale)}
            </Link>
            <button
              type="button"
              className="mt-1 text-[10px] uppercase tracking-wider text-muted underline-offset-2 hover:underline"
              onClick={() => {
                document
                  .getElementById(`canon-period-${period.id}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {t.canon.jumpList}
            </button>
          </li>
        ))}
      </ol>
    </aside>
  );
}
