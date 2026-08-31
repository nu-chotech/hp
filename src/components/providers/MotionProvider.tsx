"use client";

import { MotionConfig } from "motion/react";

/**
 * アプリ全体の motion 既定値
 *
 * `reducedMotion="user"` は OS の「視差効果を減らす」設定を尊重し、
 * transform / layout のアニメーションを自動で無効化する。
 * 不透明度の変化は残るので、フィードバック自体は失われない。
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
