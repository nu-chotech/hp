import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * 罫線グリッド（§3.8、§6.11.1）
 *
 * 罫は「線」ではなく「地」で描く。frame の背景に divider を敷き、padding 2 と gap 2 の
 * 隙間からそれが覗く（DECISION L-9）。border を使わないのは、外枠と内側の線が同じ 1 つの
 * トークンから出ることを構造的に保証するため — Figma の frame fill + itemSpacing と
 * CSS の background + gap が同じ構造になり、二重線や濃度差が生じる余地がなくなる。
 *
 * 列数の中間段（tablet の 2 列）は spec が定義しない実装上の判断である。spec は
 * Desktop 1440 / Mobile 390 の 2 フレームしか持たないが、ブラウザ幅は連続なので中間を
 * 決めなければならない。DECISION L-10 が退けたのは「列数」ではなくセル内容 128px
 * （Body S で 9 字）であって、和文の最小行長（≈20 字 ≈ セル幅 168px）を満たす限り
 * 中間段は置いてよい。768px の 2 列はセル内容 ≈320px = 22 字で閾値を満たす。
 * 設計どおりの列数（bento 4 / persona・staff 3 / leader 2 / partner 6）は desktop から。
 *
 * 例外は partner の 6 列。正方形のロゴタイルは文字を運ばないので、和文の最小行長の
 * 制約を受けない。Mobile で 1 列にすると 342px 角のタイルが 6 枚縦に積まれるため、
 * ここだけ Mobile 2 列 / tablet 3 列に開く（DECISION L-31）。DOM 順は保たれる。
 */
const ruledGrid = cva(
  [
    "grid bg-divider gap-rule p-rule",
    // 行の単位高は size/cell-min 120。行は内容で伸び、同じ行のセルは最も高いセルに揃う
    "auto-rows-[minmax(var(--size-cell-min),auto)]",
  ],
  {
    variants: {
      /** Desktop の列数。tablet 未満は 1 列（DOM 順、span は列方向にだけ効く）。6 だけ Mobile 2 / tablet 3（L-31） */
      columns: {
        2: "grid-cols-1 tablet:grid-cols-2",
        3: "grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3",
        4: "grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4",
        6: "grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-6",
      },
      /**
       * 直前の罫線グリッドに連結する（staff が leader の直下に来る場合）。
       * 上枠を落として上のグリッドの下枠を共有する — 2px 罫を 2 本重ねない（§3.8、§4.3-4）。
       * 連結する側は直前の兄弟であり、間にマージンを置かないこと。
       */
      joinTop: {
        true: "pt-0",
        false: "",
      },
    },
    defaultVariants: {
      joinTop: false,
    },
  },
);

export interface RuledGridProps
  extends ComponentProps<"div">,
    Omit<VariantProps<typeof ruledGrid>, "columns"> {
  /** Desktop の列数。bento 4 / persona・staff 3 / leader 2 / partner 6（正方形タイル） */
  columns: 2 | 3 | 4 | 6;
  /** <ul> や <section> として組みたいときに、子要素へスタイルを委譲する */
  asChild?: boolean;
}

export function RuledGrid({
  className,
  columns,
  joinTop,
  asChild = false,
  ...props
}: RuledGridProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(ruledGrid({ columns, joinTop }), className)}
      {...props}
    />
  );
}

/**
 * 罫線グリッドのセル。
 *
 * セル自身が面を塗り、その隙間が罫線になる。したがってセルに枠線は無い。
 * 強制配色（forced-colors）では background が落ちて罫がすべて消えるので、そこでだけ
 * 1px の枠を補う（globals.css の §7 が「構造を持つコンポーネント側で行う」と定めた分）。
 */
const cell = cva(
  [
    // 縦 flex が既定。セル内容は margin-top:auto や space-between で下端に寄せる（§6.11.2、§6.11.4）
    "flex flex-col",
    // grid item の既定 min-width:auto を切る。長い和文や URL がセルを押し広げて列幅を壊すため
    "min-w-0",
    "forced-colors:border",
  ],
  {
    variants: {
      surface: {
        ground: "bg-ground text-ink",
        // on-ink は反転地で細いウェイトが滲むのを止める（§2.8）
        ink: "on-ink bg-inverse-ground text-inverse-ink",
      },
      /** 画像セルは inset 0 で Image slot を縁まで敷く（§6.11.5）、member card も写真が縁に触れる */
      inset: {
        cell: "p-inset-cell",
        none: "p-0",
      },
      /**
       * 横 span。tablet 以上でだけ効く（tablet の 2 列でも「行いっぱい」として意味を保つ）。
       * min-width 系のバリアントなので desktop にもそのまま継承される。
       */
      colSpan: {
        1: "",
        2: "tablet:col-span-2",
      },
      /**
       * 縦 span。desktop でのみ効く。tablet の 2 列は 1 セル = 1 行に畳まれた状態で、
       * そこに行またぎを持ち込むと DOM 順と視覚順がずれるため。
       */
      rowSpan: {
        1: "",
        2: "desktop:row-span-2",
      },
    },
    defaultVariants: {
      surface: "ground",
      inset: "cell",
      colSpan: 1,
      rowSpan: 1,
    },
  },
);

export interface CellProps
  extends ComponentProps<"div">,
    VariantProps<typeof cell> {
  /** <li> や <article> として組みたいときに、子要素へスタイルを委譲する */
  asChild?: boolean;
}

export function Cell({
  className,
  surface = "ground",
  inset,
  colSpan,
  rowSpan,
  asChild = false,
  ...props
}: CellProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      // 面の宣言。::selection とフォーカスリングの色はこの属性から降りてくるので、
      // インクセルの中の部品は自分でリング色を持たない（globals.css @layer base）
      data-surface={surface === "ink" ? "ink" : undefined}
      className={cn(cell({ surface, inset, colSpan, rowSpan }), className)}
      {...props}
    />
  );
}
