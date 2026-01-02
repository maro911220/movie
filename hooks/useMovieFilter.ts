import { useState } from "react";
import { Movie } from "@/types/movie";

// useMovieFilter
export function useMovieFilter(movies: Movie[]) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  // 현재 영화 목록의 장르 추출
  const genreSet = new Set<number>();
  movies.forEach((movie) => {
    movie.genre_ids?.forEach((id) => genreSet.add(id));
  });
  const availableGenres = Array.from(genreSet);

  // 장르 필터링
  const filteredMovies =
    selectedGenres.length === 0
      ? movies
      : movies.filter((movie) =>
          selectedGenres.every((genreId) => movie.genre_ids?.includes(genreId))
        );

  const filteredCount = filteredMovies.length;

  return {
    selectedGenres,
    setSelectedGenres,
    availableGenres,
    filteredCount,
    filteredMovies,
  };
}
