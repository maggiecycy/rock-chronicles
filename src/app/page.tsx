import { getDecisiveBands, getAllEras } from "@/lib/content";
import { HeroReveal } from "@/components/HeroReveal";
import { HomeView } from "@/components/HomeView";

export default async function HomePage() {
  const [decisive, eras] = await Promise.all([
    getDecisiveBands(),
    getAllEras(),
  ]);

  return (
    <>
      <HeroReveal />
      <HomeView eras={eras} decisive={decisive} />
    </>
  );
}
