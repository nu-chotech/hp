import { Code2, ExternalLink, Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  navigation: [
    { href: "#about", label: "About" },
    { href: "#activities", label: "Activities" },
    { href: "#news", label: "News" },
    { href: "#members", label: "Members" },
    { href: "#recruit", label: "Join Us" },
  ],
  social: [
    { href: "https://twitter.com", label: "Twitter", icon: Twitter },
    { href: "https://github.com", label: "GitHub", icon: Github },
    { href: "mailto:contact@example.com", label: "Email", icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Tech<span className="text-primary">Community</span>
              </span>
            </Link>
            <p className="text-background/70 max-w-md leading-relaxed">
              学生エンジニアが集まり、技術を学び、共に成長するコミュニティです。
              Web開発、AI/ML、モバイルアプリなど様々な分野で活動しています。
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background/50">
              Navigation
            </h3>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-background/50">
              Connect
            </h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-background/70 hover:text-background transition-colors group"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>
            © {new Date().getFullYear()} TechCommunity. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-background transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-background transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
