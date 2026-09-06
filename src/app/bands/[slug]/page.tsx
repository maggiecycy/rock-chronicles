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

export async function generateStaticParams() {
  const bands = await getAllBands();
  return bands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const band = await getBand(slug);
  return { title: band?.name ?? "Band" };
}

export default async function BandPage({ params }: PageProps) {
  const { slug } = await params;
  const band = await getBand(slug);
  if (!band) notFound();

  const [allGenres, related, era] = await Promise.all([
    getAllGenres(),
    resolveBandNames(band.relatedBands),
    getEra(band.primaryEra),
  ]);
  const genres = allGenres.filter((g) => band.genres.includes(g.slug));

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
