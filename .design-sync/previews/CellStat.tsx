import { CellStat, CellText, RuledGrid } from "hp";

/**
 * ページ全体で数字はここにしかない（§6.11.3）。規模を語るのは色ではなく大きさ:
 * 数字は白、Display/L の value と Display/M の suffix をベースラインで揃える。
 * 「50+」は字面なので aria-hidden、読み上げには accessibleName の 1 文を渡す。
 */
export const Members = () => (
  <RuledGrid columns={1} style={{ maxWidth: "18rem" }}>
    <CellStat kicker="MEMBERS" value="50" suffix="+" accessibleName="メンバー 50人以上" />
  </RuledGrid>
);

/** About 行 1 の右半分: MEMBERS（墨）と SINCE（題 + 図）。1×1 同士で高さが揃い、数字は底に座る */
export const InRow = () => (
  <RuledGrid columns={2} style={{ maxWidth: "48rem" }}>
    <CellStat kicker="MEMBERS" value="50" suffix="+" accessibleName="メンバー 50人以上" />
    <CellText
      size="1x1-lg"
      kicker="SINCE"
      title="2025年4月"
      accessibleTitle="2025年4月 設立"
      figures={["flag"]}
    />
  </RuledGrid>
);
