import type { GenreLinkType, Prisma } from "@prisma/client";
import type { Genre, GenreLink, LinkType } from "@/lib/types";
import { localized } from "./localize";

export const genreDetailInclude = {
  representative: { orderBy: { sortOrder: "asc" as const } },
  pioneerBands: { orderBy: { sortOrder: "asc" as const } },
} satisfies Prisma.GenreInclude;

export type GenreDetailRecord = Prisma.GenreGetPayload<{
  include: typeof genreDetailInclude;
}>;

export function mapGenreFromDb(row: GenreDetailRecord): Genre {
  const pioneers = row.pioneerBands.map((b) => b.bandSlug);
  return {
    slug: row.slug,
    name: row.name,
    summary: localized(row.summaryEn, row.summaryZh),
    eraFocus: row.eraFocus,
    body: localized(row.bodyEn, row.bodyZh),
    representativeBands: row.representative.map((b) => b.bandSlug),
    pioneerBands: pioneers.length ? pioneers : undefined,
  };
}

function mapLinkType(type: GenreLinkType): LinkType {
  return type;
}

export function mapGenreLinkFromDb(row: {
  fromSlug: string;
  toSlug: string;
  linkType: GenreLinkType;
}): GenreLink {
  return {
    from: row.fromSlug,
    to: row.toSlug,
    type: mapLinkType(row.linkType),
  };
}
