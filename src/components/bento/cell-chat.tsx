import type { ComponentProps } from "react";
import { ChatThread } from "@/components/chat/thread";
import { Cell } from "@/components/ui/ruled-grid";
import type { ChatEntry } from "@/content/about";

/**
 * Cell Chat（§6.11.4）
 *
 * これは会話の「図」なので <figure>。図の名前は figcaption が持つ（DECISION M-18）ため、
 * キッカー（チャンネル名）は見出しにしない — 見出しにするとページの階層に
 * 「#general」という節ができてしまう（§8.5）。
 * figcaption は mt-auto でセルの地に落とす。行が伸びても注記は必ず底に残る。
 *
 * スレッドの中身と再生（DECISION U-16）は ChatThread が持つ。ここを Server
 * Component のまま残せるよう、client 境界はスレッドだけに閉じてある。
 *
 * 余白は U-56 で 1 段ずつ上げた（キッカー → スレッド 16 → **24**、スレッド → 注記 16 → **24**、
 * 行間は thread.tsx 側で 8 → **12**）。wide でセルが 1 列 × 3 行の縦長になり、往復を 1 つ
 * 足してもなお詰まって見えたため — 縦に伸びた列には、それに見合うゆとりが要る。
 */

export interface CellChatProps extends ComponentProps<"div"> {
  /** #general — いつものChoTech。Overline/JP（大文字化しない） */
  kicker: string;
  /** figcaption。矢印は付けない（注記は位置で分かる、§9.6） */
  note: string;
  thread: readonly ChatEntry[];
}

export function CellChat({
  kicker,
  note,
  thread,
  className,
  ...props
}: CellChatProps) {
  return (
    // 会話は横ではなく**縦**に伸ばす（L-37）: tablet / desktop は 1 列 × 2 行、wide は
    // 1 列 × 3 行（about.tsx の明示配置）。2 列に広げると吹き出しが左右の縁に貼り付いて
    // 真ん中に使われない帯ができ、1×1 に畳むと 13 行の高さに引かれて隣の写真セルが
    // 極端な縦長に切り取られる。縦に伸ばせばどちらも起きない
    <Cell
      asChild
      className={className}
      rowSpan="2-tablet-until-wide"
      {...props}
    >
      <figure>
        <p className="text-overline-jp text-ink-secondary">{kicker}</p>
        <ChatThread thread={thread} />
        <figcaption className="mt-auto pt-stack-lg text-caption text-ink-secondary">
          {note}
        </figcaption>
      </figure>
    </Cell>
  );
}
