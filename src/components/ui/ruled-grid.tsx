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
 * 列数の中間段は spec が定義しない実装上の判断である（DECISION L-34）。spec は
 * Desktop 1440 / Mobile 390 の 2 フレームしか持たないが、ブラウザ幅は連続なので中間を
 * 決めなければならない。DECISION L-10 が退けたのは「列数」ではなくセル内容 128px
 * （Body S で 9 字）であって、和文の最小行長（≈20 字 ≈ セル幅 168px）を満たす限り
 * 中間段は置いてよい。768px の 2 列はセル内容 ≈309px = 22 字で閾値を満たす。
 * 段は 3 つ: tablet 48rem（2 列）/ desktop 64rem（persona・staff 3、bento 3）/
 * wide 78rem（bento 4 = 12 列幾何）。1 / 2 / 3 列は DOM を変えず span だけで作る（疎な
 * auto-placement で読む順 = DOM 順が各段で保たれることを検算済み）。**wide の 4 列だけは
 * 明示配置**（`col-start` / `row-start`、DECISION L-37）— About の 6a は CULTURE 2×2 と
 * CHAT 1×3 が同じ行を跨いで噛み合う構図で、auto-placement では作れない。DOM 順（= Mobile の
 * 読み順）は変えないので、読み上げと Tab の順序は 4 段とも同じ。
 *
 * 6 列は partner のロゴタイル（L-31 / L-32）のために置いた段で、U-43 でタイルをやめて
 * からページでは使っていない（ライブラリに残置）。1 列は「外枠だけ」の使い方 — 内側の罫を
 * 持たない 1 セルの面（Partners のロゴ行、U-43）を、同じ 2px の frame で囲むためにある。
 */
const ruledGrid = cva(
  [
    "grid bg-divider gap-rule p-rule",
    // 行の単位高は size/cell-min 120。行は内容で伸び、同じ行のセルは最も高いセルに揃う
    "auto-rows-[minmax(var(--size-cell-min),auto)]",
  ],
  {
    variants: {
      /** Desktop の列数。tablet 未満は 1 列（DOM 順、span は列方向にだけ効く）。6 だけ Mobile 2 / tablet 3（L-31）。1 = 外枠だけ（U-43） */
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-1 tablet:grid-cols-2",
        3: "grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3",
        // ベント: 1 / 2 / 3 / 4 列。4 列は wide（1248）から — 1×1 の内側が 228 を超える最初の点
        4: "grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 wide:grid-cols-4",
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
  /** Desktop の列数。bento 4 / persona・staff 3 / leader 2 / 1 = 外枠だけ（partner のロゴ行、U-43）。6 はライブラリ */
  columns: 1 | 2 | 3 | 4 | 6;
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
        // ロゴの地（白）。白背景の素材（jpg / png）が ground の上で板として浮かないよう、
        // 面を素材の背景に合わせる（DECISION U-33）。パートナーのタイルとマーキー帯だけ
        logo: "bg-logo-ground text-ink",
        // on-ink は反転地で細いウェイトが滲むのを止める（§2.8）
        ink: "on-ink bg-inverse-ground text-inverse-ink",
      },
      /** 画像セルは inset 0 で Image slot を縁まで敷く（§6.11.5）、member card も写真が縁に触れる */
      inset: {
        cell: "p-inset-cell",
        none: "p-0",
      },
      /**
       * 横 span。段ごとに効く幅が違う（L-34 / L-37）:
       *   2: tablet から常に 2（ライブラリの基本形）
       *   2-until-wide: tablet から 2、wide では span を降ろす（CULTURE）
       *   2-tablet-only: tablet の 2 列でだけ 2（Staff の端数セル。空トラックを作らない、L-36）
       *   2-tablet-3-desktop: tablet で 2、desktop で行いっぱいの 3（OFFICIAL）
       *
       * `-until-wide` が `wide:col-span-1` ではなく **span 自体を止める**のは、wide の 4 列だけ
       * 疎な auto-placement をやめて `col-start` / `row-start` で明示的に置くため（About の 6a、
       * DECISION L-37）。`col-span-*` は `grid-column` の一括指定なので、同じ段で `col-start-*`
       * と重ねると宣言順で勝ち負けが決まってしまう。段ごとに「span か、明示配置か」を
       * 排他にしておけば、その曖昧さが構造的に起きない。
       */
      colSpan: {
        1: "",
        2: "tablet:col-span-2",
        "2-until-wide": "tablet:max-wide:col-span-2",
        "2-tablet-only": "tablet:max-desktop:col-span-2",
        "2-tablet-3-desktop":
          "tablet:max-desktop:col-span-2 desktop:max-wide:col-span-3",
      },
      /**
       * 縦 span。既定では desktop（3 列）から効く — tablet の 2 列に行またぎを持ち込むと、
       * 一般には DOM 順と視覚順がずれるため。`2-tablet-until-wide`（CHAT）はその例外で、
       * **その構図で読み順が保たれることを検算した上で**使う（L-37。2 列では
       * CULTURE 2×1 / MEMBERS · SINCE / CHAT + 写真 / (CHAT) + EVERYONE / FORMAT + 写真 /
       * OFFICIAL 2×1 と並び、行ごとの視覚順が DOM 順に一致する）。
       * wide で止めるのは横 span と同じ理由（L-37 の「span か、明示配置か」）。
       */
      rowSpan: {
        1: "",
        2: "desktop:row-span-2",
        "2-until-wide": "desktop:max-wide:row-span-2",
        "2-tablet-until-wide": "tablet:max-wide:row-span-2",
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

/**
 * Mobile の 1 列の中で 2 つのセルを 1 行に並べる（DECISION L-35）。
 *
 * 背景を持たない入れ子のグリッド。親の frame fill（divider）が gap 2 の隙間から覗くので、
 * 罫線のレシピ（L-9）はそのまま成立する。tablet からは display: contents で箱ごと消え、
 * 2 つの子は親グリッドの直接の item になる — 構図は親の span が決める。
 * 置けるのは本文を持たないセル（MEMBERS の `50+` / SINCE の `2025`）だけ: 168 のセルの
 * 内側 128 は L-10 の 20 字に足りない（L-31 と同じ理屈）。ラッパーに data-reveal や
 * フォーカスできる内容を置かないこと。
 *
 * U-55 の container query（`*:@container`）は U-56 で外した。SINCE は日付の題ではなく
 * Display/M の数字になり、段を選ぶのは viewport の clamp（§2.8）だけになったため。
 */
export function CellPair({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-rule auto-rows-[minmax(var(--size-cell-min),auto)] tablet:contents",
        className,
      )}
      {...props}
    />
  );
}
