import { prisma } from "@/lib/db";
import type { GuideArticle, LiveEvent, Trope } from "@/lib/types";
import {
  guideDetailInclude,
  liveDetailInclude,
  mapGuideFromDb,
  mapLiveFromDb,
  mapTropeFromDb,
  tropeDetailInclude,
} from "./map-misc";

export async function getAllGuidesFromDb(): Promise<GuideArticle[]> {
  const rows = await prisma.guideArticle.findMany({
    include: guideDetailInclude,
    orderBy: { sortOrder: "asc" },
  });
  return rows.map(mapGuideFromDb);
}

export async function getGuideFromDb(
  slug: string,
): Promise<GuideArticle | undefined> {
  const row = await prisma.guideArticle.findUnique({
    where: { slug },
    include: guideDetailInclude,
  });
  return row ? mapGuideFromDb(row) : undefined;
}

export async function getAllTropesFromDb(): Promise<Trope[]> {
  const rows = await prisma.trope.findMany({
    include: tropeDetailInclude,
    orderBy: { slug: "asc" },
  });
  return rows.map(mapTropeFromDb);
}

export async function getTropeFromDb(
  slug: string,
): Promise<Trope | undefined> {
  const row = await prisma.trope.findUnique({
    where: { slug },
    include: tropeDetailInclude,
  });
  return row ? mapTropeFromDb(row) : undefined;
}

export async function getAllLivesFromDb(): Promise<LiveEvent[]> {
  const rows = await prisma.liveEvent.findMany({
    include: liveDetailInclude,
    orderBy: { year: "asc" },
  });
  return rows.map(mapLiveFromDb);
}

export async function getLiveFromDb(
  slug: string,
): Promise<LiveEvent | undefined> {
  const row = await prisma.liveEvent.findUnique({
    where: { slug },
    include: liveDetailInclude,
  });
  return row ? mapLiveFromDb(row) : undefined;
}
