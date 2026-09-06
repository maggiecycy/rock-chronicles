import { notFound } from "next/navigation";
import {
  getAllPeople,
  getPerson,
} from "@/lib/content";
import { PersonProfile } from "@/components/PersonProfile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPeople().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const person = getPerson(slug);
  return { title: person?.name ?? "Person" };
}

export default async function PersonPage({ params }: PageProps) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();

  const related = (person.relatedPeople ?? [])
    .map((s) => getPerson(s))
    .filter(Boolean);

  return (
    <PersonProfile
      person={person}
      related={related as NonNullable<ReturnType<typeof getPerson>>[]}
    />
  );
}
