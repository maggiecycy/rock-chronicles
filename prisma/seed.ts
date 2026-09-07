import { config } from "dotenv";
import fs from "fs";
import path from "path";
import {
  GenreLinkType,
  PrismaClient,
  StickyVisual,
  TropeTone,
} from "@prisma/client";
import type {
  Band,
  Era,
  Genre,
  GuideArticle,
  LiveEvent,
  Person,
  Trope,
} from "@/lib/types";
import {
  mapStickyVisual,
  mapTropeTone,
  parseTenureTo,
  splitLocalized,
} from "./seed-utils";

const envLocal = path.join(process.cwd(), ".env.local");
const envFile = path.join(process.cwd(), ".env");
// override: true — ensure .env.local wins over any empty/stale shell vars
if (fs.existsSync(envLocal)) config({ path: envLocal, override: true });
else if (fs.existsSync(envFile)) config({ path: envFile, override: true });

const prisma = new PrismaClient();
const contentRoot = path.join(process.cwd(), "content");

function readJsonDir<T>(dir: string): T[] {
  const full = path.join(contentRoot, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(full, f), "utf8")) as T);
}

async function clearAll() {
  await prisma.assetLink.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.album.deleteMany();
  await prisma.liveEventTrack.deleteMany();
  await prisma.liveEventBand.deleteMany();
  await prisma.liveEvent.deleteMany();
  await prisma.tropeExample.deleteMany();
  await prisma.guideRelatedTrope.deleteMany();
  await prisma.guideRelatedGenre.deleteMany();
  await prisma.guideRelatedBand.deleteMany();
  await prisma.guideArticle.deleteMany();
  await prisma.trope.deleteMany();
  await prisma.lineupVersionMember.deleteMany();
  await prisma.lineupVersion.deleteMany();
  await prisma.bandLandmarkGenre.deleteMany();
  await prisma.bandLandmark.deleteMany();
  await prisma.bandNarrative.deleteMany();
  await prisma.bandInterviewQuote.deleteMany();
  await prisma.bandScene.deleteMany();
  await prisma.bandLyricQuote.deleteMany();
  await prisma.bandEssentialTrack.deleteMany();
  await prisma.bandMember.deleteMany();
  await prisma.bandInfluenceEdge.deleteMany();
  await prisma.bandRelated.deleteMany();
  await prisma.bandGenre.deleteMany();
  await prisma.bandAlsoEra.deleteMany();
  await prisma.personTenure.deleteMany();
  await prisma.personRelated.deleteMany();
  await prisma.person.deleteMany();
  await prisma.genreRepresentativeBand.deleteMany();
  await prisma.genrePioneerBand.deleteMany();
  await prisma.genreLink.deleteMany();
  await prisma.eraAnchorBand.deleteMany();
  await prisma.eraAlsoNotable.deleteMany();
  await prisma.eraGenre.deleteMany();
  await prisma.band.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.era.deleteMany();
}

async function seedErasBase(eras: Era[]) {
  for (const era of eras.sort((a, b) => a.order - b.order)) {
    const name = splitLocalized(era.name);
    const summary = splitLocalized(era.summary);
    const sound = splitLocalized(era.sound);
    const body = splitLocalized(era.body);

    await prisma.era.create({
      data: {
        slug: era.slug,
        nameEn: name.en,
        nameZh: name.zh,
        decade: era.decade,
        years: era.years,
        sortOrder: era.order,
        summaryEn: summary.en,
        summaryZh: summary.zh,
        soundEn: sound.en,
        soundZh: sound.zh,
        bodyEn: body.en,
        bodyZh: body.zh,
        alsoNotable: {
          create: era.alsoNotable.map((label, i) => ({
            label,
            sortOrder: i,
          })),
        },
      },
    });
  }
}

async function seedEraRelations(eras: Era[]) {
  for (const era of eras) {
    await prisma.eraGenre.createMany({
      data: era.genres.map((genreSlug, i) => ({
        eraSlug: era.slug,
        genreSlug,
        sortOrder: i,
      })),
      skipDuplicates: true,
    });
    await prisma.eraAnchorBand.createMany({
      data: era.anchorBands.map((bandSlug, i) => ({
        eraSlug: era.slug,
        bandSlug,
        sortOrder: i,
      })),
      skipDuplicates: true,
    });
  }
}

async function seedGenresBase(genres: Genre[]) {
  for (const genre of genres) {
    const summary = splitLocalized(genre.summary);
    const body = splitLocalized(genre.body);

    await prisma.genre.create({
      data: {
        slug: genre.slug,
        name: genre.name,
        summaryEn: summary.en,
        summaryZh: summary.zh,
        eraFocus: genre.eraFocus,
        bodyEn: body.en,
        bodyZh: body.zh,
      },
    });
  }
}

async function seedGenreRelations(genres: Genre[]) {
  for (const genre of genres) {
    if (genre.pioneerBands?.length) {
      await prisma.genrePioneerBand.createMany({
        data: genre.pioneerBands.map((bandSlug, i) => ({
          genreSlug: genre.slug,
          bandSlug,
          sortOrder: i,
        })),
        skipDuplicates: true,
      });
    }
    if (genre.representativeBands?.length) {
      await prisma.genreRepresentativeBand.createMany({
        data: genre.representativeBands.map((bandSlug, i) => ({
          genreSlug: genre.slug,
          bandSlug,
          sortOrder: i,
        })),
        skipDuplicates: true,
      });
    }
  }

  const links = JSON.parse(
    fs.readFileSync(path.join(contentRoot, "graph/genre-links.json"), "utf8"),
  ) as { from: string; to: string; type: GenreLinkType }[];

  await prisma.genreLink.createMany({
    data: links.map((l) => ({
      fromSlug: l.from,
      toSlug: l.to,
      linkType: l.type,
    })),
    skipDuplicates: true,
  });
}

async function seedBands(bands: Band[]) {
  for (const band of bands) {
    const shortBio = splitLocalized(band.shortBio);
    const body = splitLocalized(band.body);
    const why = splitLocalized(band.whyMatters);

    await prisma.band.create({
      data: {
        slug: band.slug,
        name: band.name,
        formed: band.formed,
        origin: band.origin,
        primaryEraSlug: band.primaryEra,
        decisive: band.decisive ?? false,
        accentColor: band.accentColor,
        shortBioEn: shortBio.en,
        shortBioZh: shortBio.zh,
        bodyEn: body.en,
        bodyZh: body.zh,
        whyMattersEn: band.whyMatters ? why.en : null,
        whyMattersZh: band.whyMatters ? why.zh : null,
        genres: {
          create: band.genres.map((genreSlug, i) => ({
            genreSlug,
            sortOrder: i,
          })),
        },
        alsoEras: {
          create: (band.alsoAppearsIn ?? []).map((eraSlug) => ({ eraSlug })),
        },
        members: {
          create: band.members.map((m, i) => ({
            name: m.name,
            role: m.role,
            years: m.years,
            personSlug: m.personSlug,
            sortOrder: i,
          })),
        },
        essentialTracks: {
          create: band.essentialTracks.map((t, i) => {
            const note = splitLocalized(t.note);
            return {
              title: t.title,
              year: t.year,
              noteEn: t.note ? note.en : null,
              noteZh: t.note ? note.zh : null,
              sortOrder: i,
            };
          }),
        },
        lyricQuotes: {
          create: band.lyricQuotes.map((quote, i) => ({
            quote,
            sortOrder: i,
          })),
        },
        scenes: {
          create: (band.scenes ?? []).map((s, i) => {
            const note = splitLocalized(s.note);
            return {
              year: s.year,
              track: s.track,
              membersOnStage: s.membersOnStage,
              genreTags: s.genreTags,
              intensity: s.intensity,
              noteEn: s.note ? note.en : null,
              noteZh: s.note ? note.zh : null,
              sortOrder: i,
            };
          }),
        },
        interviewQuotes: {
          create: (band.interviewQuotes ?? []).map((q, i) => ({
            text: q.text,
            speaker: q.speaker,
            source: q.source,
            year: q.year,
            sortOrder: i,
          })),
        },
        narratives: {
          create: (band.narrative ?? []).map((ch, i) => {
            const title = splitLocalized(ch.title);
            const bodyLoc = splitLocalized(ch.body);
            return {
              chapterId: ch.id,
              titleEn: title.en,
              titleZh: title.zh,
              bodyEn: bodyLoc.en,
              bodyZh: bodyLoc.zh,
              stickyVisual: mapStickyVisual(ch.stickyVisual) as StickyVisual,
              sceneIndex: ch.sceneIndex,
              quoteIndex: ch.quoteIndex,
              soundGenre: ch.soundGenre,
              sortOrder: i,
            };
          }),
        },
        lineupVersions: {
          create: (band.lineupVersions ?? []).map((v, i) => {
            const label = splitLocalized(v.label);
            const note = splitLocalized(v.note);
            return {
              versionId: v.id,
              labelEn: label.en,
              labelZh: label.zh,
              years: v.years,
              noteEn: v.note ? note.en : null,
              noteZh: v.note ? note.zh : null,
              peak: v.peak ?? false,
              sortOrder: i,
              members: {
                create: v.members.map((m, j) => ({
                  name: m.name,
                  role: m.role,
                  personSlug: m.personSlug,
                  sortOrder: j,
                })),
              },
            };
          }),
        },
        landmark: band.landmark
          ? {
              create: {
                debutTitle: band.landmark.debutTrack.title,
                debutYear: band.landmark.debutTrack.year,
                debutNoteEn: band.landmark.debutTrack.note
                  ? splitLocalized(band.landmark.debutTrack.note).en
                  : null,
                debutNoteZh: band.landmark.debutTrack.note
                  ? splitLocalized(band.landmark.debutTrack.note).zh
                  : null,
                noteEn: band.landmark.note
                  ? splitLocalized(band.landmark.note).en
                  : null,
                noteZh: band.landmark.note
                  ? splitLocalized(band.landmark.note).zh
                  : null,
                genres: {
                  create: band.landmark.pioneeredGenres.map((genreSlug, i) => ({
                    genreSlug,
                    sortOrder: i,
                  })),
                },
              },
            }
          : undefined,
      },
    });
  }

  for (const band of bands) {
    if (band.relatedBands.length) {
      await prisma.bandRelated.createMany({
        data: band.relatedBands.map((toBandSlug) => ({
          fromBandSlug: band.slug,
          toBandSlug,
        })),
        skipDuplicates: true,
      });
    }
    if (band.influenceFrom.length) {
      await prisma.bandInfluenceEdge.createMany({
        data: band.influenceFrom.map((fromBandSlug) => ({
          fromBandSlug,
          toBandSlug: band.slug,
        })),
        skipDuplicates: true,
      });
    }
    if (band.influenced.length) {
      await prisma.bandInfluenceEdge.createMany({
        data: band.influenced.map((toBandSlug) => ({
          fromBandSlug: band.slug,
          toBandSlug,
        })),
        skipDuplicates: true,
      });
    }
  }
}

async function seedPeople(people: Person[]) {
  for (const person of people) {
    const shortBio = splitLocalized(person.shortBio);
    const whyHub = splitLocalized(person.whyHub);
    const body = splitLocalized(person.body);

    await prisma.person.create({
      data: {
        slug: person.slug,
        name: person.name,
        born: person.born,
        origin: person.origin,
        hub: person.hub,
        roles: person.roles,
        shortBioEn: shortBio.en,
        shortBioZh: shortBio.zh,
        whyHubEn: whyHub.en,
        whyHubZh: whyHub.zh,
        bodyEn: body.en,
        bodyZh: body.zh,
        tenures: {
          create: person.tenures.map((t, i) => {
            const note = splitLocalized(t.note);
            const { yearTo, present } = parseTenureTo(t.to);
            return {
              bandSlug: t.bandSlug,
              bandName: t.bandName,
              role: t.role,
              yearFrom: t.from,
              yearTo,
              present,
              noteEn: t.note ? note.en : null,
              noteZh: t.note ? note.zh : null,
              sortOrder: i,
            };
          }),
        },
      },
    });
  }

  for (const person of people) {
    if (person.relatedPeople?.length) {
      await prisma.personRelated.createMany({
        data: person.relatedPeople.map((toPersonSlug) => ({
          fromPersonSlug: person.slug,
          toPersonSlug,
        })),
        skipDuplicates: true,
      });
    }
  }
}

async function seedTropes(tropes: Trope[]) {
  for (const trope of tropes) {
    const title = splitLocalized(trope.title);
    const summary = splitLocalized(trope.summary);
    const body = splitLocalized(trope.body);

    await prisma.trope.create({
      data: {
        slug: trope.slug,
        titleEn: title.en,
        titleZh: title.zh,
        summaryEn: summary.en,
        summaryZh: summary.zh,
        bodyEn: body.en,
        bodyZh: body.zh,
        tone: mapTropeTone(trope.tone) as TropeTone,
        examples: {
          create: trope.examples.map((ex, i) => {
            const note = splitLocalized(ex.note);
            return {
              label: ex.label,
              bandSlug: ex.bandSlug,
              personSlug: ex.personSlug,
              noteEn: ex.note ? note.en : null,
              noteZh: ex.note ? note.zh : null,
              sortOrder: i,
            };
          }),
        },
      },
    });
  }
}

async function seedGuides(guides: GuideArticle[]) {
  for (const g of guides.sort((a, b) => a.order - b.order)) {
    const title = splitLocalized(g.title);
    const summary = splitLocalized(g.summary);
    const body = splitLocalized(g.body);

    await prisma.guideArticle.create({
      data: {
        slug: g.slug,
        sortOrder: g.order,
        titleEn: title.en,
        titleZh: title.zh,
        summaryEn: summary.en,
        summaryZh: summary.zh,
        bodyEn: body.en,
        bodyZh: body.zh,
        relatedBands: {
          create: (g.relatedBandSlugs ?? []).map((bandSlug, i) => ({
            bandSlug,
            sortOrder: i,
          })),
        },
        relatedGenres: {
          create: (g.relatedGenreSlugs ?? []).map((genreSlug, i) => ({
            genreSlug,
            sortOrder: i,
          })),
        },
        relatedTropes: {
          create: (g.relatedTropeSlugs ?? []).map((tropeSlug, i) => ({
            tropeSlug,
            sortOrder: i,
          })),
        },
      },
    });
  }
}

async function seedLives(lives: LiveEvent[]) {
  for (const live of lives) {
    const title = splitLocalized(live.title);
    const venue = splitLocalized(live.venue);
    const summary = splitLocalized(live.summary);
    const whyEpic = splitLocalized(live.whyEpic);
    const rights = splitLocalized(live.rightsNote);

    await prisma.liveEvent.create({
      data: {
        slug: live.slug,
        titleEn: title.en,
        titleZh: title.zh,
        year: live.year,
        venueEn: venue.en,
        venueZh: venue.zh,
        summaryEn: summary.en,
        summaryZh: summary.zh,
        whyEpicEn: whyEpic.en,
        whyEpicZh: whyEpic.zh,
        rightsNoteEn: live.rightsNote ? rights.en : null,
        rightsNoteZh: live.rightsNote ? rights.zh : null,
        bands: {
          create: live.bandSlugs.map((bandSlug, i) => ({
            bandSlug,
            sortOrder: i,
          })),
        },
        tracks: {
          create: live.keyTracks.map((t, i) => {
            const note = splitLocalized(t.note);
            return {
              title: t.title,
              bandSlug: t.bandSlug,
              noteEn: t.note ? note.en : null,
              noteZh: t.note ? note.zh : null,
              sortOrder: i,
            };
          }),
        },
      },
    });
  }
}

async function waitForDb(maxAttempts = 30, delayMs = 5000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await prisma.$connect();
      await prisma.$queryRawUnsafe("SELECT 1");
      if (attempt > 1) console.log(`Database reachable on attempt ${attempt}`);
      return;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(
        `DB not reachable (attempt ${attempt}/${maxAttempts}): ${msg.split("\n")[0]}`,
      );
      await prisma.$disconnect().catch(() => undefined);
      if (attempt === maxAttempts) throw e;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
}

function isTransientDbError(e: unknown): boolean {
  const code =
    e && typeof e === "object" && "code" in e
      ? String((e as { code?: string }).code)
      : "";
  const msg = e instanceof Error ? e.message : String(e);
  return (
    code === "P1001" ||
    code === "P1017" ||
    code === "P1002" ||
    /Can't reach database server/i.test(msg) ||
    /Server has closed the connection/i.test(msg) ||
    /Timed out fetching a new connection/i.test(msg) ||
    /Connection reset/i.test(msg) ||
    /ECONNRESET|ETIMEDOUT|ECONNREFUSED/i.test(msg)
  );
}

async function withDbRetry<T>(
  label: string,
  fn: () => Promise<T>,
  maxAttempts = 8,
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (e) {
      if (!isTransientDbError(e) || attempt === maxAttempts) throw e;
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(
        `Transient DB error during ${label} (attempt ${attempt}/${maxAttempts}): ${msg.split("\n")[0]}`,
      );
      await prisma.$disconnect().catch(() => undefined);
      await new Promise((r) => setTimeout(r, 3000 * attempt));
      await waitForDb(12, 4000);
    }
  }
  throw new Error(`withDbRetry exhausted: ${label}`);
}

async function clearEditorial() {
  await prisma.liveEventTrack.deleteMany();
  await prisma.liveEventBand.deleteMany();
  await prisma.liveEvent.deleteMany();
  await prisma.tropeExample.deleteMany();
  await prisma.guideRelatedTrope.deleteMany();
  await prisma.guideRelatedGenre.deleteMany();
  await prisma.guideRelatedBand.deleteMany();
  await prisma.guideArticle.deleteMany();
  await prisma.trope.deleteMany();
}

/** Guides / tropes / lives only — keeps eras, genres, bands, people. */
async function seedEditorialOnce() {
  const guides = readJsonDir<GuideArticle>("guide");
  const tropes = readJsonDir<Trope>("tropes");
  const lives = readJsonDir<LiveEvent>("lives");

  console.log("Waiting for database…");
  await waitForDb();

  console.log("Clearing guides / tropes / lives…");
  await withDbRetry("clearEditorial", () => clearEditorial());

  console.log(`Seeding tropes (${tropes.length})…`);
  await seedTropes(tropes);

  console.log(`Seeding guides (${guides.length})…`);
  await seedGuides(guides);

  console.log(`Seeding lives (${lives.length})…`);
  await seedLives(lives);

  console.log("Editorial seed complete:", {
    guides: await prisma.guideArticle.count(),
    tropes: await prisma.trope.count(),
    lives: await prisma.liveEvent.count(),
  });
}

async function seedOnce() {
  const eras = readJsonDir<Era>("eras");
  const genres = readJsonDir<Genre>("genres");
  const bands = readJsonDir<Band>("bands");
  const people = readJsonDir<Person>("people");
  const guides = readJsonDir<GuideArticle>("guide");
  const tropes = readJsonDir<Trope>("tropes");
  const lives = readJsonDir<LiveEvent>("lives");

  console.log("Waiting for database…");
  await waitForDb();

  console.log("Clearing existing rows…");
  await withDbRetry("clearAll", () => clearAll());

  console.log("Seeding eras (base)…");
  await seedErasBase(eras);

  console.log("Seeding genres (base)…");
  await seedGenresBase(genres);

  console.log("Seeding bands…");
  await seedBands(bands);

  console.log("Seeding era & genre relations…");
  await seedEraRelations(eras);
  await seedGenreRelations(genres);

  console.log("Seeding people…");
  await seedPeople(people);

  console.log("Seeding tropes…");
  await seedTropes(tropes);

  console.log("Seeding guides…");
  await seedGuides(guides);

  console.log("Seeding lives…");
  await seedLives(lives);

  const counts = {
    eras: await prisma.era.count(),
    genres: await prisma.genre.count(),
    bands: await prisma.band.count(),
    people: await prisma.person.count(),
    guides: await prisma.guideArticle.count(),
    tropes: await prisma.trope.count(),
    lives: await prisma.liveEvent.count(),
    narratives: await prisma.bandNarrative.count(),
    tenures: await prisma.personTenure.count(),
  };

  console.log("Seed complete:", counts);
}

async function main() {
  const editorialOnly = process.argv.includes("--editorial-only");
  const runSeed = editorialOnly ? seedEditorialOnce : seedOnce;

  // Full-run retries: Aiven trial drops connections mid-seed (P1017)
  const maxRuns = 5;
  for (let run = 1; run <= maxRuns; run++) {
    try {
      if (run > 1) {
        console.log(`\nRestarting seed (run ${run}/${maxRuns})…`);
        await prisma.$disconnect().catch(() => undefined);
        await waitForDb();
      }
      await runSeed();
      return;
    } catch (e) {
      if (!isTransientDbError(e) || run === maxRuns) throw e;
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(
        `Seed run ${run} failed transiently: ${msg.split("\n")[0]}`,
      );
      await new Promise((r) => setTimeout(r, 5000 * run));
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
