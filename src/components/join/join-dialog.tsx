import { ArrowUpRight, BrandDiscord } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Rule } from "@/components/ui/rule";
import { joinContent } from "@/content/join";
import { externalLinkNote, externalLinkProps } from "@/lib/external-link";
import { cn } from "@/lib/utils";

/** 見出しと説明の id（aria-labelledby / aria-describedby）。ダイアログは 1 つなので固定値 */
export const joinDialogIds = {
  title: "join-dialog-title",
  lead: "join-dialog-lead",
  rules: "join-dialog-rules",
} as const;

/**
 * 参加ダイアログの中身（§6.21、DECISION U-49）
 *
 * サーバで描く。題（Title/2）→ 導入（Body/S、ink-secondary）→ 約束の行（hairline 区切り、
 * Subheadline + Footnote）→ 行動 2 つ。主は Discord の「同意して参加する」（= 外部リンク。
 * 同意はこのボタンを押すことそのもの）、副は Ground / Outline の「閉じる」。
 * 閉じるは <form method="dialog"> の submit で、JS を介さずダイアログを閉じる。
 * 縦リズム: 題 → 導入 stack/md 16、導入 → 約束 stack/lg 24（導入 → グリッド）、
 * 約束 → 行動 stack/xl 32（Hero の段落 → 行動と同じ）。
 */
export function JoinDialog() {
  const { title, lead, rules, agree, close } = joinContent;

  return (
    <div className="p-inset-cell">
      <h2 id={joinDialogIds.title} className="text-ink text-title-2">
        {title}
      </h2>
      <p
        id={joinDialogIds.lead}
        className="mt-stack-md text-body-s text-ink-secondary"
      >
        {lead}
      </p>

      {/* 行の仕切りは 1px hairline（構成要素の内部、§4.2）。先頭の上と末尾の下に
          余白を持たせないのは、導入と行動との距離を stack/* だけで決めるため */}
      {/* biome-ignore lint/a11y/noRedundantRoles: preflight の list-style: none で Safari が暗黙の list ロールを外すため明示が要る */}
      {/* biome-ignore lint/a11y/useSemanticElements: 既に ul。意味づけを戻しているだけで置換先の要素は無い */}
      <ul id={joinDialogIds.rules} role="list" className="mt-stack-lg">
        {rules.map((rule, index) => (
          <li key={rule.title}>
            {index > 0 ? <Rule weight="hair" tone="hairline" /> : null}
            <div
              className={cn(
                index > 0 && "pt-inset-sm",
                index < rules.length - 1 && "pb-inset-sm",
              )}
            >
              <p className="text-ink text-subheadline">{rule.title}</p>
              <p className="mt-stack-2xs text-footnote text-ink-secondary">
                {rule.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Mobile は縦に積んで全幅、tablet 以降は横並び（201 + 12 + 91 = 304 ≤ 432）。
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
          <a href={agree.href} {...externalLinkProps}>
            {agree.label}
            <span className="sr-only">{externalLinkNote}</span>
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
