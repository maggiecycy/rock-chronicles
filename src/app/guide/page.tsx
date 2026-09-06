import { getAllGuides } from "@/lib/content";
import { GuideIndex } from "@/components/GuideIndex";

export const metadata = {
  title: "Guide",
};

export default function GuidePage() {
  const articles = getAllGuides();
  return <GuideIndex articles={articles} />;
}
