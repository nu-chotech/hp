import { Github, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: "#about", label: "私たちについて" },
  { href: "#activities", label: "活動内容" },
  { href: "#news", label: "お知らせ" },
  { href: "#members", label: "運営メンバー" },
  { href: "#recruit", label: "参加する" },
];

const socialLinks = [
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://github.com", label: "GitHub", icon: Github },
];

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/icon.png"
                alt="ChoTech"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-bold text-lg">ChoTech</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              学生エンジニアが集まり、技術を学び、共に成長するコミュニティです。
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">ナビゲーション</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ChoTech</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
