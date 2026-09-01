import { ArrowUpRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Rule } from "@/components/ui/rule";
import { sectionVariants } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { sectionIds, socialLinks } from "@/config/site";
import { posterContent } from "@/content/poster";
import { cn } from "@/lib/utils";

/**
 * Section / Poster CTA（§6.17）
 *
 * ページで唯一の「色面」。Lime モードではこの面は **明るい面** に反転するので、文字は
 * inverse/*（グラウンド × α）ではなく poster/*（インク × α）で組み、CTA はインクの塗り。
 * アウトラインボタンは 1.53 で読めないので置かない（§1.4.4）。
 *
 * Section 部品ではなく素の <section> で組むのは、上端の 2px 罫を絶対配置にする必要があるため
 * （高さに影響させない）。面の配色と data-surface の語彙は Section と同じ sectionVariants を引く。
 */
export function Poster() {
  const headingId = `${sectionIds.join}-heading`;

  return (
    <section
      id={sectionIds.join}
      aria-labelledby={headingId}
      data-surface="poster"
      className={cn(sectionVariants({ surface: "poster" }), "relative")}
    >
      {/* Lime では地との輝度差が 1.37（色相だけの境界）になるので、上端に 2px の
          poster/ink 罫を引いて境界を作る（DECISION C-27）。
          tone=current で面の文字色を継ぐ = Mono に反転しても poster/ink のまま */}
      <Rule tone="current" className="absolute inset-x-0 top-0" />

      <Container className="py-section-pad-display">
        {/* キッカーは見出しにしない（§8.5） */}
        <p className="text-overline text-poster-ink-secondary" data-reveal>
          {posterContent.kicker}
        </p>

        {/* 2 行は著者改行。balance に任せると Figma と改行位置がずれる */}
        <h2
          id={headingId}
          className="mt-stack-md whitespace-pre-line text-wrap text-display-l"
          data-reveal
        >
          {posterContent.display}
        </h2>

        <p
          className="mt-stack-lg max-w-measure text-body-m text-poster-ink-secondary"
          data-reveal
        >
          {posterContent.paragraph}
        </p>

        {/* ボタン ↔ ソーシャルは inline/lg 24。Mobile はボタンが 1 行を占めて折り返す */}
        <div
          className="mt-stack-xl flex flex-wrap items-center gap-x-inline-lg gap-y-stack-md"
          data-reveal
        >
          <Button surface="poster" variant="solid" asChild icon={ArrowUpRight}>
            <a href={posterContent.action.href}>
              {posterContent.action.label}
              <span className="sr-only">（外部）</span>
            </a>
          </Button>

          {/* Tailwind preflight の list-style: none で Safari はリスト性を落とす。
              「3 件のまとまり」という境界と件数を読み上げに残すため role を書き戻す。
              lint が言う「暗黙だから冗長」は、まさにその暗黙が消える環境の話 */}
          {/* biome-ignore lint/a11y/noRedundantRoles: preflight の list-style: none で Safari が暗黙の list ロールを外すため明示が要る */}
          {/* biome-ignore lint/a11y/useSemanticElements: 既に ul。意味づけを戻しているだけで置換先の要素は無い */}
          <ul role="list" className="flex flex-wrap items-center gap-inline-md">
            {socialLinks.map((link) => (
              <li key={link.brand}>
                {/* 表示は CSS で大文字化し、DOM は正書法のまま（§6.3.2） */}
                <TextLink variant="social" href={link.href} external>
                  {link.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
