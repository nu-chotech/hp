import type { Transition } from "motion/react";

/**
 * モーションの語彙（§7）
 *
 * 値の実体は globals.css の custom property 側にある。同じ数値を TS にも書くと
 * 二重管理になって必ずずれるので、CSS で表現できるもの（duration・easing・
 * stagger・距離）は `motionVar` の var() 参照をインラインスタイルに流し込み、
 * JS でしか決められないもの（周期・速度・オブザーバの閾値）だけを数値で持つ。
 * モーショントークンは Figma 変数に置けない（DECISION R24）ので、この語彙の
 * 正本はここになる。
 *
 * このファイルは "use client" を持たない — MOTION_BOOTSTRAP_SCRIPT を読むのは
 * layout.tsx（Server Component）で、react-server 条件の react は useEffect を
 * export しないため、フックを 1 つでも同居させるとサーバ側の import が壊れる。
 * この制約は 1 モジュールの都合ではなくディレクトリの境界なので、DOM に触る側は
 * まとめて src/hooks/ に置く（reveal は use-reveal.ts、スイッチは
 * use-motion-switch.ts）。src/lib/ はサーバからも読める語彙と純関数だけを持つ。
 */

/**
 * CSS 側の実体への参照。文字列のまま style 属性に書けるので、
 * ブレークポイントで切り替わる値（--stagger は 60 / 80ms）も JS が知らずに済む。
 */
export const motionVar = {
  /** 420ms var(--ease-spring)。reveal、回転語の入り、パネル展開 */
  springDefault: "var(--spring-default)",
  /** 320ms var(--ease-spring)。回転語の退出、Mobile メニュー */
  springQuick: "var(--spring-quick)",
  easeSpring: "var(--ease-spring)",
  /** 色・下線だけに使う。移動には使わない（M2） */
  easeColor: "var(--ease-color)",
  stagger: "var(--stagger)",
  revealY: "var(--reveal-y)",
  wordY: "var(--word-y)",
} as const;

/** 固定時間（ms）。§7.2 の duration/0–3 と同値 */
export const duration = {
  /** 押下、フォーカスリング、アイコン差し替え、マーキーの一時停止（M1） */
  instant: 0,
  /** hover の入り、押下解除、aria-current の切替 */
  enter: 100,
  /** hover の離脱、下線、reduced-motion 時のクロスフェード */
  exit: 200,
  /** スプリング非対応環境の代替、Hero 開始のタイムアウト */
  fallback: 400,
} as const;

/**
 * motion/react のスプリング。CSS の --spring-* と同じ物理量（減衰比 1.0）を
 * bounce 0 + visualDuration = response で表す。
 * damping 0.8 の `momentum` は本ページに該当操作がないので置かない（M3）。
 */
export const spring = {
  /** response 0.40s。移動・再配置の既定 */
  default: { type: "spring", bounce: 0, visualDuration: 0.4 },
  /** response 0.30s。小さい要素・退出側 */
  quick: { type: "spring", bounce: 0, visualDuration: 0.3 },
} as const satisfies Record<string, Transition>;

/**
 * ヒーローの回転語（§7.4.3）。**回り続ける**（DECISION U-15）。
 *
 * 有限化していたのは WCAG 2.2.2 を停止 UI 無しで満たすためだったが、
 * ページ内のモーションスイッチが 3 つのループを全部止めるので条件は満たされている。
 */
export const heroWord = {
  periodMs: 2500,
  /** t=0 で退出、t=80ms で入りを始める。重なりが「ドラム」の連続性を作る */
  transitionOffsetMs: 80,
  /** h1 が静定してから回し始める（reveal の spring 1 周期ぶん待つ） */
  startDelayMs: 2500,
} as const;

/** 入力中ドット（§7.4.5）。0.8Hz。セルが可視の間だけ動かす */
export const typingDots = { periodMs: 1200, staggerMs: 200 } as const;

/**
 * チャットの再生（§6.12 / DECISION U-16）
 *
 * 発言とスタンプが 1 手ずつ現れ、一巡したら間を置いて先頭から繰り返す。
 * 高さは最初から全行ぶん取り、未再生の行は不透明度だけを 0 にする — 1 行ずつ
 * 足すとセルが伸び縮みして隣の写真セルまで動く。
 */
export const chatThread = {
  /** 1 手の間隔。短い台詞を読み終える最短で、これより速いと点滅に見える */
  stepMs: 900,
  /** 一巡後の間。最後の発言を読み切ってから畳む */
  holdMs: 2400,
} as const;

/**
 * 写真の送り（§6.11.5 / DECISION U-18）
 *
 * 末尾に先頭の複製を 1 枚置き、そこまで送ったらトランジション無しで 0 に戻す。
 * 逆回しの掃引を見せないための定石。
 */
export const photoSlides = {
  /** 1 枚を見終える時間。文字より情報が多いのでチャットの 4 倍以上取る */
  stepMs: 4000,
} as const;

/** マーキー（§7.4.2）。duration ではなく速度で持つので内容量が変わっても速さが一定 */
export const marquee = { speedPxPerSecond: 40 } as const;

/** ページ内のモーションスイッチ（M8）。マーキー・回転語・ドットが共有する */
export const MOTION_STORAGE_KEY = "chotech:motion";

/**
 * 同じスイッチの、同一ドキュメント向けの通知路。
 * storage イベントは書いた当のドキュメントには届かない（HTML 仕様）ため、
 * それだけでは押したタブで動きが止まらない。書き手（§6.9.3 の停止/再生ボタン）は
 * localStorage への setItem の直後に `window.dispatchEvent(new Event(MOTION_EVENT))`
 * を必ず呼ぶ — 読み手はこれと storage の両方を購読する。
 */
export const MOTION_EVENT = "chotech:motionchange";

/** reveal（§7.4.1） */
export const revealMotion = {
  /** 上端がビューポート下 10% を越えたら発火。視界に入ってから、読まれる前 */
  rootMargin: "0px 0px -10% 0px",
  /** 5 番目以降は 4 番目と同時。最大待ち 4 × stagger = 320 / 240ms */
  maxSteps: 4,
} as const;

/**
 * <head> に同期で置くブートストラップ（§7 グローバル 5）
 *
 * globals.css の隠し状態は `html.js:not(.reduced) [data-reveal]` にしか掛からない。
 * つまり JS が落ちればページはそのまま見える代わりに、このクラスは
 * **描画前**に付いていなければ一瞬ちらつく。だから layout.tsx の <head> に
 * インラインで流し込む文字列として持つ（layout 側にロジックを置かないため）。
 * メディアクエリの変更にも追随させる — 設定を切り替えた読者を取り残さない。
 */
export const MOTION_BOOTSTRAP_SCRIPT =
  '(function(){var d=document.documentElement,m=matchMedia("(prefers-reduced-motion: reduce)"),s=function(){d.classList.toggle("reduced",m.matches)};d.classList.add("js");s();m.addEventListener("change",s)})();';
