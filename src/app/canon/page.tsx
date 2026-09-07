import { getCanonCoverage, getHundredBandsCanon } from "@/lib/canon";
import { bandShipStatus } from "@/lib/band-status";
import { CanonView } from "@/components/CanonView";

export const metadata = {
  title: "100 Acts Canon",
};

export default async function CanonPage() {
  const canon = getHundredBandsCanon();
  const { coverage, bySlug } = await getCanonCoverage();

  const statusBySlug: Record<string, "complete" | "stub" | "missing"> = {};
  for (const period of canon.periods) {
    for (const band of period.bands) {
      statusBySlug[band.slug] = bandShipStatus(band.slug, bySlug);
    }
  }

  return (
    <CanonView
      canon={canon}
      statusBySlug={statusBySlug}
      coverage={coverage}
    />
  );
}
