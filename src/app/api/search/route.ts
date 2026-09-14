import { NextResponse } from "next/server";
import { isLocale } from "@/i18n/config";
import { searchSite } from "@/lib/search";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const localeParam = searchParams.get("locale") ?? "en";
  const locale = isLocale(localeParam) ? localeParam : "en";
  const limitRaw = Number(searchParams.get("limit") ?? "8");
  const limit = Number.isFinite(limitRaw)
    ? Math.min(Math.max(limitRaw, 1), 40)
    : 8;

  const hits = await searchSite(q, locale, limit);
  return NextResponse.json({ hits });
}
