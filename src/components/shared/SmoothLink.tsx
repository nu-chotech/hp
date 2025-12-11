"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { cn } from "@/lib/utils";

interface SmoothLinkProps extends Omit<ComponentProps<typeof Link>, "onClick"> {
  children: ReactNode;
  /** リンククリック時の追加処理 */
  onNavigate?: () => void;
}

/**
 * スムーズスクロール機能付きLinkコンポーネント
 *
 * href が # で始まる場合、クリック時にスムーズスクロールを実行
 *
 * @example
 * ```tsx
 * <SmoothLink href="#about">詳しく見る</SmoothLink>
 * <SmoothLink href="#contact" onNavigate={() => setIsOpen(false)}>
 *   お問い合わせ
 * </SmoothLink>
 * ```
 */
export function SmoothLink({
  href,
  children,
  onNavigate,
  className,
  ...props
}: SmoothLinkProps) {
  const { scrollToSection } = useSmoothScroll();
  const isAnchorLink = typeof href === "string" && href.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchorLink) {
      scrollToSection(e, href);
    }
    onNavigate?.();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
