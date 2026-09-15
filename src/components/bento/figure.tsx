import { cva, type VariantProps } from "class-variance-authority";
import { bentoIcons } from "@/components/icons";
import type { AboutFigure } from "@/content/about";
import { cn } from "@/lib/utils";

/**
 * Bento / Figure（§6.11.2、DECISION U-52 → C-32 → U-56）
 *
 * ベントの図: 緑の円の中の白い Tabler（stroke 1.5）。色は `figure/fill` = accent-fill
 * （green-600、チャットの自分側バブルと同じ）、図は `figure/ink` = on-accent（白、4.63）。
 * 円は §4.1 の radius/full の 4 つ目の例外（似顔絵・点・吹き出しと同じ「絵」の族）。
 *
 * **U-56 で円は語を連れるようになった。** U-52 の「語なし・64・題の下に横一列」は、
 * 題が語り、図が繰り返すという二重の構えで、円が題の装飾に見えていた。円を 80 に上げて
 * 語を下に添えると、円 + 語で 1 つの項目になり、セルの主役がその列になる（クライアント
 * 判断 2026-09-15: 「アイコンの存在感がなさすぎる」の続き）。
 *
 * 語は円と 1 つの塊（`stack/xs` 8）。段は面積で決まる:
 *   sm = `Footnote/Bold` 13 … 4 つ並ぶ FOR EVERYONE（「サイエンティスト」8 全角 = 104）
 *   md = `Title/3` 19 ……… 2 つだけの FORMAT（円と同じ格で読ませる）
 * サイクル図（CULTURE）の円は語を**中に**入れるので、ここではなく cycle.tsx が組む。
 * 円の面のレシピだけ `figureCircle` で共有する。
 */

/**
 * 円の面だけ。径と中の組み方は呼び出し側が決める（80 の figure は grid で 1 つを中央に、
 * サイクルの 96 / 128 は flex でアイコンと語を縦に重ねる）。
 * 強制配色では塗りが消えるので、Cell と同じ 1px の枠で円を残す（§7.5）。
 */
export const figureCircle =
  "shrink-0 rounded-full bg-figure-fill text-figure-ink forced-colors:border";

const label = cva("text-center", {
  variants: {
    size: {
      // 4 つ並ぶ列。語のほうが円より広いので折り返させない（列幅は語が決める）
      sm: "whitespace-nowrap text-footnote-bold",
      md: "text-title-3",
    },
  },
  defaultVariants: { size: "sm" },
});

export interface FigureProps extends VariantProps<typeof label> {
  figure: AboutFigure;
  className?: string;
}

export function Figure({ figure, size, className }: FigureProps) {
  const Icon = bentoIcons[figure.icon];

  return (
    <div className={cn("flex flex-col items-center gap-stack-xs", className)}>
      <span className={cn(figureCircle, "grid size-figure place-items-center")}>
        <Icon className="size-icon-xl" stroke={1.5} />
      </span>
      {/* 語は図の一部。読み上げは <li> の中でひと続きに読まれる（アイコンは aria-hidden） */}
      <span className={label({ size })}>{figure.label}</span>
    </div>
  );
}
