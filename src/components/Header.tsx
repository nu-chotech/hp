"use client";

import { ChevronRight, Menu, MessageSquare, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/shared/Logo";
import { SmoothLink } from "@/components/shared/SmoothLink";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { navLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// 内部コンテンツのスタッガー用コンテナ
const contentVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// ナビアイテムのアニメーション
const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// モバイルメニューコンテナのアニメーション
const mobileMenuVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
      opacity: { duration: 0.3 },
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] },
      opacity: { duration: 0.2 },
    },
  },
};

// モバイルナビアイテムのアニメーション
const mobileNavItemVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 },
  },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div
        className={cn(
          "max-w-5xl mx-auto rounded-2xl border transition-all duration-500",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-border/80 shadow-lg shadow-black/5"
            : "bg-background/60 backdrop-blur-lg border-border/50 shadow-md shadow-black/5",
        )}
      >
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="px-5 sm:px-8"
        >
          <div className="flex items-center justify-between h-16">
            <motion.div variants={navItemVariants}>
              <Logo size={40} hideSubtitleOnMobile />
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

                <Separator className="opacity-50" />

                {/* Footer */}
                <motion.div
                  variants={mobileNavItemVariants}
                  className="py-4 pb-6"
                >
                  <Button asChild className="w-full" onClick={closeMenu}>
                    <SmoothLink
                      href="#contact"
                      onNavigate={closeMenu}
                      className="flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      お問い合わせ
                    </SmoothLink>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    {siteConfig.copyright}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}
