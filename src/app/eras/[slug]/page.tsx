import { notFound } from "next/navigation";
import {
  getAllEras,
  getEra,
  getBandsByEra,
  getAllGenres,
} from "@/lib/content";
import { EraView } from "@/components/EraView";
import { loc } from "@/i18n/config";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllEras().map((era) => ({ slug: era.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const era = getEra(slug);
  return { title: era ? loc(era.name, "en") : "Era" };
}

export default async function EraPage({ params }: PageProps) {
  const { slug } = await params;
  const era = getEra(slug);
  if (!era) notFound();

  const bands = getBandsByEra(era.slug);
  const primary = bands.filter((b) => b.primaryEra === era.slug);
  const genres = getAllGenres().filter((g) => era.genres.includes(g.slug));

  return <EraView era={era} genres={genres} primary={primary} />;
}
