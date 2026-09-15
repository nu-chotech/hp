import { Rule } from "hp";

/** 反転面（Hero と同じ面） */
function Ink({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-surface="ink"
      className="on-ink flex flex-col gap-stack-md bg-inverse-ground p-inset-md text-inverse-ink"
    >
      {children}
    </div>
  );
}

/** 太さは 2 段だけ。2px = 構成要素の「間」（セクション上・フッター上）、1px = 「内部」の仕切り（§4.2）。強弱は色ではなく太さで出す */
export const Weights = () => (
  <div className="flex flex-col gap-stack-md">
    <p className="text-caption text-ink-secondary">rule 2px — セクション上・ナビ下・罫線グリッド</p>
    <Rule />
    <p className="text-caption text-ink-secondary">hair 1px — 行間の仕切り</p>
    <Rule weight="hair" />
    <p className="text-caption text-ink-secondary">hair + hairline — メニューの行リスト（U-47）</p>
    <Rule weight="hair" tone="hairline" />
  </div>
);

/** Mobile メニューの行リスト（nav-bar）。外側は 2px 罫、行間は 1px hairline — 「間」と「内部」の対比 */
export const MenuRows = () => (
  <div>
    <Rule />
    <ul>
      {["About", "Activities", "Members", "Partners"].map((label, index) => (
        <li key={label}>
          {index > 0 ? <Rule weight="hair" tone="hairline" /> : null}
          <div className="flex min-h-control-md items-center px-page-inset text-ink text-label-nav">
            {label}
          </div>
        </li>
      ))}
    </ul>
    <Rule />
  </div>
);

/** 縦罫は隣の文字サイズと同じ高さ（size/rule-v 12）。Brand ロックアップの区切り。full-bleed の縦線は作らない */
export const Vertical = () => (
  <div className="flex items-center gap-inline-sm text-caption-bold text-ink-secondary">
    <span>ChoTech</span>
    <Rule orientation="vertical" weight="hair" />
    <span lang="en">Hack Your Limits.</span>
    <Rule orientation="vertical" weight="hair" />
    <span>長崎大学</span>
  </div>
);

/** インク面のテクスチャ（inverse、ヒーローの格子線）と、行の文字色を継ぐ current */
export const OnInk = () => (
  <Ink>
    <Rule tone="inverse" weight="hair" />
    <div className="flex items-center gap-inline-sm text-caption-bold text-inverse-ink-secondary">
      <span>長崎大学</span>
      <Rule orientation="vertical" weight="hair" tone="current" />
      <span>学生テックコミュニティ</span>
      <Rule orientation="vertical" weight="hair" tone="current" />
      <span>2025年4月</span>
    </div>
    <Rule tone="inverse" weight="hair" />
  </Ink>
);

/** 内容の意味的な切れ目だけ semantic（<hr> = role separator）。見た目は同じ 2px で、preflight の 1px border は乗らない */
export const Semantic = () => (
  <div className="flex flex-col gap-stack-md">
    <p className="max-w-measure text-body-s text-ink-secondary">
      1人5分の短い発表で、最近学んだこと・作ったもの簡単に共有。発表経験ゼロでもOK、聞くだけ参加も大歓迎。
    </p>
    <Rule semantic />
    <p className="max-w-measure text-body-s text-ink-secondary">
      テックの基本を学べる勉強会を定期的に開催しています。GitやFigmaなどのツールの使い方から、Web開発やAI駆動開発の基本まで幅広く学べます。
    </p>
  </div>
);
