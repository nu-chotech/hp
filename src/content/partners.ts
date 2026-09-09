export interface Partner {
  /** ロゴの代替テキストは団体名（§8.6） */
  name: string;
  /** 団体の公式サイト。あればタイル全体がリンクになり、新しいタブで開く（U-35 / M-21）。無ければ画像のまま */
  href?: string;
  /**
   * ロゴ画像。public/images/partners/<slug>.png を指す。これは元素材ではなく、
   * `pnpm generate:partner-logos` が assets/partners/ の素材を 3:2 の白キャンバスに
   * 正規化した出力（scripts/normalize-partner-logos.mjs、DECISION U-33 / L-32）。
   * 無い間は Image slot の placeholder が出て、団体名は visually-hidden で読まれる（§6.16）。
   */
  logo?: string;
}

/**
 * パートナー（§6.16）
 *
 * 「スポンサー」「協賛」は使わない。金銭支援に限らない関係を指すため（DECISION U-7）。
 * NOTE: ロゴは各団体の公式素材（2026-09-10 受領）。形式・縦横比・背景は団体ごとに
 *       ばらばら（白背景 jpg、透過 png、4:1 超のワードマーク）なので、表示側で加工せず
 *       スクリプトで揃える。団体を足すときは assets/partners/ に素材を置き、スクリプトの
 *       一覧に 1 行足して再生成し、ここに 1 行足す。
 */
export const partnersContent = {
  heading: { title: "パートナー", label: "PARTNERS" },
  intro: "ChoTechの活動を支えてくださる企業・団体の皆さまをご紹介します。",
  /** マーキー（hero 直下）の語はこの配列から生成される（marquee.ts）。並びもここが正 */
  partners: [
    {
      name: "サポーターズ 技育プロジェクト",
      href: "https://geek.supporterz.jp/geekpjt",
      logo: "/images/partners/geek-project.png",
    },
    {
      name: "カラビナテクノロジー株式会社",
      href: "https://karabiner.tech/",
      logo: "/images/partners/karabiner-inc.png",
    },
    {
      name: "NPO法人 N-BARCO",
      href: "https://www.nbarco.org/",
      logo: "/images/partners/n-barco.png",
    },
    {
      name: "長崎大学 アントレプレナーシップセンター",
      // 大学の公式ページ（http のみ）ではなく、センターが運用する Notion のページへ
      href: "https://pattern-maiasaura-de9.notion.site/3175a073d76580e5b417fb8a72725188",
      logo: "/images/partners/nfec.png",
    },
    {
      name: "Progate Path",
      href: "https://path.progate.com/",
      logo: "/images/partners/progate-path.png",
    },
  ] satisfies Partner[],
} as const;
