import { Tail } from "hp";

/**
 * Tail は吹き出しの角に付く 10 × 12 のベクター。塗りは currentColor なので、
 * 呼び出し側が吹き出しと同じ色（text-surface / text-accent-fill）を当てる（§6.12.1）。
 * 既定は `absolute bottom-0 h-3 w-2.5`。relative な吹き出しの中に置き、左は `-left-1.5`、
 * 右は `-right-1.5 -scale-x-100` で外側へ 6 はみ出させる — Message と同じ組み方。
 */

/** 吹き出しの左下（相手側）と右下（自分側）。角丸 bubble-tail 4 の角にテールが重なって接続を埋める */
export const OnBubbles = () => (
  <div className="flex flex-col gap-stack-sm" style={{ maxWidth: "24rem" }}>
    <div className="flex">
      <p className="relative max-w-[80%] rounded-bubble rounded-bl-bubble-tail bg-surface px-inset-sm py-inset-xs text-callout text-ink">
        ハッカソン誰か一緒に出ない？
        <Tail className="-left-1.5 text-surface" />
      </p>
    </div>
    <div className="flex justify-end pe-1.5">
      <p className="relative max-w-[80%] rounded-bubble rounded-br-bubble-tail bg-accent-fill px-inset-sm py-inset-xs text-callout text-on-accent">
        私もそれ興味ある！
        <Tail className="-right-1.5 -scale-x-100 text-accent-fill" />
      </p>
    </div>
  </div>
);

/** 形を拡大して見る枠。Tail は absolute なので relative の箱を用意し、size-full で箱に合わせる */
function Frame({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width: string;
  height: string;
}) {
  return (
    <span className="relative block shrink-0" style={{ width, height }}>
      {children}
    </span>
  );
}

/** 形そのもの（4 倍）。左向きが素の向き、右向きは -scale-x-100。色は ink と accent-fill */
export const Large = () => (
  <div className="flex items-end gap-inline-2xl">
    <Frame width="2.5rem" height="3rem">
      <Tail className="size-full text-ink" />
    </Frame>
    <Frame width="2.5rem" height="3rem">
      <Tail className="size-full -scale-x-100 text-ink" />
    </Frame>
    <Frame width="2.5rem" height="3rem">
      <Tail className="size-full text-accent-fill" />
    </Frame>
    <Frame width="2.5rem" height="3rem">
      <Tail className="size-full -scale-x-100 text-accent-fill" />
    </Frame>
  </div>
);

/**
 * 実寸（10 × 12）と 2 倍。surface 色は ground の上でほぼ見えないので、
 * ここでは ink と accent-fill で形だけ見る（surface 色の付き方は OnBubbles）
 */
export const Actual = () => (
  <div className="flex items-end gap-inline-lg">
    <Frame width="0.625rem" height="0.75rem">
      <Tail className="text-ink" />
    </Frame>
    <Frame width="0.625rem" height="0.75rem">
      <Tail className="-scale-x-100 text-accent-fill" />
    </Frame>
    <Frame width="1.25rem" height="1.5rem">
      <Tail className="size-full text-ink" />
    </Frame>
    <Frame width="1.25rem" height="1.5rem">
      <Tail className="size-full -scale-x-100 text-accent-fill" />
    </Frame>
    <span className="text-caption text-ink-secondary">10 × 12 / 20 × 24</span>
  </div>
);
