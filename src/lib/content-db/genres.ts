import { prisma } from "@/lib/db";
import type { Genre, GenreLink } from "@/lib/types";
import {
  genreDetailInclude,
  mapGenreFromDb,
  mapGenreLinkFromDb,
} from "./map-genre";

export async function getAllGenresFromDb(): Promise<Genre[]> {
  const rows = await prisma.genre.findMany({
    include: genreDetailInclude,
    orderBy: { name: "asc" },
  });
  return rows.map(mapGenreFromDb);
}

export async function getGenreFromDb(
  slug: string,
): Promise<Genre | undefined> {
  const row = await prisma.genre.findUnique({
    where: { slug },
    include: genreDetailInclude,
  });
  return row ? mapGenreFromDb(row) : undefined;
}

export async function getGenreLinksFromDb(): Promise<GenreLink[]> {
  const rows = await prisma.genreLink.findMany();
  return rows.map(mapGenreLinkFromDb);
}
