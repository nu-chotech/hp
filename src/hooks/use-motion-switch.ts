"use client";

import { useCallback, useEffect, useState } from "react";
import { MOTION_EVENT, MOTION_STORAGE_KEY } from "@/lib/motion";

/**
 * ページ内のモーションスイッチ（§7 M8）
 *
 * マーキー・ヒーローの回転語・入力中ドットは 1 つのスイッチを共有する。
 * 停止ボタンを持つのはマーキー帯だけだが、状態を読むのは 3 つの部品なので、
 * スイッチの実体は帯ではなく lib に置く — 回転語やドットがフックを import した
 * ときに Marquee 本体と content・icons まで同じチャンクに引きずられないため。
 *
 * 状態の唯一の真実は **`<html data-motion>` 属性** で、書くのはこのモジュールだけ。
 * JS の購読ではなく DOM の属性にしたのは、3 つのループのうち 2 つ（マーキーの
 * トラックと入力中ドット）が CSS アニメーションで、CSS から読める形でないと
 * 各部品に JS の配線が要るため。値は 3 状態:
 *
 *   playing … 読者が明示的に再生を選んだ。低減設定より優先する
 *   paused  … 読者が明示的に止めた
 *   （無し） … 既定。低減設定でなければ動く
 *
 * DOM に触るので "use client"。lib/motion.ts（語彙の正本）はサーバからも読むので
 * フックを同居させられない。src/hooks/ に置くのはその切り分けで、use-reveal.ts と同じ。
 */

function readSwitch() {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(MOTION_STORAGE_KEY);
  } catch {
    // プライベートブラウズなどで localStorage が投げる。既定値で続ける
  }
  // 低減設定のときの初期状態は「停止」。押せば再生できる（§6.9.3 効果行 / §7.5）
  if (document.documentElement.classList.contains("reduced")) {
    return stored === "playing";
  }
  return stored !== "paused";
}

/** 明示的に選ばれたときだけ属性を出す。既定は属性なし（= CSS の既定に委ねる） */
function syncAttribute() {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(MOTION_STORAGE_KEY);
  } catch {
    // 同上
  }
  const root = document.documentElement;
  if (stored === "playing" || stored === "paused") {
    root.dataset.motion = stored;
  } else {
    delete root.dataset.motion;
  }
}

/**
 * スイッチを読むだけの側（回転語・ドット）。
 * 属性は下の useMotionSwitch が書くので、こちらは購読に徹する。
 */
export function useMotionPlaying() {
  // SSR と初回描画は「再生中」。JS が無い読者には CSS の既定がそのまま届き、
  // 低減設定の読者は下の同期で即座に停止側へ移る（hydration の不一致を作らない）
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const sync = () => setPlaying(readSwitch());
    sync();
    window.addEventListener(MOTION_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(MOTION_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return playing;
}

/** スイッチを持つ側（マーキーの停止セル）。書き込みと属性の同期を担う */
export function useMotionSwitch() {
  const playing = useMotionPlaying();

  // 属性はこのフックだけが書く。他タブからの storage 変更にも追随させる
  useEffect(() => {
    syncAttribute();
    window.addEventListener(MOTION_EVENT, syncAttribute);
    window.addEventListener("storage", syncAttribute);
    return () => {
      window.removeEventListener(MOTION_EVENT, syncAttribute);
      window.removeEventListener("storage", syncAttribute);
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
    // storage イベントは書いた当のドキュメントには届かない（HTML 仕様）ので、
    // 同一ドキュメントには自前のイベントで配る
    window.dispatchEvent(new Event(MOTION_EVENT));
  }, []);

  return { playing, setPlaying };
}
