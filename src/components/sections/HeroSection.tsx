"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-accent/5" />

      {/* Animated Grid Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(var(--primary) / 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(var(--primary) / 0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {["blob-1", "blob-2", "blob-3", "blob-4", "blob-5", "blob-6"].map(
          (id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                y: [-20, 20, -20],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
              className="absolute w-64 h-64 rounded-full blur-3xl"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(135deg, oklch(0.55 0.18 250 / 0.3), transparent)"
                    : "linear-gradient(135deg, oklch(0.70 0.16 165 / 0.3), transparent)",
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ),
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>学生エンジニアコミュニティ</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
          >
            <span className="text-foreground">テクノロジーで</span>
            <br />
            <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              未来を創る
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            私たちは技術を学び、共に成長し、社会に貢献する学生エンジニアの集まりです。
            Web開発、AI/ML、モバイルアプリなど様々な分野でチャレンジしています。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="text-base px-8 h-12 rounded-full"
            >
              <Link href="#recruit">メンバー募集中</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base px-8 h-12 rounded-full"
            >
              <Link href="#about">詳しく見る</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
