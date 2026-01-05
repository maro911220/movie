"use client";
import Image from "next/image";
import { useState } from "react";
import { MediaModal } from "./MediaModal";
import { MediaSlider } from "./MediaSlider";

// ImageSliderProps
interface ImageSliderProps {
  images: Array<{ src: string; alt: string }>;
}

// ImageSlider
export const ImageSlider = ({ images }: ImageSliderProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      {/* MediaSlider */}
      <MediaSlider
        items={images}
        getKey={(_, index) => `img-${index}`}
        onItemClick={(_, index) => setSelectedImage(index)}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        renderItem={(image) => (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border/40">
            <Image
              fill
              sizes="100%"
              src={image.src}
              alt={image.alt}
              className="object-cover group-hover:scale-105 transition-transform duration-300 will-change-transform"
            />
          </div>
        )}
      />

      {/* MediaModal */}
      <MediaModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
      >
        {selectedImage !== null && (
          <div className="relative w-full aspect-video">
            <Image
              fill
              priority
              sizes="100%"
              className="object-contain"
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
            />
          </div>
        )}
      </MediaModal>
    </>
  );
};
