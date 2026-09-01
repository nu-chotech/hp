import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type { ComponentProps, ComponentType, MouseEvent } from "react";
import type { IconProps } from "@/components/icons";
import {
  colorTransition,
  inverseStateTint,
  stateTint,
} from "@/components/ui/interaction";
import { cn } from "@/lib/utils";

/**
 * Button（§6.2）
 *
 * 行動を起こす唯一の「面」。高さ駆動（`size/control/*`）で、境界は border ではなく
 * inset の box-shadow で描く — border だと 1px ぶん内容ボックスが縮み、Solid と
 * Outline で同じ高さトークンを使っても行が揃わなくなる（§6.2.1）。
 *
 * 配色は「地 × スタイル」の同時関数なので surface と variant の compoundVariants で持つ。
 * フォーカスリングはここでは宣言しない: globals.css の `:focus-visible` が
 * 祖先の `data-surface` を見て 3 つのリング色を出し分ける（§4.5 / DECISION L-14）。
 * だからこのボタン自身に `data-surface` を付けてはならない — 付けると
 * `[data-surface="ink"] :focus-visible` の子孫結合子から外れて ground のリングに戻る。
 *
 * ページ上の CTA はすべてリンクなので、実運用の主経路は `asChild` + `<a>`。
 * `<a>` は @layer base で下線が既定なので、base に `no-underline` を必ず含める。
 */

const buttonVariants = cva(
  [
    // 左揃え（G13 / DECISION L-3）。ラベルと矢印を 1 語として読ませるため、
    // fullWidth でも矢印を右端に送らない（justify-start のまま）。
    "relative inline-flex items-center justify-start gap-inline-xs text-left align-middle",
    // ラベルは 1 行固定（§6.2.1 / §6.2.5）。Label ロール側にも nowrap はあるが、
    // ボタンの解剖表が要求する性質なのでここで明示する。
    "whitespace-nowrap rounded-none no-underline",
    // G1: 応答は pointer-down で。独自 Pressed に置き換えるので OS のハイライトは消す。
    "cursor-pointer touch-manipulation [-webkit-tap-highlight-color:transparent]",
    // G6（§4.5）。outline は状態で色が変わらないので、transition-colors に
    // 含まれていても実質 duration/0 のまま。
    colorTransition,
    // G5: Disabled はタブ順に残したまま見た目だけ落とす。
    "aria-disabled:cursor-default aria-disabled:opacity-(--opacity-disabled)",
  ],
  {
    variants: {
      // 配色は下の compoundVariants が持つ。ここは軸の宣言だけ。
      surface: { ground: "", ink: "", poster: "" },
      variant: { solid: "", outline: "", ghost: "", accent: "" },
      size: {
        // sm はポインタ専用（§6.1.5）。44 が要る場所では md を選ぶこと。
        // 箱は 36 のまま ::before で 44 に広げる（§6.1.5 / §8.3 の Nav CTA・Skip link）。
        // ±4 なので隣接 gap inline/md 16 のうち 8 が残り、隣の当たり判定と重ならない。
        sm: "min-h-control-sm px-inset-md text-label-s before:absolute before:-inset-1",
        md: "min-h-control-md px-inset-control text-label-m",
      },
      fullWidth: { true: "w-full", false: "" },
    },
    compoundVariants: [
      /* --- 地 = ground -------------------------------------------------- */
      {
        surface: "ground",
        variant: "solid",
        // Ink solid。ページの ground 地ボタンはこれだけ（Nav CTA・Menu CTA・Skip link）。
        class: [
          "bg-action-fill text-action-ink",
          "hover:bg-action-fill-hover active:bg-action-fill-pressed",
        ],
      },
      {
        surface: "ground",
        variant: "accent",
        // ライブラリ専用。DECISION K-5 によりページには置かない
        // （lime-400 の面は地に対し 1.37 で輪郭が読めない、C-25）。
        class: [
          "bg-accent text-on-accent",
          "hover:bg-accent-hover active:bg-accent-pressed",
        ],
      },
      {
        surface: "ground",
        variant: "outline",
        // ライブラリ専用（K-5）。枠だけがボタンを識別する情報なので divider ではなく
        // currentColor = ink を使い、非テキスト 3:1 を満たす（DECISION K-2）。
        class: ["inset-ring inset-ring-current text-ink", stateTint],
      },
      {
        surface: "ground",
        variant: "ghost",
        // ライブラリ専用（K-5）。ラベルは ink 固定（R21）。
        class: ["text-ink", stateTint],
      },

      /* --- 地 = ink ----------------------------------------------------- */
      {
        surface: "ink",
        variant: "solid",
        class: [
          "bg-inverse-action-fill text-inverse-action-ink",
          "hover:bg-inverse-action-fill-hover active:bg-inverse-action-fill-pressed",
        ],
      },
      {
        surface: "ink",
        variant: "outline",
        // Outline はインク面専用。同じ面に主ボタンがあるときの副次（Hero 副・Bento CTA）。
        class: [
          "inset-ring inset-ring-inverse-outline text-inverse-ink",
          inverseStateTint,
        ],
      },

      /* --- 地 = poster -------------------------------------------------- */
      {
        surface: "poster",
        variant: "solid",
        // ポスター面は明度が反転しうるので、ホバー・プレスまで専用ロールを通す
        // （DECISION C-28）。汎用 action/fill-hover を直接引くと Mono で反転しない。
        class: [
          "bg-poster-action-fill text-poster-action-ink",
          "hover:bg-poster-action-fill-hover active:bg-poster-action-fill-pressed",
        ],
      },
    ],
    defaultVariants: {
      surface: "ground",
      variant: "solid",
      size: "md",
      fullWidth: false,
    },
  },
);

/**
 * 末尾アイコンの径は §5.2 の 1 か所ルール（sm 36 → 16、md 44 → 20）。
 * Tabler の size 属性ではなくクラスで与える — トークン（--icon-sm/md）に繋ぐため。
 */
const buttonIconVariants = cva("shrink-0", {
  variants: {
    size: { sm: "size-icon-sm", md: "size-icon-md" },
  },
  defaultVariants: { size: "md" },
});

/**
 * 地とスタイルの組は §6.2.3 の表に載っているものだけを型で許す。
 * ポスター面に Outline を置くと枠・ラベルが 1.53 で読めない（§1.4.4）。
 */
type ButtonPaletteProps =
  | { surface?: "ground"; variant?: "solid" | "outline" | "ghost" | "accent" }
  | { surface: "ink"; variant?: "solid" | "outline" }
  | { surface: "poster"; variant?: "solid" };

type ButtonOwnProps = {
  size?: "sm" | "md";
  fullWidth?: boolean;
  /**
   * ラベル直後に置く末尾アイコン（§6.1.9）。外部 → `ArrowUpRight`、
   * サイト内 → `ArrowRight`、ページ内スクロールは渡さない。
   */
  icon?: ComponentType<IconProps>;
  /**
   * ラベル直前に置くブランドマーク（§6.1.9 / DECISION U-19）。
   * 末尾の矢印は「外部へ出る」と言うが「どこへ」は言わない。ロゴだけが読む前に
   * それを伝えるので、サービスへ出る導線に限ってここに置く。
   * 節の見出しや本文には置かないこと — 例外はこの用途に閉じている。
   */
  brand?: ComponentType<IconProps>;
};

export type ButtonProps = ComponentProps<"button"> &
  ButtonOwnProps &
  ButtonPaletteProps &
  // `<a>` は Disabled を持たない（href を外すとフォーカス不能になる、G5）。
  ({ asChild?: false } | { asChild: true; disabled?: never });

/**
 * Disabled の `<button>` は「存在するが無効」を伝えるためタブ順に残す（DECISION K-13）。
 * `disabled` 属性を使えないぶん、発火はここで止める（Enter / Space も click になる）。
 * この分岐に入るのはライブラリ用途だけで、ページ上のボタンはすべてリンク。
 */
function blockActivation(event: MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  event.stopPropagation();
}

export function Button({
  surface = "ground",
  variant = "solid",
  size = "md",
  fullWidth = false,
  icon: Icon,
  brand: Brand,
  asChild = false,
  className,
  children,
  disabled = false,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = !asChild && disabled;

  return (
    <Comp
      className={cn(
        buttonVariants({ surface, variant, size, fullWidth }),
        className,
      )}
      aria-disabled={isDisabled || undefined}
      onClick={isDisabled ? blockActivation : onClick}
      // type は `<button>` のためのもの。asChild で `<a>` に漏らさない。
      {...(asChild ? {} : { type })}
      {...props}
    >
      {/* ブランドマークはラベルの前。gap は container の inline/xs 8 が持つ */}
      {Brand ? <Brand className={buttonIconVariants({ size })} /> : null}
      {/* Slottable がないと、asChild のとき矢印が `<a>` の外に出てしまう */}
      <Slottable>{children}</Slottable>
      {Icon ? <Icon className={buttonIconVariants({ size })} /> : null}
    </Comp>
  );
}

export { buttonVariants };
