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

export async function getAllEras(): Promise<Era[]> {
  if (useDatabase()) return getAllErasFromDb();
  return getAllErasFromJson();
}

export async function getEra(slug: string): Promise<Era | undefined> {
  if (useDatabase()) return getEraFromDb(slug);
  return getEraFromJson(slug);
}

export async function getAllBands(): Promise<Band[]> {
  if (useDatabase()) return getAllBandsFromDb();
  return getAllBandsFromJson();
}

export async function getBand(slug: string): Promise<Band | undefined> {
  if (useDatabase()) return getBandFromDb(slug);
  return getBandFromJson(slug);
}

export async function getBandsByEra(eraSlug: string): Promise<Band[]> {
  const bands = await getAllBands();
  return bands.filter(
    (b) =>
      b.primaryEra === eraSlug || b.alsoAppearsIn?.includes(eraSlug),
  );
}

export async function getAllGenres(): Promise<Genre[]> {
  if (useDatabase()) return getAllGenresFromDb();
  return getAllGenresFromJson();
}

export async function getGenre(slug: string): Promise<Genre | undefined> {
  if (useDatabase()) return getGenreFromDb(slug);
  return getGenreFromJson(slug);
}

export async function getGenreLinks(): Promise<GenreLink[]> {
  if (useDatabase()) return getGenreLinksFromDb();
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
  if (useDatabase()) return getAllPeopleFromDb();
  return getAllPeopleFromJson();
}

export async function getPerson(slug: string): Promise<Person | undefined> {
  if (useDatabase()) return getPersonFromDb(slug);
  return getPersonFromJson(slug);
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

export async function getAllGuides(): Promise<GuideArticle[]> {
  if (useDatabase()) return getAllGuidesFromDb();
  return getAllGuidesFromJson();
}

export async function getGuide(
  slug: string,
): Promise<GuideArticle | undefined> {
  if (useDatabase()) return getGuideFromDb(slug);
  return getGuideFromJson(slug);
}

export async function getAllTropes(): Promise<Trope[]> {
  if (useDatabase()) {
    const tropes = await getAllTropesFromDb();
    return tropes.sort((a, b) =>
      (typeof a.title === "string" ? a.title : a.title.en).localeCompare(
        typeof b.title === "string" ? b.title : b.title.en,
      ),
    );
  }
  return getAllTropesFromJson();
}

export async function getTrope(slug: string): Promise<Trope | undefined> {
  if (useDatabase()) return getTropeFromDb(slug);
  return getTropeFromJson(slug);
}

export async function getAllLives(): Promise<LiveEvent[]> {
  if (useDatabase()) return getAllLivesFromDb();
  return getAllLivesFromJson();
}

export async function getLive(slug: string): Promise<LiveEvent | undefined> {
  if (useDatabase()) return getLiveFromDb(slug);
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
