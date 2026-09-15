import { BrandGithubMark, BrandInstagramMark, BrandXMark, TextLink } from "hp";

/** ポスター面（Join セクションの面） */
function Poster({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-surface="poster"
      className="on-ink flex flex-wrap items-center gap-inline-lg bg-poster-ground p-inset-md text-poster-ink"
    >
      {children}
    </div>
  );
}

/**
 * 段落の中の inline（既定）。サイズも色も本文を継ぎ、Bold と 2px の常時下線だけで差をつける（§6.3）。
 * external は付けない — 文中の矢印（inflow）は preflight の svg { display: block } で行が割れる（learnings 参照）
 */
export const Inline = () => (
  <div className="max-w-measure text-body-m">
    <p>
      ChoTech（チョーテック）は<TextLink href="#about">長崎大学公認</TextLink>
      の学生テックコミュニティです。
    </p>
    <p>
      ものづくりに少しでも興味があれば、大学・学部・学科を問わず、誰でも
      <TextLink href="#join">参加する</TextLink>ことができます。
    </p>
  </div>
);

/** ナビ（Label/Nav）。持続状態 current はアクセントではなく ink の 3px 下線（K-4 改） */
export const Nav = () => (
  <ul className="flex flex-wrap items-center gap-inline-md">
    <li>
      <TextLink variant="nav" href="#about">
        About
      </TextLink>
    </li>
    <li>
      <TextLink variant="nav" href="#activities" current>
        Activities
      </TextLink>
    </li>
    <li>
      <TextLink variant="nav" href="#members">
        Members
      </TextLink>
    </li>
    <li>
      <TextLink variant="nav" href="#partners">
        Partners
      </TextLink>
    </li>
  </ul>
);

/** フッター（Footnote）。静止は ink-secondary、ホバーで ink まで上げる。li は flex で strut を消す（U-47） */
export const Footer = () => (
  <ul className="flex flex-wrap items-center gap-inline-lg">
    <li className="flex">
      <TextLink variant="footer" href="#about">
        About
      </TextLink>
    </li>
    <li className="flex">
      <TextLink variant="footer" href="#activities">
        Activities
      </TextLink>
    </li>
    <li className="flex">
      <TextLink variant="footer" href="#members">
        Members
      </TextLink>
    </li>
    <li className="flex">
      <TextLink variant="footer" href="#partners">
        Partners
      </TextLink>
    </li>
  </ul>
);

/** ソーシャル（ポスター面、Overline）。ページではマークだけ（U-28）、名前は sr-only に残す。文字で出すときは Overline の大文字 */
export const Social = () => (
  <Poster>
    <ul className="flex flex-wrap items-center gap-inline-lg">
      <li className="flex">
        <TextLink variant="social" href="https://x.com/chotech_ngs" className="before:-inset-x-3">
          <BrandXMark className="size-icon-md" />
          <span className="sr-only">X</span>
        </TextLink>
      </li>
      <li className="flex">
        <TextLink
          variant="social"
          href="https://www.instagram.com/nu_chotech"
          className="before:-inset-x-3"
        >
          <BrandInstagramMark className="size-icon-md" />
          <span className="sr-only">Instagram</span>
        </TextLink>
      </li>
      <li className="flex">
        <TextLink variant="social" href="https://github.com/nu-chotech" className="before:-inset-x-3">
          <BrandGithubMark className="size-icon-md" />
          <span className="sr-only">GitHub</span>
        </TextLink>
      </li>
    </ul>
    <TextLink variant="social" href="https://github.com/nu-chotech" external>
      GitHub
    </TextLink>
  </Poster>
);

/** 段落の外で単独に立つ inline リンク（standalone）。判定を 44 に広げ、外部なら arrow-up-right を gap 8 で添える */
export const Standalone = () => (
  <div className="flex flex-col items-start gap-stack-sm text-body-m">
    <TextLink href="#activities" standalone>
      活動内容
    </TextLink>
    <TextLink href="https://github.com/nu-chotech" standalone external>
      GitHub
    </TextLink>
  </div>
);
