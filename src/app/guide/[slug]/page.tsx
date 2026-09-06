import { notFound } from "next/navigation";
import {
  getAllGuides,
  getGuide,
  getAllTropes,
  resolveBandNames,
  getAllGenres,
} from "@/lib/content";
import { GuideArticleView } from "@/components/GuideArticleView";
import type { Genre, Trope } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getGuide(slug);
  const title =
    typeof article?.title === "string"
      ? article.title
      : (article?.title.en ?? "Guide");
  return { title };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getGuide(slug);
  if (!article) notFound();

  const bands = resolveBandNames(article.relatedBandSlugs ?? []);
  const genreMap = new Map(getAllGenres().map((g) => [g.slug, g]));
  const genres = (article.relatedGenreSlugs ?? [])
    .map((s) => genreMap.get(s))
    .filter((g): g is Genre => Boolean(g));
  const tropeMap = new Map(getAllTropes().map((tr) => [tr.slug, tr]));
  const tropes = (article.relatedTropeSlugs ?? [])
    .map((s) => tropeMap.get(s))
    .filter((tr): tr is Trope => Boolean(tr));

  return (
    <GuideArticleView
      article={article}
      bands={bands}
      genres={genres}
      tropes={tropes}
    />
  );
}
