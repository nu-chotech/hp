"use client";

import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <section
      id="recruit"
      className="py-20 lg:py-32 bg-linear-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4" />
              Recruitment
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              メンバー募集中
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              一緒にテクノロジーで未来を創りませんか？
              初心者から経験者まで、やる気のある方を歓迎します。
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl border border-border p-6 lg:p-8"
            >
              <h3 className="text-xl font-semibold mb-6">こんな方を募集</h3>
              <ul className="space-y-4">
                {requirements.map((requirement, index) => (
                  <motion.li
                    key={requirement}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl border border-border p-6 lg:p-8"
            >
              <h3 className="text-xl font-semibold mb-6">参加するメリット</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <Button
              asChild
              size="lg"
              className="text-base px-8 h-12 rounded-full"
            >
              <Link href="#contact" className="flex items-center gap-2">
                応募する
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              ※ 随時募集しています。お気軽にお問い合わせください。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
