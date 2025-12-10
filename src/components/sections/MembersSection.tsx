"use client";

import { Github, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// サンプルメンバーデータ（後でMicroCMSから取得）
const sampleMembers = [
  {
    id: "1",
    name: "田中 太郎",
    role: "代表",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    id: "2",
    name: "佐藤 花子",
    role: "副代表",
    github: "https://github.com",
  },
  {
    id: "3",
    name: "鈴木 一郎",
    role: "技術リーダー",
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  {
    id: "4",
    name: "山田 美咲",
    role: "広報",
    github: "https://github.com",
  },
];

export function MembersSection() {
  return (
    <section id="members" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">メンバー</h2>
          <p className="text-muted-foreground">
            様々なスキルや興味を持つメンバーが活躍しています。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sampleMembers.map((member) => (
            <Card key={member.id}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {member.role}
                </p>
                <div className="flex items-center justify-center gap-2">
                  {member.github && (
                    <Link
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </Link>
                  )}
                  {member.twitter && (
                    <Link
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-muted transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline">
            <Link href="/members">すべてのメンバーを見る</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
