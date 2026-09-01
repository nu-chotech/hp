import type { ComponentProps } from "react";
import { type PhotoSlide, PhotoSlides } from "@/components/bento/photo-slides";
import { Cell } from "@/components/ui/ruled-grid";

/**
 * Cell Image（§6.11.5）
 *
 * セルは inset 0 で、スライドが縁まで触れる。比率は 16:9 が基準だが、
 * Desktop では隣の Chat セル（2×2）が行の高さを決めるので、そこに合わせて伸ばす
 * （DECISION L-20）。伸ばす側を高さ指定ではなく flex-1 にしてあるのは、
 * 行の高さがチャットの文量で動いても追従させるため。
 *
 * 中身は 1 枚ではなく複数枚の送り（DECISION U-18）。送りの実装は PhotoSlides が持つ。
 */
export type CellImageProps = ComponentProps<"div"> & {
  photos: readonly PhotoSlide[];
};

export function CellImage({ photos, className, ...props }: CellImageProps) {
  return (
    <Cell className={className} colSpan={2} inset="none" rowSpan={2} {...props}>
      <PhotoSlides photos={photos} />
    </Cell>
  );
}
