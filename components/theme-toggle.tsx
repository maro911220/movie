"use client";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

// constants
const ANIMATION_DISTANCE = 26;
const ICON_SIZE = 18;

// icon option
const iconBaseClass =
  "absolute top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full";

const iconOption = {
  size: ICON_SIZE,
  className: "fill-primary stroke-primary",
};

// ThemeToggle
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-label="모드 전환"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "relative flex-none w-14 h-9 rounded-full cursor-pointer",
        "border border-border shadow-xs bg-background hover:bg-accent",
        "dark:bg-input/30 dark:hover:bg-input/50"
      )}
    >
      <motion.span
        animate={{ x: theme === "dark" ? ANIMATION_DISTANCE : 0 }}
        className={`${iconBaseClass} left-1`}
        aria-hidden="true"
      >
        {theme === "dark" ? <Sun {...iconOption} /> : <Moon {...iconOption} />}
      </motion.span>
      <motion.span
        animate={{ x: theme === "dark" ? -ANIMATION_DISTANCE : 0 }}
        className={`${iconBaseClass} right-1 bg-foreground`}
        aria-hidden="true"
      />
    </button>
  );
}
