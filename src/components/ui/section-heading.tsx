import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * セクション見出し（§6.10）
 *
 * 和文の題が先、欧文ラベルが後（DECISION U-4）。節の意味を運ぶのは和文で、
 * 英字は調子付けなので、視線の最初の一撃を強い方に渡す。連番は持たない。
 *
 * ground 面専用（§6.10 が挙げるのは ABOUT / ACTIVITY / FOR YOU / MEMBERS / PARTNERS の
 * 5 節だけで、どれも ground）。h2 は面から色を継ぐが欧文ラベルは ink-secondary 固定なので、
 * 反転面・ポスター面に置くと 1.9:1 まで落ちる。色面の見出しはその面の部品が自分で持つ。
 *
 * 横並び（ベースライン揃え）に開くのは tablet 48rem から — トークンのモードが
 * 切り替わる点と同じ（DECISION L-34 / L-36。旧 L-29 では desktop 78rem だった）。
 * 最長の題「こんな人におすすめ！」10 字 × Title/1 28.2 + 16 + ラベル ≈ 360 ≤ 720。
 */
const sectionHeadingVariants = cva(
  "flex flex-col gap-stack-xs tablet:flex-row tablet:items-baseline tablet:gap-inline-md",
  {
    variants: {
      /** 見出しの下に何が来るか。§3.9「section 内の順序」の 3 通り */
      spacing: {
        grid: "mb-section-heading-mb",
        intro: "mb-section-heading-mb-intro",
        /** hairline の行リスト。行が自前で inset/row 32 を持つので詰める */
        list: "mb-section-heading-mb-list",
      },
    },
    defaultVariants: {
      spacing: "grid",
    },
  },
);

export interface SectionHeadingProps
  // title は div の tooltip 属性と衝突するので、見出し文言として奪う
  extends Omit<ComponentProps<"div">, "title">,
    VariantProps<typeof sectionHeadingVariants> {
  title: string;
  /** ABOUT / ACTIVITY / FOR YOU / MEMBERS / PARTNERS。単語レベルの英語に lang は付けない（§8.7） */
  label: string;
  /** <section aria-labelledby> から参照される h2 の id */
  titleId?: string;
}

export function SectionHeading({
  title,
  label,
  titleId,
  spacing,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(sectionHeadingVariants({ spacing }), className)}
      {...props}
    >
      {/* 文字色は面から継ぐ（この部品は ground 専用なので実際には ink）。
          tabIndex=-1 はアンカー移動後にフォーカスを運ぶため（§7.4.6 / WCAG 2.4.3）。
          プログラム的な focus() は :focus-visible にならないのでリングは出ない */}
      <h2
        id={titleId}
        tabIndex={-1}
        className={cn("text-title-1", title.startsWith("「") && "trim-start")}
      >
        {title}
      </h2>
      {/* 見出しにしない（§8.5）。欧文ラベルは階層を作らない添え物 */}
      <p className="text-overline text-ink-secondary">{label}</p>
    </div>
  );
}

export { sectionHeadingVariants };
