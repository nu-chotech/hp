import { externalLinks } from "@/config/site";

export interface Partner {
  /** ロゴの代替テキストは団体名（§8.6） */
  name: string;
  href?: string;
}

/**
 * パートナー（§6.16）
 *
 * 「スポンサー」「協賛」は使わない。金銭支援に限らない関係を指すため（DECISION U-7）。
 * NOTE: ロゴはプレースホルダ。実データに差し替える際はここだけ更新すればよい。
 */
export const partnersContent = {
  heading: { title: "パートナー", label: "PARTNERS" },
  intro:
    "学生の技術活動を支援してくださる企業・団体を募集しています。勉強会での登壇やイベント支援など、関わり方はご相談ください。",
  partners: [
    { name: "長崎大学" },
    { name: "サポーターズ 技育プロジェクト" },
  ] satisfies Partner[],
  placeholder: {
    label: "YOUR LOGO HERE",
    /** 動詞句を丸ごとリンクにする（§6.3.3） */
    action: { label: "パートナーになる", href: externalLinks.partnerContact },
  },
} as const;
