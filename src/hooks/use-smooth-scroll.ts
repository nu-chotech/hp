"use client";

import { animate } from "motion/react";
import { useCallback } from "react";

const HEADER_OFFSET = 80;
const SCROLL_DURATION = 0.8;
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

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = window.scrollY + elementPosition - HEADER_OFFSET;

      animate(window.scrollY, offsetPosition, {
        duration: SCROLL_DURATION,
        ease: EASE_CURVE,
        onUpdate: (value) => window.scrollTo(0, value),
      });
    }
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
