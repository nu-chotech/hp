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

/** セクションの id。ナビとセクション見出しで共有する */
export const sectionIds = {
  about: "about",
  activities: "activities",
  forYou: "for-you",
  members: "members",
  partners: "partners",
  join: "join",
} as const;

export interface NavLink {
  href: string;
  /** ナビのラベルは英語 1 語。セクション見出しの欧文ラベルと対応させる（§6.3.3） */
  label: string;
}

export const navLinks: readonly NavLink[] = [
  { href: `#${sectionIds.about}`, label: "About" },
  { href: `#${sectionIds.activities}`, label: "Activities" },
  { href: `#${sectionIds.members}`, label: "Members" },
  { href: `#${sectionIds.partners}`, label: "Partners" },
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
  /** パートナー相談窓口 */
  partnerContact: "mailto:contact@example.com",
} as const;
