import type { LucideIcon } from "lucide-react";
import { BookOpen, Hammer, MessageCircle, Users } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** 「私たちについて」セクションの文言 */
export const aboutContent = {
  title: "私たちについて",
  description:
    "学生が主体的かつ協働的に「技術を学ぶ・作る・話す」独自のカルチャーを育んでいくコミュニティです。",
  features: [
    {
      icon: BookOpen,
      title: "学ぶ",
      description: "最新の技術を実践的に学び、T字型人材を目指します。",
    },
    {
      icon: Hammer,
      title: "作る",
      description: "チームでプロジェクトに挑戦し、アイデアを形にします。",
    },
    {
      icon: MessageCircle,
      title: "話す",
      description: "ライトニングトークや勉強会で知識を共有します。",
    },
    {
      icon: Users,
      title: "仲間",
      description: "同じ志を持つ仲間と切磋琢磨し、共に成長します。",
    },
  ] satisfies Feature[],
} as const;
