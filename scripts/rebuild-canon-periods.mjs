/**
 * Rebuild canon.periods from content/eras + band pages + previous canon roles/signatures.
 * Single source of truth: band.primaryEra === canon period.eraSlug
 *
 *   node scripts/rebuild-canon-periods.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const canonPath = join(ROOT, "content/canon/hundred-bands.json");
const canon = JSON.parse(readFileSync(canonPath, "utf8"));

const eras = readdirSync(join(ROOT, "content/eras"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(ROOT, "content/eras", f), "utf8")))
  .sort((a, b) => a.order - b.order);

const bands = readdirSync(join(ROOT, "content/bands"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(ROOT, "content/bands", f), "utf8")));

/** Preserve role/signature from old canon when present */
const oldBySlug = new Map();
for (const p of canon.periods || []) {
  for (const b of p.bands || []) oldBySlug.set(b.slug, b);
}

canon.intro = {
  en: "Timeline eras and this canon now share one taxonomy. Genres (punk, metal, grunge…) are sound tags; eras are chronological story buckets. Punk is not filed with thrash; Britpop is not filed with Seattle.",
  zh: "时间轴 eras 与本名单现已共用同一套分期。流派（punk、metal、grunge…）是声音标签；年代是叙事时间桶。朋克不再和鞭金塞一格；Britpop 不再和西雅图塞一格。",
};

canon.selectionPrinciples = {
  en: [
    "Eras = when an act decisively changed the map (not only formation year).",
    "Genres = sonic family tags; one band can wear several.",
    "Punk/post-punk and metal are separate eras—even when years overlap.",
    "Grunge/US alternative and Britpop are separate eras—parallel 1990s, different arguments.",
    "Prefer lineage over sales; expand toward ~100 without pretending coverage is complete.",
  ],
  zh: [
    "年代 = 该乐队决定性改写地图的时刻（不只是成立年份）。",
    "流派 = 声音家族标签；一支乐队可以挂多个。",
    "朋克/后朋与金属分属不同年代——即使年份重叠。",
    "Grunge/美替代与 Britpop 分属不同年代——并行的 1990s，不同的争论。",
    "重谱系轻销量；朝约 100 支扩展，但不假装已经穷尽。",
  ],
};

canon.periods = eras.map((era) => {
  const members = bands
    .filter((b) => b.primaryEra === era.slug)
    .sort((a, b) => a.formed - b.formed || a.name.localeCompare(b.name));

  return {
    id: era.slug,
    order: era.order,
    eraSlug: era.slug,
    name: era.name,
    years: era.years,
    summary: era.summary,
    bands: members.map((b) => {
      const prev = oldBySlug.get(b.slug);
      const track = b.essentialTracks?.[0];
      return {
        slug: b.slug,
        name: b.name,
        formed: b.formed,
        origin: b.origin,
        primaryEra: b.primaryEra,
        genres: b.genres,
        signature: prev?.signature ||
          (track
            ? { title: track.title, year: track.year }
            : { title: b.name, year: b.formed }),
        role: prev?.role || b.whyMatters || b.shortBio,
      };
    }),
  };
});

// Drop legacy multi-eraSlugs field usage by rewriting file
writeFileSync(canonPath, JSON.stringify(canon, null, 2) + "\n");
console.log(
  "periods",
  canon.periods.map((p) => `${p.order}:${p.eraSlug}(${p.bands.length})`).join(" | "),
);
