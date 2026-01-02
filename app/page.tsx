"use client";
import { useState } from "react";
import { getNowPlayingMovies } from "@/api/tmdb";
import { useInfiniteMovies } from "@/hooks/useInfiniteMovies";
import MovieListLayout from "@/app/_components/MovieListLayout";
import { SortOption } from "@/types/movie";

// Home
export default function Home() {
  const [sortBy, setSortBy] = useState<SortOption>("popularity.desc");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const { movies, loading, error, hasMore, lastMovieRef } = useInfiniteMovies({
    fetchFn: getNowPlayingMovies,
    sortBy,
    selectedGenres,
  });

  return (
    <MovieListLayout
      movies={movies}
      loading={loading}
      error={error}
      hasMore={hasMore}
      lastMovieRef={lastMovieRef}
      selectedGenres={selectedGenres}
      onGenreChange={setSelectedGenres}
      sortBy={sortBy}
      setSortBy={setSortBy}
    />
  );
}
