import { ArrowUpRight } from "@/components/icons";
import { JoinTrigger } from "@/components/join/join-dialog-provider";
import { Brand } from "@/components/layout/brand";
import { NavBar } from "@/components/layout/nav-bar";
import { Button } from "@/components/ui/button";

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
   * CTA の文言。§6.7.1 が指定する既定は「参加する」。行き先は参加ダイアログ（U-49）で、
   * そこから Discord へ出る。content 層に Nav 用のエントリが無いので、既定値をここに置く。
   */
  ctaLabel?: string;
  className?: string;
}

export function Nav({ ctaLabel = "参加する", className }: NavProps) {
  // CTA は参加ダイアログを開くボタン（U-49）。行き先は外部なので矢印（ArrowUpRight）は
  // 残すが、押した瞬間に新しいタブは開かない — 注記はダイアログの同意リンクが持つ。
  // Discord マークは置かない（U-19。U-27 で一度足したが、帯の CTA は文言だけで足りると
  // 同日に撤回。Mobile の幅検算 §6.7.2 も矢印ありの元の式に戻る）
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
            <JoinTrigger>{ctaLabel}</JoinTrigger>
          </Button>
          <Button
            asChild
            size="sm"
            icon={ArrowUpRight}
            className="hidden tablet:inline-flex"
          >
            <JoinTrigger>{ctaLabel}</JoinTrigger>
          </Button>
        </>
      }
      menuCta={
        <Button asChild size="md" fullWidth icon={ArrowUpRight}>
          <JoinTrigger>{ctaLabel}</JoinTrigger>
        </Button>
      }
    />
  );
}
