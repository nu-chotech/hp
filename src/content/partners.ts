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
 * NOTE: 公式ロゴは未着。public/images/partners/ の SVG は差し替え前提の**仮ワードマーク**で、
 *       公式素材が届いたら同じファイル名で上書きするだけでよい（logo のパスは変えない）。
 *       形式は SVG が第一候補、無ければ背景透過 PNG。タイルは正方形（§6.16）なので素材も
 *       正方形のアイコンを想定。表示領域は Desktop 約 150px 角（タイル 198 − inset 24 × 2）。
 */
export const partnersContent = {
  heading: { title: "パートナー", label: "PARTNERS" },
  intro:
    "学生の技術活動を支援してくださる企業・団体を募集しています。勉強会での登壇やイベント支援など、関わり方はご相談ください。",
  /** マーキー（hero 直下）の語はこの配列から生成される（marquee.ts）。並びもここが正 */
  partners: [
    {
      name: "サポーターズ 技育プロジェクト",
      logo: "/images/partners/supporterz-geek.svg",
    },
    {
      name: "カラビナテクノロジー株式会社",
      logo: "/images/partners/karabiner-technology.svg",
    },
    { name: "NPO法人 N-BARCO", logo: "/images/partners/n-barco.svg" },
    {
      name: "長崎大学 アントレプレナーシップセンター",
      logo: "/images/partners/nagasaki-univ-ec.svg",
    },
    { name: "Progate Path", logo: "/images/partners/progate-path.svg" },
  ] satisfies Partner[],
  /** 募集セル（§6.16）。ラベルだけで、導線は持たない */
  placeholder: {
    label: "YOUR LOGO HERE",
  },
} as const;
