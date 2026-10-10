import { RuledGrid } from "@/components/ui/ruled-grid";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionIds } from "@/config/site";
import { membersContent } from "@/content/members";
import { MemberCard } from "./people/member-card";

const titleId = `${sectionIds.members}-title`;

/**
 * 運営メンバー（§6.15）
 *
 * Leader 2 列（16:9）の直下に Staff 2 列（4:3）を **上枠なし**で接続する。
 * Staff が奇数なら、最後の 1 枚は行いっぱいに広げる（fillRow、L-36）—
 * frame fill が divider なので、空いたトラックは灰色の板として見えてしまう。
 *
 * Staff が 3 列だったのは運営が 3 名だったころの構図で、退任で 2 名になった時点で
 * desktop の 3 列目が空席（灰色の板）になった。**列数は人数ではなく、空席を作らない
 * ことから決まる**（L-9 の系）ので 2 列に降ろした（DECISION L-38）。Leader と同幅に
 * なるが、Leader / Staff の差は写真比・inset・name・bio の 4 点で保たれている（§6.15）。
 * 2 つのグリッドは 1 本の罫線を共有して 1 つの罫線列になる（§3.8「連結グリッド」）ので、
 * 間にマージンを置いてはならない — 置いた瞬間に 2px 罫が 2 本に割れる。
 *
 * reveal は 0（見出し）/ 1（Leader）/ 2（Staff）の 3 段（§7.4.1 のインデックス表）。
 * DECISION M-2 が 1 つの面として束ねるのは **1 つの格子の中のセル群** であって、
 * 連結した 2 つの格子ではない。Leader と Staff は写真比も組みも違う 2 つの面なので、
 * §7.4.1 が数えたとおり順に出す。
 */
export function Members() {
  const { heading, leaderCount, showStaffPhotos, members } = membersContent;
  const leaders = members.slice(0, leaderCount);
  const staff = members.slice(leaderCount);

  return (
    <Section id={sectionIds.members} aria-labelledby={titleId}>
      <SectionHeading
        title={heading.title}
        label={heading.label}
        titleId={titleId}
        data-reveal
      />

      <RuledGrid columns={2} asChild data-reveal>
        {/* biome-ignore lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
        {/* biome-ignore lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
        <ul role="list">
          {leaders.map((member) => (
            <MemberCard key={member.id} member={member} size="leader" />
          ))}
        </ul>
      </RuledGrid>
      {staff.length > 0 ? (
        <RuledGrid columns={2} joinTop asChild data-reveal>
          {/* biome-ignore lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る */}
          {/* biome-ignore lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている */}
          <ul role="list">
            {staff.map((member, index) => (
              <MemberCard
                fillRow={staff.length % 2 === 1 && index === staff.length - 1}
                key={member.id}
                member={member}
                size="staff"
                showPhoto={showStaffPhotos}
              />
            ))}
          </ul>
        </RuledGrid>
      ) : null}
    </Section>
  );
}
