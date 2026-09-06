import { prisma } from "@/lib/db";
import type { Band } from "@/lib/types";
import { bandDetailInclude, mapBandFromDb } from "./map-band";

export async function getAllBandsFromDb(): Promise<Band[]> {
  const rows = await prisma.band.findMany({
    include: bandDetailInclude,
    orderBy: { formed: "asc" },
  });
  return rows.map(mapBandFromDb);
}

export async function getBandFromDb(slug: string): Promise<Band | undefined> {
  const row = await prisma.band.findUnique({
    where: { slug },
    include: bandDetailInclude,
  });
  return row ? mapBandFromDb(row) : undefined;
}
