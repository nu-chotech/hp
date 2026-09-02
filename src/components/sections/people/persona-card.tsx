import { ArrowRight } from "@/components/icons";
import { ImageSlot } from "@/components/ui/image-slot";
import { Cell } from "@/components/ui/ruled-grid";
import type { Persona } from "@/content/personas";

export interface PersonaCardProps {
  persona: Persona;
}

/**
 * Persona card（§6.14）
 *
 * カードはリンクではない。だから状態を一つも持たない — ホバーもフォーカスも無い面に
 * 見えることが、そのまま「ここは押せない」という情報になる（§6.14「状態なし」）。
 *
 * 縦の並びは 4 ブロック（header / title / quote / rec）で、間は `stack/md` 16 の gap 一つ。
 * 推薦行だけ `margin-top: auto` で下端に落とす — 引用の長さが 1〜2 行で揺れても、
 * 同じ行のカード同士で「次の一歩」の高さが揃う（罫線グリッドの行は stretch）。
 */
export function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <Cell asChild>
      <li className="gap-stack-md">
        {/* caseNo は円の上端ではなく字面で揃える。Overline の行ボックス 16 に対して
            円は 96 なので、そのままだと連番が高く浮いて見える（§6.14 の stack/2xs 4） */}
        <div className="flex items-start justify-between gap-inline-sm">
          <p className="mt-stack-2xs text-overline text-ink-secondary">
            {persona.caseNo}
          </p>
          {/* イラストは装飾。人物像を運ぶのは見出しと引用なので alt を持たない（§8.6）。
              径は shape が持つ（96 = size/illustration）。sizes は next/image 移行用 */}
          {persona.photo ? (
            <ImageSlot shape="circle" sizes="96px" src={persona.photo} alt="" />
          ) : (
            <ImageSlot shape="circle" sizes="96px" />
          )}
        </div>

        <h3 className="text-headline text-ink">{persona.title}</h3>

        {/* 引用は面で囲う。鉤括弧はコンテンツ側にあるので、ここでは足さない（§6.14） */}
        <p className="bg-surface px-inset-sm py-inset-xs text-callout text-ink">
          {persona.quote}
        </p>

        <p className="mt-auto flex items-start gap-inline-icon text-footnote-bold text-ink-secondary">
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
