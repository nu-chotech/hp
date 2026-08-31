"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { MemberCard } from "@/components/sections/members/MemberCard";
import { MemberDialog } from "@/components/sections/members/MemberDialog";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { membersContent, type TeamMember } from "@/content/members";
import { defaultViewport, staggerContainer } from "@/lib/motion-variants";

export function MembersSection() {
  // 閉じるアニメーション中もダイアログの中身を保つため、
  // 「選択中のメンバー」と「開いているか」は別々に持つ
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (member: TeamMember) => {
    setSelected(member);
    setOpen(true);
  };

  return (
    <Section id="members" tone="muted">
      <SectionHeader
        title={membersContent.title}
        description={membersContent.description}
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        {membersContent.members.map((member, index) => (
          <MemberCard
            key={member.id}
            member={member}
            index={index}
            onSelect={handleSelect}
          />
        ))}
      </motion.div>

      <MemberDialog member={selected} open={open} onOpenChange={setOpen} />
    </Section>
  );
}
