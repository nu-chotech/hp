import { Cell, RuledGrid } from "hp";

/**
 * 罫は「線」ではなく「地」で描く（§3.8 / DECISION L-9）: frame の bg-divider が padding 2 と
 * gap 2 の隙間から覗く。だから外枠と内側の線が必ず同じ 2px になる。
 * 中身は最小のセル（キッカー + 題）だけ。この部品の関心は「格子」であって内容ではない。
 */
function Plain({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Cell>
      <p className="text-overline text-ink-secondary">{kicker}</p>
      <p className="mt-auto pt-stack-md text-headline">{title}</p>
    </Cell>
  );
}

/** leader（Members 上段）の 2 列。tablet 以上で 2 列、それ未満は DOM 順に 1 列 */
export const Columns2 = () => (
  <RuledGrid columns={2} style={{ maxWidth: "48rem" }}>
    <Plain kicker="LEADER" title="代表" />
    <Plain kicker="LEADER" title="副代表" />
  </RuledGrid>
);

/** persona（For you の 6 ケース）の 3 列。desktop（78rem）から 3 列、tablet では 2 列に畳まれる */
export const Columns3 = () => (
  <RuledGrid columns={3} style={{ maxWidth: "48rem" }}>
    <Plain kicker="CASE 01" title="プログラミングを始めたい" />
    <Plain kicker="CASE 02" title="仲間と何かを作りたい" />
    <Plain kicker="CASE 03" title="UI/UX が好き" />
    <Plain kicker="CASE 04" title="ハッカソンに出たい" />
    <Plain kicker="CASE 05" title="研究にコードを使いたい" />
    <Plain kicker="CASE 06" title="話せる仲間がほしい" />
  </RuledGrid>
);

/** bento（About）の 4 列。desktop で 4、tablet で 2。span は列方向にだけ効く */
export const Columns4 = () => (
  <RuledGrid columns={4} style={{ maxWidth: "48rem" }}>
    <Plain kicker="CULTURE" title="学ぶ。創る。話す。" />
    <Plain kicker="MEMBERS" title="50+" />
    <Plain kicker="SINCE" title="2025年4月" />
    <Plain kicker="PLACE" title="長崎大学" />
  </RuledGrid>
);

/** 6 列（ライブラリ残置、L-31）。唯一 Mobile 2 / tablet 3 / desktop 6 の段を持つ */
export const Columns6 = () => (
  <RuledGrid columns={6} style={{ maxWidth: "48rem" }}>
    <Plain kicker="01" title="学ぶ" />
    <Plain kicker="02" title="創る" />
    <Plain kicker="03" title="話す" />
    <Plain kicker="04" title="集う" />
    <Plain kicker="05" title="試す" />
    <Plain kicker="06" title="続ける" />
  </RuledGrid>
);

/** 1 列 = 外枠だけ（U-43）。内側の罫を持たない 1 セルの面を、同じ 2px の frame で囲む */
export const Outline = () => (
  <RuledGrid columns={1} style={{ maxWidth: "48rem" }}>
    <Cell surface="logo">
      <p className="text-overline text-ink-secondary">PARTNERS</p>
      <p className="mt-auto pt-stack-md text-headline">ロゴ行はこの面の中に等分で並ぶ</p>
    </Cell>
  </RuledGrid>
);

/**
 * joinTop: 直前の罫線グリッドに連結する（Members の staff が leader の直下に来る）。
 * 上枠を落として上のグリッドの下枠を共有し、2px 罫を 2 本重ねない（§4.3-4）。間にマージンを置かない
 */
export const JoinTop = () => (
  <div style={{ maxWidth: "48rem" }}>
    <RuledGrid columns={2}>
      <Plain kicker="LEADER" title="代表" />
      <Plain kicker="LEADER" title="副代表" />
    </RuledGrid>
    <RuledGrid columns={2} joinTop>
      <Plain kicker="STAFF" title="Tech Lead" />
      <Plain kicker="STAFF" title="Design Lead" />
      <Plain kicker="STAFF" title="Community" />
      <Plain kicker="STAFF" title="Marketing" />
    </RuledGrid>
  </div>
);
