import type { ComponentProps } from "react";
import { Cell } from "@/components/ui/ruled-grid";
import { cn } from "@/lib/utils";

/**
 * Cell Stat（§6.11.3）
 *
 * ページ全体で数字はここにしかない。規模を語るのは色ではなく**大きさ**で、
 * 数字は白（inverse/ink 14.86）、Display/L で kicker と釣り合わせる（DECISION U-24 —
 * 当初の lime の数字（U-6）は撤回。アクセントの枠を 1 つ使うわりに、同じセルの中で
 * kicker との釣り合いが取れていなかった）。
 *
 * 「50+」は字面であって語ではない。読み上げには「メンバー 50人以上」という文を渡し、
 * 可視側は aria-hidden で外す（§8.5）。
 */
export interface CellStatProps extends ComponentProps<"div"> {
  /** MEMBERS。見出しにはしない（§8.5） */
  kicker: string;
  /** 半角数字。この書体に tnum は無いので桁揃えは考えない（§6.11.3） */
  value: string;
  /** 「+」。value とベースラインを揃える */
  suffix: string;
  /** 読み上げに渡す 1 文 */
  accessibleName: string;
}

export function CellStat({
  kicker,
  value,
  suffix,
  accessibleName,
  className,
  ...props
}: CellStatProps) {
  return (
    <Cell
      className={cn("justify-between gap-stack-md", className)}
      surface="ink"
      {...props}
    >
      <p className="text-overline text-inverse-ink-tertiary">{kicker}</p>
      <p className="text-inverse-ink">
        {/* 値と単位はベースライン揃え。Display/L 96 と Display/M 56 の重心を揃える */}
        <span aria-hidden="true" className="flex items-baseline">
          <span className="text-display-l">{value}</span>
          <span className="text-display-m">{suffix}</span>
        </span>
        <span className="sr-only">{accessibleName}</span>
      </p>
    </Cell>
  );
}
