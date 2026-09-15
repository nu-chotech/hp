import { CellChat, RuledGrid } from "hp";
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

/** About の chat（content/about.ts）。アバターの /images/personas/*.svg は data URL に差し替える */
const kicker = "ChoTechでのチャットの雰囲気";
const note = "気軽にあなたの「やりたい」「気になる」を、みんなで共有しよう。";
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
  {
    kind: "reactions",
    side: "outgoing",
    reactions: [
      { emoji: "✨", label: "すてき", count: 2 },
      { emoji: "🙌", label: "頼もしい", count: 1 },
    ],
  },
  { kind: "typing" },
] as const;

/** About の 2×2 セル（§6.11.4）。<figure>: キッカーは見出しにせず、figcaption が mt-auto で底に落ちる */
export const About = () => (
  <RuledGrid columns={2} style={{ maxWidth: "48rem" }}>
    <CellChat kicker={kicker} note={note} thread={thread} />
  </RuledGrid>
);

/** 短いスレッド。行が減っても figcaption は底に残り、セルは size/cell-min より縮まない */
export const Short = () => (
  <RuledGrid columns={2} style={{ maxWidth: "48rem" }}>
    <CellChat
      kicker="#general — いつものChoTech"
      note="発言のたびにスタンプが返る。"
      thread={[
        { kind: "incoming", avatar: case03, message: "今週の Dev Day、何やる？" },
        { kind: "reactions", reactions: [{ emoji: "👀", label: "気になる", count: 2 }] },
        { kind: "outgoing", message: "Figma の基礎やりたい！" },
        { kind: "typing" },
      ]}
    />
  </RuledGrid>
);
