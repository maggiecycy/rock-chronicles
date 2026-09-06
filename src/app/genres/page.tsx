import { getAllGenres, getGenreLinks } from "@/lib/content";
import { GenresView } from "@/components/GenresView";

export const metadata = {
  title: "Genres",
};

export default async function GenresPage() {
  const [genres, links] = await Promise.all([
    getAllGenres(),
    getGenreLinks(),
  ]);

  return <GenresView genres={genres} links={links} />;
}
