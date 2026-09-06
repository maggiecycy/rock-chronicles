import { getSharedMemberEdges, getAllBands } from "@/lib/content";
import { SharedMemberGraph } from "@/components/SharedMemberGraph";

export const metadata = {
  title: "Shared members",
};

export default async function PeopleGraphPage() {
  const [edges, bands] = await Promise.all([
    getSharedMemberEdges(),
    getAllBands(),
  ]);
  return <SharedMemberGraph edges={edges} bands={bands} />;
}
