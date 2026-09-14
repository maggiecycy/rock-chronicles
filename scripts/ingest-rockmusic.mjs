/**
 * Scan ~/Downloads/RockMusic (or AUDIO_SOURCE), match content/bands,
 * skip junk, optionally ffmpeg-transcode, write content/audio-index.json.
 *
 * Usage:
 *   node scripts/ingest-rockmusic.mjs
 *   node scripts/ingest-rockmusic.mjs --transcode
 *   AUDIO_SOURCE=/path node scripts/ingest-rockmusic.mjs --transcode --copy-public
 *
 * Env:
 *   NEXT_PUBLIC_AUDIO_CDN  — if set, track.src uses `${CDN}/${id}.mp3`
 *   otherwise src is `/audio/${id}.mp3` (serve from public/audio or CDN rewrite)
 */
import fs from "fs";
import path from "path";
import { execFileSync, spawnSync } from "child_process";
import { createHash } from "crypto";

const root = process.cwd();
const sourceDir =
  process.env.AUDIO_SOURCE ||
  path.join(process.env.HOME || "", "Downloads", "RockMusic");
const distDir = path.join(root, "audio-dist");
const publicAudio = path.join(root, "public", "audio");
const indexPath = path.join(root, "content", "audio-index.json");
const reportPath = path.join(root, "content", "audio-ingest-report.json");
const cdn = (process.env.NEXT_PUBLIC_AUDIO_CDN || "").replace(/\/$/, "");

const doTranscode = process.argv.includes("--transcode");
const copyPublic = process.argv.includes("--copy-public");

const SKIP_PATTERNS = [
  /full album/i,
  /classic rock songs/i,
  /^dl_/i,
  /70s 80s 90s/i,
];

/** Manual filename → band slug overrides / aliases */
const ARTIST_ALIASES = {
  acdc: "ac-dc",
  "ac/dc": "ac-dc",
  "guns n roses": "guns-n-roses",
  "guns n' roses": "guns-n-roses",
  "gunsnroses": "guns-n-roses",
  "red hot chili peppers": "red-hot-chili-peppers",
  rhcp: "red-hot-chili-peppers",
  "led zeppelin": "led-zeppelin",
  "black sabbath": "black-sabbath",
  "deep purple": "deep-purple",
  "fleetwood mac": "fleetwood-mac",
  "arctic monkeys": "arctic-monkeys",
  "tame impala": "tame-impala",
  "the beatles": "the-beatles",
  beatles: "the-beatles",
  "the clash": "the-clash",
  "the cure": "the-cure",
  "the doors": "the-doors",
  "the police": "the-police",
  "the who": "the-who",
  "the strokes": "the-strokes",
  "the beach boys": "the-beach-boys",
  "beach boys": "the-beach-boys",
  "elvis presley": "elvis-presley",
  "david bowie": "david-bowie",
  "pink floyd": "pink-floyd",
  "joy division": "joy-division",
  "new order": "new-order",
  "foo fighters": "foo-fighters",
  "nine inch nails": "nine-inch-nails",
  "rage against the machine": "rage-against-the-machine",
  "queens of the stone age": "queens-of-the-stone-age",
  "system of a down": "system-of-a-down",
  "linkin park": "linkin-park",
  "smashing pumpkins": "smashing-pumpkins",
  "the smashing pumpkins": "smashing-pumpkins",
  "sonic youth": "sonic-youth",
  "my bloody valentine": "my-bloody-valentine",
  "alice in chains": "alice-in-chains",
  "pearl jam": "pearl-jam",
  "van halen": "van-halen",
  "iron maiden": "iron-maiden",
  "judas priest": "judas-priest",
  "king crimson": "king-crimson",
  "talking heads": "talking-heads",
  "sex pistols": "sex-pistols",
  "the velvet underground": "the-velvet-underground",
  "velvet underground": "the-velvet-underground",
  "the rolling stones": "the-rolling-stones",
  "rolling stones": "the-rolling-stones",
  "the kinks": "the-kinks",
  "the yardbirds": "the-yardbirds",
  "the white stripes": "the-white-stripes",
  "white stripes": "the-white-stripes",
  "the stone roses": "the-stone-roses",
  "stone roses": "the-stone-roses",
  "the verve": "the-verve",
  "the killers": "the-killers",
  "the libertines": "the-libertines",
  "franz ferdinand": "franz-ferdinand",
  "kings of leon": "kings-of-leon",
  "them crooked vultures": "them-crooked-vultures",
  "sigur ros": "sigur-ros",
  "sigur rós": "sigur-ros",
  "godspeed you black emperor": "godspeed-you-black-emperor",
  "godspeed you! black emperor": "godspeed-you-black-emperor",
  "explosions in the sky": "explosions-in-the-sky",
  "depeche mode": "depeche-mode",
  motörhead: "motorhead",
  motorhead: "motorhead",
  maneskin: "maneskin",
  "måneskin": "maneskin",
  "dire straits": "dire-straits",
  "lynyrd skynyrd": "lynyrd-skynyrd",
  eagles: "eagles",
  aerosmith: "aerosmith",
  kiss: "kiss",
  "billy idol": "billy-idol",
  "bon jovi": "bon-jovi",
  "r.e.m.": "r-e-m",
  rem: "r-e-m",
  "the cranberries": "the-cranberries",
  cranberries: "the-cranberries",
  "green day": "green-day",
  "fall out boy": "fall-out-boy",
  "bring me the horizon": "bring-me-the-horizon",
};

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function loadBands() {
  const dir = path.join(root, "content", "bands");
  const bands = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
  const bySlug = new Map(bands.map((b) => [b.slug, b]));
  const byName = new Map();
  for (const b of bands) {
    byName.set(b.name.toLowerCase(), b);
    byName.set(b.slug.replace(/-/g, " "), b);
  }
  return { bands, bySlug, byName };
}

function cleanSuffixes(name) {
  return name
    .replace(/\.mp3$/i, "")
    .replace(/\.m4a$/i, "")
    .replace(/\.Mp3$/i, "")
    .replace(/\s*\((Official|Lyrics|Audio|Lyric Video|Music Video|Remastered[^)]*|HD|Video Version|Album Version|Single[^)]*|cover|Trim)[^)]*\)/gi, "")
    .replace(/\s*\[(Official|Lyrics|HD|ezmp3[^\]]*|Remastered[^\]]*)[^\]]*\]/gi, "")
    .replace(/\s*[-–—]\s*(Lyrics|Official Audio|Official Music Video).*$/i, "")
    .replace(/\s+\d{2,3}\s*Kbps.*$/i, "")
    .replace(/\s*\(mp3j\.cc\)/gi, "")
    .replace(/\s*\[?\s*ezmp3\.cc\s*\]?/gi, "")
    .replace(/\s*\(320[^)]*\)/gi, "")
    .replace(/\s*-\s*Chartsmania.*$/i, "")
    .replace(/\s*\(New Sound Remastered\)/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Parse "Artist - Title" or "Title - Artist" (when right side is a known act).
 */
function parseFilename(file, knownArtists) {
  let base = cleanSuffixes(path.basename(file));
  base = base.replace(/^\s*-\s*/, "").replace(/^[\d.\s_-]+/, "").trim();

  // "A ~ B" covers
  const tilde = base.match(/^(.+?)\s*[~～]\s*(.+?)(?:\s*\(cover\))?$/i);
  if (tilde) {
    return { artist: tilde[2].trim(), title: tilde[1].trim() };
  }

  // "Artist - Title"
  const dash = base.match(/^(.+?)\s+[-–—]\s+(.+)$/);
  if (dash) {
    let left = dash[1].trim();
    let right = dash[2].trim();
    // Title - Artist when right side matches a known band/artist
    const rightKey = right.toLowerCase().replace(/^the\s+/, "");
    const leftKey = left.toLowerCase().replace(/^the\s+/, "");
    if (
      knownArtists &&
      (knownArtists.has(right.toLowerCase()) ||
        knownArtists.has(rightKey) ||
        knownArtists.has(`the ${rightKey}`)) &&
      !(
        knownArtists.has(left.toLowerCase()) ||
        knownArtists.has(leftKey) ||
        knownArtists.has(`the ${leftKey}`)
      )
    ) {
      return { artist: right, title: left };
    }
    // "(TITLE) (ARTIST)" trailing parentheses artist
    const parenArtist = right.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
    if (parenArtist && knownArtists?.has(parenArtist[2].toLowerCase())) {
      return { artist: parenArtist[2].trim(), title: parenArtist[1].trim() };
    }
    return { artist: left, title: right };
  }
  return { artist: null, title: base };
}

function resolveBand(artist, { byName, bySlug }) {
  if (!artist) return null;
  const key = artist.toLowerCase().trim();
  if (ARTIST_ALIASES[key] === null) return { extra: true };
  const alias = ARTIST_ALIASES[key];
  if (alias && bySlug.has(alias)) return { band: bySlug.get(alias), extra: false };

  if (byName.has(key)) return { band: byName.get(key), extra: false };

  // fuzzy: strip leading "the "
  const noThe = key.replace(/^the\s+/, "");
  if (byName.has(noThe) || byName.has(`the ${noThe}`)) {
    return {
      band: byName.get(noThe) || byName.get(`the ${noThe}`),
      extra: false,
    };
  }

  // slug guess
  const guess = slugify(artist);
  if (bySlug.has(guess)) return { band: bySlug.get(guess), extra: false };

  return { extra: true };
}

function shouldSkip(file, size) {
  const name = path.basename(file);
  if (SKIP_PATTERNS.some((re) => re.test(name))) return "junk_pattern";
  if (size < 400_000) return "too_small"; // ~<30s at 128k
  if (size > 40_000_000) return "too_large_likely_album";
  return null;
}

function probeDuration(file) {
  try {
    const out = execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        file,
      ],
      { encoding: "utf8" },
    );
    const n = parseFloat(out.trim());
    return Number.isFinite(n) ? Math.round(n) : null;
  } catch {
    return null;
  }
}

function transcode(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const r = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      src,
      "-vn",
      "-codec:a",
      "libmp3lame",
      "-b:a",
      "128k",
      "-ar",
      "44100",
      "-ac",
      "2",
      dest,
    ],
    { encoding: "utf8" },
  );
  if (r.status !== 0) {
    throw new Error(r.stderr?.slice(-400) || "ffmpeg failed");
  }
}

function main() {
  if (!fs.existsSync(sourceDir)) {
    console.error("Source not found:", sourceDir);
    process.exit(1);
  }

  const { bySlug, byName } = loadBands();
  const knownArtists = new Set([
    ...byName.keys(),
    ...Object.keys(ARTIST_ALIASES),
  ]);
  const files = fs
    .readdirSync(sourceDir)
    .filter((f) => /\.(mp3|m4a)$/i.test(f))
    .map((f) => path.join(sourceDir, f));

  const tracks = [];
  const skipped = [];
  const usedIds = new Set();

  for (const file of files) {
    const stat = fs.statSync(file);
    const reason = shouldSkip(file, stat.size);
    if (reason) {
      skipped.push({ file: path.basename(file), reason });
      continue;
    }

    const parsed = parseFilename(file, knownArtists);
    let artist = parsed.artist;
    let title = parsed.title;

    // Heuristic: if no artist, try known band names as prefix
    if (!artist) {
      const lower = title.toLowerCase();
      let hit = null;
      for (const [name, band] of byName) {
        if (lower.startsWith(name) && name.length > 3) {
          hit = { name, band };
          break;
        }
      }
      if (hit) {
        artist = hit.band.name;
        title = title.slice(hit.name.length).replace(/^[\s\-–—:]+/, "");
      }
    }

    const resolved = resolveBand(artist, { byName, bySlug });
    const band = resolved && !resolved.extra ? resolved.band : null;
    const extra = !band;
    const artistLabel = band?.name || artist || "Unknown";

    let idBase = slugify(
      `${band?.slug || artistLabel}-${title}`.slice(0, 100),
    );
    if (!idBase || idBase.length < 3) {
      idBase = createHash("sha1").update(file).digest("hex").slice(0, 12);
    }
    let id = idBase;
    let n = 2;
    while (usedIds.has(id)) {
      id = `${idBase}-${n++}`;
    }
    usedIds.add(id);

    const durationSec = probeDuration(file);
    if (durationSec != null && durationSec > 1200) {
      skipped.push({ file: path.basename(file), reason: "duration_over_20m" });
      usedIds.delete(id);
      continue;
    }

    const outName = `${id}.mp3`;
    const dest = path.join(distDir, outName);
    if (doTranscode) {
      process.stdout.write(`transcode ${outName}...\n`);
      try {
        transcode(file, dest);
        if (copyPublic) {
          fs.mkdirSync(publicAudio, { recursive: true });
          fs.copyFileSync(dest, path.join(publicAudio, outName));
        }
      } catch (e) {
        skipped.push({
          file: path.basename(file),
          reason: `transcode_fail: ${e.message}`,
        });
        usedIds.delete(id);
        continue;
      }
    }

    const src = cdn ? `${cdn}/${outName}` : `/audio/${outName}`;

    tracks.push({
      id,
      title: title || id,
      artistLabel,
      bandSlug: band?.slug ?? null,
      genreSlugs: band?.genres?.slice(0, 3) ?? [],
      src,
      durationSec: durationSec ?? null,
      extra,
      sourceFile: path.basename(file),
    });
  }

  tracks.sort((a, b) =>
    `${a.artistLabel} ${a.title}`.localeCompare(`${b.artistLabel} ${b.title}`),
  );

  // Curate genre picks: up to 5 non-extra tracks per genre
  const genrePicks = {};
  for (const t of tracks) {
    if (t.extra) continue;
    for (const g of t.genreSlugs) {
      if (!genrePicks[g]) genrePicks[g] = [];
      if (genrePicks[g].length < 5) genrePicks[g].push(t.id);
    }
  }

  const index = {
    version: 1,
    generatedAt: new Date().toISOString(),
    cdnBase: cdn || null,
    trackCount: tracks.length,
    tracks,
    genrePicks,
  };

  fs.mkdirSync(path.dirname(indexPath), { recursive: true });
  fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
  fs.writeFileSync(
    reportPath,
    `${JSON.stringify({ skipped, matched: tracks.filter((t) => !t.extra).length, extra: tracks.filter((t) => t.extra).length }, null, 2)}\n`,
  );

  console.log(
    `Wrote ${tracks.length} tracks (${tracks.filter((t) => !t.extra).length} band-linked, ${tracks.filter((t) => t.extra).length} extra)`,
  );
  console.log(`Skipped ${skipped.length} → ${reportPath}`);
  console.log(`Index → ${indexPath}`);
  if (!doTranscode) {
    console.log("Tip: re-run with --transcode --copy-public to encode into audio-dist/ and public/audio/");
  }
}

main();
