import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * スキップリンク（§8.5 / DECISION M-19、サイズ R23）
 *
 * DOM の先頭に置く。ふだんは読み上げにだけ存在し、フォーカスが乗った瞬間に
 * Nav の下・左端（page/inset 24）に Ink ボタンとして現れる。
 *
 * 隠し方に sr-only + not-focus を使うのは、display:none や visibility:hidden だと
 * そもそもフォーカスできず、リンク自体が存在しないのと同じになるため。
 * `not-focus:` は詳細度 2 なので、下の `fixed` と順序を争わずに位置が決まる。
 *
 * 高さは 44 に統一する。§8.3 は Desktop 36 + `::before` で 44 と書くが、要求される
 * 当たり判定はどちらも 44 で、キーボード専用の部品では視覚ボックスを当たり判定に
 * 一致させた方が「今どこにフォーカスがあるか」がそのまま読める。
 */
export interface SkipLinkProps {
  /** 本文ランドマークの id（§8.5 の <main id="main">） */
  href?: string;
  children?: string;
  className?: string;
}

export function SkipLink({
  href = "#main",
  children = "本文へスキップ",
  className,
}: SkipLinkProps) {
  return (
    <Button
      asChild
      size="md"
      className={cn(
        "not-focus:sr-only fixed top-nav start-page-inset z-50",
        className,
      )}
    >
      <a href={href}>{children}</a>
    </Button>
  );
}
