import { ArrowUpRight, BrandDiscord } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { sectionVariants } from "@/components/ui/section";
import { sectionIds } from "@/config/site";
import { heroContent } from "@/content/hero";
import { cn } from "@/lib/utils";
import { MetaStrip } from "./hero/meta-strip";
import { HeroReveal, RotatingWord } from "./hero/rotating-word";

/**
 * Section / Hero（§6.8.1）
 *
 * ページ上端のインク面。Section 部品ではなく素の <section> で組むのは、Hero だけが
 * (1) 内容を垂直中央に置く min-height を持ち、(2) Container の外側に格子線を敷くため。
 * 面の配色と data-surface の語彙は Section と同じ sectionVariants を引く。
 *
 * 縦リズムは §3.9 の Hero 行: 上 section/pad-display 96 (M 64)、下 section/pad-bottom 80 (M 64)。
 * 上罫線は持たない — 色面の切り替えそのものが境界になる。
 */

/**
 * 格子線（DECISION K-12）: container ではなく **viewport** を 4 等分する位置に立てる。
 * 4 本目は右端なので自身の 1px ぶん内側に置く。
 */
const GRID_LINES = ["left-1/4", "left-1/2", "left-3/4", "right-0"] as const;

export function Hero() {
  const { headline, lead, body, actions } = heroContent;

  return (
    <section
      /* Nav / Footer の brand lockup がここへ戻る（§6.6）。
         §3.9 の scroll-margin-top: var(--size-nav) も id が無ければ働かない */
      id={sectionIds.hero}
      data-surface="ink"
      className={cn(
        sectionVariants({ surface: "ink" }),
        "relative flex flex-col justify-center",
        // nav を除いた初期 viewport をちょうど満たし、縦長モニタでは 960 で止める（DECISION L-7）。
        // min() の合成に対応するユーティリティは無いのでトークンを直接参照する
        "min-h-[min(100svh_-_var(--size-nav),var(--size-hero-max))]",
      )}
    >
      {/* 比 1.18 の地のテクスチャ。構造ではないので読み上げから外す */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {GRID_LINES.map((position) => (
          <div
            key={position}
            className={cn(
              "absolute inset-y-0 w-hair bg-inverse-hairline",
              position,
            )}
          />
        ))}
      </div>

      <HeroReveal>
        {/* relative: 位置指定された格子線より後ろに描かれないようにする */}
        <Container className="relative flex flex-col gap-stack-xl pt-section-pad-display pb-section-pad-bottom">
          <MetaStrip />

          {/*
           * 可視部分は装飾で、名前は visually-hidden の全文が持つ（§6.1.7）。aria-live は使わない。
           * 白の導入句 × アクセントの動詞で対比を作る。回転語に下線は無い（DECISION U-3）。
           * 折返しは著者の意図（Mobile は読点で 2 行）に任せるので balance は解除する。
           */}
          <h1
            className="text-wrap text-display-xl"
            data-reveal
            data-reveal-index="1"
          >
            <span className="sr-only">{headline.accessibleName}</span>
            <span aria-hidden="true">
              {headline.leadIn}
              <RotatingWord />
            </span>
          </h1>

          {/* リード → 段落だけは stack/xs 8 で締める（DECISION L-6） */}
          <div
            className="flex flex-col gap-stack-xs"
            data-reveal
            data-reveal-index="3"
          >
            {/* Display 124 と本文 16 の間の中間階層（DECISION U-5） */}
            <p className="text-title-1 text-inverse-ink">{lead}</p>
            {/* mt-0: 縦リズムは gap が持つので @layer base の p + p 12 を打ち消す。
                whitespace-pre-line: content 側の著者改行をそのまま行に落とす */}
            <p className="mt-0 max-w-measure whitespace-pre-line text-body-l text-inverse-ink-secondary">
              {body}
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-inline-sm"
            data-reveal
            data-reveal-index="4"
          >
            {/* 主 = 外部の Discord。矢印と visually-hidden の「（外部）」を添え、
                target="_blank" は使わない（DECISION M-15） */}
            <Button
              surface="ink"
              variant="solid"
              asChild
              brand={BrandDiscord}
              icon={ArrowUpRight}
            >
              <a href={actions.primary.href}>
                {actions.primary.label}
                <span className="sr-only">（外部）</span>
              </a>
            </Button>
            {/* 副 = ページ内スクロール。移動先が同じページなのでアイコンは付けない（§6.1.9） */}
            <Button surface="ink" variant="outline" asChild>
              <a href={actions.secondary.href}>{actions.secondary.label}</a>
            </Button>
          </div>
        </Container>
      </HeroReveal>
    </section>
  );
}
