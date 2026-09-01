import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Rule } from "./rule";

/**
 * セクションの外殻（§3.9）
 *
 * 縦リズムはこの部品が持つ。呼び出し側に padding を書かせると、
 * 「罫線の上 80・下 64」という非対称（= 罫線が次のセクションに帰属して見える、
 * DECISION L-4 / L-5）が一箇所でも崩れてページ全体の刻みが濁るため。
 *
 * 2px の上罫線は container ではなく viewport 端まで走らせる（§4.3-2）ので、
 * padding を持つ Container の **外側** に置く。
 */
const sectionVariants = cva("", {
  variants: {
    surface: {
      ground: "bg-ground text-ink",
      ink: "on-ink bg-inverse-ground text-inverse-ink",
      // ポスター面は Lime では明るい面なので on-ink（反転面のスムージング）は付けない
      poster: "bg-poster-ground text-poster-ink",
    },
  },
  defaultVariants: {
    surface: "ground",
  },
});

/** 内容の上下。display は色面が境界になる帯（ポスター・ヒーロー）用 */
const sectionBodyVariants = cva("", {
  variants: {
    rhythm: {
      section: "pt-section-pad-top pb-section-pad-bottom",
      display: "py-section-pad-display",
    },
  },
  defaultVariants: {
    rhythm: "section",
  },
});

export interface SectionProps
  extends ComponentProps<"section">,
    VariantProps<typeof sectionVariants> {
  /**
   * 上の 2px 罫線。既定はグラウンド面のみ true —
   * 色面が変わるところ（ポスター・インク）は色の切替が境界なので罫線を重ねない。
   * 直前が罫線で終わる帯（マーキーの下罫）に続くセクションでは false にする（§3.9）。
   */
  rule?: boolean;
  /** 既定はグラウンド面が section（64 / 80）、色面が display（96 / 96） */
  rhythm?: VariantProps<typeof sectionBodyVariants>["rhythm"];
}

export function Section({
  surface = "ground",
  rule,
  rhythm,
  className,
  children,
  ...props
}: SectionProps) {
  const hasRule = rule ?? surface === "ground";
  const spacing = rhythm ?? (surface === "ground" ? "section" : "display");

  return (
    <section
      // ::selection とフォーカスリングの色はこの属性が決める。
      // 中の部品は自分でリング色を持たない（globals.css の base が解決する）
      data-surface={surface === "ground" ? undefined : surface}
      className={cn(sectionVariants({ surface }), className)}
      {...props}
    >
      {hasRule ? <Rule /> : null}
      <Container className={sectionBodyVariants({ rhythm: spacing })}>
        {children}
      </Container>
    </section>
  );
}

export { sectionVariants };
