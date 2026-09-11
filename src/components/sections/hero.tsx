import Image from "next/image";
import { ArrowUpRight, BrandDiscord } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { sectionVariants } from "@/components/ui/section";
import { sectionIds } from "@/config/site";
import { heroContent } from "@/content/hero";
import { externalLinkNote, externalLinkProps } from "@/lib/external-link";
import { cn } from "@/lib/utils";
import { HeroReveal } from "./hero/hero-reveal";

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
        // nav と Marquee 帯を除いた初期 viewport をちょうど満たす — ファーストビューの
        // 下端にパートナーの帯が乗る（DECISION L-33、L-7 改）。縦長モニタでは 960 で止める。
        // min() の合成に対応するユーティリティは無いのでトークンを直接参照する
        "min-h-[min(100svh_-_var(--size-nav)_-_var(--size-band-marquee),var(--size-hero-max))]",
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
        {/* ImageSlot は使わない — この層は素材待ちの「枠」ではなく面の一部で、未読込時に
            placeholder の明るい地 #eae7e7 が Hero 全面で光る。next/image を直接置く（U-45）。
            priority: ファーストビューの地。遅れて入ると「後から暗くなる」ように見える。
            sizes 100vw: 全幅の背景なので viewport 幅の候補を選ぶ */}
        <Image
          alt=""
          className={cn(
            "hero__backdrop object-cover",
            // 色はそのまま（U-21）。不透明度だけで ink 面に沈める
            "opacity-(--hero-backdrop-opacity)",
          )}
          fill
          priority
          sizes="100vw"
          src={backdrop.src}
        />
      </div>

      <HeroReveal>
        {/* relative: 絶対配置の背景写真より前に描く */}
        <Container className="relative flex flex-col gap-stack-xl pt-section-pad-display pb-section-pad-bottom">
          {/*
           * タグラインを Display/XL で言い切る（DECISION U-37）。名前は可視の文そのもの。
           * 文は**墨のボックス**に載せる（DECISION U-39）: 写真が透ける面の上で、実色の
           * inverse/ground を敷いた板だけが「印刷された」ように一段沈み、文字の輪郭が
           * 写真の明部に食われない。
           *
           * ボックスは inline-block。inline のまま背景を塗ると、この書体の content area
           * （≈ 1.6em）が行送り 1.11 を大きく超えて、板が上下に 30px ずつはみ出し lead に
           * 触れる。inline-block なら板の高さ = 行ボックス + padding で決まる。Mobile の
           * "Hack Your" / "Limits." は 1 枚の板の中で 2 行に折れる。
           * 余白は字の 0.2em / 0.1em — 固定 px にしないのは、板の厚みが級数に比例して
           * 初めて「文字の一部」に見えるため。左右の 0.2em ぶんは負のマージンで
           * container の外へ吊るし、**文字の左端**を lead・段落・ボタンと揃える（L-19 の
           * フラッシュレフトは板ではなく字で守る）。
           * 色の強調は句点の「.」だけ（hero/word）。balance は解除（"Hack" / "Your Limits."
           * に寄ってしまう）。
           */}
          <h1
            className="text-wrap text-display-xl text-inverse-ink"
            data-reveal
            data-reveal-index="0"
            lang="en"
          >
            <span className="-mx-[0.2em] inline-block bg-inverse-ground px-[0.2em] py-[0.1em]">
              {headline.text}
              <span className="text-hero-word">{headline.period}</span>
            </span>
          </h1>

          {/* リード → 段落だけは stack/xs 8 で締める（DECISION L-6） */}
          <div
            className="flex flex-col gap-stack-xs"
            data-reveal
            data-reveal-index="1"
          >
            {/* Display 124 と本文 16 の間の中間階層（DECISION U-5）。
                Mobile で 2 行に折れるので balance（見出し扱い、§2.6.4）。文節で折るのは
                @layer base の p が持つ（U-48: balance 無しでは「ハ / ブを。」で折れた） */}
            <p className="text-balance text-title-1 text-inverse-ink">{lead}</p>
            {/* mt-0: 縦リズムは gap が持つので @layer base の p + p 12 を打ち消す。
                whitespace-pre-line: content 側の著者改行をそのまま行に落とす */}
            <p className="mt-0 max-w-measure whitespace-pre-line text-body-l text-inverse-ink-secondary">
              {body}
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-inline-sm"
            data-reveal
            data-reveal-index="2"
          >
            {/* 主 = 外部の Discord。緑の面（accent-fill）+ 白のラベル — 参加の動線だけが
                緑を面で持つ（C-30）。矢印と visually-hidden の注記を添え、新しいタブで開く（M-21） */}
            <Button
              surface="ink"
              variant="accent"
              asChild
              brand={BrandDiscord}
              icon={ArrowUpRight}
            >
              <a href={actions.primary.href} {...externalLinkProps}>
                {actions.primary.label}
                <span className="sr-only">{externalLinkNote}</span>
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
