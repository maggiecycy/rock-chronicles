/**
 * Remap band eras to the unified taxonomy (split punk/metal & grunge/britpop).
 *   node scripts/remap-eras.mjs
 */
import { readdirSync, readFileSync, writeFileSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BANDS = join(ROOT, "content/bands");

const PUNK_POST = new Set([
  "sex-pistols",
  "ramones",
  "the-clash",
  "joy-division",
  "new-order",
  "the-cure",
  "the-smiths",
  "talking-heads",
  "the-police",
  "pixies",
  "sonic-youth",
  "depeche-mode",
]);

const METAL_80 = new Set([
  "metallica",
  "guns-n-roses",
  "iron-maiden",
  "judas-priest",
  "motorhead",
  "van-halen",
  "slayer",
  "megadeth",
  "pantera",
]);

const BRITPOP = new Set([
  "oasis",
  "blur",
  "pulp",
  "suede",
  "the-verve",
  "the-stone-roses",
  "the-libertines",
  "arctic-monkeys",
]);

const GRUNGE_ALT = new Set([
  "nirvana",
  "pearl-jam",
  "soundgarden",
  "alice-in-chains",
  "radiohead",
  "rage-against-the-machine",
  "red-hot-chili-peppers",
  "foo-fighters",
  "nine-inch-nails",
  "smashing-pumpkins",
  "tool",
  "slowdive",
  "my-bloody-valentine",
]);

function remapEra(slug, current) {
  if (current === "1980s-punk-metal") {
    if (METAL_80.has(slug)) return "1980s-metal";
    if (PUNK_POST.has(slug)) return "punk-postpunk";
    if (GRUNGE_ALT.has(slug)) return "1990s-grunge-alt";
    return "punk-postpunk";
  }
  if (current === "1990s-grunge-britpop") {
    if (BRITPOP.has(slug)) return "1990s-britpop";
    if (METAL_80.has(slug)) return "1980s-metal";
    return "1990s-grunge-alt";
  }
  return current;
}

function remapAlso(slug, list = []) {
  return [
    ...new Set(
      list.map((e) => {
        if (e === "1980s-punk-metal") {
          if (METAL_80.has(slug) || slug === "black-sabbath" || slug === "ac-dc") {
            return "1980s-metal";
          }
          return "punk-postpunk";
        }
        if (e === "1990s-grunge-britpop") {
          if (BRITPOP.has(slug)) return "1990s-britpop";
          return "1990s-grunge-alt";
        }
        return e;
      }),
    ),
  ];
}

let changed = 0;
for (const file of readdirSync(BANDS).filter((f) => f.endsWith(".json"))) {
  const path = join(BANDS, file);
  const band = JSON.parse(readFileSync(path, "utf8"));
  const nextPrimary = remapEra(band.slug, band.primaryEra);
  const nextAlso = remapAlso(band.slug, band.alsoAppearsIn);
  if (
    nextPrimary !== band.primaryEra ||
    JSON.stringify(nextAlso) !== JSON.stringify(band.alsoAppearsIn ?? [])
  ) {
    band.primaryEra = nextPrimary;
    if (nextAlso.length) band.alsoAppearsIn = nextAlso;
    else delete band.alsoAppearsIn;
    writeFileSync(path, JSON.stringify(band, null, 2) + "\n");
    changed++;
    console.log(`${band.slug}: ${nextPrimary}`);
  }
}

// Drop obsolete merged era files
for (const obsolete of ["1980s-punk-metal.json", "1990s-grunge-britpop.json"]) {
  const p = join(ROOT, "content/eras", obsolete);
  try {
    unlinkSync(p);
    console.log("removed", obsolete);
  } catch {
    /* missing */
  }
}

console.log(`Done. updated=${changed}`);
