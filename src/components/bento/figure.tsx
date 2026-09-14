import { bentoIcons } from "@/components/icons";
import type { AboutIcon } from "@/content/about";
import { cn } from "@/lib/utils";

/**
 * Bento / Figure（§6.11.2、DECISION U-52 / C-32）
 *
 * ベントの図: 淡い緑の円（64 = `size/figure`）の中の Tabler 32 / stroke 1.5。語は添えない —
 * 意味は題が運び、図は Apple のベントと同じ「1 タイル 1 つの絵」として題の下に並ぶ
 * （クライアント判断 2026-09-15: 3 色の使い分けと説明書きはやめ、アクセントの緑系で統一）。
 * 色は `figure/fill` = accent-subtle（green-200）、図は `figure/ink` = on-accent-subtle（green-900、7.33）。
 * 円は §4.1 の radius/full の 4 つ目の例外（似顔絵・点・吹き出しと同じ「絵」の族）。
 *
 * 行全体は aria-hidden（装飾、§6.11.2）。だから <ul> ではなく素の div で組む。
 * 3 つ並べて 64 × 3 + 12 × 2 = 216 ≤ 1×1 の内側 249.5。
 */
export interface FigureRowProps {
  figures: readonly AboutIcon[];
  className?: string;
}

export function FigureRow({ figures, className }: FigureRowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex flex-wrap gap-inline-sm", className)}
    >
      {figures.map((name) => {
        const Icon = bentoIcons[name];
        return (
          <span
            // 強制配色では塗りが消えるので、Cell と同じ 1px の枠で円を残す（§7.5）
            className="grid size-figure shrink-0 place-items-center rounded-full bg-figure-fill text-figure-ink forced-colors:border"
            key={name}
          >
            <Icon className="size-icon-xl" stroke={1.5} />
          </span>
        );
      })}
    </div>
  );
}
