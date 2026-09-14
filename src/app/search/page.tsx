import { SearchPageClient } from "@/components/SearchPageClient";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const title = q?.trim() ? `Search · ${q.trim()}` : "Search";
  return { title };
}

export default function SearchPage() {
  return <SearchPageClient />;
}
