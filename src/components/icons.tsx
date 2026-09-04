import {
  IconArrowRight,
  IconArrowUp,
  IconArrowUpRight,
  IconAsterisk,
  IconBrandDiscordFilled,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandX,
  IconCheck,
  IconExternalLink,
  IconHeart,
  IconMail,
  IconMenu2,
  IconPhoto,
  IconPlayerPause,
  IconPlayerPlay,
  IconX,
} from "@tabler/icons-react";
import type { ComponentProps } from "react";

/**
 * アイコン（§5）
 *
 * Tabler Icons の outline のみ。24 グリッド・stroke 2 で統一し、他のセットは混ぜない。
 * 例外は Discord のブランドマークだけ filled（DECISION U-23）— 輪郭版は顔の目が線になって
 * 崩れて見える。塗り版は 24 グリッドのまま stroke を持たない。
 * ページ上のアイコンはすべて装飾で、意味は必ず隣接するテキストが運ぶ。だからここで
 * 一律に aria-hidden を付ける — 呼び出し側で付け忘れると読み上げにゴミが混ざる。
 */
type TablerIcon = typeof IconArrowRight;
export type IconProps = Omit<
  ComponentProps<TablerIcon>,
  "aria-hidden" | "focusable"
>;

/** 20 = icon/md。16 = icon/sm（Chip・Footnote 内）、24 = icon/lg（Nav の開閉） */
function decorative(Base: TablerIcon, displayName: string) {
  function Decorative({ size = 20, stroke = 2, ...props }: IconProps) {
    return (
      <Base
        aria-hidden="true"
        focusable="false"
        size={size}
        stroke={stroke}
        {...props}
      />
    );
  }
  Decorative.displayName = displayName;
  return Decorative;
}

/** サイト内遷移・次の一歩 */
export const ArrowRight = decorative(IconArrowRight, "ArrowRight");
/** 外部遷移（Discord / SNS / mailto） */
export const ArrowUpRight = decorative(IconArrowUpRight, "ArrowUpRight");
/** ページ最上部へ */
export const ArrowUp = decorative(IconArrowUp, "ArrowUp");
/** マーキーの区切り */
export const Asterisk = decorative(IconAsterisk, "Asterisk");
/** メニューを開く */
export const Menu = decorative(IconMenu2, "Menu");
/** メニューを閉じる */
export const Close = decorative(IconX, "Close");
/** マーキーの停止・再生 */
export const Pause = decorative(IconPlayerPause, "Pause");
export const Play = decorative(IconPlayerPlay, "Play");
export const Heart = decorative(IconHeart, "Heart");
export const Check = decorative(IconCheck, "Check");
export const Mail = decorative(IconMail, "Mail");
/** 画像プレースホルダ */
export const Photo = decorative(IconPhoto, "Photo");
/** 個人サイト */
export const Website = decorative(IconExternalLink, "Website");

/** 唯一の filled（U-23）。stroke は無視される */
export const BrandDiscord = decorative(IconBrandDiscordFilled, "BrandDiscord");
export const BrandX = decorative(IconBrandX, "BrandX");
export const BrandInstagram = decorative(IconBrandInstagram, "BrandInstagram");
export const BrandGithub = decorative(IconBrandGithub, "BrandGithub");

/** content 側が文字列で持つ導線を解決する */
export const brandIcons = {
  x: BrandX,
  instagram: BrandInstagram,
  github: BrandGithub,
  discord: BrandDiscord,
  website: Website,
} as const;
