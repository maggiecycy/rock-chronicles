#!/usr/bin/env node
/**
 * CLI probe: can Node + Prisma read local MySQL?
 * Usage: npm run db:probe
 */
import { config } from "dotenv";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

if (fs.existsSync(".env.local")) config({ path: ".env.local", override: true });
else if (fs.existsSync(".env")) config({ path: ".env", override: true });

if (!process.env.DATABASE_URL) {
  console.error("FAIL: DATABASE_URL missing");
  process.exit(1);
}

const prisma = new PrismaClient();

try {
  const bands = await prisma.band.findMany({
    take: 5,
    orderBy: { slug: "asc" },
    select: { slug: true, name: true, formed: true, decisive: true },
  });
  const total = await prisma.band.count();

  console.log("OK: Prisma read succeeded");
  console.log(`band.count = ${total}`);
  console.log("sample (up to 5):");
  for (const b of bands) {
    console.log(`  - ${b.slug} | ${b.name} | formed ${b.formed}${b.decisive ? " | decisive" : ""}`);
  }
} catch (e) {
  console.error("FAIL:", e instanceof Error ? e.message : e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
