"use client";
import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { MediaModal } from "./MediaModal";
import { MediaSlider } from "./MediaSlider";

// Video type
interface Video {
  id: string;
  key: string;
  name: string;
}

// VideoSliderProps
interface VideoSliderProps {
  videos: Video[];
}

// VideoSlider
export const VideoSlider = ({ videos }: VideoSliderProps) => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  return (
    <>
      {/* MediaSlider */}
      <MediaSlider
        items={videos}
        getKey={(_, index) => `video-${index}`}
        onItemClick={(_, index) => setSelectedVideo(index)}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        renderItem={(video) => (
          <div className="relative aspect-video rounded-lg overflow-hidden w-full border-border/40">
            <Image
              fill
              sizes="100%"
              alt={video.name}
              src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
              className="object-cover group-hover:opacity-75 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>
            <div className="absolute h-1/2 bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-3">
              <p className="text-white text-sm font-medium line-clamp-2">
                {video.name}
              </p>
            </div>
          </div>
        )}
      />

      {/* MediaModal */}
      <MediaModal
        isOpen={selectedVideo !== null}
        currentIndex={selectedVideo ?? 0}
        totalItems={videos.length}
        onClose={() => setSelectedVideo(null)}
        onPrevious={() =>
          setSelectedVideo((prev) =>
            prev !== null && prev > 0 ? prev - 1 : prev
          )
        }
        onNext={() =>
          setSelectedVideo((prev) =>
            prev !== null && prev < videos.length - 1 ? prev + 1 : prev
          )
        }
      >
        {selectedVideo !== null && (
          <div className="relative w-full aspect-video">
            <iframe
              allowFullScreen
              title={videos[selectedVideo].name}
              className="absolute inset-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videos[selectedVideo].key}?autoplay=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
          </div>
        )}
      </MediaModal>
    </>
  );
};
