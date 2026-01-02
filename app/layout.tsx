import "./globals.css";
import { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./provider";
import { Header } from "@/components/layout/header";

// 폰트 설정
const suit = localFont({
  src: [
    {
      path: "./fonts/SUIT-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SUIT-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SUIT-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const Sekuya = localFont({
  src: [
    {
      path: "./fonts/Sekuya-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

// 메타 정보
const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://maro-movie.vercel.app/";
const title = "Maro Movies";
const description = "영화 정보 페이지 입니다.";

// 사이트 메타데이터 설정
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title,
    siteName: title,
    url,
    description,
    images: [
      {
        url: "/tumb.jpg",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
};

// RootLayout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${suit.className} antialiased`}>
        <Providers>
          <Header />
          <main className="p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
