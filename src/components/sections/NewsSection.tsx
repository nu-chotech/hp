"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  defaultViewport,
  fadeInLeft,
  sectionHeaderTransition,
  staggerContainer,
} from "@/lib/motion-variants";

// サンプルデータ（後でMicroCMSから取得）
const sampleNews = [
  {
    id: "1",
    title: "ハッカソンで優勝しました！",
    publishedAt: "2024-12-08",
    category: { id: "event", name: "イベント" },
  },
  {
    id: "2",
    title: "新メンバー向けオリエンテーションを開催",
    publishedAt: "2024-12-05",
    category: { id: "info", name: "お知らせ" },
  },
  {
    id: "3",
    title: "Webアプリ開発勉強会 Vol.5 レポート",
    publishedAt: "2024-12-01",
    category: { id: "report", name: "活動報告" },
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsSection() {
  return (
    <section id="news" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex items-end justify-between gap-4 mb-8"
          {...sectionHeaderTransition}
        >
          <div>
            <h2 className="text-3xl font-bold">お知らせ</h2>
          </div>
          <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <Button asChild variant="ghost" size="sm">
              <Link href="/news" className="flex items-center gap-1">
                すべて見る
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {sampleNews.map((news) => (
            <motion.div
              key={news.id}
              variants={fadeInLeft}
              whileHover={{
                x: 8,
                transition: { duration: 0.2 },
              }}
            >
              <Link
                href={`/news/${news.id}`}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-lg border bg-card hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={news.publishedAt}>
                    {formatDate(news.publishedAt)}
                  </time>
                </div>
                <Badge variant="secondary">{news.category.name}</Badge>
                <span className="flex-1">{news.title}</span>
                <motion.div
                  className="hidden sm:block"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
