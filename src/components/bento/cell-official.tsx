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
 * `logo-ground`（白）の板に実素材を置く（U-33 と同じ理由で、白キャンバスの縁は板に溶ける）。
 *
 * **白い板はやめ、セルごと `logo-ground`（白）にした**（クライアント判断 2026-10-10:「白枠が
 * 浮きすぎている」）。白背景のロゴ素材を ground の上に置けないという U-33 の要請は変わらないが、
 * その解が「素材のぶんだけ白い板を敷く」だと、ground との比 1.12 の矩形がセルの中に浮いて見える。
 * 板の幅を列いっぱいにすれば左右の余白だけが段ごとに 53 〜 160 まで開いて上下の 16 と釣り合わず、
 * マークを抱かせれば今度は板そのものが浮く。**面の側を素材に合わせる**のが U-33 の本来の筋で、
 * 罫線グリッドなら 2px の罫がセルの境界を引いてくれるので、白い面が 1 セルあっても破綻しない
 * （Partners のロゴ行 = `Cell surface="logo"`、U-43 と同じ扱い）。
 *
 * マークは **16:5 の白キャンバス**に縁まで収めたもの（`pnpm generate:partner-logos` →
 * `public/images/official/`）を `size/logo-mark` 56 の**高さ**で置く。Partners のタイル（3:2、
 * L-32）と比が違うのは置き場の形が違うから — 横長の列に 3:2 を置くと高さが余ってマークが
 * 豆粒になる。2 枚が同じ高さで並ぶことが「同格の裏づけが 2 つ」という構図を支えるので、
 * キャンバスは**最も横に長いマークが高さいっぱいで収まる**比（3.2:1）に取る。
 *
 * 列の中は中央揃え（ページの左揃え原則に対する例外、§2.6）。ロゴが版面ごとに違う重心を
 * 持つので、左に揃えると板の中のロゴと題の頭が合わずに列が傾いて見える（L-26 と同じ理由）。
 * 2 件は同格なので `<ul>`、各列の題は `<h3>`（見出しナビゲーションに 2 つの事実が並ぶ）。
 * ロゴ自体は題が名前を運ぶので装飾（`alt=""`、§8.6）。状態なし。
 */

export interface OfficialRow {
  /** 3:1 の白キャンバスに正規化したマーク（`public/images/official/`）。未入手のときは板だけ出す */
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
    <Cell
      asChild
      className={cn("gap-stack-lg", className)}
      colSpan={colSpan}
      surface="logo"
    >
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
              {logo ? (
                <ImageSlot
                  alt=""
                  className="h-logo-mark"
                  fit="contain"
                  ratio="16:5"
                  sizes="180px"
                  src={logo}
                />
              ) : (
                // 素材が届くまでの控え。マークと同じ枠を占めて、届いても列が動かない（§6.19）
                <span className="grid aspect-16/5 h-logo-mark place-items-center text-ink-tertiary">
                  <Photo size={24} />
                </span>
              )}
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
