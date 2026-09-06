import { partnersContent } from "@/content/partners";

/**
 * Marquee band（§6.9）
 *
 * トラックは aria-hidden。情報としてのパートナーはパートナー節が本文で持つ。
 * kind は組み方の別（欧文ラベル / 団体名の語 / 団体ロゴ）。「パートナー募集中」の
 * Ghost は 2026-09-07 に撤去した — 募集の呼びかけは Partners セクションの導入文が担う。
 *
 * 団体はパートナー節の配列（partners.ts）から生成する。帯と本文で団体や並びが
 * 食い違わないようにするため — 団体の追加・改名は partners.ts の 1 箇所で済む。
 * ロゴのある団体は Logo（64 角、DECISION U-30）、まだ無い団体は Word（団体名）で出す。
 */
export type MarqueeItemKind = "label" | "word" | "logo";

export type MarqueeItem =
  | { kind: "label" | "word"; text: string }
  /** text は団体名。トラックは aria-hidden なので alt には使わず、key と開発時の識別に使う */
  | { kind: "logo"; text: string; src: string };

export const marqueeContent = {
  items: [
    { kind: "label", text: "PARTNERS" },
    ...partnersContent.partners.map(
      (partner): MarqueeItem =>
        partner.logo
          ? { kind: "logo", text: partner.name, src: partner.logo }
          : { kind: "word", text: partner.name },
    ),
  ] satisfies MarqueeItem[],
} as const;
