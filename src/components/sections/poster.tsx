import { ArrowUpRight, BrandDiscord, brandIcons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { sectionVariants } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { sectionIds, socialLinks } from "@/config/site";
import { posterContent } from "@/content/poster";
import { externalLinkNote, externalLinkProps } from "@/lib/external-link";
import { cn } from "@/lib/utils";

/**
 * Section / Poster CTA（§6.17）
 *
 * クロージング。面はインク（C-30 — green-400 の面に墨の文字を載せると読みにくい、という
 * クライアント所見で 2026-09-12 に明るい緑面から戻した）。アクセントは見出し
 * 「Hack Your Limits.」（poster/display = green-400、ink 上 6.54）と、参加 CTA の緑の
 * ボタン（accent-fill = green-600 + 白、4.62）で現れる。Hero と同じ面で開幕と終幕が対になる。
 *
 * 上端の 2px 罫（旧 C-27）は持たない — 面が地に対して 14.86 で、境界は色面の切り替えそのもの。
 * Section 部品ではなく素の <section> で組むのは Hero と同じ理由（sectionVariants の poster を引く）。
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
      <Container className="py-section-pad-display">
        {/* キッカーは見出しにしない（§8.5） */}
        <p className="text-overline text-poster-ink-secondary" data-reveal>
          {posterContent.kicker}
        </p>

        {/* 2 行は著者改行。balance に任せると Figma と改行位置がずれる。
            色は poster/display（green-400）— インク面の上でアクセントを担うのはこの見出し */}
        <h2
          id={headingId}
          className="mt-stack-md whitespace-pre-line text-wrap text-display-l text-poster-display"
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

        {/* ボタン ↔ ソーシャルも、ソーシャル同士も inline/lg 24。Mobile はボタンが 1 行を占めて折り返す */}
        <div
          className="mt-stack-xl flex flex-wrap items-center gap-x-inline-lg gap-y-stack-md"
          data-reveal
        >
          {/* 行き先が Discord であることは矢印ではなくマークが言う（U-19） */}
          <Button
            surface="poster"
            variant="solid"
            asChild
            brand={BrandDiscord}
            icon={ArrowUpRight}
          >
            <a href={posterContent.action.href} {...externalLinkProps}>
              {posterContent.action.label}
              <span className="sr-only">{externalLinkNote}</span>
            </a>
          </Button>

          {/* Tailwind preflight の list-style: none で Safari はリスト性を落とす。
              「3 件のまとまり」という境界と件数を読み上げに残すため role を書き戻す。
              lint が言う「暗黙だから冗長」は、まさにその暗黙が消える環境の話 */}
          {/* biome-ignore lint/a11y/noRedundantRoles: preflight の list-style: none で Safari が暗黙の list ロールを外すため明示が要る */}
          {/* biome-ignore lint/a11y/useSemanticElements: 既に ul。意味づけを戻しているだけで置換先の要素は無い */}
          <ul role="list" className="flex flex-wrap items-center gap-inline-lg">
            {socialLinks.map((link) => {
              const Brand = brandIcons[link.brand];
              return (
                <li key={link.brand}>
                  {/* マークだけ（DECISION U-28）。行き先はマークが言い切るので文字も矢印も
                      置かず、名前は visually-hidden に残す（§8.6）。可視 20 を ::before で
                      44 角に広げる（§6.1.5）— 間隔 inline/lg 24 なので隣の判定と重ならない */}
                  <TextLink
                    variant="social"
                    href={link.href}
                    className="before:-inset-x-3"
                    {...externalLinkProps}
                  >
                    <Brand className="size-icon-md" />
                    <span className="sr-only">
                      {link.label}
                      {externalLinkNote}
                    </span>
                  </TextLink>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
