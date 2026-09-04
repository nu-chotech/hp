import { externalLinks } from "@/config/site";

export interface Partner {
  /** ロゴの代替テキストは団体名（§8.6） */
  name: string;
  href?: string;
  /**
   * ロゴ画像。public/images/partners/ に置き、"/images/partners/<団体>.svg" の形で渡す。
   * 無い間は Image slot の placeholder が出て、団体名は visually-hidden で読まれる（§6.16）。
   */
  logo?: string;
}

/**
 * パートナー（§6.16）
 *
 * 「スポンサー」「協賛」は使わない。金銭支援に限らない関係を指すため（DECISION U-7）。
 * NOTE: ロゴは未着。素材が届いたら public/images/partners/ に置いて logo を足す — 更新はここだけでよい。
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
