import type { ComponentProps } from "react";
import { chatIndent, Message } from "@/components/chat/message";
import { Typing } from "@/components/chat/typing";
import { ReactionChip, type ReactionIconName } from "@/components/ui/chip";
import { Cell } from "@/components/ui/ruled-grid";
import type { ChatEntry } from "@/content/about";
import { cn } from "@/lib/utils";

/**
 * Cell Chat（§6.11.4）
 *
 * これは会話の「図」なので <figure>。図の名前は figcaption が持つ（DECISION M-18）ため、
 * キッカー（チャンネル名）は見出しにしない — 見出しにするとページの階層に
 * 「#general」という節ができてしまう（§8.5）。
 * figcaption は mt-auto でセルの地に落とす。行が伸びても注記は必ず底に残る。
 */

/**
 * リアクションの読み上げ名（§6.4）。
 *
 * 絵文字そのものには名前が無いので、Chip 側が「いいね 3」という 1 つの像として
 * 名前を要求する。content/about.ts はアイコン名と数だけを持つので、
 * その対応はここで解決する。
 */
const REACTION_LABELS: Record<ReactionIconName, string> = {
  thumbUp: "いいね",
  eye: "気になる",
};

export interface CellChatProps extends ComponentProps<"div"> {
  /** #general — いつものChoTech。Overline/JP（大文字化しない） */
  kicker: string;
  /** figcaption。矢印は付けない（注記は位置で分かる、§9.6） */
  note: string;
  thread: readonly ChatEntry[];
}

/**
 * 兄弟の中で一意に決まる鍵。
 *
 * 文言から作ると、同じ台詞の往復や 2 度目の typing / reactions で衝突する
 * （content/about.ts は別ストリームの持ち物で、そういう編集はいつでも起こりうる）。
 * スレッドは静的で並び替えも絞り込みもしないので、位置が最も安定した識別子になる。
 */
function entryKey(entry: ChatEntry, index: number) {
  return `${index}-${entry.kind}`;
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
        <ul className="mt-stack-md flex flex-col gap-stack-xs">
          {thread.map((entry, index) => {
            if (entry.kind === "typing") {
              return <Typing key={entryKey(entry, index)} />;
            }
            if (entry.kind === "reactions") {
              return (
                // リアクションは直前の発言に属するので、吹き出しの左端に揃える
                <li
                  className={cn("flex gap-inline-xs", chatIndent)}
                  key={entryKey(entry, index)}
                >
                  {entry.reactions.map((reaction) => (
                    <ReactionChip
                      count={reaction.count}
                      icon={reaction.icon}
                      key={reaction.icon}
                      label={REACTION_LABELS[reaction.icon]}
                    />
                  ))}
                </li>
              );
            }
            return (
              <Message
                key={entryKey(entry, index)}
                {...(entry.kind === "incoming"
                  ? {
                      side: "incoming" as const,
                      initial: entry.initial,
                      message: entry.message,
                    }
                  : { side: "outgoing" as const, message: entry.message })}
              />
            );
          })}
        </ul>
        <figcaption className="mt-auto pt-stack-md text-caption text-ink-secondary">
          {note}
        </figcaption>
      </figure>
    </Cell>
  );
}
