"use client";

import { motion } from "motion/react";
import type { KeyboardEvent } from "react";
import { MemberAvatar } from "@/components/sections/members/MemberAvatar";
import { MemberSocialLinks } from "@/components/sections/members/MemberSocialLinks";
import { Card, CardContent } from "@/components/ui/card";
import type { TeamMember } from "@/content/members";
import { cardScale, spring } from "@/lib/motion-variants";

interface MemberCardProps {
  member: TeamMember;
  /** 兄弟カードとの登場順序付けに使う */
  index: number;
  onSelect: (member: TeamMember) => void;
}

export function MemberCard({ member, index, onSelect }: MemberCardProps) {
  const select = () => onSelect(member);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select();
    }
  };

  return (
    <motion.div
      variants={cardScale}
      whileHover={{ y: -6, transition: spring.snappy }}
      // 押した瞬間に返す。指を離すまで待たない
      whileTap={{ scale: 0.98, transition: spring.snappy }}
    >
      <Card
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        className="h-full transition-shadow hover:shadow-lg cursor-pointer outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        onClick={select}
        onKeyDown={handleKeyDown}
      >
        <CardContent className="p-6 text-center">
          <MemberAvatar
            name={member.name}
            className="mb-4"
            delay={0.1 + index * 0.05}
          />
          <h3 className="font-semibold">{member.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
          <MemberSocialLinks member={member} stopPropagation />
        </CardContent>
      </Card>
    </motion.div>
  );
}
