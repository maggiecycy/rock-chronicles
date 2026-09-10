/**
 * Download curated Commons files via Special:FilePath (fewer API calls).
 *   node scripts/fetch-commons-media.mjs
 *   node scripts/fetch-commons-media.mjs --force
 *   node scripts/fetch-commons-media.mjs --only=led-zeppelin
 */
import {
  mkdirSync,
  writeFileSync,
  existsSync,
  readFileSync,
  readdirSync,
} from "fs";
import { dirname, join, extname } from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const INDEX_PATH = join(ROOT, "content/media-index.json");
const UA = "RockChroniclesBot/0.1 (educational; local cache of Commons media)";

/**
 * file: Commons filename
 * license / credit / altEn: editorial metadata (verified from Commons pages)
 */
const CURATED = {
  bands: {
    "arctic-monkeys": {
      file: "Arctic Monkeys - Orange Stage - Roskilde Festival 2014.jpg",
      license: "CC BY-SA 2.0",
      credit: "Bill Ebbesen",
      altEn: "Arctic Monkeys on the Orange Stage at Roskilde Festival 2014",
    },
    "black-sabbath": {
      file: "Black Sabbath (1970).jpg",
      license: "Public domain",
      credit: "Warner Bros. Records press photo",
      altEn: "Black Sabbath in a 1970 promotional photograph",
    },
    "chuck-berry": {
      file: "Chuck Berry 1971.jpg",
      license: "Public domain",
      credit: "1950s Rock & Roll Revival promotional photo",
      altEn: "Chuck Berry performing in 1971",
    },
    cream: {
      file: "Cream Clapton Bruce Baker 1960s.jpg",
      license: "Public domain",
      credit: "Press photograph",
      altEn: "Cream — Clapton, Bruce and Baker, 1960s",
    },
    "elvis-presley": {
      file: "Elvis Presley - TV Radio Mirror, March 1957 01.jpg",
      license: "Public domain",
      credit: "TV Radio Mirror, March 1957",
      altEn: "Elvis Presley, mid-1950s publicity photograph",
    },
    "fontaines-dc": {
      file: "Fontaines DC at Loose Ends 2019.jpg",
      license: "CC BY-SA 4.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Fontaines D.C. performing at Loose Ends 2019",
    },
    "foo-fighters": {
      file: "Foo Fighters Live 29.jpg",
      license: "CC BY 2.0",
      credit: "Jo (Flickr)",
      altEn: "Foo Fighters performing live",
    },
    "king-crimson": {
      file: "King crimson 1974 press photo.jpg",
      license: "Public domain",
      credit: "Atlantic Records press photo",
      altEn: "King Crimson press photo, 1974 lineup",
    },
    "led-zeppelin": {
      file: "Led Zeppelin - promotional image (1971).jpg",
      license: "Public domain",
      credit: "Atlantic Records / Cash Box, 1971",
      altEn:
        "Led Zeppelin promotional photograph, 1971 — Jones, Page, Bonham, Plant",
    },
    metallica: {
      file: "Metallica 1983 press photo.jpg",
      license: "Public domain",
      credit: "Megaforce Records press photo",
      altEn: "Metallica press photo, 1983",
    },
    "new-order": {
      file: "New Order, 1985.jpg",
      license: "Public domain",
      credit: "Factory / publicity portraits for Low-Life",
      altEn: "New Order publicity portraits, 1985",
    },
    nirvana: {
      file: "Nirvana around 1992 (cropped).jpg",
      license: "CC BY-SA 2.0",
      credit: "P.B. Rage",
      altEn: "Kurt Cobain and Krist Novoselic at the 1992 MTV Video Music Awards",
    },
    oasis: {
      file: "Oasis Liam and Noel.jpg",
      license: "CC BY-SA 2.0",
      credit: "Will Fresch",
      altEn: "Liam and Noel Gallagher of Oasis, San Diego 2005",
    },
    "pink-floyd": {
      file: "Pink Floyd 1967 with Syd Barrett.jpg",
      license: "Public domain",
      credit: "Hit Parader magazine, July 1968 issue",
      altEn: "Pink Floyd with Syd Barrett, c. 1967",
    },
    "queens-of-the-stone-age": {
      file: "Queens of the Stone Age - 2023.jpg",
      license: "CC BY-SA 4.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Queens of the Stone Age, 2023",
    },
    radiohead: {
      file: "2025 Radiohead live concert at Uber Arena, Berlin 102.jpg",
      license: "CC BY-SA 4.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Radiohead live at Uber Arena, Berlin, 2025",
    },
    rainbow: {
      file: "Rainbow in performance (27 09 1977 02 500b).jpg",
      license: "CC BY-SA 4.0",
      credit: "Own work (Commons uploader)",
      altEn: "Rainbow in performance, Oslo, 1977 — Dio and Blackmore",
    },
    "tame-impala": {
      file: "Tame-impala-1350426199.jpg",
      license: "CC BY 3.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Tame Impala performing live",
    },
    "the-beatles": {
      file: "The Beatles members at New York City in 1964.jpg",
      license: "Public domain",
      credit: "United Press International",
      altEn: "The Beatles in New York City, 1964",
    },
    "the-clash": {
      file: "Clash 21051980 12 800.jpg",
      license: "CC BY-SA 4.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "The Clash performing, 21 May 1980",
    },
    "the-jimi-hendrix-experience": {
      file: "Jimi-Hendrix-1967-Helsinki-f.jpg",
      license: "Public domain",
      credit: "Press / archive photograph",
      altEn: "Jimi Hendrix in Helsinki, 1967",
    },
    "the-rolling-stones": {
      file: "Rolling Stones 1965.jpg",
      license: "Public domain",
      credit: "Publicity photograph",
      altEn: "The Rolling Stones, 1965",
    },
    "the-strokes": {
      file: "TheStrokes.jpg",
      license: "CC BY-SA 2.0",
      credit: "Matt (Flickr)",
      altEn: "The Strokes live at Stubb's, Austin, 2006",
    },
    "the-who": {
      file: "The Who circa 1967.jpg",
      license: "Public domain",
      credit: "Publicity photograph",
      altEn: "The Who, circa 1967",
    },
    "the-yardbirds": {
      file: "The Yardbirds in 1965 (true monochrome).jpg",
      license: "Public domain",
      credit: "Publicity photograph",
      altEn: "The Yardbirds in 1965",
    },
    "them-crooked-vultures": {
      file: "Them Crooked Vultures.JPG",
      license: "CC BY-SA 3.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Them Crooked Vultures",
    },
    wings: {
      file: "Paul McCartney with Linda McCartney - Wings - 1976.jpg",
      license: "CC BY-SA 2.0",
      credit: "Jim Summaria",
      altEn: "Paul and Linda McCartney with Wings, 1976",
    },
    queen: {
      file: "Queen News Of The World (1977 Press Kit Photo 01).jpg",
      license: "Public domain",
      credit: "Elektra / press kit, circa 1977",
      altEn: "Queen publicity photograph, circa 1977",
    },
    "ac-dc": {
      file: "Angus Young of AC DC at London's Olympic Stadium.jpg",
      license: "CC BY-SA 2.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Angus Young of AC/DC at London Olympic Stadium",
    },
    "sex-pistols": {
      file: "Sex Pistols in Paradiso.jpg",
      license: "CC BY-SA 3.0",
      credit: "Anefo / Nationaal Archief",
      altEn: "Sex Pistols performing at Paradiso, Amsterdam, 1977",
    },
    "the-police": {
      file: "Sting Atlanta 3.jpg",
      license: "CC BY-SA 4.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Sting with The Police at Agora Ballroom, Atlanta, 1979",
    },
    "guns-n-roses": {
      file: "GunsNRoses160617-61 (35271773841).jpg",
      license: "CC BY 2.0",
      credit: "Photographer via Flickr / Wikimedia Commons",
      altEn: "Guns N' Roses live at London Stadium, 2017",
    },
    blur: {
      file: "Provinssirock 20130614 - Blur - 22.jpg",
      license: "CC BY-SA 3.0",
      credit: "Cecil",
      altEn: "Blur live at Provinssirock, 2013",
    },
    "david-bowie": {
      file: "David Bowie - TopPop 1974 07.png",
      license: "CC BY-SA 3.0",
      credit: "AVRO / TopPop",
      altEn: "David Bowie on TopPop, 1974",
    },
    "deep-purple": {
      file: "Rockband Deep Purple in der Ostseehalle zum Auftakt ihrer Deutschlandtournee (Kiel 22.125).jpg",
      license: "CC BY-SA 3.0",
      credit: "Friedrich Magnussen / Stadtarchiv Kiel",
      altEn: "Deep Purple at Ostseehalle, Kiel, 1970",
    },
    "fleetwood-mac": {
      file: "Fleetwood Mac Rumours trade ad Billboard 1977.jpg",
      license: "Public domain",
      credit: "Warner Bros. Records / Billboard trade ad, 1977",
      altEn: "Fleetwood Mac Rumours-era publicity photograph, 1977",
    },
    "iron-maiden": {
      file: "Iron Maiden - Wacken Open Air 2016-AL1683.jpg",
      license: "CC BY-SA 4.0",
      credit: "Andreas Lawen, Fotandi",
      altEn: "Iron Maiden at Wacken Open Air, 2016",
    },
    "judas-priest": {
      file: "Judas Priest Bergen 2011.jpg",
      license: "CC BY-SA 3.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Judas Priest live in Bergen, 2011",
    },
    megadeth: {
      file: "Megadeth 1986 Promo.jpg",
      license: "Public domain",
      credit: "Capitol / Combat promo photograph, 1986",
      altEn: "Megadeth promotional photograph, 1986",
    },
    "my-bloody-valentine": {
      file: "My Bloody Valentine @ the Aragon, Chicago, 11 3 2013 (10701118285).jpg",
      license: "CC BY-SA 2.0",
      credit: "swimfinfan (Flickr)",
      altEn: "My Bloody Valentine at the Aragon, Chicago, 2013",
    },
    "pearl-jam": {
      file: "Pearl Jam 1991.jpg",
      license: "Public domain",
      credit: "Epic Records press photograph, 1991",
      altEn: "Pearl Jam, 1991",
    },
    pixies: {
      file: "Pixies live at The Anthem DC - Jun 10 2023.jpg",
      license: "CC BY-SA 4.0",
      credit: "Wp72",
      altEn: "Pixies live at The Anthem, Washington, D.C., 2023",
    },
    ramones: {
      file: "Ramones Toronto 1976.jpg",
      license: "Public domain",
      credit: "Press / archive photograph",
      altEn: "Ramones in Toronto, 1976",
    },
    rush: {
      file: "Rush band 1970s.jpg",
      license: "Public domain",
      credit: "PolyGram press photograph, circa 1981",
      altEn: "Rush promotional photograph, early 1980s",
    },
    "smashing-pumpkins": {
      file: "Pinkpop 2007 - Smashing Pumpkins.jpg",
      license: "CC BY-SA 2.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "The Smashing Pumpkins at Pinkpop, 2007",
    },
    "sonic-youth": {
      file: "Sonic Youth (1987 SST publicity photo by Monica Dee).jpg",
      license: "Public domain",
      credit: "Monica Dee / SST publicity photo, 1987",
      altEn: "Sonic Youth SST publicity photograph, 1987",
    },
    soundgarden: {
      file: "Soundgarden 2012.jpg",
      license: "CC BY-SA 2.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Soundgarden, 2012",
    },
    "talking-heads": {
      file: "Talking Heads (1977 Sire publicity photo).jpg",
      license: "Public domain",
      credit: "Sire Records publicity photograph, 1977",
      altEn: "Talking Heads publicity photograph, 1977",
    },
    "the-cure": {
      file: "The Cure Live in Singapore 2- 1st August 2007.jpg",
      license: "CC BY-SA 2.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "The Cure live in Singapore, 2007",
    },
    "the-doors": {
      file: "The Doors in Copenhagen 1968.jpg",
      license: "Public domain",
      credit: "Polfoto / Jan Persson",
      altEn: "The Doors in Copenhagen, 1968",
    },
    "the-smiths": {
      file: "The Smiths 1985.jpg",
      license: "Public domain",
      credit: "Paul Cox / Sire Records",
      altEn: "The Smiths publicity photograph, 1985",
    },
    "van-halen": {
      file: "Van Halen Lineup 1984.jpg",
      license: "Public domain",
      credit: "Warner Records promotional photograph, 1984",
      altEn: "Van Halen lineup publicity photograph, 1984",
    },
  },
  people: {
    "bernard-sumner": {
      file: "Barney2005.jpg",
      license: "Public domain",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Bernard Sumner",
    },
    "dave-grohl": {
      file: "Dave Grohl 1989.jpg",
      license: "CC BY-SA 3.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Dave Grohl, 1989",
    },
    "eric-clapton": {
      file: "Eric Clapton 1.jpg",
      license: "CC BY-SA 2.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Eric Clapton",
    },
    "jimmy-page": {
      file: "Jimmy Page early.jpg",
      license: "Public domain",
      credit: "Publicity photograph",
      altEn: "Jimmy Page, early career publicity photo",
    },
    "john-paul-jones": {
      file: "John Paul Jones - 2010.jpg",
      license: "CC BY-SA 2.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "John Paul Jones, 2010",
    },
    "josh-homme": {
      file: "Josh Homme mg 5648.jpg",
      license: "CC BY-SA 3.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Josh Homme",
    },
    "kurt-cobain": {
      file: "Nirvana around 1992 (cropped).jpg",
      license: "CC BY-SA 2.0",
      credit: "P.B. Rage",
      altEn: "Kurt Cobain at the 1992 MTV Video Music Awards",
    },
    "liam-gallagher": {
      file: "Festival des Vieilles Charrues 2018 - Liam Gallagher - 013.jpg",
      license: "CC BY-SA 4.0",
      credit: "Thesupermat",
      altEn: "Liam Gallagher at Vieilles Charrues Festival 2018",
    },
    "noel-gallagher": {
      file: "Noel Gallagher 2019.jpg",
      license: "CC BY-SA 4.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Noel Gallagher, 2019",
    },
    "ozzy-osbourne": {
      file: "Ozzy Osbourne 1973.JPG",
      license: "Public domain",
      credit: "Press photograph",
      altEn: "Ozzy Osbourne, 1973",
    },
    "paul-mccartney": {
      file: "Paul McCartney with Linda McCartney - Wings - 1976.jpg",
      license: "CC BY-SA 2.0",
      credit: "Jim Summaria",
      altEn: "Paul McCartney with Wings, 1976",
    },
    "peter-hook": {
      file: "Peter Hook.jpg",
      license: "CC BY-SA 3.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Peter Hook",
    },
    "robert-fripp": {
      file: "Robert Fripp.jpg",
      license: "CC BY-SA 2.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Robert Fripp",
    },
    "robert-plant": {
      file: "Robert Plant (2022).jpg",
      license: "CC BY-SA 4.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Robert Plant, 2022",
    },
    "ronnie-james-dio": {
      file: "Ronnie James Dio (3538742389).jpg",
      license: "CC BY-SA 2.0",
      credit: "Diego Torres",
      altEn: "Ronnie James Dio, 2009",
    },
    "thom-yorke": {
      file: "Thom Yorke.jpg",
      license: "CC BY-SA 2.0",
      credit: "Photographer via Wikimedia Commons",
      altEn: "Thom Yorke",
    },
  },
};

// Joy Division: almost no free-license band photos on Commons; leave unset.

const force = process.argv.includes("--force");
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg
  ? onlyArg.slice(7).split(",").map((s) => s.trim()).filter(Boolean)
  : null;

function sleep(sec) {
  execFileSync("sleep", [String(sec)]);
}

function download(url, dest) {
  mkdirSync(dirname(dest), { recursive: true });
  execFileSync(
    "curl",
    [
      "-4",
      "-sS",
      "-L",
      "-A",
      UA,
      "--connect-timeout",
      "40",
      "--max-time",
      "180",
      "--retry",
      "4",
      "--retry-delay",
      "5",
      "-o",
      dest,
      url,
    ],
    { stdio: "pipe" },
  );
}

function filePathUrl(filename) {
  const enc = encodeURIComponent(filename.replace(/ /g, "_"));
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${enc}?width=1600`;
}

function sourceUrl(filename) {
  return `https://commons.wikimedia.org/wiki/File:${filename.replace(/ /g, "_")}`;
}

function loadIndex() {
  if (!existsSync(INDEX_PATH)) return { bands: {}, people: {} };
  return JSON.parse(readFileSync(INDEX_PATH, "utf8"));
}

function slugLabel(slug) {
  return slug
    .split("-")
    .map((w) => (w === "dc" ? "DC" : w[0].toUpperCase() + w.slice(1)))
    .join(" ");
}

function processKind(kind) {
  const dir = join(ROOT, "content", kind);
  let slugs = readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
  if (only) slugs = slugs.filter((s) => only.includes(s));

  const index = loadIndex();
  index[kind] ||= {};
  const missing = [];

  for (const slug of slugs) {
    const meta = CURATED[kind]?.[slug];
    if (!meta) {
      console.log(`skip ${kind}/${slug} (no curated Commons file)`);
      missing.push(`${kind}/${slug}`);
      continue;
    }

    const rawExt = extname(meta.file).toLowerCase() || ".jpg";
    const ext =
      rawExt === ".jpeg" || rawExt === ".jpg" || rawExt === ".jpe"
        ? ".jpg"
        : rawExt === ".png"
          ? ".png"
          : rawExt === ".webp"
            ? ".webp"
            : ".jpg";
    const rel = `/media/${kind}/${slug}${ext}`;
    const dest = join(ROOT, "public", rel.slice(1));

    if (!force && existsSync(dest) && index[kind][slug]?.src === rel) {
      console.log(`skip ${kind}/${slug}`);
      continue;
    }

    process.stdout.write(`${kind}/${slug} ... `);
    try {
      download(filePathUrl(meta.file), dest);
      const size = existsSync(dest) ? readFileSync(dest).length : 0;
      if (size < 5000) {
        console.log(`TOO-SMALL (${size}b)`);
        missing.push(`${kind}/${slug}`);
        continue;
      }
      index[kind][slug] = {
        src: rel,
        alt: { en: meta.altEn, zh: `${slugLabel(slug)}（Wikimedia Commons）` },
        credit: meta.credit,
        license: meta.license,
        sourceUrl: sourceUrl(meta.file),
      };
      writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + "\n");
      console.log(`OK (${Math.round(size / 1024)}KB) ${meta.file}`);
    } catch (err) {
      console.log(`FAIL ${err.message || err}`);
      missing.push(`${kind}/${slug}`);
    }
    sleep(8);
  }
  return missing;
}

// Always refresh known-wrong first-pass picks when --force
if (force) {
  const index = loadIndex();
  for (const bad of ["chuck-berry", "led-zeppelin"]) {
    delete index.bands?.[bad];
    for (const ext of [".jpg", ".png", ".JPG"]) {
      const p = join(ROOT, "public/media/bands", bad + ext);
      if (existsSync(p)) execFileSync("rm", ["-f", p]);
    }
  }
  writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + "\n");
}

const missing = [...processKind("bands"), ...processKind("people")];
console.log("\nDone.");
if (missing.length) {
  console.log("Unset / failed:");
  for (const m of missing) console.log(" -", m);
}
