"use client";

import { type RefObject, useEffect, useState } from "react";

/**
 * 「画面内 かつ タブが前面」（§7.5「バックグラウンド / 非可視」）
 *
 * ループを持つ部品は 5 つある — マーキーの帯、ヒーローの回転語、入力中ドット、
 * チャットの再生、写真の送り。どれも止まる条件は同じで、しかも 2 つの入力が要る:
 * IntersectionObserver はタブが裏に回っても交差を報告し続けるので、可視性の判定を
 * 足さないと裏に置いたタブでループが回り続ける。逆に visibilitychange だけでは
 * 画面外の部品が動く。2 つを 1 つの真偽値に畳み、後始末も 1 か所に保つ。
 *
 * 部品ごとに書き写していたときは、この 2 入力の畳み込みが 5 通りに散っていた
 * （初期値・交差の読み方・可視性の判定式がそれぞれ微妙に違った）。停止条件は
 * §7.5 が定めるページ全体の規則で、部品ごとの裁量ではない。
 */
export function useAwake(
  ref: RefObject<Element | null>,
  {
    /**
     * 監視が始まるまでの値。
     *
     * 既定は false —「画面に入ってから動き出す」。読み手が最初に見るのが
     * 動き始めの瞬間になるので、途中から始まったように見えない。
     *
     * true にするのは、JS が無い読者にも動いた状態で届く部品だけ（マーキーの帯と
     * 入力中ドット）。CSS アニメーションが実体で、JS は止める側でしか関わらないため、
     * 初期値を false にすると一瞬止まって見えてから動き出す。
     */
    initial = false,
  }: { initial?: boolean } = {},
) {
  const [awake, setAwake] = useState(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let onScreen = initial;
    const sync = () => setAwake(onScreen && !document.hidden);

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) onScreen = entry.isIntersecting;
      sync();
    });

    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref, initial]);

  return awake;
}
