import { notFound } from "next/navigation";
import {
  getAllBands,
  getBand,
  getAllGenres,
  getEra,
  resolveBandNames,
} from "@/lib/content";
import { BandNarrative } from "@/components/BandNarrative";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBands().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const band = getBand(slug);
  return { title: band?.name ?? "Band" };
}

export default async function BandPage({ params }: PageProps) {
  const { slug } = await params;
  const band = getBand(slug);
  if (!band) notFound();

  const genres = getAllGenres().filter((g) => band.genres.includes(g.slug));
  const related = resolveBandNames(band.relatedBands);
  const era = getEra(band.primaryEra);

  return (
    <main>
      <BandNarrative
        band={band}
        genres={genres}
        related={related}
        eraName={era?.name ?? band.primaryEra}
        eraSlug={band.primaryEra}
      />
    </main>
  );
}
