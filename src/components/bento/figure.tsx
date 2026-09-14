import { cva } from "class-variance-authority";
import { bentoIcons } from "@/components/icons";
import type { AboutFigure } from "@/content/about";
import { cn } from "@/lib/utils";

/**
 * Bento / Figure（§6.11.2、DECISION U-52 / C-32）
 *
 * ベントの図: 語（上）+ 色の円の中の Tabler 32（下）を 1 単位として横に並べる。
 * 「仲間と、の下に丸の背景に囲まれたアイコン（それぞれ色が違う + 上に学ぶ / 創る / 話す）」
 * というクライアントの絵をそのまま部品にした。語は円の上 — 文（題）の続きとして読ませ、
 * 円は語の下で「図」になる。左揃え（§0.1）、中央揃えはしない。
 *
 * 径は 2 段: md 64（`size/figure`、1×1 と OFFICIAL）/ lg 80（`size/illustration`、2×1 statement）。
 * 図の中の Tabler は両方 32 / stroke 1.5（icon/xl）。色は content が意味で選ぶ（about.ts）。
 * 円は §4.1 の radius/full の 4 つ目の例外（似顔絵・点・吹き出しと同じ「絵」の族）。
 *
 * 行全体は aria-hidden — 語はどれもそのセルの h3 の読み上げ名の部分文字列で（§8.5）、
 * 図は装飾（意味は題が運ぶ、§6.11.2）。だから <ul> ではなく素の div で組む。
 * flex-wrap は代替フォントで語が太ったときの保険で、設計上は 1 行に収まる（§9.3 の字数上限）。
 */
const disc = cva(
  // 強制配色では塗りが消えるので、Cell と同じ 1px の枠で円を残す（§7.5）
  "grid shrink-0 place-items-center rounded-full forced-colors:border",
  {
    variants: {
      size: { md: "size-figure", lg: "size-illustration" },
      tint: {
        blue: "bg-figure-blue-fill text-figure-blue-ink",
        orange: "bg-figure-orange-fill text-figure-orange-ink",
        pink: "bg-figure-pink-fill text-figure-pink-ink",
        yellow: "bg-figure-yellow-fill text-figure-yellow-ink",
      },
    },
    defaultVariants: { size: "md" },
  },
);

// 語は ink。キッカー（ink-secondary）と同じ 12px でも、これは述語であって注記ではない
const label = cva("whitespace-nowrap text-ink", {
  variants: {
    size: { md: "text-caption-bold", lg: "text-subheadline" },
  },
  defaultVariants: { size: "md" },
});

export interface FigureRowProps {
  figures: readonly AboutFigure[];
  /** md 64 / lg 80。2×1 statement（CULTURE）だけ lg */
  size?: "md" | "lg";
  className?: string;
}

export function FigureRow({ figures, size = "md", className }: FigureRowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex flex-wrap",
        // 単位の間: md inline/sm 12（3 つで 64+12+64+12+96 = 248 ≤ 1×1 の内側 249.5）、
        // lg inline/md 16（3 つで 272 ≤ Mobile の内側 298）
        size === "lg" ? "gap-inline-md" : "gap-inline-sm",
        className,
      )}
    >
      {figures.map(({ icon, label: text, tint }) => {
        const Icon = bentoIcons[icon];
        return (
          <div className="flex flex-col items-start gap-stack-2xs" key={text}>
            <span className={label({ size })}>{text}</span>
            <span className={disc({ size, tint })}>
              <Icon className="size-icon-xl" stroke={1.5} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
