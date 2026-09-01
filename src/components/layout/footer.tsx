import { Brand } from "@/components/layout/brand";
import { Container } from "@/components/ui/container";
import { Rule } from "@/components/ui/rule";
import { TextLink } from "@/components/ui/text-link";
import { navLinks, sectionHref, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Footer（§6.18）
 *
 * 上辺の 2px 罫だけが full-bleed で、中身は container に乗る（§3.6）。
 * 最終区画なので上下は section より静かで帯より広い footer/pad-y（40 / 32）。
 *
 * Mobile は Brand / リンク / © の 3 行を stack/lg 24 で積み、Desktop は
 * Brand ← auto → リンク → 24 → © の 1 行にする。行が変わるだけで、
 * 読み上げ順（= DOM 順）はどちらも同じ。
 *
 * Nav が JS を要求する Mobile でも、同じ 4 本のリンクはここに素の <a> として在る。
 */
export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-ground", className)}>
      <Rule />
      <Container
        className={cn(
          "flex flex-col gap-stack-lg py-footer-pad-y",
          "desktop:flex-row desktop:items-center desktop:gap-inline-lg",
        )}
      >
        <Brand size="footer" className="desktop:me-auto" />

        <nav aria-label="フッター">
          <ul className="flex flex-wrap items-center gap-inline-lg">
            {navLinks.map((link) => (
              <li key={link.id}>
                <TextLink variant="footer" href={sectionHref(link.id)}>
                  {link.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* 見出しでも段落でもない添え書き。12px の ink-secondary（5.83） */}
        <p className="text-caption text-ink-secondary">
          {siteConfig.copyright}
        </p>
      </Container>
    </footer>
  );
}
