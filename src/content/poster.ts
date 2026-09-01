import { externalLinks } from "@/config/site";

/**
 * クロージングのポスター CTA（§6.17）
 *
 * ページで唯一の「色面」。角丸も罫線もなく、色面の切り替えそのものが境界になる。
 */
export const posterContent = {
  kicker: "JOIN US",
  /** 著者改行。text-wrap: balance は使わない */
  display: "いっしょに、\nやろう。",
  paragraph:
    "初心者も、見るだけ参加も歓迎。ほぼ毎日、Discordのどこかで動いています。「やってみたい」があれば、それで十分です。",
  action: { label: "Discordに参加する", href: externalLinks.discord },
} as const;
