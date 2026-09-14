/**
 * Merge interviewQuotes / lyricQuotes / lineupVersions / landmark
 * into band JSON — fill gaps only; never shrink or overwrite filled fields.
 */
import fs from "fs";
import path from "path";
import { enrichment } from "./data/band-enrichment-batch-a.mjs";

const dir = path.join(process.cwd(), "content/bands");
const TARGET_IQ = 2;
const TARGET_LQ = 2;

function mergeQuotes(existing = [], extras = [], target) {
  const out = [...existing];
  const seen = new Set(out.map((q) => (typeof q === "string" ? q : q.text)));
  for (const q of extras) {
    if (out.length >= target) break;
    const key = typeof q === "string" ? q : q.text;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(q);
  }
  return out;
}

let updated = 0;
for (const [slug, patch] of Object.entries(enrichment)) {
  const file = path.join(dir, `${slug}.json`);
  if (!fs.existsSync(file)) {
    console.warn("missing file", slug);
    continue;
  }
  const band = JSON.parse(fs.readFileSync(file, "utf8"));
  let changed = false;

  const iq = band.interviewQuotes || [];
  if (iq.length < TARGET_IQ) {
    band.interviewQuotes = mergeQuotes(iq, patch.interviewQuotes, TARGET_IQ);
    changed = true;
  }

  const lq = band.lyricQuotes || [];
  if (lq.length < TARGET_LQ) {
    band.lyricQuotes = mergeQuotes(lq, patch.lyricQuotes, TARGET_LQ);
    changed = true;
  }

  if (!(band.lineupVersions && band.lineupVersions.length)) {
    band.lineupVersions = patch.lineupVersions;
    changed = true;
  }

  if (!band.landmark) {
    band.landmark = patch.landmark;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, `${JSON.stringify(band, null, 2)}\n`);
    updated++;
  }
}

console.log(`updated ${updated} / ${Object.keys(enrichment).length}`);
