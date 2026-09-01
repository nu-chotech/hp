import type { ComponentProps } from "react";
import { ImageSlot, type ImageSlotProps } from "@/components/ui/image-slot";
import { Cell } from "@/components/ui/ruled-grid";

/**
 * Cell Image（§6.11.5）
 *
 * セルは inset 0 で、Image slot が縁まで触れる。比率は 16:9 が基準だが、
 * Desktop では隣の Chat セル（2×2）が行の高さを決めるので、そこに合わせて伸ばす
 * （DECISION L-20）。伸ばす側を高さ指定ではなく flex-1 にしてあるのは、
 * 行の高さがチャットの文量で動いても追従させるため。
 */
export type CellImageProps = ComponentProps<"div"> & {
  /**
   * 実素材。src と alt は必ず対で渡す（§8.6: alt は src とセットでしか存在しない）。
   * 未指定の間は Image slot が placeholder を出し、枠と比率だけが先に確定する。
   */
  photo?: { src: string; alt: string };
  focal?: ImageSlotProps["focal"];
  /** 制作中の目印。実素材が入ったら渡さない（§6.19） */
  caption?: string;
};

export function CellImage({
  photo,
  focal,
  caption,
  className,
  ...props
}: CellImageProps) {
  const slot = {
    // Mobile は 16:9（338 × 190）、Desktop は行の高さいっぱいに伸びる
    className: "desktop:aspect-auto desktop:flex-1",
    ratio: "16:9",
    focal,
    caption,
    // ベント写真だけ eager。ファーストビューの直下にあり、遅れて入ると行が動く
    priority: true,
  } as const;

  return (
    <Cell className={className} colSpan={2} inset="none" rowSpan={2} {...props}>
      {photo ? (
        <ImageSlot {...slot} alt={photo.alt} src={photo.src} />
      ) : (
        <ImageSlot {...slot} />
      )}
    </Cell>
  );
}
