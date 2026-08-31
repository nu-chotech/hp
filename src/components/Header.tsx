"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/shared/Logo";
import { SmoothLink } from "@/components/shared/SmoothLink";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/config/site";
import { spring } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

// 内部コンテンツのスタッガー用コンテナ
const contentVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// ナビアイテムのアニメーション
const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.snappy,
  },
};

// モバイルメニューコンテナのアニメーション
// 開閉は spring。開いている途中でもう一度押せば、その場から閉じに転じる。
const mobileMenuVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: spring.sheet,
      opacity: { duration: 0.15 },
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
  // 入場と退場は同じ経路をたどる (上から降りて、上へ戻る)
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: spring.snappy,
      opacity: { duration: 0.12 },
    },
  },
};

// モバイルナビアイテムのアニメーション
const mobileNavItemVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.snappy,
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.12 },
  },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // スクロールは入力経路。毎イベントで setState せず、
  // passive リスナー + rAF で 1 フレーム 1 回に畳む。
  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setIsScrolled(window.scrollY > 50);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // クリックアウトサイドでメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div
        data-translucent
        className={cn(
          // transition-all は backdrop-filter まで巻き込むので対象を絞る
          "max-w-5xl mx-auto rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500 ease-out",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-border/80 shadow-lg shadow-black/5"
            : "bg-background/60 backdrop-blur-lg border-border/50 shadow-md shadow-black/5",
        )}
      >
        <motion.div
          ref={headerRef}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="px-5 sm:px-8"
        >
          <div className="flex items-center justify-between h-16">
            <motion.div variants={navItemVariants}>
              <Logo />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={navItemVariants}>
                  <SmoothLink
                    href={link.href}
                    className="group relative flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                  >
                    {link.icon && (
                      <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    )}
                    <span>{link.label}</span>
                  </SmoothLink>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <motion.div variants={navItemVariants} className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                onClick={toggleMenu}
              >
                <Menu
                  className={cn(
                    "w-5 h-5 transition-all duration-300",
                    isOpen && "rotate-90 opacity-0",
                  )}
                />
                <X
                  className={cn(
                    "w-5 h-5 absolute transition-all duration-300",
                    isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
                  )}
                />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Content - Floating Expand */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden lg:hidden"
              >
                {/* Navigation */}
                <nav className="py-4 border-t border-border/50">
                  <motion.ul className="space-y-1">
                    {navLinks.map((link) => (
                      <motion.li
                        key={link.href}
                        variants={mobileNavItemVariants}
                      >
                        <SmoothLink
                          href={link.href}
                          onNavigate={closeMenu}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                        >
                          {link.icon && (
                            <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                          )}
                          <span className="flex-1">{link.label}</span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </SmoothLink>
                      </motion.li>
                    ))}
                  </motion.ul>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}
