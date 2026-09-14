import { getTopLevelGuides } from "@/lib/content";
import { GuideIndex } from "@/components/GuideIndex";

export const metadata = {
  title: "Guide",
};

export default async function GuidePage() {
  const articles = await getTopLevelGuides();
  return <GuideIndex articles={articles} />;
}
