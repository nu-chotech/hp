import type { ComponentProps } from "react";
import { Cycle, type CycleProps } from "@/components/bento/cycle";
import { Cell, type CellProps } from "@/components/ui/ruled-grid";
import { cn } from "@/lib/utils";

/**
 * Cell Cycle（CULTURE、§6.11.2 / DECISION U-56）
 *
 * ベントで最も大きい面（wide では 2×2）をインク面にして、サイクル図を 1 つだけ置く。
 * 解剖は他のセルと同じ 2 段 — キッカー（天）／図（残り全部）。図は `flex-1` の中で
 * 上下左右中央なので、行が伸びてもセルの中で図が中空に浮かない。
 *
 * 面をインクにするのは、節の主張をここ 1 か所で言い切るため（Cell Stat と同じ扱い）。
 * 白い環と白い語がインクの上で最もよく効き、緑の円 3 つが地に沈まない。
 */

export interface CellCycleProps
  extends Omit<ComponentProps<"section">, "title">,
    CycleProps {
  /** CULTURE。見出しにしない（§8.5）— 見出しは図の中心語が持つ */
  kicker: string;
  colSpan?: CellProps["colSpan"];
  rowSpan?: CellProps["rowSpan"];
  className?: string;
}

export function CellCycle({
  kicker,
  figures,
  center,
  accessibleTitle,
  colSpan,
  rowSpan,
  className,
  ...props
}: CellCycleProps) {
  return (
    <Cell
      asChild
      className={cn("gap-stack-lg tablet:gap-stack-xl", className)}
      colSpan={colSpan}
      rowSpan={rowSpan}
      surface="ink"
    >
      <section {...props}>
        <p className="text-overline text-inverse-ink-tertiary">{kicker}</p>
        <div className="flex flex-1 items-center justify-center">
          <Cycle
            accessibleTitle={accessibleTitle}
            center={center}
            figures={figures}
          />
        </div>
      </section>
    </Cell>
  );
}
