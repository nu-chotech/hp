import { ImageSlot } from "@/components/ui/image-slot";
import type { Partner } from "@/content/partners";
import { externalLinkNote, externalLinkProps } from "@/lib/external-link";

/**
 * Partner logo（§6.16 / DECISION U-43）
 *
 * 外枠だけの白い面の中に、ロゴを等分の列で並べる 1 項目。枠はマーキーと同じ **3:2 ×
 * 高さ `size/marquee-logo` 96（幅 144）**。素材は `pnpm generate:partner-logos` が 3:2 の
 * 白キャンバスに正規化したもので、余白はキャンバス側が持つ（U-33）— 白い面の上に白い
 * キャンバスを置くので、枠の縁は見えず図だけが浮かぶ。
 *
 * 列の中で**中央**に置く（DECISION L-26: 画像の中央配置はページの左揃え原則に対する
 * 唯一の例外。団体ごとに版面が違うので、左に揃えると重心がばらける）。
 *
 * `Partner.href` があれば枠全体が団体サイトへのリンク（U-35）。名前は画像の alt（団体名）で、
 * visually-hidden で「（外部、新しいタブで開く）」を添える。hover / pressed の表現は持たない
 * （素材に filter を掛けない約束 U-21、面のティントも白キャンバスに乗らない）。応答は
 * カーソルとフォーカスリングだけ — 枠は罫に接していないので、リングは既定の外向き。
 */

export interface PartnerLogoProps {
  partner: Partner;
}

export function PartnerLogo({ partner }: PartnerLogoProps) {
  const frame = partner.logo ? (
    <ImageSlot
      alt={partner.name}
      className="h-marquee-logo"
      fit="contain"
      ratio="3:2"
      src={partner.logo}
    />
  ) : (
    <ImageSlot className="h-marquee-logo" fit="contain" ratio="3:2" />
  );

  return (
    <li className="flex justify-center">
      {partner.logo && partner.href ? (
        // <a> は @layer base で下線を持つので no-underline を明示する
        <a
          className="inline-flex cursor-pointer no-underline [-webkit-tap-highlight-color:transparent]"
          href={partner.href}
          {...externalLinkProps}
        >
          {frame}
          <span className="sr-only">{externalLinkNote}</span>
        </a>
      ) : (
        <>
          {frame}
          {/* 素材が入るまでの控え。ロゴは団体名を運ぶ画像なので、
              画像が無い間も名前だけは支援技術に届ける（§8.6） */}
          {partner.logo ? null : (
            <span className="sr-only">{partner.name}</span>
          )}
        </>
      )}
    </li>
  );
}
