"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSound } from "@/components/SoundProvider";
import { useLocale } from "@/i18n/LocaleProvider";

export function MagazineNav() {
  const pathname = usePathname();
  const { enabled, toggle, activeGenre } = useSound();
  const { locale, setLocale, t } = useLocale();

  const links = [
    { href: "/", label: t.nav.cover },
    { href: "/timeline", label: t.nav.timeline },
    { href: "/genres", label: t.nav.genres },
    { href: "/people", label: t.nav.people },
    { href: "/guide", label: t.nav.guide },
  ];

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl"
        >
          Rock Chronicles
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center gap-1 sm:gap-2">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block border-2 px-2 py-1 text-xs font-medium uppercase tracking-wider transition-colors sm:px-3 sm:text-sm ${
                      active
                        ? "border-ink bg-ink text-paper"
                        : "border-transparent text-ink-soft hover:border-ink"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className="ml-1 flex border-2 border-ink"
            role="group"
            aria-label={t.nav.langLabel}
          >
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
              className={`px-2 py-1 text-xs font-medium tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                locale === "en"
                  ? "bg-ink text-paper"
                  : "text-ink hover:bg-ink/10"
              }`}
            >
              {t.nav.langEn}
            </button>
            <button
              type="button"
              onClick={() => setLocale("zh")}
              aria-pressed={locale === "zh"}
              className={`border-l-2 border-ink px-2 py-1 text-xs font-medium tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                locale === "zh"
                  ? "bg-ink text-paper"
                  : "text-ink hover:bg-ink/10"
              }`}
            >
              {t.nav.langZh}
            </button>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-pressed={enabled}
            aria-label={enabled ? t.nav.soundOnLabel : t.nav.soundOffLabel}
            className={`border-2 px-2 py-1 text-xs font-medium uppercase tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              enabled
                ? "border-accent bg-accent text-paper"
                : "border-ink text-ink hover:bg-ink hover:text-paper"
            }`}
            title={
              activeGenre
                ? `Playing: ${activeGenre}`
                : "Genre loops (procedural, copyright-free)"
            }
          >
            {enabled ? t.nav.soundOn : t.nav.sound}
          </button>
        </div>
      </nav>
    </header>
  );
}
