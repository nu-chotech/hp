import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** ロゴのサイズ (default: 40) */
  size?: number;
  /** サブタイトルを表示するか (default: true) */
  showSubtitle?: boolean;
  /** サブタイトルをモバイルで非表示にするか (default: false) */
  hideSubtitleOnMobile?: boolean;
  /** リンク先 (default: "/") */
  href?: string;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * 共通ロゴコンポーネント
 * Header, Footer, Mobile Menu で使用
 */
export function Logo({
  size = 40,
  showSubtitle = true,
  hideSubtitleOnMobile = false,
  href = "/",
  className,
}: LogoProps) {
  return (
    <Link href={href} className={cn("flex items-center gap-3", className)}>
      <Image
        src="/icon.png"
        alt={siteConfig.name}
        width={size}
        height={size}
        className="rounded-lg"
      />
      <div className="flex flex-col">
        {showSubtitle && (
          <span
            className={cn(
              "text-xs text-muted-foreground",
              hideSubtitleOnMobile && "hidden sm:block",
            )}
          >
            {siteConfig.description}
          </span>
        )}
        <span className="font-bold text-lg leading-tight">
          {siteConfig.name}
        </span>
      </div>
    </Link>
  );
}
