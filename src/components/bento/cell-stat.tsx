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
 *
 * 数字の下に所属の内訳を並べる（DECISION U-29）。「50+」だけでは「どこの学生か」が
 * 分からない — 長崎大学の複数学部に加えて県立大・総科大からも来ていることが、
 * 「長崎大学生に関わらず誰でも」（Hero）の裏づけになる。人数は確定するまで出さない。
 */
export interface Affiliation {
  name: string;
  /** 学部・研究科など。無ければ 1 行 */
  detail?: string;
}
export interface CellStatProps extends ComponentProps<"div"> {
  /** MEMBERS。見出しにはしない（§8.5） */
  kicker: string;
  /** 半角数字。この書体に tnum は無いので桁揃えは考えない（§6.11.3） */
  value: string;
  /** 「+」。value とベースラインを揃える */
  suffix: string;
  /** 読み上げに渡す 1 文 */
  accessibleName: string;
  /** 所属の内訳。人数の多い順 */
  affiliations: readonly Affiliation[];
}

export function CellStat({
  kicker,
  value,
  suffix,
  accessibleName,
  affiliations,
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
      {/* 数字と内訳は 1 つの塊としてセルの底に置く。kicker との間は justify-between が取る */}
      <div className="flex flex-col gap-stack-sm">
        <p className="text-inverse-ink">
          {/* 値と単位はベースライン揃え。Display/L 96 と Display/M 56 の重心を揃える */}
          <span aria-hidden="true" className="flex items-baseline">
            <span className="text-display-l">{value}</span>
            <span className="text-display-m">{suffix}</span>
          </span>
          <span className="sr-only">{accessibleName}</span>
        </p>
        {/* 大学名は Footnote inverse/ink-secondary（11.78）、学部は Caption inverse/ink-tertiary（8.29） */}
        <ul aria-label="所属" className="flex flex-col gap-stack-2xs">
          {affiliations.map((affiliation) => (
            <li key={affiliation.name}>
              <span className="block text-footnote text-inverse-ink-secondary">
                {affiliation.name}
              </span>
              {affiliation.detail ? (
                <span className="block text-caption text-inverse-ink-tertiary">
                  {affiliation.detail}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </Cell>
  );
}
