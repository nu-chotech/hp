"use client";

import { motion } from "motion/react";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { aboutContent } from "@/content/about";
import {
  defaultViewport,
  fadeInUp,
  staggerContainer,
} from "@/lib/motion-variants";

export function AboutSection() {
  return (
    <Section id="about" tone="muted">
      <SectionHeader
        title={aboutContent.title}
        description={aboutContent.description}
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={staggerContainer(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        {aboutContent.features.map((feature) => (
          <motion.div key={feature.title} variants={fadeInUp}>
            <Card className="h-full">
              <CardContent className="p-6">
                <feature.icon
                  className="w-8 h-8 mb-4 text-primary"
                  aria-hidden="true"
                />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
