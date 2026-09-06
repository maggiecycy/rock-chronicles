import { getAllGenres, getGenreLinks } from "@/lib/content";
import { GenresView } from "@/components/GenresView";

export const metadata = {
  title: "Genres",
};

export default function GenresPage() {
  const genres = getAllGenres();
  const links = getGenreLinks();

  return <GenresView genres={genres} links={links} />;
}
