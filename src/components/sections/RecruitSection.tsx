"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SmoothLink } from "@/components/shared/SmoothLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { defaultViewport, fadeInUp, listItem } from "@/lib/motion-variants";

const participationStyles = [
  "会員制ではない — いつでも気軽に参加可能",
  "完全自由参加 — 聞くだけでもOK",
  "初心者歓迎 — 知識ゼロでも安心",
  "挙手制 — やりたいことがあれば主体的に",
];

const benefits = [
  "実践的なスキル習得（プレゼン・技術力）",
  "仲間との出会いとネットワーキング",
  "T字型人材への成長・キャリアへの貢献",
  "ポートフォリオの構築",
];

export function RecruitSection() {
  return (
    <section id="recruit" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="コミュニティに参加する"
            description="一緒にChoTechで活動しませんか？"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">参加スタイル</h3>
                  <motion.ul
                    className="space-y-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
                  >
                    {participationStyles.map((item) => (
                      <motion.li
                        key={item}
                        className="flex items-start gap-2"
                        variants={listItem}
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              transition={{ delay: 0.15 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">参加するメリット</h3>
                  <motion.ul
                    className="space-y-3"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.45 }}
                  >
                    {benefits.map((item) => (
                      <motion.li
                        key={item}
                        className="flex items-start gap-2"
                        variants={listItem}
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button asChild size="lg">
              <SmoothLink href="#contact">Discordで参加する</SmoothLink>
            </Button>
            <motion.p
              className="text-sm text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              ※ いつでも参加できます
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
