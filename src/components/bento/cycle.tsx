import { figureCircle } from "@/components/bento/figure";
import { bentoIcons } from "@/components/icons";
import type { AboutFigure } from "@/content/about";
import { cn } from "@/lib/utils";

/**
 * Cycle（CULTURE のサイクル図、§6.11.2 / DECISION U-56）
 *
 * 「学ぶ → 創る → 話す」が巡ることを、1 枚の絵で言い切るためのセル内の図。
 * 細い環（軌道）の上に緑の円を 3 つ、天（−90°）・右下（30°）・左下（150°）に置き、
 * 中心に「仲間と」を据える。**矢印は置かない** — 3 つが等間隔で環に乗っていれば順序では
 * なく循環に読め、矢印を足すと「工程図」になって、どこが始まりかという問いが生まれる。
 *
 * ## 幾何
 *
 * 箱は正方形で、中の 3 つの寸法（軌道の径・円の径・円の中心の位置）はすべて**箱の幅に
 * 対する比**で持つ。px を 2 セット持たないのは、Mobile の 1 列が container に追従して
 * 375 未満で箱ごと縮むため（286 は 375 でちょうど内側に収まる寸法）。
 *
 * | | 箱 | 軌道 | 円 | アイコン | 中心語 | 円の語 |
 * |---|---|---|---|---|---|---|
 * | Mobile（md） | 286 | 190（66.43%） | 96（33.57%） | 32 | 26/32 | 13/20 |
 * | Desktop（lg） | 440 | 300（68.18%） | 128（29.09%） | 40 | 40/44 | 17/24 |
 *
 * 円の中心は「箱の中心 ± 軌道の半径 × (cos θ, sin θ)」。比で書くと、天が `50% − r`、
 * 下の 2 つが `50% ± x` / `50% + y`（r = 軌道 ÷ 2、x = r·cos30°、y = r·sin30° = r/2）。
 * 中心語は箱の中心に重心を置く（`top: 50%` + `−50%` の移動）ので、環の径が変わっても
 * 3 つの円と中心語の関係は崩れない。
 *
 * ## 読み上げ
 *
 * 環と円は装飾（`aria-hidden`）で、意味は `<h3>` が 1 文で運ぶ — 可視は中心語「仲間と」
 * だけ、読み上げは「仲間と、学ぶ。創る。話す。」（U-52 までの題と同じ文）。円の中の語を
 * 読み上げに残すと「仲間と 学ぶ 創る 話す」と助詞のない語列になり、節の主張が伝わらない。
 */

/**
 * 円の中心の位置（箱に対する比）。天から時計回りで content の `cycle` と同じ順。
 * `--cycle-r` / `--cycle-x` / `--cycle-y` は箱が段ごとに持つ。
 */
const CYCLE_POSITION = [
  // −90°（天）
  "left-1/2 top-[calc(50%_-_var(--cycle-r))]",
  // 30°（右下）
  "left-[calc(50%_+_var(--cycle-x))] top-[calc(50%_+_var(--cycle-y))]",
  // 150°（左下）
  "left-[calc(50%_-_var(--cycle-x))] top-[calc(50%_+_var(--cycle-y))]",
] as const;

export interface CycleProps {
  /** 3 つ。順序は天から時計回り */
  figures: readonly AboutFigure[];
  /** 中心語。句点は付けない（文ではなく語） */
  center: string;
  /** 図全体の読み上げ名。h3 の中身になる */
  accessibleTitle: string;
}

export function Cycle({ figures, center, accessibleTitle }: CycleProps) {
  return (
    <div
      className={cn(
        // 箱は常に正方形。Mobile の狭い紙では container に追従して縮む
        "relative aspect-square w-full max-w-cycle",
        // Mobile（箱 286）: 軌道 190 / 円 96 / r 95 / x 82.27 / y 47.5
        "[--cycle-circle:33.57%] [--cycle-ring:66.43%] [--cycle-r:33.22%] [--cycle-x:28.77%] [--cycle-y:16.61%]",
        // Desktop（箱 440）: 軌道 300 / 円 128 / r 150 / x 129.9 / y 75
        "tablet:[--cycle-circle:29.09%] tablet:[--cycle-ring:68.18%] tablet:[--cycle-r:34.09%] tablet:[--cycle-x:29.52%] tablet:[--cycle-y:17.05%]",
      )}
    >
      {/* 軌道。1px の環で、色はインク面のテクスチャ（cycle/orbit = ground@24） */}
      <span
        aria-hidden="true"
        className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 aspect-square w-[var(--cycle-ring)] rounded-full border border-cycle-orbit"
      />

      {/* 中心語。箱の中心に重心を置く */}
      <h3 className="-translate-y-1/2 absolute inset-x-0 top-1/2 text-center text-cycle-center">
        <span aria-hidden="true" className="number-gradient-ink">
          {center}
        </span>
        <span className="sr-only">{accessibleTitle}</span>
      </h3>

      {figures.map((figure, index) => {
        const Icon = bentoIcons[figure.icon];

        return (
          <span
            aria-hidden="true"
            className={cn(
              figureCircle,
              "-translate-x-1/2 -translate-y-1/2 absolute flex aspect-square w-[var(--cycle-circle)] flex-col items-center justify-center gap-stack-2xs",
              CYCLE_POSITION[index],
            )}
            key={figure.icon}
          >
            <Icon className="size-icon-xl tablet:size-icon-2xl" stroke={1.5} />
            <span className="text-cycle-word">{figure.label}</span>
          </span>
        );
      })}
    </div>
  );
}
