"use client";

import { useEffect, useRef, useState } from "react";
import { Message } from "@/components/chat/message";
import { ReactionRow } from "@/components/chat/reaction-row";
import { Typing } from "@/components/chat/typing";
import type { ChatEntry } from "@/content/about";
import { useAwake } from "@/hooks/use-awake";
import { useMotionPlaying } from "@/hooks/use-motion-playing";
import { chatThread, motionVar } from "@/lib/motion";

/**
 * チャットの再生（§6.12 / DECISION U-16）
 *
 * 発言とスタンプが 1 手ずつ現れ、一巡したら間を置いて先頭から繰り返す。
 * 静止スレッドは「会話のスクリーンショット」に見えてしまい、伝えたいこと —
 * **いま誰かが喋っていて、返事が返ってくる場所である** — が伝わらない。
 * 順に現れることでしか出せない情報なので、§7 M9 が禁じる装飾の動きには当たらない。
 *
 * 高さは最初から全行ぶん取り、未再生の行は不透明度だけを 0 にする。1 行ずつ
 * DOM に足すとセルが伸び縮みして、隣の写真セルとページ全体まで動く。
 *
 * SSR と JS 無しでは全行が見えている（初期値が `thread.length`）。畳むのは
 * 再生できると分かってからで、§7 グローバル 5 の「JS が落ちても内容は見える」を守る。
 */

/**
 * 兄弟の中で一意に決まる鍵。
 *
 * 文言から作ると、同じ台詞の往復や 2 度目の typing / reactions で衝突する。
 * スレッドは静的で並び替えも絞り込みもしないので、位置が最も安定した識別子になる。
 */
function entryKey(entry: ChatEntry, index: number) {
  return `${index}-${entry.kind}`;
}

export interface ChatThreadProps {
  thread: readonly ChatEntry[];
}

export function ChatThread({ thread }: ChatThreadProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const playing = useMotionPlaying();
  /** セルが画面内 かつ タブが前面（§7.5「バックグラウンド / 非可視」） */
  const awake = useAwake(listRef);
  const [revealed, setRevealed] = useState(thread.length);

  useEffect(() => {
    // 止まっているときは全行を見せる。何も見えない状態で止めない（§7.5）
    if (!playing) {
      setRevealed(thread.length);
      return;
    }

    // 再生できると分かった時点で畳む。画面に入る前に済ませておくので、
    // 読み手が最初に見るのは「空のスレッドが埋まっていく」ところになる
    setRevealed(0);
    if (!awake) return;

    let step = 0;
    let timer: ReturnType<typeof setTimeout>;

    const advance = () => {
      step += 1;
      setRevealed(step);
      if (step < thread.length) {
        timer = setTimeout(advance, chatThread.stepMs);
        return;
      }
      // 一巡した。読み切る間を置いてから畳み、また 1 手目から
      timer = setTimeout(() => {
        step = 0;
        setRevealed(0);
        timer = setTimeout(advance, chatThread.stepMs);
      }, chatThread.holdMs);
    };

    timer = setTimeout(advance, chatThread.stepMs);
    return () => clearTimeout(timer);
  }, [playing, awake, thread.length]);

  return (
    <ul className="mt-stack-md flex flex-col gap-stack-xs" ref={listRef}>
      {thread.map((entry, index) => {
        const shown = index < revealed;
        /**
         * 現れ方は不透明度と 8px の浮上だけ（§7 M6: transform と opacity のみ）。
         * 左右の寄せは変えない — 動く方向が発言者を示す情報になってしまい、
         * 右寄せという既にある信号と二重になる（§7 M9）。
         */
        const style = {
          opacity: shown ? 1 : 0,
          transform: shown ? "none" : "translateY(0.5rem)",
          transition: `opacity ${motionVar.springDefault}, transform ${motionVar.springDefault}`,
        };

        if (entry.kind === "typing") {
          return <Typing key={entryKey(entry, index)} style={style} />;
        }

        if (entry.kind === "reactions") {
          return (
            // 数字の巻き上げ（U-25）は行が持つ。見えているかと再生中かを渡す
            <ReactionRow
              key={entryKey(entry, index)}
              playing={playing}
              reactions={entry.reactions}
              shown={shown}
              side={entry.side}
              style={style}
            />
          );
        }

        return (
          <Message
            key={entryKey(entry, index)}
            style={style}
            {...(entry.kind === "incoming"
              ? {
                  side: "incoming" as const,
                  avatar: entry.avatar,
                  message: entry.message,
                }
              : { side: "outgoing" as const, message: entry.message })}
          />
        );
      })}
    </ul>
  );
}
