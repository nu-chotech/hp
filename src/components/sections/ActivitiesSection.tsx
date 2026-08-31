"use client";

import { motion } from "motion/react";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activitiesContent } from "@/content/activities";
import {
  defaultViewport,
  fadeInUp,
  reveal,
  staggerContainer,
} from "@/lib/motion-variants";

export function ActivitiesSection() {
  return (
    <Section id="activities">
      <SectionHeader
        title={activitiesContent.title}
        description={activitiesContent.description}
      />

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        {activitiesContent.activities.map((activity, index) => (
          <motion.div key={activity.title} variants={fadeInUp}>
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <motion.div
                    {...reveal("popIn", { delay: 0.1 + index * 0.05 })}
                  >
                    <activity.icon
                      className="w-8 h-8 text-primary"
                      aria-hidden="true"
                    />
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
                      {...reveal("scaleIn", {
                        delay: 0.18 + featureIndex * 0.04,
                      })}
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
    </Section>
  );
}
