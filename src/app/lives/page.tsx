import { getAllLives, getAllBands } from "@/lib/content";
import { LivesView } from "@/components/LivesView";

export const metadata = {
  title: "Lives",
};

export default function LivesPage() {
  const lives = getAllLives();
  const bandMap = Object.fromEntries(getAllBands().map((b) => [b.slug, b]));
  return <LivesView lives={lives} bandMap={bandMap} />;
}
