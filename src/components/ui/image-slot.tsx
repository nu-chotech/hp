import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import type { ComponentProps } from "react";
import { Photo } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Image slot（§6.19、§5.7）
 *
 * 写真が入るべき場所の「枠」を先に確定させる部品。実素材が揃うまでは placeholder を
 * 出し、揃ったら src を渡すだけで差し替わる — 比率と余白は枠側が持つので、素材の
 * 到着でレイアウトが動かない。
 *
 * 画像は next/image の fill（DECISION U-45）。枠が relative + aspect-ratio を持ち、
 * 画像は absolute inset-0 で敷かれるので、比率は枠が固定し CLS は起きない
 * （§5.7.2 の width / height 属性は fill と両立しないので持たない）。
 * 配信は §5.7.2 のとおり sizes に応じた幅で AVIF / WebP に変換される — 実素材
 * （3〜4MB の jpg）を Mobile にそのまま送らないための移行で、素材が揃った 2026-09-12 に
 * 実施した。.svg（ペルソナ・チャットのアバター）は next/image が自動で unoptimized に
 * するので、そのまま通る。
 */
const slot = cva(["relative overflow-hidden"], {
  variants: {
    /**
     * 素材が無い間の地（§5.7.3、`color/image/placeholder` = 空の画像スロット）。
     * 周囲の罫線グリッドが境界を作るので枠も角丸も持たない。
     * Cover は素材が入れば地を覆い隠すので、読み込み中の下地としてそのまま残す。
     * Contain（ロゴ）は素材が入っても箱を埋めないため、残すと灰色の板がロゴを
     * 縁取ってしまう — §6.16 の Logo セルは `ground` の上に直接置くので、地を落とす。
     */
    ground: {
      placeholder: "bg-image-placeholder",
      none: "",
    },
    /** §5.7.2 の 3 比率 + ロゴの 3:2（L-32）。fill は親（罫線グリッドのセルなど）が高さを決める場合 */
    ratio: {
      "16:9": "aspect-16/9",
      "4:3": "aspect-4/3",
      "3:2": "aspect-3/2",
      "1:1": "aspect-square",
      fill: "size-full",
    },
    shape: {
      rect: "",
      // 円は Persona のイラストだけ。径 96 = size/illustration（DECISION L-12）。
      // 比率は shape 側が持ちきる — ratio の既定 16:9 のままだと 96×54 の楕円になり、
      // 呼び出し側が ratio="1:1" を知っていることに依存してしまう
      circle: "aspect-square w-illustration shrink-0 rounded-full",
    },
  },
  defaultVariants: {
    ratio: "16:9",
    shape: "rect",
    ground: "placeholder",
  },
});

// 色はそのまま（DECISION U-21）。filter も tint も掛けない
const image = cva("absolute inset-0 size-full", {
  variants: {
    /** 写真は cover、ロゴは contain（セル中央、DECISION L-26） */
    fit: {
      cover: "object-cover",
      contain: "object-contain",
    },
    /** §5.7.2 の焦点。人物は顔が上 1/3 に来るので中央より上を残す */
    focal: {
      center: "object-center",
      subject: "object-[50%_40%]",
      face: "object-[50%_30%]",
    },
  },
  defaultVariants: {
    fit: "cover",
    focal: "center",
  },
});

type ImageSlotBaseProps = ComponentProps<"div"> &
  Omit<VariantProps<typeof slot>, "ground"> &
  VariantProps<typeof image> & {
    /**
     * 制作環境でだけ出す説明。**本番では渡さない**（§6.19）。
     * 実素材が入ったセルと未定のセルを一覧で見分けるための開発用の印であって、
     * 閲覧者に見せる情報ではない。
     */
    caption?: string;
    /** ファーストビュー近傍だけ eager + preload。それ以外は下方にあるので lazy（§5.7.2） */
    priority?: boolean;
    /**
     * next/image の sizes。呼び出し側がスロットの実幅を渡す（member 597 / activity 597 /
     * persona 80px / logo 144px）。無ければ 100vw = 最大幅の候補を選ぶ安全側の既定
     */
    sizes?: string;
  };

/**
 * alt は src とセットでしか存在しない。空文字（人物・イラストの `alt=""`）は
 * 「代替を持たない」という明示的な選択なので、省略とは区別して必ず書かせる（§8.6）。
 */
export type ImageSlotProps = ImageSlotBaseProps &
  ({ src: string; alt: string } | { src?: undefined; alt?: never });

export function ImageSlot({
  className,
  ratio,
  shape = "rect",
  fit,
  focal,
  src,
  alt,
  caption,
  priority = false,
  sizes = "100vw",
  ...props
}: ImageSlotProps) {
  // 地を落とすのは「素材が入った Contain」だけ。呼び出し側に判断させない（§6.16 から一意に決まる）
  const ground = src && fit === "contain" ? "none" : "placeholder";

  return (
    <div className={cn(slot({ ratio, shape, ground }), className)} {...props}>
      {src ? (
        // fill は position:absolute; inset:0 を自分で当てる。object-fit / position は className で
        <Image
          alt={alt}
          className={image({ fit, focal })}
          fill
          priority={priority}
          sizes={sizes}
          src={src}
        />
      ) : shape === "circle" ? (
        // 円はアイコンのみ中央。キャプションを置く余白が無く、置くと円が図に見えなくなる
        <span className="absolute inset-0 grid place-items-center text-ink-tertiary">
          <Photo size={24} />
        </span>
      ) : (
        // 矩形は左上から。ページ全体の「ラベルはすべて左」に従う（DECISION L-19）
        <div className="absolute inset-0 flex flex-col items-start gap-stack-xs p-inset-md">
          <Photo size={24} className="text-ink-tertiary" />
          {caption ? (
            <p className="text-caption text-image-caption">{caption}</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
