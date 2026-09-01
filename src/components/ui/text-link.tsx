import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { ArrowUpRight } from "@/components/icons";
import { linkTransition } from "@/components/ui/interaction";
import { cn } from "@/lib/utils";

/**
 * Link（§6.3）
 *
 * 状態は「下線の有無・太さ・色 ＋ プレス時の文字色」だけで作る（§6.1.6）。
 * ホバーで文字色を動かさないのは、アクセントを一時的な状態の印にしないため（C-16）。
 * 下線は text-decoration で引く。border-bottom は折返し行と text-underline-offset に
 * 追従できないので使わない（§4.2）。太さは静止 2px / 状態 3px（U-2）で、変わるのは
 * text-decoration-thickness だけなので状態が変わってもレイアウトは動かない（G9）。
 *
 * 静止時の下線を持つのは inline だけ。他の 3 つは @layer base の `a` を no-underline で
 * 打ち消してから hover 以降に出す。
 */
const textLink = cva(
  [
    // G14。skip-ink を切って下線を「線」として読ませる（§6.1.6）。
    // Tailwind v4 に decoration-skip-ink ユーティリティが無いので任意プロパティで書く
    "cursor-pointer [text-decoration-skip-ink:none]",
    // 色と下線は入り 100ms / 抜け 200ms、押下だけ即時（G6・G2）。outline は含めない（G4）
    linkTransition,
  ],
  {
    variants: {
      variant: {
        /* ナビ: 文字色は body の ink を継ぐ（ナビ帯は ground 面）。持続状態は current で別に持つ */
        nav: [
          "relative inline-flex items-center gap-inline-xs no-underline text-label-nav",
          // 行ボックス 20 を ::before で 44 高に広げる。要素の箱は大きくならないので
          // 隣接 gap inline/md 16 のうち 8 が残る（§6.1.5・G8）
          "before:absolute before:-inset-x-1 before:-inset-y-3",
          "hover:underline hover:decoration-link-hover hover:decoration-(length:--stroke-underline-strong)",
          // タッチでは hover が無いので、押下でも下線を自分で出す（K-3 改）
          "active:underline active:text-link-pressed active:decoration-link-hover active:decoration-(length:--stroke-underline-strong)",
        ],
        /* フッター: 静止は一段落とした ink-secondary、ホバーで ink まで上げる。下線は currentColor */
        footer: [
          "relative inline-flex items-center gap-inline-xs no-underline text-ink-secondary text-footnote",
          "before:absolute before:-inset-x-1 before:-inset-y-3",
          "hover:underline hover:text-ink hover:decoration-(length:--stroke-underline-strong)",
          "active:underline active:text-link-pressed active:decoration-(length:--stroke-underline-strong)",
        ],
        /* ソーシャル: ポスター面の上。フォーカスリング色は data-surface="poster" から継ぐので指定しない */
        social: [
          "relative inline-flex items-center gap-inline-xs no-underline text-poster-ink-secondary text-overline",
          // Overline の行ボックスは 16 なので ±14 で 44（§6.1.5）
          "before:absolute before:-inset-x-1 before:-inset-y-3.5",
          "hover:underline hover:text-inverse-link-hover hover:decoration-(length:--stroke-underline-strong)",
          // 暗い面にはアクセント文字を置けないので Pressed は Hover と同じ表現（R5）
          "active:underline active:text-inverse-link-hover active:decoration-(length:--stroke-underline-strong)",
        ],
        /* インライン: 段落の中。サイズも文字色も本文を継ぎ、Bold と常時下線だけで差をつける */
        inline: [
          "font-bold underline decoration-(length:--stroke-underline)",
          "hover:decoration-(length:--stroke-underline-strong)",
          "active:text-link-pressed active:decoration-(length:--stroke-underline-strong)",
        ],
      },
      /** aria-current。ナビだけが持つ持続状態（§6.1.1） */
      current: {
        true: "",
        false: "",
      },
      /**
       * 段落の中ではなく単独で立つ inline リンク（Partner セルの「パートナーになる」）。
       * 行内リンクは WCAG 2.5.8 の例外だが、単独で立つ瞬間に例外から外れるので
       * Footer と同じ拡張で 44 にする（§6.1.5 の表 / §8.3）。
       */
      standalone: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "inline",
        standalone: true,
        // 行ボックス 20 を ±12 で 44 に。セル内に余白があるので周囲と競合しない
        class:
          "relative inline-flex items-center gap-inline-xs before:absolute before:-inset-x-1 before:-inset-y-3",
      },
      {
        variant: "nav",
        current: true,
        // 持続状態にアクセントを使わない → ink の 3px 下線（K-4 改）。
        // hover の擬似クラスの方が詳細度が高いので、乗っている間は link/hover が勝つ。
        class:
          "underline decoration-link-current decoration-(length:--stroke-underline-strong)",
      },
    ],
    defaultVariants: { variant: "inline", current: false, standalone: false },
  },
);

/**
 * 外部リンクの矢印（§6.1.9）。許される送りは 2 つだけ — 文中の 4 と、
 * コントロール状に並ぶときの 8。
 *
 * 送りを「どの variant か」ではなく「余白を誰が持つか」で切るのは、
 * 単独 inline リンク（Partner セル）が inline-flex + gap 8 を持つため:
 * そこに文中用の margin 4 を足すと 12 になり、どちらでもない値になる。
 */
const textLinkIcon = cva("size-icon-sm", {
  variants: {
    spacing: {
      // 段落内は flex にできない（折返しが壊れる）ので、gap ではなく margin で 4 を作る
      inflow: "ms-inline-icon align-middle",
      // 親が inline-flex で gap を持つ側。ここで margin を足さない
      gap: "",
    },
  },
  defaultVariants: { spacing: "gap" },
});

export interface TextLinkProps
  extends ComponentProps<"a">,
    VariantProps<typeof textLink> {
  /**
   * 外部サイトへ出るリンク。target="_blank" は付けない — 新しいタブで開くかは
   * ユーザーが決める（§6.3.2・§8.5）。代わりに読み上げ用の「（外部）」と
   * arrow-up-right を添える。
   */
  external?: boolean;
}

export function TextLink({
  variant,
  current,
  standalone,
  external = false,
  className,
  children,
  ...props
}: TextLinkProps) {
  return (
    <a
      // 仕様の指定どおり "page" ではなく "true"（§6.1.1）
      aria-current={current ? "true" : undefined}
      className={cn(textLink({ variant, current, standalone }), className)}
      {...props}
    >
      {children}
      {external ? (
        <>
          <span className="sr-only">（外部）</span>
          <ArrowUpRight
            className={textLinkIcon({
              spacing: variant === "inline" && !standalone ? "inflow" : "gap",
            })}
          />
        </>
      ) : null}
    </a>
  );
}
