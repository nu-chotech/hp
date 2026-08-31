"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { MemberAvatar } from "@/components/sections/members/MemberAvatar";
import { MemberSocialLinks } from "@/components/sections/members/MemberSocialLinks";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TeamMember } from "@/content/members";
import { reveal, spring } from "@/lib/motion-variants";

interface MemberDialogProps {
  /** 閉じるアニメーション中も表示を保つため、open=false でも直前のメンバーを渡す */
  member: TeamMember | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * メンバーの詳細モーダル
 */
export function MemberDialog({
  member,
  open,
  onOpenChange,
}: MemberDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {member && (
            <motion.div
              key={member.id}
              // 出てきた経路をそのまま戻る。下から現れて上へ消えると
              // 空間の連続性が壊れ、どこへ行ったのか分からなくなる。
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={spring.snappy}
            >
              <DialogHeader className="text-center sm:text-center">
                <MemberAvatar
                  name={member.name}
                  size="lg"
                  className="mb-4"
                  delay={0.05}
                  on="mount"
                />
                <motion.div {...reveal("fadeUp", { delay: 0.08, on: "mount" })}>
                  <DialogTitle className="text-xl">{member.name}</DialogTitle>
                  <DialogDescription>{member.role}</DialogDescription>
                </motion.div>
              </DialogHeader>

              <DialogBlock title="プロフィール" delay={0.12}>
                <p className="text-sm leading-relaxed">{member.bio}</p>
              </DialogBlock>

              <DialogBlock title="スキル" delay={0.16}>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      {...reveal("scaleIn", {
                        delay: 0.2 + index * 0.03,
                        on: "mount",
                      })}
                    >
                      <Badge variant="secondary">{skill}</Badge>
                    </motion.div>
                  ))}
                </div>
              </DialogBlock>

              <motion.div
                className="mt-6"
                {...reveal("fadeUp", { delay: 0.24, on: "mount" })}
              >
                <MemberSocialLinks member={member} className="gap-3" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function DialogBlock({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: ReactNode;
}) {
  return (
    <motion.section
      className="mt-4"
      {...reveal("fadeUp", { delay, on: "mount" })}
    >
      <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
        {title}
      </h4>
      {children}
    </motion.section>
  );
}
