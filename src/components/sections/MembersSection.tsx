"use client";

import { ArrowRight, Github, Twitter } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// サンプルメンバーデータ（後でMicroCMSから取得）
const sampleMembers = [
  {
    id: "1",
    name: "田中 太郎",
    role: "代表 / フルスタック",
    description: "Web開発とAI/MLに興味があります。",
    avatar: null,
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    id: "2",
    name: "佐藤 花子",
    role: "副代表 / デザイナー",
    description: "UI/UXデザインとフロントエンド担当。",
    avatar: null,
    github: "https://github.com",
    twitter: null,
  },
  {
    id: "3",
    name: "鈴木 一郎",
    role: "技術リーダー / バックエンド",
    description: "サーバーサイドとインフラを担当。",
    avatar: null,
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    id: "4",
    name: "山田 美咲",
    role: "広報 / モバイル",
    description: "FlutterとSwiftUIでアプリ開発中。",
    avatar: null,
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
];

function generateAvatarColor(name: string) {
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-yellow-500 to-amber-500",
    "from-teal-500 to-cyan-500",
  ];
  const index =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
}

export function MembersSection() {
  return (
    <section id="members" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
            Members
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            メンバー紹介
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            様々なスキルや興味を持つメンバーが活躍しています。
          </p>
        </motion.div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {sampleMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center">
                {/* Avatar */}
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br ${generateAvatarColor(member.name)} flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300`}
                >
                  {member.name.charAt(0)}
                </div>

                {/* Info */}
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {member.description}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-2">
                  {member.github && (
                    <Link
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                      <Github className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Link>
                  )}
                  {member.twitter && (
                    <Link
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/members" className="flex items-center gap-2">
              すべてのメンバーを見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
