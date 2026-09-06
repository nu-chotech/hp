import { ImageSlot } from "@/components/ui/image-slot";
import { Cell } from "@/components/ui/ruled-grid";
import { type Partner, partnersContent } from "@/content/partners";

/**
 * Partner cell（§6.16）
 *
 * 2 種類しかない: 団体ロゴの Logo と、末尾に 1 つだけ置く Placeholder。
 * 高さはどちらも罫線グリッドの行が持つ（`size/cell-min` 120）。
 *
 * NOTE: `Partner.href` はここでは描かない。§6.16 は Logo セルにリンク状態を定義して
 * おらず（Image slot も「状態: なし」）、押せる面を勝手に増やすと罫線グリッドの
 * 「押せるのは中の導線だけ」という読み方が崩れるため。導線が要るなら仕様を先に足す。
 */

export interface PartnerLogoCellProps {
  partner: Partner;
}

export function PartnerLogoCell({ partner }: PartnerLogoCellProps) {
  /**
   * 実素材は content 側の logo が持つ（public/images/partners/）。入った瞬間 alt が
   * 団体名になり、下の visually-hidden の控えは消える（同じ名前を二度読み上げさせない）。
   * 差し替えは content の 1 行で済む。
   */
  const logoSrc = partner.logo;

  return (
    <Cell asChild>
      <li>
        {/* DECISION L-26: ロゴの Contain 配置は、ページ全体の左揃え原則に対する
            **唯一の例外**。団体ごとに版面（縦長・横長）が違うので、左に揃えると
            セルごとに重心がばらけて一覧が揃って見えないため、ここだけ中央に置く。
            中央にするのは画像そのものであって、文字ラベルは決して中央にしない（L-19）。
            flex-1 でセルの残り高さを取り、Contain がその枠の中央に画像を収める */}
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
        {/* 素材が入るまでの控え。ロゴは団体名を運ぶ画像なので、
            画像が無い間も名前だけは支援技術に届ける（§8.6） */}
        {logoSrc ? null : <span className="sr-only">{partner.name}</span>}
      </li>
    </Cell>
  );
}

/**
 * 募集セル。ロゴが並ぶ最後に 1 つだけ置く。ラベルだけで導線は持たない —
 * 相談の呼びかけはセクションの導入文が担う。
 *
 * 左揃え・縦中央（DECISION L-19 / §6.16）。120 高のセルで上寄せにすると下の空きが
 * 不自然になるので縦だけ中央に寄せ、横は他のラベルと同じ左端に揃える。
 */
export function PartnerPlaceholderCell() {
  const { label } = partnersContent.placeholder;

  return (
    <Cell asChild>
      <li className="items-start justify-center">
        <p className="text-overline text-ink-secondary">{label}</p>
      </li>
    </Cell>
  );
}
