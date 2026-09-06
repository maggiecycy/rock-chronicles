import { getHubPeople } from "@/lib/content";
import { PeopleIndex } from "@/components/PeopleIndex";

export const metadata = {
  title: "People",
};

export default async function PeoplePage() {
  const people = await getHubPeople();
  return <PeopleIndex people={people} />;
}
