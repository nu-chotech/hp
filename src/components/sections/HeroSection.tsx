"use client";

import { animate, motion } from "motion/react";
import Link from "next/link";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = window.scrollY + elementPosition - headerOffset;

        animate(window.scrollY, offsetPosition, {
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          onUpdate: (value) => window.scrollTo(0, value),
        });
      }
    },
    [],
  );

  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="text-xs text-muted-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            長崎大学 情報データ科学部発
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            学生エンジニアコミュニティ
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            ChoTech
          </motion.h1>

          <motion.p
            className="text-xl font-medium max-w-xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            共に学び、共に創り、共に発信する。
          </motion.p>

          <motion.p
            className="text-muted-foreground max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            「技術を学ぶ・作る・話す」を、みんなで気軽に楽しむコミュニティ
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Button asChild size="lg">
              <Link
                href="#recruit"
                onClick={(e) => scrollToSection(e, "#recruit")}
              >
                参加する
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#about" onClick={(e) => scrollToSection(e, "#about")}>
                詳しく見る
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
