import { SectionHeading } from "hp";

/** 和文の題が先、欧文ラベルが後（DECISION U-4）。既定の spacing="grid" は下に罫線グリッドが来るときの余白 */
export const Default = () => (
  <div>
    <SectionHeading title="活動内容" label="ACTIVITY" />
    <div className="h-rule bg-divider" />
  </div>
);

/** §6.10 が挙げる 5 節の見出し。連番は持たず、ラベルは overline の ink-secondary */
export const Sections = () => (
  <div className="flex flex-col gap-stack-lg">
    <SectionHeading title="ChoTechについて" label="ABOUT" spacing="intro" />
    <SectionHeading title="活動内容" label="ACTIVITY" spacing="intro" />
    <SectionHeading title="こんな人におすすめ！" label="FOR YOU" spacing="intro" />
    <SectionHeading title="運営メンバー" label="MEMBERS" spacing="intro" />
    <SectionHeading title="パートナー" label="PARTNERS" spacing="intro" />
  </div>
);

/** 見出しの下に何が来るかで 3 通り（§3.9）: grid（罫線グリッド）/ intro（導入文）/ list（hairline の行リスト） */
export const Spacing = () => (
  <div className="flex flex-col gap-stack-xl">
    <div>
      <SectionHeading title="活動内容" label="ACTIVITY" spacing="grid" />
      <div className="h-rule bg-divider" />
    </div>
    <div>
      <SectionHeading title="パートナー" label="PARTNERS" spacing="intro" />
      <p className="max-w-measure text-body-m text-ink-secondary">
        ChoTechの活動を支えてくださる企業・団体の皆さまをご紹介します。
      </p>
    </div>
    <div>
      <SectionHeading title="運営メンバー" label="MEMBERS" spacing="list" />
      <div className="h-hair bg-divider-hairline" />
    </div>
  </div>
);

/** 「 で始まる題は trim-start で括弧の余白を詰め、字面を見出しの左端に揃える。titleId は <section aria-labelledby> が参照する h2 の id */
export const Bracket = () => (
  <div className="flex flex-col gap-stack-lg">
    <SectionHeading
      title="「LT、一回やってみたいかも」"
      label="FOR YOU"
      titleId="preview-for-you-title"
      spacing="intro"
    />
    <SectionHeading title="こんな人におすすめ！" label="FOR YOU" spacing="intro" />
  </div>
);
