import { prisma } from "@/lib/db";
import type { Era } from "@/lib/types";
import { eraDetailInclude, mapEraFromDb } from "./map-era";

export async function getAllErasFromDb(): Promise<Era[]> {
  const rows = await prisma.era.findMany({
    include: eraDetailInclude,
    orderBy: { sortOrder: "asc" },
  });
  return rows.map(mapEraFromDb);
}

export async function getEraFromDb(slug: string): Promise<Era | undefined> {
  const row = await prisma.era.findUnique({
    where: { slug },
    include: eraDetailInclude,
  });
  return row ? mapEraFromDb(row) : undefined;
}
