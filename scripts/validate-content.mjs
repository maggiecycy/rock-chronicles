/**
 * Content integrity checks for Rock Chronicles JSON.
 *
 * Errors fail CI:
 *   - invalid / unreadable JSON
 *   - slug ≠ filename
 *   - personSlug with no content/people/<slug>.json
 *   - relatedBands pointing at missing band
 *   - stickyImage / media-index src missing under public/
 *
 * Warnings (non-fatal):
 *   - empty relatedBands
 *   - narrative with zero stickyImage chapters
 *   - flagship band missing any stickyImage
 *
 *   node scripts/validate-content.mjs
 *   npm run content:validate
 */
import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BANDS_DIR = join(ROOT, "content/bands");
const PEOPLE_DIR = join(ROOT, "content/people");
const MEDIA_INDEX = join(ROOT, "content/media-index.json");
const PUBLIC = join(ROOT, "public");

/** Bands that should ship with at least one chapter sticky. */
const FLAGSHIP_STICKY = [
  "nirvana",
  "joy-division",
  "tool",
  "the-white-stripes",
  "tame-impala",
  "pulp",
  "depeche-mode",
  "kings-of-leon",
  "interpol",
  "franz-ferdinand",
  "the-libertines",
  "sigur-ros",
];

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    fail(`${path}: ${e.message}`);
    return null;
  }
}

function listJson(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => join(dir, f));
}

function publicPath(src) {
  if (!src || typeof src !== "string") return null;
  if (!src.startsWith("/")) return null;
  return join(PUBLIC, src.replace(/^\//, ""));
}

function assertMediaFile(src, where) {
  const full = publicPath(src);
  if (!full) {
    fail(`${where}: invalid media src ${JSON.stringify(src)}`);
    return;
  }
  if (!existsSync(full)) {
    fail(`${where}: missing file public${src}`);
    return;
  }
  try {
    if (statSync(full).size < 100) {
      fail(`${where}: file too small public${src}`);
    }
  } catch (e) {
    fail(`${where}: cannot stat public${src} (${e.message})`);
  }
}

function collectPersonSlugs(band, bandSlug) {
  const refs = [];
  for (const m of band.members ?? []) {
    if (m.personSlug) refs.push({ slug: m.personSlug, where: `bands/${bandSlug} members` });
  }
  for (const v of band.lineupVersions ?? []) {
    for (const m of v.members ?? []) {
      if (m.personSlug) {
        refs.push({
          slug: m.personSlug,
          where: `bands/${bandSlug} lineupVersions/${v.id ?? "?"}`,
        });
      }
    }
  }
  for (const s of band.scenes ?? []) {
    // scenes list names only today; keep hook if personSlug appears later
    if (s.personSlug) {
      refs.push({ slug: s.personSlug, where: `bands/${bandSlug} scenes` });
    }
  }
  return refs;
}

const peopleFiles = listJson(PEOPLE_DIR);
const bandFiles = listJson(BANDS_DIR);
const peopleSlugs = new Set(
  peopleFiles.map((p) => p.split("/").pop().replace(/\.json$/, "")),
);
const bandSlugs = new Set(
  bandFiles.map((p) => p.split("/").pop().replace(/\.json$/, "")),
);

for (const path of peopleFiles) {
  const slug = path.split("/").pop().replace(/\.json$/, "");
  const data = readJson(path);
  if (!data) continue;
  if (data.slug && data.slug !== slug) {
    fail(`people/${slug}.json: slug field "${data.slug}" ≠ filename`);
  }
}

const mediaIndex = readJson(MEDIA_INDEX) ?? { bands: {}, people: {} };
for (const [slug, img] of Object.entries(mediaIndex.bands ?? {})) {
  if (img?.src) assertMediaFile(img.src, `media-index bands/${slug}`);
}
for (const [slug, img] of Object.entries(mediaIndex.people ?? {})) {
  if (img?.src) assertMediaFile(img.src, `media-index people/${slug}`);
}

let stickyChapterCount = 0;
let bandsWithSticky = 0;

for (const path of bandFiles) {
  const fileSlug = path.split("/").pop().replace(/\.json$/, "");
  const band = readJson(path);
  if (!band) continue;

  if (band.slug && band.slug !== fileSlug) {
    fail(`bands/${fileSlug}.json: slug field "${band.slug}" ≠ filename`);
  }
  const slug = band.slug || fileSlug;

  const related = band.relatedBands ?? [];
  if (related.length === 0) {
    warn(`bands/${slug}: relatedBands is empty`);
  }
  for (const rel of related) {
    if (!bandSlugs.has(rel)) {
      fail(`bands/${slug}: relatedBands → missing band "${rel}"`);
    }
  }

  for (const { slug: personSlug, where } of collectPersonSlugs(band, slug)) {
    if (!peopleSlugs.has(personSlug)) {
      fail(`${where}: orphan personSlug "${personSlug}"`);
    }
  }

  const memberLinked = (band.members ?? []).some((m) => m.personSlug);
  if (band.decisive && (band.members ?? []).length > 0 && !memberLinked) {
    warn(`bands/${slug}: decisive band with no member personSlug`);
  }

  const narrative = band.narrative ?? [];
  let chapterStickies = 0;
  for (const ch of narrative) {
    if (ch.stickyImage?.src) {
      chapterStickies++;
      stickyChapterCount++;
      assertMediaFile(
        ch.stickyImage.src,
        `bands/${slug} narrative/${ch.id ?? "?"} stickyImage`,
      );
    }
  }
  if (narrative.length > 0 && chapterStickies === 0) {
    warn(`bands/${slug}: narrative has no stickyImage`);
  }
  if (chapterStickies > 0) bandsWithSticky++;

  if (FLAGSHIP_STICKY.includes(slug) && chapterStickies === 0) {
    warn(`bands/${slug}: flagship missing stickyImage`);
  }
}

console.log(
  `Checked ${bandFiles.length} bands, ${peopleFiles.length} people.`,
);
console.log(
  `Sticky coverage: ${bandsWithSticky}/${bandFiles.length} bands, ${stickyChapterCount} chapters.`,
);

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  ⚠  ${w}`);
}

if (errors.length) {
  console.log(`\nErrors (${errors.length}):`);
  for (const e of errors) console.log(`  ✖  ${e}`);
  process.exit(1);
}

console.log("\nContent validation passed.");
