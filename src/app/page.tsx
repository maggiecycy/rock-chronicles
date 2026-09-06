import { getDecisiveBands, getAllEras } from "@/lib/content";
import { HeroReveal } from "@/components/HeroReveal";
import { HomeView } from "@/components/HomeView";

export default function HomePage() {
  const decisive = getDecisiveBands();
  const eras = getAllEras();

  return (
    <>
      <HeroReveal />
      <HomeView eras={eras} decisive={decisive} />
    </>
  );
}
