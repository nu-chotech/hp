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
 * ベントのセルに置く図（§6.11.2、DECISION U-40 → U-52 → U-56）。実体は icons.tsx の
 * bentoIcons が解決する。content は文字列で持ち、React 部品を知らない（brandIcons と同じ流儀）。
 */
export type AboutIcon =
  | "book"
  | "hammer"
  | "message"
  | "code"
  | "palette"
  | "bulb"
  | "flask"
  | "map-pin"
  | "messages";

/** 円（緑）と、その円が連れている語。図だけを置くセルはもう無い（U-56） */
export interface AboutFigure {
  icon: AboutIcon;
  label: string;
}

/**
 * About のベント（§6.11）
 *
 * 9 セル（DECISION U-56）。DOM 順は Mobile の読み順そのままで、
 * CULTURE → [MEMBERS · SINCE] → CHAT → 写真 → FOR EVERYONE → FORMAT → 写真 → OFFICIAL。
 *
 * U-52 までの「題 → 図」の解剖はやめ、セルごとに **1 つの絵**を置く:
 * CULTURE は循環の図、MEMBERS / SINCE は数字、FOR EVERYONE / FORMAT は語を連れた円、
 * OFFICIAL はロゴ板、あいだに活動写真 2 枚。
 */
export const aboutContent = {
  heading: { title: "ChoTechについて", label: "ABOUT" },

  /**
   * 学ぶ → 創る → 話す が巡る 1 枚の図（U-56）。可視の中心語は「仲間と」だけで、
   * 三つの語は円の中にある。読み上げには節の主張を 1 文で渡す（可視側は aria-hidden）。
   */
  culture: {
    kicker: "CULTURE",
    center: "仲間と",
    accessibleTitle: "仲間と、学ぶ。創る。話す。",
    /** 天（−90°）から時計回り。円の位置は cycle.tsx が角度で決める */
    cycle: [
      { icon: "book", label: "学ぶ" },
      { icon: "hammer", label: "創る" },
      { icon: "message", label: "話す" },
    ] satisfies AboutFigure[],
  },

  stat: {
    kicker: "MEMBERS",
    value: "50",
    suffix: "+",
    /** 数字は装飾。読み上げは文で渡す（§6.11.3） */
    accessibleName: "メンバー 50人以上",
  },

  /**
   * 設立（DECISION U-39 → U-40 → U-56）。可視は年だけの「2025」で、MEMBERS と同じ
   * 「キッカー → 数字」のセルにする。U-52 の「2025年4月 + 旗の図」は、1×1 の中で
   * 日付 1 行と図が中途半端に散っていた。月まで要る読み手には読み上げ名が全文を渡す。
   */
  founded: {
    kicker: "SINCE",
    value: "2025",
    accessibleName: "2025年4月 設立",
  },

  /**
   * 公的な裏づけ 2 件（DECISION U-14 → U-40 → U-52 → U-56）。図（Tabler の円）をやめ、
   * **ロゴ板**（logo-ground の白）を各件の先頭に置く。裏づけを語るのは団体の意匠であって、
   * こちらで選んだアイコンではない。長崎大学の公式マークは未入手なので枠だけ先に確定させる。
   */
  official: {
    kicker: "OFFICIAL",
    rows: [
      {
        // TODO(client): 長崎大学の公式マークが届いたら public/images/partners/ に置いて 1 行足す
        title: "長崎大学公認団体",
        sub: "2026年に長崎大学の公認を取得",
      },
      {
        logo: "/images/partners/geek-project.png",
        title: "技育プロジェクト公式パートナー",
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
     *
     * 3 往復目（もくもく会）は U-56 で足した — wide でセルが 1 列 × 3 行に縦長くなり、
     * 2 往復では下半分が空いた。誘い方が「催し」から「日常の集まり」に降りる往復でもある。
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
      {
        kind: "incoming",
        // 学習を続けたい人（Case 01）
        avatar: "/images/personas/case-01.svg",
        message: "日曜にもくもく会やらない？",
      },
      {
        kind: "reactions",
        reactions: [
          { emoji: "🙋", label: "参加", count: 4 },
          { emoji: "🕐", label: "あとで", count: 2 },
        ],
      },
      { kind: "outgoing", message: "行きます！" },
      {
        kind: "reactions",
        side: "outgoing",
        reactions: [{ emoji: "✌️", label: "やった", count: 2 }],
      },
      { kind: "typing" },
    ] satisfies ChatEntry[],
  },

  /**
   * 活動の場（DECISION U-11 → U-56）。キッカーは `ONLINE & OFFLINE` → **`FORMAT`** に。
   * 図が「対面 / オンライン」と言い切るので、英字は短いほうが figure と重ならない。
   * 文（「対面活動も、Discordでの…」）は figure の語と同じことを言っていたので撤去。
   */
  format: {
    kicker: "FORMAT",
    figures: [
      { icon: "map-pin", label: "対面" },
      { icon: "messages", label: "オンライン" },
    ] satisfies AboutFigure[],
  },

  /** 対象（U-56）。題は「誰でも歓迎。」の 1 文にし、職能は図の語が数え上げる */
  forEveryone: {
    kicker: "FOR EVERYONE",
    title: "誰でも歓迎。",
    figures: [
      { icon: "code", label: "エンジニア" },
      { icon: "palette", label: "デザイナー" },
      { icon: "bulb", label: "プランナー" },
      { icon: "flask", label: "サイエンティスト" },
    ] satisfies AboutFigure[],
  },

  /**
   * 活動写真 2 枚（U-56）。Activities と同じ実素材を共用する（差し替えは同名で上書き）。
   * ここでは写真を説明する文が隣に無いので、alt は空にせず「何の場面か」を持たせる（§8.6）。
   */
  photos: [
    { src: "/images/activities/talk-day.jpg", alt: "Talk Day の様子" },
    { src: "/images/activities/dev-day.jpg", alt: "Dev Day の様子" },
  ],
} as const;
