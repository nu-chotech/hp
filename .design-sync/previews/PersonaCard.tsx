import { PersonaCard, RuledGrid } from "hp";
import case01 from "../../public/images/personas/case-01.svg";
import case02 from "../../public/images/personas/case-02.svg";
import case05 from "../../public/images/personas/case-05.svg";

/**
 * こんな人におすすめ（content/personas.ts）。イラストは public/images/personas の SVG を
 * data URL で渡す。カードは 3 行の subgrid（header / 悩み / 次の一歩）で親の行を借りるので、
 * 親の罫線グリッドは for-you.tsx と同じく auto-rows-auto にする（既定の行の床 120 を
 * 3 行それぞれに掛けない）。
 */
const personas = {
  case01: {
    caseNo: "Case 01",
    title: "これから始めたい人",
    quote: "「プログラミング、何から始めればいいか分からない…」",
    recommendation: "Dev Dayで一緒に手を動かしてみよう！",
    photo: case01,
  },
  case02: {
    caseNo: "Case 02",
    title: "開発が好きなエンジニア",
    quote: "「個人開発、一人だと続かないんだよね」",
    recommendation: "Projectで仲間と作り切ろう！",
    photo: case02,
  },
  case05: {
    caseNo: "Case 05",
    title: "データサイエンスに興味がある人",
    quote: "「データ分析、独学だと限界を感じる」",
    recommendation: "Dev Dayで手を動かして、Talk Dayで共有しよう！",
    photo: case05,
  },
} as const;

/** 1 枚（§6.14）。イラスト 80 の円 + [CASE 番号 / 題]、声（地の上の Callout）、次の一歩（surface の板 + arrow-right） */
export const Single = () => (
  <RuledGrid className="auto-rows-auto" columns={1} asChild style={{ maxWidth: "24rem" }}>
    <ul role="list">
      <PersonaCard persona={personas.case01} />
    </ul>
  </RuledGrid>
);

/** 2 列 — 引用 1 行と推薦 2 行が混じっても、subgrid で header・悩み・次の一歩の境目が揃う（U-53） */
export const Pair = () => (
  <RuledGrid className="auto-rows-auto" columns={2} asChild style={{ maxWidth: "48rem" }}>
    <ul role="list">
      <PersonaCard persona={personas.case02} />
      <PersonaCard persona={personas.case05} />
    </ul>
  </RuledGrid>
);
