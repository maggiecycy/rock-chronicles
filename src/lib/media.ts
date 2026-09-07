import { readFileSync } from "fs";
import { join } from "path";
import type { Band, EntityImage, Person } from "@/lib/types";

type MediaIndex = {
  bands: Record<string, EntityImage>;
  people: Record<string, EntityImage>;
};

let cached: MediaIndex | null = null;

function loadMediaIndex(): MediaIndex {
  if (cached) return cached;
  const path = join(process.cwd(), "content/media-index.json");
  try {
    cached = JSON.parse(readFileSync(path, "utf8")) as MediaIndex;
  } catch {
    cached = { bands: {}, people: {} };
  }
  return cached;
}

export function getBandImage(slug: string): EntityImage | undefined {
  return loadMediaIndex().bands[slug];
}

export function getPersonImage(slug: string): EntityImage | undefined {
  return loadMediaIndex().people[slug];
}

export function withBandImage(band: Band): Band {
  const image = getBandImage(band.slug);
  return image ? { ...band, image } : band;
}

export function withPersonImage(person: Person): Person {
  const image = getPersonImage(person.slug);
  return image ? { ...person, image } : person;
}
