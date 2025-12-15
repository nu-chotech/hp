import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "ChoTech | 学生エンジニアコミュニティ",
  description:
    "長崎大学 情報データ科学部発の学生エンジニアコミュニティ。共に学び、共に創り、共に発信する仲間と一緒に、技術を学ぶ・作る・話すを気軽に楽しめます。",
  keywords: ["ChoTech", "学生エンジニア", "プログラミング", "コミュニティ"],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ChoTech",
  },
  openGraph: {
    title: "ChoTech | 学生エンジニアコミュニティ",
    description:
      "長崎大学 情報データ科学部発の学生エンジニアコミュニティ。共に学び、共に創り、共に発信する。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChoTech | 学生エンジニアコミュニティ",
    description:
      "長崎大学 情報データ科学部発の学生エンジニアコミュニティ。共に学び、共に創り、共に発信する。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
