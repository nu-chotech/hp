import type { SocialBrand } from "@/config/site";

/** カードに並べる導線。個人サイトは website（外部リンクアイコン） */
export type MemberSocialKind = SocialBrand | "website";

export interface MemberSocial {
  kind: MemberSocialKind;
  href: string;
}

export interface Member {
  id: string;
  /** 姓 名（分かち書き 1 つ）。氏名が確定していない間は姓だけを置く */
  name: string;
  role: string;
  /** 1〜2 行の紹介 */
  bio: string;
  /**
   * 顔写真。無い間は ImageSlot の placeholder が出る（§6.19）。
   * alt は member-card 側が空で固定する — 氏名がすぐ隣にある（§8.6）。
   */
  photo?: string;
  /** 最大 3 件。無い場合は行ごと落とす（DECISION U-12） */
  socials: readonly MemberSocial[];
}

/**
 * 運営メンバー（§6.15）
 *
 * 先頭 2 名が Leader（16:9・2 列）、残りが Staff（4:3・3 列）として組まれる。
 *
 * 出典と確からしさが 3 段に分かれている。混ぜると「どこまで本物か」が読めなくなるので、
 * 行ごとに区別して持つ:
 *
 *   確定 … bio は Issue #9–12 本文、上原は ut42tech.com。GitHub は Issue の起票者
 *   未定 … **氏名**。Issue にもプロフィールにも姓しか無いので姓だけ置く。
 *          名が分かった時点で「姓 名」に直す（§6.15 の name は分かち書き 1 つ）
 *   仮   … **役職**と**顔写真**。代表 / 副代表だけは確定で、残り 3 名の役職は
 *          本人の関心（3D・イベント企画・デザイン）から当てた仮。写真は Unsplash 由来の
 *          プレースホルダで、実体は public/images/members/<id>.jpg に保存してある
 *
 * Issue #8（上原）は本文が空のままなので、bio は本人サイト ut42tech.com から取った。
 */
export const membersContent = {
  heading: { title: "運営メンバー", label: "MEMBERS" },
  /** Leader として大きく扱う人数 */
  leaderCount: 2,
  members: [
    {
      id: "takuya",
      name: "Takuya Uehara",
      role: "代表",
      bio: "長崎大学 修士1年。デザインとテクノロジーを横断したアプリの開発が得意です。ハッカソンに積極的に参加したり、技術を起点として様々なことに挑戦しています。",
      photo: "/images/members/uehara.jpg",
      socials: [
        { kind: "x", href: "https://x.com/ut42tech" },
        { kind: "github", href: "https://github.com/ut42tech" },
        { kind: "website", href: "https://ut42tech.com" },
      ],
    },
    {
      id: "ibuki",
      name: "Ibuki Nishiyama",
      role: "副代表",
      bio: "長崎大学 修士1年。データ分析やAIを活用したサービス開発に取り組んでいます。ユーザーの課題を起点に、データから得た気づきを役立つ仕組みへ。",
      photo: "/images/members/nishiyama.jpg",
      socials: [
        { kind: "x", href: "https://x.com/YiIbuki34" },
        { kind: "github", href: "https://github.com/nikkiy30" },
        { kind: "website", href: "https://roaring-puppy-a0e0d5.netlify.app" },
      ],
    },
    {
      id: "yuinosuke",
      name: "Yuinosuke Miyazaki",
      role: "運営",
      bio: "長崎大学 修士1年。Discord運営・イベント企画担当。研究ではPythonでのデータ解析や音響信号処理に取り組んでいます。",
      photo: "/images/members/miyazaki.jpg",
      socials: [{ kind: "github", href: "https://github.com/yuinosuke92" }],
    },
    {
      id: "nao",
      name: "Nao Mukai",
      role: "運営",
      bio: "長崎大学 修士1年。広報活動担当。3D Gaussian Splattingの絶対スケール復元を研究。3Dモデリングとデザインも独学で学んでいます。",
      photo: "/images/members/mukai.jpg",
      socials: [
        { kind: "github", href: "https://github.com/mk-no" },
        {
          kind: "website",
          href: "https://my-portfolio-opal-seven-72.vercel.app",
        },
      ],
    },
    {
      id: "shintaro",
      name: "Shintaro Makiyama",
      role: "運営",
      bio: "長崎大学 修士1年。ピラミッドや旧日系人収容所などの遺産をITで読み解き、後世に残す研究を行っています。",
      photo: "/images/members/makiyama.jpg",
      socials: [{ kind: "github", href: "https://github.com/shin3akiyama" }],
    },
  ] satisfies Member[],
} as const;
