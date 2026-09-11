import { externalLinks, sectionHref, sectionIds } from "@/config/site";

/**
 * Hero（§6.8）
 *
 * h1 はタグラインそのもの（DECISION U-37: 回転語「仲間と、学ぶ。創る。話す。」は About の
 * CULTURE セルに降ろした）。かつての meta strip（SINCE 2025 / 長崎大学公認 / 技育プロジェクト）は
 * DECISION U-39 で撤去し、事実は About の SINCE / OFFICIAL セルが運ぶ。
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
  /**
   * 英文なので h1 に lang="en" を付ける（§8.7）。全文はタグライン（siteConfig.tagline）と同じ。
   * 文は白、句点の「.」だけをアクセントで塗る（DECISION U-39）。語ではなく句点に色を置くのは、
   * 墨のボックスに載った 1 行の中で「言い切った」ことを示す最小の印がそれだから。
   * U-37 の「動詞だけアクセント」は撤回 — ボックスが強調を担うので、色の強調は 1 か所に絞る。
   *
   * 改行は入れない。Desktop は 1 行（Display/XL の上限を 116 に下げて ≈ 1131 ≤ 1200）、
   * Mobile は「Hack Your」/「Limits.」に自然に折れ、ボックスも行ごとに付く
   * （box-decoration-break: clone）。Poster（Display/L、2 行の著者改行、ボックスなし）と
   * 形を変えることで、同じ文が開幕と終幕で別の顔になる。
   */
  headline: {
    text: "Hack Your Limits",
    period: ".",
  },
  lead: "長崎にテック好きのためのハブを。",
  body: "ChoTech（チョーテック）は長崎大学公認の学生テックコミュニティです。\nものづくりに少しでも興味があれば、大学・学部・学科を問わず、誰でも参加することができます。",
  actions: {
    primary: { label: "参加する", href: externalLinks.discord, external: true },
    secondary: {
      label: "活動を見る",
      href: sectionHref(sectionIds.activities),
      external: false,
    },
  },
} as const;
