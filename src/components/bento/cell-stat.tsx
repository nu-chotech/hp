import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { Cell, type CellProps } from "@/components/ui/ruled-grid";
import { cn } from "@/lib/utils";

/**
 * Cell Stat（§6.11.3、DECISION U-24 / U-36 → U-56）
 *
 * 数字だけのセル。ページに 2 つある: **MEMBERS**（インク面、`50+`）と **SINCE**（地、`2025`）。
 * どちらも「キッカー → `stack/xs` 8 → 数字」を面の**中央**に置く（U-56。U-36 の「底に置く」は
 * 撤回 — セルの高さが隣のチャットに引かれて伸びると、底の数字とキッカーの間が空きすぎた）。
 * 中央揃えはページの左揃え原則に対する例外で、図として読ませるセルにだけ許す（§2.6）。
 *
 * 数字には縦のグラデーションを掛ける（`number-gradient-*`、§1.3.11）。規模を語るのは
 * 色ではなく**大きさ**という U-24 は変わらない — グラデーションは色相を持たず、字の上端から
 * 下端へ 1 段落ちるだけで、面の中で数字に厚みを与える。
 *
 * 「50+」「2025」は字面であって語ではない。読み上げには「メンバー 50人以上」「2025年4月 設立」
 * という文を渡し、可視側は `aria-hidden` で外す（§8.5）。**SINCE だけ見出し**（`<h3>`）— 設立は
 * 節の事実のひとつで、見出しナビゲーションに残す価値がある。MEMBERS は見出しを持たない。
 */

const value = cva("", {
  variants: {
    size: {
      /** MEMBERS。`Display/L` 96 / 40 + 単位は `Display/M` 56 / 32 */
      l: "text-display-l",
      /** SINCE。`Display/M` 56 / 32 — 4 桁が 1×1 の内側に収まる最大（§6.11.3） */
      m: "text-display-m",
    },
  },
  defaultVariants: { size: "l" },
});

const kicker = cva("text-overline", {
  variants: {
    tone: {
      ground: "text-ink-secondary",
      /** インク面の階層はアルファで作る。キッカーは tertiary 72%（8.29） */
      ink: "text-inverse-ink-tertiary",
    },
  },
  defaultVariants: { tone: "ink" },
});

export interface CellStatProps
  extends ComponentProps<"div">,
    VariantProps<typeof value> {
  /** MEMBERS / SINCE。見出しにはしない（§8.5） */
  kicker: string;
  /** 半角数字。この書体に tnum は無いので桁揃えは考えない（§6.11.3） */
  value: string;
  /** 「+」。value とベースラインを揃える */
  suffix?: string;
  /** 読み上げに渡す 1 文 */
  accessibleName: string;
  /** 面。ページでは MEMBERS = ink / SINCE = ground */
  tone?: NonNullable<VariantProps<typeof kicker>["tone"]>;
  /** 数字を `<h3>` にする（SINCE）。既定は見出しを持たない */
  asHeading?: boolean;
  colSpan?: CellProps["colSpan"];
}

export function CellStat({
  kicker: kickerText,
  value: valueText,
  suffix,
  accessibleName,
  size,
  tone = "ink",
  asHeading = false,
  colSpan,
  className,
  ...props
}: CellStatProps) {
  const Numeral = asHeading ? "h3" : "p";

  return (
    <Cell
      className={cn("items-center justify-center gap-stack-xs", className)}
      colSpan={colSpan}
      surface={tone}
      {...props}
    >
      <p className={kicker({ tone })}>{kickerText}</p>
      <Numeral>
        {/* グラデーションは**字だけを包む箱**に当てる。sr-only を同じ箱に入れると、
            背景の抜き型に読み上げ用の空白が混ざる（§6.5） */}
        <span
          aria-hidden="true"
          className={cn(
            "flex items-baseline",
            tone === "ink" ? "number-gradient-ink" : "number-gradient-ground",
          )}
        >
          <span className={value({ size })}>{valueText}</span>
          {/* 値と単位はベースライン揃え。Display/L 96 と Display/M 56 の重心を揃える */}
          {suffix ? <span className="text-display-m">{suffix}</span> : null}
        </span>
        <span className="sr-only">{accessibleName}</span>
      </Numeral>
    </Cell>
  );
}
