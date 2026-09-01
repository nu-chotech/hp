import { cva, type VariantProps } from "class-variance-authority";
import { Chip } from "@/components/ui/chip";
import { Cell } from "@/components/ui/ruled-grid";
import type { Activity } from "@/content/activities";

/**
 * Activity セル（§6.13）
 *
 * **リンクではない**（DECISION U-17）。4 件とも同じ Discord に着地していたので、
 * 押した対象と行き先が対応しなかった。活動ごとの行き先が用意できるまでは、
 * ここは読ませるための面に徹する — 参加への導線は Hero・Bento CTA・Poster が
 * 3 度受け持っていて足りている。
 *
 * したがって hover / pressed / focus も矢印も持たない。「押せそうに見えて押せない」
 * より「押せるように見えない」ほうが誠実で、状態を持たないぶん罫線グリッドの
 * 静けさも保てる。見出しがそのまま節の名前になるので aria-labelledby も要らない。
 */

/** 題（§6.13.1）。Feature だけ Display/M まで上げて入口の太さの差を面積と級数で示す */
const activityTitle = cva("", {
  variants: {
    size: {
      feature: "text-display-m",
      compact: "text-title-1",
    },
  },
  defaultVariants: { size: "compact" },
});

/**
 * 説明（Body/S 14、ink-secondary）。
 * Feature は 1 行が 42 全角まで伸びてしまうので measure/paragraph 588 で止める。
 * Compact はセル幅（Desktop 397 / 597）がそのまま行長になるので上限を持たない。
 */
const activityDescription = cva("text-body-s text-ink-secondary", {
  variants: {
    size: {
      feature: "max-w-measure",
      compact: "",
    },
  },
  defaultVariants: { size: "compact" },
});

export interface ActivityCellProps extends VariantProps<typeof activityTitle> {
  activity: Activity;
  /** 開催頻度バッジ。既定は出さない（DECISION U-9） */
  showFrequency?: boolean;
  /** 罫線グリッド上の span。どのセルがどこに座るかはベント側の知識なので外から渡す */
  className?: string;
}

export function ActivityCell({
  activity,
  size,
  showFrequency = false,
  className,
}: ActivityCellProps) {
  const badge = showFrequency ? activity.frequency : undefined;

  return (
    <Cell asChild className={className}>
      <li className="gap-stack-xs">
        {/* 題群 ↔ バッジは flex-wrap（§6.13.1）。セル幅が足りなければバッジが
            題の下に落ちる。最小の間隔は inline/lg 24 */}
        <div className="flex flex-wrap items-baseline justify-between gap-inline-lg">
          {/* バッジ（開催頻度）を h3 の中に入れない。showFrequency を true にした
              瞬間に、見出しナビゲーションの一覧へ運用情報が混ざる（§8.5） */}
          <h3 className="flex flex-col gap-stack-2xs">
            <span className={activityTitle({ size })}>{activity.title}</span>
            <span className="text-subheadline text-ink-secondary">
              {activity.subtitle}
            </span>
          </h3>
          {badge ? (
            <span className="text-overline-jp text-pop-badge">{badge}</span>
          ) : null}
        </div>

        <p className={activityDescription({ size })}>{activity.description}</p>

        {/* Tag は非対話（§6.4） */}
        {/* preflight の list-style:none で Safari/VoiceOver はリストロールを剥がす。
            role が落ちると generic は naming prohibited なので aria-label ごと消える */}
        {/* biome-ignore-start lint/a11y/noRedundantRoles: Safari/VoiceOver は preflight の list-style:none でリストロールを剥がすため、§6.13.3 / §8.5 が要求する <ul> の意味論を role の再宣言で戻す */}
        {/* biome-ignore lint/a11y/useSemanticElements: Safari/VoiceOver は preflight の list-style:none でリストロールを剥がすため、§6.13.3 / §8.5 が要求する <ul> の意味論を role の再宣言で戻す */}
        <ul
          aria-label="キーワード"
          className="flex flex-wrap gap-inline-xs"
          role="list"
        >
          {activity.tags.map((tag) => (
            <Chip as="li" key={tag}>
              {tag}
            </Chip>
          ))}
        </ul>
        {/* biome-ignore-end lint/a11y/noRedundantRoles: Safari/VoiceOver は preflight の list-style:none でリストロールを剥がすため、§6.13.3 / §8.5 が要求する <ul> の意味論を role の再宣言で戻す */}
      </li>
    </Cell>
  );
}
