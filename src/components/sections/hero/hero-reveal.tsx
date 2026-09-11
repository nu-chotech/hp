"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { revealElement } from "@/hooks/use-reveal";
import { duration } from "@/lib/motion";

/**
 * Hero のクライアント側（§7.4.1）
 *
 * Hero だけはオブザーバを使わず `document.fonts.ready` か `duration/3` の早い方で
 * 動き出す。代替フォントで動かしてから本フォントで再描画すると二重に動いて見えるため。
 *
 * かつてはここで h1 の静定も待ち、回転語（§6.8.3）の開始時計にしていたが、
 * h1 を `Hack Your Limits.` の 1 行に置き換えて回転語を撤去した（DECISION U-37）
 * ので、残るのは開始の時計だけ。
 */
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

    let cancelled = false;
    heroStart().then(() => {
      if (cancelled) return;
      for (const el of targets) {
        revealElement(el, Number(el.dataset.revealIndex ?? 0));
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
