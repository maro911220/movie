import {
  getMovieDetail,
  getMovieCredits,
  getMovieImages,
  getMovieVideos,
} from "@/api/tmdb";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ImageSlider } from "../_components/ImageSlider";
import { VideoSlider } from "../_components/VideoSlider";
import { CastSlider } from "../_components/CastSlider";
import type {
  MovieImage,
  Crew,
  MovieVideo,
  MovieDetail,
  Genre,
  ProductionCompany,
  ProductionCountry,
} from "@/types/movie";
import type { Metadata } from "next";

// PageProps
interface PageProps {
  params: Promise<{ id: string }>;
}

// 영화 상태 한글 변환
const STATUS_MAP: Record<string, string> = {
  Released: "개봉",
  "Post Production": "후반 작업",
  "In Production": "제작 중",
};

// 영화 정보 생성 함수
const getMovieInfo = (movie: MovieDetail, directors: Crew[], writers: Crew[]) =>
  [
    { label: "감독", value: directors.map((d) => d.name).join(", ") },
    {
      label: "각본",
      value: writers.map((w) => w.name).join(", "),
    },
    { label: "개봉일", value: movie.release_date || "미정" },
    {
      label: "러닝타임",
      value: movie.runtime ? `${movie.runtime}분` : "정보 없음",
    },
    {
      label: "평점",
      value: `⭐ ${movie.vote_average.toFixed(1)} 
      (${movie.vote_count.toLocaleString()}명)`,
    },
    {
      label: "장르",
      value:
        movie.genres.length > 0
          ? movie.genres.map((g: Genre) => g.name).join(", ")
          : "정보 없음",
    },
    {
      label: "제작 국가",
      value:
        movie.production_countries.length > 0
          ? movie.production_countries
              .map((c: ProductionCountry) => c.name)
              .join(", ")
          : null,
    },
    {
      label: "제작사",
      value:
        movie.production_companies.length > 0
          ? movie.production_companies
              .slice(0, 3)
              .map((c: ProductionCompany) => c.name)
              .join(", ")
          : null,
    },
    {
      label: "예산",
      value: movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : null,
    },
    {
      label: "수익",
      value: movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : null,
    },
    { label: "상태", value: STATUS_MAP[movie.status] || movie.status },
  ].filter((item) => item.value);

// MovieDetailPage
export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId) || movieId <= 0) notFound();

  try {
    const [movie, creditsData, imagesData, videosData] = await Promise.all([
      getMovieDetail(movieId),
      getMovieCredits(movieId),
      getMovieImages(movieId),
      getMovieVideos(movieId),
    ]);

    // 영화 정보 데이터
    const directors = creditsData.crew.filter(
      (p: Crew) => p.job === "Director"
    );
    const writers = creditsData.crew.filter(
      (p: Crew) => p.job === "Screenplay" || p.job === "Writer"
    );
    const movieInfoItems = getMovieInfo(movie, directors, writers);

    // 출연진 데이터
    const credits = creditsData.cast.slice(0, 15);

    // 스틸컷 데이터
    const backdropImages = imagesData.backdrops
      .slice(0, 12)
      .map((img: MovieImage, i: number) => ({
        alt: `${movie.title} 스틸컷 ${i + 1}`,
        thumbnail: `https://image.tmdb.org/t/p/w500${img.file_path}`,
        src: `https://image.tmdb.org/t/p/original${img.file_path}`,
      }));

    // 예고편 데이터
    const trailerVideos = videosData.results
      .filter((v: MovieVideo) => v.site === "YouTube" && v.type === "Trailer")
      .sort(
        (a: MovieVideo, b: MovieVideo) =>
          (b.official ? 1 : 0) - (a.official ? 1 : 0)
      )
      .slice(0, 9)
      .map((v: MovieVideo) => ({ id: v.id, key: v.key, name: v.name }));

    return (
      <section className="max-w-content mx-auto space-y-8 pb-10">
        <h2 className=" sr-only">영화정보</h2>
        {/* 영화 기본 정보 */}
        <article className="flex flex-col sm:flex-row gap-6 lg:gap-10">
          {movie.poster_path && (
            <div className="flex-none max-w-80 sm:max-w-72 w-full mx-auto">
              <Image
                priority
                width={300}
                height={450}
                alt={`${movie.title} 포스터`}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="rounded-lg shadow-lg w-full lg:w-[300px] h-auto"
              />
            </div>
          )}
          <div className="flex-1 space-y-6">
            {/* 영화 타이틀 */}
            <div>
              {movie.original_title !== movie.title && (
                <p className="text-sm text-muted-foreground">
                  {movie.original_title}
                </p>
              )}
              <h3 className="text-4xl font-bold mb-2">{movie.title}</h3>
              {movie.tagline && (
                <p className="text-lg italic text-muted-foreground">
                  "{movie.tagline}"
                </p>
              )}
            </div>
            {/* 영화 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {movieInfoItems.map((item, i) => (
                <p key={i}>
                  <strong className="font-semibold">{item.label}:</strong>{" "}
                  {item.value}
                </p>
              ))}
            </div>
            {/* 영화 줄거리 */}
            <div>
              <h4 className="text-2xl font-semibold mb-3">줄거리</h4>
              <p className="leading-7 text-muted-foreground">
                {movie.overview || "줄거리 정보가 없습니다."}
              </p>
            </div>
          </div>
        </article>
        {/* 미디어 섹션 */}
        {credits.length > 0 && (
          <MediaSection title="출연진">
            <CastSlider cast={credits} />
          </MediaSection>
        )}
        {backdropImages.length > 0 && (
          <MediaSection title="스틸컷">
            <ImageSlider images={backdropImages} />
          </MediaSection>
        )}
        {trailerVideos.length > 0 && (
          <MediaSection title="예고편">
            <VideoSlider videos={trailerVideos} />
          </MediaSection>
        )}
      </section>
    );
  } catch (error) {
    console.error("영화 정보 로딩 실패:", error);
    notFound();
  }
}

// MediaSection Component
const MediaSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <article>
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    {children}
  </article>
);

// 메타데이터 생성
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = Number(id);

  if (isNaN(movieId) || movieId <= 0)
    return { title: "영화를 찾을 수 없습니다" };

  try {
    const movie = await getMovieDetail(movieId);
    return {
      title: `Maro Movies ${movie.title} - 영화 정보`,
      description: movie.overview || `${movie.title}의 상세 정보`,
      openGraph: {
        title: movie.title,
        description: movie.overview || undefined,
        images: movie.poster_path
          ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`]
          : [],
      },
    };
  } catch {
    return { title: "영화 정보" };
  }
}
