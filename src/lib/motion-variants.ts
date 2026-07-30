import type { Transition, Variants } from "motion/react";

/**
 * Apple の Fluid Interface モデルに合わせた spring プリセット
 *
 * - `bounce`         … Apple でいう damping ratio。0 = 臨界制動 (overshoot なし)
 * - `visualDuration` … Apple でいう response。目標に到達するまでの体感時間 (秒)
 *
 * spring は duration ベースのアニメーションと違い「中断して掴み直せる」ため、
 * ユーザーが触れる可能性のある要素は原則こちらを使う。
 * 既定は overshoot なし。bounce はユーザーの勢いを受け継いだ動きにだけ許可する。
 */
export const spring = {
  /** 既定。UI の大半はこれ */
  default: { type: "spring", bounce: 0, visualDuration: 0.4 },
  /** プレス・トグルなど即応が要るもの */
  snappy: { type: "spring", bounce: 0, visualDuration: 0.25 },
  /** 勢いを伴う動き (飛び込んでくる要素、フリック) */
  momentum: { type: "spring", bounce: 0.2, visualDuration: 0.4 },
  /** ドロワー / シート */
  sheet: { type: "spring", bounce: 0.2, visualDuration: 0.3 },
} as const satisfies Record<string, Transition>;

/**
 * 共通のコンテナ variants
 * 子要素を順番にアニメーションさせる
 *
 * stagger は「連鎖の総尺 = stagger x 子要素数」がユーザーの待ち時間になる。
 * 子が多いほど小さくすること。
 */
export const staggerContainer = (
  staggerChildren = 0.06,
  delayChildren = 0,
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * フェードイン + 上方向からスライド
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring.default,
  },
};

/**
 * カードアニメーション (スケール + フェード)
 */
export const cardScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: spring.default,
  },
};

/**
 * アイコンやバッジなど、小さい要素が弾んで現れる
 * 勢いのある動きなので bounce を許可する
 */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: spring.momentum,
  },
};

/**
 * セクションヘッダー用のデフォルト設定
 */
export const sectionHeaderTransition = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: spring.default,
} as const;

/**
 * コンテナ用のデフォルト viewport 設定
 */
export const defaultViewport = {
  once: true,
  margin: "-50px",
} as const;
