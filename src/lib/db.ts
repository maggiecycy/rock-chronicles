import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function databaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;

  // Soften build-time pool pressure on small cloud MySQL / serverless.
  // Append via string ops so passwords with reserved URL chars stay intact.
  const extras: string[] = [];
  if (!/[?&]connection_limit=/.test(raw)) extras.push("connection_limit=1");
  if (!/[?&]pool_timeout=/.test(raw)) extras.push("pool_timeout=60");
  if (extras.length === 0) return raw;
  return `${raw}${raw.includes("?") ? "&" : "?"}${extras.join("&")}`;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl(),
      },
    },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

// Always reuse one client in the process (dev HMR + prod/build workers).
globalForPrisma.prisma = prisma;

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/** Feature flag: read content entities from MySQL via Prisma. */
export function useDatabase(): boolean {
  return process.env.USE_DATABASE === "true" && isDatabaseConfigured();
}
