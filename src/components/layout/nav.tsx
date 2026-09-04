import { ArrowUpRight } from "@/components/icons";
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
  // Discord マークは置かない（U-19。U-27 で一度足したが、帯の CTA は文言だけで足りると
  // 同日に撤回。Mobile の幅検算 §6.7.2 も矢印ありの元の式に戻る）
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
              2 つの箱を出し分ける。hidden 側はフォーカス順にも乗らない */}
          <Button
            asChild
            size="md"
            icon={ArrowUpRight}
            className="tablet:hidden"
          >
            <a href={ctaHref}>{label}</a>
          </Button>
          <Button
            asChild
            size="sm"
            icon={ArrowUpRight}
            className="hidden tablet:inline-flex"
          >
            <a href={ctaHref}>{label}</a>
          </Button>
        </>
      }
      menuCta={
        <Button asChild size="md" fullWidth icon={ArrowUpRight}>
          <a href={ctaHref}>{label}</a>
        </Button>
      }
    />
  );
}
