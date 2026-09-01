import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/providers/motion-provider";
import { siteConfig } from "@/config/site";
import { MOTION_BOOTSTRAP_SCRIPT } from "@/lib/motion";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

/**
 * LINE Seed JP のみ（§2.0）。フォールバックは sans-serif だけ（DECISION M-20）。
 *
 * npm パッケージの woff2 を next/font/local で self-host する。CDN を挟まないので
 * 追加のオリジンへの接続が要らず、preload と font-display を Next 側で制御できる。
 */
const lineSeedJP = localFont({
  src: [
    {
      path: "../../node_modules/line-seed-jp/woff2/LINESeedJP_OTF_Rg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/line-seed-jp/woff2/LINESeedJP_OTF_Bd.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../node_modules/line-seed-jp/woff2/LINESeedJP_OTF_Eb.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-line-seed-jp",
  fallback: ["sans-serif"],
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: siteConfig.themeColor,
};

const ogImage = {
  url: "/icon-512.png",
  width: 512,
  height: 512,
  alt: siteConfig.name,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
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
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    siteName: siteConfig.name,
    type: "website",
    locale: "ja_JP",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.shortDescription,
    images: [ogImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*
     * suppressHydrationWarning: 下のブートストラップが React より前に <html> へ
     * `js` / `reduced` を足すので、サーバの className とクライアントの実物が必ず食い違う。
     * これは意図した差分で、抑止は 1 階層にしか及ばない（中身の不一致は今までどおり出る）。
     */
    <html lang="ja" className={lineSeedJP.variable} suppressHydrationWarning>
      <body className="bg-ground text-ink font-sans">
        {/* reveal の隠し状態は html.js が付いている間だけ効く（§7 グローバル 5）。
            本文より前に同期で走らせないと、隠れる前の一瞬が見えてしまう。
            font-smoothing は body に置かない — §2.8 は反転地の .on-ink だけに与える */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: 実行前に描画を止める必要があるので、外部ファイルではなくインラインの固定文字列で流し込む */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOTSTRAP_SCRIPT }} />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
