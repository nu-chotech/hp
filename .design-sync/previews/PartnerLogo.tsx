import type { CSSProperties } from "react";
import { Cell, PartnerLogo, RuledGrid } from "hp";
import geekProject from "../../public/images/partners/geek-project.png";
import karabiner from "../../public/images/partners/karabiner-inc.png";
import nBarco from "../../public/images/partners/n-barco.png";
import nfec from "../../public/images/partners/nfec.png";
import progatePath from "../../public/images/partners/progate-path.png";

/**
 * パートナー（content/partners.ts）。ロゴは `pnpm generate:partner-logos` が 3:2 の白キャンバスに
 * 正規化した png（各 100KB 未満）を data URL で渡す。partners.tsx と同じく、外枠だけの罫線
 * グリッド（columns 1）の中の白い面（surface="logo"）に等分の列で並べる（§6.16 / U-43）。
 */
const partners = [
  { name: "サポーターズ 技育プロジェクト", href: "https://geek.supporterz.jp/geekpjt", logo: geekProject },
  { name: "カラビナテクノロジー株式会社", href: "https://karabiner.tech/", logo: karabiner },
  { name: "NPO法人 N-BARCO", href: "https://www.nbarco.org/", logo: nBarco },
  {
    name: "長崎大学 アントレプレナーシップセンター",
    href: "https://pattern-maiasaura-de9.notion.site/3175a073d76580e5b417fb8a72725188",
    logo: nfec,
  },
  { name: "Progate Path", href: "https://path.progate.com/", logo: progatePath },
] as const;

const columnsOf = (count: number) =>
  ({ "--partner-columns": `repeat(${count}, minmax(0, 1fr))` }) as CSSProperties;

/** Partners 節そのまま — 5 団体を 1 行に（Desktop は団体数ちょうどの等分、tablet 3、Mobile 2 で折返し） */
export const Row = () => (
  <RuledGrid columns={1}>
    <Cell surface="logo">
      <ul
        className="grid grid-cols-2 items-center gap-x-inline-lg gap-y-stack-lg tablet:grid-cols-3 desktop:grid-cols-(--partner-columns)"
        role="list"
        style={columnsOf(partners.length)}
      >
        {partners.map((partner) => (
          <PartnerLogo key={partner.name} partner={partner} />
        ))}
      </ul>
    </Cell>
  </RuledGrid>
);

/** 3 団体 — 枠 3:2 × 高さ 96 の中央にロゴ。白い面の上に白キャンバスなので枠の縁は見えず図だけが浮かぶ */
export const Trio = () => (
  <RuledGrid columns={1} style={{ maxWidth: "36rem" }}>
    <Cell surface="logo">
      <ul
        className="grid grid-cols-2 items-center gap-x-inline-lg gap-y-stack-lg tablet:grid-cols-3 desktop:grid-cols-(--partner-columns)"
        role="list"
        style={columnsOf(3)}
      >
        <PartnerLogo partner={partners[1]} />
        <PartnerLogo partner={partners[2]} />
        <PartnerLogo partner={partners[4]} />
      </ul>
    </Cell>
  </RuledGrid>
);

/** 素材が届く前の団体（logo なし）— 3:2 の placeholder が枠として立ち、団体名は sr-only で読まれる（§6.16） */
export const Placeholder = () => (
  <RuledGrid columns={1} style={{ maxWidth: "24rem" }}>
    <Cell surface="logo">
      <ul
        className="grid grid-cols-2 items-center gap-x-inline-lg gap-y-stack-lg"
        role="list"
      >
        <PartnerLogo partner={partners[3]} />
        <PartnerLogo partner={{ name: "新しいパートナー（素材待ち）" }} />
      </ul>
    </Cell>
  </RuledGrid>
);
