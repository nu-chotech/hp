import { RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { personasContent } from "@/content/personas";
import { PersonaCard } from "./people/persona-card";

const titleId = `${sectionIds.forYou}-title`;

/**
 * こんな人に、おすすめ（§6.14）
 *
 * ペルソナ 6 枚を 3 列 × 2 行（Mobile 1 列）。リストなので `<ul>` に組み、
 * 罫線グリッドの見た目はそのまま `<ul>` に委譲する（asChild）。
 *
 * reveal はセクション内 0（見出し）/ 1（グリッド）の 2 段だけ（§7.4.1）。
 * セルを 1 枚ずつ動かさないのは、2px 罫線で結ばれた格子が 1 つの面だから（DECISION M-2）。
 */
export function ForYou() {
  const { heading, personas } = personasContent;

  return (
    <Section id={sectionIds.forYou} aria-labelledby={titleId}>
      <SectionHeading
        title={heading.title}
        label={heading.label}
        titleId={titleId}
        data-reveal
      />
      <RuledGrid columns={3} asChild data-reveal>
        {/* biome-ignore lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
        {/* biome-ignore lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
        <ul role="list">
          {personas.map((persona) => (
            <PersonaCard key={persona.caseNo} persona={persona} />
          ))}
        </ul>
      </RuledGrid>
    </Section>
  );
}
