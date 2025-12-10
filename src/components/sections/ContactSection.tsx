"use client";

import { Github, Instagram, MessageSquare, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-muted-foreground mb-8">
            ご質問やご相談はDiscordでお気軽にどうぞ。
          </p>

          <Card className="mb-8">
            <CardContent className="p-6">
              <Link
                href="https://discord.gg/example"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3"
              >
                <MessageSquare className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <p className="font-semibold">Discord</p>
                  <p className="text-sm text-muted-foreground">
                    コミュニティに参加して交流
                  </p>
                </div>
              </Link>
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground mb-4">
            SNSでも情報発信中
          </p>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <Button
                key={social.label}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
