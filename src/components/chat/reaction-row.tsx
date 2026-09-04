"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { chatIndent } from "@/components/chat/message";
import { ReactionChip } from "@/components/ui/chip";
import type { ChatReaction } from "@/content/about";
import { chatThread, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * リアクション行（§6.12.2 / DECISION U-25）
 *
 * 行が現れたあと、数字が 1 から目標値まで 1 ずつ上がる。Discord で押された順に
 * 数が増えていく様子を写すためで、「3」が最初から出ていると押した人がいないように
 * 見える。2 つ目のチップは少し遅れて始める — 同時に増えると 1 人が 2 つ押したように読める。
 *
 * SSR と止まっているとき（スイッチ・低減設定）は最終値。数が足りない状態で止めない（§7.5）。
 */
export interface ReactionRowProps {
  reactions: readonly ChatReaction[];
  /** スレッドの再生でこの行が見えているか */
  shown: boolean;
  /** ページのモーションスイッチと低減設定。false なら最終値で静止 */
  playing: boolean;
  style?: CSSProperties;
}

export function ReactionRow({
  reactions,
  shown,
  playing,
  style,
}: ReactionRowProps) {
  const [counts, setCounts] = useState(() => reactions.map((r) => r.count));

  useEffect(() => {
    if (!playing) {
      setCounts(reactions.map((r) => r.count));
      return;
    }

    if (!shown) {
      // 行が消え切ってから 1 へ戻す。消える途中で戻すと巻き戻る動きが薄く見える
      const timer = setTimeout(
        () => setCounts(reactions.map(() => 1)),
        duration.fallback,
      );
      return () => clearTimeout(timer);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    reactions.forEach((reaction, i) => {
      for (let n = 2; n <= reaction.count; n += 1) {
        const at =
          chatThread.reactionDelayMs +
          i * chatThread.reactionStaggerMs +
          (n - 2) * chatThread.reactionTickMs;
        timers.push(
          setTimeout(() => {
            setCounts((prev) => prev.map((v, j) => (j === i ? n : v)));
          }, at),
        );
      }
    });
    return () => {
      for (const timer of timers) clearTimeout(timer);
    };
  }, [playing, shown, reactions]);

  return (
    // リアクションは直前の発言に属するので、吹き出しの左端に揃える
    <li className={cn("flex gap-inline-xs", chatIndent)} style={style}>
      {reactions.map((reaction, i) => (
        <ReactionChip
          count={counts[i] ?? reaction.count}
          emoji={reaction.emoji}
          finalCount={reaction.count}
          key={reaction.emoji}
          label={reaction.label}
        />
      ))}
    </li>
  );
}
