import { Brand } from "hp";

/**
 * Brand lockup（§6.6）: mark ─ 12 ─ wordmark ─ 12 ─ 縦 hairline ─ 12 ─ tagline。
 * 全体が `#hero` へのリンク。状態を持つのは wordmark だけ（hover で下線）。
 */

/** Nav の段（mark 24 / Title 3）。タグラインを常時出した形 */
export const Nav = () => (
  <div className="flex flex-col items-start gap-stack-md">
    <Brand size="nav" showTagline />
  </div>
);

/** Footer の段（mark 20 / Headline）。Footer は常にタグラインを出す（既定 true） */
export const Footer = () => (
  <div className="flex flex-col items-start gap-stack-md">
    <Brand size="footer" />
  </div>
);

/** タグライン無し。mark と wordmark だけの最小形（Mobile の Nav がこの形） */
export const NoTagline = () => (
  <div className="flex flex-col items-start gap-stack-md">
    <Brand size="nav" showTagline={false} />
    <Brand size="footer" showTagline={false} />
  </div>
);

/**
 * Nav の既定 `showTagline="desktop"`: タグラインは desktop（78rem = 1248）から出す。
 * このカード（900 幅）では mark + wordmark だけになる — Nav 帯の Mobile / Tablet と同じ見え方
 */
export const Desktop = () => (
  <div className="flex flex-col items-start gap-stack-md">
    <Brand size="nav" showTagline="desktop" />
  </div>
);

/** 2 段の比較。mark と wordmark の行ボックス（26 / 24）が視覚ボックスを決める（L-30） */
export const Sizes = () => (
  <div className="flex flex-col items-start gap-stack-lg">
    <Brand size="nav" showTagline />
    <Brand size="footer" showTagline />
  </div>
);
