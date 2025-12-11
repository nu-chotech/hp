"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useId } from "react";
import { SmoothLink } from "@/components/shared/SmoothLink";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

// 文字単位のブラーフェードインアニメーション
function AnimatedText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const id = useId();
  const characters = text.split("");

  return (
    <span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={`${id}-${index.toString()}`}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.04,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// メインタイトル用のブラーフェードインアニメーション
function AnimatedTitle({ text, delay = 0 }: { text: string; delay?: number }) {
  const id = useId();
  const characters = text.split("");

  return (
    <motion.h1
      className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${id}-${index.toString()}`}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(12px)", scale: 0.9 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* Semi-transparent Black Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Origin - シンプルなフェードイン */}
          <motion.p
            className="text-xs text-white/70 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {siteConfig.origin}
          </motion.p>

          {/* Description - シンプルなフェードイン */}
          <motion.p
            className="text-sm text-white/70 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {siteConfig.description}
          </motion.p>

          {/* メインタイトル - 文字単位アニメーション + ループグロー */}
          <AnimatedTitle text={siteConfig.name} delay={0.6} />

          {/* Tagline - 文字単位アニメーション */}
          <motion.p
            className="text-xl font-medium max-w-xl mx-auto mb-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.2 }}
          >
            <AnimatedText text={siteConfig.tagline} delay={1.2} />
          </motion.p>

          {/* サブテキスト - フェードアップ */}
          <motion.p
            className="text-white/80 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
          >
            「技術を学ぶ・作る・話す」を、みんなで気軽に楽しむコミュニティ
          </motion.p>

          {/* ボタン群 - 時間差フェードイン */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 2.3, ease: "easeOut" }}
            >
              <Button asChild size="lg">
                <SmoothLink href="#recruit">参加する</SmoothLink>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 2.4, ease: "easeOut" }}
            >
              <Button asChild variant="outline" size="lg">
                <SmoothLink href="#about">詳しく見る</SmoothLink>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
