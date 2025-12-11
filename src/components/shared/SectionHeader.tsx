"use client";

import { motion } from "motion/react";
import { sectionHeaderTransition } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** セクションタイトル */
  title: string;
  /** サブタイトル/説明文 */
  description?: string;
  /** 追加のクラス名 */
  className?: string;
  /** 中央揃えにするか (default: true) */
  centered?: boolean;
}

/**
 * セクションヘッダーコンポーネント
 * 各セクションの共通ヘッダースタイルを提供
 */
export function SectionHeader({
  title,
  description,
  className,
  centered = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        "max-w-2xl mx-auto mb-12",
        centered && "text-center",
        className,
      )}
      {...sectionHeaderTransition}
    >
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </motion.div>
  );
}
