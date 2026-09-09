import { externalLinks } from "@/config/site";

/**
 * クロージングのポスター CTA（§6.17）
 *
 * ページで唯一の「色面」。角丸も罫線もなく、色面の切り替えそのものが境界になる。
 */
export const posterContent = {
  kicker: "JOIN US",
  /** 著者改行。text-wrap: balance は使わない */
  display: "Hack\nYour Limits.",
  paragraph:
    "最初は誰でも初心者。学びたい、挑戦したい、仲間を作りたい。そう思ったら最初の一歩を踏み出してみよう。ChoTechは、あなたのチャレンジする気持ちを応援します。",
  action: { label: "Discordに参加する", href: externalLinks.discord },
} as const;
