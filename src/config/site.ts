/**
 * サイト全体の設定値
 *
 * 文言はここを一次情報とし、metadata / manifest / Nav / Footer / Poster が参照する。
 * デザインの正本は docs/design/design-system-v2.md（§9 Content）。
 */
export const siteConfig = {
  name: "ChoTech",
  /** ロゴに添えるタグライン。英文なので lang="en" を付ける（§8.7） */
  tagline: "Hack Your Limits.",
  /** <title> と OGP のタイトル */
  title: "ChoTech | 長崎大学公認の学生技術系コミュニティ",
  /** 検索結果向けの説明文。§9.9 の実測 108 文字 */
  description:
    "ChoTechは長崎大学公認の学生技術系コミュニティです。エンジニアも、デザイナーも、研究好きも。Talk Day・Dev Day・Project・Hackathonで学ぶ・作る・話す。Discordに参加できます。",
  /** SNS カード・manifest 向けの短い説明文 */
  shortDescription:
    "長崎大学公認の学生技術系コミュニティ。学ぶ・作る・話すを、仲間と気軽に。",
  keywords: [
    "ChoTech",
    "長崎大学",
    "学生団体",
    "技術コミュニティ",
    "ハッカソン",
    "勉強会",
  ],
  /** ブラウザ UI / manifest のテーマカラー。インク面（neutral-950） */
  themeColor: "#201e1d",
  get copyright() {
    return `© ${new Date().getFullYear()} ChoTech`;
  },
} as const;

/**
 * セクションの id。ページ内アンカーの行き先はすべてここから来る。
 *
 * hero はナビに出さない（§6.3 のナビは 4 節）が、Brand ロックアップの行き先
 * （= ページ先頭へ戻る、§6.6）なので id は共有する。ここに無いと Hero 側の
 * `id="hero"` と Brand 側の `href="#hero"` が独立した 2 つの文字列になり、
 * 片方だけ改名しても誰も気づけない。
 *
 * `#main`（スキップリンクの行き先、§8.5）はここに含めない — あれはセクションでは
 * なく `<main>` ランドマークで、役割が違う。
 */
export const sectionIds = {
  hero: "hero",
  about: "about",
  activities: "activities",
  forYou: "for-you",
  members: "members",
  partners: "partners",
  join: "join",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

/**
 * セクション id からページ内アンカーの href を作る。
 *
 * `#` の付け外しを 1 か所に閉じるための関数。以前は navLinks が href を持ち、
 * それを要る側（ナビの aria-current の判定）が `replace("#", "")` で id に
 * 戻していた — 同じ対応を足す側と剥がす側の 2 回書いていたことになる。
 * 正本は id で、href はそこから導かれる。
 */
export function sectionHref(id: SectionId) {
  return `#${id}`;
}

export interface NavLink {
  /** 行き先セクション。href は sectionHref() で作る */
  id: SectionId;
  /** ナビのラベルは英語 1 語。セクション見出しの欧文ラベルと対応させる（§6.3.3） */
  label: string;
}

export const navLinks: readonly NavLink[] = [
  { id: sectionIds.about, label: "About" },
  { id: sectionIds.activities, label: "Activities" },
  { id: sectionIds.members, label: "Members" },
  { id: sectionIds.partners, label: "Partners" },
] as const;

/** 対応する Tabler アイコン名。実体は src/components/icons.tsx が解決する */
export type SocialBrand = "x" | "instagram" | "github";

export interface SocialLink {
  brand: SocialBrand;
  href: string;
  /** 表示は CSS で大文字化し、DOM は正書法を保つ（§6.3.2） */
  label: string;
}

export const socialLinks: readonly SocialLink[] = [
  { brand: "x", href: "https://x.com/", label: "X" },
  {
    brand: "instagram",
    href: "https://www.instagram.com/",
    label: "Instagram",
  },
  { brand: "github", href: "https://github.com/nu-chotech", label: "GitHub" },
] as const;

export const externalLinks = {
  discord: "https://discord.gg/",
} as const;
