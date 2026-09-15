import { Container, Rule, SectionHeading } from "hp";

/**
 * 紙の幅（§3.6）。width: min(100% − 2×page/inset, 1200) を中央寄せ。端は「内容の端」で、
 * 見出しや罫線グリッドがここに揃う。地を chip/fill で塗ると、紙が窓から 24 内側で止まるのが見える
 */
export const Page = () => (
  <div className="bg-chip-fill">
    <Container className="bg-ground py-inset-md">
      <SectionHeading title="パートナー" label="PARTNERS" spacing="intro" />
      <p className="max-w-measure text-body-m text-ink-secondary">
        ChoTechの活動を支えてくださる企業・団体の皆さまをご紹介します。
      </p>
    </Container>
  </div>
);

/**
 * 窓枠の幅（DECISION L-23）。ナビ・マーキーの帯は container に縛らず viewport から 24 だけ内側 —
 * 1440 で帯の左右に 120 の空白を作らない。紙（Page）と違い、面は窓の端まで届く
 */
export const Viewport = () => (
  <div className="bg-chip-fill">
    <Rule />
    <Container
      width="viewport"
      className="flex flex-wrap items-center gap-inline-2xl bg-ground py-band-pad-y"
    >
      <span className="text-overline text-ink-secondary">PARTNERS</span>
      <span className="text-title-3-caps text-ink">サポーターズ 技育プロジェクト</span>
      <span className="text-title-3-caps text-ink">カラビナテクノロジー株式会社</span>
    </Container>
    <Rule />
  </div>
);
