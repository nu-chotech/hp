"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Asterisk, Pause, Play } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { Rule } from "@/components/ui/rule";
import { type MarqueeItem, marqueeContent } from "@/content/marquee";
import { useMotionSwitch } from "@/hooks/use-motion-switch";
import { marquee as marqueeMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Marquee band + item + control（§6.9 / §7.4.2）
 *
 * 帯は情報ではなく調子付け。トラックは丸ごと aria-hidden で、パートナーという
 * 事実は Partners セクションが本文として持つ（だからトラックにリンクを入れない —
 * 動く要素をフォーカス対象にしない）。
 *
 * 速度は duration ではなく 40 px/s で持つ。内容量が増えても体感速度が変わらない
 * ように、グループ幅 ÷ 40 を ResizeObserver で `--marquee-duration` に書き戻す。
 */

/** §6.9.2 の 3 種。和文には uppercase が効かないので Word も同じロールでよい */
function itemClass(kind: MarqueeItem["kind"]) {
  switch (kind) {
    case "label":
      return "text-overline text-ink-secondary";
    case "ghost":
      // 19px 800 は大型テキスト扱い。ink-tertiary 3.85 で 3:1 を満たす
      return "text-title-3-caps text-ink-tertiary";
    default:
      return "text-title-3-caps text-ink";
  }
}

/** Label · ✳ · Word · ✳ · Ghost · ✳ · Word · ✳（区切りは項目の後ろに必ず 1 つ） */
function items() {
  return marqueeContent.items.map((item) => (
    <Fragment key={item.text}>
      <span className={cn("whitespace-nowrap", itemClass(item.kind))}>
        {item.text}
      </span>
      {/* 専用ロールを持つ唯一のアイコン（§1.3.8 末尾） */}
      <Asterisk className="size-icon-md shrink-0 text-pop-separator" />
    </Fragment>
  ));
}

export interface MarqueeProps {
  className?: string;
}

export function Marquee({ className }: MarqueeProps) {
  const { playing, setPlaying } = useMotionSwitch();
  const [awake, setAwake] = useState(true);
  const groupRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  // duration = グループ幅 ÷ 40 px/s。内容・字幅・フォント読込で幅が変わるたびに引き直す
  useEffect(() => {
    const group = groupRef.current;
    const track = trackRef.current;
    if (!group || !track) return;

    const apply = () => {
      const width = group.getBoundingClientRect().width;
      if (width <= 0) return;
      track.style.setProperty(
        "--marquee-duration",
        `${width / marqueeMotion.speedPxPerSecond}s`,
      );
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  // 画面外とバックグラウンドタブでは止める（§7.5「バックグラウンド / 非可視」）
  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    let onScreen = true;
    const sync = () => setAwake(onScreen && !document.hidden);

    const observer = new IntersectionObserver((entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting);
      sync();
    });
    observer.observe(band);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div
      ref={bandRef}
      className={cn("flex min-h-band-marquee flex-col bg-ground", className)}
    >
      {/* 動きの既定は CSS 側に置き、詳細度 0（:where）で書く。止める側 —
          globals.css の低減設定と `html[data-motion="paused"]` — に必ず負けるため。

          このファイルが持つのは「低減設定のときに何を見せるか」だけ。読者が押して
          再生を選んだ状態（`html[data-motion="playing"]`）では動く側に戻す。
          アニメーションを殺す規則は globals.css 側が同じ属性を見て外れるので、
          ここで再宣言しない — 再生の条件が 2 か所に散ると必ず食い違う。

          `style` は precedence 付きで <head> へ巻き上げる（React 19）。body 内の
          <style> は metadata content の置き場所ではない */}
      <style href="marquee" precedence="components">{`
@keyframes marquee-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
:where(.marquee__track){animation:marquee-scroll var(--marquee-duration,26s) linear infinite}
:where(.marquee__track[data-paused="true"]){animation-play-state:paused}
:where(.marquee__view:hover,.marquee__view:focus-within,.marquee__view:active) .marquee__track{animation-play-state:paused}
:where(.marquee__static){display:none}
@media (prefers-reduced-motion: reduce){
:where(.marquee__view){display:none}
:where(.marquee__static){display:flex}
html[data-motion="playing"] .marquee__view{display:block}
html[data-motion="playing"] .marquee__static{display:none}
}`}</style>

      <Rule />

      <div className="flex flex-1 items-stretch">
        {/* 動く側。クリップ境界は停止セルの左罫と一致する（§7.4.2） */}
        <div
          className="marquee__view flex-1 overflow-hidden"
          aria-hidden="true"
        >
          <div
            ref={trackRef}
            data-paused={!playing || !awake}
            className="marquee__track flex h-full w-max items-center"
          >
            {/* 同一グループ × 2 を −50% 送る。グループ末尾の 32 は pe で持つので、
                グループの継ぎ目も項目間と同じ間隔になる */}
            <div
              ref={groupRef}
              className="flex shrink-0 items-center gap-inline-xl pe-inline-xl"
            >
              {items()}
            </div>
            <div className="flex shrink-0 items-center gap-inline-xl pe-inline-xl">
              {items()}
            </div>
          </div>
        </div>

        {/* 静止フォールバック（§7.5）: 先頭グループを container の中に折返す。
            凍ったトラックを見せない — はみ出したまま止まった帯は「壊れた帯」に見える */}
        <div className="marquee__static flex-1" aria-hidden="true">
          <Container className="flex flex-wrap items-center gap-inline-xl py-band-pad-y">
            {items()}
          </Container>
        </div>

        {/* 停止セルの左罫（§6.9.3）。Rule の vertical は size/rule-v 12 固定
            ——「隣接する文字と同じ高さの縦 hairline」という別の部品——で、帯の内側
            52 には伸びない（ui/rule.tsx の縦罫コメント）。ここは同じ 2px /
            `divider` の語彙のまま素の要素で置き、高さは self-stretch に任せる */}
        <div
          role="presentation"
          className="w-rule shrink-0 self-stretch bg-divider forced-colors:border-l"
        />
        {/* Button 部品はラベルを持つ横長のコントロールで、左右 inset を必ず持つ。
            この停止セルは「44 × 52 のセル全体が当たり判定のアイコンのみのボタン」
            （§6.9.3）なので、同じ状態のレシピ（hover/pressed のティント、
            色は入り 100 / 抜け 200 / 押下 0）だけを引き写して素の button で組む */}
        <button
          type="button"
          aria-pressed={!playing}
          onClick={() => setPlaying(!playing)}
          className={cn(
            "flex w-control-md shrink-0 items-center justify-center self-stretch text-ink",
            // セルは帯（full-bleed）ではなく viewport inset 24 の側に属する（§3.6 /
            // `page/inset` の用途行）。帯の右端ではなく紙の右端 1416 で終わる
            "me-page-inset",
            "cursor-pointer [-webkit-tap-highlight-color:transparent]",
            "hover:bg-state-hover-tint active:bg-state-pressed-tint",
            "transition-colors ease-color duration-(--dur-2)",
            "hover:duration-(--dur-1) active:duration-(--dur-0)",
            // 帯の上下罫と交差させないため、リングは内側に入れる（K-7）
            "focus-visible:outline-offset-(length:--focus-offset-inset)",
          )}
        >
          {playing ? (
            <Pause className="size-icon-lg" />
          ) : (
            <Play className="size-icon-lg" />
          )}
          {/* トグルの名前は状態で変えない。状態は aria-pressed が伝える（R8） */}
          <span className="sr-only">ページの動きを止める</span>
        </button>
      </div>

      <Rule />
    </div>
  );
}
