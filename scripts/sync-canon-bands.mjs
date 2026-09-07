/**
 * Ensure every canon band has a content/bands/<slug>.json stub.
 * Does not overwrite existing files.
 *
 *   node scripts/sync-canon-bands.mjs
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const canon = JSON.parse(
  readFileSync(join(ROOT, "content/canon/hundred-bands.json"), "utf8"),
);

const ALLOWED_GENRES = new Set(
  [
    "alternative",
    "blues",
    "britpop",
    "grunge",
    "hard-rock",
    "heavy-metal",
    "indie-rock",
    "post-punk",
    "progressive-rock",
    "psychedelic",
    "punk",
    "rock-n-roll",
  ],
);

let created = 0;
let skipped = 0;

for (const period of canon.periods) {
  for (const b of period.bands) {
    const path = join(ROOT, "content/bands", `${b.slug}.json`);
    if (existsSync(path)) {
      skipped++;
      continue;
    }

    const genres = (b.genres || []).filter((g) => ALLOWED_GENRES.has(g));
    if (genres.length === 0) genres.push("alternative");

    const stub = {
      name: b.name,
      slug: b.slug,
      formed: b.formed,
      origin: b.origin,
      primaryEra: b.primaryEra,
      genres,
      decisive: false,
      whyMatters: b.role,
      members: [],
      essentialTracks: b.signature
        ? [{ title: b.signature.title, year: b.signature.year }]
        : [],
      lyricQuotes: [],
      relatedBands: [],
      influenceFrom: [],
      influenced: [],
      shortBio: b.role,
      body: {
        en: `${b.role.en} Canon stub—full narrative queued in the 100-act framework.`,
        zh: `${b.role.zh} 名单骨架页——完整长叙事在 100 支框架中排队。`,
      },
    };

    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify(stub, null, 2) + "\n");
    created++;
    console.log("created", b.slug);
  }
}

console.log(`Done. created=${created} skipped_existing=${skipped}`);
