import { getAllGuides } from "@/lib/content";
import { GuideIndex } from "@/components/GuideIndex";

export const metadata = {
  title: "Guide",
};

export default async function GuidePage() {
  const articles = await getAllGuides();
  return <GuideIndex articles={articles} />;
}
