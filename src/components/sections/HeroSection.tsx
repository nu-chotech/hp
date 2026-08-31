"use client";

import { ChevronDown, Heart } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useId } from "react";
import { SmoothLink } from "@/components/shared/SmoothLink";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/*
 * 入場の総尺。CTA が出るまでの時間がそのままユーザーの待ち時間になるので、
 * 「演出の気持ちよさ」ではなく「操作できるまでの速さ」を基準に決める。
 * 現在: 最後のボタンが 0.62s で出そろう。
 */
const T = {
  origin: 0,
  description: 0.06,
  title: 0.12,
  titleStagger: 0.03,
  tagline: 0.34,
  taglineStagger: 0.014,
  subtext: 0.46,
  actions: 0.54,
} as const;

// 文字単位のフェードイン
function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = T.taglineStagger,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const id = useId();
  const characters = text.split("");

  // 一文字ずつの span はスクリーンリーダーが分割読みしうるので、
  // 読み上げ用のテキストを別に持たせて演出側は隠す
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {characters.map((char, index) => (
        <motion.span
          key={`${id}-${index.toString()}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: delay + index * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

// メインタイトル用のブラーフェードインアニメーション
function AnimatedTitle({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const id = useId();
  const characters = text.split("");

  return (
    <h1 className={className} aria-label={text}>
      {characters.map((char, index) => (
        <motion.span
          key={`${id}-${index.toString()}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.94 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 0.45,
            delay: delay + index * T.titleStagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
}

const titleClassName =
  "text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white";

export function HeroSection() {
  // 動きの低減時は連鎖そのものを組み立てない。
  // ブラーや文字送りは MotionConfig の transform 無効化では消えないため、
  // ここで明示的に静的な組版へ切り替える。
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
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
        <div
          data-translucent
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Origin */}
          <motion.p
            className="text-xs text-white/60 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: T.origin }}
          >
            {siteConfig.origin}
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-sm text-white/60 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: T.description }}
          >
            {siteConfig.description}
          </motion.p>

          {/* メインタイトル */}
          {shouldReduceMotion ? (
            <motion.h1
              className={titleClassName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: T.title }}
            >
              {siteConfig.name}
            </motion.h1>
          ) : (
            <AnimatedTitle
              text={siteConfig.name}
              delay={T.title}
              className={titleClassName}
            />
          )}

          {/* Tagline */}
          <p className="text-xl font-medium max-w-xl mx-auto mb-8 text-white">
            {shouldReduceMotion ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: T.tagline }}
              >
                {siteConfig.tagline}
              </motion.span>
            ) : (
              <AnimatedText text={siteConfig.tagline} delay={T.tagline} />
            )}
          </p>

          {/* サブテキスト */}
          <motion.p
            className="text-white/60 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: T.subtext, ease: "easeOut" }}
          >
            「技術を学ぶ・作る・話す」を、みんなで気軽に楽しむコミュニティ
          </motion.p>

          {/* ボタン群 - 両方を同時に出す。CTA を待たせない */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: T.actions, ease: "easeOut" }}
          >
            <Button asChild size="lg">
              <SmoothLink href="#recruit">
                <Heart className="w-4 h-4 mr-2" />
                参加する
              </SmoothLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <SmoothLink href="#about">
                <ChevronDown className="w-4 h-4 mr-2" />
                詳しく見る
              </SmoothLink>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
