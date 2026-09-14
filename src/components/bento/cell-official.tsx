import type { ComponentProps } from "react";
import { FigureRow } from "@/components/bento/figure";
import { Cell } from "@/components/ui/ruled-grid";
import type { AboutIcon } from "@/content/about";
import { cn } from "@/lib/utils";

/**
 * Cell Official（§6.11.4 / DECISION U-40 → U-52）
 *
 * 公的な裏づけ 2 件（長崎大学公認・技育プロジェクト公式パートナー）を 1 セルに集約する
 * （U-14 の趣旨）。2×1 の中を **2 列**に分け、1 件 = 1 列（題 + 補足 → 図）で並べる（U-52。
 * U-40 の「1 件 = 1 行」は、図 32 が行頭で小さく、行の右半分が空いて見えた）。
 * 列は他の文字セルと同じ解剖（題 → stack/md 16 → 図）で、図の円は 2 列で底を揃える
 * （items-end）。Mobile は 1 列に積み、件の間は stack/lg 24。
 *
 * 2 件は同格なので <ul>。各列の題は h3 — 見出しナビゲーションに 2 つの事実がそのまま
 * 並ぶのが正しい（「公認団体」という抽象名詞 1 つより読み手の役に立つ）。
 * パートナーの題は著者改行（技育プロジェクト / 学生団体公式パートナー）で、
 * 列幅 262.5 の中で「技育 / プロジェクト」と割れない。
 */

export interface OfficialRow {
  figure: AboutIcon;
  /** `\n` で意図的に改行してよい */
  title: string;
  sub: string;
}

export interface CellOfficialProps extends ComponentProps<"section"> {
  /** OFFICIAL。見出しにしない（§8.5） */
  kicker: string;
  rows: readonly OfficialRow[];
}

export function CellOfficial({
  kicker,
  rows,
  className,
  ...props
}: CellOfficialProps) {
  return (
    <Cell
      asChild
      className={cn("justify-between gap-stack-md", className)}
      colSpan={2}
    >
      <section {...props}>
        <p className="text-overline text-ink-secondary">{kicker}</p>
        {/* biome-ignore-start lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
        {/* biome-ignore lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
        <ul
          className="grid gap-stack-lg tablet:grid-cols-2 tablet:items-end tablet:gap-x-inline-lg"
          role="list"
        >
          {rows.map(({ figure, title, sub }) => (
            <li className="flex min-w-0 flex-col gap-stack-md" key={title}>
              <div>
                <h3 className="whitespace-pre-line text-headline">{title}</h3>
                <p className="mt-stack-2xs text-footnote text-ink-secondary">
                  {sub}
                </p>
              </div>
              <FigureRow figures={[figure]} />
            </li>
          ))}
        </ul>
        {/* biome-ignore-end lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
      </section>
    </Cell>
  );
}
