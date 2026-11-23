import type { CSSProperties } from "react";
import { ImageSlot } from "@/components/ui/image-slot";
import { Cell, RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
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
 *
 * ロゴの下に**技育プロジェクトを通したつながり**を 2 列で連結する（DECISION U-58）:
 * 写真 16:9 ／ kicker → 題 → 本文 → 技育のサイトへのリンク。ロゴの格子とは `joinTop` で 1 枚の罫線にする（§3.8）。
 * ロゴを先に置くのは、導入文「支えてくださる企業・団体」の直後に来るべきは顔ぶれだから —
 * 技育の段は「つながりの一例」として後に続き、節を締める。
 */
export function Partners() {
  const { heading, intro, partners, network } = partnersContent;
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

      {/* 技育を通したつながり（U-58）。上のロゴの格子に連結する — 間にマージンを置かない */}
      <RuledGrid columns={2} joinTop data-reveal>
        {/* 写真は自分で 16:9 を持ち、隣の文が高ければ揃って伸びる（比を持つ grid item の
            既定は start なので place-self-stretch が要る。L-40 の集合写真と同じ） */}
        <Cell className="aspect-16/9 place-self-stretch" inset="none">
          <ImageSlot
            alt={network.photo.alt}
            ratio="fill"
            sizes="(min-width: 78rem) 597px, (min-width: 48rem) 50vw, 100vw"
            src={network.photo.src}
          />
        </Cell>
        <Cell asChild className="justify-center">
          <section aria-labelledby={`${titleId}-network`}>
            <p className="text-overline text-ink-secondary">{network.kicker}</p>
            <h3 className="mt-stack-sm text-title-2" id={`${titleId}-network`}>
              {network.title}
            </h3>
            <p className="mt-stack-xs max-w-measure text-body-s text-ink-secondary">
              {network.body}
            </p>
            {/* 単独で立つ inline リンク（hit area 44、§6.1.5）。左に寄せて行幅いっぱいに伸ばさない */}
            <TextLink
              className="mt-stack-md self-start text-body-s"
              external
              href={network.link.href}
              standalone
            >
              {network.link.label}
            </TextLink>
          </section>
        </Cell>
      </RuledGrid>
    </Section>
  );
}
