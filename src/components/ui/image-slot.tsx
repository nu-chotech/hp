import { cva, type VariantProps } from "class-variance-authority";
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
 * next/image への移行を前提にした形にしてある。枠が relative + aspect-ratio を持ち、
 * 画像は absolute inset-0 で敷いてあるので、<img> の 1 行を <Image fill sizes={sizes} />
 * に置き換えるだけで済む（props 名も next/image に合わせた）。
 * §5.7.2 は CLS 対策に width / height 属性を求めるが、比率を枠の aspect-ratio が
 * 固定しているので属性なしでもシフトは起きない。fill と両立しないので持たせない。
 */
const slot = cva(
  [
    "relative overflow-hidden",
    // 素材が無い間の地。周囲の罫線グリッドが境界を作るので枠も角丸も持たない（§5.7.3）
    "bg-image-placeholder",
  ],
  {
    variants: {
      /** §5.7.2 の 3 比率。fill は親（罫線グリッドのセルなど）が高さを決める場合 */
      ratio: {
        "16:9": "aspect-16/9",
        "4:3": "aspect-4/3",
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
    },
  },
);

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
  VariantProps<typeof slot> &
  VariantProps<typeof image> & {
    /**
     * 制作環境でだけ出す説明。**本番では渡さない**（§6.19）。
     * 実素材が入ったセルと未定のセルを一覧で見分けるための開発用の印であって、
     * 閲覧者に見せる情報ではない。
     */
    caption?: string;
    /** ベント写真だけ eager。それ以外は下方にあるので lazy（§5.7.2） */
    priority?: boolean;
    /** next/image に fill で渡すときと同じ意味。移行時にそのまま持ち上がる */
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
  // sizes は srcset とセットでしか意味を持たない属性なので、<img> には渡さない。
  // 型には残す — next/image に移すとき <Image fill sizes={sizes} /> でそのまま効く
  sizes: _sizes,
  ...props
}: ImageSlotProps) {
  return (
    <div className={cn(slot({ ratio, shape }), className)} {...props}>
      {src ? (
        // biome-ignore lint/performance/noImgElement: 素材が確定するまで next/image は入れない。ここが唯一の <img> で、差し替えは <Image fill sizes={sizes} /> の 1 行で済む
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className={image({ fit, focal })}
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
