import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * 罫線（§6.5）
 *
 * 太さは 2 段しかない。2px = 構成要素の「間」（ナビ下・マーキー上下・セクション上・
 * フッター上・罫線グリッド）、1px = 構成要素の「内部」の仕切り（行間、縦の区切り）。
 * 強弱は色ではなく太さで出す（§4.2）。
 *
 * 線は border ではなく塗り（background）で描く。罫線グリッドが fill + gap で
 * できているので、同じ語彙に揃えると Figma と CSS の構造が一致する（DECISION L-9）。
 * その代わり forced-colors では塗りが消えるため、そのときだけ 1px の border を
 * 補って線を残す（§7.5）。
 *
 * 全幅で走らせるか container 幅で止めるかは **置き場所** が決める（§4.3-2）:
 * セクション直下に置けば viewport 端まで、Container の中に置けば container 端まで。
 */
// border-0: semantic のとき <hr> になるが、preflight の `hr { border-top-width: 1px }` が
// 残ると @layer base の `border-color: var(--divider)` を拾って 2px 罫の上にもう 1px 乗る
// （= 3px。§4.2 に無い太さ）。forced-colors の 1px は下のバリアントが後から足し直す。
const ruleVariants = cva("shrink-0 border-0", {
  variants: {
    orientation: {
      horizontal: "w-full forced-colors:border-t",
      // 縦罫は隣の文字サイズと同じ高さ（size/rule-v 12）。full-bleed の縦線は作らない
      vertical: "h-rule-v forced-colors:border-l",
    },
    weight: {
      rule: "",
      hair: "",
    },
    tone: {
      divider: "bg-divider",
      hairline: "bg-divider-hairline",
      /** インク面のテクスチャ（ヒーローの格子線）。1.18 なので構造には使わない */
      inverse: "bg-inverse-hairline",
      /** ヒーロー meta の区切り。区切りは行の文字色を継ぐ（§6.5） */
      current: "bg-current",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", weight: "rule", class: "h-rule" },
    { orientation: "horizontal", weight: "hair", class: "h-hair" },
    { orientation: "vertical", weight: "rule", class: "w-rule" },
    { orientation: "vertical", weight: "hair", class: "w-hair" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    weight: "rule",
    tone: "divider",
  },
});

export interface RuleProps
  extends ComponentProps<"div">,
    VariantProps<typeof ruleVariants> {
  /**
   * 内容の意味的な切れ目のときだけ true（<hr> = role separator になる）。
   * ページ上の罫線はほぼ面の構造で、読み上げに切れ目を足す必要はないので既定は装飾。
   */
  semantic?: boolean;
}

export function Rule({
  orientation,
  weight,
  tone,
  semantic = false,
  className,
  ...props
}: RuleProps) {
  const Comp = semantic ? "hr" : "div";
  // hr と div は同じ HTML 属性を取るが、ref とイベントの要素型だけが違う。
  // 実体は同じ属性集合なので、交差型に絞って両方に渡せるようにする
  const rest = props as ComponentProps<"div"> & ComponentProps<"hr">;

  return (
    <Comp
      role={semantic ? undefined : "presentation"}
      className={cn(ruleVariants({ orientation, weight, tone }), className)}
      {...rest}
    />
  );
}

export { ruleVariants };
