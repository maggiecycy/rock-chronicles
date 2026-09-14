import { getDailyBandIndex } from "@/lib/daily";
import { DailyBandView } from "@/components/DailyBandView";

export const metadata = {
  title: "One band a day",
};

export default function DailyBandPage() {
  const index = getDailyBandIndex();
  return <DailyBandView index={index} />;
}
