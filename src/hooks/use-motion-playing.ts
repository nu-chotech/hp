"use client";

import { useEffect, useState } from "react";

/**
 * JS 駆動のループ（回転語・チャット再生・写真送り）を動かしてよいか。
 *
 * かつてはページ内のモーションスイッチ（旧 M8、マーキー帯の停止 / 再生ボタン）を
 * 畳み込んでいたが、DECISION U-31 でスイッチごと撤去した。いま止める条件は
 * OS の `prefers-reduced-motion` だけ。CSS アニメーション（マーキー・入力中ドット・
 * 背景写真）は globals.css の同じメディアクエリで止まるので、ここは JS 側の控え。
 *
 * SSR と初回描画は「再生中」。JS が無い読者には CSS の既定がそのまま届き、
 * 低減設定の読者は下の同期で即座に停止側へ移る（hydration の不一致を作らない）。
 * 設定の切り替えにも追随する — 切り替えた読者を取り残さない。
 */
export function useMotionPlaying() {
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPlaying(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return playing;
}
