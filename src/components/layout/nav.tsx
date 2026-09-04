import { ArrowUpRight, BrandDiscord } from "@/components/icons";
import { Brand } from "@/components/layout/brand";
import { NavBar } from "@/components/layout/nav-bar";
import { Button } from "@/components/ui/button";
import { externalLinks } from "@/config/site";

/**
 * Nav bar（§6.7）
 *
 * 帯そのものは full-bleed で、中身だけが viewport inset 24 に乗る（DECISION L-23）。
 * sticky は「今どこか」を常に答えるための装置なので、スクロール中に縮む・隠れる・
 * 影を落とすことはしない（M-7）。境界は 2px 罫 1 本で足りる。
 *
 * 高さは 62 = `size/nav` に固定する。上下 padding から積み上げると、tablet と
 * desktop で `nav/pad-y` と CTA の段（44 / 36）が別々に切り替わる中間帯で 62 を
 * 割ってしまい、section の `scroll-margin-top: var(--size-nav)` とずれる。
 *
 * この層はサーバ。状態を持たない Brand と CTA をここで描き、対話部分
 * （メニュー開閉・aria-current・アンカー移動後のフォーカス）だけを NavBar に渡す。
 * こうしないと next/image と Button が丸ごとクライアントチャンクに乗る。
 */

export interface NavProps {
  /**
   * CTA の文言と行き先。§6.7.1 が指定する既定は「参加する」→ Discord。
   * content 層に Nav 用のエントリが無いので、既定値をここに置いて上書き可能にする。
   */
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function Nav({
  ctaLabel = "参加する",
  ctaHref = externalLinks.discord,
  className,
}: NavProps) {
  // 外部へ出るリンクなので、矢印（ArrowUpRight）だけでなく読み上げにも言う（§8.6）。
  // 先頭の Discord マークは行き先を読む前に伝える（U-19、Nav にも置く: DECISION U-27）
  const label = (
    <>
      {ctaLabel}
      <span className="sr-only">（外部）</span>
    </>
  );

  return (
    <NavBar
      className={className}
      brand={<Brand size="nav" className="me-auto" />}
      cta={
        <>
          {/* CTA は Mobile 44 / 横並び以降 36（§6.7.1・§6.7.2）。
              サイズはトークンの段そのものなので、responsive class ではなく
              2 つの箱を出し分ける。hidden 側はフォーカス順にも乗らない。
              Mobile は末尾の矢印を持たない（§6.7.2 の検算: 390 で brand 139 + CTA 155 +
              12 + menu 44 = 350 > 342 となり wordmark が折れる。マークが行き先を言うので
              矢印を落として 127 に収める。「（外部）」は読み上げに残る） */}
          <Button
            asChild
            size="md"
            brand={BrandDiscord}
            className="tablet:hidden"
          >
            <a href={ctaHref}>{label}</a>
          </Button>
          <Button
            asChild
            size="sm"
            brand={BrandDiscord}
            icon={ArrowUpRight}
            className="hidden tablet:inline-flex"
          >
            <a href={ctaHref}>{label}</a>
          </Button>
        </>
      }
      menuCta={
        <Button
          asChild
          size="md"
          fullWidth
          brand={BrandDiscord}
          icon={ArrowUpRight}
        >
          <a href={ctaHref}>{label}</a>
        </Button>
      }
    />
  );
}
