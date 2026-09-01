import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { reactionIcons } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Chip（§6.4）
 *
 * Activity のキーワードと Chat のリアクションを同じ 24px の装置で表す。
 * 非インタラクティブなので状態を持たない（hover / focus / press はどれも無い）。
 * 枠は付けない — 塗りそのものが境界で、1px 線は「行・語の仕切り」の語彙に温存する（R2）。
 * 高さは min-height で渡す。200% ズームで中身が切れないようにするため（§3.5）。
 */
const chip = cva(
  "inline-flex min-h-chip items-center gap-inline-icon rounded-none px-inset-xs text-caption",
  {
    variants: {
      tone: {
        /* 面 vs 地 1.10 — 罫線なしに輪郭が読める最小段 */
        neutral: "bg-chip-fill text-chip-ink",
        /* ライブラリのみ。ページには出さない（K-5） */
        accent: "bg-accent-subtle text-on-accent-subtle",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

/* 素の要素は span。li で出す場合も属性集合は span の上位互換なのでこれで足りる */
export interface ChipProps
  extends ComponentProps<"span">,
    VariantProps<typeof chip> {
  /** Tag は `<ul aria-label="キーワード">` の子なので li でも出せるようにする（§6.4） */
  as?: "span" | "li";
}

/** Tag — キーワードを 1 語だけ入れる（Caption/Regular 12） */
export function Chip({
  as: Component = "span",
  tone,
  className,
  ...props
}: ChipProps) {
  // span と li は同じ属性集合を取り、違うのは ref の要素型だけ。
  // Rule の hr / div と同じく交差型に絞って両方に渡せるようにする
  const rest = props as ComponentProps<"span"> & ComponentProps<"li">;

  return <Component className={cn(chip({ tone }), className)} {...rest} />;
}

export type ReactionIconName = keyof typeof reactionIcons;

export interface ReactionChipProps
  extends Omit<ChipProps, "children" | "role"> {
  icon: ReactionIconName;
  /** content が文字列で持つのでそのまま受ける */
  count: string;
  /** 読み上げ名の前半。「いいね 3」のように count と連結する（§6.4） */
  label: string;
}

/**
 * Reaction — 16 アイコン + 数字。
 * 中身は絵ではなく「いいね 3」という一つの像なので、外側だけを role="img" で名付け、
 * svg と数字は presentational に落とす（role="img" の子孫は自動でそうなる）。
 */
export function ReactionChip({
  icon,
  count,
  label,
  tone,
  className,
  ...props
}: ReactionChipProps) {
  const Icon = reactionIcons[icon];

  return (
    <Chip
      aria-label={`${label} ${count}`}
      className={className}
      role="img"
      tone={tone}
      {...props}
    >
      <Icon className="size-icon-sm" />
      {/* 数字だけは chip/ink ではなく ink。小さい数字は面に対して最大の比が要る */}
      <span className="text-caption-bold text-ink">{count}</span>
    </Chip>
  );
}
