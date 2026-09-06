import { notFound } from "next/navigation";
import { getAllPeople, getPerson } from "@/lib/content";
import { PersonProfile } from "@/components/PersonProfile";
import type { Person } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const people = await getAllPeople();
  return people.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const person = await getPerson(slug);
  return { title: person?.name ?? "Person" };
}

export default async function PersonPage({ params }: PageProps) {
  const { slug } = await params;
  const person = await getPerson(slug);
  if (!person) notFound();

  const related = (
    await Promise.all((person.relatedPeople ?? []).map((s) => getPerson(s)))
  ).filter((p): p is Person => Boolean(p));

  return <PersonProfile person={person} related={related} />;
}
