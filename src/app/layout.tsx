import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/providers/MotionProvider";
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
  themeColor: "#0a4c95",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "ChoTech | 学生エンジニアコミュニティ",
    description:
      "長崎大学 情報データ科学部発の学生エンジニアコミュニティ。共に学び、共に創り、共に発信する。",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "ChoTech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChoTech | 学生エンジニアコミュニティ",
    description:
      "長崎大学 情報データ科学部発の学生エンジニアコミュニティ。共に学び、共に創り、共に発信する。",
    images: ["/icon-512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
