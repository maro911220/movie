"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { searchMovies } from "@/api/tmdb";
import { useMovieFilter } from "@/hooks/useMovieFilter";
import { useInfiniteMovies } from "@/hooks/useInfiniteMovies";
import MovieListLayout from "@/app/_components/MovieListLayout";

// SearchPage
export default function SearchPage() {
  const { id } = useParams<{ id: string }>();
  const query = id;

  const { movies, loading, error, hasMore, lastMovieRef } = useInfiniteMovies({
    fetchFn: (page) => searchMovies(query, page),
    enabled: !!query,
  });

  const { selectedGenres, setSelectedGenres, filteredMovies } =
    useMovieFilter(movies);

  // 검색어가 바뀌면 선택된 장르 초기화
  useEffect(() => {
    setSelectedGenres([]);
  }, [query]);

  if (!query) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>검색어를 입력해주세요</h1>
      </div>
    );
  }

  return (
    <MovieListLayout
      movies={filteredMovies}
      loading={loading}
      error={error}
      hasMore={hasMore}
      lastMovieRef={lastMovieRef}
      selectedGenres={selectedGenres}
      onGenreChange={setSelectedGenres}
    />
  );
}
