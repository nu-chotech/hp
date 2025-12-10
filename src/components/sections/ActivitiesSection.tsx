"use client";

import {
  Brain,
  Gamepad2,
  Globe,
  GraduationCap,
  Server,
  Smartphone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const activities = [
  {
    icon: Globe,
    title: "Web開発",
    description: "Webアプリケーション開発",
  },
  {
    icon: Brain,
    title: "AI / 機械学習",
    description: "機械学習モデルの構築",
  },
  {
    icon: Smartphone,
    title: "モバイルアプリ",
    description: "クロスプラットフォームアプリ開発",
  },
  {
    icon: Server,
    title: "インフラ",
    description: "クラウドインフラの構築",
  },
  {
    icon: Gamepad2,
    title: "ゲーム開発",
    description: "ゲーム・VR/ARコンテンツ制作",
  },
  {
    icon: GraduationCap,
    title: "技術教育",
    description: "勉強会・ワークショップ運営",
  },
];

export function ActivitiesSection() {
  return (
    <section id="activities" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">活動内容</h2>
          <p className="text-muted-foreground">
            様々な技術分野で活動しています。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card key={activity.title}>
              <CardContent className="p-6">
                <activity.icon className="w-8 h-8 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{activity.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
