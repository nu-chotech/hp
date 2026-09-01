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
    <Cell asChild className={className} colSpan={2} rowSpan={2} {...props}>
      <figure>
        <p className="text-overline-jp text-ink-secondary">{kicker}</p>
        <ChatThread thread={thread} />
        <figcaption className="mt-auto pt-stack-md text-caption text-ink-secondary">
          {note}
        </figcaption>
      </figure>
    </Cell>
  );
}
