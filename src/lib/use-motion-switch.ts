"use client";

import { useCallback, useEffect, useState } from "react";
import { MOTION_STORAGE_KEY } from "@/lib/motion";

/**
 * ページ内のモーションスイッチ（§7 M8）
 *
 * マーキー・ヒーローの回転語・入力中ドットは「1 つのページ内スイッチ」を共有する。
 * 停止ボタンを持つのはマーキー帯だけだが、状態を読むのは 3 つの部品なので、
 * スイッチの実体は帯ではなく lib に置く — 回転語やドットがフックを import した
 * ときに Marquee 本体と content・icons まで同じチャンクに引きずられないため。
 *
 * DOM に触るので "use client"。motion.ts（語彙の正本）はサーバからも読むため
 * フックを同居させられない。use-reveal.ts と同じ切り分け。
 */

/** ページ内スイッチの変更を同じドキュメントに配る（storage イベントは他タブにしか飛ばない） */
export const MOTION_SWITCH_EVENT = "chotech:motionchange";

function readSwitch() {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(MOTION_STORAGE_KEY);
  } catch {
    // プライベートブラウズなどで localStorage が投げる。既定値で続ける
  }
  // 低減設定のときの初期状態は「停止」。押せば再生できる（§6.9.3 効果行 / §7.5 R8）
  if (document.documentElement.classList.contains("reduced")) {
    return stored === "playing";
  }
  return stored !== "paused";
}

export function useMotionSwitch() {
  // SSR と初回描画は「再生中」。JS が無い読者には CSS のアニメーションがそのまま届き、
  // 低減設定の読者は下の同期で即座に停止側へ移る（hydration の不一致を作らない）
  const [playing, setPlayingState] = useState(true);

  useEffect(() => {
    const sync = () => setPlayingState(readSwitch());
    sync();
    window.addEventListener(MOTION_SWITCH_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(MOTION_SWITCH_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setPlaying = useCallback((next: boolean) => {
    try {
      window.localStorage.setItem(
        MOTION_STORAGE_KEY,
        next ? "playing" : "paused",
      );
    } catch {
      // 保存できなくてもこのセッションでは効かせる
    }
    window.dispatchEvent(new Event(MOTION_SWITCH_EVENT));
  }, []);

  return { playing, setPlaying };
}
