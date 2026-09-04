/**
 * Marquee band（§6.9）
 *
 * トラックは aria-hidden。情報としてのパートナーはパートナー節が本文で持つ。
 * kind は組み方の別（欧文ラベル / 和欧の語 / 未確定の枠）。
 */
export type MarqueeItemKind = "label" | "word" | "ghost";

export interface MarqueeItem {
  kind: MarqueeItemKind;
  text: string;
}

export const marqueeContent = {
  items: [
    { kind: "label", text: "PARTNERS" },
    { kind: "word", text: "サポーターズ 技育プロジェクト" },
    { kind: "word", text: "カラビナテクノロジー株式会社" },
    { kind: "word", text: "NPO法人 N-BARCO" },
    { kind: "word", text: "長崎大学 アントレプレナーシップセンター" },
    { kind: "word", text: "Progate Path" },
    { kind: "ghost", text: "パートナー募集中" },
  ] satisfies MarqueeItem[],
} as const;
