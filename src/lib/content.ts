import { useDatabase } from "@/lib/db";
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
} from "@/lib/types";
import { getAllBandsFromDb, getBandFromDb } from "@/lib/content-db/bands";
import { getAllErasFromDb, getEraFromDb } from "@/lib/content-db/eras";
import {
  getAllGenresFromDb,
  getGenreFromDb,
  getGenreLinksFromDb,
} from "@/lib/content-db/genres";
import { memoAsync, memoByKeyAsync } from "@/lib/content-db/memo";
import {
  getAllGuidesFromDb,
  getAllLivesFromDb,
  getAllTropesFromDb,
  getGuideFromDb,
  getLiveFromDb,
  getTropeFromDb,
} from "@/lib/content-db/misc";
import { getAllPeopleFromDb, getPersonFromDb } from "@/lib/content-db/people";
import {
  getAllBandsFromJson,
  getAllErasFromJson,
  getAllGenresFromJson,
  getAllGuidesFromJson,
  getAllLivesFromJson,
  getAllPeopleFromJson,
  getAllTropesFromJson,
  getBandFromJson,
  getEraFromJson,
  getGenreFromJson,
  getGenreLinksFromJson,
  getGuideFromJson,
  getLiveFromJson,
  getPersonFromJson,
  getSharedMemberEdgesFromJson,
  getTropeFromJson,
} from "@/lib/content-json";
import { withBandImage, withPersonImage } from "@/lib/media";

const dbAllEras = memoAsync(getAllErasFromDb);
const dbEra = memoByKeyAsync(getEraFromDb);
const dbAllBands = memoAsync(getAllBandsFromDb);
const dbBand = memoByKeyAsync(getBandFromDb);
const dbAllGenres = memoAsync(getAllGenresFromDb);
const dbGenre = memoByKeyAsync(getGenreFromDb);
const dbGenreLinks = memoAsync(getGenreLinksFromDb);
const dbAllPeople = memoAsync(getAllPeopleFromDb);
const dbPerson = memoByKeyAsync(getPersonFromDb);
const dbAllGuides = memoAsync(getAllGuidesFromDb);
const dbGuide = memoByKeyAsync(getGuideFromDb);
const dbAllTropes = memoAsync(getAllTropesFromDb);
const dbTrope = memoByKeyAsync(getTropeFromDb);
const dbAllLives = memoAsync(getAllLivesFromDb);
const dbLive = memoByKeyAsync(getLiveFromDb);

export async function getAllEras(): Promise<Era[]> {
  if (useDatabase()) return dbAllEras();
  return getAllErasFromJson();
}

export async function getEra(slug: string): Promise<Era | undefined> {
  if (useDatabase()) return dbEra(slug);
  return getEraFromJson(slug);
}

export async function getAllBands(): Promise<Band[]> {
  const bands = useDatabase() ? await dbAllBands() : getAllBandsFromJson();
  return bands.map(withBandImage);
}

export async function getBand(slug: string): Promise<Band | undefined> {
  const band = useDatabase() ? await dbBand(slug) : getBandFromJson(slug);
  return band ? withBandImage(band) : undefined;
}

export async function getBandsByEra(eraSlug: string): Promise<Band[]> {
  const bands = await getAllBands();
  return bands.filter(
    (b) =>
      b.primaryEra === eraSlug || b.alsoAppearsIn?.includes(eraSlug),
  );
}

export async function getAllGenres(): Promise<Genre[]> {
  if (useDatabase()) return dbAllGenres();
  return getAllGenresFromJson();
}

export async function getGenre(slug: string): Promise<Genre | undefined> {
  if (useDatabase()) return dbGenre(slug);
  return getGenreFromJson(slug);
}

export async function getGenreLinks(): Promise<GenreLink[]> {
  if (useDatabase()) return dbGenreLinks();
  return getGenreLinksFromJson();
}

export async function getBandsByGenre(genreSlug: string): Promise<Band[]> {
  const bands = await getAllBands();
  return bands.filter((b) => b.genres.includes(genreSlug));
}

export async function resolveBandNames(slugs: string[]): Promise<Band[]> {
  const bands = await getAllBands();
  const map = new Map(bands.map((b) => [b.slug, b]));
  return slugs.map((s) => map.get(s)).filter(Boolean) as Band[];
}

export async function getDecisiveBands(): Promise<Band[]> {
  const bands = await getAllBands();
  return bands
    .filter((b) => b.decisive)
    .sort((a, b) => a.formed - b.formed || a.name.localeCompare(b.name));
}

export async function getAllPeople(): Promise<Person[]> {
  const people = useDatabase() ? await dbAllPeople() : getAllPeopleFromJson();
  return people.map(withPersonImage);
}

export async function getPerson(slug: string): Promise<Person | undefined> {
  const person = useDatabase() ? await dbPerson(slug) : getPersonFromJson(slug);
  return person ? withPersonImage(person) : undefined;
}

export async function getHubPeople(): Promise<Person[]> {
  const people = await getAllPeople();
  return people
    .filter((p) => p.hub)
    .sort(
      (a, b) =>
        (a.born ?? 9999) - (b.born ?? 9999) || a.name.localeCompare(b.name),
    );
}

export async function getPeopleForBand(bandSlug: string): Promise<Person[]> {
  const people = await getAllPeople();
  return people.filter((p) =>
    p.tenures.some((t) => t.bandSlug === bandSlug),
  );
}

/** In local dev, editorial JSON is source of truth (avoids stale DB memo / Aiven blips). */
function preferEditorialJson(): boolean {
  return process.env.NODE_ENV !== "production";
}

export async function getAllGuides(): Promise<GuideArticle[]> {
  if (preferEditorialJson()) return getAllGuidesFromJson();
  if (useDatabase()) {
    try {
      const rows = await dbAllGuides();
      if (rows.length > 0) return rows;
    } catch {
      /* fall through to JSON */
    }
  }
  return getAllGuidesFromJson();
}

export async function getGuide(
  slug: string,
): Promise<GuideArticle | undefined> {
  if (preferEditorialJson()) return getGuideFromJson(slug);
  if (useDatabase()) {
    try {
      const row = await dbGuide(slug);
      if (row) return row;
    } catch {
      /* fall through */
    }
  }
  return getGuideFromJson(slug);
}

export async function getAllTropes(): Promise<Trope[]> {
  if (preferEditorialJson()) return getAllTropesFromJson();
  if (useDatabase()) {
    try {
      const tropes = await dbAllTropes();
      if (tropes.length > 0) {
        return tropes.sort((a, b) =>
          (typeof a.title === "string" ? a.title : a.title.en).localeCompare(
            typeof b.title === "string" ? b.title : b.title.en,
          ),
        );
      }
    } catch {
      /* fall through */
    }
  }
  return getAllTropesFromJson();
}

export async function getTrope(slug: string): Promise<Trope | undefined> {
  if (preferEditorialJson()) return getTropeFromJson(slug);
  if (useDatabase()) {
    try {
      const row = await dbTrope(slug);
      if (row) return row;
    } catch {
      /* fall through */
    }
  }
  return getTropeFromJson(slug);
}

export async function getAllLives(): Promise<LiveEvent[]> {
  if (preferEditorialJson()) return getAllLivesFromJson();
  if (useDatabase()) {
    try {
      const rows = await dbAllLives();
      if (rows.length > 0) return rows;
    } catch {
      /* fall through */
    }
  }
  return getAllLivesFromJson();
}

export async function getLive(slug: string): Promise<LiveEvent | undefined> {
  if (preferEditorialJson()) return getLiveFromJson(slug);
  if (useDatabase()) {
    try {
      const row = await dbLive(slug);
      if (row) return row;
    } catch {
      /* fall through */
    }
  }
  return getLiveFromJson(slug);
}

export async function getBandsWithLandmarks(): Promise<Band[]> {
  const bands = await getAllBands();
  return bands.filter((b) => b.landmark);
}

export async function getSharedMemberEdges(): Promise<SharedMemberEdge[]> {
  const [bands, people] = await Promise.all([
    getAllBands(),
    getAllPeople(),
  ]);
  return getSharedMemberEdgesFromJson(bands, people);
}
