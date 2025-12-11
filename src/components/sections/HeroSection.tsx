"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-muted-foreground mb-2">
            長崎大学 情報データ科学部発
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            学生エンジニアコミュニティ
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            ChoTech
          </h1>

          <p className="text-xl font-medium max-w-xl mx-auto mb-4">
            共に学び、共に創り、共に発信する。
          </p>

          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            「技術を学ぶ・作る・話す」を、みんなで気軽に楽しむコミュニティ
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#recruit">参加する</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#about">詳しく見る</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
