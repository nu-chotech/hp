"use client";

import { Github, Instagram, Link2, Twitter } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";

// 運営メンバーデータ（5人）
const teamMembers = [
  {
    id: "1",
    name: "田中 太郎",
    role: "代表",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
    link: "https://example.com",
  },
  {
    id: "2",
    name: "佐藤 花子",
    role: "副代表",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    id: "3",
    name: "鈴木 一郎",
    role: "技術リーダー",
    twitter: "https://twitter.com",
    github: "https://github.com",
    link: "https://example.com",
  },
  {
    id: "4",
    name: "山田 美咲",
    role: "広報",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  {
    id: "5",
    name: "高橋 健太",
    role: "イベント担当",
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function MembersSection() {
  return (
    <section id="members" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-4">運営メンバー</h2>
          <p className="text-muted-foreground">
            ChoTechを運営するコアメンバーです。
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-xl font-bold"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    {member.name.charAt(0)}
                  </motion.div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {member.role}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted transition-all hover:scale-110 active:scale-95"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted transition-all hover:scale-110 active:scale-95"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted transition-all hover:scale-110 active:scale-95"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.link && (
                      <a
                        href={member.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-muted transition-all hover:scale-110 active:scale-95"
                      >
                        <Link2 className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
