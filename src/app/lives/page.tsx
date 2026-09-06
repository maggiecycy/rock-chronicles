import { getAllLives, getAllBands } from "@/lib/content";
import { LivesView } from "@/components/LivesView";

export const metadata = {
  title: "Lives",
};

export default async function LivesPage() {
  const [lives, bands] = await Promise.all([getAllLives(), getAllBands()]);
  const bandMap = Object.fromEntries(bands.map((b) => [b.slug, b]));
  return <LivesView lives={lives} bandMap={bandMap} />;
}
