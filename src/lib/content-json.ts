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

export function getAllErasFromJson(): Era[] {
  return readJsonDir<Era>("eras").sort((a, b) => a.order - b.order);
}

export function getEraFromJson(slug: string): Era | undefined {
  return getAllErasFromJson().find((e) => e.slug === slug);
}

export function getAllBandsFromJson(): Band[] {
  return readJsonDir<Band>("bands").sort((a, b) => a.formed - b.formed);
}

export function getBandFromJson(slug: string): Band | undefined {
  return getAllBandsFromJson().find((b) => b.slug === slug);
}

export function getAllGenresFromJson(): Genre[] {
  return readJsonDir<Genre>("genres").sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getGenreFromJson(slug: string): Genre | undefined {
  return getAllGenresFromJson().find((g) => g.slug === slug);
}

export function getGenreLinksFromJson(): GenreLink[] {
  const file = path.join(contentRoot, "graph", "genre-links.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8")) as GenreLink[];
}

export function getAllPeopleFromJson(): Person[] {
  return readJsonDir<Person>("people").sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getPersonFromJson(slug: string): Person | undefined {
  return getAllPeopleFromJson().find((p) => p.slug === slug);
}

export function getHubPeopleFromJson(): Person[] {
  return getAllPeopleFromJson()
    .filter((p) => p.hub)
    .sort(
      (a, b) =>
        (a.born ?? 9999) - (b.born ?? 9999) || a.name.localeCompare(b.name),
    );
}

export function getPeopleForBandFromJson(bandSlug: string): Person[] {
  return getAllPeopleFromJson().filter((p) =>
    p.tenures.some((t) => t.bandSlug === bandSlug),
  );
}

export function getAllGuidesFromJson(): GuideArticle[] {
  return readJsonDir<GuideArticle>("guide").sort((a, b) => a.order - b.order);
}

export function getGuideFromJson(slug: string): GuideArticle | undefined {
  return getAllGuidesFromJson().find((g) => g.slug === slug);
}

export function getAllTropesFromJson(): Trope[] {
  return readJsonDir<Trope>("tropes").sort((a, b) =>
    (typeof a.title === "string" ? a.title : a.title.en).localeCompare(
      typeof b.title === "string" ? b.title : b.title.en,
    ),
  );
}

export function getTropeFromJson(slug: string): Trope | undefined {
  return getAllTropesFromJson().find((t) => t.slug === slug);
}

export function getAllLivesFromJson(): LiveEvent[] {
  return readJsonDir<LiveEvent>("lives").sort((a, b) => a.year - b.year);
}

export function getLiveFromJson(slug: string): LiveEvent | undefined {
  return getAllLivesFromJson().find((l) => l.slug === slug);
}

export function getSharedMemberEdgesFromJson(
  bands: Band[],
  people: Person[],
): SharedMemberEdge[] {
  const bandSet = new Set(bands.map((b) => b.slug));
  /** personSlug → band slugs from Person.tenures AND Band.members.personSlug */
  const bandsByPerson = new Map<string, Set<string>>();

  const add = (personSlug: string, bandSlug: string) => {
    if (!bandSet.has(bandSlug)) return;
    let set = bandsByPerson.get(personSlug);
    if (!set) {
      set = new Set();
      bandsByPerson.set(personSlug, set);
    }
    set.add(bandSlug);
  };

  for (const person of people) {
    for (const t of person.tenures) {
      if (t.bandSlug) add(person.slug, t.bandSlug);
    }
  }
  for (const band of bands) {
    for (const m of band.members ?? []) {
      if (m.personSlug) add(m.personSlug, band.slug);
    }
  }

  const personName = new Map(people.map((p) => [p.slug, p.name]));
  const edges: SharedMemberEdge[] = [];
  const seen = new Set<string>();

  for (const [personSlug, bandSlugsSet] of bandsByPerson) {
    const bandSlugs = [...bandSlugsSet];
    if (bandSlugs.length < 2) continue;
    const name = personName.get(personSlug) ?? personSlug;
    for (let i = 0; i < bandSlugs.length; i++) {
      for (let j = i + 1; j < bandSlugs.length; j++) {
        const a = bandSlugs[i];
        const b = bandSlugs[j];
        const key = [a, b].sort().join("|") + "|" + personSlug;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push({
          personSlug,
          personName: name,
          bandA: a,
          bandB: b,
        });
      }
    }
  }
  return edges;
}
