export interface Activity {
  /** 欧文のまま。翻訳しない（§9.8） */
  title: string;
  subtitle: string;
  description: string;
  /** キーワード。Chip / Tag として並ぶ */
  tags: readonly string[];
  /** 開催頻度。確定するまで表示しない（DECISION U-9） */
  frequency?: string;
}

/**
 * 活動内容（§6.13）
 *
 * ベント 4 セル。1 件目だけ Feature（大セル）にして入口の太さの差を面積で示す。
 * Project は継続の営み、Hackathon は期間の区切られた催しとして分ける（DECISION U-8b）。
 *
 * セルはリンクを持たない（DECISION U-17）。4 件とも同じ Discord に着地するので、
 * 押した対象と行き先が対応しなかった。参加への導線は Hero・Bento CTA・Poster が担う。
 */
export const activitiesContent = {
  heading: { title: "活動内容", label: "ACTIVITY" },
  /** 開催頻度が固まるまで false（DECISION U-9） */
  showFrequency: false,
  activities: [
    {
      title: "Talk Day",
      subtitle: "ライトニングトーク",
      description:
        "1人5分の短い発表で、最近学んだこと・作ったもの・技術Tipsを共有。発表経験ゼロでもOK、聞くだけ参加も大歓迎。",
      tags: ["プレゼン練習", "知識の共有", "新しい発見"],
      frequency: "月1〜2回",
    },
    {
      title: "Dev Day",
      subtitle: "勉強会・ハンズオン",
      description:
        "みんなで手を動かしながら学ぶ会。Webアプリ開発、Git入門など、知識ゼロでも「一緒にやってみよう」で参加できます。",
      tags: ["実践的な学び", "参加型", "初心者歓迎"],
      frequency: "月1〜2回",
    },
    {
      title: "Project",
      subtitle: "チーム開発・イベント企画",
      description:
        "チームでの開発とコードレビュー、学内イベントの企画・運営まで。手を挙げれば、役割はいくらでもあります。",
      tags: ["チーム開発", "コードレビュー", "イベント企画"],
      frequency: "随時",
    },
    {
      title: "Hackathon",
      subtitle: "出るのも、開くのも",
      description:
        "外部のハッカソンにチームで出るだけでなく、自分たちで開催する側にも回ります。短期間で形にする経験を。",
      tags: ["短期集中", "チーム戦", "主催もする"],
      frequency: "随時",
    },
  ] satisfies Activity[],
} as const;
