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
  | {
      kind: "reactions";
      /** 直前の発言の側。自分側は右寄せになる。既定は相手側 */
      side?: "incoming" | "outgoing";
      reactions: ChatReaction[];
    }
  | { kind: "typing" };

/**
 * ベントのセルに置く図（§6.11.2、DECISION U-40 → U-52）。実体は icons.tsx の bentoIcons が解決する。
 * content は文字列で持ち、React 部品を知らない（brandIcons と同じ流儀）。
 */
export type AboutIcon =
  | "book"
  | "hammer"
  | "message"
  | "code"
  | "palette"
  | "flask"
  | "map-pin"
  | "messages"
  | "school"
  | "handshake"
  | "flag";

/**
 * 図の円の色（DECISION C-32）。色相は意味で選ぶ — 同じ意味の図は常に同じ色:
 *   blue = 知る（学ぶ・エンジニア・公認）/ orange = 作る・場（創る・デザイナー・対面）
 *   pink = 話す・つながる（話す・オンライン・公式パートナー）/ yellow = しるし・探る（設立・サイエンティスト）
 * 1 セルの中で色を繰り返さない。Discord を指す図（オンライン）に blue は置かない（Blurple と混ざる）。
 */
export type AboutTint = "blue" | "orange" | "pink" | "yellow";

/**
 * ベントの図 1 単位: 語（上）+ 色の円の中の Tabler（下）。§6.11.2 / U-52。
 * 語の字数: md（1×1・OFFICIAL、円 64）は 8 全角まで — 3 つ並べて 64 + 12 + 64 + 12 + 96 = 248 ≤ 249.5
 * （サイエンティスト = 8 が上限）。lg（CULTURE、円 80）は 6 全角まで。
 * 語はそのセルの h3 の読み上げ名に含まれていること（図の行は aria-hidden、§8.5）。
 */
export interface AboutFigure {
  icon: AboutIcon;
  label: string;
  tint: AboutTint;
}

/**
 * About のベント（§6.11）
 *
 * 7 セルを 3 行に組む（DECISION U-40）。
 * 行 1 [CULTURE 2×1 · MEMBERS · SINCE] / 行 2–3 [CHAT 2×2 · OFFICIAL 2×1 / ONLINE & OFFLINE · FOR EVERYONE]。
 * 文字だけだったセルは題の語をひとつずつ図（Tabler 32）にして、空いていた中段を埋める。
 * Discord への CTA セルは撤去（導線は Hero・Nav・Poster が持つ）、活動写真は Activities へ。
 */
export const aboutContent = {
  heading: { title: "ChoTechについて", label: "ABOUT" },

  culture: {
    kicker: "CULTURE",
    /** 可視は「仲間と、」だけ。3 語は図の語として続く（U-52）。読み上げは全文 */
    title: "仲間と、",
    accessibleTitle: "仲間と、学ぶ。創る。話す。",
    figures: [
      { icon: "book", label: "学ぶ", tint: "blue" },
      { icon: "hammer", label: "創る", tint: "orange" },
      { icon: "message", label: "話す", tint: "pink" },
    ],
  },

  stat: {
    kicker: "MEMBERS",
    value: "50",
    suffix: "+",
    /** 数字は装飾。読み上げは文で渡す（§6.11.3） */
    accessibleName: "メンバー 50人以上",
  },

  /**
   * 設立。Hero の meta strip「SINCE 2025」から降りてきた（DECISION U-39 / U-40）。
   * 数字のセルにはしない — 1×1 の内側 250 に Display/L の 4 桁（≈ 260）は入らず、
   * Display/M に落とすと隣の 50+ と釣り合わない。ページで数字を大きく出すのは MEMBERS
   * だけ（§6.11.3）という規則にも合う。図 + Headline の 1×1 として他のセルと同じ解剖にする。
   */
  founded: {
    kicker: "SINCE",
    /** 可視は日付だけを Title/1 で。「設立」は図の語が言う（U-52）。読み上げは全文 */
    title: "2025年4月",
    accessibleTitle: "2025年4月 設立",
    figures: [{ icon: "flag", label: "設立", tint: "yellow" }],
  },

  /**
   * 公認と公式パートナーを 1 セルに集約し、2 列（題 + 補足 → 図）で並べる（DECISION U-14 → U-40 → U-52）。
   * パートナーの題は著者改行 — 列幅 262.5 の中で「技育 / プロジェクト」と割れないように
   */
  official: {
    kicker: "OFFICIAL",
    rows: [
      {
        figure: { icon: "school", label: "公認", tint: "blue" },
        title: "長崎大学公認団体",
        sub: "長崎大学の公認を受けた学生団体",
      },
      {
        figure: { icon: "handshake", label: "公式パートナー", tint: "pink" },
        title: "技育プロジェクト\n学生団体公式パートナー",
        sub: "株式会社サポーターズが運営",
      },
    ],
  },

  chat: {
    kicker: "ChoTechでのチャットの雰囲気",
    note: "気軽にあなたの「やりたい」「気になる」を、みんなで共有しよう。",
    /**
     * 発言のたびにスタンプが付く（U-25 改）。「反応が返ってくる場所」を見せるのが
     * この図の仕事なので、反応の無い発言を残さない。絵文字は発言ごとに変える —
     * 同じ 2 つが 4 回並ぶと定型に見える。数は 1〜4 に留め、巻き上げを短く保つ。
     */
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
        kind: "reactions",
        side: "outgoing",
        reactions: [
          { emoji: "🎉", label: "やった", count: 2 },
          { emoji: "🔥", label: "アツい", count: 1 },
        ],
      },
      {
        kind: "incoming",
        // UI/UX が好きな人（Case 03）
        avatar: "/images/personas/case-03.svg",
        message: "こんなやり方もあるよ！",
      },
      {
        kind: "reactions",
        reactions: [
          { emoji: "💡", label: "なるほど", count: 3 },
          { emoji: "👏", label: "拍手", count: 2 },
        ],
      },
      { kind: "outgoing", message: "UIは私がやりたい！" },
      {
        kind: "reactions",
        side: "outgoing",
        reactions: [
          { emoji: "✨", label: "すてき", count: 2 },
          { emoji: "🙌", label: "頼もしい", count: 1 },
        ],
      },
      { kind: "typing" },
    ] satisfies ChatEntry[],
  },

  onlineOffline: {
    kicker: "ONLINE & OFFLINE",
    title: "対面活動も、Discordでのオンライン交流も活発。",
    figures: [
      { icon: "map-pin", label: "対面", tint: "orange" },
      { icon: "messages", label: "オンライン", tint: "pink" },
    ],
  },

  forEveryone: {
    kicker: "FOR EVERYONE",
    title: "エンジニアもデザイナーもサイエンティストも。",
    figures: [
      { icon: "code", label: "エンジニア", tint: "blue" },
      { icon: "palette", label: "デザイナー", tint: "orange" },
      { icon: "flask", label: "サイエンティスト", tint: "yellow" },
    ],
  },
} as const;
