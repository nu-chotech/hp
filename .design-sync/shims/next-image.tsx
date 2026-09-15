// next/image の代替（design-sync のバンドル専用、tsconfig paths で差し替える）。
// Next の最適化・srcset は行わず <img> に落とす。fill は next/image と同じ
// position:absolute; inset:0; width/height:100% を与える。/public 配下の小さな
// 静的素材は prebuild.mjs が data URI 化した PUBLIC_ASSETS から解決する。
// 読めない素材（Claude Design 側に無い /images/*.jpg など）は壊れた画像アイコンを
// 出さず自分を隠す — 下にある ImageSlot のプレースホルダ地がそのまま「枠」として見える。
import type { CSSProperties, ImgHTMLAttributes, SyntheticEvent } from "react";
import { PUBLIC_ASSETS } from "../.cache/assets";

export type StaticImageData = { src: string; width?: number; height?: number };

export type ImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height"
> & {
  src: string | StaticImageData;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  loader?: unknown;
};

export default function Image({
  src,
  fill,
  priority,
  unoptimized: _unoptimized,
  quality: _quality,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  loader: _loader,
  style,
  ...rest
}: ImageProps) {
  const raw = typeof src === "string" ? src : src.src;
  const resolved = PUBLIC_ASSETS[raw] ?? raw;
  const hideOnError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.visibility = "hidden";
  };
  const fillStyle: CSSProperties | undefined = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        color: "transparent",
        ...style,
      }
    : style;
  return (
    <img
      src={resolved}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={fillStyle}
      onError={hideOnError}
      {...rest}
    />
  );
}
