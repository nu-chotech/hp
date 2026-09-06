import { cva } from "class-variance-authority";
import { brandIcons } from "@/components/icons";
import { ImageSlot } from "@/components/ui/image-slot";
import { Cell } from "@/components/ui/ruled-grid";
import type { Member, MemberSocialKind } from "@/content/members";
import { cn } from "@/lib/utils";

/**
 * Member card（§6.15）
 *
 * Leader と Staff の差は **写真比・body inset・name・bio の 4 点**だけ（Socials は共通）。
 * だから 2 つの部品には割らず、1 つの部品の size バリアントにしてある — 差が 4 点に
 * 閉じていることが型で見えるほうが、Leader と Staff が別々に育つのを防げる。
 *
 * カード自体はリンクではない。押せるのは Socials の各アイコンだけで、カードの面は
 * 状態を持たない（§6.15「カード自体はリンクではない」）。
 */

/** 写真の比率は size が決める（§6.15 / §5.7.2）。Leader 16:9、Staff 4:3 */
const PHOTO_RATIO = { leader: "16:9", staff: "4:3" } as const;

/**
 * next/image への移行時にそのまま持ち上がる sizes。
 * Leader は Desktop 2 列（597）、Staff は 3 列（397）、tablet は 2 列、Mobile は 1 列。
 */
const PHOTO_SIZES = {
  leader: "(min-width: 78rem) 597px, (min-width: 48rem) 50vw, 100vw",
  staff: "(min-width: 78rem) 397px, (min-width: 48rem) 50vw, 100vw",
} as const;

const cardBody = cva("flex flex-1 flex-col", {
  variants: {
    size: {
      leader: "p-inset-cell",
      staff: "p-inset-md",
    },
  },
  defaultVariants: { size: "leader" },
});

const cardName = cva("text-ink", {
  variants: {
    size: { leader: "text-title-2", staff: "text-headline" },
  },
  defaultVariants: { size: "leader" },
});

const cardBio = cva("mt-stack-xs text-ink-secondary", {
  variants: {
    size: { leader: "text-footnote", staff: "text-caption" },
  },
  defaultVariants: { size: "leader" },
});

/**
 * 役職を欧文として組んでよいかの判定（§2.3.2 Members 行 / §2.7 / §6.15）。
 *
 * 役職のロールは文字種で分かれる: 欧文は Overline/Latin（UPPER・+12%）で「TECH LEAD」、
 * 和文は Overline/JP（ORIGINAL・+6%）で「代表」。members.ts は両方を素の文字列で
 * 持っており、どちらの組版を当てるかを content 側は語らないので、判定はここに置く。
 * 全字がラテン文字・数字・記号・空白なら欧文 — 一字でも和文が混じれば JP に倒す。
 */
const LATIN_ROLE = /^[\p{Script=Latin}\p{Nd}\p{P}\s]+$/u;

const socialsRow = cva("mt-stack-xs flex flex-wrap", {
  variants: {
    size: { leader: "gap-inline-md", staff: "gap-inline-sm" },
  },
  defaultVariants: { size: "leader" },
});

/**
 * 読み上げ用の行き先名。アイコンだけでは「X」が 5 枚並んで区別できないので、
 * ここで得た語を人名と組んでアクセシブルネームにする（DECISION U-12）。
 */
const SOCIAL_LABELS: Record<MemberSocialKind, string> = {
  x: "X",
  instagram: "Instagram",
  github: "GitHub",
  website: "個人サイト",
};

export interface MemberCardProps {
  member: Member;
  /** Leader は先頭 2 名（membersContent.leaderCount）。差は写真比・inset・name・bio の 4 点 */
  size: "leader" | "staff";
  /**
   * 写真枠ごと落とすか（Figma の `showSocials` と同じ BOOL の扱い）。
   * 既定 true。false のときは placeholder も出さず、body がセルの上端から始まる。
   * 写真が未確定のあいだ Staff を写真なしで組むための暫定スイッチで、
   * member.photo（パス）には触れない — content 側の値を残したまま表示だけを止める。
   */
  showPhoto?: boolean;
}

export function MemberCard({
  member,
  size,
  showPhoto = true,
}: MemberCardProps) {
  return (
    // inset は body 側が持つ。写真はセルの縁に触れる（§6.15 の photo）
    <Cell asChild inset="none">
      <li>
        {/* 人物写真の alt は空。氏名がすぐ隣に可視テキストとしてあるので、
            読み上げに同じ名前を二度出さない（§8.6）。focal は顔が上 1/3 に来る前提。
            alt を content 側に持たせないのは、この判断が「人物写真である」ことから
            一意に決まるからで、5 人ぶんの空文字列を書き写す余地を残さない */}
        {!showPhoto ? null : member.photo ? (
          <ImageSlot
            ratio={PHOTO_RATIO[size]}
            focal="face"
            sizes={PHOTO_SIZES[size]}
            className="shrink-0"
            src={member.photo}
            alt=""
          />
        ) : (
          <ImageSlot
            ratio={PHOTO_RATIO[size]}
            focal="face"
            sizes={PHOTO_SIZES[size]}
            className="shrink-0"
          />
        )}

        <div className={cardBody({ size })}>
          {/* 肩書は和文と欧文が混在する（代表 / Tech Lead）。片方に寄せると、
              和文が大文字化規則に晒されるか、欧文が UPPER +12% を失うかのどちらかになる。
              §2.3.2 は Members の役職に 2 つのロールを並記しているので、文字種で選ぶ */}
          <p
            className={cn(
              "mb-stack-2xs text-ink-secondary",
              LATIN_ROLE.test(member.role)
                ? "text-overline"
                : "text-overline-jp",
            )}
          >
            {member.role}
          </p>
          <h3 className={cardName({ size })}>{member.name}</h3>
          <p className={cardBio({ size })}>{member.bio}</p>

          {/* 導線が無い人は行ごと落とす。空のアイコンや無効リンクは置かない（U-12） */}
          {member.socials.length > 0 ? (
            // biome-ignore lint/a11y/noRedundantRoles: Tailwind の preflight が list-style を none にするので、Safari / VoiceOver は ul から list ロールを外す。§8.5 が求める <ul> > <li> の読み上げを残すには明示が要る
            // biome-ignore lint/a11y/useSemanticElements: 要素はすでに <ul>。role は上の理由で重ねている
            <ul role="list" className={socialsRow({ size })}>
              {member.socials.map((social) => {
                const Icon = brandIcons[social.kind];
                return (
                  <li key={`${social.kind}:${social.href}`}>
                    <a
                      href={social.href}
                      // target="_blank" は付けない。新しいタブで開くかは読者が決める（§6.3.2）。
                      // arrow-up-right も足さない — ブランドアイコン自体が行き先を示す（U-12）
                      className={cn(
                        "relative inline-flex cursor-pointer text-ink no-underline",
                        // 可視 20 のまま hit area を 44 に広げる（20 + 12 × 2、§6.1.5）。
                        // ::before は箱を持たないのでカード内のレイアウトは動かない
                        "before:absolute before:-inset-3",
                        // アイコンだけのリンクに下線は引けず、文字色も動かさない（C-16）ので、
                        // 応答は ghost ボタンと同じティントで返す（§6.1.2 G2）
                        "hover:before:bg-state-hover-tint active:before:bg-state-pressed-tint",
                        "before:transition-colors before:ease-color before:duration-(--dur-2)",
                        "hover:before:duration-(--dur-1) active:before:duration-(--dur-0)",
                      )}
                    >
                      {/* ::before は position:absolute なので、そのままだとアイコンの上に乗る。
                          アイコン側も positioned にして DOM 順（::before → svg）で前に出す */}
                      <Icon className="relative size-icon-md" />
                      <span className="sr-only">
                        {member.name} の {SOCIAL_LABELS[social.kind]}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </li>
    </Cell>
  );
}
