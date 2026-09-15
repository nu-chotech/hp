import { CellText, RuledGrid } from "hp";

/** 2×1 の statement セル（CULTURE）。Display/M の題 + 図 3 つ */
export const Statement = () => (
  <RuledGrid columns={2} className="max-w-[48rem]">
    <CellText
      colSpan={2}
      size="2x1-statement"
      kicker="CULTURE"
      title={"仲間と、\n学ぶ。創る。話す。"}
      figures={["book", "hammer", "message"]}
    />
  </RuledGrid>
);

/** 1×1 中（Title/3）。題の語順で図が並ぶ */
export const Standard = () => (
  <RuledGrid columns={2} className="max-w-[48rem]">
    <CellText
      kicker="ONLINE & OFFLINE"
      title="対面活動も、Discordでのオンライン交流も活発。"
      figures={["map-pin", "messages"]}
    />
    <CellText
      kicker="FOR EVERYONE"
      title="エンジニアもデザイナーもサイエンティストも。"
      figures={["code", "palette", "flask"]}
    />
  </RuledGrid>
);

/** 1×1 大（Title/1）。日付 1 語のセル。読み上げは全文 */
export const Since = () => (
  <RuledGrid columns={2} className="max-w-[48rem]">
    <CellText
      size="1x1-lg"
      kicker="SINCE"
      title="2025年4月"
      accessibleTitle="2025年4月 設立"
      figures={["flag"]}
    />
    <CellText
      size="1x1-sm"
      kicker="PLACE"
      title="長崎大学 文教キャンパス"
      body={"活動の拠点。オンラインは Discord。"}
      figures={["map-pin"]}
    />
  </RuledGrid>
);

/** インク面の Tone（ライブラリ用。ページのインクセルは CellStat が持つ） */
export const InkTone = () => (
  <RuledGrid columns={2} className="max-w-[48rem]">
    <CellText
      tone="ink"
      kicker="TONE"
      title="反転面の文字セル"
      body="キッカーは tertiary、本文は secondary のアルファで階層を作る。"
    />
    <CellText
      kicker="BODY"
      title="本文つき"
      body="§6.11.2 の showBody。全 Kind で使える。"
    />
  </RuledGrid>
);
