"use client";

import { BookOpen, Hammer, MessageCircle, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "学ぶ",
    description: "最新の技術を実践的に学び、T字型人材を目指します。",
  },
  {
    icon: Hammer,
    title: "作る",
    description: "チームでプロジェクトに挑戦し、アイデアを形にします。",
  },
  {
    icon: MessageCircle,
    title: "話す",
    description: "ライトニングトークや勉強会で知識を共有します。",
  },
  {
    icon: Users,
    title: "仲間",
    description: "同じ志を持つ仲間と切磋琢磨し、共に成長します。",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">私たちについて</h2>
          <p className="text-muted-foreground">
            学生が主体的かつ協働的に「技術を学ぶ・作る・話す」独自のカルチャーを育んでいくコミュニティです。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <feature.icon className="w-8 h-8 mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
