"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { Band, Era } from "@/lib/types";

interface TimelineRailProps {
  eras: Era[];
  bandsByEra: Record<string, Band[]>;
}

function EraCard({
  era,
  bands,
  active,
}: {
  era: Era;
  bands: Band[];
  active: boolean;
}) {
  const { locale, t } = useLocale();

  return (
    <article
      className={`relative w-[min(78vw,26rem)] shrink-0 border-2 border-ink bg-paper p-6 transition-[transform,opacity,box-shadow] duration-300 ease-out ${
        active
          ? "z-10 scale-100 opacity-100 shadow-[4px_6px_0_0_rgba(22,21,19,0.12)]"
          : "scale-[0.96] opacity-55"
      }`}
    >
      <div
        aria-hidden
        className={`absolute -top-3 left-6 h-3 w-3 rounded-full border-2 border-ink transition-colors ${
          active ? "bg-accent" : "bg-paper"
        }`}
      />
      <p className="text-xs font-medium uppercase tracking-wider text-accent">
        {era.decade}
      </p>
      <h2 className="font-display mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
        <Link
          href={`/eras/${era.slug}`}
          className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {loc(era.name, locale)}
        </Link>
      </h2>
      <p className="mt-1 text-xs text-muted">{era.years}</p>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
        {loc(era.summary, locale)}
      </p>

      {bands.length > 0 && (
        <ul className="mt-5 space-y-1.5 border-t border-ink/20 pt-4">
          {bands.map((band) => (
            <li key={band.slug}>
              <Link
                href={`/bands/${band.slug}`}
                className="text-sm font-medium underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {band.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {era.alsoNotable.length > 0 && bands.length === 0 && (
        <p className="mt-5 border-t border-ink/20 pt-4 text-xs text-muted">
          {t.timeline.also} {era.alsoNotable.slice(0, 3).join(" · ")}
        </p>
      )}

      <Link
        href={`/eras/${era.slug}`}
        className="mt-5 inline-block text-xs font-medium uppercase tracking-wider text-ink underline-offset-4 hover:underline"
      >
        {t.timeline.openChapter}
      </Link>
    </article>
  );
}

export function TimelineRail({ eras, bandsByEra }: TimelineRailProps) {
  const { t } = useLocale();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDecade = eras[activeIndex]?.decade ?? eras[0]?.decade ?? "";

  const { scrollXProgress } = useScroll({ container: scrollerRef });
  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  useMotionValueEvent(smoothProgress, "change", (v) => {
    setProgress(v);
    if (eras.length <= 1) {
      setActiveIndex(0);
      return;
    }
    const idx = Math.min(
      eras.length - 1,
      Math.max(0, Math.round(v * (eras.length - 1))),
    );
    setActiveIndex(idx);
  });

  const scrollBy = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * Math.min(el.clientWidth * 0.75, 420),
      behavior: "smooth",
    });
  }, []);

  const jumpTo = useCallback((index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    // children: [spacer, ...cards, spacer]
    const child = el.children[index + 1] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY + e.deltaX;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || (e.target as HTMLElement).closest("a,button")) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };
    el.setPointerCapture(e.pointerId);
    el.classList.add("cursor-grabbing");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    el.scrollLeft = dragRef.current.scrollLeft - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    dragRef.current.active = false;
    el?.classList.remove("cursor-grabbing");
    try {
      el?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="relative">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {t.timeline.freeScroll}
          </p>
          <p className="font-display mt-1 text-2xl font-semibold">{activeDecade}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="border-2 border-ink px-3 py-1 text-sm font-medium hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Scroll timeline left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="border-2 border-ink px-3 py-1 text-sm font-medium hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Scroll timeline right"
          >
            →
          </button>
        </div>
      </div>

      <div className="mb-4 overflow-x-auto">
        <div className="flex min-w-max gap-1 border-b-2 border-ink pb-2">
          {eras.map((era, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={era.slug}
                type="button"
                onClick={() => jumpTo(i)}
                className={`px-2.5 py-1 text-xs font-medium uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  active ? "bg-ink text-paper" : "text-muted hover:text-ink"
                }`}
              >
                {era.decade}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="mb-6 h-1 w-full bg-ink/10"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Timeline scroll progress"
      >
        <motion.div
          className="h-full origin-left bg-accent"
          style={{ scaleX: smoothProgress }}
        />
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[1.35rem] right-0 left-0 z-0 hidden h-0.5 bg-ink/25 sm:block"
        />

        <div
          ref={scrollerRef}
          className="relative z-10 flex cursor-grab gap-6 overflow-x-auto pb-8 select-none scroll-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [scrollbar-width:thin]"
          tabIndex={0}
          role="region"
          aria-label="Rock history timeline"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              scrollBy(1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              scrollBy(-1);
            } else if (e.key === "Home") {
              e.preventDefault();
              jumpTo(0);
            } else if (e.key === "End") {
              e.preventDefault();
              jumpTo(eras.length - 1);
            }
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="w-[8vw] shrink-0 sm:w-12" aria-hidden />
          {eras.map((era, index) => (
            <EraCard
              key={era.slug}
              era={era}
              bands={bandsByEra[era.slug] ?? []}
              active={index === activeIndex}
            />
          ))}
          <div className="w-[8vw] shrink-0 sm:w-12" aria-hidden />
        </div>
      </div>
    </div>
  );
}
