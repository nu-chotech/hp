import { Chip } from "@/components/ui/chip";
import { ImageSlot } from "@/components/ui/image-slot";
import { Cell } from "@/components/ui/ruled-grid";
import type { Activity } from "@/content/activities";

/**
 * Activity セル（§6.13 / DECISION U-41）
 *
 * 上端に 16:9 の写真を縁まで敷き（Member カードと同じ inset 0 → body だけ inset/cell）、
 * その下に題・副題・説明・タグ。4 セルは同じ大きさ・同じ解剖で、優先は順序が示す。
 *
 * **リンクではない**（DECISION U-17）。4 件とも同じ Discord に着地していたので、
 * 押した対象と行き先が対応しなかった。活動ごとの行き先が用意できるまでは、
 * ここは読ませるための面に徹する — 参加への導線は Hero・Nav・Poster が受け持つ。
 *
 * したがって hover / pressed / focus も矢印も持たない。「押せそうに見えて押せない」
 * より「押せるように見えない」ほうが誠実で、状態を持たないぶん罫線グリッドの
 * 静けさも保てる。見出しがそのまま節の名前になるので aria-labelledby も要らない。
 */

/**
 * next/image への移行時にそのまま持ち上がる sizes。
 * Desktop 2 列（597）、tablet 2 列、Mobile 1 列。
 */
const PHOTO_SIZES = "(min-width: 78rem) 597px, (min-width: 48rem) 50vw, 100vw";

export interface ActivityCellProps {
  activity: Activity;
  /** 開催頻度バッジ。既定は出さない（DECISION U-9） */
  showFrequency?: boolean;
  /** 先頭のセルだけ eager。ファーストビューの直下ではないが、About の直後で早めに入る */
  priority?: boolean;
}

export function ActivityCell({
  activity,
  showFrequency = false,
  priority = false,
}: ActivityCellProps) {
  const badge = showFrequency ? activity.frequency : undefined;

  return (
    <Cell asChild inset="none">
      <li>
        {/* 写真は装飾（alt ""）。活動の情報は下の題と説明が持つ（§8.6） */}
        <ImageSlot
          alt=""
          className="shrink-0"
          priority={priority}
          ratio="16:9"
          sizes={PHOTO_SIZES}
          src={activity.photo}
        />

        <div className="flex flex-1 flex-col gap-stack-xs p-inset-cell">
          {/* 題群 ↔ バッジは flex-wrap（§6.13.1）。セル幅が足りなければバッジが
              題の下に落ちる。最小の間隔は inline/lg 24 */}
          <div className="flex flex-wrap items-baseline justify-between gap-inline-lg">
            {/* バッジ（開催頻度）を h3 の中に入れない。showFrequency を true にした
                瞬間に、見出しナビゲーションの一覧へ運用情報が混ざる（§8.5） */}
            <h3 className="flex flex-col gap-stack-2xs">
              <span className="text-title-1">{activity.title}</span>
              <span className="text-subheadline text-ink-secondary">
                {activity.subtitle}
              </span>
            </h3>
            {badge ? (
              <span className="text-overline-jp text-pop-badge">{badge}</span>
            ) : null}
          </div>

          <p className="text-body-s text-ink-secondary">
            {activity.description}
          </p>

          {/* Tag は非対話（§6.4）。mt-auto でセルの底に揃える — 説明が 2 行と 3 行で
              揺れても、同じ行のセルでタグの高さが揃う（罫線グリッドの行は stretch） */}
          {/* preflight の list-style:none で Safari/VoiceOver はリストロールを剥がす。
              role が落ちると generic は naming prohibited なので aria-label ごと消える */}
          {/* biome-ignore-start lint/a11y/noRedundantRoles: Safari/VoiceOver は preflight の list-style:none でリストロールを剥がすため、§6.13.3 / §8.5 が要求する <ul> の意味論を role の再宣言で戻す */}
          {/* biome-ignore lint/a11y/useSemanticElements: Safari/VoiceOver は preflight の list-style:none でリストロールを剥がすため、§6.13.3 / §8.5 が要求する <ul> の意味論を role の再宣言で戻す */}
          <ul
            aria-label="キーワード"
            className="mt-auto flex flex-wrap gap-inline-xs pt-stack-2xs"
            role="list"
          >
            {activity.tags.map((tag) => (
              <Chip as="li" key={tag}>
                {tag}
              </Chip>
            ))}
          </ul>
          {/* biome-ignore-end lint/a11y/noRedundantRoles: Safari/VoiceOver は preflight の list-style:none でリストロールを剥がすため、§6.13.3 / §8.5 が要求する <ul> の意味論を role の再宣言で戻す */}
        </div>
      </li>
    </Cell>
  );
}
