/**
 * Upload audio-dist/*.mp3 to Vercel Blob and rewrite content/audio-index.json src URLs.
 *
 * Requires: BLOB_READ_WRITE_TOKEN in env (Vercel → Storage → Blob)
 *   npm i -D @vercel/blob   # once
 *   node --env-file=.env.local scripts/upload-audio-blob.mjs
 *
 * After upload, set NEXT_PUBLIC_AUDIO_CDN to the blob store public prefix
 * (script prints suggested value) or leave src absolute URLs in the index.
 */
import fs from "fs";
import path from "path";

const root = process.cwd();
const distDir = path.join(root, "audio-dist");
const indexPath = path.join(root, "content", "audio-index.json");

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("Missing BLOB_READ_WRITE_TOKEN");
    process.exit(1);
  }

  let put;
  try {
    ({ put } = await import("@vercel/blob"));
  } catch {
    console.error("Install @vercel/blob first: npm i -D @vercel/blob");
    process.exit(1);
  }

  if (!fs.existsSync(distDir)) {
    console.error("No audio-dist/. Run: node scripts/ingest-rockmusic.mjs --transcode");
    process.exit(1);
  }

  const files = fs.readdirSync(distDir).filter((f) => f.endsWith(".mp3"));
  const urlByFile = {};
  let i = 0;
  for (const file of files) {
    i += 1;
    const body = fs.readFileSync(path.join(distDir, file));
    process.stdout.write(`[${i}/${files.length}] ${file}\n`);
    const blob = await put(`audio/${file}`, body, {
      access: "public",
      contentType: "audio/mpeg",
      token,
      allowOverwrite: true,
    });
    urlByFile[file] = blob.url;
  }

  const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
  for (const t of index.tracks) {
    const file = `${t.id}.mp3`;
    if (urlByFile[file]) t.src = urlByFile[file];
  }
  // Derive CDN base from first URL (strip filename)
  const sample = Object.values(urlByFile)[0];
  if (sample) {
    index.cdnBase = sample.replace(/\/[^/]+$/, "");
  }
  fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
  console.log("Updated", indexPath);
  console.log(
    "Optional .env.local: NEXT_PUBLIC_AUDIO_CDN=",
    index.cdnBase || "(absolute src already set)",
  );
}

main().catch((e) => {
  const msg = String(e?.message || e);
  if (/private store|public access/i.test(msg)) {
    console.error(`
Upload failed: this Blob store is PRIVATE, but the player needs PUBLIC URLs.

Fix (pick one):
  1. Vercel → Storage → Create a new Blob store with Access = Public
  2. Or open the existing store settings and switch it to Public (if offered)
  3. Copy the new store's BLOB_READ_WRITE_TOKEN into .env.local
     (remove any placeholder like vercel_blob_rw_xxxx)
  4. npm run audio:upload
`);
  }
  console.error(msg);
  process.exit(1);
});
