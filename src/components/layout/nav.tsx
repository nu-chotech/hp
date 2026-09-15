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
  // CTA は参加ダイアログを開くボタン（U-49）。矢印もマークも置かない（U-55、旧 U-19 / U-27）:
  // 押した瞬間に開くのはページ内のダイアログで、外へ出る予告はダイアログの参加リンクが持つ。
  // 幅の都合でもある — 矢印つき 127 では Mobile の帯が 378 で、375 の電話（iPhone mini / SE）
  // からはみ出していた。文言だけの 99 で 350 ≤ 360。360 未満（折りたたみの外画面）は帯から
  // CTA を落とす — Menu panel と Hero が同じ導線を持つ（§6.7.2）
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
            className="hidden min-[22.5rem]:inline-flex tablet:hidden"
          >
            <JoinTrigger>{ctaLabel}</JoinTrigger>
          </Button>
          <Button asChild size="sm" className="hidden tablet:inline-flex">
            <JoinTrigger>{ctaLabel}</JoinTrigger>
          </Button>
        </>
      }
      menuCta={
        <Button asChild size="md" fullWidth>
          <JoinTrigger>{ctaLabel}</JoinTrigger>
        </Button>
      }
    />
  );
}
