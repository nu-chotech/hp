import type { SocialBrand } from "@/config/site";

/** カードに並べる導線。個人サイトは website（外部リンクアイコン） */
export type MemberSocialKind = SocialBrand | "website";

export interface MemberSocial {
  kind: MemberSocialKind;
  href: string;
}

export interface Member {
  id: string;
  /** 姓 名（分かち書き 1 つ） */
  name: string;
  role: string;
  /** 1〜2 行の紹介 */
  bio: string;
  /** 最大 3 件。無い場合は行ごと落とす（DECISION U-12） */
  socials: readonly MemberSocial[];
}

/**
 * 運営メンバー（§6.15）
 *
 * NOTE: 写真とリンクはプレースホルダ。実データに差し替える際はここだけ更新すればよい。
 * 先頭 2 名が Leader（16:9・2 列）、残りが Staff（4:3・3 列）として組まれる。
 */
export const membersContent = {
  heading: { title: "運営メンバー", label: "MEMBERS" },
  /** Leader として大きく扱う人数 */
  leaderCount: 2,
  members: [
    {
      id: "tanaka",
      name: "田中 太郎",
      role: "代表",
      bio: "ChoTechの立ち上げメンバー。コミュニティの運営全体をリードしています。",
      socials: [
        { kind: "x", href: "https://x.com/" },
        { kind: "github", href: "https://github.com/" },
        { kind: "website", href: "https://example.com/" },
      ],
    },
    {
      id: "sato",
      name: "佐藤 花子",
      role: "副代表",
      bio: "デザインとフロントエンドが好き。イベントの企画・運営もサポートしています。",
      socials: [
        { kind: "x", href: "https://x.com/" },
        { kind: "instagram", href: "https://www.instagram.com/" },
      ],
    },
    {
      id: "suzuki",
      name: "鈴木 一郎",
      role: "Tech Lead",
      bio: "バックエンドとインフラ担当。勉強会の技術面を支えています。",
      socials: [
        { kind: "github", href: "https://github.com/" },
        { kind: "website", href: "https://example.com/" },
      ],
    },
    {
      id: "yamada",
      name: "山田 美咲",
      role: "広報",
      bio: "SNS運営とイベント告知担当。ChoTechの魅力を発信しています。",
      socials: [
        { kind: "x", href: "https://x.com/" },
        { kind: "instagram", href: "https://www.instagram.com/" },
      ],
    },
    {
      id: "takahashi",
      name: "高橋 健太",
      role: "イベント",
      bio: "ハッカソンや勉強会の企画・運営担当。楽しく学べる場をつくります。",
      socials: [{ kind: "x", href: "https://x.com/" }],
    },
  ] satisfies Member[],
} as const;
