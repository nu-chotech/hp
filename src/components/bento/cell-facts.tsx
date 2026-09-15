import type { ComponentProps } from "react";
import { Figure } from "@/components/bento/figure";
import { Cell, type CellProps } from "@/components/ui/ruled-grid";
import type { AboutFigure } from "@/content/about";
import { cn } from "@/lib/utils";

/**
 * Cell Facts（FOR EVERYONE / FORMAT、§6.11.2 / DECISION U-56）
 *
 * 「語を連れた緑の円」を並べるセル。U-52 までの Cell Text（題が語り、図が題の下で繰り返す）を
 * 置き換えるもので、**数え上げられる事実**（職能が 4 つ／場が 2 つ）を図そのものが言う。
 *
 * 面積で 2 つの形を持つ。どちらもキッカーが天、残りを図が埋める（`flex-1`）。
 *
 * | | 題 | 図の並び | 語 |
 * |---|---|---|---|
 * | FOR EVERYONE | 「誰でも歓迎。」`Title/2` | 1×1 は 2×2 の格子（gap 24）／2×1（wide だけ）は題の右に横一列（gap 16） | `Footnote/Bold` 13 |
 * | FORMAT | なし | 常に中央に横一列（Mobile gap 32 / Desktop 24） | `Title/3` 19 |
 *
 * 題が有るか無いかで語の段も決まる。4 つ並ぶ列は語が円より広くなる（「サイエンティスト」
 * 8 全角 = 104 > 80）ので 13 に落とし、2 つだけの FORMAT は円と釣り合う 19 で置く。
 * wide の 2×1（内側 549）の検算: 題 132 + 24 + 図の列 392（80 + 80 + 80 + 104 + 16 × 3）= 548。
 *
 * 語は content の一部なので `<ul>` / `<li>`（図の行ぜんたいを `aria-hidden` にしていた U-52 とは
 * 逆）。アイコンだけが装飾で、それは icons.tsx が一律に `aria-hidden` を付けている。
 */

export interface CellFactsProps
  extends Omit<ComponentProps<"section">, "title"> {
  /** FOR EVERYONE / FORMAT。見出しにしない（§8.5） */
  kicker: string;
  /** 題。渡さないときは図だけを面の中央に置く（FORMAT） */
  title?: string;
  figures: readonly AboutFigure[];
  colSpan?: CellProps["colSpan"];
  className?: string;
}

export function CellFacts({
  kicker,
  title,
  figures,
  colSpan,
  className,
  ...props
}: CellFactsProps) {
  const items = figures.map((figure) => (
    <li key={figure.icon}>
      <Figure figure={figure} size={title ? "sm" : "md"} />
    </li>
  ));

  return (
    <Cell
      asChild
      className={cn("gap-stack-lg", className)}
      colSpan={colSpan}
      surface="ground"
    >
      <section {...props}>
        <p className="text-overline text-ink-secondary">{kicker}</p>

        {/* biome-ignore-start lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
        {/* biome-ignore-start lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
        {title ? (
          <div className="flex flex-1 flex-col gap-stack-lg wide:flex-row wide:items-center wide:justify-between wide:gap-inline-lg">
            <h3 className="min-w-0 text-title-2">{title}</h3>
            <ul
              className="grid grid-cols-2 gap-inline-lg wide:flex wide:shrink-0 wide:gap-inline-md"
              role="list"
            >
              {items}
            </ul>
          </div>
        ) : (
          <ul
            className="flex flex-1 items-center justify-center gap-inline-xl tablet:gap-inline-lg"
            role="list"
          >
            {items}
          </ul>
        )}
        {/* biome-ignore-end lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
        {/* biome-ignore-end lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
      </section>
    </Cell>
  );
}
