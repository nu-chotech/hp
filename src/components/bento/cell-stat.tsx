import type { ComponentProps } from "react";
import { Chip } from "@/components/ui/chip";
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
 * 数字の下に所属をバッジで並べる（DECISION U-29）。「50+」だけでは「どこの学生か」が
 * 分からない — 長崎大学の複数学部に加えて県立大・総科大からも来ていることが、
 * 「長崎大学生に関わらず誰でも」（Hero）の裏づけになる。人数は確定するまで出さない。
 * バッジは Activity のキーワードと同じ Chip（§6.4）の ink 面トーン。文の列より
 * 「タグ」として読ませるほうが一覧性が高い。
 */
export interface Affiliation {
  university: string;
  /** 学部・研究科。あれば「大学 学部」の 1 バッジになる */
  unit?: string;
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
  /** 所属のバッジ。人数の多い順 */
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
        {/* Activity のキーワード（§6.13.3）と同じ組み方。chip 間 inline/xs 8 で折り返す */}
        {/* biome-ignore-start lint/a11y/noRedundantRoles: Safari/VoiceOver は preflight の list-style:none でリストロールを剥がすため、§8.5 が要求する <ul> の意味論を role の再宣言で戻す */}
        {/* biome-ignore lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
        <ul
          aria-label="所属"
          className="flex flex-wrap gap-inline-xs"
          role="list"
        >
          {affiliations.map((affiliation) => {
            const label = affiliation.unit
              ? `${affiliation.university} ${affiliation.unit}`
              : affiliation.university;
            return (
              <Chip as="li" key={label} tone="inverse">
                {label}
              </Chip>
            );
          })}
        </ul>
        {/* biome-ignore-end lint/a11y/noRedundantRoles: 同上 */}
      </div>
    </Cell>
  );
}
