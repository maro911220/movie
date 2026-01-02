"use client";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";

// MediaModalProps
interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  totalItems: number;
  onPrevious?: () => void;
  onNext?: () => void;
  children: ReactNode;
  title?: string;
}

// NavigationButtonProps
interface NavigationButtonProps {
  onNext?: () => void;
  onPrevious?: () => void;
  currentIndex: number;
  totalItems: number;
}

// ModalButtonProps
interface ModalButtonProps {
  onClick: (e: React.MouseEvent) => void;
  icon: LucideIcon;
  position: "close" | "prev" | "next";
}

// MediaModal
export const MediaModal = ({
  isOpen,
  onClose,
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  children,
}: MediaModalProps) => {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleBackgroundClick}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        >
          {/* 콘텐츠 컨테이너 */}
          <div className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center">
            {children}
          </div>

          {/* 카운터 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-20">
            {currentIndex + 1} / {totalItems}
          </div>

          {/* 닫기 버튼 */}
          <ModalButton onClick={onClose} icon={X} position="close" />

          {/* 네비게이션 버튼 */}
          <NavigationButtons
            onNext={onNext}
            onPrevious={onPrevious}
            currentIndex={currentIndex}
            totalItems={totalItems}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// NavigationButtons Component
const NavigationButtons = ({
  onNext,
  onPrevious,
  currentIndex,
  totalItems,
}: NavigationButtonProps) => {
  return (
    <>
      {onPrevious && currentIndex > 0 && (
        <ModalButton
          icon={ChevronLeft}
          position="prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
        />
      )}
      {onNext && currentIndex < totalItems - 1 && (
        <ModalButton
          icon={ChevronRight}
          position="next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        />
      )}
    </>
  );
};

// ModalButton Component
const ModalButton = ({ onClick, icon: Icon, position }: ModalButtonProps) => {
  const positionStyles = {
    close: "top-4 right-6",
    prev: "left-6 top-1/2 -translate-y-1/2",
    next: "right-6 top-1/2 -translate-y-1/2",
  };

  return (
    <button
      onClick={onClick}
      aria-label={position}
      className={cn(
        positionStyles[position],
        "absolute z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer",
        "bg-stone-800/70 hover:bg-stone-800",
        "sm:w-12 sm:h-12"
      )}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    </button>
  );
};
