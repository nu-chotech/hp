import type { ComponentProps } from "react";
import { Photo } from "@/components/icons";
import { ImageSlot } from "@/components/ui/image-slot";
import { Cell, type CellProps } from "@/components/ui/ruled-grid";
import { cn } from "@/lib/utils";

/**
 * Cell Official（§6.11.4 / DECISION U-40 → U-52 → U-56）
 *
 * 公的な裏づけ 2 件（長崎大学公認・技育プロジェクト公式パートナー）を 1 セルに集約する
 * （U-14 の趣旨）。2×1 の中を 2 列に分け、1 件 = 1 列（**ロゴ板** → 題 → 補足）で並べる。
 *
 * **U-56 でロゴ板になった。** U-52 の図（school / heart-handshake の緑の円）は、こちらで
 * 選んだアイコンが団体の代わりに喋っている状態だった。裏づけを語るのは相手の意匠なので、
 * `logo-ground`（白）の板に実素材を置く — Partners（U-43）やマーキー（U-30）と同じ扱いで、
 * 素材は 3:2 の白キャンバスに正規化済み（`pnpm generate:partner-logos`）なので板の縁は見えない。
 *
 * 板は列いっぱいの幅 × `size/logo-tile`（80 / 72）。中のロゴは `size/logo-mark`（56 / 52）で、
 * キャンバスの余白ぶんだけ板の中に浮く。**素材が無い件は板だけ先に置く**（§6.19 の Image slot
 * と同じ考え方 — 枠を確定させておけば、素材が届いてもレイアウトが動かない）。
 *
 * 列の中は中央揃え（ページの左揃え原則に対する例外、§2.6）。ロゴが版面ごとに違う重心を
 * 持つので、左に揃えると板の中のロゴと題の頭が合わずに列が傾いて見える（L-26 と同じ理由）。
 * 2 件は同格なので `<ul>`、各列の題は `<h3>`（見出しナビゲーションに 2 つの事実が並ぶ）。
 * ロゴ自体は題が名前を運ぶので装飾（`alt=""`、§8.6）。状態なし。
 */

export interface OfficialRow {
  /** 3:2 の白キャンバスに正規化したロゴ。未入手のときは板だけ出す */
  logo?: string;
  title: string;
  sub: string;
}

export interface CellOfficialProps extends ComponentProps<"section"> {
  /** OFFICIAL。見出しにしない（§8.5） */
  kicker: string;
  rows: readonly OfficialRow[];
  colSpan?: CellProps["colSpan"];
  className?: string;
}

export function CellOfficial({
  kicker,
  rows,
  colSpan,
  className,
  ...props
}: CellOfficialProps) {
  return (
    <Cell asChild className={cn("gap-stack-lg", className)} colSpan={colSpan}>
      <section {...props}>
        <p className="text-overline text-ink-secondary">{kicker}</p>
        {/* biome-ignore-start lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
        {/* biome-ignore lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
        <ul
          className="grid flex-1 items-center gap-stack-lg tablet:grid-cols-2 tablet:gap-x-inline-lg"
          role="list"
        >
          {rows.map(({ logo, title, sub }) => (
            <li
              className="flex min-w-0 flex-col items-center gap-stack-sm text-center"
              key={title}
            >
              <div className="grid h-logo-tile w-full place-items-center bg-logo-ground">
                {logo ? (
                  <ImageSlot
                    alt=""
                    className="h-logo-mark"
                    fit="contain"
                    ratio="3:2"
                    sizes="84px"
                    src={logo}
                  />
                ) : (
                  // 素材が届くまでの控え。板（枠）は先に確定させておく（§6.19）
                  <Photo className="text-ink-tertiary" size={24} />
                )}
              </div>
              <div>
                <h3 className="text-headline">{title}</h3>
                <p className="mt-stack-2xs text-footnote text-ink-secondary">
                  {sub}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {/* biome-ignore-end lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
      </section>
    </Cell>
  );
}
