"use client";
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Header
export const Header = () => {
  const [searchParams, setSearchParams] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 검색 함수
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const value = searchParams.trim();

    if (value === "") {
      setIsAlertOpen(true);
      return;
    }

    router.push(`/search/${value}`);
    setIsAlertOpen(false);
  };

  // 1.5초 뒤 alert 제거
  useEffect(() => {
    if (isAlertOpen) {
      const timer = setTimeout(() => {
        setIsAlertOpen(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAlertOpen]);

  // 홈으로 이동시 검색어 초기화
  useEffect(() => {
    if (pathname === "/") {
      setSearchParams("");
    }
  }, [pathname]);

  return (
    <header className="w-full h-26 sm:h-20 px-6 sticky top-0 left-0 z-20 bg-background/70 backdrop-blur-lg">
      {/* header content */}
      <div className="max-w-header h-full mx-auto flex items-center justify-between content-center flex-wrap sm:flex-nowrap gap-2">
        {/* header title */}
        <h1 className="flex-none text-3xl sm:text-4xl font-bold fs-sekuya">
          <Link href="/">Movie</Link>
        </h1>
        {/* header form */}
        <div className="w-full flex flex-none sm:flex-1 items-center justify-end order-last sm:order-0">
          <form
            onSubmit={handleSearch}
            className="w-full sm:w-auto relative flex gap-2"
          >
            <Input
              type="text"
              value={searchParams}
              aria-label="검색어 입력"
              placeholder="제목을 입력하세요"
              className="bg-background flex-1"
              onChange={(e) => setSearchParams(e.target.value)}
            />
            <Button type="submit" variant="outline">
              검색
            </Button>
            <AnimatePresence>
              {isAlertOpen && (
                <motion.div
                  key="alert"
                  exit={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: -10 }}
                  className="absolute top-10 left-0 w-full z-50 shadow-lg"
                >
                  <Alert>
                    <AlertDescription className="text-red-500">
                      검색어를 입력해주세요.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
        {/* header theme toggle */}
        <div className="flex items-center flex-none gap-1">
          <ThemeToggle />
          <Button
            asChild
            size="icon"
            variant="outline"
            className="rounded-full"
          >
            <a href="https://github.com/maro911220" target="_blank">
              <GithubIcon />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
