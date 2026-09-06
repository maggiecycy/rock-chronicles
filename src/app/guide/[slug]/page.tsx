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

export async function generateStaticParams() {
  const guides = await getAllGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getGuide(slug);
  const title =
    typeof article?.title === "string"
      ? article.title
      : (article?.title.en ?? "Guide");
  return { title };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getGuide(slug);
  if (!article) notFound();

  const [bands, allGenres, allTropes] = await Promise.all([
    resolveBandNames(article.relatedBandSlugs ?? []),
    getAllGenres(),
    getAllTropes(),
  ]);
  const genreMap = new Map(allGenres.map((g) => [g.slug, g]));
  const genres = (article.relatedGenreSlugs ?? [])
    .map((s) => genreMap.get(s))
    .filter((g): g is Genre => Boolean(g));
  const tropeMap = new Map(allTropes.map((tr) => [tr.slug, tr]));
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
