import axios from "axios";
import {
  CreditsResponse,
  Genre,
  MovieDetail,
  MovieImages,
  MovieResponse,
  MovieVideos,
  SortOption,
} from "@/types/movie";

// APIKEY
const APIKEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// API SET
const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: APIKEY,
    language: "ko-KR",
    region: "KR",
  },
});

// 현재 상영중인 영화
export const getNowPlayingMovies = async (
  page = 1,
  sortBy: SortOption = "popularity.desc",
  with_genres?: string
): Promise<MovieResponse> => {
  const today = new Date().toISOString().split("T")[0];
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const threeMonthsAgoStr = threeMonthsAgo.toISOString().split("T")[0];

  const params: any = {
    page,
    sort_by: sortBy,
    "release_date.gte": threeMonthsAgoStr,
    "release_date.lte": today,
    with_release_type: "2|3", // 극장 개봉
  };

  if (with_genres) {
    params.with_genres = with_genres;
  }

  const response = await tmdbApi.get<MovieResponse>("/discover/movie", {
    params,
  });
  return response.data;
};

// 영화 상세 정보
export const getMovieDetail = async (
  movieId: string | number
): Promise<MovieDetail> => {
  const response = await tmdbApi.get<MovieDetail>(`/movie/${movieId}`);
  return response.data;
};

// 영화 출연진 정보
export const getMovieCredits = async (
  movieId: string | number
): Promise<CreditsResponse> => {
  const response = await tmdbApi.get<CreditsResponse>(
    `/movie/${movieId}/credits`
  );
  return response.data;
};

// 영화 이미지
export const getMovieImages = async (
  movieId: string | number
): Promise<MovieImages> => {
  const response = await tmdbApi.get<MovieImages>(`/movie/${movieId}/images`, {
    params: {
      include_image_language: "ko,null",
    },
  });
  return response.data;
};

// 영화 비디오
export const getMovieVideos = async (
  movieId: string | number
): Promise<MovieVideos> => {
  const response = await tmdbApi.get<MovieVideos>(`/movie/${movieId}/videos`);
  return response.data;
};

// 인기 영화
export const getPopularMovies = async (): Promise<MovieResponse> => {
  const response = await tmdbApi.get<MovieResponse>("/movie/popular");
  return response.data;
};

// 장르
export const getMovieGenres = async (): Promise<{ genres: Genre[] }> => {
  const response = await tmdbApi.get<{ genres: Genre[] }>("/genre/movie/list");
  return response.data;
};

// 영화 검색
export const searchMovies = async (
  query: string,
  page = 1
): Promise<MovieResponse> => {
  const response = await tmdbApi.get<MovieResponse>("/search/movie", {
    params: { query, page },
  });
  return response.data;
};

export default tmdbApi;
