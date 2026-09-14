import { externalLinks } from "@/config/site";

/**
 * クロージングのポスター CTA（§6.17）
 *
 * ページで唯一の「色面」。角丸も罫線もなく、色面の切り替えそのものが境界になる。
 */
export const posterContent = {
  kicker: "JOIN US",
  /**
   * 著者改行。text-wrap: balance は使わない。
   * 文は白、句点だけ緑（DECISION U-51）— Hero の h1 と同じ「言い切りの印」。
   */
  display: { text: "Hack\nYour Limits", period: "." },
  paragraph:
    "最初は誰でも初心者。学びたい、挑戦したい、仲間を作りたい。そう思ったら最初の一歩を踏み出してみよう。ChoTechは、あなたのチャレンジする気持ちを応援します。",
  action: { label: "Discordに参加する", href: externalLinks.discord },
} as const;
