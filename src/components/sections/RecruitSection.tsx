"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const requirements = [
  "プログラミングに興味がある学生",
  "チーム開発に挑戦したい方",
  "新しい技術を学びたい方",
  "仲間と一緒に成長したい方",
];

const benefits = [
  "実践的なプロジェクト経験",
  "メンター制度でサポート",
  "勉強会・ハッカソン参加",
  "就活・キャリア相談",
];

export function RecruitSection() {
  return (
    <section id="recruit" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">コミュニティに参加する</h2>
            <p className="text-muted-foreground">
              一緒にChoTechで活動しませんか？
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">こんな方を歓迎</h3>
                <ul className="space-y-3">
                  {requirements.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">参加するメリット</h3>
                <ul className="space-y-3">
                  {benefits.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="#contact">Discordで参加する</Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              ※ いつでも参加できます
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
