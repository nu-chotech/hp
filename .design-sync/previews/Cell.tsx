import { Cell, ImageSlot, RuledGrid } from "hp";

/**
 * セル自身が面を塗り、その隙間が罫線になる — セルに枠線は無い（§3.8）。
 * 3 面: ground（既定）/ logo（白い素材の地、U-33）/ ink（反転面、on-ink で細いウェイトの滲みを止める）
 */
export const Surfaces = () => (
  <RuledGrid columns={2} style={{ maxWidth: "48rem" }}>
    <Cell>
      <p className="text-overline text-ink-secondary">GROUND</p>
      <p className="mt-auto pt-stack-md text-headline">既定の面。ページの地と同じ</p>
    </Cell>
    <Cell surface="ink">
      <p className="text-overline text-inverse-ink-tertiary">INK</p>
      <p className="mt-auto pt-stack-md text-headline">反転面。数字のセルが使う</p>
    </Cell>
    <Cell surface="logo">
      <p className="text-overline text-ink-secondary">LOGO</p>
      <p className="mt-auto pt-stack-md text-headline">白い素材の地。パートナーの面</p>
    </Cell>
    <Cell asChild>
      <article>
        <p className="text-overline text-ink-secondary">AS CHILD</p>
        <p className="mt-auto pt-stack-md text-headline">&lt;article&gt; にスタイルを委譲</p>
      </article>
    </Cell>
  </RuledGrid>
);

/**
 * inset: cell（既定、inset/cell の余白）と none（写真を縁まで敷く、§6.11.5）。
 * none のセルは Activity / Member カードと同じく、本文側が自分で inset/cell を持つ
 */
export const Inset = () => (
  <RuledGrid columns={2} style={{ maxWidth: "48rem" }}>
    <Cell>
      <p className="text-overline text-ink-secondary">INSET / CELL</p>
      <p className="mt-auto pt-stack-md text-headline">文字は余白の内側に</p>
    </Cell>
    <Cell inset="none">
      <ImageSlot className="shrink-0" ratio="16:9" caption="活動写真（16:9）" />
      <div className="flex flex-1 flex-col gap-stack-xs p-inset-cell">
        <p className="text-title-1">Dev Day</p>
        <p className="text-body-s text-ink-secondary">写真は縁に触れ、本文だけが余白を持つ。</p>
      </div>
    </Cell>
  </RuledGrid>
);

/**
 * colSpan は tablet 以上で効く（2 列でも「行いっぱい」の意味を保つ）。
 * rowSpan は desktop でのみ効く — tablet の 2 列では 1 セル = 1 行に畳まれ、DOM 順を崩さない。
 * About のベント（columns 4: 2×1 · 1×1 · 1×1 / 2×2 · 2×1 / 1×1 · 1×1）と同じ 7 セルで組む
 */
export const Spans = () => (
  <RuledGrid columns={4} style={{ maxWidth: "48rem" }}>
    <Cell colSpan={2}>
      <p className="text-overline text-ink-secondary">2×1</p>
      <p className="mt-auto pt-stack-md text-headline">colSpan 2。行いっぱいに広がる</p>
    </Cell>
    <Cell surface="ink">
      <p className="text-overline text-inverse-ink-tertiary">1×1</p>
      <p className="mt-auto pt-stack-md text-headline">既定</p>
    </Cell>
    <Cell>
      <p className="text-overline text-ink-secondary">1×1</p>
      <p className="mt-auto pt-stack-md text-headline">既定</p>
    </Cell>
    <Cell colSpan={2} rowSpan={2}>
      <p className="text-overline text-ink-secondary">2×2</p>
      <p className="mt-auto pt-stack-md text-headline">colSpan 2 + rowSpan 2。desktop で 2 行ぶん</p>
    </Cell>
    <Cell colSpan={2}>
      <p className="text-overline text-ink-secondary">2×1</p>
      <p className="mt-auto pt-stack-md text-headline">colSpan 2</p>
    </Cell>
    <Cell>
      <p className="text-overline text-ink-secondary">1×1</p>
      <p className="mt-auto pt-stack-md text-headline">既定</p>
    </Cell>
    <Cell>
      <p className="text-overline text-ink-secondary">1×1</p>
      <p className="mt-auto pt-stack-md text-headline">既定</p>
    </Cell>
  </RuledGrid>
);
