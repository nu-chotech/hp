import { ReactionChip, RollingNumber } from "hp";

/**
 * 巻き上がる数字（§6.4 / U-25）。value が変わるたび旧値が上へ抜け、新値が下から入る。
 * 初回描画では動かない（何も変わっていないのに動くと「増えた」が嘘になる）ので静止画はそのまま
 * 最終値になるが、reduced-motion を固定して keyframes を生成させない状態で撮る。
 */
if (typeof window !== "undefined") {
  const original = window.matchMedia.bind(window);
  window.matchMedia = (query: string) => {
    const result = original(query);
    if (!/prefers-reduced-motion/.test(query)) return result;
    return { ...result, matches: true, media: query, addEventListener() {}, removeEventListener() {} } as MediaQueryList;
  };
}

/** 1 桁〜3 桁。窓は min-w 1ch で、桁が増えれば広がる（この書体に tnum は無い）。Headline で桁幅を見せる */
export const Values = () => (
  <div className="flex items-baseline gap-inline-lg text-headline text-ink">
    <RollingNumber value={1} />
    <RollingNumber value={4} />
    <RollingNumber value={12} />
    <RollingNumber value={128} />
  </div>
);

/** 本来の居場所: Reaction chip の数字（絵文字 + 数字で「いいね 3」という 1 つの像） */
export const InReaction = () => (
  <div className="flex flex-wrap items-center gap-inline-xs">
    <ReactionChip emoji="👍" label="いいね" count={3} />
    <ReactionChip emoji="👀" label="気になる" count={4} />
    <ReactionChip emoji="🎉" label="やった" count={2} />
    <ReactionChip emoji="🔥" label="アツい" count={1} />
  </div>
);

/** サイズは文脈の文字スタイルを継ぐ（部品は色も大きさも持たない） */
export const Scale = () => (
  <div className="flex items-baseline gap-inline-lg text-ink">
    <RollingNumber className="text-caption-bold" value={3} />
    <RollingNumber className="text-headline" value={3} />
    <RollingNumber className="text-title-1" value={3} />
    <RollingNumber className="text-display-m" value={3} />
  </div>
);
