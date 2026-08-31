import type { Target, Transition, Variants } from "motion/react";

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

/** whileInView 用の viewport。一度表示されたら再生しない */
export const onceViewport = { once: true } as const;

/**
 * 単発要素の登場プリセット
 *
 * stagger コンテナに乗らない要素 (アイコン、バッジ、見出しの補足など) は
 * 親の variants ではなく明示的な delay で順序を作る。その定型を一箇所にまとめる。
 */
const revealPresets = {
  /** 小さい要素が弾んで現れる。勢いを伴うので bounce を許可 */
  popIn: {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1 },
    transition: spring.momentum,
  },
  /** バッジやタグなど、控えめに拡大しながら現れる */
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
    transition: spring.snappy,
  },
  /** カード全体がわずかに縮んだ状態から現れる */
  cardIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
    transition: spring.default,
  },
  /** テキストブロックが少し下から現れる */
  fadeUp: {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
    transition: spring.snappy,
  },
  /** まとまった要素群が下から現れる */
  riseIn: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
    transition: spring.default,
  },
  /** 不透明度のみ */
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: { duration: 0.3 },
  },
} as const satisfies Record<
  string,
  { hidden: Target; visible: Target; transition: Transition }
>;

export type RevealPreset = keyof typeof revealPresets;

export interface RevealOptions {
  /** 秒。兄弟要素との順序付けに使う */
  delay?: number;
  /** view: 画面に入ったら / mount: マウント直後 (モーダル内など) */
  on?: "view" | "mount";
}

/**
 * `<motion.div {...reveal("popIn", { delay: 0.1 })}>` のように spread して使う
 */
export function reveal(
  preset: RevealPreset,
  { delay = 0, on = "view" }: RevealOptions = {},
) {
  const { hidden, visible, transition } = revealPresets[preset];
  const delayed: Transition = { ...transition, delay };

  if (on === "mount") {
    return { initial: hidden, animate: visible, transition: delayed };
  }
  return {
    initial: hidden,
    whileInView: visible,
    viewport: onceViewport,
    transition: delayed,
  };
}
