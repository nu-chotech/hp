import { externalLinks } from "@/config/site";

/**
 * Discord の様子を写した「絵」。操作する UI ではない（§6.12）
 *
 * 送り手は右寄せ・アクセント面、相手は左寄せ・アバター付き。
 */
export type ChatEntry =
  | { kind: "incoming"; initial: string; message: string }
  | { kind: "outgoing"; message: string }
  | { kind: "reactions"; reactions: { icon: "thumbUp" | "eye"; count: string }[] }
  | { kind: "typing" };

/**
 * About のベント（§6.11）
 *
 * セルは面積で優先順位を示す。文言は Figma の合成画面（Screens / Desktop 1440）が正本。
 */
export const aboutContent = {
  heading: { title: "コミュニティの、今。", label: "ABOUT" },

  culture: {
    kicker: "CULTURE",
    title: "「やってみたい」に、\nすぐ仲間が集まる。",
    body: "エンジニアもデザイナーも。学ぶ・作る・話すを、みんなで気軽に楽しむ文化をつくっています。",
  },

  /** 公認と公式パートナーを 1 セルに集約する（DECISION U-14） */
  official: {
    kicker: "OFFICIAL",
    title: "長崎大学公認の\n学生団体が運営",
    body: "サポーターズ 技育プロジェクト\n学生団体公式パートナー",
  },

  stat: {
    kicker: "MEMBERS",
    value: "50",
    suffix: "+",
    /** 数字は装飾。読み上げは文で渡す（§6.11.3） */
    accessibleName: "メンバー 50人以上",
  },

  chat: {
    kicker: "#general — いつものChoTech",
    note: "こんな会話が、毎日どこかで。",
    thread: [
      { kind: "incoming", initial: "田", message: "ハッカソン誰か一緒に出ない？" },
      {
        kind: "reactions",
        reactions: [
          { icon: "thumbUp", count: "3" },
          { icon: "eye", count: "4" },
        ],
      },
      { kind: "outgoing", message: "私もそれ興味ある！" },
      { kind: "incoming", initial: "鈴", message: "こんなやり方もあるよ！" },
      { kind: "outgoing", message: "UIは私がやりたい！" },
      { kind: "typing" },
    ] satisfies ChatEntry[],
  },

  /** 実写に差し替えるまでのプレースホルダ（§6.19） */
  photo: {
    label: "活動の様子",
    ratio: "16 / 9",
  },

  onlineOffline: {
    kicker: "ONLINE & OFFLINE",
    title: "チャットも通話もDiscordで。対面イベントも定期的に。",
  },

  forEveryone: {
    kicker: "FOR EVERYONE",
    title: "エンジニアも、デザイナーも、研究好きも。",
  },

  cta: {
    title: "まずはDiscordから",
    sub: "見るだけ参加も歓迎です",
    action: { label: "Discordに参加する", href: externalLinks.discord },
  },
} as const;
