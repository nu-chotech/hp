import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { FigureRow } from "@/components/bento/figure";
import { Cell } from "@/components/ui/ruled-grid";
import type { AboutIcon } from "@/content/about";
import { cn } from "@/lib/utils";

/**
 * Cell Text（§6.11.2）
 *
 * キッカーが天、題が地。間は space-between で開ける — セルの高さは同じ行で最も高い
 * セルが決めるので、内容の量に関わらず「キッカーは天、題は地」という位置関係だけが
 * 残るようにする。行が伸びてもセルの表情が変わらない。
 *
 * 題の下に図（Bento / Figure: 緑の円 64 の中の白い Tabler 32）を並べる（DECISION U-52。
 * U-40 の「題の上に線画 32」は存在感が無く、セルの文字が面積に対して小さく見えた）。
 * 図は題と 1 つの塊（stack/md 16）にして地に置く — 天・中・地の 3 段に散らすと、行が
 * 伸びたとき図だけが中空に浮く。解剖は全セル同じ: kicker（天）／ [題 → 図]（地）。
 *
 * 題の大きさはセルの面積に従う（2×1 = Title/2、1×1 中 = Title/3、1×1 小 = Headline）。
 * 面積が優先順位を示す部品なので、大きいセルの題が小さいと格が逆転して読める。
 * 2×1 の statement（CULTURE）だけ Display/M — 節の主張を 1 枚で言い切るセル（U-46）。
 * 1×1 lg（SINCE）は Title/1 — 日付 1 語のセルで、Title/3 では 1×1 の中で文字が小さく見えた（U-52）。
 *
 * 可視の題が文の一部（「仲間と、」「2025年4月」）のときは accessibleTitle に全文を渡す。
 * 可視側は aria-hidden、読み上げは sr-only の全文（CellStat の 50+ と同じ形）。
 */

const titleVariants = cva(
  // 題は `\n` で意図的に語割りする（ポスターの改行）。CSS 側で改行を保つ
  "whitespace-pre-line",
  {
    variants: {
      size: {
        "2x1-statement": "text-display-m",
        "2x1": "text-title-2",
        // Mobile の MEMBERS · SINCE ペア（168、内側 128）では Title/2 22 — 「2025年4月」5.525em = 121.5 ≤ 128（L-35）
        "1x1-lg": "text-title-2 tablet:text-title-1",
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
  /** 英語 1–2 語（CULTURE / ONLINE & OFFLINE / FOR EVERYONE）。大文字化は CSS */
  kicker: string;
  /** `\n` で意図的に改行してよい。`「` 始まりは左端を揃える（trim-start） */
  title: string;
  /** 可視の題が文の一部のとき、見出しの読み上げ名に渡す全文（U-52） */
  accessibleTitle?: string;
  /** §6.11.2 の showBody。全 Kind で使える（DECISION U-14） */
  body?: string;
  /** 題の下に並べる図（U-52）。順序は題の語順。円は全セル 64 */
  figures?: readonly AboutIcon[];
  /** ライブラリの Tone。ページで使うのは ground（インク面は Stat が持つ） */
  tone?: VariantProps<typeof kickerVariants>["tone"];
  /** 2×1 のときだけ 2。段ごとの効き方は ruled-grid.tsx の colSpan を見る */
  colSpan?: 1 | 2 | "2-desktop-only";
}

export function CellText({
  kicker,
  title,
  accessibleTitle,
  body,
  figures,
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
        <div className="flex flex-col gap-stack-md">
          <div>
            <h3
              className={cn(
                titleVariants({ size }),
                title.startsWith("「") && "trim-start",
              )}
            >
              {accessibleTitle ? (
                <>
                  <span aria-hidden="true">{title}</span>
                  <span className="sr-only">{accessibleTitle}</span>
                </>
              ) : (
                title
              )}
            </h3>
            {body ? <p className={bodyVariants({ tone })}>{body}</p> : null}
          </div>
          {figures && figures.length > 0 ? (
            <FigureRow figures={figures} />
          ) : null}
        </div>
      </section>
    </Cell>
  );
}
