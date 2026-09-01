import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * §2.8 のテキストロール 22 個。
 *
 * tailwind-merge は既定の Tailwind テーマ向けに設定されていて、`text-label-m` のような
 * 未知の値を font-size と判別できず **色** に分類する。すると同じ要素の `text-action-ink`
 * と衝突したことにされ、片方が黙って消える（後勝ち）。ロール名を font-size 側に
 * 登録して、型ロールと色ロールを別のグループとして扱わせる。
 */
const TEXT_ROLES = [
  "display-xl",
  "display-l",
  "display-m",
  "title-1",
  "title-2",
  "title-3",
  "title-3-caps",
  "headline",
  "subheadline",
  "callout",
  "body-l",
  "body-m",
  "body-s",
  "footnote",
  "footnote-bold",
  "caption",
  "caption-bold",
  "label-m",
  "label-s",
  "label-nav",
  "overline",
  "overline-jp",
] as const;

const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: [...TEXT_ROLES] }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
