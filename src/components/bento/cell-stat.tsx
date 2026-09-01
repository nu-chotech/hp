import type { ComponentProps } from "react";
import { Cell } from "@/components/ui/ruled-grid";
import { cn } from "@/lib/utils";

/**
 * Cell Stat（§6.11.3）
 *
 * ページ全体で数字はここにしかないので、ここだけアクセントを当てて「規模」を
 * 一撃で読ませる（DECISION U-6）。逆に言えば、他のどこにも数字を置かないことが
 * この一撃の前提になっている。インク面の上の lime-400 は 10.83 で文字として成立する
 * （明るい地の上では 1.37 で成立しない — だからこのセルはインク面でなければならない）。
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
      <p className="text-accent">
        {/* 値と単位はベースライン揃え。Display/M 56 と Title/1 32 の重心を揃える */}
        <span aria-hidden="true" className="flex items-baseline">
          <span className="text-display-m">{value}</span>
          <span className="text-title-1">{suffix}</span>
        </span>
        <span className="sr-only">{accessibleName}</span>
      </p>
    </Cell>
  );
}
