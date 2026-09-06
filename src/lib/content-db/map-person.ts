import type { Prisma } from "@prisma/client";
import type { Person, PersonTenure } from "@/lib/types";
import { localized, optionalLocalized, asStringArray } from "./localize";

export const personDetailInclude = {
  tenures: { orderBy: { sortOrder: "asc" as const } },
  relatedOut: true,
} satisfies Prisma.PersonInclude;

export type PersonDetailRecord = Prisma.PersonGetPayload<{
  include: typeof personDetailInclude;
}>;

function mapTenure(row: PersonDetailRecord["tenures"][number]): PersonTenure {
  const tenure: PersonTenure = {
    bandName: row.bandName,
    role: row.role,
    from: row.yearFrom,
  };
  if (row.bandSlug) tenure.bandSlug = row.bandSlug;
  if (row.present) tenure.to = "present";
  else if (row.yearTo != null) tenure.to = row.yearTo;
  const note = optionalLocalized(row.noteEn, row.noteZh);
  if (note) tenure.note = note;
  return tenure;
}

export function mapPersonFromDb(row: PersonDetailRecord): Person {
  return {
    name: row.name,
    slug: row.slug,
    born: row.born ?? undefined,
    origin: row.origin,
    roles: asStringArray(row.roles),
    hub: row.hub,
    shortBio: localized(row.shortBioEn, row.shortBioZh),
    whyHub: localized(row.whyHubEn, row.whyHubZh),
    body: localized(row.bodyEn, row.bodyZh),
    tenures: row.tenures.map(mapTenure),
    relatedPeople: row.relatedOut.length
      ? row.relatedOut.map((r) => r.toPersonSlug)
      : undefined,
  };
}
