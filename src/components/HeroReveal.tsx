"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useLocale } from "@/i18n/LocaleProvider";

export function HeroReveal() {
  const [revealed, setRevealed] = useState(false);
  const { t } = useLocale();

  const updateFromClientX = useCallback(
    (clientX: number, width: number, left: number) => {
      const x = clientX - left;
      setRevealed(x >= width * 0.5);
    },
    [],
  );

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    updateFromClientX(e.clientX, rect.width, rect.left);
  };

  const onMouseLeave = () => setRevealed(false);

  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    updateFromClientX(touch.clientX, rect.width, rect.left);
  };

  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden border-b-2 border-ink bg-paper"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
          revealed ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Image
          src="/hero-chronicles.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_18%]"
        />
        {/* Left almost fully masked; collage only reads clearly on the right half */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--paper) 0%, var(--paper) 36%, color-mix(in srgb, var(--paper) 55%, transparent) 48%, transparent 64%)",
          }}
        />
      </div>

      <button
        type="button"
        className="absolute top-0 right-0 z-[5] h-full w-1/2 cursor-default border-0 bg-transparent"
        aria-label={revealed ? t.home.hoverHintHide : t.home.hoverHintShow}
        tabIndex={-1}
        onFocus={() => setRevealed(true)}
        onBlur={() => setRevealed(false)}
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-muted">
          {t.home.brand}
        </p>
        <h1 className="font-display max-w-xl text-5xl leading-[0.95] font-semibold tracking-tight text-ink sm:text-7xl">
          {t.home.titleLine1}
          <br />
          {t.home.titleLine2}
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft sm:text-xl">
          {t.home.tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/guide"
            className="border-2 border-ink bg-ink px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-paper transition-colors hover:bg-accent hover:border-accent"
          >
            {t.home.startGuide}
          </Link>
          <Link
            href="/timeline"
            className="border-2 border-ink bg-transparent px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {t.home.enterTimeline}
          </Link>
          <Link
            href="/genres"
            className="border-2 border-ink bg-transparent px-5 py-2.5 text-sm font-medium uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {t.home.genreMap}
          </Link>
        </div>
        <p className="mt-10 max-w-xs text-xs tracking-wide text-muted">
          {revealed ? t.home.hoverHintHide : t.home.hoverHintShow}
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">
          {t.home.scroll}
        </p>
      </div>
    </section>
  );
}
