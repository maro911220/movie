import { MovieGrid } from "@/app/_components/movieGrid/MovieGrid";
import { MovieFilter } from "@/app/_components/movieFilter/MovieFilter";
import { Movie, SortOption } from "@/types/movie";

// MovieListLayoutProps
interface MovieListLayoutProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  lastMovieRef: (node: HTMLDivElement | null) => void;
  selectedGenres: number[];
  onGenreChange: (genres: number[]) => void;
  sortBy?: SortOption;
  setSortBy?: (value: SortOption) => void;
}

// MovieListLayout
export default function MovieListLayout({
  movies,
  loading,
  error,
  hasMore,
  lastMovieRef,
  selectedGenres,
  onGenreChange,
  sortBy,
  setSortBy,
}: MovieListLayoutProps) {
  return (
    <section className="flex items-start gap-4 max-w-content mx-auto">
      <h2 className="sr-only">컨텐츠 레이아웃</h2>
      <MovieFilter
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedGenres={selectedGenres}
        onGenreChange={onGenreChange}
      />
      <MovieGrid
        movies={movies}
        loading={loading}
        error={error}
        hasMore={hasMore}
        lastMovieRef={lastMovieRef}
      />
    </section>
  );
}
