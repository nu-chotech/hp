import { externalLinks } from "@/config/site";

/**
 * Discord の様子を写した「絵」。操作する UI ではない（§6.12）
 *
 * 送り手は右寄せ・アクセント面、相手は左寄せ・アバター付き。
 * アバターはペルソナと同じ Humation のイラスト（public/images/personas/、DECISION U-26）。
 */
export interface ChatReaction {
  /** 実際の絵文字 1 文字。Discord のリアクションを写すのでアイコンにしない（DECISION U-25） */
  emoji: string;
  /** 読み上げ名の前半。「いいね 3」のように count と連結する（§6.4） */
  label: string;
  /** 最終値。再生中は 1 からここまで巻き上がる（§6.12.2） */
  count: number;
}

export type ChatEntry =
  | { kind: "incoming"; avatar: string; message: string }
  | { kind: "outgoing"; message: string }
  | { kind: "reactions"; reactions: ChatReaction[] }
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
        // ハッカソンに出たい人（Case 04）
        avatar: "/images/personas/case-04.svg",
        message: "ハッカソン誰か一緒に出ない？",
      },
      {
        kind: "reactions",
        reactions: [
          { emoji: "👍", label: "いいね", count: 3 },
          { emoji: "👀", label: "気になる", count: 4 },
        ],
      },
      { kind: "outgoing", message: "私もそれ興味ある！" },
      {
        kind: "incoming",
        // 開発が好きなエンジニア（Case 02）
        avatar: "/images/personas/case-02.svg",
        message: "こんなやり方もあるよ！",
      },
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
   * NOTE: 実写に差し替えるまでのプレースホルダ（Unsplash 由来）。実体は public/images/about/
   * に保存してある。差し替えは同名で上書きするか、src の 1 行。
   */
  photos: [
    {
      src: "/images/about/talk-day.jpg",
      alt: "",
    },
    {
      src: "/images/about/dev-day.jpg",
      alt: "",
    },
    {
      src: "/images/about/hackathon.jpg",
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
