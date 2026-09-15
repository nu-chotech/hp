import { CellOfficial, RuledGrid } from "hp";

/** content/about.ts の official。パートナーの題は著者改行（「技育 / プロジェクト」と割れないため） */
const rows = [
  {
    figure: "school",
    title: "長崎大学公認団体",
    sub: "長崎大学の公認を受けた学生団体",
  },
  {
    figure: "handshake",
    title: "技育プロジェクト\n学生団体公式パートナー",
    sub: "株式会社サポーターズが運営",
  },
] as const;

/** About の 2×1（U-52）。2 件 = 2 列、各列は題 → 補足 → 図で、図の円は底で揃う（items-end） */
export const About = () => (
  <RuledGrid columns={2} style={{ maxWidth: "48rem" }}>
    <CellOfficial kicker="OFFICIAL" rows={rows} />
  </RuledGrid>
);

/** 1 件だけ。列は 1 つ埋まり、解剖（題 → stack/md → 図）は同じ */
export const Single = () => (
  <RuledGrid columns={2} style={{ maxWidth: "48rem" }}>
    <CellOfficial kicker="OFFICIAL" rows={[rows[0]]} />
  </RuledGrid>
);
