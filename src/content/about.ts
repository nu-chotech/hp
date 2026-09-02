import { externalLinks } from "@/config/site";

/**
 * Discord の様子を写した「絵」。操作する UI ではない（§6.12）
 *
 * 送り手は右寄せ・アクセント面、相手は左寄せ・アバター付き。
 */
export type ChatEntry =
  | { kind: "incoming"; initial: string; message: string }
  | { kind: "outgoing"; message: string }
  | {
      kind: "reactions";
      reactions: { icon: "thumbUp" | "eye"; count: string }[];
    }
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
      {
        kind: "incoming",
        initial: "田",
        message: "ハッカソン誰か一緒に出ない？",
      },
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

  /**
   * 活動の様子（§6.11.5 / DECISION U-18）
   *
   * 複数枚をスライドさせて回す。「いろいろやっている」は 1 枚の代表写真では出ない。
   * 順に Talk Day の発表 / Dev Day のハンズオン / ハッカソンのチーム開発。
   *
   * 写真は装飾なので alt は ""（§8.6）— 活動の情報は Activities 節が本文で持つ。
   * NOTE: 実写に差し替えるまでのプレースホルダ（Unsplash）。差し替えは src の 1 行。
   */
  photos: [
    {
      src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&h=675&q=75",
      alt: "",
    },
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&h=675&q=75",
      alt: "",
    },
    {
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&h=675&q=75",
      alt: "",
    },
  ],

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
