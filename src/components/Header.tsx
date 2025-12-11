"use client";

import { ChevronRight, Menu, MessageSquare, X } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Logo } from "@/components/shared/Logo";
import { SmoothLink } from "@/components/shared/SmoothLink";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

  const closeSheet = () => setIsOpen(false);

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

            {/* Mobile Menu */}
            <motion.div variants={navItemVariants} className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9"
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
                        isOpen
                          ? "rotate-0 opacity-100"
                          : "-rotate-90 opacity-0",
                      )}
                    />
                    <span className="sr-only">メニューを開く</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[320px] p-0 flex flex-col"
                >
                  {/* Header */}
                  <SheetHeader className="p-6 pb-4">
                    <SheetTitle className="flex items-center gap-3">
                      <Image
                        src="/icon.png"
                        alt={siteConfig.name}
                        width={40}
                        height={40}
                        className="rounded-xl"
                      />
                      <div className="text-left">
                        <p className="font-bold text-lg">{siteConfig.name}</p>
                        <p className="text-xs text-muted-foreground font-normal">
                          {siteConfig.description}
                        </p>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <Separator />

                  {/* Navigation */}
                  <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                      {navLinks.map((link) => (
                        <li key={link.href}>
                          <SmoothLink
                            href={link.href}
                            onNavigate={closeSheet}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                          >
                            {link.icon && (
                              <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                            )}
                            <span className="flex-1">{link.label}</span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </SmoothLink>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <Separator />

                  {/* Footer */}
                  <div className="p-6 pt-4">
                    <Button asChild className="w-full" onClick={closeSheet}>
                      <SmoothLink
                        href="#contact"
                        onNavigate={closeSheet}
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        お問い合わせ
                      </SmoothLink>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      {siteConfig.copyright}
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
