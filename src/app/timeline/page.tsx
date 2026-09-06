import { getAllEras, getBandsByEra, getDecisiveBands } from "@/lib/content";
import { TimelineView } from "@/components/TimelineView";
import type { Band } from "@/lib/types";

export const metadata = {
  title: "Timeline",
};

export default function TimelinePage() {
  const eras = getAllEras();
  const decisive = getDecisiveBands();
  const bandsByEra: Record<string, Band[]> = {};
  for (const era of eras) {
    bandsByEra[era.slug] = getBandsByEra(era.slug).filter(
      (b) => b.primaryEra === era.slug,
    );
  }

  return (
    <TimelineView eras={eras} bandsByEra={bandsByEra} decisive={decisive} />
  );
}
