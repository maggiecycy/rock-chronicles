import { loc, type Locale } from "@/i18n/config";
import {
  getAllBands,
  getAllEras,
  getAllGenres,
  getAllGuides,
  getAllLives,
  getAllPeople,
  getAllTropes,
} from "@/lib/content";

export type SearchKind =
  | "band"
  | "person"
  | "genre"
  | "era"
  | "guide"
  | "trope"
  | "live";

export type SearchHit = {
  kind: SearchKind;
  href: string;
  title: string;
  blurb: string;
  slug: string;
};

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFKD").replace(/\s+/g, " ").trim();
}

function matches(haystack: string, needle: string): boolean {
  if (!needle) return false;
  const h = normalize(haystack);
  const tokens = normalize(needle).split(" ").filter(Boolean);
  return tokens.every((t) => h.includes(t));
}

export async function searchSite(
  query: string,
  locale: Locale,
  limit = 24,
): Promise<SearchHit[]> {
  const q = query.trim();
  if (!q) return [];

  const [bands, people, genres, eras, guides, tropes, lives] =
    await Promise.all([
      getAllBands(),
      getAllPeople(),
      getAllGenres(),
      getAllEras(),
      getAllGuides(),
      getAllTropes(),
      getAllLives(),
    ]);

  const hits: SearchHit[] = [];

  for (const b of bands) {
    const title = b.name;
    const blurb = loc(b.shortBio, locale);
    if (matches(`${title} ${b.slug} ${blurb} ${b.origin}`, q)) {
      hits.push({
        kind: "band",
        href: `/bands/${b.slug}`,
        title,
        blurb,
        slug: b.slug,
      });
    }
  }

  for (const p of people) {
    const title = p.name;
    const blurb = loc(p.shortBio, locale);
    if (matches(`${title} ${p.slug} ${blurb} ${p.origin} ${p.roles.join(" ")}`, q)) {
      hits.push({
        kind: "person",
        href: `/people/${p.slug}`,
        title,
        blurb,
        slug: p.slug,
      });
    }
  }

  for (const g of genres) {
    const title = g.name;
    const blurb = loc(g.summary, locale);
    if (matches(`${title} ${g.slug} ${blurb}`, q)) {
      hits.push({
        kind: "genre",
        href: `/genres/${g.slug}`,
        title,
        blurb,
        slug: g.slug,
      });
    }
  }

  for (const e of eras) {
    const title = loc(e.name, locale);
    const blurb = loc(e.summary, locale);
    if (matches(`${title} ${e.slug} ${e.decade} ${e.years} ${blurb}`, q)) {
      hits.push({
        kind: "era",
        href: `/eras/${e.slug}`,
        title,
        blurb,
        slug: e.slug,
      });
    }
  }

  for (const g of guides) {
    const title = loc(g.title, locale);
    const blurb = loc(g.summary, locale);
    if (matches(`${title} ${g.slug} ${blurb}`, q)) {
      hits.push({
        kind: "guide",
        href: `/guide/${g.slug}`,
        title,
        blurb,
        slug: g.slug,
      });
    }
  }

  for (const tr of tropes) {
    const title = loc(tr.title, locale);
    const blurb = loc(tr.summary, locale);
    if (matches(`${title} ${tr.slug} ${blurb}`, q)) {
      hits.push({
        kind: "trope",
        href: `/tropes#${tr.slug}`,
        title,
        blurb,
        slug: tr.slug,
      });
    }
  }

  for (const live of lives) {
    const title = loc(live.title, locale);
    const blurb = loc(live.summary, locale);
    if (matches(`${title} ${live.slug} ${live.year} ${blurb}`, q)) {
      hits.push({
        kind: "live",
        href: `/lives#${live.slug}`,
        title,
        blurb,
        slug: live.slug,
      });
    }
  }

  const kindOrder: Record<SearchKind, number> = {
    band: 0,
    person: 1,
    genre: 2,
    era: 3,
    guide: 4,
    trope: 5,
    live: 6,
  };

  hits.sort((a, b) => {
    const byKind = kindOrder[a.kind] - kindOrder[b.kind];
    if (byKind !== 0) return byKind;
    return a.title.localeCompare(b.title);
  });

  return hits.slice(0, limit);
}
