import { NextResponse } from "next/server";
import { isDatabaseConfigured, prisma, useDatabase } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Dev-only probe: can the Next.js server process read MySQL via Prisma?
 * GET /api/dev/db-check
 */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "disabled in production" }, { status: 404 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "DATABASE_URL is not set (check .env.local)" },
      { status: 500 },
    );
  }

  try {
    const bands = await prisma.band.findMany({
      take: 5,
      orderBy: { slug: "asc" },
      select: { slug: true, name: true, formed: true, decisive: true },
    });
    const total = await prisma.band.count();

    return NextResponse.json({
      ok: true,
      source: "prisma",
      useDatabase: useDatabase(),
      bandCount: total,
      sample: bands,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
