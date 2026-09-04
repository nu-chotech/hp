import { externalLinks, sectionHref, sectionIds } from "@/config/site";

/**
 * Hero（§6.8）
 *
 * meta は「第三者が裏づけた事実」だけを並べる。回転語はちょうど全角 3 字で揃え、
 * 枠幅を固定してレイアウトシフトをゼロにする（§6.8.3）。
 */
export const heroContent = {
  /**
   * 面の奥に敷く写真（DECISION U-20）
   *
   * ink 面を置き換えるのではなく、ink 面の上に低い不透明度で重ねる。だから文字の
   * 階層（inverse/ink 14.86 / secondary 11.78 / tertiary 8.29）は写真ぶんだけ必ず
   * 下がる — 不透明度は「好みで薄い」のではなく、この写真の**最も明るい画素**でも
   * 12px の meta strip が AA を割らない上限として測って決めてある（§6.8.1）。
   * 素材を差し替えたら測り直す。明部の多い写真は同じ不透明度では通らない。
   *
   * NOTE: 実写に差し替えるまでのプレースホルダ（Unsplash 由来）。実体は public/images/hero/
   * に保存してあるので、同名で上書きするか src の 1 行を書き換えれば差し替わる。
   */
  backdrop: {
    src: "/images/hero/backdrop.jpg",
  },
  /** 区切り罫で連結される。見出しではなく <p>（§8.5） */
  meta: [
    { text: "SINCE 2025", lang: "en" },
    { text: "長崎大学公認" },
    { text: "技育プロジェクト 学生団体公式パートナー" },
    { text: "MEMBERS 50+", lang: "en" },
  ],
  headline: {
    leadIn: "仲間と、",
    /** 2.5s 周期で切り替わる。全角 3 字固定 */
    words: ["学ぶ。", "創る。", "話す。"],
    /** 支援技術に読ませる h1 の全文（§6.1.7） */
    accessibleName: "仲間と、学ぶ。創る。話す。",
  },
  lead: "長崎にテック好きのためのハブを。",
  body: "ChoTech（チョーテック）は長崎大学公認の学生技術系コミュニティです。\n長崎大学生に関わらず、誰でも参加することができます。",
  actions: {
    primary: { label: "参加する", href: externalLinks.discord, external: true },
    secondary: {
      label: "活動を見る",
      href: sectionHref(sectionIds.activities),
      external: false,
    },
  },
} as const;
