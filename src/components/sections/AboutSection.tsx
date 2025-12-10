"use client";

import { Code, Lightbulb, Rocket, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Code,
    title: "技術を学ぶ",
    description: "最新の技術を実践的に学びます。",
  },
  {
    icon: Users,
    title: "仲間と成長",
    description: "同じ志を持つ仲間と切磋琢磨します。",
  },
  {
    icon: Lightbulb,
    title: "アイデアを形に",
    description: "プロジェクトを通じてアイデアを実現します。",
  },
  {
    icon: Rocket,
    title: "社会に貢献",
    description: "技術で社会課題の解決に挑みます。",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">私たちについて</h2>
          <p className="text-muted-foreground">
            ChoTechは、テクノロジーを通じて社会に貢献することを目指す学生の集まりです。
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
