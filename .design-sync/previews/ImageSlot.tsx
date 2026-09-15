import { Cell, ImageSlot, RuledGrid } from "hp";
import case01 from "../../public/images/personas/case-01.svg";
import case02 from "../../public/images/personas/case-02.svg";
import progatePath from "../../public/images/partners/progate-path.png";

/**
 * 写真が入るべき場所の「枠」を先に確定させる部品（§6.19）。実素材が揃うまでは placeholder
 * （color/image/placeholder の地 + Photo 24 + 開発用 caption）。写真（jpg）はこのライブラリには
 * 持ち込まないので、矩形の写真枠はプレースホルダがこの DS の正しい状態。
 */

/** §5.7.2 の 3 比率 + ロゴの 3:2 + 1:1。比率は枠が持つので、素材の到着でレイアウトが動かない */
export const Ratios = () => (
  <div className="flex flex-wrap items-start gap-inline-sm">
    <ImageSlot ratio="16:9" caption="16:9 — 活動写真" style={{ width: "16rem" }} />
    <ImageSlot ratio="4:3" caption="4:3 — メンバー（sm）" style={{ width: "12rem" }} />
    <ImageSlot ratio="3:2" caption="3:2 — ロゴ" style={{ width: "12rem" }} />
    <ImageSlot ratio="1:1" caption="1:1 — メンバー（lg）" style={{ width: "9rem" }} />
  </div>
);

/** circle は Persona のイラストだけ（径 = size/illustration）。素材が無い間はアイコンのみ中央 */
export const Circle = () => (
  <div className="flex flex-wrap items-center gap-inline-lg">
    <ImageSlot shape="circle" sizes="80px" />
    <ImageSlot alt="" shape="circle" sizes="80px" src={case01} />
    <ImageSlot alt="" shape="circle" sizes="80px" src={case02} />
  </div>
);

/**
 * src が入った矩形。cover は枠を埋め（focal で人物は顔を上 1/3 に）、contain はロゴ用（3:2 × 高さ
 * size/marquee-logo 96、U-43）に箱の中央へ — contain のときだけ placeholder の地を落とす
 * （素材が白キャンバスを持つので、灰色の板がロゴを縁取らないため、§6.16）
 */
export const WithSource = () => (
  <div className="flex flex-wrap items-start gap-inline-sm">
    <ImageSlot alt="" fit="cover" focal="face" ratio="4:3" sizes="192px" src={case01} style={{ width: "12rem" }} />
    <ImageSlot alt="" fit="cover" focal="center" ratio="1:1" sizes="144px" src={case02} style={{ width: "9rem" }} />
    <ImageSlot alt="Progate Path" className="h-marquee-logo" fit="contain" ratio="3:2" sizes="144px" src={progatePath} />
  </div>
);

/** 罫線グリッドのセルに inset 0 で敷く（§6.11.5）。周囲の罫が境界を作るので枠も角丸も持たない */
export const InCell = () => (
  <RuledGrid columns={2} style={{ maxWidth: "48rem" }}>
    <Cell inset="none">
      <ImageSlot className="shrink-0" ratio="16:9" caption="Dev Day の写真" />
      <div className="flex flex-1 flex-col gap-stack-xs p-inset-cell">
        <p className="text-title-1">Dev Day</p>
        <p className="text-body-s text-ink-secondary">月に一度、集まって作る日。</p>
      </div>
    </Cell>
    <Cell inset="none">
      <ImageSlot className="shrink-0" ratio="16:9" caption="Project の写真" />
      <div className="flex flex-1 flex-col gap-stack-xs p-inset-cell">
        <p className="text-title-1">Project</p>
        <p className="text-body-s text-ink-secondary">チームで一つのものを育てる。</p>
      </div>
    </Cell>
  </RuledGrid>
);
