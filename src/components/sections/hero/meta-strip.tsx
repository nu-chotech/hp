import { ruleVariants } from "@/components/ui/rule";
import { heroContent } from "@/content/hero";
import { cn } from "@/lib/utils";

/**
 * Hero / Meta strip（§6.8.2）
 *
 * 「第三者が裏づけた事実」を同じ強さで並べる帯（DECISION U-13）。公認も公式パートナーも
 * 片方だけ本文に落とすと格が下がって見えるので、1 行の中で対等に置く。
 * 見出しにはしない（§8.5）ので要素は <p>。
 *
 * 欧文は Overline/Latin（大文字化は @layer components が持つ）、和文は Overline/JP。
 * `lang="en"` は付けない — 単語レベルの欧文で読み上げ言語を切り替える必要がない（§6.8.2）。
 */
export function MetaStrip() {
  const items = heroContent.meta;

  return (
    <p
      className="flex flex-wrap items-center gap-x-inline-md gap-y-stack-xs text-inverse-ink-tertiary"
      data-reveal
      data-reveal-index="0"
    >
      {items.map((item, index) => (
        // 区切り罫は直前の項目と 1 つの塊で折り返す。単独で折り返すと行頭に罫が来る（§6.8.2）
        <span
          key={item.text}
          className="inline-flex items-center gap-inline-md"
        >
          {/* content 側の lang フラグは「どちらのロールで組むか」を選ぶためのもの */}
          <span
            className={"lang" in item ? "text-overline" : "text-overline-jp"}
          >
            {item.text}
          </span>
          {index < items.length - 1 ? (
            // Rule 部品は <div> を返すので <p> の中に置けない（パーサが段落を閉じてしまう）。
            // 見た目の正本は同じ ruleVariants を引き、要素だけ span にする。
            // 色は tone=current: 区切りは行の文字色を継ぐ（DECISION L-16）
            <span
              aria-hidden="true"
              className={cn(
                ruleVariants({
                  orientation: "vertical",
                  weight: "hair",
                  tone: "current",
                }),
                "inline-block",
              )}
            />
          ) : null}
        </span>
      ))}
    </p>
  );
}
