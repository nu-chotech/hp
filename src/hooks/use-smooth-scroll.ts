"use client";

import { animate } from "motion/react";
import { useCallback } from "react";

const HEADER_OFFSET = 80;
const SCROLL_DURATION = 0.7;
const EASE_CURVE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/**
 * スムーズスクロール機能を提供するカスタムフック
 *
 * @example
 * ```tsx
 * const { scrollToSection, scrollToId } = useSmoothScroll();
 *
 * // イベントハンドラーとして使用
 * <Link href="#about" onClick={(e) => scrollToSection(e, "#about")}>
 *
 * // IDを直接指定してスクロール
 * scrollToId("contact");
 * ```
 */
export function useSmoothScroll() {
  const scrollToId = useCallback((targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = window.scrollY + elementPosition - HEADER_OFFSET;

    // 動きの低減時はスクロール自体が前庭系を刺激するので即座に移動する
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      window.scrollTo(0, offsetPosition);
      return;
    }

    const controls = animate(window.scrollY, offsetPosition, {
      duration: SCROLL_DURATION,
      ease: EASE_CURVE,
      onUpdate: (value) => window.scrollTo(0, value),
    });

    // 走っている最中でもユーザーが操作したら即座に手を放す。
    // 自動スクロールがユーザーの入力と綱引きするのが一番よくない。
    const cancel = () => {
      controls.stop();
      removeListeners();
    };
    const removeListeners = () => {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };

    window.addEventListener("wheel", cancel, { passive: true, once: true });
    window.addEventListener("touchstart", cancel, {
      passive: true,
      once: true,
    });
    window.addEventListener("keydown", cancel, { once: true });

    controls.then(removeListeners);
  }, []);

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      scrollToId(targetId);
    },
    [scrollToId],
  );

  return { scrollToSection, scrollToId };
}
