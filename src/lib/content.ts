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
  getHubPeopleFromJson,
  getLiveFromJson,
  getPeopleForBandFromJson,
  getPersonFromJson,
  getSharedMemberEdgesFromJson,
  getTropeFromJson,
} from "@/lib/content-json";

export async function getAllEras(): Promise<Era[]> {
  return getAllErasFromJson();
}

export async function getEra(slug: string): Promise<Era | undefined> {
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
  return getAllGenresFromJson();
}

export async function getGenre(slug: string): Promise<Genre | undefined> {
  return getGenreFromJson(slug);
}

export async function getGenreLinks(): Promise<GenreLink[]> {
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
  return getAllPeopleFromJson();
}

export async function getPerson(slug: string): Promise<Person | undefined> {
  return getPersonFromJson(slug);
}

export async function getHubPeople(): Promise<Person[]> {
  return getHubPeopleFromJson();
}

export async function getPeopleForBand(bandSlug: string): Promise<Person[]> {
  return getPeopleForBandFromJson(bandSlug);
}

export async function getAllGuides(): Promise<GuideArticle[]> {
  return getAllGuidesFromJson();
}

export async function getGuide(
  slug: string,
): Promise<GuideArticle | undefined> {
  return getGuideFromJson(slug);
}

export async function getAllTropes(): Promise<Trope[]> {
  return getAllTropesFromJson();
}

export async function getTrope(slug: string): Promise<Trope | undefined> {
  return getTropeFromJson(slug);
}

export async function getAllLives(): Promise<LiveEvent[]> {
  return getAllLivesFromJson();
}

export async function getLive(slug: string): Promise<LiveEvent | undefined> {
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
