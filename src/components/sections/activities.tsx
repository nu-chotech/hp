import { RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { activitiesContent } from "@/content/activities";
import { ActivityCell } from "./activities/activity-cell";

/**
 * 活動内容（§6.13）
 *
 * 4 件を均等な 2×2 の写真セルで出す（DECISION U-41。旧 U-8 の Feature / Compact は撤回）。
 * About と同じ罫線グリッドを共有することでページの語彙が 1 つ減り、
 * 各セルの上端に活動の写真が縁まで入ることで「何をしているか」が字より先に伝わる。
 *
 * 列数: Desktop / tablet 2 列（597 / 半分）、Mobile 1 列で DOM 順（Talk Day が先頭）。
 * 優先は面積ではなく順序で示す — 4 件が同じ大きさなら読み手は 4 つを一覧として
 * 受け取り、入口の太さは並び順（左上が最初）で読む。
 */

const headingId = `${sectionIds.activities}-heading`;

export function Activities() {
  const { heading, activities, showFrequency } = activitiesContent;

  return (
    <Section aria-labelledby={headingId} id={sectionIds.activities}>
      {/* reveal は §7.4.1 の「Activities 0」。見出しとベントを同じ段（0）で出す。
          罫線で結ばれた格子は 1 つの面なので、セルを個別に動かさない（DECISION M-2） */}
      <SectionHeading
        data-reveal
        label={heading.label}
        // ベントの直前は heading-mb-list 8（§6.10）。セルの上端は写真なので、
        // 見出しの下端から写真までが 8 — 他節の grid（見出し → 罫 8）と同じ距離
        spacing="list"
        title={heading.title}
        titleId={headingId}
      />
      <RuledGrid asChild columns={2} data-reveal data-reveal-index={0}>
        {/* preflight の list-style:none で Safari/VoiceOver がリストロールを剥がす。
            「4 件の集合」という §6.13.3 の意味論を保つため role を明示する */}
        {/* biome-ignore lint/a11y/noRedundantRoles: Safari/VoiceOver は preflight の list-style:none でリストロールを剥がすため、§6.13.3 / §8.5 が要求する <ul> の意味論を role の再宣言で戻す */}
        {/* biome-ignore lint/a11y/useSemanticElements: Safari/VoiceOver は preflight の list-style:none でリストロールを剥がすため、§6.13.3 / §8.5 が要求する <ul> の意味論を role の再宣言で戻す */}
        <ul role="list">
          {activities.map((activity, index) => (
            <ActivityCell
              activity={activity}
              key={activity.title}
              priority={index === 0}
              showFrequency={showFrequency}
            />
          ))}
        </ul>
      </RuledGrid>
    </Section>
  );
}
