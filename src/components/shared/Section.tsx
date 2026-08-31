import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * 背景トーン
 *
 * 隣り合うセクションで `default` と `muted` を交互に切り替え、境界を保つ。
 * 現在の並び: Hero(暗) → About(muted) → Activities → Members(muted) → Recruit → Footer(muted)
 * セクションを追加・削除したら、この交互が崩れていないか page.tsx で確認すること。
 */
type SectionTone = "default" | "muted";

const toneClassName: Record<SectionTone, string> = {
  default: "",
  muted: "bg-muted/50",
};

interface SectionProps extends ComponentProps<"section"> {
  /** ナビゲーションのアンカー先になる id */
  id: string;
  tone?: SectionTone;
}

/**
 * ページセクションの共通骨格 (縦余白・背景・横幅コンテナ)
 */
export function Section({
  id,
  tone = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20", toneClassName[tone], className)}
      {...props}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
