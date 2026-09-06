import { getSharedMemberEdges, getAllBands } from "@/lib/content";
import { SharedMemberGraph } from "@/components/SharedMemberGraph";

export const metadata = {
  title: "Shared members",
};

export default function PeopleGraphPage() {
  const edges = getSharedMemberEdges();
  const bands = getAllBands();
  return <SharedMemberGraph edges={edges} bands={bands} />;
}
