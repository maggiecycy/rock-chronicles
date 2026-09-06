import { notFound } from "next/navigation";
import {
  getAllGenres,
  getGenre,
  getGenreLinks,
  getBandsByGenre,
} from "@/lib/content";
import { GenreView } from "@/components/GenreView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const genres = await getAllGenres();
  return genres.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const genre = await getGenre(slug);
  return { title: genre?.name ?? "Genre" };
}

export default async function GenrePage({ params }: PageProps) {
  const { slug } = await params;
  const genre = await getGenre(slug);
  if (!genre) notFound();

  const [links, allGenres, bands] = await Promise.all([
    getGenreLinks(),
    getAllGenres(),
    getBandsByGenre(slug),
  ]);
  const genreMap = Object.fromEntries(allGenres.map((g) => [g.slug, g]));
  const upstream = links.filter((l) => l.to === slug);
  const downstream = links.filter((l) => l.from === slug);

  return (
    <GenreView
      genre={genre}
      upstream={upstream}
      downstream={downstream}
      genreMap={genreMap}
      bands={bands}
    />
  );
}
