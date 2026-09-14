export interface Activity {
  /** 欧文のまま。翻訳しない（§9.8） */
  title: string;
  subtitle: string;
  description: string;
  /** キーワード。Chip / Tag として並ぶ */
  tags: readonly string[];
  /**
   * 活動の様子（16:9、セルの上端に縁まで敷く。DECISION U-41）。
   * 写真は装飾なので alt は ""（§8.6）— 活動の情報は題と説明が本文で持つ。
   * 実体は public/images/activities/。差し替えは同名で上書きするか src の 1 行。
   */
  photo: string;
  /** 開催頻度。確定するまで表示しない（DECISION U-9） */
  frequency?: string;
}

/**
 * 活動内容（§6.13）
 *
 * 均等な 2×2 の写真セル（DECISION U-41）。Feature / Compact の面積差（U-8）は捨て、
 * 優先は順序（Talk Day が先頭）で示す。写真は About のスライド（U-18）から降りてきた。
 * Project は継続の営み、Hackathon は期間の区切られた催しとして分ける（DECISION U-8b）。
 *
 * セルはリンクを持たない（DECISION U-17）。4 件とも同じ Discord に着地するので、
 * 押した対象と行き先が対応しなかった。参加への導線は Hero・Nav・Poster が担う。
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
      photo: "/images/activities/talk-day.jpg",
      frequency: "月2回",
    },
    {
      title: "Dev Day",
      subtitle: "勉強会・ワークショップ",
      description:
        "テックの基本を学べる勉強会を定期的に開催しています。GitやFigmaなどのツールの使い方から、Web開発やAI駆動開発の基本まで幅広く学べます。",
      tags: ["基礎学習", "実践型", "初心者歓迎"],
      photo: "/images/activities/dev-day.jpg",
      frequency: "月1回",
    },
    {
      title: "Project",
      subtitle: "チーム開発・イベント企画",
      description:
        "チームを組んでアプリ開発をしたり、定期的なコードレビュー会を行なっています。また、学園祭での企画・運営も行ったりもします。",
      tags: ["チーム開発", "コードレビュー", "イベント企画"],
      // TODO(client): Project の実写が届くまで Hero の集合写真の複製で仮置き（2026-09-12）。
      // 届いたら public/images/activities/project.jpg を上書きするだけでよい
      photo: "/images/activities/project.jpg",
      frequency: "随時",
    },
    {
      title: "Hackathon",
      subtitle: "参加だけじゃなく開催も",
      description:
        "外部のハッカソンにチームを組んで出るだけでなく、ChoTechでもハッカソンを毎年開催しています。",
      tags: ["運営", "ハッカソン", "チーム開発"],
      photo: "/images/activities/hackathon.jpg",
      frequency: "随時",
    },
  ] satisfies Activity[],
} as const;
