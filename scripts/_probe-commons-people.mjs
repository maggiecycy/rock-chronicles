/**
 * One-off probe: search Commons for portrait files and verify download size.
 * node scripts/_probe-commons-people.mjs
 */
import { execFileSync } from "child_process";

const PROXY = "http://127.0.0.1:7890";
const UA = "RockChroniclesBot/0.1 (educational; local cache of Commons media)";

const QUERIES = {
  "billie-joe-armstrong": "Billie Joe Armstrong",
  "bon-scott": "Bon Scott",
  "brian-johnson": "Brian Johnson AC/DC",
  "brian-wilson": "Brian Wilson Beach Boys",
  "bruce-dickinson": "Bruce Dickinson",
  "chris-cornell": "Chris Cornell",
  "damon-albarn": "Damon Albarn",
  "dave-mustaine": "Dave Mustaine",
  "david-lee-roth": "David Lee Roth",
  "dolores-oriordan": "Dolores O'Riordan",
  flea: "Flea Red Hot Chili Peppers",
  "geezer-butler": "Geezer Butler",
  "ian-curtis": "Ian Curtis",
  "ian-gillan": "Ian Gillan",
  "jack-white": "Jack White",
  "james-hetfield": "James Hetfield",
  "joe-strummer": "Joe Strummer",
  "john-cale": "John Cale",
  "john-lydon": "John Lydon",
  "johnny-marr": "Johnny Marr",
  "kim-deal": "Kim Deal",
  "kim-gordon": "Kim Gordon",
  "lemmy-kilmister": "Lemmy Kilmister",
  "lou-reed": "Lou Reed",
  "mark-knopfler": "Mark Knopfler",
  "matt-cameron": "Matt Cameron",
  "michael-stipe": "Michael Stipe",
  "pat-smear": "Pat Smear",
  "ray-davies": "Ray Davies",
  "ritchie-blackmore": "Ritchie Blackmore",
  "rob-halford": "Rob Halford",
  "robert-smith": "Robert Smith The Cure",
  "roger-glover": "Roger Glover",
  "sammy-hagar": "Sammy Hagar",
  slash: "Slash Guns N Roses",
  "stevie-nicks": "Stevie Nicks",
  sting: "Sting musician",
  "tina-weymouth": "Tina Weymouth",
  "tom-morello": "Tom Morello",
  "tony-iommi": "Tony Iommi",
  "trent-reznor": "Trent Reznor",
  "axl-rose": "Axl Rose",
  "duff-mckagan": "Duff McKagan",
  "eddie-vedder": "Eddie Vedder",
  "graham-coxon": "Graham Coxon",
  "jim-morrison": "Jim Morrison",
  "david-byrne": "David Byrne",
  "billy-corgan": "Billy Corgan",
  morrissey: "Morrissey",
  "freddie-mercury": "Freddie Mercury",
  "brian-may": "Brian May",
  "roger-taylor": "Roger Taylor Queen",
  "john-deacon": "John Deacon",
  "angus-young": "Angus Young",
  "malcolm-young": "Malcolm Young",
  "steve-harris": "Steve Harris Iron Maiden",
  "paul-di-anno": "Paul Di'Anno",
  "dee-dee-ramone": "Dee Dee Ramone",
  "joey-ramone": "Joey Ramone",
  "johnny-ramone": "Johnny Ramone",
  "sid-vicious": "Sid Vicious",
  "steve-jones": "Steve Jones Sex Pistols",
  "paul-cook": "Paul Cook Sex Pistols",
  "glen-matlock": "Glen Matlock",
  "stewart-copeland": "Stewart Copeland",
  "andy-summers": "Andy Summers",
  "phil-rudd": "Phil Rudd",
  "cliff-williams": "Cliff Williams AC/DC",
  "neil-peart": "Neil Peart",
  "geddy-lee": "Geddy Lee",
  "alex-lifeson": "Alex Lifeson",
  "eddie-van-halen": "Eddie Van Halen",
  "alex-van-halen": "Alex Van Halen",
  "michael-anthony": "Michael Anthony Van Halen",
  "izzy-stradlin": "Izzy Stradlin",
  "stone-gossard": "Stone Gossard",
  "mike-mccready": "Mike McCready",
  "kevin-shields": "Kevin Shields",
  "thurston-moore": "Thurston Moore",
  "black-francis": "Black Francis",
  "glenn-tipton": "Glenn Tipton",
  "jimmy-chamberlin": "Jimmy Chamberlin",
  "kim-thayil": "Kim Thayil",
  "lindsey-buckingham": "Lindsey Buckingham",
  "ray-manzarek": "Ray Manzarek",
  "marty-friedman": "Marty Friedman",
  "dave-ellefson": "David Ellefson",
  "simon-gallup": "Simon Gallup",
  "ripper-owens": "Tim Ripper Owens",
  "jon-lord": "Jon Lord",
};

function curl(args) {
  return execFileSync("curl", ["-4", "-sS", "-x", PROXY, "-A", UA, ...args], {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
}

function search(query) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&list=search" +
    "&srnamespace=6&srlimit=5&format=json&srsearch=" +
    encodeURIComponent(query);
  const raw = curl([url]);
  const data = JSON.parse(raw);
  return (data.query?.search ?? []).map((s) => s.title.replace(/^File:/, ""));
}

function verifyFile(filename) {
  const enc = encodeURIComponent(filename.replace(/ /g, "_"));
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${enc}?width=1600`;
  const dest = `/tmp/commons-probe-${Date.now()}.bin`;
  try {
    execFileSync(
      "curl",
      [
        "-4",
        "-sS",
        "-L",
        "-x",
        PROXY,
        "-A",
        UA,
        "--connect-timeout",
        "30",
        "--max-time",
        "90",
        "-o",
        dest,
        url,
      ],
      { stdio: "pipe" },
    );
    const size = execFileSync("stat", ["-f%z", dest], { encoding: "utf8" }).trim();
    execFileSync("rm", ["-f", dest]);
    const n = parseInt(size, 10);
    return { ok: n >= 5000, size: n, url };
  } catch {
    execFileSync("rm", ["-f", dest], { stdio: "ignore" });
    return { ok: false, size: 0 };
  }
}

function sleep(sec) {
  execFileSync("sleep", [String(sec)]);
}

const results = {};
const failed = [];

for (const [slug, query] of Object.entries(QUERIES)) {
  process.stdout.write(`${slug} ... `);
  try {
    const files = search(query);
    let picked = null;
    for (const f of files) {
      const ext = f.split(".").pop()?.toLowerCase();
      if (!["jpg", "jpeg", "png", "webp"].includes(ext)) continue;
      const v = verifyFile(f);
      if (v.ok) {
        picked = { file: f, size: v.size };
        break;
      }
      sleep(0.2);
    }
    if (picked) {
      results[slug] = picked;
      console.log(`OK ${picked.file} (${Math.round(picked.size / 1024)}KB)`);
    } else {
      failed.push(slug);
      console.log(`NO (${files.slice(0, 3).join("; ") || "no hits"})`);
    }
  } catch (e) {
    failed.push(slug);
    console.log(`ERR ${e.message}`);
  }
  sleep(0.3);
}

console.log("\n=== RESULTS JSON ===");
console.log(JSON.stringify(results, null, 2));
console.log("\nFailed:", failed.join(", "));
