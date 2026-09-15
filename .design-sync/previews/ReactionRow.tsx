import { Message, ReactionRow } from "hp";
import case03 from "../../public/images/personas/case-03.svg";
import case04 from "../../public/images/personas/case-04.svg";

/**
 * カードは静止画。数字は再生中に 1 から目標値へ巻き上がる（U-25）ので、
 * ここでは「止まっているとき」= 最終値の状態を撮る。ChatThread が低減設定で渡すのと同じく
 * `playing={false}` を渡し、念のため OS の低減設定もプレビュー側で固定する。
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

/** ReactionRow は `<li>`。直前の発言に属する行なので、Message と同じリストに置く */
function Thread({ children }: { children: React.ReactNode }) {
  return (
    <ul className="flex flex-col gap-stack-xs" style={{ maxWidth: "24rem" }}>
      {children}
    </ul>
  );
}

/** 相手の発言に付いたスタンプ。吹き出しの左端（avatar 24 + gap 8）にインデント（§6.12.2） */
export const AfterIncoming = () => (
  <Thread>
    <Message
      side="incoming"
      avatar={case04}
      message="ハッカソン誰か一緒に出ない？"
    />
    <ReactionRow
      playing={false}
      reactions={[
        { emoji: "👍", label: "いいね", count: 3 },
        { emoji: "👀", label: "気になる", count: 4 },
      ]}
      shown
    />
  </Thread>
);

/** 自分の発言に付いたスタンプ。右寄せで、bubble のテールと同じ右 padding 6 */
export const AfterOutgoing = () => (
  <Thread>
    <Message side="outgoing" message="私もそれ興味ある！" />
    <ReactionRow
      playing={false}
      reactions={[
        { emoji: "🎉", label: "やった", count: 2 },
        { emoji: "🔥", label: "アツい", count: 1 },
      ]}
      shown
      side="outgoing"
    />
  </Thread>
);

/** 行だけ。インデントは行自身が持つ（chatIndent）ので、発言が無くても吹き出しの左端に揃う */
export const Alone = () => (
  <Thread>
    <ReactionRow
      playing={false}
      reactions={[
        { emoji: "💡", label: "なるほど", count: 3 },
        { emoji: "👏", label: "拍手", count: 2 },
      ]}
      shown
    />
    <ReactionRow
      playing={false}
      reactions={[{ emoji: "✨", label: "すてき", count: 2 }]}
      shown
      side="outgoing"
    />
  </Thread>
);

/** スレッドの中（content/about.ts の並び）: 発言 → スタンプ → 返事 → スタンプ */
export const InThread = () => (
  <Thread>
    <Message
      side="incoming"
      avatar={case03}
      message="こんなやり方もあるよ！"
    />
    <ReactionRow
      playing={false}
      reactions={[
        { emoji: "💡", label: "なるほど", count: 3 },
        { emoji: "👏", label: "拍手", count: 2 },
      ]}
      shown
    />
    <Message side="outgoing" message="UIは私がやりたい！" />
    <ReactionRow
      playing={false}
      reactions={[
        { emoji: "✨", label: "すてき", count: 2 },
        { emoji: "🙌", label: "頼もしい", count: 1 },
      ]}
      shown
      side="outgoing"
    />
  </Thread>
);
