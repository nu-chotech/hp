"use client";

import { ChevronRight, Menu, MessageSquare, X } from "lucide-react";
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size={44} hideSubtitleOnMobile />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <SmoothLink
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </SmoothLink>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="relative">
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
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] p-0 flex flex-col">
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
        </div>
      </div>
    </header>
  );
}
