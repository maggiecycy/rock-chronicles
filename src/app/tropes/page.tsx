import { getAllTropes } from "@/lib/content";
import { TropesView } from "@/components/TropesView";

export const metadata = {
  title: "Tropes",
};

export default async function TropesPage() {
  const tropes = await getAllTropes();
  return <TropesView tropes={tropes} />;
}
