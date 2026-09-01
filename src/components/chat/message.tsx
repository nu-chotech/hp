import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Chat message（§6.12.1）
 *
 * 静的なモック。操作する UI ではなく「Discord でこういう会話が起きている」という
 * 状況の**絵**なので、状態も対話も持たない（DECISION U-1 / U-12）。
 * ページで唯一 radius を持つ部品でもある — 読み手が 0.2 秒で「チャットだ」と
 * 分かることが、角丸ゼロという様式の一貫性より価値が高い、という判断による。
 */

/**
 * テール（§6.12.1）
 *
 * 幅 10 × 高さ 12 のベクター。回転した正方形では吹き出しとの接続部に角が立ち、
 * 下端が面一にならない（吹き出しの底より下に頂点が出る）ので、実体のパスで描く。
 * 塗りは `currentColor` — 色は吹き出しの塗りと同じでなければならないので、
 * 呼び出し側が `text-surface` / `text-accent` を当てて 1 か所で決める。
 *
 * 座標系: 右辺 x=10 が吹き出しの内側、下辺 y=12 が吹き出しの底。外側へ 6 はみ出し、
 * 右の 4 は吹き出しの `radius/bubble-tail` 4 の角にちょうど重なって接続を埋める。
 *
 * 入力中バブル（§6.12.3）も同じテールを持つので export する。別ファイルに切り出さないのは、
 * この形が吹き出しの角丸と一体で意味を持つため。
 */
export function Tail({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("absolute bottom-0 h-3 w-2.5", className)}
      fill="currentColor"
      focusable="false"
      viewBox="0 0 10 12"
    >
      <path d="M10 0C10 5.2 7.2 9.8 0 12L10 12Z" />
    </svg>
  );
}

/**
 * リアクション行と入力中バブルのインデント（§6.12.2 / §6.12.3）
 *
 * 32 = avatar 24 + avatar ↔ bubble の gap 8。数値をそのまま書かず avatar 幅と
 * gap から組むのは、この 32 が「吹き出しの左端に揃える」という**関係**であって
 * 独立した余白ではないため（どちらかが動けば追従しなければならない）。
 */
export const chatIndent = "ps-[calc(var(--size-avatar)+var(--inline-xs))]";

const bubbleVariants = cva(
  [
    // テールがはみ出すので clip しない。max-width は親（行）の 80%
    "relative max-w-[80%] px-inset-sm py-inset-xs text-callout",
    "rounded-bubble",
  ],
  {
    variants: {
      side: {
        // 相手: surface の上に ink（13.51）。外側の下角 = 左下だけ 4 に締める
        incoming: "rounded-bl-bubble-tail bg-surface text-ink",
        // 自分: accent の上に on-accent（10.83）。面と地の 1.37 は装飾で、
        // 意味は文字色・右寄せ・avatar の有無が冗長に運ぶ（§6.12.1）
        outgoing: "rounded-br-bubble-tail bg-accent text-on-accent",
      },
    },
  },
);

type MessageSide = NonNullable<VariantProps<typeof bubbleVariants>["side"]>;

export type MessageProps =
  | {
      side: Extract<MessageSide, "incoming">;
      /** アバターに出す頭文字。1 文字（`Caption/Bold` 12） */
      initial: string;
      message: string;
    }
  | {
      side: Extract<MessageSide, "outgoing">;
      initial?: never;
      message: string;
    };

/**
 * スレッド（`<ul>`）の 1 行。発言者は visually-hidden で渡す（§8.5）。
 * 自分側は avatar を持たない（Messages と同じで、右寄せが送り手を示す）ぶん、
 * 読み上げには手掛かりが何も残らないので「自分」を必ず補う。
 */
export function Message({ side, initial, message }: MessageProps) {
  if (side === "outgoing") {
    return (
      // 右に 6 の padding。テールのはみ出しを行の枠内に収める（§6.12.1）
      <li className="flex justify-end pe-1.5">
        <span className="sr-only">自分</span>
        <p className={bubbleVariants({ side })}>
          {message}
          <Tail className="-right-1.5 -scale-x-100 text-accent" />
        </p>
      </li>
    );
  }

  return (
    // avatar は吹き出しの「下端」に揃える（§6.12.1）
    <li className="flex items-end gap-inline-xs">
      <span
        aria-hidden="true"
        className="grid size-avatar shrink-0 place-items-center rounded-full bg-avatar text-caption-bold text-ink"
      >
        {initial}
      </span>
      <span className="sr-only">参加者</span>
      <p className={bubbleVariants({ side })}>
        {message}
        <Tail className="-left-1.5 text-surface" />
      </p>
    </li>
  );
}
