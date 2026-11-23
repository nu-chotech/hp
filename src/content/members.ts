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
 *   確定 … bio は Issue #9–12 本文、上原は ut42tech.com。GitHub は Issue の起票者。
 *          宮崎の担当と最近の開発は 2026-11-23 にクライアントから。長さは 3 人とも上原（全角 84.5）に
 *          揃え、3 列に並ぶ段で行数が同じになる長さにしてある
 *   未定 … **氏名**。Issue にもプロフィールにも姓しか無いので姓だけ置く。
 *          名が分かった時点で「姓 名」に直す（§6.15 の name は分かち書き 1 つ）
 *   仮   … **役職**。代表 / 副代表だけは確定で、残りの役職は本人の関心から当てた仮。
 *          顔写真は 2026-11-23 に全員ぶんが本人の写真に揃った（public/images/members/<id>.jpg）
 *
 * Issue #8（上原）は本文が空のままなので、bio は本人サイト ut42tech.com から取った。
 */
export const membersContent = {
  // 欧文ラベルは ORGANIZERS（2026-11-24）。MEMBERS は About の「MEMBERS 70+」（コミュニティ全体の
  // 人数）と同じ語で、運営 3 人の節と取り違えうる。節の id は外部リンクのため `members` のまま
  heading: { title: "運営メンバー", label: "ORGANIZERS" },
  /** Leader として大きく扱う人数 */
  leaderCount: 2,
  /**
   * Staff の顔写真を出すか。
   *
   * 2026-09-07 から本人の写真が揃うまで false（写真なしのカード）で組んでいたが、
   * 2026-11-23 に Staff（運営 1 名）の写真が本人のものに揃ったので true に戻した（§6.15）。
   * 写真が未確定の人が増えたら、ここを false にすると写真枠ごと落ちる。
   */
  showStaffPhotos: true,
  members: [
    {
      id: "takuya",
      name: "Takuya Uehara",
      role: "代表",
      bio: "長崎大学大学院 瀬戸崎研究室 修士1年。デザインとテクノロジーを横断したアプリの開発が得意です。ハッカソンに積極的に参加したり、技術を起点として様々なことに挑戦しています。",
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
      bio: "長崎大学大学院 神山研究室 修士1年。データ分析やAIを活用したサービス開発に取り組んでいます。ユーザーの課題を起点に、データから得た気づきを実際に役立つ仕組みへ。",
      photo: "/images/members/nishiyama.jpg",
      socials: [
        { kind: "x", href: "https://x.com/YiIbuki34/" },
        { kind: "github", href: "https://github.com/nikkiy30/" },
        { kind: "website", href: "https://portfolio.nikkiy.workers.dev/" },
      ],
    },
    {
      id: "yuinosuke",
      name: "Yuinosuke Miyazaki",
      role: "運営",
      bio: "長崎大学大学院 喜安研究室 修士1年。イベント企画・運営担当。研究では音響信号処理に取り組みつつ、最近はWebアプリやDiscord Botの開発で役立つツールを作っています。",
      photo: "/images/members/miyazaki.jpg",
      socials: [{ kind: "github", href: "https://github.com/yuinosuke92" }],
    },
  ] satisfies Member[],
} as const;
