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
      subtitle: "座談会・ライトニングトーク（LT）",
      description:
        "1人5分の短い発表で、最近学んだこと・作ったもの簡単に共有。発表経験ゼロでもOK、聞くだけ参加も大歓迎。",
      tags: ["プレゼン練習", "知識の共有", "新しい発見"],
      frequency: "月2回",
    },
    {
      title: "Dev Day",
      subtitle: "勉強会・ワークショップ",
      description:
        "テックの基本を学べる勉強会を定期的に開催しています。GitやFigmaなどのツールの使い方から、Web開発やAI駆動開発の基本まで幅広く学べます。",
      tags: ["基礎学習", "実践型", "初心者歓迎"],
      frequency: "月1回",
    },
    {
      title: "Project",
      subtitle: "チーム開発・イベント企画",
      description:
        "チームを組んでアプリ開発をしたり、定期的なコードレビュー会を行なっています。また、学園祭での企画・運営も行ったりもします。",
      tags: ["チーム開発", "コードレビュー", "イベント企画"],
      frequency: "随時",
    },
    {
      title: "Hackathon",
      subtitle: "参加だけじゃなく開催も",
      description:
        "外部のハッカソンにチームを組んで出るだけでなく、ChoTechでもハッカソンを毎年開催しています。",
      tags: ["運営", "ハッカソン", "チーム開発"],
      frequency: "随時",
    },
  ] satisfies Activity[],
} as const;
