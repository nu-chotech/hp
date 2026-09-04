import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import type { ComponentProps } from "react";
import { groupLinkTransition } from "@/components/ui/interaction";
import { Rule } from "@/components/ui/rule";
import { sectionHref, sectionIds, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Brand lockup（§6.6）
 *
 * ロックアップ全体が 1 つのリンク（§6.6「全体が `#hero` へのリンク」= ページ先頭へ戻る）。
 * mark ─ 12 ─ wordmark ─ 12 ─ 縦 hairline ─ 12 ─ tagline を等間隔で並べる（L-12）。
 * 状態を持つのは wordmark だけ: mark と tagline は動かさない —
 * 印（ロゴ）と添え字が状態で変わると、何が押せるのかが分からなくなる。
 */

const brandLockup = cva(
  [
    "group relative inline-flex w-fit items-center gap-inline-sm no-underline",
    // ヒット領域は視覚ボックスを変えずに ::before で 44 高へ（§8.3「ブランドリンク」）。
    // 箱を大きくしないので、隣の Nav 項目の拡張領域と重ならない
    "before:absolute before:-inset-x-1",
    "cursor-pointer [-webkit-tap-highlight-color:transparent]",
  ],
  {
    variants: {
      // 上下の拡張量は size ごとに違う。視覚ボックスは wordmark の行ボックスが決める
      // （Nav: Title 3 の 26 > mark 24、Footer: Headline の 24 > mark 20、L-30）ので、
      // 44 にするには Nav ±9、Footer ±10 が要る。
      // 必要なのは「44 になること」であって特定の数値ではない
      size: {
        nav: "text-ink before:-inset-y-2.25",
        footer: "text-ink before:-inset-y-2.5",
      },
    },
    defaultVariants: { size: "nav" },
  },
);

const brandMark = cva("shrink-0", {
  variants: {
    size: { nav: "size-mark-nav", footer: "size-mark-footer" },
  },
  defaultVariants: { size: "nav" },
});

const brandWordmark = cva(
  [
    // 静止時は下線なし。状態は太さだけで示し、文字色はホバーで動かさない（C-16 / §6.1.6）
    "no-underline [text-decoration-skip-ink:none]",
    // 名前は 1 語。狭い帯で flex に縮められても途中で折らない（§6.7.2）
    "whitespace-nowrap",
    "group-hover:underline group-hover:decoration-link-hover",
    "group-hover:decoration-(length:--stroke-underline-strong)",
    // タッチには hover が無いので、押下でも自分で下線を出す（K-3 改）
    "group-active:underline group-active:text-link-pressed",
    "group-active:decoration-link-hover",
    "group-active:decoration-(length:--stroke-underline-strong)",
    groupLinkTransition,
  ],
  {
    variants: {
      size: { nav: "text-title-3", footer: "text-headline" },
    },
    defaultVariants: { size: "nav" },
  },
);

/**
 * 表示寸法を決めるのは size/mark-* トークン（class）で、この数値は
 * next/image に内在比率を伝えて CLS を防ぐためだけのもの（§6.19）。
 */
const MARK_INTRINSIC = { nav: 24, footer: 20 } as const;

export interface BrandProps
  extends Omit<ComponentProps<"a">, "children">,
    VariantProps<typeof brandLockup> {
  /**
   * タグラインを出すか。Nav は Mobile で落とす（幅の検算 §6.7.2）ので、
   * 既定は「desktop から出す」。Footer は常に出す。
   */
  showTagline?: boolean | "desktop";
}

export function Brand({
  size = "nav",
  showTagline = size === "footer" ? true : "desktop",
  // §6.6 の行き先は Hero（`#main` は §8.5 のスキップリンクの行き先で、
  // ブランドと役割が違う）。id の実体は config/site.ts が持つ
  href = sectionHref(sectionIds.hero),
  className,
  ...props
}: BrandProps) {
  const markSize = MARK_INTRINSIC[size ?? "nav"];

  return (
    <a href={href} className={cn(brandLockup({ size }), className)} {...props}>
      {/* ロゴは装飾。リンクの名前は wordmark の文字が運ぶ（§8.6）。
          favicon.svg は余白込み（図が箱の 65%）なので lockup には使わない —
          図の外接矩形で切った mark.svg を置くと、gap 12 が見た目どおりの 12 になる（L-30） */}
      <Image
        src="/icons/mark.svg"
        alt=""
        width={markSize}
        height={markSize}
        // SVG は最適化に通さない（next.config の dangerouslyAllowSVG に依存させない）
        unoptimized
        priority={size === "nav"}
        className={brandMark({ size })}
      />
      <span className={brandWordmark({ size })}>{siteConfig.name}</span>
      {showTagline === false ? null : (
        // display: contents で、罫とタグラインが親の gap 12 にそのまま並ぶ。
        // desktop 未満では箱ごと消えるので、隙間も残らない
        <span
          className={cn(
            "items-center gap-inline-sm",
            showTagline === "desktop" ? "hidden desktop:contents" : "contents",
          )}
        >
          <Rule orientation="vertical" weight="hair" />
          {/* 英文なので lang を付ける（§8.7） */}
          <span lang="en" className="text-caption-bold text-ink-secondary">
            {siteConfig.tagline}
          </span>
        </span>
      )}
    </a>
  );
}

export { brandLockup };
