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

  /**
   * 技育プロジェクトを通したつながり（DECISION U-58）。ロゴの並びの下に、写真と文の 2 列で置く。
   * 伝えたいのは「技育と一緒に外のイベントへ出ていく活発さ」と「技育を通して全国の学生団体・
   * 企業とつながっている」こと。写真は技育のイベントの集合写真（約 80 人）で、About に置いて
   * いた頃は「これがメンバー」と読まれた（U-57）。パートナーの文脈の中なら他団体の催しとして
   * 読め、隣の文が場面を説明するのでキャプションは持たない。
   *
   * 題はクライアント確定（2026-11-24）。TODO(client): 本文はデザイン側の仮の文言、確認の上で確定させること。
   */
  network: {
    // 所属を名乗る一文にする — 「GEEK PROJECT」だけでは何の段か分からなかった（クライアント所見）。
    // 「We are Team Geek Project」が案で、ChoTech は技育そのものではなくその一員なので part of を足した。
    // DOM は正書法、表示は Overline/Latin の大文字（§2.6.5）
    kicker: "We’re part of Team Geek Project",
    title: "全国の学生エンジニアとつながる。",
    body: "ChoTechは技育プロジェクトの公式パートナーです。技育のイベントには全国の学生・学生団体・企業が集まり、ChoTechのメンバーも参加してつながりを広げています。",
    photo: {
      src: "/images/partners/geek-project-event.jpg",
      alt: "技育プロジェクトのイベントの集合写真",
    },
    /** 文のセルの締め。外部なので新しいタブ + arrow-up-right（M-21） */
    link: {
      label: "技育プロジェクトについて",
      href: "https://geek.supporterz.jp/geekpjt",
    },
  },
} as const;
