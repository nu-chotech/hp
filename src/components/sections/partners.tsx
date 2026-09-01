import { RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { partnersContent } from "@/content/partners";
import { PartnerLogoCell, PartnerPlaceholderCell } from "./people/partner-cell";

const titleId = `${sectionIds.partners}-title`;

/**
 * パートナー（§6.16）
 *
 * 見出し → 導入文 → 3 列の罫線グリッド。見出しの下は `heading-mb-intro` 12、
 * 導入文の下は `stack/lg` 24（= セル境界と同じ強さの切れ目、§3.9）。
 *
 * 募集セルは常に最後に 1 つ。ロゴが増えても末尾に残るので、一覧の終わりが
 * そのまま「次はあなた」の導線になる。
 */
export function Partners() {
  const { heading, intro, partners } = partnersContent;

  return (
    <Section id={sectionIds.partners} aria-labelledby={titleId}>
      <SectionHeading
        title={heading.title}
        label={heading.label}
        titleId={titleId}
        spacing="intro"
        data-reveal
      />
      <p
        className="mb-stack-lg max-w-measure text-body-s text-ink-secondary"
        data-reveal
      >
        {intro}
      </p>
      <RuledGrid columns={3} asChild data-reveal>
        {/* biome-ignore lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
        {/* biome-ignore lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
        <ul role="list">
          {partners.map((partner) => (
            <PartnerLogoCell key={partner.name} partner={partner} />
          ))}
          <PartnerPlaceholderCell />
        </ul>
      </RuledGrid>
    </Section>
  );
}
