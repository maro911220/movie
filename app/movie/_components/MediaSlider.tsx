"use client";
import { useState, ReactNode } from "react";
import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/navigation";

// MediaSliderProps
interface MediaSliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  onItemClick?: (item: T, index: number) => void;
  spaceBetween?: number;
  getKey: (item: T, index: number) => string | number;
  breakpoints?: {
    [key: number]: {
      slidesPerView: number;
    };
  };
}

// NavigationButton Props
interface NavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}

// MediaSlider
export function MediaSlider<T>({
  items,
  renderItem,
  onItemClick,
  getKey,
  spaceBetween = 16,
  breakpoints = {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  },
}: MediaSliderProps<T>) {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Swiper 상태 업데이트
  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // 네비게이션 버튼을 보여줄지 결정
  const shouldShowNavigation =
    swiperRef &&
    swiperRef.slides.length > Number(swiperRef.params.slidesPerView);

  return (
    <div className="relative group/slider">
      <Swiper
        slidesPerView={1}
        modules={[Navigation]}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        onSwiper={(swiper) => {
          setSwiperRef(swiper);
          handleSlideChange(swiper);
        }}
        onSlideChange={handleSlideChange}
      >
        {items.map((item, index) => (
          <SwiperSlide key={getKey(item, index)}>
            <div
              className={`group ${onItemClick ? "cursor-pointer" : ""}`}
              onClick={() => onItemClick?.(item, index)}
            >
              {renderItem(item, index)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 네비게이션 버튼 */}
      {shouldShowNavigation && (
        <>
          <NavigationButton
            direction="prev"
            disabled={isBeginning}
            onClick={() => swiperRef.slidePrev()}
          />
          <NavigationButton
            direction="next"
            disabled={isEnd}
            onClick={() => swiperRef.slideNext()}
          />
        </>
      )}
    </div>
  );
}

// NavigationButton Component
const NavigationButton = ({
  direction,
  disabled,
  onClick,
}: NavigationButtonProps) => {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const positionClass = direction === "prev" ? "-left-5" : "-right-5";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        positionClass,
        "absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 cursor-pointer rounded-full flex items-center justify-center opacity-100 md:opacity-0 transition-opacity",
        "bg-stone-800/70 hover:bg-stone-800",
        "group-hover/slider:opacity-100 disabled:opacity-0 disabled:pointer-events-none"
      )}
      aria-label={direction}
    >
      <Icon className="w-5 h-5 text-white" />
    </button>
  );
};
