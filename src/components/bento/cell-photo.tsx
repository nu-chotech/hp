import type { ComponentProps } from "react";
import { ImageSlot } from "@/components/ui/image-slot";
import { Cell } from "@/components/ui/ruled-grid";
import { cn } from "@/lib/utils";

/**
 * Cell Photo（§6.11.5 / DECISION U-56）
 *
 * ベントに戻ってきた活動写真。U-40 で About から Activities へ移したのは**スライド送り**
 * （U-18、時間を持つセル）であって写真そのものではない。文字と図だけのセルが 7 つ並ぶと
 * 面が図解に寄るので、静止画を 2 枚挟んで「実際に人が集まっている」を入れる。
 * 素材は Activities と共用（`public/images/activities/`、差し替えは同名で上書き）。
 *
 * 写真はセルの縁まで敷く（`inset="none"`）。高さの決まり方が段で変わる:
 * Mobile の 1 列は**自分で 16:9 を持つ**（隣に高さを決めるセルが無く、行の床 120 では
 * 帯にならない）。tablet からは行の高さ = 隣のセルなので、比を捨てて面を埋める。
 *
 * 隣に写真を説明する文が無いので alt は空にしない（§8.6）— 「Talk Day の様子」のように
 * 場面の名前を持たせる。セルはリンクを持たない（U-17）。
 */

export interface CellPhotoProps extends ComponentProps<"div"> {
  src: string;
  alt: string;
  /** next/image の sizes。段ごとのセル幅 */
  sizes: string;
}

export function CellPhoto({
  src,
  alt,
  sizes,
  className,
  ...props
}: CellPhotoProps) {
  return (
    <Cell
      className={cn("max-tablet:aspect-16/9", className)}
      inset="none"
      {...props}
    >
      <ImageSlot alt={alt} ratio="fill" sizes={sizes} src={src} />
    </Cell>
  );
}
