import type { ComponentProps, ComponentType } from "react";
import type { IconProps } from "@/components/icons";
import { Cell } from "@/components/ui/ruled-grid";
import { cn } from "@/lib/utils";

/**
 * Cell Official（§6.11.4 / DECISION U-40）
 *
 * 公的な裏づけ 2 件（長崎大学公認・技育プロジェクト公式パートナー）を 1 セルに集約する
 * （U-14 の趣旨）。旧 1×1 では 2 件を title + body の 1 段落に押し込んでいて、body が
 * 「技育 / プロジェクト」で折れて読めなかった。2×1 に広げ、1 件 = 1 行（図 32 + 題 + 補足）
 * にすると、どちらも同じ強さで並ぶ（旧 U-13 の趣旨を Hero の meta strip から引き継ぐ）。
 *
 * 2 件は同格なので <ul>。各行の題は h3 — 見出しナビゲーションに 2 つの事実がそのまま
 * 並ぶのが正しい（「公認団体」という抽象名詞 1 つより読み手の役に立つ）。
 */

export interface OfficialRow {
  icon: ComponentType<IconProps>;
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
        {/* biome-ignore lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
        {/* biome-ignore lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
        <ul className="flex flex-col gap-stack-md" role="list">
          {rows.map(({ icon: Icon, title, sub }) => (
            // 図は行の先頭、題の 1 行目に揃える（§5.3: 行ボックス中央）。
            // 題 Headline の行ボックス 24 に対して図 32 なので、items-start + 図側を
            // 4px 上げるより、題側を図の中心に寄せる（図が 2 行題の縦中央に来ない）
            <li className="flex items-start gap-inline-md" key={title}>
              <Icon className="size-icon-xl shrink-0" stroke={1.5} />
              <div className="min-w-0">
                <h3 className="text-headline">{title}</h3>
                <p className="mt-stack-2xs text-footnote text-ink-secondary">
                  {sub}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Cell>
  );
}
