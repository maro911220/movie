"use client";
import Image from "next/image";
import { MediaSlider } from "./MediaSlider";
import { Cast } from "@/types/movie";

// CastSliderProps
interface CastSliderProps {
  cast: Cast[];
}

// CastSlider
export const CastSlider = ({ cast }: CastSliderProps) => {
  return (
    <MediaSlider
      items={cast}
      getKey={(_, index) => `cast-${index}`}
      breakpoints={{
        0: { slidesPerView: 2 },
        300: { slidesPerView: 3 },
        460: { slidesPerView: 4 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 6 },
      }}
      renderItem={(actor) => (
        <div className="text-center">
          <div className="relative aspect-2/3 mb-2">
            {actor.profile_path ? (
              <Image
                fill
                alt={`${actor.name} 프로필`}
                className="object-cover rounded-lg"
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            ) : (
              <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-xs">No Image</span>
              </div>
            )}
          </div>
          <p className="font-semibold text-sm line-clamp-2">{actor.name}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {actor.character}
          </p>
        </div>
      )}
    />
  );
};
