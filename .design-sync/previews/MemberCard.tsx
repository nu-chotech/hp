import { MemberCard, RuledGrid } from "hp";

/**
 * 運営メンバー（content/members.ts）。顔写真の jpg はバンドルに持ち込めない（数 MB）ので
 * photo を外し、ImageSlot の placeholder（§6.19「枠」の状態）で組む。氏名・役職・紹介・
 * 導線は content のまま。
 */
const takuya = {
  id: "takuya",
  name: "Takuya Uehara",
  role: "代表",
  bio: "長崎大学大学院 修士1年。デザインとテクノロジーを横断したアプリの開発が得意です。ハッカソンに積極的に参加したり、技術を起点として様々なことに挑戦しています。",
  socials: [
    { kind: "x", href: "https://x.com/ut42tech" },
    { kind: "github", href: "https://github.com/ut42tech" },
    { kind: "website", href: "https://ut42tech.com" },
  ],
} as const;

const ibuki = {
  id: "ibuki",
  name: "Ibuki Nishiyama",
  role: "副代表",
  bio: "長崎大学大学院 修士1年。データ分析やAIを活用したサービス開発に取り組んでいます。ユーザーの課題を起点に、データから得た気づきを役立つ仕組みへ。",
  socials: [
    { kind: "x", href: "https://x.com/YiIbuki34" },
    { kind: "github", href: "https://github.com/nikkiy30" },
    { kind: "website", href: "https://roaring-puppy-a0e0d5.netlify.app" },
  ],
} as const;

const yuinosuke = {
  id: "yuinosuke",
  name: "Yuinosuke Miyazaki",
  role: "運営",
  bio: "長崎大学大学院 修士1年。Discord運営・イベント企画担当。研究ではPythonでのデータ解析や音響信号処理に取り組んでいます。",
  socials: [{ kind: "github", href: "https://github.com/yuinosuke92" }],
} as const;

const nao = {
  id: "nao",
  name: "Nao Mukai",
  role: "運営",
  bio: "長崎大学大学院 修士1年。広報活動担当。3D Gaussian Splattingの絶対スケール復元を研究。3Dモデリングとデザインも独学で学んでいます。",
  socials: [
    { kind: "github", href: "https://github.com/mk-no" },
    { kind: "website", href: "https://my-portfolio-opal-seven-72.vercel.app" },
  ],
} as const;

/** Leader 1 枚（§6.15）。写真 16:9 が縁に触れ、body は inset/cell。役職 → 氏名（Title/2）→ 紹介 → 導線 */
export const Leader = () => (
  <RuledGrid columns={1} asChild style={{ maxWidth: "36rem" }}>
    <ul role="list">
      <MemberCard member={takuya} size="leader" />
    </ul>
  </RuledGrid>
);

/** Leader 2 列 — Members 節の上段そのまま。紹介文の行数が違っても導線の高さは揃う（mt-auto） */
export const LeaderPair = () => (
  <RuledGrid columns={2} asChild style={{ maxWidth: "48rem" }}>
    <ul role="list">
      <MemberCard member={takuya} size="leader" />
      <MemberCard member={ibuki} size="leader" />
    </ul>
  </RuledGrid>
);

/** Staff（写真なし、showPhoto=false）— 本番の現状（membersContent.showStaffPhotos = false）。body がセルの上端から始まる */
export const Staff = () => (
  <RuledGrid columns={2} asChild style={{ maxWidth: "48rem" }}>
    <ul role="list">
      <MemberCard member={yuinosuke} size="staff" showPhoto={false} />
      <MemberCard member={nao} size="staff" showPhoto={false} />
    </ul>
  </RuledGrid>
);

/** Staff（写真あり、既定）— 4:3 の枠・inset/md・Headline の氏名・Caption の紹介。Leader との差は 4 点だけ */
export const StaffWithPhoto = () => (
  <RuledGrid columns={2} asChild style={{ maxWidth: "48rem" }}>
    <ul role="list">
      <MemberCard member={yuinosuke} size="staff" />
      <MemberCard member={nao} size="staff" />
    </ul>
  </RuledGrid>
);
