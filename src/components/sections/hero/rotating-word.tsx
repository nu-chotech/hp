"use client";

import { cva } from "class-variance-authority";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { heroContent } from "@/content/hero";
import { duration, heroWord, motionVar } from "@/lib/motion";
import { useMotionPlaying } from "@/lib/use-motion-switch";
import { revealElement } from "@/lib/use-reveal";

/**
 * Hero のクライアント側（§7.4.1 / §7.4.3）
 *
 * reveal と回転語は **同じ時計** を共有する: Hero だけはオブザーバを使わず
 * `document.fonts.ready` か `duration/3` の早い方で動き出す（開始 = heroStart）。
 * 回転語が数え始めるのはその先で、仕様が言うのは「h1 の reveal **静定** 2.5s 後」
 * （§6.8.3 周期 / §7.4.3）— 開始からでは stagger + spring のぶんだけ早すぎる。
 * だから開始と静定の Promise をこのモジュールに 1 本ずつ持ち、
 * HeroReveal が両方を進め、RotatingWord は静定だけを待つ。
 */

/** 代替フォントで動かしてから本フォントで再描画すると二重に動いて見える（§7.4.1） */
let heroStarted: Promise<void> | undefined;

function heroStart() {
  heroStarted ??= new Promise<void>((resolve) => {
    // タイムアウトは「必ず始まる」ことの保証。executor の中で例外が出ると
    // Promise は reject に落ちてこの保証ごと無効になる（resolve 済みの
    // Promise は reject できても逆はできない）ので、CSS Font Loading API が
    // 無い環境でも投げないよう ?. で受け、fonts.ready の reject も握り潰す。
    // ここが落ちると Hero 全体が opacity 0 のまま残る（§7 グローバル 5）。
    const timer = setTimeout(resolve, duration.fallback);
    document.fonts?.ready
      .then(() => {
        clearTimeout(timer);
        resolve();
      })
      .catch(() => {});
  });
  return heroStarted;
}

/**
 * h1 の reveal が静定した時点（§6.8.3 周期）。回転語の start-delay はここから数える。
 * 静定の実体は h1 のトランジション終了なので、時間を数値で持ち直さずに DOM から受け取る。
 */
let heroSettled: Promise<void> | undefined;
let markSettled: (() => void) | undefined;

function heroSettle() {
  heroSettled ??= new Promise<void>((resolve) => {
    markSettled = resolve;
  });
  return heroSettled;
}

function settleHero() {
  heroSettle();
  markSettled?.();
}

/**
 * Hero の [data-reveal] を、共有オブザーバ（MotionProvider）ではなく上記の時計で出す。
 *
 * 子の effect は親より先に走るので、useReveal が DOM を走査するより前にここで
 * 対象から外せる。属性を外すと globals.css の隠し状態も外れてしまうため、
 * 外す前にインラインで隠し状態を引き継ぐ。出し方（トランジションと stagger）は
 * 共有の revealElement をそのまま使う。
 */
export function HeroReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (targets.length === 0) return;

    // reduced-motion では隠し状態そのものが無い（§7 グローバル 5）
    const reduced = document.documentElement.classList.contains("reduced");
    for (const el of targets) {
      if (!reduced) {
        el.style.opacity = "0";
        el.style.transform = "translateY(var(--reveal-y))";
      }
      el.removeAttribute("data-reveal");
    }

    const heading = root.querySelector<HTMLElement>("h1");

    let cancelled = false;
    heroStart().then(() => {
      if (cancelled) return;
      for (const el of targets) {
        revealElement(el, Number(el.dataset.revealIndex ?? 0));
      }
      // 静定 = h1 のトランジション終了。revealElement がトランジションを
      // 掛けなかったとき（reduced、隠し状態が付いていない）は待つものが無く
      // transitionend も来ないので、出た時点をそのまま静定点にする
      if (heading?.style.transition) {
        // transitionend は子から上がってくるので、h1 自身のものだけを見る
        heading.addEventListener("transitionend", function onEnd(event) {
          if (event.target !== heading) return;
          heading.removeEventListener("transitionend", onEnd);
          settleHero();
        });
      } else {
        settleHero();
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // display: contents。Hero の縦方向レイアウトに箱を 1 つ増やさないため
  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}

const words = heroContent.headline.words;
/** 3 語 × 2 周 = 6 遷移。最後は最初の語（学ぶ。）に戻って静止する（M8） */
const TOTAL_STEPS = words.length * heroWord.cycles;

type WordState = "active" | "exiting" | "idle";

/**
 * 語は 3 つとも常に DOM に置き、状態だけを変える。
 * 「上へ抜けて下から入る」ドラムの一方向運動（DECISION M-4）なので、
 * 抜けた語（exiting）と次に入る語（idle）は同じ非表示でも位置が上下に分かれる。
 * exiting → idle の戻り（下への瞬間移動）は idle にトランジションを与えないことで見せない。
 *
 * .hero__word は globals.css の reduced-motion フックが名指しするクラス。
 */
const wordVariants = cva("hero__word absolute inset-0", {
  variants: {
    state: {
      active: "translate-y-0 opacity-100",
      exiting: "-translate-y-(--word-y) opacity-0",
      idle: "translate-y-(--word-y) opacity-0",
    } satisfies Record<WordState, string>,
  },
});

/**
 * 動きの実体は CSS トランジション。値の正本は globals.css の --spring-* なので、
 * duration と easing を TS 側に書き写さず var() の文字列をそのまま流し込む。
 * Tailwind の translate-* は `translate` プロパティなので transition もそれに合わせる。
 */
const wordTransition: Record<WordState, CSSProperties | undefined> = {
  active: {
    transition: `opacity ${motionVar.springDefault}, translate ${motionVar.springDefault}`,
    // t=0 退出開始 → t=80ms 入り開始。重なりが「ドラム」の連続性を作る（§7.4.3）
    transitionDelay: "var(--word-transition-offset)",
  },
  exiting: {
    transition: `opacity ${motionVar.springQuick}, translate ${motionVar.springQuick}`,
  },
  idle: undefined,
};

function wordState(
  index: number,
  current: number,
  previous: number | null,
): WordState {
  if (index === current) return "active";
  if (index === previous) return "exiting";
  return "idle";
}

/**
 * Hero / Rotating word（§6.8.3）
 *
 * 枠は 3em 固定で新旧の語を絶対配置で重ねる。3 語とも全角 3 字なのでレイアウトシフトは
 * ゼロ（§9.3）。下線は持たない（DECISION U-3）— 変わるのは語そのものと色だけ。
 * 名前は h1 側の visually-hidden が持つので、ここは丸ごと装飾（呼び出し側で aria-hidden）。
 */
export function RotatingWord() {
  const boxRef = useRef<HTMLSpanElement>(null);
  /**
   * 動くかどうかは 1 つのスイッチが決める（§7.4.2 / M8）。低減設定は「既定で停止」
   * であって「絶対に動かない」ではないので、reduced-motion を直接見ずに
   * オプトインまで畳み込んだ playing を見る — 読者が帯の再生ボタンを押したら
   * マーキー・ドットと一緒に回転語も戻る。
   */
  const playing = useMotionPlaying();
  /** Hero が画面内 かつ タブが前面（§7.4.3 の停止条件） */
  const [awake, setAwake] = useState(false);
  /** h1 が静定した。ここから motion/word/start-delay を数える（§6.8.3） */
  const [armed, setArmed] = useState(false);
  const [{ current, previous }, setWord] = useState<{
    current: number;
    previous: number | null;
  }>({ current: 0, previous: null });
  const stepRef = useRef(0);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let onScreen = false;
    const sync = () => setAwake(onScreen && !document.hidden);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) onScreen = entry.isIntersecting;
      sync();
    });

    observer.observe(box);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  // 静定の待機は動くかどうかに依らず張っておく。後からオプトインした読者も
  // その場から回り始められる（heroSettle は低減設定なら即座に解決する）
  useEffect(() => {
    let cancelled = false;
    heroSettle().then(() => {
      if (!cancelled) setArmed(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // 止まっているときは「学ぶ。」で静止する。動かないだけで、語は最初から読める
    if (!playing || !armed || !awake) return;
    if (stepRef.current >= TOTAL_STEPS) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    const step = () => {
      stepRef.current += 1;
      setWord((state) => ({
        current: (state.current + 1) % words.length,
        previous: state.current,
      }));
      if (stepRef.current >= TOTAL_STEPS) clearInterval(interval);
    };

    // 1 語目は静定から start-delay ぶん置く。以降は 1 周期ごと
    const first = setTimeout(
      () => {
        step();
        if (stepRef.current < TOTAL_STEPS) {
          interval = setInterval(step, heroWord.periodMs);
        }
      },
      stepRef.current === 0 ? heroWord.startDelayMs : heroWord.periodMs,
    );

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [playing, armed, awake]);

  return (
    // 枠幅 3em は「全角 3 字」という語の設計そのもの（§6.8.3）。対応するトークンは無い。
    // 基準線は下の不可視の語が作るので、行内では通常のベースライン揃えで並ぶ
    <span ref={boxRef} className="relative inline-block w-[3em] text-hero-word">
      <span className="invisible">{words[0]}</span>
      {words.map((word, index) => {
        const state = wordState(index, current, previous);
        return (
          <span
            key={word}
            className={wordVariants({ state })}
            style={playing ? wordTransition[state] : undefined}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
