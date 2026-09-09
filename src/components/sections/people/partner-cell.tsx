import { ImageSlot } from "@/components/ui/image-slot";
import { insetFocusRing } from "@/components/ui/interaction";
import { Cell } from "@/components/ui/ruled-grid";
import type { Partner } from "@/content/partners";
import { externalLinkNote, externalLinkProps } from "@/lib/external-link";
import { cn } from "@/lib/utils";

/**
 * Partner cell（§6.16）
 *
 * 2 種類しかない: 団体ロゴの Logo と、行の端数を埋める Filler。
 * どちらも **3:2 のタイル**（DECISION L-32）で、面は `logo-ground`（白、DECISION U-33）。
 * 実物のロゴは 5 枚中 3 枚が横長（うち 2 枚は 4:1 を超えるワードマーク）で、正方形タイル
 * （旧 L-31）ではワードマークが高さ 30px 前後の帯になっていた。高さは列幅から決まり、
 * 3:2 が行の床 `size/cell-min` 120 を下回る Mobile（168 × 112）では床が効いて 168 × 120 になる。
 *
 * `self-stretch justify-self-stretch` は床を効かせるために要る。grid item の既定整列 `normal`
 * は aspect-ratio を持つ箱を stretch ではなく start として扱うので、指定しないとトラック 120
 * の中で 112 に止まり、下の 8px に罫の色（divider）が帯として出る。縦だけ stretch すると
 * 今度は幅が比率から 180 に伸びて列をはみ出す（片軸 stretch は他軸を比率で決める）。
 * 両軸 stretch にすると比率はトラックの算出（行の高さ = 列幅 ÷ 1.5）にだけ使われ、箱は
 * グリッド領域を埋める。Contain の画像は 168 × 112 のまま上下 4px を白で残す（見えない）。
 *
 * `Partner.href` があればタイル全体が団体サイトへのリンクになる（DECISION U-35）。
 * リンクの名前は画像の alt（団体名）で、visually-hidden で「（外部、新しいタブで開く）」を
 * 添える。hover / pressed の表現は持たない — 素材は白キャンバスでタイルを埋めているので
 * 面のティントは乗らず、画像に filter を掛けない約束（U-21）もある。応答はカーソルと
 * フォーカスリング（罫に接するので内側、K-7）だけ。href が無い団体は画像のまま置く。
 */

export interface PartnerLogoCellProps {
  partner: Partner;
}

export function PartnerLogoCell({ partner }: PartnerLogoCellProps) {
  /**
   * 実素材は content 側の logo が持つ。public/images/partners/ の画像は
   * `pnpm generate:partner-logos` が assets/partners/ の元素材を 3:2 の白キャンバスに
   * 正規化したもので、余白はキャンバス側が持つ。だからセルは inset 0 で画像を縁まで
   * 敷き（§6.11.5 の画像セルと同じ）、キャンバスの白とタイルの白を同じ面にする。
   * 素材が入った瞬間 alt が団体名になり、下の visually-hidden の控えは消える。
   */
  const logoSrc = partner.logo;

  return (
    <Cell
      asChild
      surface="logo"
      inset="none"
      className="aspect-3/2 self-stretch justify-self-stretch"
    >
      <li>
        {/* DECISION L-26: ロゴの Contain 配置は、ページ全体の左揃え原則に対する
            **唯一の例外**。団体ごとに版面（縦長・横長）が違うので、左に揃えると
            セルごとに重心がばらけて一覧が揃って見えないため、ここだけ中央に置く。
            中央にするのは画像そのものであって、文字ラベルは決して中央にしない（L-19）。
            flex-1 でセルの残り高さを取り、Contain がその枠の中央に画像を収める */}
        {logoSrc && partner.href ? (
          // タイル全体がリンク。<a> は @layer base で下線を持つので no-underline を明示する
          <a
            href={partner.href}
            className={cn(
              "flex flex-1 cursor-pointer no-underline [-webkit-tap-highlight-color:transparent]",
              insetFocusRing,
            )}
            {...externalLinkProps}
          >
            <ImageSlot
              ratio="fill"
              fit="contain"
              src={logoSrc}
              alt={partner.name}
            />
            <span className="sr-only">{externalLinkNote}</span>
          </a>
        ) : (
          <div className="flex-1">
            {logoSrc ? (
              <ImageSlot
                ratio="fill"
                fit="contain"
                src={logoSrc}
                alt={partner.name}
              />
            ) : (
              <ImageSlot ratio="fill" fit="contain" />
            )}
          </div>
        )}
        {/* 素材が入るまでの控え。ロゴは団体名を運ぶ画像なので、
            画像が無い間も名前だけは支援技術に届ける（§8.6） */}
        {logoSrc ? null : <span className="sr-only">{partner.name}</span>}
      </li>
    </Cell>
  );
}

/**
 * 埋め草セル（DECISION U-34）。行の端数を埋める無地の白タイルで、文言も導線も持たない。
 * 旧 Placeholder「YOUR LOGO HERE」は 2026-09-10 に撤去 — 読者に何を求めているのか
 * 分からず、募集の呼びかけは導入文が担っている。情報が無いので aria-hidden。
 */
export function PartnerFillerCell() {
  return (
    <Cell
      asChild
      surface="logo"
      className="aspect-3/2 self-stretch justify-self-stretch"
    >
      <li aria-hidden="true" />
    </Cell>
  );
}
