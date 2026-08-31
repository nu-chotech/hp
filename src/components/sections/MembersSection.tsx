"use client";

import type { LucideIcon } from "lucide-react";
import { Github, Instagram, Link2, Twitter } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  cardScale,
  defaultViewport,
  spring,
  staggerContainer,
} from "@/lib/motion-variants";

// SNSリンク設定
const socialLinksConfig: {
  key: keyof Pick<TeamMember, "twitter" | "instagram" | "github" | "link">;
  icon: LucideIcon;
}[] = [
  { key: "twitter", icon: Twitter },
  { key: "instagram", icon: Instagram },
  { key: "github", icon: Github },
  { key: "link", icon: Link2 },
];

// メンバーの型定義
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  twitter?: string;
  instagram?: string;
  github?: string;
  link?: string;
}

// 運営メンバーデータ（5人）
const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "田中 太郎",
    role: "代表",
    bio: "情報データ科学部3年。ChoTechの立ち上げメンバーとして、コミュニティの成長をリードしています。Webアプリケーション開発を中心に活動中。",
    skills: ["React", "TypeScript", "Next.js", "Python"],
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
    link: "https://example.com",
  },
  {
    id: "2",
    name: "佐藤 花子",
    role: "副代表",
    bio: "情報データ科学部2年。デザインとフロントエンド開発を担当。ユーザー体験を重視したプロダクト作りを心がけています。",
    skills: ["UI/UX Design", "Figma", "React", "CSS"],
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    id: "3",
    name: "鈴木 一郎",
    role: "技術リーダー",
    bio: "情報データ科学部4年。バックエンド開発とインフラ構築を担当。クラウドサービスを活用した効率的なシステム設計を得意としています。",
    skills: ["Go", "AWS", "Docker", "Kubernetes", "PostgreSQL"],
    twitter: "https://twitter.com",
    github: "https://github.com",
    link: "https://example.com",
  },
  {
    id: "4",
    name: "山田 美咲",
    role: "広報",
    bio: "情報データ科学部2年。SNS運営やイベントの企画・告知を担当。ChoTechの魅力を多くの人に届けるため、日々発信しています。",
    skills: ["Marketing", "SNS運用", "Canva", "Notion"],
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    id: "5",
    name: "高橋 健太",
    role: "イベント担当",
    bio: "情報データ科学部3年。ハッカソンや勉強会の企画・運営を担当。参加者が楽しく学べるイベント作りを目指しています。",
    skills: [
      "Event Planning",
      "JavaScript",
      "Machine Learning",
      "Data Analysis",
    ],
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
];

interface MemberSocialLinksProps {
  member: TeamMember;
  onStopPropagation?: boolean;
}

function MemberSocialLinks({
  member,
  onStopPropagation = false,
}: MemberSocialLinksProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {socialLinksConfig.map(({ key, icon: Icon }) =>
        member[key] ? (
          <a
            key={key}
            href={member[key]}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-muted transition-[background-color,transform] duration-150 ease-out hover:scale-110 active:scale-95 active:duration-75"
            onClick={onStopPropagation ? (e) => e.stopPropagation() : undefined}
          >
            <Icon className="w-4 h-4" />
          </a>
        ) : null,
      )}
    </div>
  );
}

interface MemberAvatarProps {
  name: string;
  size?: "sm" | "lg";
  index?: number;
  animate?: boolean;
}

function MemberAvatar({
  name,
  size = "sm",
  index = 0,
  animate = true,
}: MemberAvatarProps) {
  const sizeClasses =
    size === "lg" ? "w-20 h-20 text-2xl" : "w-16 h-16 text-xl";

  const content = (
    <div
      className={`${sizeClasses} mx-auto mb-4 rounded-full bg-muted flex items-center justify-center font-bold`}
    >
      {name.charAt(0)}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      className={`${sizeClasses} mx-auto mb-4 rounded-full bg-muted flex items-center justify-center font-bold`}
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ...spring.momentum, delay: 0.1 + index * 0.05 }}
    >
      {name.charAt(0)}
    </motion.div>
  );
}

export function MembersSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsOpen(true);
  };

  return (
    <section id="members" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="運営メンバー"
          description="ChoTechを運営するコアメンバーです。"
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
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
                onClick={() => handleMemberClick(member)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleMemberClick(member);
                  }
                }}
              >
                <CardContent className="p-6 text-center">
                  <MemberAvatar name={member.name} index={index} />
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {member.role}
                  </p>
                  <MemberSocialLinks member={member} onStopPropagation />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* メンバー詳細モーダル */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <AnimatePresence mode="wait">
            {selectedMember && (
              <motion.div
                key={selectedMember.id}
                // 出てきた経路をそのまま戻る。下から現れて上へ消えると
                // 空間の連続性が壊れ、どこへ行ったのか分からなくなる。
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={spring.snappy}
              >
                <DialogHeader className="text-center sm:text-center">
                  <motion.div
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-2xl font-bold"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ...spring.momentum, delay: 0.05 }}
                  >
                    {selectedMember.name.charAt(0)}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring.snappy, delay: 0.08 }}
                  >
                    <DialogTitle className="text-xl">
                      {selectedMember.name}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                      {selectedMember.role}
                    </DialogDescription>
                  </motion.div>
                </DialogHeader>

                {/* Bio */}
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring.snappy, delay: 0.12 }}
                >
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                    プロフィール
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </motion.div>

                {/* Skills */}
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring.snappy, delay: 0.16 }}
                >
                  <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                    スキル
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          ...spring.momentum,
                          delay: 0.2 + index * 0.03,
                        }}
                      >
                        <Badge variant="secondary">{skill}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* SNS Links */}
                <motion.nav
                  className="mt-6 flex items-center justify-center gap-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring.snappy, delay: 0.24 }}
                >
                  {socialLinksConfig.map(({ key, icon: Icon }) =>
                    selectedMember[key] ? (
                      <motion.a
                        key={key}
                        href={selectedMember[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted transition-[background-color,transform] duration-150 ease-out hover:scale-110 active:scale-95 active:duration-75"
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    ) : null,
                  )}
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
