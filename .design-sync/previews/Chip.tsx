import { Chip } from "hp";

/** 反転面（Section surface="ink" と同じクラス） */
function Ink({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-surface="ink"
      className="on-ink flex flex-wrap items-center gap-inline-xs bg-inverse-ground p-inset-md text-inverse-ink"
    >
      {children}
    </div>
  );
}

/** 既定の Tag（neutral）。Activity のキーワードを 1 語ずつ、24 の塗りだけで示す（§6.4） */
export const Neutral = () => (
  <div className="flex flex-wrap items-center gap-inline-xs">
    <Chip>プレゼン練習</Chip>
    <Chip>知識の共有</Chip>
    <Chip>新しい発見</Chip>
  </div>
);

/** 3 つの tone。accent と inverse はライブラリ用で、ページには neutral しか出ない（K-5 / U-36） */
export const Tones = () => (
  <div className="flex flex-col gap-stack-sm">
    <div className="flex flex-wrap items-center gap-inline-xs">
      <Chip tone="neutral">基礎学習</Chip>
      <Chip tone="neutral">実践型</Chip>
      <Chip tone="neutral">初心者歓迎</Chip>
    </div>
    <div className="flex flex-wrap items-center gap-inline-xs">
      <Chip tone="accent">基礎学習</Chip>
      <Chip tone="accent">実践型</Chip>
      <Chip tone="accent">初心者歓迎</Chip>
    </div>
  </div>
);

/** インク面の上。面は ground@12、文字は inverse/ink-secondary */
export const OnInk = () => (
  <Ink>
    <Chip tone="inverse">チーム開発</Chip>
    <Chip tone="inverse">コードレビュー</Chip>
    <Chip tone="inverse">イベント企画</Chip>
  </Ink>
);

/** Activity セルの実際の形: `<ul aria-label="キーワード">` の子として li で出す */
export const AsList = () => (
  <ul aria-label="キーワード" className="flex flex-wrap gap-inline-xs" role="list">
    {["運営", "ハッカソン", "チーム開発"].map((tag) => (
      <Chip as="li" key={tag}>
        {tag}
      </Chip>
    ))}
  </ul>
);
