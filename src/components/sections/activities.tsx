import { RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { activitiesContent } from "@/content/activities";
import { ActivityCell } from "./activities/activity-cell";

/**
 * 活動内容（§6.13）
 *
 * 4 件を hairline の一覧ではなくベント 4 セルで出す（DECISION U-8）。
 * 同じ罫線グリッドを About と共有することでページの語彙が 1 つ減り、
 * Talk Day を Feature にすることで「最初に見るべきもの」を面積が答える。
 *
 * 列数: Desktop は 6 列に割る。§6.13.1 の幅（Feature 797 / Compact 397 / 597）は
 * 4 列でも 3 列でも同時には表せない — 797 は 3 列中の 2 列、597 は 2 列中の 1 列で、
 * 両方の最小公倍数が 6 だからである。inner 1196 を 6 で割ると
 * 4 列 = 797 / 2 列 = 397 / 3 列 = 597 になり、spec の 3 つの幅がそのまま出る。
 * RuledGrid が持つのは 2 / 3 / 4 の既製列だけなので、desktop の列数だけ足す。
 * tablet は RuledGrid 既定の 2 列（行 1 [Feature + Dev]、行 2 [Project + Hackathon]）、
 * Mobile は 1 列で DOM 順（Feature が先頭）。
 */

const headingId = `${sectionIds.activities}-heading`;

/**
 * Desktop 6 列に対する span。行 1 [4 + 2] / 行 2 [3 + 3]（§6.13.1）。
 * 視覚順と DOM 順を一致させる（§6.13.3）ので、この配列の順序が読み上げ順そのもの。
 */
const cellSpans = [
  "desktop:col-span-4",
  "desktop:col-span-2",
  "desktop:col-span-3",
  "desktop:col-span-3",
] as const;

/**
 * span は content の件数と暗黙に結びついている。5 件目が足された場合、
 * span 無しのセルは 6 列のうち 1 列になり §6.13.1 の幾何（797 / 397 / 597）が崩れる。
 * 幾何が壊れるより「Compact 597 が 1 つ増えた」形に倒れる方が読める。
 */
const fallbackSpan = "desktop:col-span-3";

export function Activities() {
  const { heading, activities, showFrequency } = activitiesContent;

  return (
    <Section aria-labelledby={headingId} id={sectionIds.activities}>
      {/* reveal は §7.4.1 の「Activities 0」。見出しとベントを同じ段（0）で出す。
          罫線で結ばれた格子は 1 つの面なので、セルを個別に動かさない（DECISION M-2） */}
      <SectionHeading
        data-reveal
        label={heading.label}
        // ベントの直前は heading-mb-list 8（§6.10）。セルが自前で inset/cell 24 を
        // 持つので、見出しの下端から題までは 8 + 24 = 32 で他節の grid と揃う
        spacing="list"
        title={heading.title}
        titleId={headingId}
      />
      <RuledGrid
        asChild
        className="desktop:grid-cols-6"
        columns={2}
        data-reveal
        data-reveal-index={0}
      >
        {/* preflight の list-style:none で Safari/VoiceOver がリストロールを剥がす。
            「4 件の集合」という §6.13.3 の意味論を保つため role を明示する */}
        {/* biome-ignore lint/a11y/noRedundantRoles: Safari/VoiceOver は preflight の list-style:none でリストロールを剥がすため、§6.13.3 / §8.5 が要求する <ul> の意味論を role の再宣言で戻す */}
        {/* biome-ignore lint/a11y/useSemanticElements: Safari/VoiceOver は preflight の list-style:none でリストロールを剥がすため、§6.13.3 / §8.5 が要求する <ul> の意味論を role の再宣言で戻す */}
        <ul role="list">
          {activities.map((activity, index) => (
            <ActivityCell
              activity={activity}
              cellId={`activity-${index}`}
              className={cellSpans[index] ?? fallbackSpan}
              key={activity.title}
              // 1 件目だけ Feature。入口の太さの差を面積で示す（DECISION U-8）
              showFrequency={showFrequency}
              size={index === 0 ? "feature" : "compact"}
            />
          ))}
        </ul>
      </RuledGrid>
    </Section>
  );
}
