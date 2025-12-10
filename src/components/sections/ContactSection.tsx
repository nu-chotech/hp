"use client";

import {
  ExternalLink,
  Github,
  Mail,
  MessageSquare,
  Twitter,
} from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const contactMethods = [
  {
    icon: Mail,
    label: "メール",
    value: "contact@example.com",
    href: "mailto:contact@example.com",
    description: "お問い合わせ・ご質問はこちら",
  },
  {
    icon: MessageSquare,
    label: "Discord",
    value: "Join our server",
    href: "https://discord.gg/example",
    description: "コミュニティに参加して交流",
  },
];

const socialLinks = [
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com/example",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/example",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              お問い合わせ
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              ご質問やお問い合わせがありましたら、お気軽にご連絡ください。
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="group h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 lg:p-8">
                      <div className="flex items-start gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <method.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{method.label}</h3>
                            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-primary font-medium mb-1">
                            {method.value}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-4">SNSでも情報を発信中</p>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  asChild
                  variant="outline"
                  size="icon"
                  className="rounded-full w-12 h-12 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
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
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
