import { CellChat } from "@/components/bento/cell-chat";
import { CellCta } from "@/components/bento/cell-cta";
import { CellImage } from "@/components/bento/cell-image";
import { CellStat } from "@/components/bento/cell-stat";
import { CellText } from "@/components/bento/cell-text";
import { RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { aboutContent } from "@/content/about";

/**
 * About（§6.11）
 *
 * ベントは面積で優先順位を示す。DOM 順がそのまま Mobile の 1 列になるので、
 * 「文化 → 公認 → 規模 → 会話 → 写真 → 場 → 対象 → 導線」の読み順は
 * Desktop の格子でも Mobile の縦列でも変わらない（span は列方向にだけ効く）。
 *
 * reveal はグリッドを **1 つの親** として出す（DECISION M-2）。2px 罫線で結ばれた
 * 格子は 1 つの面であって、セルが順に現れると格子が壊れて見える。
 * インデックスは見出し 0 / グリッド 1（§7.4.1 の About 0/1）。
 */
export function About() {
  const {
    heading,
    culture,
    official,
    stat,
    chat,
    photos,
    onlineOffline,
    forEveryone,
    cta,
  } = aboutContent;

  return (
    <Section aria-labelledby="about-title" id={sectionIds.about}>
      <SectionHeading
        data-reveal
        label={heading.label}
        title={heading.title}
        titleId="about-title"
      />

      <RuledGrid columns={4} data-reveal>
        {/* 行 1: 2×1 CULTURE · 1×1 OFFICIAL · Stat。行の高さは OFFICIAL が駆動する */}
        <CellText
          body={culture.body}
          colSpan={2}
          kicker={culture.kicker}
          size="2x1"
          title={culture.title}
        />
        <CellText
          body={official.body}
          kicker={official.kicker}
          size="1x1-md"
          title={official.title}
        />
        <CellStat
          accessibleName={stat.accessibleName}
          kicker={stat.kicker}
          suffix={stat.suffix}
          value={stat.value}
        />

        {/* 行 2–3: Chat 2×2 · Image 2×2 */}
        <CellChat kicker={chat.kicker} note={chat.note} thread={chat.thread} />
        {/*
          label は「まだ素材が入っていない枠」を制作中に見分けるための印で、
          閲覧者に見せる情報ではない（§6.19「本番では caption を出さない」）。
          実素材（src / alt）を入れる時点で label を落とせば、そのまま本番になる。
        */}
        <CellImage
          photos={
            process.env.NODE_ENV === "production"
              ? photos.map(({ label: _label, ...photo }) => photo)
              : photos
          }
        />

        {/* 行 4: 1×1 · 1×1 · CTA 2×1 */}
        <CellText
          kicker={onlineOffline.kicker}
          size="1x1-sm"
          title={onlineOffline.title}
        />
        <CellText
          kicker={forEveryone.kicker}
          size="1x1-sm"
          title={forEveryone.title}
        />
        <CellCta
          href={cta.action.href}
          label={cta.action.label}
          sub={cta.sub}
          title={cta.title}
        />
      </RuledGrid>
    </Section>
  );
}
