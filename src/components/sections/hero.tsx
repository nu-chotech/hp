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
 * (1) 内容を垂直中央に置く min-height を持ち、(2) Container の外側に背景写真を敷くため。
 * 面の配色と data-surface の語彙は Section と同じ sectionVariants を引く。
 *
 * 縦リズムは §3.9 の Hero 行: 上 section/pad-display 96 (M 64)、下 section/pad-bottom 80 (M 64)。
 * 上罫線は持たない — 色面の切り替えそのものが境界になる。
 */

/**
 * 背景写真の動き（DECISION U-20）
 *
 * 動きの既定を詳細度 0（`:where`）で置くのはマーキーと同じ理由 — 止める側
 * （globals.css の低減設定）に必ず負けるため。
 * 停止の規則をここで再宣言しないのも同じで、再生の条件が 2 か所に散ると必ず食い違う。
 *
 * 動かすのは `translate` だけ。`scale` は静的な余白（移動しても縁が出ないための
 * 1.12）であってアニメーションではないので、M6「compositor プロパティのみ」にも
 * DECISION M-6 の `scale()` 禁止（押下フィードバックの規定）にも触れない。
 * 個別プロパティで書けば、静的な拡大と動く移動が 1 つの transform を奪い合わない。
 */
const BACKDROP_KEYFRAMES = `
@keyframes chotech-hero-backdrop{
from{translate:calc(var(--hero-backdrop-drift) * -1) calc(var(--hero-backdrop-drift) * -0.5)}
to{translate:var(--hero-backdrop-drift) calc(var(--hero-backdrop-drift) * 0.5)}
}
:where(.hero__backdrop){
scale:var(--hero-backdrop-scale);
animation:chotech-hero-backdrop var(--hero-backdrop-period) ease-in-out infinite alternate
}`;

export function Hero() {
  const { backdrop, headline, lead, body, actions } = heroContent;

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
      {/*
       * 背景写真（DECISION U-20）。ink 面を置き換えず、その上に低い不透明度で重ねる。
       * 「コミュニティの実像」という情報を運ぶ層なので M9「装飾のためだけの動きは
       * 足さない」の例外にあたるが、動き自体は M8 のスイッチ 1 つで止まる。
       *
       * overflow-hidden は移動する画像の受け皿で、これが無いと拡大したぶんが Hero の外へ
       * こぼれる。格子線（旧 K-12）は置かない — 写真の上に線が乗ると写真の一部に見える（U-22）。
       */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* `style` は precedence 付きで <head> へ巻き上げる（React 19） */}
        <style href="hero-backdrop" precedence="components">
          {BACKDROP_KEYFRAMES}
        </style>
        {/* biome-ignore lint/performance/noImgElement: 実素材が確定するまで next/image は入れない（ImageSlot と同じ方針）。この層は素材待ちの「枠」ではなく面の一部なので ImageSlot は使わない — 未読込時に placeholder の明るい地 #eae7e7 が Hero 全面で光る */}
        <img
          src={backdrop.src}
          alt=""
          // ファーストビューの地。遅れて入ると「後から暗くなる」ように見える
          fetchPriority="high"
          decoding="async"
          className={cn(
            "hero__backdrop absolute inset-0 size-full object-cover",
            // 色はそのまま（U-21）。不透明度だけで ink 面に沈める
            "opacity-(--hero-backdrop-opacity)",
          )}
        />
      </div>

      <HeroReveal>
        {/* relative: 絶対配置の背景写真より前に描く */}
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
