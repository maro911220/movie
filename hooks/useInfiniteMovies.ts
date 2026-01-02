import { useState, useEffect, useRef } from "react";
import { Movie, MovieResponse, SortOption } from "@/types/movie";

// UseInfiniteMoviesProps
interface UseInfiniteMoviesProps {
  fetchFn: (
    page: number,
    sortBy?: SortOption,
    with_genres?: string
  ) => Promise<MovieResponse>;
  enabled?: boolean;
  sortBy?: SortOption;
  selectedGenres?: number[];
}

// useInfiniteMovies
export const useInfiniteMovies = ({
  fetchFn,
  enabled = true,
  sortBy,
  selectedGenres = [],
}: UseInfiniteMoviesProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const genresString = selectedGenres.join(",");

  // 마지막 컨텐츠 확인
  const lastMovieRef = (node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  // 이전 필터 값을 저장하여 변경 여부를 감지
  const prevFilters = useRef({ sortBy, genresString });

  // 영화 로드
  useEffect(() => {
    const fetchMovies = async (pageNum: number) => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFn(pageNum, sortBy, genresString);
        setMovies((prev) =>
          pageNum === 1
            ? data.results
            : [
                ...prev,
                ...data.results.filter((m) => !prev.some((p) => p.id === m.id)),
              ]
        );
        setHasMore(pageNum < data.total_pages);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "영화를 불러오는데 실패했습니다"
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // 필터 변경 확인
    const filtersChanged =
      prevFilters.current.sortBy !== sortBy ||
      prevFilters.current.genresString !== genresString;

    if (filtersChanged) {
      prevFilters.current = { sortBy, genresString };
      setMovies([]);
      setHasMore(true);
      setError(null);
      if (enabled) {
        fetchMovies(1);
      }
      if (page !== 1) {
        setPage(1);
      }
    } else {
      if (enabled) {
        fetchMovies(page);
      }
    }
  }, [page, enabled, sortBy, genresString, fetchFn]);

  return {
    movies,
    loading,
    error,
    hasMore,
    lastMovieRef,
  };
};
