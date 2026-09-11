import { ArrowRight } from "@/components/icons";
import { ImageSlot } from "@/components/ui/image-slot";
import { Cell } from "@/components/ui/ruled-grid";
import type { Persona } from "@/content/personas";
import { cn } from "@/lib/utils";

export interface PersonaCardProps {
  persona: Persona;
}

/**
 * Persona card（§6.14 / DECISION U-42）
 *
 * カードはリンクではない。だから状態を一つも持たない — ホバーもフォーカスも無い面に
 * 見えることが、そのまま「ここは押せない」という情報になる（§6.14「状態なし」）。
 *
 * 縦の並びは 3 行: header（イラスト 80 + [CASE 番号 / 題]）、悩み（墨の板）、次の一歩
 * （surface の板）。後ろの 2 枚は隙間なしで積む — 「悩み」と「答え」が 1 つの対であること
 * を形で言うため。旧解剖（番号 / イラスト右上 / 題 / 引用 / 矢印行）は、番号と題の間に
 * イラストの高さぶんの空きができ、引用と推薦の行数でそれぞれの位置が揺れていた。
 *
 * 3 行は **subgrid**。カードは親グリッド（`<ul>`）の 3 行ぶんを占め、行の高さを親から
 * 受け取るので、同じ行のカード同士で header・悩み・次の一歩の境目が**必ず**揃う
 * （悩みが 1 行のカードも 2 行のカードも、推薦が 1 行でも 2 行でも）。flex-1 で残りを
 * 埋める作りだと、推薦が 2 行に折れたカードだけ板の境目が 20px ずれた。
 *
 * 引用は墨の板（inverse/ground 上 inverse/ink 14.86）、推薦は surface の板（ink 13.51）。
 */
export function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <Cell asChild>
      {/* row-span-3 + subgrid: 親の 3 行を借りる。親の gap（罫 2px）は行間に持ち込まない
          （gap-y-0）— 板と板の間に地の色の線が出る。header と板の間は margin で取る */}
      <li className="row-span-3 grid grid-rows-[subgrid] gap-y-0">
        {/* イラストは装飾。人物像を運ぶのは見出しと引用なので alt を持たない（§8.6）。
            径は shape が持つ（80 = size/illustration、U-42 で 96 → 80）。
            番号と題はイラストの高さの中で上下中央に置く — 番号の行ボックス 16 + 4 +
            題 24 = 44 は 80 の中に収まり、題が 2 行（48）でも 68 で収まる */}
        <div className="mb-stack-md flex items-center gap-inline-sm">
          {persona.photo ? (
            <ImageSlot alt="" shape="circle" sizes="80px" src={persona.photo} />
          ) : (
            <ImageSlot shape="circle" sizes="80px" />
          )}
          <div className="min-w-0">
            <p className="text-overline text-ink-secondary">{persona.caseNo}</p>
            <h3 className="mt-stack-2xs text-headline text-ink">
              {persona.title}
            </h3>
          </div>
        </div>

        {/* 悩み（行 2）。鉤括弧はコンテンツ側にあるので、ここでは足さない。
            `「` 始まりは左端を揃える（trim-start）。板は行の高さいっぱいに伸びる（stretch） */}
        <p
          className={cn(
            "on-ink bg-inverse-ground px-inset-md py-inset-sm text-callout text-inverse-ink",
            persona.quote.startsWith("「") && "trim-start",
          )}
        >
          {persona.quote}
        </p>
        {/* 次の一歩（行 3）。mt-0: @layer base の p + p 12 を打ち消し、悩みの板に隙間なく接する */}
        <p className="mt-0 flex items-start gap-inline-icon bg-surface px-inset-md py-inset-sm text-footnote-bold text-ink">
          {/* 矢印は「次に」を指す指示子なので、この行だけ先頭に置く（§6.1.9 の例外）。
                h-5 = Footnote の行ボックス 20。1 行目の行ボックスの中央に置くための箱で、
                推薦文が 2 行に折り返しても矢印は 1 行目に留まる */}
          <span className="flex h-5 shrink-0 items-center">
            <ArrowRight className="size-icon-sm" />
          </span>
          {persona.recommendation}
        </p>
      </li>
    </Cell>
  );
}
