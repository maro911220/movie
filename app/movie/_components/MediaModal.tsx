"use client";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, LucideIcon } from "lucide-react";

// MediaModalProps
interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

// ModalButtonProps
interface ModalButtonProps {
  icon: LucideIcon;
  position: "close";
  onClick: (e: React.MouseEvent) => void;
}

// MediaModal
export const MediaModal = ({ isOpen, onClose, children }: MediaModalProps) => {
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

          {/* 닫기 버튼 */}
          <ModalButton onClick={onClose} icon={X} position="close" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ModalButton Component
const ModalButton = ({ onClick, icon: Icon, position }: ModalButtonProps) => {
  const positionStyles = {
    close: "top-4 right-6",
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
