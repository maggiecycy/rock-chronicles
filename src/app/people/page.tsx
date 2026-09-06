import { getHubPeople } from "@/lib/content";
import { PeopleIndex } from "@/components/PeopleIndex";

export const metadata = {
  title: "People",
};

export default function PeoplePage() {
  const people = getHubPeople();
  return <PeopleIndex people={people} />;
}
