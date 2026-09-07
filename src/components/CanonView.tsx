"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleProvider";
import { loc } from "@/i18n/config";
import type { HundredBandsCanon } from "@/lib/canon";
import type { BandShipStatus } from "@/lib/band-status";

const statusStyle: Record<BandShipStatus, string> = {
  complete: "border-accent text-accent",
  stub: "border-ink/40 text-ink-soft",
  missing: "border-ink/30 text-muted",
};

export function CanonView({
  canon,
  statusBySlug,
  coverage,
}: {
  canon: HundredBandsCanon;
  statusBySlug: Record<string, BandShipStatus>;
  coverage: {
    total: number;
    complete: number;
    stub: number;
    missing: number;
  };
}) {
  const { locale, t } = useLocale();
  const principles =
    locale === "zh"
      ? canon.selectionPrinciples.zh
      : canon.selectionPrinciples.en;
  const futures =
    locale === "zh" ? canon.futureFeatures.zh : canon.futureFeatures.en;

  const statusLabel = (status: BandShipStatus) => {
    if (status === "complete") return t.canon.complete;
    if (status === "stub") return t.canon.stub;
    return t.canon.queued;
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
        {t.canon.eyebrow}
      </p>
      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
        {loc(canon.title, locale)}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
        {loc(canon.intro, locale)}
      </p>
      <p className="mt-3 max-w-2xl text-sm text-muted">{t.canon.taxonomyNote}</p>
      <p className="mt-2 max-w-2xl text-sm text-muted">{t.canon.statusHint}</p>

      <div className="mt-8 grid gap-3 border-2 border-ink p-4 sm:grid-cols-4 sm:p-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">
            {t.canon.coverage}
          </p>
          <p className="font-display mt-1 text-3xl font-semibold">
            {coverage.complete}
            <span className="text-lg text-muted"> / {coverage.total}</span>
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">
            {t.canon.stubCount}
          </p>
          <p className="font-display mt-1 text-3xl font-semibold">
            {coverage.stub}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">
            {t.canon.queuedCount}
          </p>
          <p className="font-display mt-1 text-3xl font-semibold">
            {coverage.missing}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">
            {t.canon.periods}
          </p>
          <p className="font-display mt-1 text-3xl font-semibold">
            {canon.periods.length}
          </p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">
          {t.canon.principles}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft">
          {principles.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="mt-14 space-y-12">
        {canon.periods
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((period) => {
            const completeCount = period.bands.filter(
              (b) => statusBySlug[b.slug] === "complete",
            ).length;
            return (
              <div key={period.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">
                      {period.years}
                      {period.eraSlug ? (
                        <>
                          {" · "}
                          <Link
                            href={`/eras/${period.eraSlug}`}
                            className="underline-offset-2 hover:underline"
                          >
                            {t.canon.openEra}
                          </Link>
                        </>
                      ) : null}
                    </p>
                    <h2 className="font-display mt-1 text-2xl font-semibold sm:text-3xl">
                      {loc(period.name, locale)}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-ink-soft">
                      {loc(period.summary, locale)}
                    </p>
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {completeCount}/{period.bands.length} {t.canon.onSite}
                  </p>
                </div>
                <ul className="mt-4 divide-y divide-ink/15 border-2 border-ink">
                  {period.bands.map((band) => {
                    const status = statusBySlug[band.slug] ?? "missing";
                    const hasPage = status !== "missing";
                    return (
                      <li
                        key={band.slug}
                        className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-start sm:justify-between"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            {hasPage ? (
                              <Link
                                href={`/bands/${band.slug}`}
                                className="font-display text-lg font-semibold underline-offset-2 hover:underline"
                              >
                                {band.name}
                              </Link>
                            ) : (
                              <span className="font-display text-lg font-semibold text-muted">
                                {band.name}
                              </span>
                            )}
                            <span
                              className={`border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${statusStyle[status]}`}
                            >
                              {statusLabel(status)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-ink-soft">
                            {loc(band.role, locale)}
                          </p>
                          <p className="mt-1 text-xs text-muted">
                            {band.signature.title} · {band.signature.year} ·{" "}
                            {band.origin}
                          </p>
                        </div>
                        {hasPage && (
                          <Link
                            href={`/bands/${band.slug}`}
                            className="shrink-0 text-xs font-medium uppercase tracking-wider underline-offset-4 hover:underline"
                          >
                            {t.canon.openBand} →
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold">
          {t.canon.resources}
        </h2>
        <p className="mt-2 text-sm text-muted">{t.canon.resourcesHint}</p>
        {(
          [
            ["forums", t.canon.forums, canon.resources.forums],
            ["media", t.canon.mediaOutlets, canon.resources.media],
            ["youtube", t.canon.youtube, canon.resources.youtube],
          ] as const
        ).map(([key, label, items]) => (
          <div key={key} className="mt-8">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted">
              {label}
            </h3>
            <ul className="mt-3 space-y-3">
              {items.map((item) => (
                <li key={item.url} className="border-2 border-ink p-4">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline-offset-2 hover:underline"
                  >
                    {item.name}
                  </a>
                  <p className="mt-1 text-sm text-ink-soft">
                    {loc(item.note, locale)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-16 border-2 border-ink p-5 sm:p-6">
        <h2 className="font-display text-2xl font-semibold">
          {t.canon.roadmap}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-soft">
          {futures.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">{t.canon.expansionHint}</p>
        <p className="mt-2 text-sm text-ink-soft">
          {canon.expansionCandidates.join(" · ")}
        </p>
      </section>
    </main>
  );
}
