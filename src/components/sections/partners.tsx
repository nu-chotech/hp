import { RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { partnersContent } from "@/content/partners";
import { PartnerFillerCell, PartnerLogoCell } from "./people/partner-cell";

const titleId = `${sectionIds.partners}-title`;

/** Desktop の列数。6 / 3 / 2（desktop / tablet / Mobile）はすべて 6 の約数なので、6 の倍数に揃えればどの幅でも行が欠けない */
const columns = 6;

/**
 * パートナー（§6.16）
 *
 * 見出し → 導入文 → 3:2 の白タイルの罫線グリッド（Desktop 6 列 / tablet 3 / Mobile 2、
 * DECISION L-31 / L-32 / U-33）。見出しの下は `heading-mb-intro` 12、導入文の下は
 * `stack/lg` 24（= セル境界と同じ強さの切れ目、§3.9）。
 *
 * 行の端数は無地の白タイルで埋める（DECISION U-34）。罫線グリッドは frame の地が罫なので、
 * 空いたトラックをそのままにすると divider 色の板が出る。埋め草は情報を持たないので
 * aria-hidden にし、リストの項目数は団体の数のままにする。
 */
export function Partners() {
  const { heading, intro, partners } = partnersContent;
  const fillers = (columns - (partners.length % columns)) % columns;

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
      <RuledGrid columns={columns} asChild data-reveal>
        {/* biome-ignore lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
        {/* biome-ignore lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
        <ul role="list">
          {partners.map((partner) => (
            <PartnerLogoCell key={partner.name} partner={partner} />
          ))}
          {Array.from({ length: fillers }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 埋め草は内容を持たず、並び替えも個別の状態も無い。index 以外に識別子が無い
            <PartnerFillerCell key={`filler-${i}`} />
          ))}
        </ul>
      </RuledGrid>
    </Section>
  );
}
