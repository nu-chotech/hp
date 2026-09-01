import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * 紙の幅（§3.6）
 *
 * page: width: min(100% - 2 × page/inset, 1200) を中央寄せ。1248px 以上で
 *   ちょうど 1200 になり、12 列グリッドと罫線グリッドが Figma の Desktop
 *   フレームと同じ幾何になる。padding ではなく width で作るのは、container の
 *   端が「内容の端」であって「箱の内側」ではないため — 罫線グリッドの外枠や
 *   セクション見出しがこの端に揃う。
 * viewport: container に縛らず viewport から 24 だけ内側（DECISION L-23）。
 *   sticky な帯（ナビ）・マーキーの停止セル・Menu row は「紙」ではなく「窓枠」に
 *   属するので、1440 で帯の左右に 120 の空白ができてはいけない。
 *
 * min() の合成に対応するトークンユーティリティは無いので、ここだけ任意値を使う。
 * 数値はハードコードせず --page-inset / --container-page をそのまま参照する。
 */
const containerVariants = cva("mx-auto w-full", {
  variants: {
    width: {
      page: "w-[min(100%_-_2_*_var(--page-inset),var(--container-page))]",
      viewport: "px-page-inset",
    },
  },
  defaultVariants: {
    width: "page",
  },
});

export interface ContainerProps
  extends ComponentProps<"div">,
    VariantProps<typeof containerVariants> {}

export function Container({ width, className, ...props }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ width }), className)} {...props} />
  );
}

export { containerVariants };
