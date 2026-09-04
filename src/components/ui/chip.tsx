import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { RollingNumber } from "@/components/ui/rolling-number";
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
        /* ink 面の上。面は ground@12（hover tint と同じ段）、文字は inverse/ink-secondary（U-29） */
        inverse: "bg-inverse-chip-fill text-inverse-chip-ink",
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

export interface ReactionChipProps
  extends Omit<ChipProps, "children" | "role"> {
  /** 実際の絵文字 1 文字（👍 / 👀）。Discord のリアクションを写す絵なのでアイコンに置き換えない（DECISION U-25） */
  emoji: string;
  /** 表示する数。再生中は chat 側が 1 から目標値まで 1 ずつ上げて渡す（§6.12.2） */
  count: number;
  /** 読み上げ名の前半。「いいね 3」のように finalCount と連結する（§6.4） */
  label: string;
  /** 読み上げに渡す最終値。省略時は count。巻き上げの途中経過を読み上げさせない */
  finalCount?: number;
}

/**
 * Reaction — 絵文字 + 数字。
 * 中身は絵ではなく「いいね 3」という一つの像なので、外側だけを role="img" で名付け、
 * 絵文字と数字は presentational に落とす（role="img" の子孫は自動でそうなる）。
 * 数字は RollingNumber が持ち、値が変わるたび下から巻き上がる。
 */
export function ReactionChip({
  emoji,
  count,
  label,
  finalCount = count,
  tone,
  className,
  ...props
}: ReactionChipProps) {
  return (
    <Chip
      aria-label={`${label} ${finalCount}`}
      className={className}
      role="img"
      tone={tone}
      {...props}
    >
      {/* 絵文字は 16 相当。Caption の行ボックス 18 に収め、チップ高 24 を崩さない */}
      <span className="text-[1rem] leading-[1.125rem]">{emoji}</span>
      {/* 数字だけは chip/ink ではなく ink。小さい数字は面に対して最大の比が要る */}
      <RollingNumber className="text-caption-bold text-ink" value={count} />
    </Chip>
  );
}
