import { partnersContent } from "@/content/partners";

/**
 * Marquee band（§6.9）
 *
 * トラックは aria-hidden。情報としてのパートナーはパートナー節が本文で持つ。
 * kind は組み方の別（欧文ラベル / 和欧の語 / 未確定の枠）。
 *
 * Word はパートナー節の配列（partners.ts）から生成する。帯と本文で団体名や並びが
 * 食い違わないようにするため — 団体の追加・改名は partners.ts の 1 箇所で済む。
 */
export type MarqueeItemKind = "label" | "word" | "ghost";

export interface MarqueeItem {
  kind: MarqueeItemKind;
  text: string;
}

export const marqueeContent = {
  items: [
    { kind: "label", text: "PARTNERS" },
    ...partnersContent.partners.map(
      (partner): MarqueeItem => ({ kind: "word", text: partner.name }),
    ),
    { kind: "ghost", text: "パートナー募集中" },
  ] satisfies MarqueeItem[],
} as const;
