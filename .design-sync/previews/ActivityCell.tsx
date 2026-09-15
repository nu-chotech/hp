import { ActivityCell, RuledGrid } from "hp";

/**
 * 活動内容（content/activities.ts）。写真の jpg は数 MB でバンドルに持ち込めないので、
 * content のパスをそのまま渡す — バンドルでは解決できず、ImageSlot の placeholder 地が
 * 「枠」として見える（§6.19）。題・副題・説明・タグ・頻度は content のまま。
 */
const talkDay = {
  title: "Talk Day",
  subtitle: "座談会・ライトニングトーク（LT）",
  description:
    "1人5分の短い発表で、最近学んだこと・作ったもの簡単に共有。発表経験ゼロでもOK、聞くだけ参加も大歓迎。",
  tags: ["プレゼン練習", "知識の共有", "新しい発見"],
  photo: "/images/activities/talk-day.jpg",
  frequency: "月2回",
} as const;

const devDay = {
  title: "Dev Day",
  subtitle: "勉強会・ワークショップ",
  description:
    "テックの基本を学べる勉強会を定期的に開催しています。GitやFigmaなどのツールの使い方から、Web開発やAI駆動開発の基本まで幅広く学べます。",
  tags: ["基礎学習", "実践型", "初心者歓迎"],
  photo: "/images/activities/dev-day.jpg",
  frequency: "月1回",
} as const;

const project = {
  title: "Project",
  subtitle: "チーム開発・イベント企画",
  description:
    "チームを組んでアプリ開発をしたり、定期的なコードレビュー会を行なっています。また、学園祭での企画・運営も行ったりもします。",
  tags: ["チーム開発", "コードレビュー", "イベント企画"],
  photo: "/images/activities/project.jpg",
  frequency: "随時",
} as const;

/** 1 セル（§6.13 / U-41）。16:9 の写真を縁まで敷き、題（Title/1）・副題・説明（Body S）・タグ（Chip）。リンクではない */
export const Single = () => (
  <RuledGrid columns={1} asChild style={{ maxWidth: "36rem" }}>
    <ul role="list">
      <ActivityCell activity={talkDay} priority />
    </ul>
  </RuledGrid>
);

/** 2 列 — 説明が 2 行と 3 行で揺れても、タグは mt-auto でセルの底に揃う */
export const Pair = () => (
  <RuledGrid columns={2} asChild style={{ maxWidth: "48rem" }}>
    <ul role="list">
      <ActivityCell activity={devDay} />
      <ActivityCell activity={project} />
    </ul>
  </RuledGrid>
);

/** 開催頻度バッジあり（showFrequency）。題群の右に Overline/JP の pop-badge。本番は U-9 で非表示 */
export const WithFrequency = () => (
  <RuledGrid columns={2} asChild style={{ maxWidth: "48rem" }}>
    <ul role="list">
      <ActivityCell activity={talkDay} showFrequency />
      <ActivityCell activity={devDay} showFrequency />
    </ul>
  </RuledGrid>
);
