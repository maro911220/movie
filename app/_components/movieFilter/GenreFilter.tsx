"use client";
import { useEffect, useState } from "react";
import { getMovieGenres } from "@/api/tmdb";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Genre } from "@/types/movie";

// GenreFilter Props
interface GenreFilterProps {
  selectedGenres: number[];
  onGenreChange: (genreIds: number[]) => void;
}

// GenreFilter
export const GenreFilter = ({
  onGenreChange,
  selectedGenres,
}: GenreFilterProps) => {
  const [allGenres, setAllGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 토글 클릭
  const handleGenreClick = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      onGenreChange(selectedGenres.filter((id) => id !== genreId));
    } else {
      onGenreChange([...selectedGenres, genreId]);
    }
  };

  // 초기화 클릭
  const handleClearAll = () => onGenreChange([]);

  // 장르 목록 불러오기
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getMovieGenres();
        setAllGenres(data.genres);
      } catch (error) {
        console.error("장르 목록 불러오기 실패:", error);
        setError("장르를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  // 상태 확인
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      {/* GenreFilterTitle */}
      <div className="h-6 flex items-center gap-1 mb-2">
        <h4 className="text-lg font-semibold">장르</h4>
        {selectedGenres.length > 0 && (
          <div className="flex items-center">
            <span className="text-gray-500">({selectedGenres.length})</span>
            <Button
              onClick={handleClearAll}
              size="sm"
              variant="outline"
              className="rounded-full w-6 h-6 mb-2 scale-75"
            >
              <XIcon />
            </Button>
          </div>
        )}
      </div>
      {/* GenreFilterList */}
      <div className="flex flex-wrap gap-2">
        {allGenres.map((genre) => {
          return (
            <Toggle
              key={genre.id}
              pressed={selectedGenres.includes(genre.id)}
              onPressedChange={() => handleGenreClick(genre.id)}
              aria-label={`${genre.name} 장르 ${
                selectedGenres.includes(genre.id) ? "선택됨" : "선택 안됨"
              }`}
              className={cn(
                "rounded-full px-4 py-2 border text-sm transition-all cursor-pointer",
                "data-[state=off]:bg-white data-[state=off]:hover:bg-accent data-[state=off]:text-foreground data-[state=off]:border-input",
                "data-[state=off]:dark:bg-input/30 data-[state=off]:dark:hover:bg-input/50",
                "data-[state=on]:bg-point data-[state=on]:text-white data-[state=on]:border-point data-[state=on]:font-bold"
              )}
            >
              {genre.name}
            </Toggle>
          );
        })}
      </div>
    </div>
  );
};
