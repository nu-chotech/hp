"use client";

import { type CSSProperties, useRef } from "react";
import { chatIndent, Tail } from "@/components/chat/message";
import { useAwake } from "@/hooks/use-awake";
import { cn } from "@/lib/utils";

/**
 * 入力中インジケータ（§6.12.3 / §7.4.5）
 *
 * ラベルは持たない（Messages と同じで、3 点の動きだけで「入力中」は伝わる）。
 * 可視の間だけ動かす必要があるので、ページで数少ないクライアント部品になる。
 * 監視するのは自分自身の 1 要素だけで、状態も真偽値ひとつしか持たない。
 */

/**
 * ドットのキーフレーム。
 *
 * 数値は書かず CSS 変数（--dots-period 1.2s / --dots-stagger 200ms）を参照する。
 * トークン層が正本で、JS 側の `typingDots` は「JS でしか決められない値」用の控えなので、
 * CSS で表現できるこの周期をここで再宣言すると二重管理になる（src/lib/motion.ts の方針）。
 *
 * `prefers-reduced-motion: no-preference` で括るのは、globals.css の
 * `.typing__dot { animation: none }` と**排他**にするため。両者が同じ詳細度で
 * 重なると挿入順（この <style> は head に hoist される）で勝敗が決まってしまう。
 * 低減時はアニメーション自体が生成されず、不透明度 100% の静止した 3 点が残る（§7.5）。
 *
 * 停止の入力は 2 つあり、どちらも**祖先の属性**で受ける（子孫セレクタ）。
 * - `[data-typing-paused]`: このセルの可視・タブの表示（下の effect が自分の <li> に付ける）
 * - `[data-motion="paused"]`: ページ内のモーションスイッチ（M8 / §7.4.2）。
 *   マーキー・回転語・入力中ドットの 3 つを 1 つのスイッチで止める要件なので、
 *   状態の正本は DOM の 1 か所 —— スイッチ所有ストリームが `<html>` に
 *   `data-motion="paused"` を立て、`localStorage[MOTION_STORAGE_KEY]` に保存する。
 *   ドット側は CSS で購読するだけにして、JS の相互依存を作らない
 *   （WCAG 2.2.2 はページ内の停止手段を求める。OS 設定では代替にならない）。
 */
const DOT_KEYFRAMES = `
@media (prefers-reduced-motion: no-preference) {
  @keyframes chotech-typing-dot {
    0%, 100% { opacity: 0.3 }
    50% { opacity: 1 }
  }
  .typing__dot {
    animation: chotech-typing-dot var(--dots-period) ease-in-out infinite;
  }
  [data-typing-paused] .typing__dot,
  [data-motion="paused"] .typing__dot {
    animation-play-state: paused;
  }
}
`;

/** ドット間 5。4px モジュールから外れる唯一の間隔（§6.12.3、--inline-dot） */
const DOT_GAP = "gap-inline-dot";
/** 吹き出しの inset 16 × 11（§6.12.3）。横だけ専用トークン --inset-typing-x */
const TYPING_INSET = "px-inset-typing-x py-inset-md";

export interface TypingProps {
  /** 再生（§6.12 / U-16）の出方。スレッド側が 1 手ずつ渡す */
  style?: CSSProperties;
}

export function Typing({ style }: TypingProps) {
  const ref = useRef<HTMLLIElement>(null);
  // 停止条件は「画面外」と「タブが裏」の 2 つ（§7.5 の「バックグラウンド / 非可視」）。
  // 初期値は「動く」— JS が無い読者には常時アニメーションのまま届くほうが、
  // 一時停止したまま固まって届くより実態に近い
  const awake = useAwake(ref, { initial: true });

  return (
    <li
      className={chatIndent}
      data-typing-paused={awake ? undefined : ""}
      ref={ref}
      style={style}
    >
      {/* React 19 の style hoisting。href が同じなら何個描画しても head に 1 つ */}
      <style href="chotech-typing-dot" precedence="default">
        {DOT_KEYFRAMES}
      </style>
      <span
        className={cn(
          "relative inline-flex items-center rounded-bubble rounded-bl-bubble-tail bg-surface",
          DOT_GAP,
          TYPING_INSET,
        )}
      >
        {/* ドットは図形なので ink-tertiary（surface 上 3.50、UI 3:1 ✓、DECISION L-15） */}
        {[0, 1, 2].map((step) => (
          <span
            className="typing__dot size-dot shrink-0 rounded-full bg-ink-tertiary"
            key={step}
            // ディレイもトークン参照。--dots-stagger 200ms × 段
            style={{ animationDelay: `calc(${step} * var(--dots-stagger))` }}
          />
        ))}
        <span className="sr-only">入力中</span>
        {/* テールは吹き出しと同色（§6.12.1）。相手側なので左下 */}
        <Tail className="-left-1.5 text-surface" />
      </span>
    </li>
  );
}
