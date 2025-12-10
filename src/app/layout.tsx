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
  title: "ChoTech | 学生エンジニアコミュニティ",
  description:
    "ChoTechは学生エンジニアが集まり、技術を学び、共に成長するコミュニティです。",
  keywords: ["ChoTech", "学生エンジニア", "プログラミング", "コミュニティ"],
  openGraph: {
    title: "ChoTech | 学生エンジニアコミュニティ",
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
