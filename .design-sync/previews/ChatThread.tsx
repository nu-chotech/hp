import { Cell, ChatThread, RuledGrid } from "hp";
import case03 from "../../public/images/personas/case-03.svg";
import case04 from "../../public/images/personas/case-04.svg";

/**
 * カードは静止画。ChatThread は OS の「視差効果を減らす」で全行を出す（§7.5 / useMotionPlaying）ので、
 * このカードではその状態を再現する — 再生中の途中フレームでは会話の全体が読めない。
 * プレビュー専用の細工で、部品自体は触らない。
 */
if (typeof window !== "undefined") {
  const original = window.matchMedia.bind(window);
  window.matchMedia = (query: string) => {
    const result = original(query);
    if (!/prefers-reduced-motion/.test(query)) return result;
    return { ...result, matches: true, media: query, addEventListener() {}, removeEventListener() {} } as MediaQueryList;
  };
}

/** About のチャットセルと同じスレッド（content/about.ts）。発言ごとにスタンプが返る */
const thread = [
  { kind: "incoming", avatar: case04, message: "ハッカソン誰か一緒に出ない？" },
  {
    kind: "reactions",
    reactions: [
      { emoji: "👍", label: "いいね", count: 3 },
      { emoji: "👀", label: "気になる", count: 4 },
    ],
  },
  { kind: "outgoing", message: "私もそれ興味ある！" },
  {
    kind: "reactions",
    side: "outgoing",
    reactions: [
      { emoji: "🎉", label: "やった", count: 2 },
      { emoji: "🔥", label: "アツい", count: 1 },
    ],
  },
  { kind: "incoming", avatar: case03, message: "こんなやり方もあるよ！" },
  {
    kind: "reactions",
    reactions: [
      { emoji: "💡", label: "なるほど", count: 3 },
      { emoji: "👏", label: "拍手", count: 2 },
    ],
  },
  { kind: "outgoing", message: "UIは私がやりたい！" },
  { kind: "typing" },
] as const;

/** 罫線グリッドのセルに置いた会話の図（§6.12）。1 手ずつ現れ、一巡したら繰り返す */
export const InCell = () => (
  <RuledGrid columns={1} className="max-w-[32rem]">
    <Cell asChild>
      <figure>
        <p className="text-overline-jp text-ink-secondary">#general — いつものChoTech</p>
        <ChatThread thread={thread} />
        <figcaption className="mt-auto pt-stack-md text-caption text-ink-secondary">
          気軽にあなたの「やりたい」「気になる」を、みんなで共有しよう。
        </figcaption>
      </figure>
    </Cell>
  </RuledGrid>
);

/** 短いやりとり: 発言 → スタンプ → 返事 */
export const Short = () => (
  <div className="max-w-[24rem]">
    <ChatThread
      thread={[
        { kind: "incoming", avatar: case03, message: "今週の Dev Day、何やる？" },
        {
          kind: "reactions",
          reactions: [{ emoji: "👀", label: "気になる", count: 2 }],
        },
        { kind: "outgoing", message: "Figma の基礎やりたい！" },
      ]}
    />
  </div>
);
