import { ReactionChip } from "hp";

/**
 * 数字は RollingNumber が下から巻き上げる。静止画では最終値を撮りたいので、
 * OS の「視差効果を減らす」を固定して部品本来の reduced-motion 状態を出す（§7.5）。
 */
if (typeof window !== "undefined") {
  const original = window.matchMedia.bind(window);
  window.matchMedia = (query: string) => {
    const result = original(query);
    if (!/prefers-reduced-motion/.test(query)) return result;
    return { ...result, matches: true, media: query, addEventListener() {}, removeEventListener() {} } as MediaQueryList;
  };
}

/** About のチャットに付くリアクション（content/about.ts）。絵文字 + Caption/Bold の数字。読み上げは「いいね 3」 */
export const Reactions = () => (
  <div className="flex flex-wrap items-center gap-inline-xs">
    <ReactionChip emoji="👍" label="いいね" count={3} />
    <ReactionChip emoji="👀" label="気になる" count={4} />
  </div>
);

/** 1 桁から 2 桁まで。数字は chip/ink ではなく ink で、小さい数字でも面に対して最大の比を取る */
export const Counts = () => (
  <div className="flex flex-wrap items-center gap-inline-xs">
    <ReactionChip emoji="🔥" label="アツい" count={1} />
    <ReactionChip emoji="🎉" label="やった" count={2} />
    <ReactionChip emoji="💡" label="なるほど" count={3} />
    <ReactionChip emoji="👏" label="拍手" count={12} />
  </div>
);

/** 再生中の途中値: count は現在値、finalCount が読み上げに渡る最終値（§6.12.2） */
export const Rolling = () => (
  <div className="flex flex-wrap items-center gap-inline-xs">
    <ReactionChip emoji="👍" label="いいね" count={1} finalCount={3} />
    <ReactionChip emoji="👀" label="気になる" count={2} finalCount={4} />
  </div>
);
