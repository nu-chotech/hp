import type { ComponentProps } from "react";
import { ArrowUpRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Cell } from "@/components/ui/ruled-grid";
import { cn } from "@/lib/utils";

/**
 * Cell CTA（§6.11.6）
 *
 * Discord への導線は「参加する」1 本だけ（DECISION U-10）。見学のような中間段階を
 * 置いても心理的な障壁は下がらず、導線が 2 つに割れて主導線が弱くなる。
 * ハードルは文言（見るだけ参加も歓迎です）で下げ、動詞は 1 つに保つ。
 *
 * Desktop は横並び、Mobile は縦（DECISION K-8）。Mobile のセル内幅 298 では
 * 横並びにすると題が 3 字/行に潰れる。ボタンも Mobile だけ全幅にする。
 */
export interface CellCtaProps extends ComponentProps<"div"> {
  /** まずはDiscordから。Title/3、1 行（§8.5 の h3） */
  title: string;
  /** 見るだけ参加も歓迎です。Footnote、inverse/ink-secondary（11.78） */
  sub: string;
  label: string;
  href: string;
}

export function CellCta({
  title,
  sub,
  label,
  href,
  className,
  ...props
}: CellCtaProps) {
  return (
    // 内容は 1 かたまりなので、行が伸びたときはセルの中央に置く。
    // 他のセルのように地に落とすと、ボタンだけが罫線に貼り付いて見える
    <Cell
      className={cn("justify-center", className)}
      colSpan={2}
      surface="ink"
      {...props}
    >
      <div className="flex flex-col gap-stack-md desktop:flex-row desktop:items-center desktop:gap-inline-md">
        <div>
          <h3 className="text-title-3">{title}</h3>
          {/* 題に従属する 1 行なので stack/2xs 4。段落ではない */}
          <p className="mt-stack-2xs text-footnote text-inverse-ink-secondary">
            {sub}
          </p>
        </div>
        {/* インク面の副次ボタン = Outline。同じ面に主ボタンは無いが、
            塗りボタンはセル全体を白く割ってしまうのでここでは使わない（§6.2.3） */}
        <Button
          asChild
          className="w-full shrink-0 desktop:w-auto"
          icon={ArrowUpRight}
          surface="ink"
          variant="outline"
        >
          {/* target="_blank" は使わない。新しいタブは読者が選ぶ（DECISION M-15） */}
          <a href={href}>
            {label}
            <span className="sr-only">（外部）</span>
          </a>
        </Button>
      </div>
    </Cell>
  );
}
