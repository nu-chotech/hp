"use client";

import { Code, Mic, Users } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  {
    icon: Mic,
    title: "Talk Day",
    subtitle: "ライトニングトーク・アイデアプレゼン",
    badge: "月1〜2回",
    description:
      "1人5分程度の短い発表で、最近学んだことや作ったもの、技術Tipsなどを共有。発表経験がなくてもOK、聞くだけ参加も大歓迎。",
    features: ["プレゼン練習", "知識の共有", "新しい発見"],
  },
  {
    icon: Code,
    title: "Dev Day",
    subtitle: "技術勉強会・ハンズオン",
    badge: "月1〜2回",
    description:
      "みんなで手を動かしながら学ぶ勉強会。Webアプリ開発、Git入門など、知識ゼロでも「一緒にやってみよう」という気持ちで参加可能。",
    features: ["実践的な学び", "参加型学習", "初心者歓迎"],
  },
  {
    icon: Users,
    title: "プロジェクト活動",
    subtitle: "ハッカソン・共同開発・成果発表",
    badge: "随時",
    description:
      "外部ハッカソンへのチーム参加や、学内での課題解決プロジェクト。学期末の成果発表会で作品を発表する機会も。",
    features: ["チーム開発", "実績作り", "ポートフォリオ"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

export function ActivitiesSection() {
  return (
    <section id="activities" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-4">活動内容</h2>
          <p className="text-muted-foreground">
            3つの柱で「学ぶ・作る・話す」を実践しています。
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="flex flex-col h-full transition-shadow hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.3 + index * 0.1,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <activity.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <Badge variant="secondary">{activity.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {activity.subtitle}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4">
                    {activity.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {activity.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + featureIndex * 0.1 }}
                      >
                        <Badge variant="outline">{feature}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
