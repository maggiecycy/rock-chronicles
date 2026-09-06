import { prisma } from "@/lib/db";
import type { Person } from "@/lib/types";
import { mapPersonFromDb, personDetailInclude } from "./map-person";

export async function getAllPeopleFromDb(): Promise<Person[]> {
  const rows = await prisma.person.findMany({
    include: personDetailInclude,
    orderBy: { name: "asc" },
  });
  return rows.map(mapPersonFromDb);
}

export async function getPersonFromDb(
  slug: string,
): Promise<Person | undefined> {
  const row = await prisma.person.findUnique({
    where: { slug },
    include: personDetailInclude,
  });
  return row ? mapPersonFromDb(row) : undefined;
}
