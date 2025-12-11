import type { LucideIcon } from "lucide-react";
import {
  Github,
  Heart,
  Instagram,
  Newspaper,
  Rocket,
  Twitter,
  UserCircle,
  Users,
} from "lucide-react";

/**
 * サイト全体の設定値
 */
export const siteConfig = {
  name: "ChoTech",
  description: "学生エンジニアコミュニティ",
  tagline: "共に学び、共に創り、共に発信する。",
  origin: "長崎大学 情報データ科学部発",
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
  { href: "#news", label: "お知らせ", icon: Newspaper },
  { href: "#members", label: "運営メンバー", icon: UserCircle },
  { href: "#recruit", label: "参加する", icon: Heart },
];

/**
 * SNSリンク
 * Footer, ContactSection, MembersSection で共有
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
