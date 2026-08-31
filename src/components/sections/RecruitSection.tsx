"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { externalLinks, socialLinks } from "@/config/site";
import { spring } from "@/lib/motion-variants";

// Discord公式カラー
const discordColor = "#5865F2";

export function RecruitSection() {
  return (
    <section id="recruit" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="コミュニティに参加する"
            description="一緒にChoTechで活動しませんか？"
          />

          {/* Discord参加カード */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...spring.default, delay: 0.08 }}
            whileHover={{ y: -4, transition: spring.snappy }}
            whileTap={{ scale: 0.99, transition: spring.snappy }}
            className="mb-8"
          >
            <Card
              className="text-white transition-shadow hover:shadow-lg"
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
            transition={{ duration: 0.3, delay: 0.14 }}
          >
            SNSでも情報発信中
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring.default, delay: 0.18 }}
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...spring.momentum, delay: 0.22 + index * 0.04 }}
                // rotate は何も予告しないので外した。動きは行き先を示すためにある
                whileHover={{ scale: 1.12, transition: spring.snappy }}
                whileTap={{ scale: 0.94, transition: spring.snappy }}
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
