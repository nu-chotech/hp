"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Asterisk } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { ImageSlot } from "@/components/ui/image-slot";
import { Rule } from "@/components/ui/rule";
import { type MarqueeItem, marqueeContent } from "@/content/marquee";
import { useAwake } from "@/hooks/use-awake";
import { marquee as marqueeMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Marquee band + item（§6.9 / §7.4.2）
 *
 * 帯は情報ではなく調子付け。トラックは丸ごと aria-hidden で、パートナーという
 * 事実は Partners セクションが本文として持つ（だからトラックにリンクを入れない —
 * 動く要素をフォーカス対象にしない）。
 *
 * 停止 / 再生ボタン（旧 §6.9.3）とページ内モーションスイッチは DECISION U-31 で
 * 撤去した。帯にフォーカス可能な要素は無く、止まるのは reduced-motion（静止
 * フォールバック）・hover・画面外 / バックグラウンドタブのときだけ。
 *
 * 速度は duration ではなく 40 px/s で持つ。内容量が増えても体感速度が変わらない
 * ように、グループ幅 ÷ 40 を ResizeObserver で `--marquee-duration` に書き戻す。
 *
 * 継ぎ目なく回すには、トラックが「ビューポート + グループ 1 つ」より長くなければ
 * ならない（1 グループぶん送った瞬間に右端が空く）。団体名の列だった頃はグループが
 * 1,000px を超えていたので複製 2 つで足りたが、ロゴ列は 700px 前後まで縮むので、
 * 複製数を viewport ÷ グループ幅 + 1 で求めて `--marquee-group-width` ぶんだけ送る。
 */

/** §6.9.2 の文字 2 種。和文には uppercase が効かないので Word も同じロールでよい */
function itemClass(kind: Exclude<MarqueeItem["kind"], "logo">) {
  return kind === "label"
    ? "text-overline text-ink-secondary"
    : "text-title-3-caps text-ink";
}

/**
 * 区切りの ✳（§6.9.2 Separator）。専用ロールを持つ唯一のアイコン（§1.3.8 末尾）。
 * DECISION U-32: ロゴの間には置かず、Label「PARTNERS」の両脇にだけ置く —
 * 図の列に記号を挟むとロゴが 1 つずつ区切られて「一覧」に見えなくなる。
 */
function Separator() {
  return <Asterisk className="size-icon-md shrink-0 text-pop-separator" />;
}

/** ✳ · Label · ✳ · Logo · Logo · …（区切りは Label の両脇だけ、U-32） */
function items() {
  return marqueeContent.items.map((item) => (
    <Fragment key={item.text}>
      {item.kind === "label" ? <Separator /> : null}
      {item.kind === "logo" ? (
        // 団体はロゴで出す（U-30）。64 角 = 帯の内側 92 に上下 14。トラックごと
        // aria-hidden なので alt は空 — 団体名は Partners セクションが本文で運ぶ。
        // 素材が入った contain は placeholder の地を持たない（ImageSlot 側で落ちる）
        <ImageSlot
          ratio="1:1"
          fit="contain"
          sizes="64px"
          className="w-marquee-logo shrink-0"
          src={item.src}
          alt=""
        />
      ) : (
        <span className={cn("whitespace-nowrap", itemClass(item.kind))}>
          {item.text}
        </span>
      )}
      {item.kind === "label" ? <Separator /> : null}
    </Fragment>
  ));
}

export interface MarqueeProps {
  className?: string;
}

export function Marquee({ className }: MarqueeProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  /**
   * グループの複製数。SSR と JS 無しは 2（−50% 送りの従来どおり）。
   * JS が測れたら viewport ÷ グループ幅 + 1 に増やし、送り量は px で持つ。
   */
  const [copies, setCopies] = useState(2);
  /**
   * 画面外とバックグラウンドタブでは止める（§7.5「バックグラウンド / 非可視」）。
   * 帯は CSS アニメーションが実体で JS は止める側にしか関わらないので、
   * 監視が始まるまでは動いている扱いにする（= JS の無い読者に届くのと同じ状態）。
   */
  const awake = useAwake(bandRef, { initial: true });

  // duration = グループ幅 ÷ 40 px/s。内容・字幅・フォント読込・viewport で幅が
  // 変わるたびに、送り量・duration・複製数を引き直す
  useEffect(() => {
    const group = groupRef.current;
    const track = trackRef.current;
    const view = track?.parentElement;
    if (!group || !track || !view) return;

    const apply = () => {
      const width = group.getBoundingClientRect().width;
      const viewWidth = view.getBoundingClientRect().width;
      if (width <= 0) return;
      track.style.setProperty("--marquee-group-width", `${width}px`);
      track.style.setProperty(
        "--marquee-duration",
        `${width / marqueeMotion.speedPxPerSecond}s`,
      );
      setCopies(Math.max(2, Math.ceil(viewWidth / width) + 1));
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(group);
    observer.observe(view);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={bandRef}
      className={cn("flex min-h-band-marquee flex-col bg-ground", className)}
    >
      {/* 動きの既定は CSS 側に置き、詳細度 0（:where）で書く。止める側 —
          globals.css の低減設定 — に必ず負けるため。

          このファイルが持つのは「低減設定のときに何を見せるか」だけ。
          アニメーションを殺す規則は globals.css 側にあるので、ここで再宣言しない。

          `style` は precedence 付きで <head> へ巻き上げる（React 19）。body 内の
          <style> は metadata content の置き場所ではない */}
      <style href="marquee" precedence="components">{`
@keyframes marquee-scroll{from{transform:translateX(0)}to{transform:translateX(calc(-1 * var(--marquee-group-width,50%)))}}
:where(.marquee__track){animation:marquee-scroll var(--marquee-duration,26s) linear infinite}
:where(.marquee__track[data-paused="true"]){animation-play-state:paused}
:where(.marquee__view:hover,.marquee__view:focus-within,.marquee__view:active) .marquee__track{animation-play-state:paused}
:where(.marquee__static){display:none}
@media (prefers-reduced-motion: reduce){
:where(.marquee__view){display:none}
:where(.marquee__static){display:flex}
}`}</style>

      <Rule />

      <div className="flex flex-1 items-stretch">
        {/* 動く側。帯は full-bleed で、右端は viewport の端でクリップする */}
        <div
          className="marquee__view flex-1 overflow-hidden"
          aria-hidden="true"
        >
          <div
            ref={trackRef}
            data-paused={!awake}
            className="marquee__track flex h-full w-max items-center"
          >
            {/* 同一グループ × copies を、グループ 1 つぶん送る。グループ末尾の 48 は
                pe で持つので、グループの継ぎ目も項目間と同じ間隔になる */}
            {Array.from({ length: copies }, (_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: 複製は内容がすべて同一で、並び替えも個別の状態も持たない。index 以外に識別子が無い
                key={`group-${i}`}
                ref={i === 0 ? groupRef : undefined}
                className="flex shrink-0 items-center gap-inline-2xl pe-inline-2xl"
              >
                {items()}
              </div>
            ))}
          </div>
        </div>

        {/* 静止フォールバック（§7.5）: 先頭グループを container の中に折返す。
            凍ったトラックを見せない — はみ出したまま止まった帯は「壊れた帯」に見える */}
        <div className="marquee__static flex-1" aria-hidden="true">
          <Container className="flex flex-wrap items-center gap-inline-2xl py-band-pad-y">
            {items()}
          </Container>
        </div>
      </div>

      <Rule />
    </div>
  );
}
