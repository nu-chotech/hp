import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Cell } from "@/components/ui/ruled-grid";
import { cn } from "@/lib/utils";

/**
 * Cell Text（§6.11.2）
 *
 * キッカーが上、題が下。間は space-between で開ける — セルの高さは同じ行で最も高い
 * セルが決めるので、内容の量に関わらず「キッカーは天、題は地」という位置関係だけが
 * 残るようにする。行が伸びてもセルの表情が変わらない。
 *
 * 題の大きさはセルの面積に従う（2×1 = Title/2、1×1 中 = Title/3、1×1 小 = Headline）。
 * 面積が優先順位を示す部品なので、大きいセルの題が小さいと格が逆転して読める。
 */

const titleVariants = cva(
  // 題は `\n` で意図的に語割りする（ポスターの改行）。CSS 側で改行を保つ
  "whitespace-pre-line",
  {
    variants: {
      size: {
        "2x1": "text-title-2",
        "1x1-md": "text-title-3",
        "1x1-sm": "text-headline",
      },
    },
    defaultVariants: { size: "1x1-md" },
  },
);

const kickerVariants = cva("text-overline", {
  variants: {
    tone: {
      ground: "text-ink-secondary",
      // インク面の階層はアルファで作る。キッカーは tertiary 72%（8.29）
      ink: "text-inverse-ink-tertiary",
    },
  },
  defaultVariants: { tone: "ground" },
});

const bodyVariants = cva("mt-stack-xs whitespace-pre-line text-body-s", {
  variants: {
    tone: {
      ground: "text-ink-secondary",
      ink: "text-inverse-ink-secondary",
    },
  },
  defaultVariants: { tone: "ground" },
});

export interface CellTextProps // title は section の tooltip 属性と衝突するので、題として奪う
  extends Omit<ComponentProps<"section">, "title">,
    VariantProps<typeof titleVariants> {
  /** 英語 1–2 語（CULTURE / OFFICIAL / ONLINE & OFFLINE / FOR EVERYONE）。大文字化は CSS */
  kicker: string;
  /** `\n` で意図的に改行してよい。`「` 始まりは左端を揃える（trim-start） */
  title: string;
  /** §6.11.2 の showBody。全 Kind で使える（DECISION U-14） */
  body?: string;
  /** ライブラリの Tone。ページで使うのは ground（インク面は Stat と CTA が持つ） */
  tone?: VariantProps<typeof kickerVariants>["tone"];
  /** 2×1 のときだけ 2。tablet 以上で効く */
  colSpan?: 1 | 2;
}

export function CellText({
  kicker,
  title,
  body,
  size,
  tone = "ground",
  colSpan,
  className,
  ...props
}: CellTextProps) {
  return (
    // ベントは異種の内容が並ぶので <ul> ではなく <section> 群（§8.5）。
    // 名前を持たない section は generic に落ちるためランドマークは増えず、
    // 見出し（h3）でのナビゲーションだけが残る
    <Cell
      asChild
      className={cn("justify-between gap-stack-md", className)}
      colSpan={colSpan}
      surface={tone}
    >
      <section {...props}>
        <p className={kickerVariants({ tone })}>{kicker}</p>
        <div>
          <h3
            className={cn(
              titleVariants({ size }),
              title.startsWith("「") && "trim-start",
            )}
          >
            {title}
          </h3>
          {body ? <p className={bodyVariants({ tone })}>{body}</p> : null}
        </div>
      </section>
    </Cell>
  );
}
