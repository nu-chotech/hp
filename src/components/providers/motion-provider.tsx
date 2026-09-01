"use client";

import { MotionConfig } from "motion/react";
import { useReveal } from "@/hooks/use-reveal";

/**
 * アプリ全体の motion 既定値
 *
 * `reducedMotion="user"` は OS の「視差効果を減らす」設定を尊重し、
 * transform / layout のアニメーションを自動で無効化する。
 * 不透明度の変化は残るので、フィードバック自体は失われない。
 *
 * ここがアプリを包む唯一の client leaf なので、[data-reveal] の監視も
 * ここから 1 回だけ張る（§7.4.1）。中身は Server Component のまま通過する。
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useReveal();

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
