"use client";

import { Code, Lightbulb, Rocket, Users } from "lucide-react";
import * as motion from "motion/react-client";

const features = [
  {
    icon: Code,
    title: "技術を学ぶ",
    description:
      "最新のWeb技術、AI/ML、モバイル開発など、実践的なスキルを身につけます。",
  },
  {
    icon: Users,
    title: "仲間と成長",
    description:
      "同じ志を持つ仲間と切磋琢磨し、チーム開発を通じてコミュニケーション力も向上。",
  },
  {
    icon: Lightbulb,
    title: "アイデアを形に",
    description:
      "ハッカソンやプロジェクトを通じて、アイデアを実際のプロダクトとして形にします。",
  },
  {
    icon: Rocket,
    title: "社会に貢献",
    description:
      "地域課題の解決やオープンソース活動を通じて、社会にインパクトを与えます。",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-secondary/30">
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
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            私たちについて
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            学生エンジニアコミュニティは、テクノロジーを通じて社会に貢献することを目指す学生の集まりです。
            培った技術力とチームワークで、様々なプロジェクトに挑戦しています。
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-6 lg:p-8 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
