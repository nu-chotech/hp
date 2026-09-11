import type { CSSProperties } from "react";
import { Cell, RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { partnersContent } from "@/content/partners";
import { PartnerLogo } from "./people/partner-logo";

const titleId = `${sectionIds.partners}-title`;

/**
 * パートナー（§6.16 / DECISION U-43）
 *
 * 見出し → 導入文 → **外枠だけ**の白い面に、ロゴを等分の列で 1 行に並べる。
 * 旧 6 列の 3:2 タイル（L-31 / L-32）は内側の罫が 1 枚ずつを区切り、団体数が 6 の倍数で
 * ないと無地の埋め草（U-34）が出て「空席」に見えた。外枠 1 つの中に並べれば、団体数が
 * いくつでも 1 行の「顔ぶれ」として読める。
 *
 * 列数は Desktop で団体数ちょうど（5 なら 5 等分）、tablet 3、Mobile 2 で折り返す。
 * Desktop の列数は content の件数から決まるので、CSS 変数で渡す（Tailwind のクラスに
 * 件数を焼き込まない）。見出しの下は `heading-mb-intro` 12、導入文の下は `stack/lg` 24（§3.9）。
 */
export function Partners() {
  const { heading, intro, partners } = partnersContent;
  const columns = {
    "--partner-columns": `repeat(${partners.length}, minmax(0, 1fr))`,
  } as CSSProperties;

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
      {/* 外枠だけの罫線グリッド（columns 1）。中は白い面 1 枚（logo-ground、U-33） */}
      <RuledGrid columns={1} data-reveal>
        <Cell surface="logo">
          {/* biome-ignore-start lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
          {/* biome-ignore lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
          <ul
            className="grid grid-cols-2 items-center gap-x-inline-lg gap-y-stack-lg tablet:grid-cols-3 desktop:grid-cols-(--partner-columns)"
            role="list"
            style={columns}
          >
            {partners.map((partner) => (
              <PartnerLogo key={partner.name} partner={partner} />
            ))}
          </ul>
          {/* biome-ignore-end lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
        </Cell>
      </RuledGrid>
    </Section>
  );
}
