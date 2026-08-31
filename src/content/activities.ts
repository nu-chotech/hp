import type { LucideIcon } from "lucide-react";
import { Code, Speech, Users } from "lucide-react";

export interface Activity {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  /** 開催頻度などの短いラベル */
  badge: string;
  description: string;
  /** 活動の特徴を表すタグ */
  features: string[];
}

/** 「活動内容」セクションの文言 */
export const activitiesContent = {
  title: "活動内容",
  description: "3つの柱で「学ぶ・作る・話す」を実践しています。",
  activities: [
    {
      icon: Speech,
      title: "Talk Day",
      subtitle: "ライトニングトーク・アイデアプレゼン",
      badge: "月1〜2回",
      description:
        "1人5分程度の短い発表で、最近学んだことや作ったもの、技術Tipsなどを共有。発表経験がなくてもOK、聞くだけ参加も大歓迎。",
      features: ["プレゼン練習", "知識の共有", "新しい発見"],
    },
    {
      icon: Code,
      title: "Dev Day",
      subtitle: "技術勉強会・ハンズオン",
      badge: "月1〜2回",
      description:
        "みんなで手を動かしながら学ぶ勉強会。Webアプリ開発、Git入門など、知識ゼロでも「一緒にやってみよう」という気持ちで参加可能。",
      features: ["実践的な学び", "参加型学習", "初心者歓迎"],
    },
    {
      icon: Users,
      title: "プロジェクト活動",
      subtitle: "ハッカソン・共同開発・成果発表",
      badge: "随時",
      description:
        "外部ハッカソンへのチーム参加や、学内での課題解決プロジェクト。学期末の成果発表会で作品を発表する機会も。",
      features: ["チーム開発", "実績作り", "ポートフォリオ"],
    },
  ] satisfies Activity[],
} as const;
