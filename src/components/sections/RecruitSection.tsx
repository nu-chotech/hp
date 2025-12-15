"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { externalLinks, socialLinks } from "@/config/site";
import { defaultViewport, fadeInUp, listItem } from "@/lib/motion-variants";

// Discord公式カラー
const discordColor = "#5865F2";

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

          {/* Discord参加カード */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <Card
              className="text-white"
              style={{ backgroundColor: discordColor }}
            >
              <CardContent className="p-8">
                <Link
                  href={externalLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <FaDiscord className="w-8 h-8" />
                  <div className="flex-1 text-left">
                    <p className="font-bold">Discord</p>
                    <p className="text-sm text-white/80">
                      コミュニティに参加して交流
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    参加する
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* SNSリンク */}
          <motion.p
            className="text-sm text-muted-foreground mb-4 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            SNSでも情報発信中
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
