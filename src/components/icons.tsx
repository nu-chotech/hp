import {
  IconArrowRight,
  IconArrowUp,
  IconArrowUpRight,
  IconAsterisk,
  IconBook,
  IconCheck,
  IconCode,
  IconExternalLink,
  IconFlag,
  IconFlask,
  IconHammer,
  IconHeart,
  IconHeartHandshake,
  IconMail,
  IconMapPin,
  IconMenu2,
  IconMessageCircle,
  IconMessages,
  IconPalette,
  IconPhoto,
  IconSchool,
  IconX,
} from "@tabler/icons-react";
import type { ComponentProps } from "react";
import {
  BrandDiscordMark,
  BrandGithubMark,
  BrandInstagramMark,
  BrandXMark,
} from "@/components/brand-marks";

/**
 * アイコン（§5）
 *
 * Tabler Icons の outline のみ。24 グリッド・stroke 2 で統一し、他のセットは混ぜない。
 * 例外はブランドマーク（X / Instagram / GitHub / Discord）で、Tabler の再描画ではなく
 * 各社の公式素材を写した brand-marks.tsx が実体（DECISION U-38、旧 U-23 は撤回）。
 * ここから re-export するのは、呼び出し側が「アイコンの出どころ」を知らずに済むため。
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
export const Heart = decorative(IconHeart, "Heart");
export const Check = decorative(IconCheck, "Check");
export const Mail = decorative(IconMail, "Mail");
/** 画像プレースホルダ */
export const Photo = decorative(IconPhoto, "Photo");

/**
 * About のベントのビジュアル（§6.11.2 / DECISION U-40 → U-52）。32 = icon/xl、stroke 1.5（§5.1）。
 * Bento / Figure が淡い緑の円（C-32）の中に置き、色は currentColor = figure/ink（green-900）。
 * 題の語をひとつずつ図にする: 学ぶ = book、創る = hammer、話す = message-circle。
 * エンジニア = code、デザイナー = palette、サイエンティスト = flask。
 * 対面 = map-pin、オンライン = messages。公認 = school、公式パートナー = heart-handshake。
 * 設立 = flag。
 */
export const Book = decorative(IconBook, "Book");
export const Hammer = decorative(IconHammer, "Hammer");
export const MessageCircle = decorative(IconMessageCircle, "MessageCircle");
export const Code = decorative(IconCode, "Code");
export const Palette = decorative(IconPalette, "Palette");
export const Flask = decorative(IconFlask, "Flask");
export const MapPin = decorative(IconMapPin, "MapPin");
export const Messages = decorative(IconMessages, "Messages");
export const School = decorative(IconSchool, "School");
export const HeartHandshake = decorative(IconHeartHandshake, "HeartHandshake");
export const Flag = decorative(IconFlag, "Flag");

/** content 側が文字列で持つベントの図を解決する（about.ts の AboutIcon） */
export const bentoIcons = {
  book: Book,
  hammer: Hammer,
  message: MessageCircle,
  code: Code,
  palette: Palette,
  flask: Flask,
  "map-pin": MapPin,
  messages: Messages,
  school: School,
  handshake: HeartHandshake,
  flag: Flag,
} as const;
/** 個人サイト */
export const Website = decorative(IconExternalLink, "Website");

/**
 * ブランドマーク（§5.1 の例外、U-38）。公式素材の path を写した塗りの SVG で、
 * Tabler の size / stroke と同じ props を受けるが stroke は使わない。
 * 型は IconProps と互換なので Button の brand / TextLink の中にそのまま置ける。
 */
export const BrandDiscord = BrandDiscordMark;
export const BrandX = BrandXMark;
export const BrandInstagram = BrandInstagramMark;
export const BrandGithub = BrandGithubMark;

/** content 側が文字列で持つ導線を解決する */
export const brandIcons = {
  x: BrandX,
  instagram: BrandInstagram,
  github: BrandGithub,
  discord: BrandDiscord,
  website: Website,
} as const;
