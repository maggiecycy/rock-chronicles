import { ListenLibrary } from "@/components/ListenLibrary";
import { getAllBands, getAllEras } from "@/lib/content";
import { buildListenGroups } from "@/lib/listen-groups";

export default async function ListenPage() {
  const [eras, bands] = await Promise.all([getAllEras(), getAllBands()]);
  const { eras: eraGroups, extra } = buildListenGroups(eras, bands);

  return <ListenLibrary eraGroups={eraGroups} extra={extra} />;
}
