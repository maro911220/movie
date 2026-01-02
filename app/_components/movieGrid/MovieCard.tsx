import Link from "next/link";
import Image from "next/image";
import { forwardRef } from "react";
import { StarIcon } from "lucide-react";
import { Movie } from "@/types/movie";

// MovieCardProps
interface MovieCardProps {
  movie: Movie;
}

// MovieCard
export const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(
  ({ movie }, ref) => {
    return (
      <Link
        className="flex"
        href={`/movie/${movie.id}`}
        aria-label={`${movie.title} 상세 정보 보기`}
      >
        <div
          ref={ref}
          className="flex flex-col flex-1 border rounded-xl transition-all scale-100 will-change-transform overflow-hidden hover:scale-[1.025]"
        >
          {/* 포스터 */}
          <div className="w-full aspect-2/3">
            {movie.poster_path ? (
              <Image
                width={500}
                height={750}
                alt={movie.title}
                placeholder="blur"
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>

          {/* 정보 */}
          <div className="p-2 flex flex-col justify-between flex-1 md:gap-1">
            <h4 className="font-bold text-sm md:text-base">{movie.title}</h4>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">
                개봉일: {movie.release_date || "미정"}
              </p>
              <p className="text-xs md:text-sm flex items-center justify-end">
                <StarIcon className="w-3 h-3 md:w-4 md:h-4 fill-amber-400 text-amber-400 mr-1" />
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
);

MovieCard.displayName = "MovieCard";
