import { getAllPeople } from "@/lib/content";
import { PeopleIndex } from "@/components/PeopleIndex";

export const metadata = {
  title: "People",
};

export default async function PeoplePage() {
  const people = await getAllPeople();
  const sorted = [...people].sort((a, b) => {
    if (a.hub !== b.hub) return a.hub ? -1 : 1;
    return (a.born ?? 9999) - (b.born ?? 9999) || a.name.localeCompare(b.name);
  });
  return <PeopleIndex people={sorted} />;
}
