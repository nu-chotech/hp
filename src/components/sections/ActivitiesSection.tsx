"use client";

import {
  ArrowUpRight,
  Brain,
  Gamepad2,
  Globe,
  GraduationCap,
  Server,
  Smartphone,
} from "lucide-react";
import * as motion from "motion/react-client";

import { Card, CardContent } from "@/components/ui/card";

const activities = [
  {
    icon: Globe,
    title: "Web開発",
    description:
      "React, Next.js, Vue等のモダンなフレームワークを使ったWebアプリケーション開発",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "AI / 機械学習",
    description:
      "Python, TensorFlow, PyTorchを使った機械学習モデルの構築と実験",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Smartphone,
    title: "モバイルアプリ",
    description:
      "Flutter, React Native, SwiftUIを使ったクロスプラットフォームアプリ開発",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Server,
    title: "インフラ / DevOps",
    description:
      "AWS, GCP, Docker, Kubernetesを使ったクラウドインフラの構築と運用",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Gamepad2,
    title: "ゲーム開発",
    description:
      "Unity, Unreal Engineを使ったゲーム開発やVR/ARコンテンツの制作",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: GraduationCap,
    title: "技術教育",
    description: "プログラミング初心者向けの勉強会やワークショップの企画・運営",
    color: "from-teal-500 to-cyan-500",
  },
];

export function ActivitiesSection() {
  return (
    <section id="activities" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
            Activities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            活動内容
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            様々な技術分野で活動しています。興味のある分野から参加できます。
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group relative h-full overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer">
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${activity.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <CardContent className="p-6 lg:p-8">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${activity.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <activity.icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {activity.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
