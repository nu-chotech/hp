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
 * 縦の並びは 3 行: header（イラスト 80 + [CASE 番号 / 題]）、悩み（声。地の上の Callout）、
 * 次の一歩（surface の板）。旧解剖（番号 / イラスト右上 / 題 / 引用 / 矢印行）は、番号と
 * 題の間にイラストの高さぶんの空きができ、引用と推薦の行数でそれぞれの位置が揺れていた。
 *
 * 悩みは板を持たない（DECISION U-53）。U-42 の墨の板は inverse/ground = action/fill と同じ
 * 色で、6 枚並ぶと 6 個のボタンのように読め、Hero と Poster の間で唯一の暗い面として浮いた。
 * 声は「」が運ぶ。板は「答え」（次の一歩）だけが持ち、カードの中で強調は 1 か所になる。
 *
 * 高さは **目標値**の 2 つの箱で決める: 引用 `size/persona-quote` 44（Callout 2 行）、次の一歩
 * `size/persona-rec` 64（Footnote/Bold 2 行 + inset 12 × 2）。引用が 1 行でも 2 行ぶん取る —
 * 同じ行の中だけでなく、上下 2 段の 6 枚が同じ高さ（tablet 以上 268 / Mobile 260）になる
 * ため。前提は §9.3 の字数上限（引用 ≤ 42 全角、推薦 ≤ 36）。
 *
 * 3 行は **subgrid**。カードは親グリッド（`<ul>`）の 3 行ぶんを占め、行の高さを親から
 * 受け取るので、同じ行のカード同士で header・悩み・次の一歩の境目が**必ず**揃う。
 * DevTools のトラックは 119 / 58 / 87 と見える（親の gap 2 と subgrid の gap 0 の差分 ±1 と、
 * li の inset がトラック 1・3 に畳み込まれるため）— 実体は 96 / 60 / 64。
 */
export function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <Cell asChild>
      {/* row-span-3 + subgrid: 親の 3 行を借りる。親の gap（罫 2px）は行間に持ち込まない
          （gap-y-0）。行の間は margin で取る（header → 引用 16、引用 → 板 16） */}
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

        {/* 悩み（行 2）。板なし、地の上の Callout ink（14.86）。鉤括弧はコンテンツ側にあるので
            ここでは足さない。`「` 始まりは左端を揃える（trim-start）。箱は 2 行ぶん（44）で、
            1 行の引用は上下中央 — 題の直下から同じ距離で始まる（U-53） */}
        <p
          className={cn(
            "mb-stack-md flex min-h-persona-quote items-center text-callout text-ink",
            persona.quote.startsWith("「") && "trim-start",
          )}
        >
          {persona.quote}
        </p>
        {/* 次の一歩（行 3）。カードの中で唯一の板（surface、ink 13.51）。箱は 2 行ぶん（64）で
            1 行の推薦は上下中央、2 行は inset 12 で収まる。mt-0: @layer base の p + p 12 を打ち消す */}
        <p className="mt-0 flex min-h-persona-rec items-center bg-surface px-inset-md py-inset-sm text-footnote-bold text-ink">
          {/* 矢印は「次に」を指す指示子なので、この行だけ先頭に置く（§6.1.9 の例外）。
                h-5 = Footnote の行ボックス 20。1 行目の行ボックスの中央に置くための箱で、
                推薦文が 2 行に折り返しても矢印は 1 行目に留まる */}
          <span className="flex items-start gap-inline-icon">
            <span className="flex h-5 shrink-0 items-center">
              <ArrowRight className="size-icon-sm" />
            </span>
            {persona.recommendation}
          </span>
        </p>
      </li>
    </Cell>
  );
}
