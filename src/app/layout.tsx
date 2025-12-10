import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechCommunity | 学生エンジニアコミュニティ",
  description:
    "学生エンジニアが集まり、技術を学び、共に成長するコミュニティです。Web開発、AI/ML、モバイルアプリなど様々な分野で活動しています。",
  keywords: [
    "学生エンジニア",
    "プログラミング",
    "Web開発",
    "AI",
    "機械学習",
    "コミュニティ",
  ],
  openGraph: {
    title: "TechCommunity | 学生エンジニアコミュニティ",
    description:
      "学生エンジニアが集まり、技術を学び、共に成長するコミュニティです。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
