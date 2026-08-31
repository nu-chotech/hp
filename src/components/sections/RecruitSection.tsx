"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { externalLinks, socialLinks } from "@/config/site";
import { recruitContent } from "@/content/recruit";
import { reveal, spring } from "@/lib/motion-variants";

export function RecruitSection() {
  return (
    <Section id="recruit">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title={recruitContent.title}
          description={recruitContent.description}
        />

        {/* Discord 参加カード。カード全体がひとつのリンク */}
        <motion.div
          className="mb-8"
          {...reveal("cardIn", { delay: 0.08 })}
          whileHover={{ y: -4, transition: spring.snappy }}
          whileTap={{ scale: 0.99, transition: spring.snappy }}
        >
          {/* bg は Discord のブランドカラー (#5865F2) */}
          <Card className="bg-[#5865F2] text-white transition-shadow hover:shadow-lg">
            <CardContent className="p-8">
              <Link
                href={externalLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4"
              >
                <FaDiscord className="w-8 h-8" aria-hidden="true" />
                <div className="flex-1 text-left">
                  <p className="font-bold">{recruitContent.discord.title}</p>
                  <p className="text-sm text-white/80">
                    {recruitContent.discord.description}
                  </p>
                </div>
                {/* リンクの中にボタン要素は置けないので、見た目だけボタンにする */}
                <span
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  {recruitContent.discord.cta}
                </span>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* SNS リンク */}
        <motion.p
          className="text-sm text-muted-foreground mb-4 text-center"
          {...reveal("fadeIn", { delay: 0.14 })}
        >
          {recruitContent.socialLead}
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-4"
          {...reveal("riseIn", { delay: 0.18 })}
        >
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.label}
              {...reveal("popIn", { delay: 0.22 + index * 0.04 })}
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
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
