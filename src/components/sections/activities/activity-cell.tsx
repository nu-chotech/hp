import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { Chip } from "@/components/ui/chip";
import { Cell } from "@/components/ui/ruled-grid";
import type { Activity } from "@/content/activities";
import { cn } from "@/lib/utils";

/**
 * Activity セル（§6.13）
 *
 * セル **全体** が 1 本のリンク。中に別のリンク・ボタンを置かない（§6.13.3 の
 * 入れ子リンク禁止）。だから面の塗り（Cell）と当たり判定（<a>）を分け、
 * padding は <a> 側に持たせる — inset を li 側に置くと余白の 24 が
 * リンクの外に出て、セルの縁が押せなくなる。
 *
 * 読み上げ名は「題 + 副題」だけ（aria-labelledby、DECISION M-12）。説明とタグは
 * 名前に混ぜない代わりにリンクの内容としてそのまま読める。名前を h3 全体に
 * させないのは、Feature の題が Display/M で「Talk Day ライトニングトーク」と
 * 一続きに読まれるのがちょうど良い長さだからで、説明まで足すと名前が段落になる。
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

/**
 * リンク面そのもの。
 * hover / pressed は「地のティント」1 段だけで、矢印の移動・拡縮・影は足さない
 * （§7 M9 / DECISION M-8 / §6.1.3）。入り 100ms・離脱 200ms・押下 0ms（G6）。
 * Tailwind v4 の hover: は既定で @media (hover: hover) の中なので、タッチ端末で
 * ホバーが固着して Pressed と見分けが付かなくなる問題（G3 / K-14）は起きない。
 *
 * フォーカスリングは **inset**（offset −2、DECISION K-7）。罫線グリッドの 2px 罫と
 * セルの縁が接しているので、外側 2px に出すとリングが罫の上に乗って線が三重に見える。
 * リング **色** は宣言しない — 祖先の data-surface から globals.css が解決する。
 */
const activityLink = [
  "flex flex-1 flex-col gap-stack-xs p-inset-cell no-underline",
  // G1: 応答は pointer-down から。独自の Pressed に置き換えるので OS のハイライトは消す
  "cursor-pointer touch-manipulation [-webkit-tap-highlight-color:transparent]",
  "transition-colors ease-color duration-(--dur-2)",
  "hover:duration-(--dur-1) active:duration-(--dur-0)",
  "hover:bg-state-hover-tint active:bg-state-pressed-tint",
  "focus-visible:outline-offset-(--focus-offset-inset)",
];

export interface ActivityCellProps extends VariantProps<typeof activityTitle> {
  activity: Activity;
  /** aria-labelledby が指す id の接頭辞。ページ内で一意であればよい */
  cellId: string;
  /** 開催頻度バッジ。既定は出さない（DECISION U-9） */
  showFrequency?: boolean;
  /** 罫線グリッド上の span。どのセルがどこに座るかはベント側の知識なので外から渡す */
  className?: string;
}

export function ActivityCell({
  activity,
  cellId,
  size,
  showFrequency = false,
  className,
}: ActivityCellProps) {
  const titleId = `${cellId}-title`;
  const subtitleId = `${cellId}-subtitle`;
  const externalId = `${cellId}-external`;
  const badge = showFrequency ? activity.frequency : undefined;
  /**
   * 行き先が外部かどうかは href だけが知っている（Activity 型に印はない）。
   * §9.6「行全体がサイト内リンク。行先が外部になる場合は `arrow-up-right`」に従い、
   * 矢印の向きと visually-hidden の「（外部）」をここで切り替える。
   */
  const isExternal = /^(https?|mailto):/.test(activity.href);
  const ArrowIcon = isExternal ? ArrowUpRight : ArrowRight;

  return (
    <Cell asChild className={className} inset="none">
      <li>
        <a
          aria-labelledby={
            isExternal
              ? `${titleId} ${subtitleId} ${externalId}`
              : `${titleId} ${subtitleId}`
          }
          className={cn(activityLink)}
          href={activity.href}
        >
          {/* 題群 ↔ バッジ/矢印は flex-wrap（§6.13.1）。セル幅が足りなければ
              バッジが題の下に落ちる。最小の間隔は inline/lg 24 で、余った幅は
              justify-between が矢印側に送る — 矢印はセルの右上角に立つ「この面は
              リンクである」という印なので、題の直後に置くと本文の一部に見える。
              items-baseline は矢印の下端を題のベースラインに載せるため（G13 の
              「ラベル直後」は Button のラベル送りの規則で、面全体がリンクである
              このセルには当たらない） */}
          <div className="flex flex-wrap items-baseline justify-between gap-inline-lg">
            {/* 見出しは題 + 副題だけ（§8.5 の DOM 見本）。バッジ（開催頻度）を
                h3 の中に入れると、showFrequency を true にした瞬間に
                見出しナビゲーションの一覧へ運用情報が混ざる。
                副題は題の**下**（stack/2xs 4）。セルが縦に伸びるので横並びにしない */}
            <h3 className="flex flex-col gap-stack-2xs">
              <span className={activityTitle({ size })} id={titleId}>
                {activity.title}
              </span>
              {/* ティントの上に乗る小さな文字なので ink-tertiary は使えない（K-1） */}
              <span
                className="text-subheadline text-ink-secondary"
                id={subtitleId}
              >
                {activity.subtitle}
              </span>
            </h3>
            <span className="flex items-center gap-inline-xs">
              {badge ? (
                <span className="text-overline-jp text-pop-badge">{badge}</span>
              ) : null}
              {/* バッジが消えても矢印は常時残る（§6.13.1）。行き先が外部なら
                  arrow-up-right（§6.1.9 / §9.6）。target="_blank" は付けない（M-15） */}
              {isExternal ? (
                <span className="sr-only" id={externalId}>
                  （外部）
                </span>
              ) : null}
              <ArrowIcon className="size-icon-sm" />
            </span>
          </div>

          <p className={activityDescription({ size })}>
            {activity.description}
          </p>

          {/* Tag は非対話（§6.4）。リンクの中にあってもフォーカスを持たない */}
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
        </a>
      </li>
    </Cell>
  );
}
