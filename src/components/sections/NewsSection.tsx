"use client";

import { ArrowRight, Calendar } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  {
    id: "4",
    title: "年末LT大会の参加者募集中",
    publishedAt: "2024-11-28",
    category: { id: "event", name: "イベント" },
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

function getCategoryColor(categoryId: string) {
  switch (categoryId) {
    case "event":
      return "bg-primary/10 text-primary hover:bg-primary/20";
    case "info":
      return "bg-accent/10 text-accent-foreground hover:bg-accent/20";
    case "report":
      return "bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20";
    default:
      return "bg-muted text-muted-foreground hover:bg-muted/80";
  }
}

export function NewsSection() {
  return (
    <section id="news" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
              News
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              お知らせ
            </h2>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/news" className="flex items-center gap-2">
              すべて見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>

        {/* News List */}
        <div className="space-y-4">
          {sampleNews.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/news/${news.id}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300"
              >
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={news.publishedAt}>
                    {formatDate(news.publishedAt)}
                  </time>
                </div>

                {/* Category Badge */}
                <Badge
                  variant="secondary"
                  className={`w-fit ${getCategoryColor(news.category.id)}`}
                >
                  {news.category.name}
                </Badge>

                {/* Title */}
                <h3 className="flex-1 font-medium group-hover:text-primary transition-colors line-clamp-1">
                  {news.title}
                </h3>

                {/* Arrow */}
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
