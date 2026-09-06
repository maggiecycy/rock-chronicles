import fs from "fs";
import path from "path";
import type {
  Band,
  Era,
  Genre,
  GenreLink,
  GuideArticle,
  LiveEvent,
  Person,
  SharedMemberEdge,
  Trope,
} from "./types";

const contentRoot = path.join(process.cwd(), "content");

function readJsonDir<T>(dir: string): T[] {
  const full = path.join(contentRoot, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((f) =>
      JSON.parse(fs.readFileSync(path.join(full, f), "utf8")) as T,
    );
}

export function getAllEras(): Era[] {
  return readJsonDir<Era>("eras").sort((a, b) => a.order - b.order);
}

export function getEra(slug: string): Era | undefined {
  return getAllEras().find((e) => e.slug === slug);
}

export function getAllBands(): Band[] {
  return readJsonDir<Band>("bands").sort((a, b) => a.formed - b.formed);
}

export function getBand(slug: string): Band | undefined {
  return getAllBands().find((b) => b.slug === slug);
}

export function getBandsByEra(eraSlug: string): Band[] {
  return getAllBands().filter(
    (b) =>
      b.primaryEra === eraSlug || b.alsoAppearsIn?.includes(eraSlug),
  );
}

export function getAllGenres(): Genre[] {
  return readJsonDir<Genre>("genres").sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getGenre(slug: string): Genre | undefined {
  return getAllGenres().find((g) => g.slug === slug);
}

export function getGenreLinks(): GenreLink[] {
  const file = path.join(contentRoot, "graph", "genre-links.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")) as GenreLink[];
}

export function getBandsByGenre(genreSlug: string): Band[] {
  return getAllBands().filter((b) => b.genres.includes(genreSlug));
}

export function resolveBandNames(slugs: string[]): Band[] {
  const map = new Map(getAllBands().map((b) => [b.slug, b]));
  return slugs.map((s) => map.get(s)).filter(Boolean) as Band[];
}

export function getDecisiveBands(): Band[] {
  return getAllBands()
    .filter((b) => b.decisive)
    .sort((a, b) => a.formed - b.formed || a.name.localeCompare(b.name));
}

export function getAllPeople(): Person[] {
  return readJsonDir<Person>("people").sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getPerson(slug: string): Person | undefined {
  return getAllPeople().find((p) => p.slug === slug);
}

export function getHubPeople(): Person[] {
  return getAllPeople()
    .filter((p) => p.hub)
    .sort(
      (a, b) =>
        (a.born ?? 9999) - (b.born ?? 9999) || a.name.localeCompare(b.name),
    );
}

export function getPeopleForBand(bandSlug: string): Person[] {
  return getAllPeople().filter((p) =>
    p.tenures.some((t) => t.bandSlug === bandSlug),
  );
}

export function getAllGuides(): GuideArticle[] {
  return readJsonDir<GuideArticle>("guide").sort((a, b) => a.order - b.order);
}

export function getGuide(slug: string): GuideArticle | undefined {
  return getAllGuides().find((g) => g.slug === slug);
}

export function getAllTropes(): Trope[] {
  return readJsonDir<Trope>("tropes").sort((a, b) =>
    (typeof a.title === "string" ? a.title : a.title.en).localeCompare(
      typeof b.title === "string" ? b.title : b.title.en,
    ),
  );
}

export function getTrope(slug: string): Trope | undefined {
  return getAllTropes().find((t) => t.slug === slug);
}

export function getAllLives(): LiveEvent[] {
  return readJsonDir<LiveEvent>("lives").sort((a, b) => a.year - b.year);
}

export function getLive(slug: string): LiveEvent | undefined {
  return getAllLives().find((l) => l.slug === slug);
}

export function getBandsWithLandmarks(): Band[] {
  return getAllBands().filter((b) => b.landmark);
}

/** Undirected shared-member edges between bands that exist in the chronicle. */
export function getSharedMemberEdges(): SharedMemberEdge[] {
  const bandSet = new Set(getAllBands().map((b) => b.slug));
  const edges: SharedMemberEdge[] = [];
  const seen = new Set<string>();

  for (const person of getAllPeople()) {
    const bandSlugs = [
      ...new Set(
        person.tenures
          .map((t) => t.bandSlug)
          .filter((s): s is string => Boolean(s) && bandSet.has(s!)),
      ),
    ];
    for (let i = 0; i < bandSlugs.length; i++) {
      for (let j = i + 1; j < bandSlugs.length; j++) {
        const a = bandSlugs[i];
        const b = bandSlugs[j];
        const key = [a, b].sort().join("|") + "|" + person.slug;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push({
          personSlug: person.slug,
          personName: person.name,
          bandA: a,
          bandB: b,
        });
      }
    }
  }
  return edges;
}
