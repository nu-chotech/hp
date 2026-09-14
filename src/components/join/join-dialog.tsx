import { ArrowUpRight, BrandDiscord } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { joinContent } from "@/content/join";
import { externalLinkNote, externalLinkProps } from "@/lib/external-link";

/** 見出しと説明の id（aria-labelledby / aria-describedby）。ダイアログは 1 つなので固定値 */
export const joinDialogIds = {
  title: "join-dialog-title",
  lead: "join-dialog-lead",
} as const;

/**
 * 参加ダイアログの中身（§6.21、DECISION U-49 → U-54）
 *
 * サーバで描く。題（Title/2「学生ですか？」）→ 導入（Body/S、ink-secondary）→ 行動 2 つ。
 * 主は Discord の「学生として参加する」（= 外部リンク。押すことが学生であることの表明）、
 * 副は Ground / Outline の「閉じる」（<form method="dialog"> の submit、JS を介さず閉じる）。
 * 約束の行は無い（U-54: 確認は 1 問で足りる。並べる規範があるなら置き場は Discord のルール
 * チャンネル）。縦リズム: 題 → 導入 stack/md 16、導入 → 行動 stack/xl 32 の 2 種だけ（§3.3）。
 * 高さ: Desktop 216（24 + 28 + 16 + 48 + 32 + 44 + 24）/ Mobile 288。
 */
export function JoinDialog() {
  const { title, lead, join, close } = joinContent;

  return (
    <div className="p-inset-cell">
      <h2 id={joinDialogIds.title} className="text-ink text-title-2">
        {title}
      </h2>
      {/* 各塊を nowrap で描き、折返しを文節の境目に限る（join.ts のコメント） */}
      <p
        id={joinDialogIds.lead}
        className="mt-stack-md text-body-s text-ink-secondary"
      >
        {lead.map((chunk) => (
          <span className="whitespace-nowrap" key={chunk}>
            {chunk}
          </span>
        ))}
      </p>

      {/* Mobile は縦に積んで全幅、tablet 以降は横並び（231 + 12 + 85 = 328 ≤ 432）。
          主が先 — 左揃えの原則（L-3）で、読む順と押す順を同じにする */}
      <div className="mt-stack-xl flex flex-col gap-stack-sm tablet:flex-row tablet:items-center tablet:gap-inline-sm">
        <Button
          asChild
          variant="discord"
          brand={BrandDiscord}
          icon={ArrowUpRight}
          fullWidth
          className="tablet:w-auto"
        >
          <a href={join.href} {...externalLinkProps}>
            {join.label}
            {/* 可視の文に Discord の名が無くなったので、読み上げ名で行き先を言う（U-54） */}
            <span className="sr-only">Discordへ{externalLinkNote}</span>
          </a>
        </Button>
        <form method="dialog" className="contents">
          <Button
            variant="outline"
            type="submit"
            fullWidth
            className="tablet:w-auto"
          >
            {close.label}
          </Button>
        </form>
      </div>
    </div>
  );
}
