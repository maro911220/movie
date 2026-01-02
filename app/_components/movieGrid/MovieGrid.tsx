import { MovieCard } from "./MovieCard";
import { Movie } from "@/types/movie";

// MovieGridProps
interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  lastMovieRef: (node: HTMLDivElement | null) => void;
}

// 공통 텍스트 스타일
const textStyle = "p-5 text-center text-muted-foreground";

// MovieGrid
export const MovieGrid = ({
  movies,
  loading,
  error,
  hasMore,
  lastMovieRef,
}: MovieGridProps) => {
  // 에러 처리
  if (error) {
    return (
      <article className="flex-1">
        <h3 className="p-5 text-center text-destructive">에러 발생: {error}</h3>
      </article>
    );
  }

  // 데이터 없음
  if (!loading && movies.length === 0) {
    return (
      <article className="flex-1">
        <h3 className={textStyle}>영화가 없습니다</h3>
      </article>
    );
  }

  return (
    <article className="flex-1">
      <h3 className="sr-only">영화 목록</h3>
      {/* 로딩 */}
      {loading && (
        <div className={textStyle}>
          <div
            role="status"
            aria-label="로딩 중"
            className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full"
          />
          <p className="mt-2">로딩 중...</p>
        </div>
      )}

      {/* 영화 그리드 */}
      {movies.length > 0 && (
        <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie, index) => {
            const isLast = index === movies.length - 1 && hasMore;
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                ref={isLast ? lastMovieRef : undefined}
              />
            );
          })}
        </div>
      )}

      {/* 모두 로드됨 */}
      {!loading && !hasMore && movies.length > 0 && (
        <div className={textStyle}>모든 영화를 불러왔습니다.</div>
      )}
    </article>
  );
};
