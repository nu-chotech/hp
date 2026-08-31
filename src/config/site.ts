import type { LucideIcon } from "lucide-react";
import {
  Github,
  Heart,
  Instagram,
  Rocket,
  Twitter,
  UserCircle,
  Users,
} from "lucide-react";

/**
 * サイト全体の設定値
 *
 * 文言はここを一次情報とし、metadata / manifest / Hero / Logo / Footer が参照する。
 */
export const siteConfig = {
  name: "ChoTech",
  /** ロゴ横やタブタイトルに添える一言 */
  description: "学生エンジニアコミュニティ",
  /** <title> と OGP のタイトル */
  title: "ChoTech | 学生エンジニアコミュニティ",
  tagline: "共に学び、共に創り、共に発信する。",
  /** Hero のサブテキスト */
  lead: "「技術を学ぶ・作る・話す」を、みんなで気軽に楽しむコミュニティ",
  origin: "長崎大学 情報データ科学部発",
  /** 検索結果向けの説明文 */
  longDescription:
    "長崎大学 情報データ科学部発の学生エンジニアコミュニティ。共に学び、共に創り、共に発信する仲間と一緒に、技術を学ぶ・作る・話すを気軽に楽しめます。",
  /** SNS カード・manifest 向けの短い説明文 */
  shortDescription:
    "長崎大学 情報データ科学部発の学生エンジニアコミュニティ。共に学び、共に創り、共に発信する。",
  keywords: ["ChoTech", "学生エンジニア", "プログラミング", "コミュニティ"],
  /** ブラウザ UI / manifest のテーマカラー */
  themeColor: "#0a4c95",
  copyright: `© ${new Date().getFullYear()} ChoTech`,
} as const;

/**
 * ナビゲーションリンク
 * Header と Footer で共有
 */
export interface NavLink {
  href: string;
  label: string;
  icon?: LucideIcon;
}

export const navLinks: NavLink[] = [
  { href: "#about", label: "私たちについて", icon: Users },
  { href: "#activities", label: "活動内容", icon: Rocket },
  { href: "#members", label: "運営メンバー", icon: UserCircle },
  { href: "#recruit", label: "参加する", icon: Heart },
];

/**
 * SNSリンク
 * Footer, RecruitSection で共有
 */
export interface SocialLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const socialLinks: SocialLink[] = [
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://github.com", label: "GitHub", icon: Github },
];

/**
 * 外部リンク
 */
export const externalLinks = {
  discord: "https://discord.gg/example",
} as const;
