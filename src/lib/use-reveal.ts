"use client";

import { motionVar, revealMotion } from "./motion";

/**
 * reveal の実行側（§7.4.1）
 *
 * 語彙（motion.ts）と分けてあるのは、motion.ts の MOTION_BOOTSTRAP_SCRIPT を
 * layout.tsx（Server Component）が読むため。フックを含むモジュールを
 * サーバから import すると react-server 条件の react に useEffect が無く build が落ちる。
 */

import { useEffect } from "react";

/** 段の起点。セクションを跨いだらディレイは 0 に戻る（§7.4.1 のインデックス） */
const REVEAL_GROUP_SELECTOR = "[data-reveal-group], section, header, footer";

/**
 * 1 要素を出す。
 *
 * トランジションは CSS ではなくここで当てる: globals.css が持つのは隠し状態だけで、
 * 「出るときの動き」を静的に書くと reveal 前の要素にも掛かってしまうため。
 * 出し終えたらインラインスタイルを畳んで、DOM に痕跡を残さない。
 *
 * オブザーバを使わない Hero（fonts.ready か duration/3 の早い方で開始、§7.4.1）も
 * これを直接呼べば同じ動きになる。
 */
export function revealElement(el: HTMLElement, step = 0) {
  const reduced = document.documentElement.classList.contains("reduced");
  // 隠れていない要素（reduced、ブートストラップ未実行、display:none の中）に
  // トランジションを掛けると transitionend が来ず、後始末のインラインスタイルが
  // DOM に残り続ける。出すべき状態が既にあるなら属性を外すだけにする
  const hidden = !reduced && getComputedStyle(el).opacity !== "1";

  if (!hidden) {
    el.removeAttribute("data-reveal");
    return;
  }

  const style = el.style;
  style.setProperty(
    "transition",
    `opacity ${motionVar.springDefault}, transform ${motionVar.springDefault}`,
  );
  // transition 短縮形が delay を 0 に戻すので、必ずこの順で書く
  style.setProperty(
    "transition-delay",
    `calc(${Math.min(step, revealMotion.maxSteps)} * ${motionVar.stagger})`,
  );
  style.setProperty("opacity", "1");
  style.setProperty("transform", "none");
  el.removeAttribute("data-reveal");

  el.addEventListener(
    "transitionend",
    () => {
      style.removeProperty("transition");
      style.removeProperty("transition-delay");
      style.removeProperty("opacity");
      style.removeProperty("transform");
    },
    { once: true },
  );
}

/**
 * [data-reveal] を IntersectionObserver で **一度だけ** 出す（§7.4.1）
 *
 * 一度出したら戻しても消さない — 読み終えたものが消えるのは予測可能性に反する。
 * motion/react の whileInView を使わないのは、隠し状態が SSR の HTML に
 * 焼き込まれ、JS が無い読者にページが真っ白で届くため（§7 グローバル 5）。
 *
 * クライアント境界の一番深いところ（アプリを包む client leaf）から 1 回だけ呼ぶ。
 */
export function useReveal() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (targets.length === 0) return;

    // ディレイの段は「そのセクションで何番目か」。DOM 順で数える
    const steps = new WeakMap<Element, number>();
    const counters = new Map<Element, number>();
    for (const el of targets) {
      const group = el.closest(REVEAL_GROUP_SELECTOR) ?? document.body;
      const seen = counters.get(group) ?? 0;
      counters.set(group, seen + 1);
      // 飛び番（Hero の 0/1/3/4）を作れるよう、著者の指定を優先する
      const explicit = Number(el.dataset.revealIndex);
      steps.set(el, Number.isFinite(explicit) ? explicit : seen);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          revealElement(el, steps.get(el) ?? 0);
        }
      },
      { rootMargin: revealMotion.rootMargin },
    );

    for (const el of targets) observer.observe(el);
    return () => observer.disconnect();
  }, []);
}
