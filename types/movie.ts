export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
  runtime?: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  dates?: {
    maximum: string;
    minimum: string;
  };
}

export interface MovieDetail extends Movie {
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Cast {
  cast_id: number | null | undefined;
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  gender: number | null;
  known_for_department: string;
  original_name: string;
  popularity: number;
  adult: boolean;
}

export interface MovieImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
}

export interface MovieImages {
  id: number;
  backdrops: MovieImage[];
  logos: MovieImage[];
  posters: MovieImage[];
}

export interface MovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieVideos {
  id: number;
  results: MovieVideo[];
}

export interface CreditsResponse {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export type SortOption =
  | "release_date.desc"
  | "release_date.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "title.asc"
  | "popularity.desc";

export const SORT_OPTIONS: Record<SortOption, string> = {
  "popularity.desc": "인기순",
  "release_date.desc": "최신순",
  "release_date.asc": "오래된순",
  "vote_average.desc": "평점 높은 순",
  "vote_average.asc": "평점 낮은 순",
  "title.asc": "제목순",
};
