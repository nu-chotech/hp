"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * 巻き上がる数字（§6.4 Reaction / DECISION U-25）
 *
 * value が変わるたび、旧値が上へ抜けて新値が下から入る。カウンターのドラムを
 * 1 段だけ回す動きで、回転語（§7.4.3）と同じ語彙（位置 + 不透明度、spring/quick）。
 * 初回描画では動かない — 何も変わっていないのに動くと「増えた」という情報が嘘になる。
 *
 * 動きは CSS keyframes に置き、reduced-motion では生成しない（typing.tsx と同じ排他）。
 * 旧値の要素は既定で不透明度 0 にしてあるので、アニメーションが無い環境では
 * 単に新値へ切り替わる。再生の可否そのものは呼び出し側（chat/reaction-row）が持つ:
 * 止まっているときは value が変わらないので、ここは何もしない。
 */
const ROLL_KEYFRAMES = `
.roll__out { opacity: 0 }
@media (prefers-reduced-motion: no-preference) {
  @keyframes chotech-roll-in { from { translate: 0 100%; opacity: 0 } }
  @keyframes chotech-roll-out { from { translate: 0 0; opacity: 1 } to { translate: 0 -100%; opacity: 0 } }
  .roll__in { animation: chotech-roll-in var(--spring-quick) both }
  .roll__out { animation: chotech-roll-out var(--spring-quick) both }
}
`;

export interface RollingNumberProps {
  value: number;
  className?: string;
}

export function RollingNumber({ value, className }: RollingNumberProps) {
  const [state, setState] = useState({
    current: value,
    previous: null as number | null,
    turn: 0,
  });

  // 前回の値は render 中に導く（React の「以前の render の情報を保存する」パターン）
  if (state.current !== value) {
    setState({ current: value, previous: state.current, turn: state.turn + 1 });
  }

  return (
    // 1 行ぶんの高さの窓。inline-grid で新旧を同じセルに重ね、はみ出しを切る
    <span
      className={cn(
        "relative inline-grid min-w-[1ch] overflow-hidden",
        className,
      )}
    >
      {state.previous !== null ? (
        <span
          aria-hidden="true"
          className="roll__out col-start-1 row-start-1"
          key={`out-${state.turn}`}
          onAnimationEnd={() =>
            setState((prev) => ({ ...prev, previous: null }))
          }
        >
          {state.previous}
        </span>
      ) : null}
      <span
        className={cn(
          "col-start-1 row-start-1",
          state.previous !== null && "roll__in",
        )}
        key={`in-${state.turn}`}
      >
        {state.current}
      </span>
      {/* React 19 の style hoisting。href が同じなら何個描画しても head に 1 つ */}
      <style href="chotech-roll" precedence="default">
        {ROLL_KEYFRAMES}
      </style>
    </span>
  );
}
