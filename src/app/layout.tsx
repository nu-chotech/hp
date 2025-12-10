import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
