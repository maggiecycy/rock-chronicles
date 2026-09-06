import { getAllTropes } from "@/lib/content";
import { TropesView } from "@/components/TropesView";

export const metadata = {
  title: "Tropes",
};

export default function TropesPage() {
  const tropes = getAllTropes();
  return <TropesView tropes={tropes} />;
}
