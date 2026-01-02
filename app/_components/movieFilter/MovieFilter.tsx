"use client";
import { SortSelect } from "./SortSelect";
import { GenreFilter } from "./GenreFilter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Funnel, XIcon } from "lucide-react";
import { SortOption } from "@/types/movie";

// MovieFilter Props
interface MovieFilterProps {
  selectedGenres: number[];
  onGenreChange: (genres: number[]) => void;
  sortBy?: SortOption;
  setSortBy?: (value: SortOption) => void;
}

// FilterContent Props
interface FilterContentProps extends Omit<MovieFilterProps, "onGenreChange"> {
  isMobile: boolean;
  toggleFilter: () => void;
  onGenreChange: (genres: number[]) => void;
}

// MovieFilter
export const MovieFilter = ({
  sortBy,
  setSortBy,
  onGenreChange,
  selectedGenres,
}: MovieFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const toggleFilter = () => setIsOpen(!isOpen);

  // 필터 요소
  const filterContentProps = {
    sortBy,
    isMobile,
    setSortBy,
    toggleFilter,
    onGenreChange,
    selectedGenres,
  };

  // 모바일 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* PC */}
      {!isMobile && (
        <article
          className={cn(
            "flex flex-none flex-col z-50 sticky top-26",
            "overflow-auto pr-2 md:pr-4 gap-6 w-40 md:w-60 h-auto max-h-[calc(100vh-8rem)]"
          )}
        >
          <FilterContent {...filterContentProps} />
        </article>
      )}
      {/* Mobile */}
      {isMobile && <FilterToggle onToggle={toggleFilter} />}
      {isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.article
              exit={{ opacity: 0, y: 8 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex flex-none flex-col fixed z-50",
                "w-3/4 max-h-1/2 border shadow-lg overflow-auto bottom-8 right-8 p-4 bg-background/90 backdrop-blur-md rounded-lg gap-4"
              )}
            >
              <FilterContent {...filterContentProps} />
            </motion.article>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

// FilterContent Component
const FilterContent = ({
  sortBy,
  isMobile,
  setSortBy,
  toggleFilter,
  onGenreChange,
  selectedGenres,
}: FilterContentProps) => (
  <>
    <h3 className="sr-only">필터 목록</h3>
    {isMobile && <CloseButton onClose={toggleFilter} />}
    {sortBy && setSortBy && <SortSelect value={sortBy} onChange={setSortBy} />}
    <GenreFilter
      onGenreChange={onGenreChange}
      selectedGenres={selectedGenres}
    />
  </>
);

// FilterToggle Component
const FilterToggle = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <Button
      size="icon-lg"
      variant="link"
      className="rounded-full border-white/20 border shadow bg-point fixed bottom-4 right-4 z-10"
      onClick={onToggle}
    >
      <Funnel />
      <span className="sr-only">필터 토글</span>
    </Button>
  );
};

// CloseButton Component
const CloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <Button
      size="icon-sm"
      variant="ghost"
      onClick={onClose}
      className="fixed top-3 right-4 z-50 rounded-full sm:hidden"
    >
      <XIcon />
      <span className="sr-only">필터 닫기</span>
    </Button>
  );
};
