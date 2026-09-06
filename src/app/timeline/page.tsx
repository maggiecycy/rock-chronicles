import { getAllEras, getAllBands, getDecisiveBands } from "@/lib/content";
import { TimelineView } from "@/components/TimelineView";
import type { Band } from "@/lib/types";

export const metadata = {
  title: "Timeline",
};

export default async function TimelinePage() {
  const [eras, decisive, allBands] = await Promise.all([
    getAllEras(),
    getDecisiveBands(),
    getAllBands(),
  ]);
  const bandsByEra: Record<string, Band[]> = {};
  for (const era of eras) {
    bandsByEra[era.slug] = allBands.filter((b) => b.primaryEra === era.slug);
  }

  return (
    <TimelineView eras={eras} bandsByEra={bandsByEra} decisive={decisive} />
  );
}
